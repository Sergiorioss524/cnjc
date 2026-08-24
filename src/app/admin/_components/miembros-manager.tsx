"use client";

import { useState } from "react";

import { initials } from "~/lib/initials";
import { api, type RouterOutputs } from "~/trpc/react";

type Miembro = RouterOutputs["miembro"]["list"][number];

const categorias = ["EMPRENDEDOR", "PROFESIONAL", "UNIVERSITARIO"] as const;
const ciudades = ["La Paz", "Santa Cruz", "Cochabamba", "Otra"] as const;

const emptyForm = {
  name: "",
  categoria: "EMPRENDEDOR" as (typeof categorias)[number],
  ciudad: "" as (typeof ciudades)[number] | "",
  fotoUrl: "",
  order: 0,
};

export function MiembrosManager({ initial }: { initial: Miembro[] }) {
  const utils = api.useUtils();
  const { data: miembros = initial } = api.miembro.list.useQuery(undefined, {
    initialData: initial,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const invalidate = () => utils.miembro.list.invalidate();

  const create = api.miembro.create.useMutation({
    onSuccess: () => {
      invalidate();
      setForm(emptyForm);
    },
  });
  const update = api.miembro.update.useMutation({
    onSuccess: () => {
      invalidate();
      setEditingId(null);
      setForm(emptyForm);
    },
  });
  const remove = api.miembro.delete.useMutation({ onSuccess: invalidate });

  const startEdit = (m: Miembro) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      categoria: m.categoria as (typeof categorias)[number],
      ciudad: (m.ciudad ?? "") as (typeof ciudades)[number] | "",
      fotoUrl: m.fotoUrl ?? "",
      order: m.order,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (editingId) {
      update.mutate({ id: editingId, ...form });
    } else {
      create.mutate(form);
    }
  };

  const saving = create.isPending || update.isPending;

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold">Miembros</h1>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        El directorio completo de miembros afiliados, en la pestaña
        &quot;Miembros&quot; de la sección Comunidad.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-3.5 rounded-sm border border-paper-line p-5 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <select
          value={form.categoria}
          onChange={(e) =>
            setForm({
              ...form,
              categoria: e.target.value as (typeof categorias)[number],
            })
          }
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        >
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={form.ciudad}
          onChange={(e) =>
            setForm({
              ...form,
              ciudad: e.target.value as (typeof ciudades)[number] | "",
            })
          }
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        >
          <option value="">Sin ciudad</option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Orden"
          value={form.order}
          onChange={(e) =>
            setForm({ ...form, order: Number(e.target.value) })
          }
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <input
          placeholder="URL de foto (opcional)"
          value={form.fotoUrl}
          onChange={(e) => setForm({ ...form, fotoUrl: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm border border-accent bg-accent px-5 py-2.5 font-semibold text-accent-ink disabled:opacity-60"
          >
            {editingId ? "Guardar cambios" : "Agregar miembro"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-sm border border-paper-line px-5 py-2.5 text-ink-soft"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 border-t border-paper-line">
        {miembros.map((m) => (
          <div
            key={m.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line py-4"
          >
            <div className="flex items-center gap-3.5">
              {m.fotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.fotoUrl}
                  alt={m.name}
                  className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-paper-raised font-mono text-[0.75rem] text-ink-faint">
                  {initials(m.name)}
                </span>
              )}
              <div>
                <p className="font-display font-semibold">{m.name}</p>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.05em] text-ink-soft">
                  {m.categoria}
                  {m.ciudad ? ` · ${m.ciudad}` : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(m)}
                className="font-mono text-[0.75rem] uppercase text-ink-soft hover:text-ink"
              >
                Editar
              </button>
              <button
                onClick={() => remove.mutate({ id: m.id })}
                disabled={remove.isPending}
                className="font-mono text-[0.75rem] uppercase text-accent disabled:opacity-60"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {miembros.length === 0 && (
          <p className="py-6 text-[0.9rem] text-ink-faint">
            No hay miembros todavía.
          </p>
        )}
      </div>
    </div>
  );
}
