"use client";

import { useMemo, useState } from "react";

import { type RouterOutputs } from "~/trpc/react";

type Miembro = RouterOutputs["miembro"]["list"][number];

const categoriaLabel: Record<string, string> = {
  EMPRENDEDOR: "Emprendedor",
  PROFESIONAL: "Profesional",
  UNIVERSITARIO: "Universitario",
};

const filtros = ["TODOS", "EMPRENDEDOR", "PROFESIONAL", "UNIVERSITARIO"] as const;

export function MiembrosDirectory({ miembros }: { miembros: Miembro[] }) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] =
    useState<(typeof filtros)[number]>("TODOS");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return miembros.filter((m) => {
      const matchesQuery = q.length === 0 || m.name.toLowerCase().includes(q);
      const matchesCategoria =
        categoria === "TODOS" || m.categoria === categoria;
      return matchesQuery && matchesCategoria;
    });
  }, [miembros, query, categoria]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Buscar por nombre…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setCategoria(f)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] ${
                categoria === f
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-paper-line text-ink-soft hover:border-ink-soft"
              }`}
            >
              {f === "TODOS" ? "Todos" : categoriaLabel[f]}
            </button>
          ))}
        </div>
        <span className="font-mono text-[0.78rem] text-ink-faint">
          {filtered.length} miembro{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <div key={m.id} className="border-b border-paper-line pb-4">
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
          No se encontraron miembros con ese filtro.
        </p>
      )}
    </div>
  );
}
