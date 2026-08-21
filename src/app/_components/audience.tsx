const chips = [
  "La Paz",
  "Santa Cruz",
  "Cochabamba",
  "Emprendedores",
  "Profesionales",
  "Universitarios",
];

export function Audience() {
  return (
    <section className="border-b border-paper-line py-14 md:py-20">
      <div className="mx-auto flex max-w-wrap flex-wrap items-start gap-11 px-5 md:px-16">
        <div>
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
            Artículo 8 · Elegibilidad
          </p>
          <h2 className="mt-3.5 max-w-[16ch] font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            A quién está dirigida
          </h2>
        </div>
        <p className="flex-1 basis-80 max-w-[48ch] text-ink-soft">
          Jóvenes empresarios, emprendedores, profesionales y universitarios
          con visión de liderazgo, interesados en el desarrollo empresarial e
          innovación de Bolivia — sin importar si están dando sus primeros
          pasos o ya dirigen una empresa.
        </p>
        <div className="flex flex-1 basis-72 flex-wrap gap-2.5">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-paper-line px-3.5 py-2 font-mono text-[0.75rem] text-ink-soft"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
