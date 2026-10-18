"use client";

import { useQuery } from "@tanstack/react-query";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AmanahMark } from "@/components/brand/amanah-mark";
import { api } from "@/lib/api/client";
import type { UserRole } from "@/lib/api/schemas";
import { cn } from "@/lib/cn";
import { areaByRole, isActive } from "./nav-config";

/**
 * Layout for the staff areas (F1.4): top bar, then navigation that is a sidebar on wide screens
 * and a bottom bar on phones (one <nav>, restyled by breakpoint), then the page.
 * Session checks and redirects arrive in F5.2; until then the role comes from the route.
 */
export function DashboardShell({ role, children }: { role: UserRole; children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const area = areaByRole[role];
  const me = useQuery({ queryKey: ["me"], queryFn: api.getMe, retry: false });

  return (
    <div className="min-h-dvh bg-sand-100">
      <header className="sticky top-0 z-30 border-b border-border bg-brand-900 text-sand-100">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <AmanahMark size={32} tone="light" />
            <span className="text-lg font-extrabold tracking-[-0.02em]">Amanah</span>
            <span className="rounded-full bg-sand-100/10 px-2.5 py-0.5 text-xs font-semibold">
              {area.label}
            </span>
          </Link>
          <span className="truncate text-sm text-sand-100/85" data-testid="current-user">
            {me.data?.data.name ?? ""}
          </span>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1200px] gap-8 md:px-8 md:py-8">
        <nav
          aria-label={`${area.label} navigation`}
          className={cn(
            // Phones: fixed bottom bar with safe-area padding.
            "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-sand-50 pb-[env(safe-area-inset-bottom)]",
            // Wide screens: sticky sidebar.
            "md:sticky md:inset-x-auto md:top-24 md:bottom-auto md:h-fit md:w-56 md:flex-none md:rounded-2xl md:border md:p-2",
          )}
        >
          <ul className="flex md:flex-col md:gap-1">
            {area.nav.map((item) => {
              const active = isActive(item, pathname, area.home);
              const Icon = item.icon;
              return (
                <li key={item.href} className="flex-1 md:flex-none">
                  <Link
                    href={item.href as Route}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-xs font-semibold text-ink-600",
                      "md:min-h-11 md:flex-row md:justify-start md:gap-3 md:rounded-xl md:px-3 md:text-[15px]",
                      "hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700",
                      active && "text-brand-900 md:bg-brand-50",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main id="main" className="min-w-0 flex-1 px-5 pt-6 pb-28 md:px-0 md:pt-0 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
