import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge, RiskBadge, HealthBar } from "@/components/status-badges";
import { projects, milestones, aiInsights, workloadByDept, healthTrend } from "@/lib/sample-data";
import {
  Activity, AlertTriangle, CalendarClock, CheckCircle2,
  Sparkles, TrendingUp, ArrowUpRight, X, Loader2, Bell,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CampusPM AI" },
      { name: "description", content: "AI-powered university project operations dashboard." },
    ],
  }),
  component: DashboardPage,
});

function Kpi({ label, value, delta, icon: Icon, tone }: {
  label: string; value: string; delta: string; icon: any;
  tone: "primary" | "warning" | "info" | "success";
}) {
  const toneCls = {
    primary: "bg-primary-soft text-primary",
    warning: "bg-warning/15 text-warning-foreground",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
  }[tone];
  return (
    <Card className="shadow-soft">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              {delta}
            </div>
          </div>
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${toneCls}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const SAMPLE_REPORT = `EXECUTIVE SUMMARY

• Campus WiFi rollout delayed due to vendor approval.
• Registrar workflow blocked pending compliance review.
• Research Management initiative progressing on schedule.

KEY RISKS
• Procurement delays
• Approval bottlenecks
• Timeline slippage risk

ACTION ITEMS
• Escalate procurement review
• Schedule stakeholder alignment meeting
• Finalize security audit

OVERALL STATUS
Moderate operational risk with manageable escalation items.`;

function mockAnalyze(notes: string) {
  return `EXECUTIVE SUMMARY
Discussion covered ${notes.split(/\s+/).filter(Boolean).length} words across multiple workstreams.

ACTION ITEMS
• Follow up on procurement timeline
• Confirm stakeholder availability for next review
• Update risk register

BLOCKERS
• Awaiting vendor confirmation
• Pending compliance sign-off

RISKS
• Schedule slippage if approvals continue past Friday
• Resource contention with parallel initiatives

DEADLINES
• Status report: end of week
• Approval checkpoint: next Monday`;
}

function DashboardPage() {
  const [meetingNotes, setMeetingNotes] = useState("");
  const [result, setResult] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [executiveReport, setExecutiveReport] = useState("");
  const [generating, setGenerating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const analyzeNotes = async () => {
    if (!meetingNotes.trim()) return;
    setAnalyzing(true);
    setResult("Analyzing meeting notes…");
    try {
      const key = (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!key) {
        await new Promise((r) => setTimeout(r, 600));
        setResult(mockAnalyze(meetingNotes));
        return;
      }
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const prompt = `Analyze these university PM meeting notes. Extract: action items, blockers, risks, deadlines, executive summary.\n\nNotes:\n${meetingNotes}`;
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) {
      console.error(e);
      setResult(mockAnalyze(meetingNotes));
    } finally {
      setAnalyzing(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 400));
    setExecutiveReport(SAMPLE_REPORT);
    setGenerating(false);
  };

  return (
    <AppShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-primary uppercase tracking-wider">Executive Overview</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Good afternoon, Elena</h1>
            <p className="text-sm text-muted-foreground">
              Here's the institutional initiatives snapshot for the week of May 18 – 24.
            </p>
          </div>

          <div className="flex gap-2">
          
            <Button variant="outline" size="sm">Export snapshot</Button>
            <Button size="sm" className="gap-1.5" onClick={generateReport} disabled={generating}>
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate executive report
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Kpi label="Active Projects" value="18" delta="+2 vs last month" icon={Activity} tone="primary" />
          <Kpi label="At Risk" value="4" delta="−1 vs last week" icon={AlertTriangle} tone="warning" />
          <Kpi label="Upcoming Milestones" value="11" delta="next 14 days" icon={CalendarClock} tone="info" />
          <Kpi label="Pending Approvals" value="7" delta="3 over SLA" icon={CheckCircle2} tone="success" />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Portfolio Health Trend</CardTitle>
                <span className="text-xs text-muted-foreground">8 weeks</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthTrend} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="health" stroke="var(--primary)" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2"><CardTitle className="text-base">Team Workload</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workloadByDept} margin={{ top: 10, right: 4, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="dept" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="capacity" radius={[6, 6, 0, 0]} fill="var(--primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights + Heatmap */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Recent AI Insights</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">View all <ArrowUpRight className="h-3 w-3" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((i) => (
                <div key={i.title} className="rounded-lg border border-border p-4 hover:bg-muted/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">{i.title}</h3>
                        <RiskBadge risk={i.severity} />
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{i.project}</div>
                      <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{i.summary}</p>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-2"><CardTitle className="text-base">Risk Heatmap</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                {projects.slice(0, 6).map((p) => {
                  const tone =
                    p.risk === "critical" ? "bg-destructive text-destructive-foreground"
                    : p.risk === "high" ? "bg-warning text-warning-foreground"
                    : p.risk === "medium" ? "bg-info text-info-foreground"
                    : "bg-success text-success-foreground";
                  return (
                    <div key={p.id} className={`aspect-square rounded-md p-2 flex flex-col justify-between ${tone}`}>
                      <span className="font-semibold leading-tight line-clamp-2">{p.name}</span>
                      <span className="capitalize opacity-90">{p.risk}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-success" /> Low</div>
                <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-info" /> Medium</div>
                <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-warning" /> High</div>
                <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-destructive" /> Critical</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestones + Project table */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader className="pb-2"><CardTitle className="text-base">Upcoming Milestones</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {milestones.map((m) => (
                <div key={m.title} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center pt-0.5">
                    <div className={`h-2.5 w-2.5 rounded-full ${m.status === "at-risk" ? "bg-warning" : "bg-primary"}`} />
                    <div className="mt-1 w-px h-8 bg-border" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{m.date}</span>
                      {m.status === "at-risk" && (
                        <span className="text-[10px] font-medium text-warning-foreground bg-warning/15 px-1.5 py-0.5 rounded">AT RISK</span>
                      )}
                    </div>
                    <div className="text-sm font-medium mt-0.5">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.project}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Project Health</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
                  <a href="/projects">All projects <ArrowUpRight className="h-3 w-3" /></a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-muted-foreground border-b border-border">
                      <th className="text-left font-medium px-2 py-2">Project</th>
                      <th className="text-left font-medium px-2 py-2">Status</th>
                      <th className="text-left font-medium px-2 py-2">Risk</th>
                      <th className="text-left font-medium px-2 py-2">Health</th>
                      <th className="text-left font-medium px-2 py-2">Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map((p) => (
                      <tr key={p.id} className="border-b border-border/60 last:border-0">
                        <td className="px-2 py-3">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.department}</div>
                        </td>
                        <td className="px-2 py-3"><StatusBadge status={p.status} /></td>
                        <td className="px-2 py-3"><RiskBadge risk={p.risk} /></td>
                        <td className="px-2 py-3"><HealthBar value={p.health} /></td>
                        <td className="px-2 py-3 text-xs text-muted-foreground">{p.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Meeting Notes Analyzer */}
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">AI Meeting Notes Analyzer</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              placeholder="Paste meeting notes here…"
              className="min-h-32"
            />
            <Button onClick={analyzeNotes} disabled={analyzing || !meetingNotes.trim()} className="gap-1.5">
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Analyze Notes
            </Button>
            {result && (
              <div className="mt-4 p-4 border border-border rounded-xl bg-muted/40 whitespace-pre-wrap text-sm">
                {result}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Executive Report Modal */}
      {executiveReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
          onClick={() => setExecutiveReport("")}
        >
          <div
            className="bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold">AI Executive Report</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setExecutiveReport("")} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-5 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
              {executiveReport}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
