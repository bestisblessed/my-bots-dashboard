import { NextResponse } from "next/server";
import { run } from "../../../lib/exec";

export async function GET() {
  const out = await run("ps", ["-eo", "pid,comm,%cpu,%mem,etime", "--sort=-%cpu"]);
  const lines = out.split("\n");
  const rows = lines.slice(1).filter(Boolean).slice(0, 50).map((line) => {
    const m = line.trim().match(/^(\d+)\s+(\S+)\s+([\d.]+)\s+([\d.]+)\s+(.+)$/);
    return {
      pid: Number(m?.[1] ?? "0"),
      command: m?.[2] ?? "",
      cpu: Number(m?.[3] ?? "0"),
      mem: Number(m?.[4] ?? "0"),
      etime: m?.[5] ?? "",
    };
  });
  return NextResponse.json({ rows });
}


