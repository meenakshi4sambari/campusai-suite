import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/lib/sample-data";
import { AlertTriangle, Sparkles, CalendarClock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — CampusPM AI" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const iconFor = (t: string) => {
    if (t === "risk") return { I: AlertTriangle, cls: "bg-destructive/10 text-destructive" };
    if (t === "ai") return { I: Sparkles, cls: "bg-primary-soft text-primary" };
    if (t === "milestone") return { I: CalendarClock, cls: "bg-info/10 text-info" };
    return { I: CheckCircle2, cls: "bg-success/10 text-success" };
  };

  return (
    <AppShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-[1100px] mx-auto">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">{notifications.length} updates from across your portfolio.</p>
        </div>

        <Card className="shadow-soft">
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {notifications.map((n) => {
                const { I, cls } = iconFor(n.type);
                return (
                  <li key={n.id} className="p-4 flex items-center gap-3 hover:bg-muted/40">
                    <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", cls)}>
                      <I className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.time}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
