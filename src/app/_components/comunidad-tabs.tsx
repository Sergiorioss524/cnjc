"use client";

import { useState } from "react";

import { type RouterOutputs } from "~/trpc/react";

type Partner = RouterOutputs["partner"]["list"][number];
type Miembro = RouterOutputs["miembro"]["list"][number];

const categoriaLabel: Record<string, string> = {
  EMPRENDEDOR: "Emprendedor",
  PROFESIONAL: "Profesional",
  UNIVERSITARIO: "Universitario",
};

export function ComunidadTabs({
  partners,
  miembros,
}: {
  partners: Partner[];
  miembros: Miembro[];
}) {
  const [tab, setTab] = useState<"partners" | "miembros">("partners");

  return (
    <div>
      <div className="flex gap-6 border-b border-paper-line">
        <button
          onClick={() => setTab("partners")}
          className={`border-b-2 pb-3 font-mono text-[0.78rem] uppercase tracking-[0.08em] ${
            tab === "partners"
              ? "border-accent text-ink"
              : "border-transparent text-ink-faint hover:text-ink-soft"
          }`}
        >
          Partners
        </button>
        <button
          onClick={() => setTab("miembros")}
          className={`border-b-2 pb-3 font-mono text-[0.78rem] uppercase tracking-[0.08em] ${
            tab === "miembros"
              ? "border-accent text-ink"
              : "border-transparent text-ink-faint hover:text-ink-soft"
          }`}
        >
          Miembros
        </button>
      </div>

      {tab === "partners" ? (
        partners.length > 0 ? (
          <div className="relative mt-9 overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-14">
              {[...partners, ...partners].map((p, i) => (
                <a
                  key={`${p.id}-${i}`}
                  href={p.websiteUrl ?? undefined}
                  target={p.websiteUrl ? "_blank" : undefined}
                  rel={p.websiteUrl ? "noreferrer" : undefined}
                  className="flex flex-shrink-0 items-center"
                  aria-hidden={i >= partners.length ? "true" : undefined}
                  tabIndex={i >= partners.length ? -1 : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logoUrl}
                    alt={p.name}
                    className="h-10 w-auto object-contain grayscale transition-[filter] hover:grayscale-0"
                  />
                </a>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent"
            />
          </div>
        ) : (
          <p className="mt-9 text-[0.9rem] text-ink-faint">
            Todavía no hay partners publicados.
          </p>
        )
      ) : miembros.length > 0 ? (
        <div className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {miembros.map((m) => (
            <div
              key={m.id}
              className="border-b border-paper-line pb-4"
            >
              <p className="font-display font-medium">{m.name}</p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.05em] text-ink-soft">
                {categoriaLabel[m.categoria] ?? m.categoria}
                {m.ciudad ? ` · ${m.ciudad}` : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-9 text-[0.9rem] text-ink-faint">
          Todavía no hay miembros publicados.
        </p>
      )}
    </div>
  );
}
