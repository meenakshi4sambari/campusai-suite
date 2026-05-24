import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — CampusPM AI" }] }),
  component: AIPage,
});

const SAMPLE = `Meeting: Campus WiFi Expansion — weekly sync
Attendees: Jordan (PM), Aruba vendor rep, Facilities lead, Procurement

- Aruba confirmed Phase 2 APs delayed another 2 weeks; alternative SKU available at 8% premium.
- Facilities flagged that North Quad conduit work is blocked until vendor confirms mounting spec.
- Procurement needs revised PO by Friday or budget rolls to next quarter.
- Open question: do we proceed with alternative SKU or hold for original units?
- Marcus to draft comms for affected departments by Wed.`;

interface AnalysisResult {
  summary: string;
  actions: { task: string; owner: string; due: string }[];
  blockers: string[];
  questions: string[];
  next: string[];
}

const MOCK_RESULT: AnalysisResult = {
  summary:
    "Phase 2 of the Campus WiFi rollout is slipping due to a vendor hardware delay. The team is evaluating an alternate SKU at an 8% premium and must align with procurement by Friday to preserve the current quarter's budget.",
  actions: [
    { task: "Draft executive memo on alternate SKU trade-off", owner: "Jordan Patel", due: "May 24" },
    { task: "Confirm mounting spec with Aruba vendor rep", owner: "Facilities Lead", due: "May 23" },
    { task: "Submit revised PO to procurement", owner: "Jordan Patel", due: "May 26" },
    { task: "Draft comms to affected departments", owner: "Marcus Hill", due: "May 25" },
  ],
  blockers: [
    "North Quad conduit work cannot start without vendor mounting spec",
    "Budget will roll to next quarter if PO is not revised by Friday",
  ],
  questions: [
    "Approve the 8% premium alternative SKU, or hold for original units?",
    "Is there flexibility to extend the Phase 2 deadline by two weeks?",
  ],
  next: [
    "Schedule 15-min decision call with sponsor for Thursday",
    "Stand up risk mitigation entry in portfolio register",
    "Notify North Quad facilities team of revised timeline",
  ],
};

function AIPage() {
  const [notes, setNotes] = useState(SAMPLE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setLoading(false);
    }, 1100);
  };

  return (
    <AppShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        <div>
          <div className="text-xs font-medium text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Meeting notes analyzer</h1>
          <p className="text-sm text-muted-foreground">
            Paste a transcript or notes — get action items, blockers, and an executive summary in seconds.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Notes input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={16}
                placeholder="Paste meeting notes or transcript here…"
                className="font-mono text-xs leading-relaxed resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={analyze} disabled={loading || !notes.trim()} className="flex-1 gap-1.5">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Analyzing…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Analyze with AI
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setNotes("")}>Clear</Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Demo uses sample analysis. Connect Lovable Cloud + an AI key to enable live inference.
              </p>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-4">
            {!result && !loading && (
              <Card className="shadow-soft border-dashed">
                <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">Ready to analyze</h3>
                  <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                    Run the analyzer to see action items, owners, deadlines, blockers, and an executive summary.
                  </p>
                </CardContent>
              </Card>
            )}

            {loading && (
              <Card className="shadow-soft">
                <CardContent className="p-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Extracting structured insights…
                </CardContent>
              </Card>
            )}

            {result && (
              <>
                <Card className="shadow-soft border-primary/20 bg-primary-soft/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" /> Executive Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground/90">{result.summary}</p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Action Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-muted-foreground border-b border-border">
                          <th className="text-left font-medium py-2">Task</th>
                          <th className="text-left font-medium py-2">Owner</th>
                          <th className="text-left font-medium py-2">Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.actions.map((a) => (
                          <tr key={a.task} className="border-b border-border/50 last:border-0">
                            <td className="py-2.5 pr-3">{a.task}</td>
                            <td className="py-2.5 pr-3 text-muted-foreground">{a.owner}</td>
                            <td className="py-2.5 text-muted-foreground tabular-nums">{a.due}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="shadow-soft">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-warning-foreground" /> Blockers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {result.blockers.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="text-warning-foreground mt-1">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4 text-info" /> Unresolved questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {result.questions.map((q) => (
                          <li key={q} className="flex gap-2">
                            <span className="text-info mt-1">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-1.5">
                      <ArrowRight className="h-4 w-4 text-primary" /> Next steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.next.map((n) => (
                        <li key={n} className="flex gap-2">
                          <span className="text-primary mt-1">→</span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
