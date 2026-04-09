(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
const PUBLIC_PATHS = new Set([
    "/login"
]);
const PUBLIC_PREFIXES = [
    "/api/login"
];
const COOKIE_NAME = "rpi_dashboard_session";
function b64urlFromBytes(bytes) {
    let bin = "";
    for (const b of bytes)bin += String.fromCharCode(b);
    const base64 = btoa(bin);
    return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
async function hmacSha256B64Url(secret, msg) {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
    }, false, [
        "sign"
    ]);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
    return b64urlFromBytes(new Uint8Array(sig));
}
async function verifyCookie(value, secret) {
    if (!value) return false;
    const [payloadB64, sig] = value.split(".");
    if (!payloadB64 || !sig) return false;
    const expected = await hmacSha256B64Url(secret, payloadB64);
    return sig === expected;
}
async function middleware(req) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico") || pathname.startsWith("/public")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    if (PUBLIC_PATHS.has(pathname)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (PUBLIC_PREFIXES.some((p)=>pathname.startsWith(p))) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    const secret = process.env.AUTH_SECRET ?? "";
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    const ok = await verifyCookie(cookie, secret);
    if (ok) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map