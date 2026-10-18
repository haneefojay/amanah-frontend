import { Container } from "./container";
import { AmanahMark } from "./icons";
import { sectionIds } from "./nav-links";

type Props = {
  registerHref: string;
  /** mailto link for "Talk to the team"; left out when there is no contact email. */
  contactHref?: string;
};

type FooterLink = { label: string; href: string };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-1 text-[15px]">
      <span className="pb-2 font-bold text-sand-100">{title}</span>
      {links.map((link) => (
        <a key={link.label} href={link.href} className="py-[7px] hover:text-gold-300">
          {link.label}
        </a>
      ))}
    </nav>
  );
}

/** Footer: brand and link columns, then the large wordmark beside أمانة. */
export function SiteFooter({ registerHref, contactHref }: Props) {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Give",
      links: [
        { label: "Browse campaigns", href: `#${sectionIds.trail}` },
        { label: "How it works", href: `#${sectionIds.how}` },
        { label: "The cap", href: `#${sectionIds.cap}` },
      ],
    },
    {
      title: "Organisations",
      links: [
        { label: "Register your organisation", href: registerHref },
        ...(contactHref ? [{ label: "Talk to the team", href: contactHref }] : []),
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "Accountability", href: `#${sectionIds.trail}` },
        { label: "Witnesses", href: `#${sectionIds.how}` },
      ],
    },
  ];

  return (
    <footer className="overflow-hidden bg-brand-950 text-sand-100/75">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 pt-[clamp(56px,6vw,88px)] pb-12 min-[900px]:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <div className="col-span-2 flex max-w-[360px] flex-col gap-[18px] min-[900px]:col-span-1">
          <span className="flex items-center gap-2.5 text-[22px] font-extrabold tracking-[-0.02em] text-sand-100">
            <AmanahMark size={34} tone="light" />
            Amanah
          </span>
          <p className="text-[15px] leading-[1.6]">
            Transparent giving to verified Islamic organisations in Nigeria. See what each campaign
            needed, what your gift bought, and who confirmed it arrived.
          </p>
          <a
            href={`#${sectionIds.trail}`}
            className="self-start rounded-full bg-gold-500 px-[22px] py-[13px] text-[15px] font-bold text-ink-900 hover:bg-gold-300"
          >
            Browse campaigns
          </a>
        </div>
        {columns.map((column) => (
          <FooterColumn key={column.title} {...column} />
        ))}
      </Container>

      <Container>
        <div
          aria-hidden="true"
          className="flex items-end justify-between gap-6 overflow-hidden border-t border-sand-100/15 pt-8"
        >
          <span className="-mb-[0.04em] text-[clamp(72px,15vw,216px)] leading-[0.78] font-extrabold tracking-[-0.06em] text-sand-100">
            Amanah
          </span>
          <span
            lang="ar"
            dir="rtl"
            className="-mb-[0.1em] font-arabic-display text-[clamp(56px,10vw,150px)] leading-[0.9] font-bold text-gold-500"
          >
            أمانة
          </span>
        </div>
      </Container>
      <Container className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-sand-100/15 pt-6 pb-7 text-sm text-sand-100/60">
        <span>© {new Date().getFullYear()} Amanah</span>
        <span>General donations only. Payments by Paystack.</span>
      </Container>
    </footer>
  );
}
