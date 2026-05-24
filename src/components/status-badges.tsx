import { cn } from "@/lib/utils";
import type { ProjectStatus, RiskLevel } from "@/lib/sample-data";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const map: Record<ProjectStatus, { label: string; cls: string; dot: string }> = {
    "on-track": { label: "On Track", cls: "bg-success/10 text-success border-success/20", dot: "bg-success" },
    "at-risk": { label: "At Risk", cls: "bg-warning/15 text-warning-foreground border-warning/30", dot: "bg-warning" },
    delayed: { label: "Delayed", cls: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
    completed: { label: "Completed", cls: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
  };
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", s.cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const map: Record<RiskLevel, string> = {
    low: "bg-success/10 text-success border-success/20",
    medium: "bg-info/10 text-info border-info/20",
    high: "bg-warning/15 text-warning-foreground border-warning/30",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium capitalize", map[risk])}>
      {risk}
    </span>
  );
}

export function HealthBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-success" : value >= 60 ? "bg-info" : value >= 40 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium tabular-nums text-foreground">{value}</span>
    </div>
  );
}
