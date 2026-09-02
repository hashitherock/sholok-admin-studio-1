import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Settings,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { accentClasses, type Accent, type Studio } from "@/lib/studios";

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("surface-panel p-5", className)}>{children}</div>;
}

export function StudioGlyph({
  studio,
  size = "md",
}: {
  studio: Pick<Studio, "icon" | "accent">;
  size?: "sm" | "md" | "lg";
}) {
  const a = accentClasses[studio.accent];
  const Icon = studio.icon;
  const dims = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const ic = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        dims,
        a.softBg,
        a.text,
      )}
    >
      <Icon className={ic} strokeWidth={1.9} />
    </span>
  );
}

export function StatusDot({ accent, label }: { accent: Accent; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <span className={cn("h-1.5 w-1.5 rounded-full", accentClasses[accent].dot)} />
      {label}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
}) {
  return (
    <div className="surface-panel hover-raise p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} /> : null}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      {delta ? (
        <p
          className={cn(
            "mt-1 inline-flex items-center gap-1 text-xs font-medium",
            trend === "up" ? "text-success" : "text-destructive",
          )}
        >
          {trend === "up" ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {delta}
        </p>
      ) : null}
    </div>
  );
}

export function StudioCard({ studio }: { studio: Studio }) {
  const a = accentClasses[studio.accent];
  return (
    <div
      className={cn(
        "group surface-panel hover-raise relative flex flex-col p-5",
        a.border,
      )}
    >
      <div className="flex items-start justify-between">
        <StudioGlyph studio={studio} size="lg" />
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium",
            a.softBg,
            a.text,
          )}
        >
          {studio.typeLabel}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">{studio.name}</h3>
      <p className="text-sm text-muted-foreground">{studio.scope}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
        {studio.stats.map((s) => (
          <div key={s.label}>
            <dt className="text-xs text-muted-foreground">{s.label}</dt>
            <dd className="text-lg font-semibold text-foreground">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between">
        <StatusDot accent={studio.accent} label={studio.status} />
        <Link
          to="/studio/$studioId"
          params={{ studioId: studio.id }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          Open Studio
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-4 flex gap-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-within:opacity-100">
        <Button asChild size="sm" variant="secondary" className="flex-1">
          <Link to="/studio/$studioId" params={{ studioId: studio.id }}>
            Open
          </Link>
        </Button>
        <Button asChild size="sm" variant="ghost" className="flex-1">
          <Link
            to="/studio/$studioId/$section"
            params={{ studioId: studio.id, section: "analytics" }}
          >
            <BarChart3 className="mr-1.5 h-3.5 w-3.5" /> Analytics
          </Link>
        </Button>
        <Button asChild size="icon" variant="ghost" aria-label={`${studio.name} settings`}>
          <Link
            to="/studio/$studioId/$section"
            params={{ studioId: studio.id, section: "settings" }}
          >
            <Settings className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function ActivityItem({
  accent,
  emoji,
  studio,
  title,
  detail,
  time,
  last,
}: {
  accent: Accent;
  emoji: string;
  studio: string;
  title: string;
  detail: string;
  time: string;
  last?: boolean;
}) {
  return (
    <li className="relative flex gap-3 pb-5">
      {!last ? <span className="absolute left-[15px] top-9 bottom-0 w-px bg-border" /> : null}
      <span
        className={cn(
          "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm",
          accentClasses[accent].softBg,
        )}
        aria-hidden
      >
        {emoji}
      </span>
      <div className="min-w-0">
        <p className={cn("text-xs font-medium", accentClasses[accent].text)}>{studio}</p>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-sm text-muted-foreground">{detail}</p>
        <p className="mt-0.5 text-xs text-muted-foreground/80">{time}</p>
      </div>
    </li>
  );
}

const severityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/15 text-warning-foreground dark:text-warning",
  low: "bg-muted text-muted-foreground",
} as const;

export function TaskItem({
  title,
  studio,
  studioId,
  accent,
  severity,
  action,
}: {
  title: string;
  studio: string;
  studioId: string;
  accent: Accent;
  severity: "high" | "medium" | "low";
  action: string;
}) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:bg-accent/50">
      <span
        className={cn(
          "rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase",
          severityStyles[severity],
        )}
      >
        {severity}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className={cn("text-xs font-medium", accentClasses[accent].text)}>{studio}</p>
      </div>
      <Button asChild size="sm" variant="outline">
        <Link to="/studio/$studioId" params={{ studioId }}>
          {action}
        </Link>
      </Button>
    </li>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="surface-panel flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function SimpleList({
  rows,
}: {
  rows: { key: string; primary: string; secondary?: string; value?: string; badge?: string }[];
}) {
  return (
    <ul className="divide-y divide-border">
      {rows.map((r) => (
        <li key={r.key} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{r.primary}</p>
            {r.secondary ? (
              <p className="truncate text-xs text-muted-foreground">{r.secondary}</p>
            ) : null}
          </div>
          {r.value ? <span className="text-sm font-medium text-foreground">{r.value}</span> : null}
          {r.badge ? (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {r.badge}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function QuickActionRow({ actions }: { actions: { label: string; hint: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((a) => (
        <button
          key={a.label}
          className="group flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-soft)] transition-colors hover:border-primary/40 hover:bg-primary-soft"
        >
          {a.label}
          <span className="text-xs font-normal text-muted-foreground">{a.hint}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      ))}
    </div>
  );
}
