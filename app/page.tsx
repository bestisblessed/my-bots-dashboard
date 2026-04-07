"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Status = {
  uptimeSeconds: number;
  load: { one: number; five: number; fifteen: number };
  mem: { totalKb: number; availKb: number };
  disk: { totalKb: number; usedKb: number; availKb: number };
};

type ProcessRow = { pid: number; command: string; cpu: number; mem: number; etime: string };
type ServiceRow = {
  id: string;
  description: string;
  loadState: string;
  activeState: string;
  subState: string;
  unitFileState: string;
};
type CronRow = { index: number; line: string; enabled: boolean };
type ViewMode = "network" | "checks" | "hybrid";

const viewMeta: Record<ViewMode, { title: string; description: string }> = {
  network: {
    title: "Concept A · Network Fleet",
    description: "Light Tailscale-like machine inventory for quick scanning and management.",
  },
  checks: {
    title: "Concept B · Check Ops",
    description: "Dark Healthchecks-like operations board focused on uptime and schedules.",
  },
  hybrid: {
    title: "Concept C · Unified Control",
    description: "Balanced operations cockpit combining host inventory, checks, and control actions.",
  },
};

const dashboardIdeas = [
  {
    title: "Bot P&L by strategy",
    detail: "Daily and weekly P&L broken down by market, strategy tag, and bot instance.",
  },
  {
    title: "Execution quality panel",
    detail: "Track slippage, fill rate, and rejected orders with per-exchange breakdowns.",
  },
  {
    title: "Signal confidence heatmap",
    detail: "Visualize confidence scores over time to spot regime shifts before drawdowns.",
  },
  {
    title: "Risk guardrail monitor",
    detail: "Live max drawdown, position sizing, leverage usage, and circuit-breaker status.",
  },
  {
    title: "API quota and rate-limit status",
    detail: "Per-provider request budgets and cooldown windows to avoid hard throttling.",
  },
  {
    title: "Webhook/event stream timeline",
    detail: "Single chronological feed of alerts, deployments, failures, and recoveries.",
  },
  {
    title: "Canary bot comparison",
    detail: "Compare paper-trading canaries against production bots before rolling changes.",
  },
  {
    title: "Model drift and retrain queue",
    detail: "Surface feature drift, stale models, and pending retraining jobs.",
  },
  {
    title: "Healthcheck SLA score",
    detail: "Rolling uptime score for each bot, worker, and cron pipeline.",
  },
  {
    title: "Incident playbook shortcuts",
    detail: "One-click actions for restart, failover, safe mode, and kill-switch.",
  },
  {
    title: "Secrets/cert expiry tracker",
    detail: "Warn early on expiring API keys, tokens, and TLS certificates.",
  },
  {
    title: "Infrastructure cost view",
    detail: "Cloud spend, GPU hours, and per-bot operating cost estimates.",
  },
  {
    title: "Anomaly detector",
    detail: "Detect unusual trade frequency, latency spikes, or bot behavior drift.",
  },
  {
    title: "Release train dashboard",
    detail: "Track commit → build → deploy status for every bot service.",
  },
  {
    title: "Portfolio exposure map",
    detail: "Aggregate directional exposure across bots and correlated assets.",
  },
] as const;

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-zinc-500">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

export default function Home() {
  const [status, setStatus] = useState<Status | null>(null);
  const [processes, setProcesses] = useState<ProcessRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [cron, setCron] = useState<CronRow[]>([]);
  const [view, setView] = useState<ViewMode>("network");

  const refresh = useCallback(async () => {
    const [s, p, sv, c] = await Promise.allSettled([
      fetch("/api/status").then((r) => r.json()),
      fetch("/api/processes").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/cron").then((r) => r.json()),
    ]);

    if (s.status === "fulfilled") setStatus(s.value);
    if (p.status === "fulfilled") setProcesses(p.value.rows);
    if (sv.status === "fulfilled") setServices(sv.value.services);
    if (c.status === "fulfilled") setCron(c.value.entries);
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => refresh().then(() => {}), 0);
    const id = window.setInterval(() => refresh().then(() => {}), 4000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(id);
    };
  }, [refresh]);

  const checks = useMemo(
    () =>
      cron.map((entry) => ({
        id: entry.index,
        name: entry.line.split(" ").slice(5).join(" ") || `job-${entry.index}`,
        status: entry.enabled ? "up" : "paused",
        period: entry.line.split(" ").slice(0, 5).join(" "),
        lastPing: entry.enabled ? "just now" : "disabled",
      })),
    [cron],
  );

  const devices = useMemo(
    () =>
      services.map((service, index) => ({
        id: service.id,
        owner: service.description || "ops@home",
        address: `100.82.${20 + index}.${10 + index}`,
        active: service.activeState === "active",
        platform: index % 2 === 0 ? "Linux" : "Container",
      })),
    [services],
  );

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  async function serviceAction(service: string, verb: string) {
    await fetch("/api/services/action", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ service, verb }),
    });
    await refresh();
  }

  function fmtSeconds(sec: number) {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
  }

  function fmtGbFromKb(kb: number) {
    return `${(kb / 1024 / 1024).toFixed(1)} GB`;
  }

  const shellCard = "rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur";

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${view === "checks" ? "bg-[#10141f] text-zinc-100" : "bg-[#f6f8fb] text-zinc-900"}`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">Custom Home Ops Dashboard</p>
              <h1 className="mt-1 text-2xl font-semibold">{viewMeta[view].title}</h1>
              <p className="mt-1 text-sm text-zinc-500">{viewMeta[view].description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(["network", "checks", "hybrid"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setView(mode)}
                  className={`h-9 rounded-md px-3 text-sm font-medium transition ${
                    view === mode ? "bg-blue-600 text-white" : "border border-black/10 bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {viewMeta[mode].title.replace("Concept ", "")}
                </button>
              ))}
              <button className="h-9 rounded-md border border-black/10 bg-white px-3 text-sm" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <section
          className={`rounded-xl border p-4 shadow-sm ${
            view === "checks" ? "border-white/15 bg-[#151b2a]" : "border-black/10 bg-white"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className={`text-sm font-semibold ${view === "checks" ? "text-zinc-100" : "text-zinc-900"}`}>
              Top 15 high-impact additions for your bots dashboard
            </h2>
            <span className={`text-xs ${view === "checks" ? "text-zinc-400" : "text-zinc-500"}`}>
              Ranked feature ideas
            </span>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {dashboardIdeas.map((idea, index) => (
              <div
                key={idea.title}
                className={`rounded-lg border p-3 ${
                  view === "checks" ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-zinc-50"
                }`}
              >
                <p className={`text-xs font-semibold ${view === "checks" ? "text-blue-300" : "text-blue-600"}`}>
                  #{index + 1}
                </p>
                <h3 className={`mt-1 text-sm font-semibold ${view === "checks" ? "text-zinc-100" : "text-zinc-900"}`}>
                  {idea.title}
                </h3>
                <p className={`mt-1 text-xs leading-5 ${view === "checks" ? "text-zinc-300" : "text-zinc-600"}`}>
                  {idea.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {view === "network" && (
          <section className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Uptime" value={status ? fmtSeconds(status.uptimeSeconds) : "—"} />
              <MetricCard
                label="Load"
                value={
                  status
                    ? `${status.load.one.toFixed(2)} / ${status.load.five.toFixed(2)} / ${status.load.fifteen.toFixed(2)}`
                    : "—"
                }
              />
              <MetricCard
                label="Memory"
                value={
                  status
                    ? `${fmtGbFromKb(status.mem.totalKb - status.mem.availKb)} used / ${fmtGbFromKb(status.mem.totalKb)}`
                    : "—"
                }
              />
              <MetricCard
                label="Disk"
                value={status ? `${fmtGbFromKb(status.disk.usedKb)} used / ${fmtGbFromKb(status.disk.totalKb)}` : "—"}
              />
            </div>

            <div className="rounded-xl border border-black/10 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
                <div>
                  <h2 className="text-sm font-semibold">Machines</h2>
                  <p className="text-xs text-zinc-500">Connected devices and important server daemons</p>
                </div>
                <button className="h-8 rounded-md bg-blue-600 px-3 text-xs font-medium text-white">Add device</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs text-zinc-500">
                    <tr>
                      <th className="px-4 py-2 font-medium">Machine</th>
                      <th className="px-4 py-2 font-medium">Address</th>
                      <th className="px-4 py-2 font-medium">Platform</th>
                      <th className="px-4 py-2 font-medium">Last Seen</th>
                      <th className="px-4 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device) => (
                      <tr key={device.id} className="border-t border-black/10">
                        <td className="px-4 py-3">
                          <div className="font-medium">{device.id}</div>
                          <div className="text-xs text-zinc-500">{device.owner}</div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">{device.address}</td>
                        <td className="px-4 py-3 text-xs">{device.platform}</td>
                        <td className="px-4 py-3 text-xs">
                          <span className={device.active ? "text-emerald-600" : "text-amber-600"}>
                            ● {device.active ? "Connected" : "Degraded"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="h-8 rounded-md border border-black/10 px-2 text-xs"
                            onClick={() => serviceAction(device.id, "restart")}
                          >
                            Restart
                          </button>
                        </td>
                      </tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 text-zinc-500">
                          No machine-like rows yet. Configure ALLOWED_SERVICES to populate.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {view === "checks" && (
          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className={`${shellCard} p-4`}>
                <div className="text-xs uppercase tracking-wider text-zinc-400">Healthy checks</div>
                <div className="mt-2 text-2xl font-semibold text-emerald-400">{checks.filter((c) => c.status === "up").length}</div>
              </div>
              <div className={`${shellCard} p-4`}>
                <div className="text-xs uppercase tracking-wider text-zinc-400">Paused checks</div>
                <div className="mt-2 text-2xl font-semibold text-amber-400">{checks.filter((c) => c.status === "paused").length}</div>
              </div>
              <div className={`${shellCard} p-4`}>
                <div className="text-xs uppercase tracking-wider text-zinc-400">Tracked processes</div>
                <div className="mt-2 text-2xl font-semibold text-sky-400">{processes.length}</div>
              </div>
            </div>

            <div className={`${shellCard} overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Schedule</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Last ping</th>
                  </tr>
                </thead>
                <tbody>
                  {checks.map((check) => (
                    <tr key={check.id} className="border-t border-white/10">
                      <td className="px-4 py-3">
                        <div>{check.name}</div>
                        <div className="text-xs text-zinc-400">cron #{check.id}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-300">{check.period}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            check.status === "up" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {check.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-300">{check.lastPing}</td>
                    </tr>
                  ))}
                  {checks.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 text-zinc-400">
                        No cron checks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === "hybrid" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm lg:col-span-2">
              <h2 className="text-sm font-semibold">Service Actions</h2>
              <p className="mt-1 text-xs text-zinc-500">Quick control panel for your allowlisted daemons.</p>
              <div className="mt-3 space-y-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col gap-2 rounded-md border border-black/10 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="font-medium">{service.id}</div>
                      <div className="text-xs text-zinc-500">
                        {service.activeState} · {service.subState} · {service.unitFileState}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="h-8 rounded-md border border-black/10 px-2 text-xs" onClick={() => serviceAction(service.id, "start")}>Start</button>
                      <button className="h-8 rounded-md border border-black/10 px-2 text-xs" onClick={() => serviceAction(service.id, "stop")}>Stop</button>
                      <button className="h-8 rounded-md bg-blue-600 px-2 text-xs text-white" onClick={() => serviceAction(service.id, "restart")}>Restart</button>
                    </div>
                  </div>
                ))}
                {services.length === 0 && <div className="text-sm text-zinc-500">No services configured.</div>}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold">Top Processes</h2>
                <div className="mt-3 space-y-2">
                  {processes.slice(0, 5).map((proc) => (
                    <div key={proc.pid} className="rounded-md border border-black/10 p-2">
                      <div className="font-mono text-xs">{proc.command}</div>
                      <div className="mt-1 text-xs text-zinc-500">PID {proc.pid} · CPU {proc.cpu.toFixed(1)}% · MEM {proc.mem.toFixed(1)}%</div>
                    </div>
                  ))}
                  {processes.length === 0 && <div className="text-sm text-zinc-500">No process data.</div>}
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold">Uptime & Capacity</h2>
                <ul className="mt-2 space-y-1 text-sm text-zinc-600">
                  <li>Uptime: {status ? fmtSeconds(status.uptimeSeconds) : "—"}</li>
                  <li>RAM: {status ? `${fmtGbFromKb(status.mem.totalKb - status.mem.availKb)} / ${fmtGbFromKb(status.mem.totalKb)}` : "—"}</li>
                  <li>Disk: {status ? `${fmtGbFromKb(status.disk.usedKb)} / ${fmtGbFromKb(status.disk.totalKb)}` : "—"}</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
