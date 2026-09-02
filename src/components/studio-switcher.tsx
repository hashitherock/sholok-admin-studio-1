import { Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronsUpDown, Plus, Settings2 } from "lucide-react";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { StudioGlyph } from "@/components/studio-kit";
import { useStudioUI } from "@/components/studio-ui-context";
import { accentClasses, studios, type Studio } from "@/lib/studios";
import { cn } from "@/lib/utils";

export function StudioSwitcher({ active }: { active?: Studio }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { openCreateStudio } = useStudioUI();

  const select = (studio: Studio) => {
    setOpen(false);
    navigate({ to: "/studio/$studioId", params: { studioId: studio.id } });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex w-full items-center gap-3 rounded-xl border border-sidebar-border bg-surface px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Switch studio"
        >
          {active ? (
            <StudioGlyph studio={active} size="sm" />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-soft text-xs font-semibold text-primary">
              ALL
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-foreground">
              {active ? active.name : "All Studios"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {active ? active.typeLabel : "Sholok Studio Home"}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[19rem] p-0 shadow-[var(--shadow-pop)]"
      >
        <div className="px-3 pb-1 pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            My Studios
          </p>
        </div>
        <ul className="max-h-[22rem] overflow-y-auto p-2">
          <li>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent",
                !active && "bg-primary-soft",
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-[10px] font-semibold text-primary">
                ALL
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">All Studios</span>
                <span className="block text-xs text-muted-foreground">Unified home</span>
              </span>
              {!active ? <Check className="h-4 w-4 text-primary" /> : null}
            </Link>
          </li>
          {studios.map((studio) => {
            const selected = active?.id === studio.id;
            return (
              <li key={studio.id}>
                <button
                  onClick={() => select(studio)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent",
                    selected && "bg-primary-soft",
                  )}
                >
                  <StudioGlyph studio={studio} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {studio.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={cn("h-1.5 w-1.5 rounded-full", accentClasses[studio.accent].dot)} />
                      {studio.typeLabel} · {studio.scope}
                    </span>
                  </span>
                  {selected ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setOpen(false);
              openCreateStudio();
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Studio
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground">
            <Link to="/studios" onClick={() => setOpen(false)}>
              <Settings2 className="mr-2 h-4 w-4" /> Manage Studios
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
