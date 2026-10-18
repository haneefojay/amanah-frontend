import { Container } from "./container";
import { EyeIcon, HeartIcon, HouseIcon, ShieldIcon } from "./icons";

const audiences = [
  {
    title: "Donors",
    body: "Give as a guest in under a minute. Follow the campaign to the last receipt.",
    Icon: HeartIcon,
  },
  {
    title: "Organisations",
    body: "Publish itemised needs, log spending from your phone and post updates as work happens.",
    Icon: HouseIcon,
  },
  {
    title: "Witnesses",
    body: "Respected community members, never the organisation's own admins, who confirm each delivery.",
    Icon: EyeIcon,
  },
  {
    title: "The Amanah team",
    body: "Verifies organisations, reviews every campaign before it goes live, and keeps a permanent audit log.",
    Icon: ShieldIcon,
  },
] as const;

export function AudienceSection() {
  return (
    <section aria-labelledby="who-title" className="border-t border-sand-400 bg-sand-50">
      <Container className="flex flex-col gap-12 py-[clamp(72px,9vw,112px)]">
        <h2
          id="who-title"
          className="max-w-[20ch] text-[clamp(32px,3.6vw,48px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance"
        >
          Everyone in the chain of trust has a part
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-12 gap-y-10">
          {audiences.map(({ title, body, Icon }) => (
            <div key={title} className="flex flex-col gap-3">
              <Icon size={32} strokeWidth={1.8} className="text-brand-900" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-base leading-[1.55] text-ink-600">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
