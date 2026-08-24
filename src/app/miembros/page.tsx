import { type Metadata } from "next";

import { Footer } from "~/app/_components/footer";
import { Header } from "~/app/_components/header";
import { MiembrosDirectory } from "~/app/_components/miembros-directory";
import { db } from "~/server/db";

export const metadata: Metadata = {
  title: "Miembros — Cámara Nacional de Juventud",
};

// Ver comentario en src/app/page.tsx sobre por qué esto es necesario.
export const dynamic = "force-dynamic";

export default async function MiembrosPage() {
  const miembros = await db.miembro.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <>
      <Header />
      <main>
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-wrap px-5 md:px-16">
            <div className="mb-11">
              <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
                Comunidad
              </p>
              <h1 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
                Directorio de miembros
              </h1>
              <p className="mt-2.5 max-w-[52ch] text-[0.98rem] text-ink-soft">
                Todos los afiliados a la Cámara Nacional de Juventud.
              </p>
            </div>

            <MiembrosDirectory miembros={miembros} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
