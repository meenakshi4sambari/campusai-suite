import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { stakeholders } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stakeholders")({
  head: () => ({ meta: [{ title: "Stakeholders — CampusPM AI" }] }),
  component: StakeholdersPage,
});

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

function StakeholdersPage() {
  return (
    <AppShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Stakeholders</h1>
          <p className="text-sm text-muted-foreground">Departments, leads, and communication health.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stakeholders.map((s) => {
            const statusCls = {
              engaged: "bg-success/10 text-success border-success/20",
              responsive: "bg-info/10 text-info border-info/20",
              blocked: "bg-destructive/10 text-destructive border-destructive/20",
            }[s.status as "engaged" | "responsive" | "blocked"];

            return (
              <Card key={s.name} className="shadow-soft hover:shadow-elevated transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className="bg-primary-soft text-primary font-semibold">
                        {initials(s.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold">{s.name}</h3>
                      <p className="text-xs text-muted-foreground">{s.lead}</p>
                    </div>
                    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize", statusCls)}>
                      {s.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <div className="text-muted-foreground">Active projects</div>
                      <div className="mt-1 text-lg font-semibold">{s.projects}</div>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-3">
                      <div className="text-muted-foreground">Avg response</div>
                      <div className="mt-1 text-lg font-semibold">
                        {s.status === "blocked" ? "9d" : s.status === "engaged" ? "1d" : "3d"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent communication log</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border text-sm">
              {[
                { who: "Dr. Maya Chen", what: "Approved beta rollout plan for Student Portal", when: "Today, 10:42" },
                { who: "Tom Albright", what: "Requested clarification on decision letter automation", when: "Yesterday, 16:08" },
                { who: "Linda Vasquez", what: "Sent alternative SKU pricing — WiFi expansion", when: "Yesterday, 11:30" },
                { who: "Dr. Lin Okafor", what: "Confirmed UAT scope with Sciences faculty", when: "Mon, 09:15" },
              ].map((l, i) => (
                <li key={i} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{l.who}</div>
                    <div className="text-xs text-muted-foreground">{l.what}</div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{l.when}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
