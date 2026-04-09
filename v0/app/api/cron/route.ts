import { NextResponse } from "next/server";
import { listCronEntries, readCrontabLines } from "../../../lib/cron";

export async function GET() {
  const lines = await readCrontabLines();
  const entries = listCronEntries(lines).map((e) => ({
    index: e.index,
    line: e.raw,
    enabled: !e.disabled,
  }));
  return NextResponse.json({ entries });
}


