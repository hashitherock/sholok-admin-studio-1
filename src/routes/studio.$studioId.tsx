import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { getStudio } from "@/lib/studios";

export const Route = createFileRoute("/studio/$studioId")({
  loader: ({ params }) => {
    const studio = getStudio(params.studioId);
    if (!studio) throw notFound();
    return { name: studio.name, typeLabel: studio.typeLabel };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Studio unavailable — Sholok" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} — Sholok Creator Studio`;
    const description = `Manage ${loaderData.name}, your Sholok ${loaderData.typeLabel.toLowerCase()} studio.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: () => <Outlet />,
});
