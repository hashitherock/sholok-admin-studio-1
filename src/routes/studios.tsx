import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeader, StudioCard } from "@/components/studio-kit";
import { useStudioUI } from "@/components/studio-ui-context";
import { studios } from "@/lib/studios";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "My Studios — Sholok Creator Studio" },
      {
        name: "description",
        content: "Every Sholok studio you own: shop, newsroom, blog, webtoon and customer account.",
      },
      { property: "og:title", content: "My Studios — Sholok Creator Studio" },
      { property: "og:description", content: "All of your Sholok studios in one list." },
    ],
  }),
  component: StudiosPage,
});

function StudiosPage() {
  const { openCreateStudio } = useStudioUI();
  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Studios"
        description={`${studios.length} studios connected to ${"your Sholok account"}`}
        action={
          <Button onClick={openCreateStudio}>
            <Plus className="mr-2 h-4 w-4" /> Create Studio
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {studios.map((s) => (
          <StudioCard key={s.id} studio={s} />
        ))}
      </div>
    </div>
  );
}
