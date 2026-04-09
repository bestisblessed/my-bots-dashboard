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

type FleetServer = {
  name: string;
  connected: boolean;
  error?: string;
  status?: Status;
  cronEntries: {
    index: number;
    line: string;
    enabled: boolean;
    schedule: string;
    command: string;
  }[];
};

const botDashboardIdeas = [
  "Cross-bot PnL and bankroll heatmap (daily/weekly/monthly) with per-strategy drilldown.",
  "Missed heartbeat and stale-signal detector that flags bots that are running but no longer producing actions.",
  "Trade anomaly feed (slippage spikes, fill failures, unusual spread/latency).",
  "Per-bot risk guardrails (max position size, max daily loss, emergency kill-switch status).",
  "Model quality panel for AI bots (precision/recall, confidence drift, feature drift alerts).",
  "Opportunity queue showing top candidate events/markets each bot wants to act on next.",
  "Exchange/API reliability tracker (error rates, rate-limit events, webhook lag).",
  "Execution timeline combining cron runs, service restarts, and bot decisions in one audit stream.",
  "Scenario simulator to preview expected PnL impact before enabling a new bot config.",
  "Alert routing matrix (Discord/Telegram/email/SMS) with escalation policies and ack tracking.",
  "Secrets and key health monitor (rotation age, expiry countdown, permission scope checks).",
  "Host and container resource pressure forecast (CPU/RAM/disk/network) with projected saturation.",
  "Version rollout dashboard (which bots are on which commit, canary vs stable).",
  "Data-source freshness map (odds feeds, pricing APIs, news streams, scraping jobs).",
  "Weekly scorecard summarizing winners/losers, uptime %, incidents, and top improvements.",
];

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
  const [view, setView] = useState<ViewMode>("hybrid");
  const [fleetServers, setFleetServers] = useState<FleetServer[]>([]);

  const refresh = useCallback(async () => {
    const [s, p, sv, c, f] = await Promise.allSettled([
      fetch("/api/status").then((r) => r.json()),
      fetch("/api/processes").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/cron").then((r) => r.json()),
      fetch("/api/fleet").then((r) => r.json()),
    ]);

    if (s.status === "fulfilled") setStatus(s.value);
    if (p.status === "fulfilled") setProcesses(p.value.rows);
    if (sv.status === "fulfilled") setServices(sv.value.services);
    if (c.status === "fulfilled") setCron(c.value.entries);
    if (f.status === "fulfilled") setFleetServers(f.value.servers ?? []);
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


  function fmtLoad(server: FleetServer) {
    if (!server.status) return "—";
    return `${server.status.load.one.toFixed(2)} / ${server.status.load.five.toFixed(2)} / ${server.status.load.fifteen.toFixed(2)}`;
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

        <section className={`rounded-xl border p-4 shadow-sm ${
          view === "checks" ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white"
        }`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Connected servers (trinity + morpheus)</h2>
              <p className={`text-sm ${view === "checks" ? "text-zinc-300" : "text-zinc-600"}`}>
                Live status and cron jobs pulled over SSH from both servers.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {fleetServers.map((server) => (
              <article
                key={server.name}
                className={`rounded-lg border p-3 ${
                  view === "checks" ? "border-white/10 bg-black/20" : "border-black/10 bg-zinc-50"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{server.name}</h3>
                  <span className={`text-xs ${server.connected ? "text-emerald-500" : "text-rose-500"}`}>
                    {server.connected ? "connected" : "offline"}
                  </span>
                </div>

                {server.connected && server.status ? (
                  <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                    <div>Uptime: {fmtSeconds(server.status.uptimeSeconds)}</div>
                    <div>Load: {fmtLoad(server)}</div>
                    <div>
                      RAM: {fmtGbFromKb(server.status.mem.totalKb - server.status.mem.availKb)} / {fmtGbFromKb(server.status.mem.totalKb)}
                    </div>
                    <div>
                      Disk: {fmtGbFromKb(server.status.disk.usedKb)} / {fmtGbFromKb(server.status.disk.totalKb)}
                    </div>
                  </div>
                ) : (
                  <p className="mb-3 text-xs text-rose-500">{server.error ?? "Could not connect to server."}</p>
                )}

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide">Cron jobs</p>
                  <div className="max-h-56 overflow-auto rounded border border-black/10 bg-white/70 p-2 text-xs">
                    {server.cronEntries.length === 0 ? (
                      <div className="text-zinc-500">No cron jobs detected.</div>
                    ) : (
                      <ul className="space-y-2">
                        {server.cronEntries.map((job) => (
                          <li key={`${server.name}-${job.index}`} className="rounded border border-black/10 p-2">
                            <div className="font-mono text-[11px]">{job.schedule}</div>
                            <div className="mt-1 break-all">{job.command || job.line}</div>
                            <div className={`mt-1 ${job.enabled ? "text-emerald-600" : "text-amber-600"}`}>
                              {job.enabled ? "enabled" : "disabled"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
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


        <section className={`rounded-xl border p-4 shadow-sm ${
          view === "checks"
            ? "border-white/10 bg-white/[0.03]"
            : "border-black/10 bg-white"
        }`}>
          <div className="mb-3">
            <h2 className="text-base font-semibold">Top 15 additions for your bots dashboard</h2>
            <p className={`text-sm ${view === "checks" ? "text-zinc-300" : "text-zinc-600"}`}>
              Prioritized ideas tailored to always-on trading, AI prediction, and automation bots.
            </p>
          </div>
          <ol className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {botDashboardIdeas.map((idea, idx) => (
              <li
                key={idea}
                className={`rounded-md border px-3 py-2 text-sm ${
                  view === "checks" ? "border-white/10 bg-black/20" : "border-black/10 bg-zinc-50"
                }`}
              >
                <span className="mr-2 font-semibold text-blue-500">{idx + 1}.</span>
                {idea}
              </li>
            ))}
          </ol>
        </section>

      </div>
    </div>
  );
}
