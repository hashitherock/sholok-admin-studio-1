import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";

import { Panel, SectionHeader, StudioGlyph } from "@/components/studio-kit";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { currentUser } from "@/lib/mock-data";
import { studios } from "@/lib/studios";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Sholok Creator Studio" },
      {
        name: "description",
        content: "Manage your Sholok account, appearance, notification preferences and studio access.",
      },
      { property: "og:title", content: "Settings — Sholok Creator Studio" },
      { property: "og:description", content: "Account, appearance and studio preferences." },
    ],
  }),
  component: SettingsPage,
});

const prefs = [
  { label: "Order alerts", hint: "New orders and payment updates", on: true },
  { label: "Publishing updates", hint: "When articles and episodes go live", on: true },
  { label: "Comment activity", hint: "New comments and replies", on: false },
  { label: "Weekly digest", hint: "Sunday summary across all studios", on: true },
];

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" description="Account-level preferences for all your studios" />

      <Panel>
        <p className="text-sm font-semibold text-foreground">Account</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue={currentUser.fullName} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={currentUser.email} />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{currentUser.role}</p>
      </Panel>

      <Panel>
        <p className="text-sm font-semibold text-foreground">Appearance</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("light")}
          >
            <Sun className="mr-2 h-4 w-4" /> Light
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("dark")}
          >
            <Moon className="mr-2 h-4 w-4" /> Dark
          </Button>
        </div>
      </Panel>

      <Panel>
        <p className="text-sm font-semibold text-foreground">Notifications</p>
        <ul className="mt-2 divide-y divide-border">
          {prefs.map((p) => (
            <li key={p.label} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.hint}</p>
              </div>
              <Switch defaultChecked={p.on} aria-label={p.label} />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <p className="text-sm font-semibold text-foreground">Studio access</p>
        <Separator className="my-3" />
        <ul className="space-y-3">
          {studios.map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <StudioGlyph studio={s} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.typeLabel} · {s.scope}
                </p>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
