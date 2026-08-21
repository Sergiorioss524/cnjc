const articles = [
  {
    tag: "ART. 02",
    title: "Red de contactos",
    body: "Networking estratégico con pares, empresas establecidas y referentes del sector privado boliviano.",
  },
  {
    tag: "ART. 03",
    title: "Formación",
    body: "Espacios de capacitación continua en gestión, innovación e internacionalización de negocios.",
  },
  {
    tag: "ART. 04",
    title: "Representación institucional",
    body: "Voz organizada ante instancias públicas y privadas a través del respaldo de la CNC.",
  },
  {
    tag: "ART. 05",
    title: "Certificación oficial",
    body: "Acreditación de afiliado, con validez institucional dentro y fuera de la Cámara.",
  },
  {
    tag: "ART. 06",
    title: "Proyección internacional",
    body: "Acceso preferente a ferias, misiones comerciales y programas de expansión.",
  },
  {
    tag: "ART. 07",
    title: "Oportunidades de crecimiento",
    body: "Visibilidad para iniciativas propias y acceso a oportunidades de negocio y empleo.",
  },
];

export function Articles() {
  return (
    <section
      id="articulos"
      className="border-b border-paper-line py-14 md:py-20"
    >
      <div className="mx-auto max-w-wrap px-5 md:px-16">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
              Artículos 2–7 · Beneficios
            </p>
            <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
              Lo que otorga la afiliación
            </h2>
          </div>
          <p className="max-w-[38ch] pb-1.5 text-[0.98rem] text-ink-soft">
            Cada artículo del estatuto corresponde a un beneficio concreto
            que recibe quien se postula y es admitido.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-paper-line bg-paper-line sm:grid-cols-2 md:grid-cols-3">
          {articles.map((a) => (
            <div
              key={a.tag}
              className="flex min-h-[190px] flex-col gap-3.5 bg-paper p-7"
            >
              <span className="font-mono text-[0.7rem] tracking-[0.1em] text-accent">
                {a.tag}
              </span>
              <h3 className="font-display text-[1.12rem] font-semibold">
                {a.title}
              </h3>
              <p className="text-[0.92rem] text-ink-soft">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
