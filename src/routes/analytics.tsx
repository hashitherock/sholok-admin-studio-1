import { createFileRoute } from "@tanstack/react-router";

import { SharePie, TrendArea } from "@/components/studio-charts";
import { MetricCard, Panel, SectionHeader, SimpleList } from "@/components/studio-kit";
import { ecosystemMetrics, ecosystemTrend, studioShare } from "@/lib/mock-data";
import { accentClasses, studios } from "@/lib/studios";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Sholok Creator Studio" },
      {
        name: "description",
        content: "Views, orders, revenue and engagement rolled up across every Sholok studio you run.",
      },
      { property: "og:title", content: "Analytics — Sholok Creator Studio" },
      { property: "og:description", content: "Cross-studio performance in one view." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Analytics" description="All studios · last 6 months" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ecosystemMetrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} delta={m.delta} trend={m.trend} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <p className="mb-3 text-sm font-semibold text-foreground">Views &amp; revenue</p>
          <TrendArea
            data={ecosystemTrend}
            keys={[
              { key: "views", label: "Views", color: "var(--editorial)" },
              { key: "revenue", label: "Revenue", color: "var(--commerce)" },
            ]}
          />
        </Panel>
        <Panel className="lg:col-span-2">
          <p className="mb-3 text-sm font-semibold text-foreground">Share of activity</p>
          <SharePie data={studioShare} />
          <ul className="mt-3 space-y-1.5">
            {studioShare.map((s) => (
              <li key={s.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${accentClasses[s.accent].dot}`} />
                {s.name}
                <span className="ml-auto font-medium text-foreground">{s.value}%</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <p className="mb-3 text-sm font-semibold text-foreground">Per studio snapshot</p>
        <SimpleList
          rows={studios.map((s) => ({
            key: s.id,
            primary: s.name,
            secondary: s.stats.map((st) => `${st.label}: ${st.value}`).join(" · "),
            badge: s.typeLabel,
          }))}
        />
      </Panel>
    </div>
  );
}
