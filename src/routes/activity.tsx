import { createFileRoute } from "@tanstack/react-router";

import { ActivityItem, Panel, SectionHeader } from "@/components/studio-kit";
import { activityFeed } from "@/lib/mock-data";

const groups = ["Today", "Yesterday", "Earlier this week"] as const;

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Recent Activity — Sholok Creator Studio" },
      {
        name: "description",
        content: "A single timeline of orders, articles, posts and episodes across all your studios.",
      },
      { property: "og:title", content: "Recent Activity — Sholok Creator Studio" },
      { property: "og:description", content: "One timeline for every studio you run." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Recent Activity" description="Everything happening across your studios" />
      <div className="space-y-6">
        {groups.map((g) => {
          const items = activityFeed.filter((a) => a.group === g);
          if (items.length === 0) return null;
          return (
            <section key={g}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {g}
              </p>
              <Panel>
                <ul>
                  {items.map((a, i, arr) => (
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
          );
        })}
      </div>
    </div>
  );
}
