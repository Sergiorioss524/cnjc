import { About } from "~/app/_components/about";
import { Articles } from "~/app/_components/articles";
import { Audience } from "~/app/_components/audience";
import { Directorio } from "~/app/_components/directorio";
import { Footer } from "~/app/_components/footer";
import { Header } from "~/app/_components/header";
import { Hero } from "~/app/_components/hero";
import { PostulacionForm } from "~/app/_components/postulacion-form";
import { Timeline } from "~/app/_components/timeline";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Articles />
        <Audience />
        <Directorio />
        <Timeline />

        <section id="postulacion" className="py-14 md:py-20">
          <div className="mx-auto max-w-wrap px-5 md:px-16">
            <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
                  Artículo 11 · Postulación
                </p>
                <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
                  Solicita tu afiliación
                </h2>
              </div>
              <p className="max-w-[38ch] pb-1.5 text-[0.98rem] text-ink-soft">
                Elige tu categoría. Los campos se ajustan según tu perfil.
              </p>
            </div>

            <PostulacionForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
