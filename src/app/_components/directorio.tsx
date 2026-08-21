const roster = [
  { num: "01", name: "Eduardo Larsen", role: "Presidente" },
  { num: "02", name: "Ignacio Velásquez", role: "Primer Vicepresidente" },
  { num: "03", name: "Mateo Rejas", role: "Segundo Vicepresidente" },
  { num: "04", name: "Robert Jalil", role: "Tesorero" },
  { num: "05", name: "Zoe Cabrera", role: "Vocal" },
];

export function Directorio() {
  return (
    <section
      id="directorio"
      className="border-b border-paper-line py-14 md:py-20"
    >
      <div className="mx-auto max-w-wrap px-5 md:px-16">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
              Artículo 9 · Gobierno
            </p>
            <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
              Directorio fundador
            </h2>
          </div>
          <p className="max-w-[38ch] pb-1.5 text-[0.98rem] text-ink-soft">
            Los cinco miembros que suscribieron el acta fundacional de la CNJ
            el 29 de julio de 2026, en Santa Cruz.
          </p>
        </div>

        <div className="border-t border-paper-line">
          {roster.map((r) => (
            <div
              key={r.num}
              className="grid grid-cols-[2.4rem_1fr] items-baseline gap-5 border-b border-paper-line py-5 sm:grid-cols-[3.5rem_1fr_1fr]"
            >
              <span className="font-mono text-[0.85rem] text-ink-faint">
                {r.num}
              </span>
              <span className="font-display text-[1.15rem] font-medium">
                {r.name}
              </span>
              <span className="col-span-2 mt-1 font-mono text-[0.75rem] uppercase tracking-[0.05em] text-ink-soft sm:col-span-1 sm:mt-0 sm:text-right">
                {r.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
