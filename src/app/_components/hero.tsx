import { db } from "~/server/db";

export async function Hero() {
  const upcomingEvents = await db.evento.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <section className="relative overflow-hidden border-b-2 border-accent">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 88% 15%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1.5 bg-accent"
      />

      {upcomingEvents.length > 0 && (
      <div className="absolute right-5 top-1/2 hidden w-[min(300px,28vw)] -translate-y-1/2 md:right-16 lg:block">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
          Próximos eventos
        </p>
        <div className="relative mt-3">
          <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-sm border border-paper-line bg-paper-raised px-4 py-3.5"
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">
                  {event.date}
                </p>
                <h3 className="mt-1 font-display text-[0.95rem] font-semibold leading-snug">
                  {event.title}
                </h3>
                <p className="mt-1 text-[0.8rem] text-ink-soft">
                  {event.place}
                </p>
              </div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-paper to-transparent"
          />
        </div>
      </div>
      )}

      <div className="relative mx-auto max-w-wrap px-5 pb-14 pt-16 md:px-16 md:pb-24 md:pt-28">
        <div className="max-w-[760px]">
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
            Estatuto de afiliación · Postulación abierta
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.3rem,5.4vw,4rem)] font-semibold leading-[1.04] tracking-tight">
            La nueva voz de los{" "}
            <em className="font-normal italic text-accent">jóvenes</em> que
            construyen el futuro de Bolivia.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.1rem] leading-relaxed text-ink-soft">
            La CNJ reúne a empresarios, emprendedores, profesionales y
            universitarios bolivianos bajo un mismo estatuto: abrir espacio
            real de participación y liderazgo para la próxima generación del
            sector privado.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#postulacion"
              className="inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-6 py-3.5 font-semibold text-accent-ink no-underline transition-transform hover:-translate-y-px hover:opacity-90"
            >
              Postularme →
            </a>
            <a
              href="#nosotros"
              className="inline-flex items-center gap-2 rounded-sm border border-paper-line px-6 py-3.5 font-semibold text-ink no-underline hover:border-ink-soft"
            >
              Leer el estatuto
            </a>
          </div>

          <dl className="mt-14 flex flex-wrap gap-10 font-mono text-[0.78rem] text-ink-faint">
            <div>
              <dt className="sr-only">Fundación</dt>
              <dd className="font-body text-[1.35rem] font-semibold text-ink">
                29 jul 2026
              </dd>
              Fundación · Santa Cruz
            </div>
            <div>
              <dt className="sr-only">Sedes fundadoras</dt>
              <dd className="font-body text-[1.35rem] font-semibold text-ink">
                3
              </dd>
              Sedes fundadoras
            </div>
            <div>
              <dt className="sr-only">Categorías de ingreso</dt>
              <dd className="font-body text-[1.35rem] font-semibold text-ink">
                03
              </dd>
              Categorías de ingreso
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
