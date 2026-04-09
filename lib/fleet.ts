import { listCronEntries } from "./cron";
import { run } from "./exec";

export type FleetServerSnapshot = {
  name: string;
  connected: boolean;
  error?: string;
  status?: {
    uptimeSeconds: number;
    load: { one: number; five: number; fifteen: number };
    mem: { totalKb: number; availKb: number };
    disk: { totalKb: number; usedKb: number; availKb: number };
  };
  cronEntries: {
    index: number;
    line: string;
    enabled: boolean;
    schedule: string;
    command: string;
  }[];
};

async function runSsh(host: string, command: string) {
  return run("ssh", ["-o", "BatchMode=yes", "-o", "ConnectTimeout=5", host, "bash", "-lc", command]);
}

function parseLoad(out: string) {
  const [one, five, fifteen] = out.split(/\s+/);
  return {
    one: Number(one ?? "0"),
    five: Number(five ?? "0"),
    fifteen: Number(fifteen ?? "0"),
  };
}

function parseMem(out: string) {
  const map = new Map<string, number>();
  for (const line of out.split("\n")) {
    const m = line.match(/^(\w+):\s+(\d+)\s+kB$/);
    if (!m) continue;
    map.set(m[1], Number(m[2]));
  }
  return {
    totalKb: map.get("MemTotal") ?? 0,
    availKb: map.get("MemAvailable") ?? 0,
  };
}

function parseDisk(out: string) {
  const lines = out.split("\n");
  const cols = (lines[1] ?? "").split(/\s+/);
  return {
    totalKb: Number(cols[1] ?? "0"),
    usedKb: Number(cols[2] ?? "0"),
    availKb: Number(cols[3] ?? "0"),
  };
}

function parseCron(out: string) {
  const lines = out.split("\n");
  return listCronEntries(lines).map((entry) => {
    const parts = entry.raw.trim().split(/\s+/);
    return {
      index: entry.index,
      line: entry.raw,
      enabled: !entry.disabled,
      schedule: parts.slice(0, 5).join(" "),
      command: parts.slice(5).join(" "),
    };
  });
}

export async function fetchServerSnapshot(name: string): Promise<FleetServerSnapshot> {
  try {
    const [uptimeRaw, loadRaw, memRaw, diskRaw, cronRaw] = await Promise.all([
      runSsh(name, "cat /proc/uptime"),
      runSsh(name, "cat /proc/loadavg"),
      runSsh(name, "cat /proc/meminfo"),
      runSsh(name, "df -kP /"),
      runSsh(name, "crontab -l 2>/dev/null || true"),
    ]);

    return {
      name,
      connected: true,
      status: {
        uptimeSeconds: Math.floor(Number((uptimeRaw.split(/\s+/)[0] ?? "0").trim())),
        load: parseLoad(loadRaw),
        mem: parseMem(memRaw),
        disk: parseDisk(diskRaw),
      },
      cronEntries: parseCron(cronRaw),
    };
  } catch (error) {
    return {
      name,
      connected: false,
      error: error instanceof Error ? error.message : "Unknown connection error",
      cronEntries: [],
    };
  }
}

export function getFleetTargets() {
  const raw = process.env.FLEET_SERVERS?.trim();
  if (!raw) return ["trinity", "morpheus"];
  return raw
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}
