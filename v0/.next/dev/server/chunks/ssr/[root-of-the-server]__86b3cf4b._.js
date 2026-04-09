module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Code/my-bots-dashboard/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Home() {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [processes, setProcesses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cron, setCron] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [design, setDesign] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("fleet");
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const [s, p, sv, c] = await Promise.allSettled([
            fetch("/api/status").then((r)=>r.json()),
            fetch("/api/processes").then((r)=>r.json()),
            fetch("/api/services").then((r)=>r.json()),
            fetch("/api/cron").then((r)=>r.json())
        ]);
        if (s.status === "fulfilled") setStatus(s.value);
        if (p.status === "fulfilled") setProcesses(p.value.rows ?? []);
        if (sv.status === "fulfilled") setServices(sv.value.services ?? []);
        if (c.status === "fulfilled") setCron(c.value.entries ?? []);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const poll = ()=>{
            if (!cancelled) {
                void refresh();
            }
        };
        const timeoutId = window.setTimeout(poll, 0);
        const intervalId = window.setInterval(poll, 3500);
        return ()=>{
            cancelled = true;
            window.clearTimeout(timeoutId);
            window.clearInterval(intervalId);
        };
    }, [
        refresh
    ]);
    async function logout() {
        await fetch("/api/logout", {
            method: "POST"
        });
        window.location.href = "/login";
    }
    async function serviceAction(service, verb) {
        await fetch("/api/services/action", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                service,
                verb
            })
        });
        await refresh();
    }
    async function toggleCron(index, enabled) {
        await fetch("/api/cron/toggle", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                index,
                enabled
            })
        });
        await refresh();
    }
    function fmtSeconds(sec) {
        const d = Math.floor(sec / 86400);
        const h = Math.floor(sec % 86400 / 3600);
        const m = Math.floor(sec % 3600 / 60);
        return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
    }
    function fmtGbFromKb(kb) {
        return `${(kb / 1024 / 1024).toFixed(1)} GB`;
    }
    const fleetHealth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const active = services.filter((s)=>s.activeState === "active").length;
        const checksUp = cron.filter((c)=>c.enabled).length;
        return {
            active,
            degraded: Math.max(services.length - active, 0),
            checksUp,
            checksDown: Math.max(cron.length - checksUp, 0)
        };
    }, [
        services,
        cron
    ]);
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const base = [
            {
                name: "Server Fleet",
                subtitle: `${services.length} services • ${fleetHealth.active} healthy`,
                status: fleetHealth.degraded === 0 ? "Healthy" : "Needs Attention"
            },
            {
                name: "Automation & Cron",
                subtitle: `${cron.length} checks • ${fleetHealth.checksUp} enabled`,
                status: fleetHealth.checksDown === 0 ? "Healthy" : "Warnings"
            },
            {
                name: "Runtime Processes",
                subtitle: `${processes.length} top processes`,
                status: "Live"
            }
        ];
        return base;
    }, [
        services.length,
        cron.length,
        processes.length,
        fleetHealth
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-950 text-slate-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl font-semibold tracking-tight",
                                    children: "Ops Command Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-400",
                                    children: "Tailscale-style device visibility + Healthchecks-style service confidence."
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                [
                                    "fleet",
                                    "checks",
                                    "hybrid"
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wide transition ${design === d ? "bg-blue-500 text-white" : "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"}`,
                                        onClick: ()=>setDesign(d),
                                        children: [
                                            d,
                                            " view"
                                        ]
                                    }, d, true, {
                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "rounded-md border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800",
                                    onClick: logout,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "Uptime",
                            value: status ? fmtSeconds(status.uptimeSeconds) : "—"
                        }, void 0, false, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "System Load",
                            value: status ? `${status.load.one.toFixed(2)} / ${status.load.five.toFixed(2)} / ${status.load.fifteen.toFixed(2)}` : "—"
                        }, void 0, false, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "Memory Used",
                            value: status ? `${fmtGbFromKb(status.mem.totalKb - status.mem.availKb)} / ${fmtGbFromKb(status.mem.totalKb)}` : "—"
                        }, void 0, false, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                            title: "Disk Used",
                            value: status ? `${fmtGbFromKb(status.disk.usedKb)} / ${fmtGbFromKb(status.disk.totalKb)}` : "—"
                        }, void 0, false, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                design === "fleet" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-xl border border-slate-800 bg-slate-900/60",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-slate-800 px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-sm font-semibold",
                                    children: "Machines & Services (Tailscale-style)"
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium",
                                    children: "Add Device"
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "text-left text-xs uppercase tracking-wide text-slate-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3",
                                                    children: "Machine / Service"
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3",
                                                    children: "State"
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3",
                                                    children: "Enabled"
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3",
                                                    children: "Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t border-slate-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-mono text-xs",
                                                                    children: s.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 211,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: s.description || "Linux service"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusPill, {
                                                                ok: s.activeState === "active",
                                                                okText: "Connected",
                                                                badText: "Offline"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-xs text-slate-300",
                                                            children: s.unitFileState
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2",
                                                                children: [
                                                                    [
                                                                        "start",
                                                                        "Start"
                                                                    ],
                                                                    [
                                                                        "stop",
                                                                        "Stop"
                                                                    ],
                                                                    [
                                                                        "restart",
                                                                        "Restart"
                                                                    ],
                                                                    [
                                                                        "enable",
                                                                        "Enable"
                                                                    ],
                                                                    [
                                                                        "disable",
                                                                        "Disable"
                                                                    ]
                                                                ].map(([verb, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "rounded-md border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800",
                                                                        onClick: ()=>serviceAction(s.id, verb),
                                                                        children: label
                                                                    }, verb, false, {
                                                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                        lineNumber: 227,
                                                                        columnNumber: 29
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, s.id, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 21
                                                }, this)),
                                            services.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-4 text-slate-400",
                                                    colSpan: 4,
                                                    children: "No services configured."
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 21
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this) : null,
                design === "checks" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:grid-cols-3",
                            children: projects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-800 bg-slate-900 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold",
                                                    children: project.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDot, {
                                                    ok: project.status === "Healthy" || project.status === "Live"
                                                }, void 0, false, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-slate-300",
                                            children: project.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-400",
                                            children: project.status
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, project.name, true, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-slate-800 bg-slate-900/70",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-slate-800 px-4 py-3 text-sm font-semibold",
                                    children: "Checks & Cron (Healthchecks-style)"
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "divide-y divide-slate-800",
                                    children: [
                                        cron.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-sm font-medium",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDot, {
                                                                        ok: c.enabled
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                        lineNumber: 275,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "Check #",
                                                                    c.index + 1
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 font-mono text-xs text-slate-400",
                                                                children: c.line
                                                            }, void 0, false, {
                                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                lineNumber: 278,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "rounded-md border border-slate-700 px-3 py-1.5 text-xs hover:bg-slate-800",
                                                        onClick: ()=>toggleCron(c.index, !c.enabled),
                                                        children: c.enabled ? "Disable" : "Enable"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, c.index, true, {
                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this)),
                                        cron.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-4 text-sm text-slate-400",
                                            children: "No cron entries found."
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 266,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                    lineNumber: 253,
                    columnNumber: 11
                }, this) : null,
                design === "hybrid" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-4 xl:grid-cols-[1.2fr_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-slate-800 bg-slate-900/70",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-slate-800 px-4 py-3 text-sm font-semibold",
                                    children: "Live Process Watch"
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "text-left text-xs uppercase tracking-wide text-slate-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2",
                                                            children: "PID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2",
                                                            children: "Command"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2",
                                                            children: "CPU"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2",
                                                            children: "MEM"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-4 py-2",
                                                            children: "Elapsed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: [
                                                    processes.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t border-slate-800",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2 font-mono text-xs",
                                                                    children: p.pid
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2 font-mono text-xs",
                                                                    children: p.command
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 315,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2",
                                                                    children: [
                                                                        p.cpu.toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 316,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2",
                                                                    children: [
                                                                        p.mem.toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 317,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-4 py-2 font-mono text-xs",
                                                                    children: p.etime
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, p.pid, true, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 23
                                                        }, this)),
                                                    processes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-4 text-slate-400",
                                                            colSpan: 5,
                                                            children: "No process data."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 300,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-800 bg-slate-900 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-semibold",
                                            children: "Fleet Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-3 space-y-2 text-sm text-slate-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Healthy Services"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-emerald-400",
                                                            children: fleetHealth.active
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Degraded Services"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-amber-400",
                                                            children: fleetHealth.degraded
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Checks Passing"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-emerald-400",
                                                            children: fleetHealth.checksUp
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Checks Failing"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-rose-400",
                                                            children: fleetHealth.checksDown
                                                        }, void 0, false, {
                                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-800 bg-slate-900 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-semibold",
                                            children: "Quick Controls"
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-slate-400",
                                            children: "Restart first 3 services quickly."
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 357,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-wrap gap-2",
                                            children: services.slice(0, 3).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "rounded-md border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800",
                                                    onClick: ()=>serviceAction(s.id, "restart"),
                                                    children: [
                                                        "Restart ",
                                                        s.id
                                                    ]
                                                }, s.id, true, {
                                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                            lineNumber: 358,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                    lineNumber: 297,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
function MetricCard({ title, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-800 bg-slate-900 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs uppercase tracking-wide text-slate-400",
                children: title
            }, void 0, false, {
                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-lg font-semibold",
                children: value
            }, void 0, false, {
                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
        lineNumber: 380,
        columnNumber: 5
    }, this);
}
function StatusDot({ ok }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-400" : "bg-amber-400"}`
    }, void 0, false, {
        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
        lineNumber: 388,
        columnNumber: 10
    }, this);
}
function StatusPill({ ok, okText, badText }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${ok ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-amber-500/40 bg-amber-500/10 text-amber-300"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Code$2f$my$2d$bots$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDot, {
                ok: ok
            }, void 0, false, {
                fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            ok ? okText : badText
        ]
    }, void 0, true, {
        fileName: "[project]/Code/my-bots-dashboard/app/page.tsx",
        lineNumber: 393,
        columnNumber: 5
    }, this);
}
}),
"[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Code/my-bots-dashboard/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__86b3cf4b._.js.map