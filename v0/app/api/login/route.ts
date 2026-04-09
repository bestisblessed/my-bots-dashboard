import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAuthSecret,
  getDashboardPassword,
  getSessionCookieName,
  makeSessionCookieValue,
} from "../../../lib/auth";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };

  const expectedPassword = getDashboardPassword();
  const secret = getAuthSecret();

  if (!expectedPassword || !secret || password !== expectedPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieName(), makeSessionCookieValue(secret), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ ok: true });
}


