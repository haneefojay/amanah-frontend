import { Container } from "./container";
import { AmanahMark } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { navLinks } from "./nav-links";

/** Top bar: logo, section links (desktop) and the menu button (phones). */
export function SiteHeader({ registerHref }: { registerHref: string }) {
  return (
    <header className="relative bg-brand-900 text-sand-100">
      <Container className="flex items-center justify-between gap-8 py-5">
        <a href="#top" className="flex items-center gap-3 text-sand-100" aria-label="Amanah home">
          <AmanahMark size={40} tone="light" />
          <span className="text-2xl font-extrabold tracking-[-0.02em]">Amanah</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 text-base font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 text-sand-100 hover:text-gold-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={registerHref}
            className="rounded-full bg-sand-100 px-5 py-3 font-semibold text-brand-900 hover:bg-white"
          >
            Register your organisation
          </a>
        </nav>
        <MobileMenu registerHref={registerHref} />
      </Container>
    </header>
  );
}
