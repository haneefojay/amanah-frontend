import type { ReactNode } from "react";
import { publicEnv } from "@/lib/env";
import { SiteFooter } from "@/features/landing/site-footer";
import { SiteHeader } from "@/features/landing/site-header";
import { sectionIds } from "@/features/landing/nav-links";

/** Where "Register your organisation" goes: the team's inbox when configured, else the landing section. */
export function registerLinks(contactEmail = publicEnv.NEXT_PUBLIC_CONTACT_EMAIL) {
  return {
    contactHref: contactEmail ? `mailto:${contactEmail}` : undefined,
    registerHref: contactEmail
      ? `mailto:${contactEmail}?subject=${encodeURIComponent("Register my organisation on Amanah")}`
      : `/#${sectionIds.organisations}`,
  };
}

/**
 * Header, main landmark and footer shared by the public pages after the landing page (campaign
 * list, campaign page, organisation profile). Section links go back to the landing page.
 */
export function PublicShell({ children }: { children: ReactNode }) {
  const { registerHref, contactHref } = registerLinks();
  return (
    <div className="bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-bold focus:text-ink-900"
      >
        Skip to content
      </a>
      <SiteHeader registerHref={registerHref} basePath="/" />
      <main id="main">{children}</main>
      <SiteFooter registerHref={registerHref} contactHref={contactHref} basePath="/" />
    </div>
  );
}
