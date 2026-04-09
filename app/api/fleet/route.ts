import { NextResponse } from "next/server";
import { fetchServerSnapshot, getFleetTargets } from "../../../lib/fleet";

export async function GET() {
  const targets = getFleetTargets();
  const servers = await Promise.all(targets.map((name) => fetchServerSnapshot(name)));
  return NextResponse.json({ servers });
}
