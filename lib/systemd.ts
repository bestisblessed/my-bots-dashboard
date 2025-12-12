import { run } from "./exec";

export function getAllowedServices() {
  const raw = process.env.ALLOWED_SERVICES ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function listServices(names: string[]) {
  if (names.length === 0) return [];
  const out = await run("systemctl", ["show", ...names, "--no-page", "--property=Id,Description,LoadState,ActiveState,SubState,UnitFileState"]);
  const blocks = out.split("\n\n").filter(Boolean);
  return blocks.map((block) => {
    const map = new Map<string, string>();
    for (const line of block.split("\n")) {
      const idx = line.indexOf("=");
      if (idx === -1) continue;
      map.set(line.slice(0, idx), line.slice(idx + 1));
    }
    return {
      id: map.get("Id") ?? "",
      description: map.get("Description") ?? "",
      loadState: map.get("LoadState") ?? "",
      activeState: map.get("ActiveState") ?? "",
      subState: map.get("SubState") ?? "",
      unitFileState: map.get("UnitFileState") ?? "",
    };
  });
}

export type SystemctlVerb = "start" | "stop" | "restart" | "enable" | "disable" | "status";

export async function systemctlAction(service: string, verb: SystemctlVerb) {
  await run("sudo", ["systemctl", verb, service]);
}


