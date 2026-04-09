import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function run(cmd: string, args: string[], input?: string) {
  if (input === undefined) {
    const { stdout } = await execFileAsync(cmd, args, { encoding: "utf8" });
    return stdout.trimEnd();
  }

  const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
  child.stdin.setDefaultEncoding("utf8");
  child.stdin.end(input);

  let stdout = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (d) => (stdout += d));

  let stderr = "";
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (d) => (stderr += d));

  const code = await new Promise<number>((resolve) => child.on("close", resolve));
  if (code !== 0) throw new Error(stderr.trimEnd() || `Command failed: ${cmd}`);
  return stdout.trimEnd();
}


