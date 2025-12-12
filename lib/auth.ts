import crypto from "crypto";

const COOKIE_NAME = "rpi_dashboard_session";

function b64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function b64urlToBuf(input: string) {
  const padded = input.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((input.length + 3) % 4);
  return Buffer.from(padded, "base64");
}

function sign(payload: string, secret: string) {
  return b64url(crypto.createHmac("sha256", secret).update(payload).digest());
}

export function makeSessionCookieValue(secret: string) {
  const payload = JSON.stringify({ iat: Date.now() });
  const payloadB64 = b64url(payload);
  const sig = sign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function verifySessionCookieValue(value: string | undefined, secret: string) {
  if (!value) return false;
  const [payloadB64, sig] = value.split(".");
  if (!payloadB64 || !sig) return false;
  const expected = sign(payloadB64, secret);
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

export function getAuthSecret() {
  return process.env.AUTH_SECRET ?? "";
}

export function getDashboardPassword() {
  return process.env.DASHBOARD_PASSWORD ?? "";
}


