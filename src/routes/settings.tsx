import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — CampusPM AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Workspace, profile, and AI preferences.</p>
        </div>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Elena Marsh" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="e.marsh@university.edu" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Project Manager" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dept">Department</Label>
              <Input id="dept" defaultValue="IT Services" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle className="text-base">AI preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "ai-risk", label: "Auto risk detection", desc: "Scan project signals daily and flag emerging risks." },
              { id: "ai-summary", label: "Weekly executive summary", desc: "Generate the weekly status report every Friday at 8am." },
              { id: "ai-notes", label: "Meeting notes analyzer", desc: "Suggest action items and owners after each note upload." },
            ].map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0">
                <div>
                  <Label htmlFor={p.id} className="text-sm font-medium">{p.label}</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                </div>
                <Switch id={p.id} defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save changes</Button>
        </div>
      </div>
    </AppShell>
  );
}
