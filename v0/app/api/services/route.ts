import { NextResponse } from "next/server";
import { getAllowedServices, listServices } from "../../../lib/systemd";

export async function GET() {
  const names = getAllowedServices();
  const services = await listServices(names);
  return NextResponse.json({ services });
}


