import { NextResponse } from "next/server";
import { getFleetPayload } from "../../../lib/fleet";

export async function GET() {
  return NextResponse.json(getFleetPayload());
}
