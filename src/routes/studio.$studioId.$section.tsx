import { createFileRoute, notFound } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { TrendBars } from "@/components/studio-charts";
import {
  EmptyState,
  MetricCard,
  Panel,
  QuickActionRow,
  SectionHeader,
  SimpleList,
  StudioGlyph,
} from "@/components/studio-kit";
import {
  blogData,
  customerData,
  newsData,
  quickActions,
  sellerData,
  webtoonData,
} from "@/lib/mock-data";
import { getStudio, studioNav, type StudioKind } from "@/lib/studios";

type Row = { key: string; primary: string; secondary?: string; value?: string; badge?: string };

const sectionRows: Record<StudioKind, Record<string, Row[]>> = {
  seller: {
    products: sellerData.topProducts.map((p) => ({
      key: p.name,
      primary: p.name,
      secondary: `${p.sold} sold`,
      value: p.revenue,
    })),
    orders: sellerData.orders.map((o) => ({
      key: o.id,
      primary: `${o.id} · ${o.customer}`,
      secondary: o.items,
      value: o.total,
      badge: o.status,
    })),
    inventory: sellerData.inventory.map((i) => ({
      key: i.name,
      primary: i.name,
      secondary: "Low stock",
      value: `${i.left} left`,
    })),
  },
  news: {
    articles: newsData.articles.map((a) => ({
      key: a.title,
      primary: a.title,
      secondary: a.desk,
      value: a.views,
      badge: a.status,
    })),
    drafts: newsData.drafts.map((d) => ({
      key: d.title,
      primary: d.title,
      secondary: `Updated ${d.updated}`,
    })),
    published: newsData.articles
      .filter((a) => a.status === "Published")
      .map((a) => ({ key: a.title, primary: a.title, secondary: a.desk, value: a.views })),
  },
  blog: {
    posts: blogData.posts.map((p) => ({
      key: p.title,
      primary: p.title,
      secondary: `${p.comments} comments`,
      value: p.views,
      badge: p.status,
    })),
    comments: blogData.comments.map((c) => ({
      key: c.author + c.post,
      primary: `${c.author}: ${c.text}`,
      secondary: c.post,
    })),
  },
  webtoon: {
    episodes: webtoonData.episodes.map((e) => ({
      key: e.title,
      primary: e.title,
      value: e.views,
      badge: e.status,
    })),
    series: webtoonData.series.map((s) => ({
      key: s.title,
      primary: s.title,
      secondary: `${s.episodes} episodes`,
      value: s.subs,
    })),
  },
  customer: {
    orders: customerData.orders.map((o) => ({
      key: o.id,
      primary: `${o.id} · ${o.item}`,
      value: o.total,
      badge: o.status,
    })),
  },
};

const metricsFor: Record<StudioKind, { label: string; value: string; delta?: string }[]> = {
  seller: sellerData.metrics,
  news: newsData.metrics,
  blog: blogData.metrics,
  webtoon: webtoonData.metrics,
  customer: customerData.metrics,
};

const trendFor: Record<StudioKind, { label: string; value: number }[]> = {
  seller: sellerData.trend,
  news: newsData.trend,
  blog: blogData.trend,
  webtoon: webtoonData.trend,
  customer: customerData.trend,
};

export const Route = createFileRoute("/studio/$studioId/$section")({
  loader: ({ params }) => {
    const studio = getStudio(params.studioId);
    if (!studio) throw notFound();
    const nav = studioNav[studio.kind].find((n) => n.section === params.section);
    if (!nav) throw notFound();
  },
  component: StudioSection,
});

function StudioSection() {
  const { studioId, section } = Route.useParams();
  const studio = getStudio(studioId);
  if (!studio) return null;

  const nav = studioNav[studio.kind].find((n) => n.section === section);
  const label = nav?.label ?? section;
  const rows = sectionRows[studio.kind][section];
  const isAnalytics = section === "analytics";
  const isSettings = section === "settings";

  return (
    <div className="space-y-6">
      <Panel className="flex flex-wrap items-center gap-4">
        <StudioGlyph studio={studio} size="md" />
        <div>
          <p className="text-xs font-medium text-muted-foreground">{studio.name}</p>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{label}</h1>
        </div>
      </Panel>

      {isAnalytics ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metricsFor[studio.kind].map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
            ))}
          </div>
          <Panel>
            <p className="mb-3 text-sm font-semibold text-foreground">Last 7 days</p>
            <TrendBars data={trendFor[studio.kind]} accent={studio.accent} />
          </Panel>
        </>
      ) : null}

      {rows && rows.length > 0 ? (
        <Panel>
          <SectionHeader title={label} description={`${rows.length} items`} />
          <SimpleList rows={rows} />
        </Panel>
      ) : null}

      {isSettings ? (
        <Panel>
          <p className="text-sm font-semibold text-foreground">{studio.typeLabel} settings</p>
          <SimpleList
            rows={[
              { key: "name", primary: "Studio name", value: studio.name },
              { key: "scope", primary: "Scope", value: studio.scope },
              { key: "status", primary: "Status", badge: studio.status },
              ...studio.stats.map((s) => ({ key: s.label, primary: s.label, value: s.value })),
            ]}
          />
        </Panel>
      ) : null}

      {!rows && !isAnalytics && !isSettings ? (
        <EmptyState
          icon={Sparkles}
          title={`${label} is ready for content`}
          description={`Nothing here yet for ${studio.name}. Start with a quick action below.`}
        />
      ) : null}

      <section>
        <SectionHeader title="Quick Actions" />
        <QuickActionRow actions={quickActions[studio.kind] ?? []} />
      </section>
    </div>
  );
}
