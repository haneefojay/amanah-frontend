import { DashboardShell } from "@/components/shell/dashboard-shell";

export default function WitnessLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="WITNESS">{children}</DashboardShell>;
}
