const figures = [
  { n: "3", l: "Ciudades fundadoras" },
  { n: "5", l: "Directorio fundador" },
  { n: "CNC", l: "Institución vinculante" },
  { n: "2026", l: "Año de fundación" },
];

export function About() {
  return (
    <section
      id="nosotros"
      className="border-b border-paper-line py-14 md:py-20"
    >
      <div className="mx-auto grid max-w-wrap gap-14 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-16">
        <div>
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
            Artículo 1 · Naturaleza
          </p>
          <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            Qué es la Cámara Nacional de Juventud
          </h2>
          <p className="mt-5 max-w-[62ch] text-ink-soft">
            La CNJ es una institución empresarial creada para representar y
            potenciar a jóvenes empresarios, emprendedores y profesionales
            comprometidos con el desarrollo económico de Bolivia. Nace
            vinculada a la Cámara Nacional de Comercio (CNC), heredando su
            respaldo institucional para abrir un espacio propio a la
            generación emergente del sector privado.
          </p>
          <p className="mt-4 max-w-[62ch] text-ink-soft">
            Su objetivo no es solo representar: es abrir espacios de
            participación real, promover liderazgo empresarial emergente,
            fortalecer el sector privado boliviano y convertirse en la
            organización de referencia para quienes quieren emprender e
            innovar desde el país.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px border border-paper-line bg-paper-line">
          {figures.map((f) => (
            <div key={f.l} className="bg-paper p-5">
              <div className="font-display text-[2rem] font-semibold">
                {f.n}
              </div>
              <div className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-ink-faint">
                {f.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
