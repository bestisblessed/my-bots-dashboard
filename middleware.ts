import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set<string>(["/login"]);
const PUBLIC_PREFIXES = ["/api/login"];
const COOKIE_NAME = "rpi_dashboard_session";

function b64urlFromBytes(bytes: Uint8Array) {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const base64 = btoa(bin);
  return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hmacSha256B64Url(secret: string, msg: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return b64urlFromBytes(new Uint8Array(sig));
}

async function verifyCookie(value: string | undefined, secret: string) {
  if (!value) return false;
  const [payloadB64, sig] = value.split(".");
  if (!payloadB64 || !sig) return false;
  const expected = await hmacSha256B64Url(secret, payloadB64);
  return sig === expected;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const secret = process.env.AUTH_SECRET ?? "";
  const cookie = req.cookies.get(COOKIE_NAME)?.value;

  const ok = await verifyCookie(cookie, secret);
  if (ok) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};


