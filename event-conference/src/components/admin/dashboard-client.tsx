"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

/** Format large numbers compactly for small screens */
function fmt(n: number) {
  return n.toLocaleString();
}

function fmtRevenue(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export function DashboardClient({
  capacity,
  sold,
  revenue,
  registrationsToday,
  breakdown,
}: {
  capacity: number;
  sold: number;
  revenue: number;
  registrationsToday: number;
  breakdown: { name: string; value: number; fill: string }[];
}) {
  const percent = Math.round((sold / capacity) * 100);

  const stats = [
    {
      label: "Tickets Sold",
      valueFull: fmt(sold),
      valueCompact: fmt(sold),
      meta: `${percent}% of ${fmt(capacity)} capacity`,
      trend: "+12%",
      trendUp: true,
      accent: "text-primary",
    },
    {
      label: "Revenue",
      valueFull: `$${fmt(revenue)}`,
      valueCompact: fmtRevenue(revenue),
      meta: "Gross ticket revenue",
      trend: "+8%",
      trendUp: true,
      accent: "text-[#52f4ff] dark:text-[#52f4ff]",
    },
    {
      label: "Today",
      valueFull: registrationsToday.toString(),
      valueCompact: registrationsToday.toString(),
      meta: "Registrations today",
      trend: "+3",
      trendUp: true,
      accent: "text-[#7dff98] dark:text-[#7dff98]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Stat cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/45">{stat.label}</p>
              <span
                className={`shrink-0 rounded-full border border-current/20 bg-current/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide ${stat.trendUp ? "text-[#2e9b3e] dark:text-[#7dff98]" : "text-destructive"}`}
              >
                {stat.trendUp ? "↑" : "↓"} {stat.trend}
              </span>
            </div>
            {/* Compact value on xs, full value on sm+ */}
            <p className="mt-4 font-heading text-4xl font-black uppercase text-foreground sm:hidden">
              {stat.valueCompact}
            </p>
            <p className="mt-4 hidden font-heading text-5xl font-black uppercase text-foreground sm:block">
              {stat.valueFull}
            </p>
            <p className="mt-2 text-sm text-foreground/55">{stat.meta}</p>
          </article>
        ))}
      </div>

      {/* ── Capacity + breakdown row ──────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">

        {/* Capacity tracker */}
        <div className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-primary">Capacity Tracker</p>
              <h3 className="mt-2 font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
                Demand is running hot.
              </h3>
            </div>
            <p className="text-sm text-foreground/50">Target: Sep 5</p>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-foreground/45">
              <span className="uppercase tracking-[0.2em]">Sold</span>
              <span className="font-heading text-base font-bold text-foreground">{percent}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-foreground/10 sm:h-4">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-foreground/40">
              <span>{fmt(sold)} sold</span>
              <span>{fmt(capacity - sold)} remaining</span>
            </div>
          </div>

          {/* Mini tier bars */}
          <div className="mt-6 space-y-3">
            {breakdown.map((entry) => {
              const tierPct = Math.round((entry.value / sold) * 100);
              return (
                <div key={entry.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                      <span className="text-xs uppercase tracking-[0.2em] text-foreground/55">{entry.name}</span>
                    </div>
                    <span className="text-xs font-medium text-foreground/70">
                      {fmt(entry.value)} · {tierPct}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${tierPct}%`, backgroundColor: entry.fill }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie chart breakdown */}
        <aside className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Attendee Breakdown</p>
          <h3 className="mt-2 font-heading text-2xl font-black uppercase text-foreground sm:text-3xl">
            By ticket type
          </h3>

          {/* Chart — min-h so ResponsiveContainer never gets 0 */}
          <div className="mt-4 min-h-[220px] sm:min-h-[260px]">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="78%"
                  stroke="transparent"
                >
                  {breakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend rows */}
          <div className="mt-2 space-y-2.5">
            {breakdown.map((entry) => {
              const pct = Math.round((entry.value / sold) * 100);
              return (
                <div
                  key={entry.name}
                  className="flex items-center justify-between rounded-2xl border border-border px-4 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.fill }}
                    />
                    <span className="text-sm text-foreground/70">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-base font-bold uppercase text-foreground">
                      {fmt(entry.value)}
                    </span>
                    <span className="ml-2 text-xs text-foreground/40">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
