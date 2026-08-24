import { type Metadata } from "next";

import { ContactoForm } from "~/app/_components/contacto-form";
import { Footer } from "~/app/_components/footer";
import { Header } from "~/app/_components/header";
import { SocialLinks } from "~/app/_components/social-links";

export const metadata: Metadata = {
  title: "Contacto — Cámara Nacional de Juventud",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-14 md:py-20">
          <div className="mx-auto grid max-w-wrap gap-14 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-16">
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
                Contacto
              </p>
              <h1 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
                Contáctanos
              </h1>
              <p className="mt-2.5 max-w-[46ch] text-[0.98rem] text-ink-soft">
                ¿Tienes preguntas sobre la CNJ o tu postulación? Escríbenos y
                el Directorio te responderá a la brevedad.
              </p>

              <div className="mt-9 space-y-6">
                <div>
                  <h4 className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
                    Correo
                  </h4>
                  <p className="text-[0.95rem] text-ink-soft">
                    [correo@cnj.org.bo]
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
                    Teléfono
                  </h4>
                  <p className="text-[0.95rem] text-ink-soft">
                    [+591 000 00000]
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
                    Sedes
                  </h4>
                  <p className="text-[0.95rem] leading-[1.9] text-ink-soft">
                    La Paz — [dirección pendiente]
                    <br />
                    Santa Cruz — [dirección pendiente]
                    <br />
                    Cochabamba — [dirección pendiente]
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
                    Redes
                  </h4>
                  <SocialLinks />
                </div>
              </div>
            </div>

            <ContactoForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
