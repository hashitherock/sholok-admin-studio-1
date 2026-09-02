import { createFileRoute } from "@tanstack/react-router";

import { SectionHeader, TaskItem } from "@/components/studio-kit";
import { tasks } from "@/lib/mock-data";

const severities = ["high", "medium", "low"] as const;
const labels = {
  high: "Urgent",
  medium: "Soon",
  low: "When you have time",
} as const;

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Sholok Creator Studio" },
      {
        name: "description",
        content: "Low stock, pending reviews, unanswered comments — everything waiting on you.",
      },
      { property: "og:title", content: "Tasks — Sholok Creator Studio" },
      { property: "og:description", content: "Everything across your studios that needs a decision." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Tasks" description={`${tasks.length} items need your attention`} />
      {severities.map((s) => {
        const items = tasks.filter((t) => t.severity === s);
        if (items.length === 0) return null;
        return (
          <section key={s}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {labels[s]}
            </p>
            <ul className="space-y-2.5">
              {items.map((t) => (
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
        );
      })}
    </div>
  );
}
