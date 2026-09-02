import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { accentClasses, type Accent } from "@/lib/studios";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-popover)",
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};

const axisProps = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

export function TrendArea({
  data,
  xKey = "month",
  keys,
}: {
  data: Record<string, string | number>[];
  xKey?: string;
  keys: { key: string; label: string; color: string }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <defs>
            {keys.map((k) => (
              <linearGradient key={k.key} id={`grad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={k.color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={k.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} width={48} />
          <Tooltip contentStyle={tooltipStyle} />
          {keys.map((k) => (
            <Area
              key={k.key}
              type="monotone"
              dataKey={k.key}
              name={k.label}
              stroke={k.color}
              strokeWidth={2}
              fill={`url(#grad-${k.key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendBars({
  data,
  accent,
}: {
  data: { label: string; value: number }[];
  accent: Accent;
}) {
  const color = accentClasses[accent].chart;
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis {...axisProps} width={48} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-accent)" }} />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} maxBarSize={38} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SharePie({
  data,
}: {
  data: { name: string; value: number; accent: Accent }[];
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip contentStyle={tooltipStyle} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80}>
            {data.map((d) => (
              <Cell key={d.name} fill={accentClasses[d.accent].chart} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
