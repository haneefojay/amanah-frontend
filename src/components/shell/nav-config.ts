import {
  Building2,
  CircleAlert,
  ClipboardCheck,
  FileCheck2,
  HandCoins,
  History,
  LayoutDashboard,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/lib/api/schemas";

export type NavItem = { href: string; label: string; icon: LucideIcon };

/** Staff areas and their navigation (spec §3, §7). Donors use the public pages only. */
export const areaByRole: Record<UserRole, { label: string; home: string; nav: NavItem[] }> = {
  ORG_ADMIN: {
    label: "Organisation",
    home: "/org",
    nav: [
      { href: "/org", label: "Overview", icon: LayoutDashboard },
      { href: "/org/campaigns", label: "Campaigns", icon: HandCoins },
      { href: "/org/profile", label: "Organisation", icon: Building2 },
    ],
  },
  WITNESS: {
    label: "Witness",
    home: "/witness",
    nav: [
      { href: "/witness", label: "Assigned", icon: ClipboardCheck },
      { href: "/witness/history", label: "History", icon: History },
    ],
  },
  PLATFORM_ADMIN: {
    label: "Admin",
    home: "/admin",
    nav: [
      { href: "/admin", label: "Verification", icon: ShieldCheck },
      { href: "/admin/campaigns", label: "Reviews", icon: FileCheck2 },
      { href: "/admin/excess", label: "Excess", icon: CircleAlert },
      { href: "/admin/audit", label: "Audit log", icon: ScrollText },
    ],
  },
};

/** True when `pathname` is this item's page (area homes match exactly, others by prefix). */
export function isActive(item: NavItem, pathname: string, areaHome: string): boolean {
  if (item.href === areaHome) return pathname === areaHome;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
