import { run } from "./exec";

export async function getUptimeSeconds() {
  const out = await run("cat", ["/proc/uptime"]);
  const first = out.split(/\s+/)[0] ?? "0";
  return Math.floor(Number(first));
}

export async function getLoadAvg() {
  const out = await run("cat", ["/proc/loadavg"]);
  const [one, five, fifteen] = out.split(/\s+/);
  return {
    one: Number(one ?? "0"),
    five: Number(five ?? "0"),
    fifteen: Number(fifteen ?? "0"),
  };
}

export async function getMemInfo() {
  const out = await run("cat", ["/proc/meminfo"]);
  const map = new Map<string, number>();
  for (const line of out.split("\n")) {
    const m = line.match(/^(\w+):\s+(\d+)\s+kB$/);
    if (!m) continue;
    map.set(m[1], Number(m[2]));
  }
  const totalKb = map.get("MemTotal") ?? 0;
  const availKb = map.get("MemAvailable") ?? 0;
  return { totalKb, availKb };
}

export async function getDiskUsage() {
  const out = await run("df", ["-kP", "/"]);
  const lines = out.split("\n");
  const cols = (lines[1] ?? "").split(/\s+/);
  const totalKb = Number(cols[1] ?? "0");
  const usedKb = Number(cols[2] ?? "0");
  const availKb = Number(cols[3] ?? "0");
  return { totalKb, usedKb, availKb };
}


