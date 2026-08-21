export function Hero() {
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

      <div
        aria-hidden="true"
        className="absolute right-5 top-1/2 hidden w-[min(340px,30vw)] -translate-y-1/2 text-ink opacity-95 md:right-16 lg:block"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
          <path id="seal-arc" d="M 30,100 A 70,70 0 1,1 170,100" fill="none" />
          <text
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="3"
            fill="currentColor"
            opacity="0.6"
          >
            <textPath href="#seal-arc" startOffset="2%">
              CÁMARA NACIONAL DE JUVENTUD · BOLIVIA ·
            </textPath>
          </text>
          <path
            d="M100 55 L112 88 H147 L119 108 L130 141 L100 121 L70 141 L81 108 L53 88 H88 Z"
            stroke="var(--accent)"
            strokeWidth="1.6"
            fill="none"
          />
        </svg>
      </div>

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
