import { Container } from "./container";
import { AmanahMark } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { CAMPAIGNS_HREF, navLinks } from "./nav-links";

/**
 * Top bar on white. From 900px the section links show inline; below that the menu button opens
 * them. "Register your organisation" shows as its own button from 1180px (below that it lives in
 * the menu and the "For organisations" link), so the bar always fits on one line.
 */
export function SiteHeader({
  registerHref,
  basePath = "",
}: {
  registerHref: string;
  /** "" on the landing page; "/" on other pages so section links go back to it. */
  basePath?: "" | "/";
}) {
  return (
    <header className="relative border-b border-mist-200 bg-white">
      <Container className="flex items-center justify-between gap-6 py-[18px]">
        <a href={basePath ? "/" : "#top"} className="flex items-center gap-2.5 text-brand-900">
          <AmanahMark size={36} tone="brand" />
          <span className="text-[22px] font-extrabold tracking-[-0.02em]">Amanah</span>
        </a>
        <nav
          aria-label="Main"
          className="hidden items-center gap-8 text-[15px] font-medium whitespace-nowrap text-ink-650 min-[900px]:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={`${basePath}${link.href}`}
              className="py-2.5 hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <a
            href={registerHref}
            className="hidden rounded-full border-[1.5px] border-brand-300 px-[18px] py-[11px] text-[15px] font-semibold whitespace-nowrap text-brand-900 hover:border-brand-700 min-[1180px]:inline-flex"
          >
            Register your organisation
          </a>
          <a
            href={CAMPAIGNS_HREF}
            className="rounded-full bg-brand-900 px-5 py-3 text-[15px] font-bold whitespace-nowrap text-white hover:bg-brand-700"
          >
            Give now
          </a>
          <MobileMenu registerHref={registerHref} basePath={basePath} />
        </div>
      </Container>
    </header>
  );
}
