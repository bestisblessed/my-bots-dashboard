import { NextResponse } from "next/server";
import { getDiskUsage, getLoadAvg, getMemInfo, getUptimeSeconds } from "../../../lib/system";

export async function GET() {
  const [uptimeSeconds, load, mem, disk] = await Promise.all([
    getUptimeSeconds(),
    getLoadAvg(),
    getMemInfo(),
    getDiskUsage(),
  ]);

  return NextResponse.json({
    uptimeSeconds,
    load,
    mem,
    disk,
  });
}


