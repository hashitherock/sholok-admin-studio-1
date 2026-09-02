import { createFileRoute, notFound } from "@tanstack/react-router";

import { TrendBars } from "@/components/studio-charts";
import {
  MetricCard,
  Panel,
  QuickActionRow,
  SectionHeader,
  SimpleList,
  StatusDot,
  StudioGlyph,
  TaskItem,
} from "@/components/studio-kit";
import {
  activityFeed,
  blogData,
  customerData,
  newsData,
  quickActions,
  sellerData,
  tasks,
  webtoonData,
} from "@/lib/mock-data";
import { getStudio, type StudioKind } from "@/lib/studios";

type Row = { key: string; primary: string; secondary?: string; value?: string; badge?: string };

const dataFor = (kind: StudioKind) => {
  switch (kind) {
    case "seller":
      return {
        metrics: sellerData.metrics,
        trend: sellerData.trend,
        listTitle: "Latest orders",
        rows: sellerData.orders.map<Row>((o) => ({
          key: o.id,
          primary: `${o.id} · ${o.customer}`,
          secondary: o.items,
          value: o.total,
          badge: o.status,
        })),
        asideTitle: "Top products",
        asideRows: sellerData.topProducts.map<Row>((p) => ({
          key: p.name,
          primary: p.name,
          secondary: `${p.sold} sold`,
          value: p.revenue,
        })),
      };
    case "news":
      return {
        metrics: newsData.metrics,
        trend: newsData.trend,
        listTitle: "Recent articles",
        rows: newsData.articles.map<Row>((a) => ({
          key: a.title,
          primary: a.title,
          secondary: a.desk,
          value: a.views,
          badge: a.status,
        })),
        asideTitle: "Drafts in progress",
        asideRows: newsData.drafts.map<Row>((d) => ({
          key: d.title,
          primary: d.title,
          secondary: `Updated ${d.updated}`,
        })),
      };
    case "blog":
      return {
        metrics: blogData.metrics,
        trend: blogData.trend,
        listTitle: "Recent posts",
        rows: blogData.posts.map<Row>((p) => ({
          key: p.title,
          primary: p.title,
          secondary: `${p.comments} comments`,
          value: p.views,
          badge: p.status,
        })),
        asideTitle: "Latest comments",
        asideRows: blogData.comments.map<Row>((c) => ({
          key: c.author + c.post,
          primary: `${c.author}: ${c.text}`,
          secondary: c.post,
        })),
      };
    case "webtoon":
      return {
        metrics: webtoonData.metrics,
        trend: webtoonData.trend,
        listTitle: "Recent episodes",
        rows: webtoonData.episodes.map<Row>((e) => ({
          key: e.title,
          primary: e.title,
          value: e.views,
          badge: e.status,
        })),
        asideTitle: "Series",
        asideRows: webtoonData.series.map<Row>((s) => ({
          key: s.title,
          primary: s.title,
          secondary: `${s.episodes} episodes`,
          value: s.subs,
        })),
      };
    case "customer":
      return {
        metrics: customerData.metrics,
        trend: customerData.trend,
        listTitle: "My orders",
        rows: customerData.orders.map<Row>((o) => ({
          key: o.id,
          primary: `${o.id} · ${o.item}`,
          value: o.total,
          badge: o.status,
        })),
        asideTitle: "Shopping activity",
        asideRows: [
          { key: "w", primary: "Wishlist", secondary: "61 saved items" },
          { key: "r", primary: "Reviews", secondary: "1 pending review" },
          { key: "a", primary: "Addresses", secondary: "3 saved addresses" },
        ] as Row[],
      };
  }
};

export const Route = createFileRoute("/studio/$studioId/")({
  loader: ({ params }) => {
    if (!getStudio(params.studioId)) throw notFound();
  },
  component: StudioOverview,
});

function StudioOverview() {
  const { studioId } = Route.useParams();
  const studio = getStudio(studioId);
  if (!studio) return null;

  const data = dataFor(studio.kind);
  const studioTasks = tasks.filter((t) => t.studioId === studio.id);
  const feed = activityFeed.filter((a) => a.studioId === studio.id);

  return (
    <div className="space-y-6">
      <Panel className="flex flex-wrap items-center gap-4">
        <StudioGlyph studio={studio} size="lg" />
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{studio.name}</h1>
          <p className="text-sm text-muted-foreground">
            {studio.typeLabel} · {studio.scope}
          </p>
        </div>
        <div className="ml-auto">
          <StatusDot accent={studio.accent} label={studio.status} />
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <p className="mb-3 text-sm font-semibold text-foreground">Performance</p>
          <TrendBars data={data.trend} accent={studio.accent} />
        </Panel>
        <Panel className="lg:col-span-2">
          <p className="mb-3 text-sm font-semibold text-foreground">{data.asideTitle}</p>
          <SimpleList rows={data.asideRows} />
        </Panel>
      </div>

      <section>
        <SectionHeader title="Quick Actions" />
        <QuickActionRow actions={quickActions[studio.kind] ?? []} />
      </section>

      <Panel>
        <p className="mb-3 text-sm font-semibold text-foreground">{data.listTitle}</p>
        <SimpleList rows={data.rows} />
      </Panel>

      {studioTasks.length > 0 ? (
        <section>
          <SectionHeader title="Needs your attention" />
          <ul className="space-y-2.5">
            {studioTasks.map((t) => (
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
      ) : null}

      {feed.length > 0 ? (
        <Panel>
          <p className="mb-3 text-sm font-semibold text-foreground">Studio activity</p>
          <SimpleList
            rows={feed.map<Row>((a) => ({
              key: a.id,
              primary: a.title,
              secondary: a.detail,
              badge: a.time,
            }))}
          />
        </Panel>
      ) : null}
    </div>
  );
}
