import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, RiskBadge, HealthBar } from "@/components/status-badges";
import { projects } from "@/lib/sample-data";
import { Plus, Filter, Search, Users, AlertOctagon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — CampusPM AI" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [q, setQ] = useState("");
  const filtered = projects.filter((p) =>
    [p.name, p.department, p.owner].some((s) => s.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground">
              {projects.length} active initiatives across 6 departments.
            </p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> New project
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" className="pl-9 h-9" />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} className="shadow-soft hover:shadow-elevated transition-shadow group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      {p.id} · {p.department}
                    </div>
                    <h3 className="mt-1 text-base font-semibold leading-snug">{p.name}</h3>
                  </div>
                  <RiskBadge risk={p.risk} />
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.summary}</p>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium tabular-nums">{p.progress}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Health</div>
                    <div className="mt-1"><HealthBar value={p.health} /></div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Status</div>
                    <div className="mt-1"><StatusBadge status={p.status} /></div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Due</div>
                    <div className="mt-1 font-medium">{p.dueDate}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Budget</div>
                    <div className="mt-1 font-medium">{p.budget}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {p.stakeholders}
                    </span>
                    {p.blockers > 0 && (
                      <span className="inline-flex items-center gap-1 text-destructive">
                        <AlertOctagon className="h-3.5 w-3.5" /> {p.blockers} blocker{p.blockers > 1 && "s"}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-foreground/80">{p.owner}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
