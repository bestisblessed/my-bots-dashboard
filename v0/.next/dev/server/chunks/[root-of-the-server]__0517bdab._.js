module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/Code/my-bots-dashboard/lib/exec.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "run",
    ()=>run
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:child_process [external] (node:child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:util [external] (node:util, cjs)");
;
;
const execFileAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__["execFile"]);
async function run(cmd, args, input) {
    if (input === undefined) {
        const { stdout } = await execFileAsync(cmd, args, {
            encoding: "utf8"
        });
        return stdout.trimEnd();
    }
    const child = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__["spawn"])(cmd, args, {
        stdio: [
            "pipe",
            "pipe",
            "pipe"
        ]
    });
    child.stdin.setDefaultEncoding("utf8");
    child.stdin.end(input);
    let stdout = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (d)=>stdout += d);
    let stderr = "";
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (d)=>stderr += d);
    const code = await new Promise((resolve)=>child.on("close", resolve));
    if (code !== 0) throw new Error(stderr.trimEnd() || `Command failed: ${cmd}`);
    return stdout.trimEnd();
}
}),
"[project]/Code/my-bots-dashboard/lib/cron.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listCronEntries",
    ()=>listCronEntries,
    "readCrontabLines",
    ()=>readCrontabLines,
    "toggleCronLine",
    ()=>toggleCronLine,
    "writeCrontabLines",
    ()=>writeCrontabLines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$lib$2f$exec$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Code/my-bots-dashboard/lib/exec.ts [app-route] (ecmascript)");
;
async function readCrontabLines() {
    const out = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$lib$2f$exec$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["run"])("crontab", [
        "-l"
    ]);
    return out.split("\n");
}
async function writeCrontabLines(lines) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$lib$2f$exec$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["run"])("crontab", [
        "-"
    ], `${lines.join("\n")}\n`);
}
function listCronEntries(lines) {
    return lines.map((line, index)=>({
            line,
            index
        })).filter(({ line })=>line.trim() !== "").map(({ line, index })=>{
        const disabledPrefix = "# dashboard:disabled ";
        const trimmed = line.trimStart();
        const disabled = trimmed.startsWith(disabledPrefix);
        const raw = disabled ? trimmed.slice(disabledPrefix.length) : trimmed;
        const isComment = raw.trimStart().startsWith("#");
        return {
            index,
            raw,
            disabled,
            isComment
        };
    }).filter((e)=>!e.isComment && e.raw.trim() !== "");
}
function toggleCronLine(lines, index, enabled) {
    const line = lines[index] ?? "";
    const disabledPrefix = "# dashboard:disabled ";
    const trimmed = line.trimStart();
    if (enabled) {
        if (trimmed.startsWith(disabledPrefix)) {
            const restored = trimmed.slice(disabledPrefix.length);
            lines[index] = restored;
        }
        return lines;
    }
    if (!trimmed.startsWith("#") && trimmed !== "") {
        lines[index] = `${disabledPrefix}${trimmed}`;
    }
    return lines;
}
}),
"[project]/Code/my-bots-dashboard/app/api/cron/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Code/my-bots-dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$lib$2f$cron$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Code/my-bots-dashboard/lib/cron.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const lines = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$lib$2f$cron$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readCrontabLines"])();
    const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$lib$2f$cron$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listCronEntries"])(lines).map((e)=>({
            index: e.index,
            line: e.raw,
            enabled: !e.disabled
        }));
    return __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        entries
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0517bdab._.js.map