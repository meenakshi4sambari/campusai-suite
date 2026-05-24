import { Link, useRouterState } from "@tanstack/react-router";

import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  FileBarChart,
  Users,
  Bell,
  Settings,
  GraduationCap,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/stakeholders", label: "Stakeholders", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (r) => r.location.pathname,
  });

  const [dark, setDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <GraduationCap className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold text-sidebar-foreground">
              CampusPM
            </div>

            <div className="text-[11px] text-muted-foreground tracking-wide uppercase">
              AI Operations
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", active && "text-primary")} />

                {item.label}

                {item.label === "Notifications" && (
                  <Badge className="ml-auto h-5 px-1.5 text-[10px] bg-destructive text-destructive-foreground">
                    4
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-background/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search projects, stakeholders, reports..."
              className="w-[320px]"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
              >
                <Bell className="h-5 w-5" />
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-14 bg-white shadow-xl rounded-xl p-4 w-72 z-50 border">
                  <h3 className="font-bold mb-3">
                    Notifications
                  </h3>

                  <div className="space-y-2 text-sm">
                    <p>⚠ Campus WiFi rollout delayed</p>
                    <p>📅 Registrar approval pending</p>
                    <p>✅ Research project on track</p>
                    <p>📝 Executive report generated</p>
                  </div>
                </div>
              )}
            </div>

            <Avatar>
              <AvatarFallback>
                EM
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
