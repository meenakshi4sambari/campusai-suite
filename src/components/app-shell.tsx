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

  // Safe client-side initialization wrapper for tracking dark mode state
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const [showNotifications, setShowNotifications] = useState(false);

  // Core implementation hook to mutate document styling classes on action clicks
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground antialiased transition-colors duration-200">
      {/* Sidebar Wrapper Container */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2.5 px-5 border-b border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">
              CampusPM
            </div>
            <div className="text-[11px] text-muted-foreground tracking-wide uppercase">
              AI Operations
            </div>
          </div>
        </div>

        {/* Primary Route Navigation Map Grid */}
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
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
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

      {/* Main Viewport Content Block */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Universal Top Header Nav Menu Bar */}
        <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-background/95 backdrop-blur sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, stakeholders, reports..."
              className="w-[320px] bg-muted/30"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Theme Modification Component Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark((prev) => !prev)}
              className="text-muted-foreground hover:text-foreground h-9 w-9 rounded-md transition-colors"
              title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {dark ? (
                <Sun className="h-[18px] w-[18px] text-amber-500" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </Button>

            {/* Notification Layout Stack */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-muted-foreground hover:text-foreground h-9 w-9 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-12 bg-popover text-popover-foreground shadow-xl rounded-xl p-4 w-72 z-50 border border-border mt-1">
                  <h3 className="font-bold mb-3 border-b border-border pb-1.5 text-sm">
                    Notifications
                  </h3>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
                      <span>⚠</span> Campus WiFi rollout delayed
                    </p>
                    <p className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
                      <span>📅</span> Registrar approval pending
                    </p>
                    <p className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
                      <span>✅</span> Research project on track
                    </p>
                    <p className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
                      <span>📝</span> Executive report generated
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Info Area */}
            <Avatar className="h-8 w-8 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                EM
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Main Nested Children View Area */}
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}