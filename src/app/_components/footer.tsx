import { BrandMark } from "./brand-mark";

export function Footer() {
  return (
    <footer className="mx-auto max-w-wrap px-5 pb-10 pt-14 md:px-16">
      <div className="grid grid-cols-1 gap-10 border-b border-paper-line pb-9 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
        <div className="flex items-start gap-3">
          <BrandMark className="mt-0.5 h-8 w-8 flex-shrink-0" />
          <div>
            <strong className="font-display text-[1.1rem] font-semibold">
              Cámara Nacional de Juventud
            </strong>
            <p className="mt-2.5 max-w-[34ch] text-[0.9rem] text-ink-soft">
              Institución vinculada a la Cámara Nacional de Comercio de
              Bolivia. Fundada el 29 de julio de 2026 en Santa Cruz de la
              Sierra.
            </p>
          </div>
        </div>
        <div>
          <h4 className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
            Sedes
          </h4>
          <div className="text-[0.9rem] leading-[1.9] text-ink-soft">
            La Paz — [dirección pendiente]
            <br />
            Santa Cruz — [dirección pendiente]
            <br />
            Cochabamba — [dirección pendiente]
          </div>
        </div>
        <div>
          <h4 className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
            Contacto
          </h4>
          <div className="text-[0.9rem] leading-[1.9] text-ink-soft">
            [correo@cnj.org.bo]
            <br />
            [+591 000 00000]
            <br />
            Instagram — [@cnjbolivia]
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-6 font-mono text-[0.78rem] text-ink-faint">
        <span>© 2026 Cámara Nacional de Juventud — Bolivia</span>
        <span>Datos entre [ ] son placeholder — reemplázalos</span>
      </div>
    </footer>
  );
}
