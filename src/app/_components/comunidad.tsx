import { ComunidadTabs } from "~/app/_components/comunidad-tabs";
import { db } from "~/server/db";

export async function Comunidad() {
  const [partners, miembros] = await Promise.all([
    db.partner.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    db.miembro.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
  ]);

  return (
    <section
      id="comunidad"
      className="border-b border-paper-line py-14 md:py-20"
    >
      <div className="mx-auto max-w-wrap px-5 md:px-16">
        <div className="mb-11">
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
            Comunidad
          </p>
          <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            Partners y miembros
          </h2>
        </div>

        <ComunidadTabs partners={partners} miembros={miembros} />
      </div>
    </section>
  );
}
