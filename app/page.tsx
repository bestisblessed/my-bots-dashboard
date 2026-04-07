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

type Design = "fleet" | "checks" | "hybrid";

export default function Home() {
  const [status, setStatus] = useState<Status | null>(null);
  const [processes, setProcesses] = useState<ProcessRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [cron, setCron] = useState<CronRow[]>([]);
  const [design, setDesign] = useState<Design>("fleet");

  const refresh = useCallback(async () => {
    const [s, p, sv, c] = await Promise.allSettled([
      fetch("/api/status").then((r) => r.json()),
      fetch("/api/processes").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/cron").then((r) => r.json()),
    ]);

    if (s.status === "fulfilled") setStatus(s.value);
    if (p.status === "fulfilled") setProcesses(p.value.rows ?? []);
    if (sv.status === "fulfilled") setServices(sv.value.services ?? []);
    if (c.status === "fulfilled") setCron(c.value.entries ?? []);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const poll = () => {
      if (!cancelled) {
        void refresh();
      }
    };

    const timeoutId = window.setTimeout(poll, 0);
    const intervalId = window.setInterval(poll, 3500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [refresh]);

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

  async function toggleCron(index: number, enabled: boolean) {
    await fetch("/api/cron/toggle", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ index, enabled }),
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

  const fleetHealth = useMemo(() => {
    const active = services.filter((s) => s.activeState === "active").length;
    const checksUp = cron.filter((c) => c.enabled).length;
    return {
      active,
      degraded: Math.max(services.length - active, 0),
      checksUp,
      checksDown: Math.max(cron.length - checksUp, 0),
    };
  }, [services, cron]);

  const projects = useMemo(() => {
    const base = [
      {
        name: "Server Fleet",
        subtitle: `${services.length} services • ${fleetHealth.active} healthy`,
        status: fleetHealth.degraded === 0 ? "Healthy" : "Needs Attention",
      },
      {
        name: "Automation & Cron",
        subtitle: `${cron.length} checks • ${fleetHealth.checksUp} enabled`,
        status: fleetHealth.checksDown === 0 ? "Healthy" : "Warnings",
      },
      {
        name: "Runtime Processes",
        subtitle: `${processes.length} top processes`,
        status: "Live",
      },
    ];
    return base;
  }, [services.length, cron.length, processes.length, fleetHealth]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Ops Command Dashboard</h1>
            <p className="text-sm text-slate-400">
              Tailscale-style device visibility + Healthchecks-style service confidence.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(["fleet", "checks", "hybrid"] as Design[]).map((d) => (
              <button
                key={d}
                className={`rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wide transition ${
                  design === d
                    ? "bg-blue-500 text-white"
                    : "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
                onClick={() => setDesign(d)}
              >
                {d} view
              </button>
            ))}
            <button
              className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Uptime" value={status ? fmtSeconds(status.uptimeSeconds) : "—"} />
          <MetricCard
            title="System Load"
            value={
              status
                ? `${status.load.one.toFixed(2)} / ${status.load.five.toFixed(2)} / ${status.load.fifteen.toFixed(2)}`
                : "—"
            }
          />
          <MetricCard
            title="Memory Used"
            value={
              status
                ? `${fmtGbFromKb(status.mem.totalKb - status.mem.availKb)} / ${fmtGbFromKb(status.mem.totalKb)}`
                : "—"
            }
          />
          <MetricCard
            title="Disk Used"
            value={
              status ? `${fmtGbFromKb(status.disk.usedKb)} / ${fmtGbFromKb(status.disk.totalKb)}` : "—"
            }
          />
        </section>

        {design === "fleet" ? (
          <section className="rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <h2 className="text-sm font-semibold">Machines & Services (Tailscale-style)</h2>
              <button className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium">Add Device</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Machine / Service</th>
                    <th className="px-4 py-3">State</th>
                    <th className="px-4 py-3">Enabled</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-t border-slate-800">
                      <td className="px-4 py-3">
                        <div className="font-mono text-xs">{s.id}</div>
                        <div className="text-xs text-slate-400">{s.description || "Linux service"}</div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill ok={s.activeState === "active"} okText="Connected" badText="Offline" />
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-300">{s.unitFileState}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {[
                            ["start", "Start"],
                            ["stop", "Stop"],
                            ["restart", "Restart"],
                            ["enable", "Enable"],
                            ["disable", "Disable"],
                          ].map(([verb, label]) => (
                            <button
                              key={verb}
                              className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800"
                              onClick={() => serviceAction(s.id, verb)}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-slate-400" colSpan={4}>
                        No services configured.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {design === "checks" ? (
          <section className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <div key={project.name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{project.name}</h3>
                    <StatusDot ok={project.status === "Healthy" || project.status === "Live"} />
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{project.subtitle}</p>
                  <p className="mt-1 text-xs text-slate-400">{project.status}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70">
              <div className="border-b border-slate-800 px-4 py-3 text-sm font-semibold">
                Checks & Cron (Healthchecks-style)
              </div>
              <div className="divide-y divide-slate-800">
                {cron.map((c) => (
                  <div key={c.index} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <StatusDot ok={c.enabled} />
                        Check #{c.index + 1}
                      </div>
                      <div className="mt-1 font-mono text-xs text-slate-400">{c.line}</div>
                    </div>
                    <button
                      className="rounded-md border border-slate-700 px-3 py-1.5 text-xs hover:bg-slate-800"
                      onClick={() => toggleCron(c.index, !c.enabled)}
                    >
                      {c.enabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                ))}
                {cron.length === 0 ? (
                  <div className="px-4 py-4 text-sm text-slate-400">No cron entries found.</div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {design === "hybrid" ? (
          <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70">
              <div className="border-b border-slate-800 px-4 py-3 text-sm font-semibold">Live Process Watch</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-4 py-2">PID</th>
                      <th className="px-4 py-2">Command</th>
                      <th className="px-4 py-2">CPU</th>
                      <th className="px-4 py-2">MEM</th>
                      <th className="px-4 py-2">Elapsed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map((p) => (
                      <tr key={p.pid} className="border-t border-slate-800">
                        <td className="px-4 py-2 font-mono text-xs">{p.pid}</td>
                        <td className="px-4 py-2 font-mono text-xs">{p.command}</td>
                        <td className="px-4 py-2">{p.cpu.toFixed(1)}%</td>
                        <td className="px-4 py-2">{p.mem.toFixed(1)}%</td>
                        <td className="px-4 py-2 font-mono text-xs">{p.etime}</td>
                      </tr>
                    ))}
                    {processes.length === 0 ? (
                      <tr>
                        <td className="px-4 py-4 text-slate-400" colSpan={5}>
                          No process data.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <h3 className="text-sm font-semibold">Fleet Summary</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li className="flex items-center justify-between">
                    <span>Healthy Services</span>
                    <span className="font-semibold text-emerald-400">{fleetHealth.active}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Degraded Services</span>
                    <span className="font-semibold text-amber-400">{fleetHealth.degraded}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Checks Passing</span>
                    <span className="font-semibold text-emerald-400">{fleetHealth.checksUp}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Checks Failing</span>
                    <span className="font-semibold text-rose-400">{fleetHealth.checksDown}</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <h3 className="text-sm font-semibold">Quick Controls</h3>
                <p className="mt-2 text-xs text-slate-400">Restart first 3 services quickly.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800"
                      onClick={() => serviceAction(s.id, "restart")}
                    >
                      Restart {s.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function StatusDot({ ok }: { ok: boolean }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-400" : "bg-amber-400"}`} />;
}

function StatusPill({ ok, okText, badText }: { ok: boolean; okText: string; badText: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${
        ok ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-amber-500/40 bg-amber-500/10 text-amber-300"
      }`}
    >
      <StatusDot ok={ok} />
      {ok ? okText : badText}
    </span>
  );
}
