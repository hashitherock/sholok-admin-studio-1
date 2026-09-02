import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SharePie, TrendArea } from "@/components/studio-charts";
import {
  ActivityItem,
  MetricCard,
  Panel,
  QuickActionRow,
  SectionHeader,
  StudioCard,
  TaskItem,
} from "@/components/studio-kit";
import { useStudioUI } from "@/components/studio-ui-context";
import {
  activityFeed,
  currentUser,
  ecosystemMetrics,
  ecosystemTrend,
  quickActions,
  studioShare,
  tasks,
} from "@/lib/mock-data";
import { accentClasses, studios } from "@/lib/studios";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sholok Creator Studio — One home for every studio" },
      {
        name: "description",
        content:
          "Run your shop, newsroom, blog and webtoon from a single command center: activity, tasks, analytics and quick actions in one place.",
      },
      { property: "og:title", content: "Sholok Creator Studio" },
      {
        property: "og:description",
        content: "One command center for your store, newsroom, blog and webtoon studios.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { openCreateStudio } = useStudioUI();
  const today = activityFeed.filter((a) => a.group === "Today");

  return (
    <div className="space-y-10">
      <section className="surface-panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary-soft blur-2xl" />
        <div className="relative">
          <p className="text-sm font-medium text-primary">Sholok Creator Studio</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Good morning, {currentUser.name}.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {studios.length} studios are live today. {today.length} things happened this morning and{" "}
            {tasks.length} items need a decision from you.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={openCreateStudio}>
              <Plus className="mr-2 h-4 w-4" /> Create Studio
            </Button>
            <Button asChild variant="outline">
              <Link to="/analytics">
                View analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          title="My Studios"
          description="Switch into any studio to keep working."
          action={
            <Button asChild variant="ghost" size="sm">
              <Link to="/studios">See all</Link>
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {studios.map((s) => (
            <StudioCard key={s.id} studio={s} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionHeader
            title="Recent Activity"
            description="Across every studio"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/activity">Full feed</Link>
              </Button>
            }
          />
          <Panel>
            <ul>
              {activityFeed.slice(0, 5).map((a, i, arr) => (
                <ActivityItem
                  key={a.id}
                  accent={a.accent}
                  emoji={a.emoji}
                  studio={a.studio}
                  title={a.title}
                  detail={a.detail}
                  time={a.time}
                  last={i === arr.length - 1}
                />
              ))}
            </ul>
          </Panel>
        </section>

        <section className="lg:col-span-2">
          <SectionHeader
            title="Needs Your Attention"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/tasks">All tasks</Link>
              </Button>
            }
          />
          <ul className="space-y-2.5">
            {tasks.slice(0, 5).map((t) => (
              <TaskItem
                key={t.id}
                title={t.title}
                studio={t.studio}
                studioId={t.studioId}
                accent={t.accent}
                severity={t.severity}
                action={t.action}
              />
            ))}
          </ul>
        </section>
      </div>

      <section>
        <SectionHeader title="Quick Actions" description="Jump straight into the work." />
        <QuickActionRow actions={quickActions["home"] ?? []} />
      </section>

      <section>
        <SectionHeader title="Ecosystem at a Glance" description="Last 6 months, all studios" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ecosystemMetrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} delta={m.delta} trend={m.trend} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
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
      </section>
    </div>
  );
}
