import { run } from "./exec";

export async function readCrontabLines() {
  const out = await run("crontab", ["-l"]);
  return out.split("\n");
}

export async function writeCrontabLines(lines: string[]) {
  await run("crontab", ["-"], `${lines.join("\n")}\n`);
}

export function listCronEntries(lines: string[]) {
  return lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.trim() !== "")
    .map(({ line, index }) => {
      const disabledPrefix = "# dashboard:disabled ";
      const trimmed = line.trimStart();
      const disabled = trimmed.startsWith(disabledPrefix);
      const raw = disabled ? trimmed.slice(disabledPrefix.length) : trimmed;
      const isComment = raw.trimStart().startsWith("#");
      return { index, raw, disabled, isComment };
    })
    .filter((e) => !e.isComment && e.raw.trim() !== "");
}

export function toggleCronLine(lines: string[], index: number, enabled: boolean) {
  const line = lines[index] ?? "";
  const disabledPrefix = "# dashboard:disabled ";
  const trimmed = line.trimStart();

  if (enabled) {
    if (trimmed.startsWith(disabledPrefix)) {
      const restored = trimmed.slice(disabledPrefix.length);
      lines[index] = restored;
    }
    return lines;
  }

  if (!trimmed.startsWith("#") && trimmed !== "") {
    lines[index] = `${disabledPrefix}${trimmed}`;
  }
  return lines;
}


