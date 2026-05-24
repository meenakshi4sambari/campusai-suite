export type ProjectStatus = "on-track" | "at-risk" | "delayed" | "completed";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Project {
  id: string;
  name: string;
  department: string;
  owner: string;
  status: ProjectStatus;
  risk: RiskLevel;
  progress: number;
  health: number;
  budget: string;
  dueDate: string;
  nextMilestone: string;
  stakeholders: number;
  blockers: number;
  summary: string;
}

export const projects: Project[] = [
  {
    id: "P-101",
    name: "Student Portal Upgrade",
    department: "IT Services",
    owner: "Dr. Maya Chen",
    status: "on-track",
    risk: "low",
    progress: 68,
    health: 92,
    budget: "$420K",
    dueDate: "Aug 14, 2026",
    nextMilestone: "Beta release to 3 pilot colleges",
    stakeholders: 14,
    blockers: 1,
    summary:
      "Migration from legacy SIS portal to a unified React-based student experience. Pilot underway with strong engagement metrics.",
  },
  {
    id: "P-102",
    name: "Campus WiFi Expansion",
    department: "Network Infrastructure",
    owner: "Jordan Patel",
    status: "at-risk",
    risk: "high",
    progress: 41,
    health: 58,
    budget: "$1.2M",
    dueDate: "Oct 02, 2026",
    nextMilestone: "Phase 2 AP installation — North Quad",
    stakeholders: 22,
    blockers: 4,
    summary:
      "Hardware shipment delays plus a vendor SLA dispute are pushing the Phase 2 rollout. Mitigation plan in review with procurement.",
  },
  {
    id: "P-103",
    name: "Faculty Research Management System",
    department: "Research Office",
    owner: "Dr. Lin Okafor",
    status: "on-track",
    risk: "medium",
    progress: 55,
    health: 78,
    budget: "$680K",
    dueDate: "Jan 20, 2027",
    nextMilestone: "Grant workflow UAT with School of Sciences",
    stakeholders: 31,
    blockers: 2,
    summary:
      "End-to-end grant lifecycle platform. UAT scheduled, with minor scope clarifications around IRB integration.",
  },
  {
    id: "P-104",
    name: "Digital Admissions Workflow",
    department: "Admissions",
    owner: "Priya Ramanathan",
    status: "delayed",
    risk: "critical",
    progress: 27,
    health: 41,
    budget: "$310K",
    dueDate: "Jul 30, 2026",
    nextMilestone: "Decision letter automation sign-off",
    stakeholders: 11,
    blockers: 6,
    summary:
      "Approval bottleneck with the registrar plus unresolved data-residency questions. Executive escalation recommended.",
  },
  {
    id: "P-105",
    name: "AI Student Support Initiative",
    department: "Student Affairs",
    owner: "Marcus Hill",
    status: "on-track",
    risk: "low",
    progress: 82,
    health: 95,
    budget: "$220K",
    dueDate: "Jun 12, 2026",
    nextMilestone: "Launch advisor co-pilot to all undergrads",
    stakeholders: 9,
    blockers: 0,
    summary:
      "AI advising assistant integrated with course catalog. Strong satisfaction scores in pilot (4.6/5).",
  },
  {
    id: "P-106",
    name: "Library Discovery Platform",
    department: "University Libraries",
    owner: "Sara Whitfield",
    status: "on-track",
    risk: "medium",
    progress: 49,
    health: 74,
    budget: "$390K",
    dueDate: "Nov 10, 2026",
    nextMilestone: "Federated search integration",
    stakeholders: 17,
    blockers: 2,
    summary:
      "Unified search across catalog, archives, and digital collections. Integration with ProQuest pending.",
  },
];

export const milestones = [
  { date: "May 28", project: "AI Student Support", title: "Co-pilot rollout to undergrads", status: "upcoming" },
  { date: "Jun 04", project: "Student Portal", title: "Beta to pilot colleges", status: "upcoming" },
  { date: "Jun 11", project: "Admissions Workflow", title: "Registrar approval gate", status: "at-risk" },
  { date: "Jun 18", project: "Campus WiFi", title: "North Quad AP install", status: "at-risk" },
  { date: "Jul 02", project: "Research Mgmt", title: "Grant UAT — Sciences", status: "upcoming" },
];

export const aiInsights = [
  {
    title: "Approval bottleneck detected",
    project: "Digital Admissions Workflow",
    severity: "critical" as RiskLevel,
    summary:
      "5 decision packets have been pending registrar sign-off for >9 days. Recommend executive nudge by EOW.",
  },
  {
    title: "Vendor SLA risk increasing",
    project: "Campus WiFi Expansion",
    severity: "high" as RiskLevel,
    summary:
      "Repeated shipment slippage from Aruba reseller across 3 sprints. Consider escalating to procurement leadership.",
  },
  {
    title: "Scope clarification needed",
    project: "Faculty Research Mgmt",
    severity: "medium" as RiskLevel,
    summary:
      "IRB integration referenced in 4 recent meeting notes without owner. Suggest assigning to Research IT.",
  },
];

export const workloadByDept = [
  { dept: "IT Services", projects: 6, capacity: 78 },
  { dept: "Network Infra", projects: 3, capacity: 92 },
  { dept: "Research Office", projects: 4, capacity: 64 },
  { dept: "Admissions", projects: 2, capacity: 88 },
  { dept: "Student Affairs", projects: 3, capacity: 55 },
  { dept: "Libraries", projects: 2, capacity: 47 },
];

export const healthTrend = [
  { week: "W1", health: 71 },
  { week: "W2", health: 73 },
  { week: "W3", health: 70 },
  { week: "W4", health: 74 },
  { week: "W5", health: 76 },
  { week: "W6", health: 72 },
  { week: "W7", health: 78 },
  { week: "W8", health: 81 },
];

export const notifications = [
  { id: 1, type: "risk", title: "Critical: Admissions approval overdue", time: "12m ago" },
  { id: 2, type: "ai", title: "AI flagged 3 stalled stakeholders on WiFi project", time: "1h ago" },
  { id: 3, type: "milestone", title: "Milestone due tomorrow: Student Portal beta", time: "3h ago" },
  { id: 4, type: "approval", title: "Budget revision pending your review", time: "Yesterday" },
  { id: 5, type: "ai", title: "Weekly executive report ready to send", time: "Yesterday" },
];

export const stakeholders = [
  { name: "Provost's Office", lead: "Dr. Ana Reyes", projects: 4, status: "engaged" },
  { name: "IT Services", lead: "Dr. Maya Chen", projects: 6, status: "engaged" },
  { name: "Registrar", lead: "Tom Albright", projects: 3, status: "blocked" },
  { name: "Procurement", lead: "Linda Vasquez", projects: 5, status: "responsive" },
  { name: "Research Office", lead: "Dr. Lin Okafor", projects: 4, status: "engaged" },
  { name: "Student Affairs", lead: "Marcus Hill", projects: 3, status: "responsive" },
];
