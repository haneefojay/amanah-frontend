import { DashboardShell } from "@/components/shell/dashboard-shell";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="ORG_ADMIN">{children}</DashboardShell>;
}
