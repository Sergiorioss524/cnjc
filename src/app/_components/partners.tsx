import { db } from "~/server/db";

export async function Partners() {
  const partners = await db.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  if (partners.length === 0) return null;

  return (
    <section
      id="partners"
      className="border-b border-paper-line py-14 md:py-20"
    >
      <div className="mx-auto max-w-wrap px-5 md:px-16">
        <div className="mb-11">
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
            Respaldo institucional
          </p>
          <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            Empresas que respaldan a la CNJ
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-14">
            {[...partners, ...partners].map((p, i) => (
              <a
                key={`${p.id}-${i}`}
                href={p.websiteUrl ?? undefined}
                target={p.websiteUrl ? "_blank" : undefined}
                rel={p.websiteUrl ? "noreferrer" : undefined}
                className="flex flex-shrink-0 items-center"
                aria-hidden={i >= partners.length ? "true" : undefined}
                tabIndex={i >= partners.length ? -1 : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="h-11 w-auto object-contain grayscale transition-[filter] hover:grayscale-0"
                />
              </a>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
