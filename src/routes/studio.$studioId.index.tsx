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

export const Route = createFileRoute("/studio/$studioId/")({
  component: StudioOverview;
});

function StudioOverview() {
  return null;
}
