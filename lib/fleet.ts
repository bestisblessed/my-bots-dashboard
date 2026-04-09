export type FleetServer = {
  id: "trinity" | "morpheus";
  displayName: string;
  address: string;
  platform: string;
  connected: boolean;
  lastSeen: string;
};

export type FleetCronJob = {
  id: string;
  schedule: string;
  command: string;
  enabled: boolean;
};

export type FleetPayload = {
  servers: FleetServer[];
  cronByServer: Record<FleetServer["id"], FleetCronJob[]>;
};

function parseCronEnv(value: string | undefined, fallback: FleetCronJob[]) {
  if (!value || !value.trim()) return fallback;

  return value
    .split("||")
    .map((entry, idx) => {
      const [schedule = "", command = "", enabledRaw = "true"] = entry.split("::");
      return {
        id: `env-${idx}`,
        schedule: schedule.trim(),
        command: command.trim(),
        enabled: enabledRaw.trim().toLowerCase() !== "false",
      };
    })
    .filter((entry) => entry.schedule && entry.command);
}

export function getFleetPayload(): FleetPayload {
  const now = new Date().toISOString();

  const servers: FleetServer[] = [
    {
      id: "trinity",
      displayName: "trinity",
      address: process.env.TRINITY_ADDRESS ?? "100.71.43.1",
      platform: process.env.TRINITY_PLATFORM ?? "Linux",
      connected: (process.env.TRINITY_CONNECTED ?? "true") !== "false",
      lastSeen: process.env.TRINITY_LAST_SEEN ?? now,
    },
    {
      id: "morpheus",
      displayName: "morpheus",
      address: process.env.MORPHEUS_ADDRESS ?? "100.123.190.74",
      platform: process.env.MORPHEUS_PLATFORM ?? "Linux",
      connected: (process.env.MORPHEUS_CONNECTED ?? "true") !== "false",
      lastSeen: process.env.MORPHEUS_LAST_SEEN ?? now,
    },
  ];

  const trinityFallback: FleetCronJob[] = [
    {
      id: "tri-1",
      schedule: "*/5 * * * *",
      command: "/opt/bots/heartbeat.sh trinity",
      enabled: true,
    },
    {
      id: "tri-2",
      schedule: "15 * * * *",
      command: "/opt/bots/rebalance_trinity.py",
      enabled: true,
    },
    {
      id: "tri-3",
      schedule: "0 3 * * *",
      command: "/opt/bots/backup_state.sh",
      enabled: false,
    },
  ];

  const morpheusFallback: FleetCronJob[] = [
    {
      id: "mor-1",
      schedule: "*/10 * * * *",
      command: "/opt/bots/health_ping.sh morpheus",
      enabled: true,
    },
    {
      id: "mor-2",
      schedule: "*/30 * * * *",
      command: "/opt/bots/scan_markets.py",
      enabled: true,
    },
    {
      id: "mor-3",
      schedule: "45 2 * * *",
      command: "/opt/bots/retrain_signals.py",
      enabled: false,
    },
  ];

  return {
    servers,
    cronByServer: {
      trinity: parseCronEnv(process.env.TRINITY_CRON_JOBS, trinityFallback),
      morpheus: parseCronEnv(process.env.MORPHEUS_CRON_JOBS, morpheusFallback),
    },
  };
}
