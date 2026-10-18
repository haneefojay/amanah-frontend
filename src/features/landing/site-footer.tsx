import { Container } from "./container";
import { AmanahMark } from "./icons";
import { navLinks } from "./nav-links";

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 text-sand-100/80">
      <Container className="flex flex-wrap items-start justify-between gap-x-16 gap-y-8 py-14">
        <div className="flex max-w-[420px] flex-col gap-3.5">
          <span className="flex items-center gap-2.5 text-xl font-extrabold text-sand-100">
            <AmanahMark size={30} tone="dark" />
            Amanah
          </span>
          <p className="text-[15px] leading-[1.6]">
            Transparent giving to verified Islamic organisations. See what each campaign needed,
            what your gift bought, and who confirmed it arrived.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="py-2 text-sand-100 hover:text-gold-300">
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
      <Container className="border-t border-sand-100/10 pt-5 pb-8 text-sm text-sand-100/65">
        © {new Date().getFullYear()} Amanah
      </Container>
    </footer>
  );
}
