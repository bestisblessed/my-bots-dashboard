"use client";

import { useCallback, useEffect, useState } from "react";

type Status = {
  uptimeSeconds: number;
  load: { one: number; five: number; fifteen: number };
  mem: { totalKb: number; availKb: number };
  disk: { totalKb: number; usedKb: number; availKb: number };
};

type FleetServer = {
  id: "trinity" | "morpheus";
  displayName: string;
  address: string;
  platform: string;
  connected: boolean;
  lastSeen: string;
};

type FleetCronJob = {
  id: string;
  schedule: string;
  command: string;
  enabled: boolean;
};

type FleetPayload = {
  servers: FleetServer[];
  cronByServer: Record<FleetServer["id"], FleetCronJob[]>;
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{value}</p>
    </div>
  );
}

export default function Home() {
  const [status, setStatus] = useState<Status | null>(null);
  const [fleet, setFleet] = useState<FleetPayload | null>(null);

  const refresh = useCallback(async () => {
    const [statusRes, fleetRes] = await Promise.allSettled([
      fetch("/api/status").then((r) => r.json()),
      fetch("/api/fleet").then((r) => r.json()),
    ]);

    if (statusRes.status === "fulfilled") {
      setStatus(statusRes.value);
    }

    if (fleetRes.status === "fulfilled") {
      setFleet(fleetRes.value);
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => refresh(), 0);
    const id = window.setInterval(() => refresh(), 7000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(id);
    };
  }, [refresh]);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
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
    <div className="min-h-screen bg-[#f4f7fb] p-4 text-zinc-900 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Bots Ops Dashboard</p>
              <h1 className="mt-1 text-2xl font-semibold">Fleet overview · trinity + morpheus</h1>
              <p className="text-sm text-zinc-600">Focused starter: connected servers and cron jobs from both nodes.</p>
            </div>
            <button className="h-9 rounded-md border border-black/10 px-3 text-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Uptime" value={status ? fmtSeconds(status.uptimeSeconds) : "—"} />
          <StatCard
            label="Load"
            value={
              status
                ? `${status.load.one.toFixed(2)} / ${status.load.five.toFixed(2)} / ${status.load.fifteen.toFixed(2)}`
                : "—"
            }
          />
          <StatCard
            label="Memory"
            value={
              status
                ? `${fmtGbFromKb(status.mem.totalKb - status.mem.availKb)} used / ${fmtGbFromKb(status.mem.totalKb)}`
                : "—"
            }
          />
          <StatCard
            label="Disk"
            value={status ? `${fmtGbFromKb(status.disk.usedKb)} used / ${fmtGbFromKb(status.disk.totalKb)}` : "—"}
          />
        </section>

        <section className="rounded-xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-4 py-3">
            <h2 className="text-sm font-semibold">Connected servers</h2>
          </div>
          <div className="grid gap-3 p-4 md:grid-cols-2">
            {(fleet?.servers ?? []).map((server) => (
              <div key={server.id} className="rounded-lg border border-black/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">{server.displayName}</p>
                    <p className="font-mono text-xs text-zinc-500">{server.address}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      server.connected ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {server.connected ? "Connected" : "Offline"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">
                  Platform: {server.platform} · Last seen: {new Date(server.lastSeen).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-4 py-3">
            <h2 className="text-sm font-semibold">Cron jobs · trinity and morpheus</h2>
          </div>
          <div className="space-y-4 p-4">
            {(fleet?.servers ?? []).map((server) => {
              const jobs = fleet?.cronByServer[server.id] ?? [];
              return (
                <div key={server.id} className="rounded-lg border border-black/10">
                  <div className="border-b border-black/10 px-3 py-2 text-sm font-semibold">{server.displayName}</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-xs text-zinc-500">
                        <tr>
                          <th className="px-3 py-2">Schedule</th>
                          <th className="px-3 py-2">Command</th>
                          <th className="px-3 py-2">State</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job.id} className="border-t border-black/10 align-top">
                            <td className="px-3 py-2 font-mono text-xs">{job.schedule}</td>
                            <td className="px-3 py-2 font-mono text-xs">{job.command}</td>
                            <td className="px-3 py-2 text-xs">
                              <span className={job.enabled ? "text-emerald-700" : "text-amber-700"}>
                                {job.enabled ? "enabled" : "disabled"}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {jobs.length === 0 && (
                          <tr>
                            <td colSpan={3} className="px-3 py-3 text-zinc-500">
                              No cron jobs configured for {server.displayName}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
