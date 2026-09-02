import { createFileRoute } from "@tanstack/react-router";

import { Panel, SectionHeader } from "@/components/studio-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications, type Notification } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categories = ["All", "Orders", "Content", "Comments", "System"] as const;

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Sholok Creator Studio" },
      {
        name: "description",
        content: "Order alerts, publishing updates, comments and system notices from every studio.",
      },
      { property: "og:title", content: "Notifications — Sholok Creator Studio" },
      { property: "og:description", content: "Every studio alert in one inbox." },
    ],
  }),
  component: NotificationsPage,
});

function Row({ n }: { n: Notification }) {
  return (
    <li
      className={cn(
        "flex gap-3 rounded-xl border border-border p-3.5 transition-colors hover:bg-accent/50",
        n.unread ? "bg-primary-soft/50" : "bg-surface",
      )}
    >
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          n.unread ? "bg-primary" : "bg-muted-foreground/30",
        )}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{n.title}</p>
        <p className="text-sm text-muted-foreground">{n.body}</p>
        <p className="mt-1 text-xs text-muted-foreground/80">
          {n.studio} · {n.time}
        </p>
      </div>
      <span className="ml-auto shrink-0 self-start rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
        {n.category}
      </span>
    </li>
  );
}

function NotificationsPage() {
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <div className="space-y-6">
      <SectionHeader title="Notifications" description={`${unread} unread across all studios`} />
      <Tabs defaultValue="All">
        <TabsList>
          {categories.map((c) => (
            <TabsTrigger key={c} value={c}>
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((c) => {
          const items = c === "All" ? notifications : notifications.filter((n) => n.category === c);
          return (
            <TabsContent key={c} value={c} className="mt-4">
              <Panel className="p-3">
                <ul className="space-y-2">
                  {items.map((n) => (
                    <Row key={n.id} n={n} />
                  ))}
                </ul>
              </Panel>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
