import { Bell, BellOff } from "lucide-react";
import { useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/studio-kit";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const categories = ["All", "Orders", "Content", "Comments", "System"] as const;

export function NotificationsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<(typeof categories)[number]>("All");
  const items = notifications.filter((n) => tab === "All" || n.category === tab);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" /> Notifications
          </SheetTitle>
        </SheetHeader>

        <div className="flex gap-1.5 overflow-x-auto border-b border-border px-5 py-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                tab === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="h-[calc(100vh-9.5rem)] overflow-y-auto p-4">
          {items.length === 0 ? (
            <EmptyState
              icon={BellOff}
              title="No notifications"
              description={`Nothing in ${tab} right now. New activity across your Studios will land here.`}
            />
          ) : (
            <ul className="space-y-2">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "rounded-xl border p-3.5 transition-colors",
                    n.unread ? "border-primary/30 bg-primary-soft/60" : "border-border bg-surface",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    {n.unread ? <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">
                    {n.studio} · {n.time}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border p-4">
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Mark all as read
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
