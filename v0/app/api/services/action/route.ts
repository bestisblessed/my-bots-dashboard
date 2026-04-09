import { NextResponse } from "next/server";
import { getAllowedServices, systemctlAction, type SystemctlVerb } from "../../../../lib/systemd";

const ALLOWED_VERBS: SystemctlVerb[] = ["start", "stop", "restart", "enable", "disable", "status"];

export async function POST(req: Request) {
  const { service, verb } = (await req.json()) as { service?: string; verb?: SystemctlVerb };

  const allowed = new Set(getAllowedServices());
  if (!service || !allowed.has(service)) return NextResponse.json({ ok: false }, { status: 403 });
  if (!verb || !ALLOWED_VERBS.includes(verb)) return NextResponse.json({ ok: false }, { status: 400 });

  await systemctlAction(service, verb);
  return NextResponse.json({ ok: true });
}


