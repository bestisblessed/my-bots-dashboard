import { NextResponse } from "next/server";
import { readCrontabLines, toggleCronLine, writeCrontabLines } from "../../../../lib/cron";

export async function POST(req: Request) {
  const { index, enabled } = (await req.json()) as { index?: number; enabled?: boolean };
  if (typeof index !== "number" || typeof enabled !== "boolean") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lines = await readCrontabLines();
  toggleCronLine(lines, index, enabled);
  await writeCrontabLines(lines);
  return NextResponse.json({ ok: true });
}


