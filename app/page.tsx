"use client";

import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<{
    uptimeSeconds: number;
    load: { one: number; five: number; fifteen: number };
    mem: { totalKb: number; availKb: number };
    disk: { totalKb: number; usedKb: number; availKb: number };
  } | null>(null);
  const [processes, setProcesses] = useState<
    { pid: number; command: string; cpu: number; mem: number; etime: string }[]
  >([]);
  const [services, setServices] = useState<
    {
      id: string;
      description: string;
      loadState: string;
      activeState: string;
      subState: string;
      unitFileState: string;
    }[]
  >([]);
  const [cron, setCron] = useState<{ index: number; line: string; enabled: boolean }[]>([]);

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
    let cancelled = false;

    refresh().then(() => {});
    const id = window.setInterval(() => {
      if (cancelled) return;
      refresh().then(() => {});
    }, 3000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
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

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">RPi Dashboard</h1>
            <p className="text-sm text-black/60 dark:text-white/60">
              Monitoring and control
            </p>
          </div>
          <button
            className="h-9 rounded-md border border-black/10 dark:border-white/15 px-3 text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black p-4">
            <div className="text-sm font-medium">Uptime</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              {status ? fmtSeconds(status.uptimeSeconds) : "—"}
            </div>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black p-4">
            <div className="text-sm font-medium">Load</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              {status
                ? `${status.load.one.toFixed(2)} / ${status.load.five.toFixed(2)} / ${status.load.fifteen.toFixed(2)}`
                : "—"}
            </div>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black p-4">
            <div className="text-sm font-medium">Memory</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              {status
                ? `${fmtGbFromKb(status.mem.totalKb - status.mem.availKb)} used / ${fmtGbFromKb(status.mem.totalKb)}`
                : "—"}
            </div>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black p-4">
            <div className="text-sm font-medium">Disk (/)</div>
            <div className="mt-1 text-sm text-black/70 dark:text-white/70">
              {status
                ? `${fmtGbFromKb(status.disk.usedKb)} used / ${fmtGbFromKb(status.disk.totalKb)}`
                : "—"}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black">
          <div className="border-b border-black/10 dark:border-white/15 px-4 py-3">
            <h2 className="text-sm font-medium">Services</h2>
            <p className="text-xs text-black/60 dark:text-white/60">
              Allowlisted via <code className="font-mono">ALLOWED_SERVICES</code>
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-black/60 dark:text-white/60">
                <tr className="text-left">
                  <th className="px-4 py-2 font-medium">Service</th>
                  <th className="px-4 py-2 font-medium">Active</th>
                  <th className="px-4 py-2 font-medium">Sub</th>
                  <th className="px-4 py-2 font-medium">Enabled</th>
                  <th className="px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-t border-black/10 dark:border-white/15">
                    <td className="px-4 py-2 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-2">{s.activeState}</td>
                    <td className="px-4 py-2">{s.subState}</td>
                    <td className="px-4 py-2">{s.unitFileState}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="h-8 rounded-md border border-black/10 dark:border-white/15 px-2 text-xs"
                          onClick={() => serviceAction(s.id, "start")}
                        >
                          Start
                        </button>
                        <button
                          className="h-8 rounded-md border border-black/10 dark:border-white/15 px-2 text-xs"
                          onClick={() => serviceAction(s.id, "stop")}
                        >
                          Stop
                        </button>
                        <button
                          className="h-8 rounded-md border border-black/10 dark:border-white/15 px-2 text-xs"
                          onClick={() => serviceAction(s.id, "restart")}
                        >
                          Restart
                        </button>
                        <button
                          className="h-8 rounded-md border border-black/10 dark:border-white/15 px-2 text-xs"
                          onClick={() => serviceAction(s.id, "enable")}
                        >
                          Enable
                        </button>
                        <button
                          className="h-8 rounded-md border border-black/10 dark:border-white/15 px-2 text-xs"
                          onClick={() => serviceAction(s.id, "disable")}
                        >
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {services.length === 0 ? (
                  <tr>
                    <td className="px-4 py-3 text-black/60 dark:text-white/60" colSpan={5}>
                      No services configured.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black">
            <div className="border-b border-black/10 dark:border-white/15 px-4 py-3">
              <h2 className="text-sm font-medium">Cron (user)</h2>
            </div>
            <div className="divide-y divide-black/10 dark:divide-white/15">
              {cron.map((c) => (
                <div key={c.index} className="px-4 py-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-mono break-words">{c.line}</div>
                    <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                      {c.enabled ? "enabled" : "disabled"}
                    </div>
                  </div>
                  <button
                    className="h-8 shrink-0 rounded-md border border-black/10 dark:border-white/15 px-2 text-xs"
                    onClick={() => toggleCron(c.index, !c.enabled)}
                  >
                    {c.enabled ? "Disable" : "Enable"}
                  </button>
                </div>
              ))}
              {cron.length === 0 ? (
                <div className="px-4 py-3 text-sm text-black/60 dark:text-white/60">
                  No cron entries found.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black">
            <div className="border-b border-black/10 dark:border-white/15 px-4 py-3">
              <h2 className="text-sm font-medium">Top processes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-black/60 dark:text-white/60">
                  <tr className="text-left">
                    <th className="px-4 py-2 font-medium">PID</th>
                    <th className="px-4 py-2 font-medium">Command</th>
                    <th className="px-4 py-2 font-medium">CPU%</th>
                    <th className="px-4 py-2 font-medium">MEM%</th>
                    <th className="px-4 py-2 font-medium">ETime</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((p) => (
                    <tr key={p.pid} className="border-t border-black/10 dark:border-white/15">
                      <td className="px-4 py-2 font-mono text-xs">{p.pid}</td>
                      <td className="px-4 py-2 font-mono text-xs">{p.command}</td>
                      <td className="px-4 py-2">{p.cpu.toFixed(1)}</td>
                      <td className="px-4 py-2">{p.mem.toFixed(1)}</td>
                      <td className="px-4 py-2 font-mono text-xs">{p.etime}</td>
                    </tr>
                  ))}
                  {processes.length === 0 ? (
                    <tr>
                      <td className="px-4 py-3 text-black/60 dark:text-white/60" colSpan={5}>
                        No process data.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
