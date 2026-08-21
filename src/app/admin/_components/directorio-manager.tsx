"use client";

import { useState } from "react";

import { api, type RouterOutputs } from "~/trpc/react";

type Member = RouterOutputs["directorio"]["list"][number];

const emptyForm = { name: "", role: "", order: 0 };

export function DirectorioManager({ initial }: { initial: Member[] }) {
  const utils = api.useUtils();
  const { data: members = initial } = api.directorio.list.useQuery(
    undefined,
    { initialData: initial },
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const invalidate = () => utils.directorio.list.invalidate();

  const create = api.directorio.create.useMutation({
    onSuccess: () => {
      invalidate();
      setForm(emptyForm);
    },
  });
  const update = api.directorio.update.useMutation({
    onSuccess: () => {
      invalidate();
      setEditingId(null);
      setForm(emptyForm);
    },
  });
  const remove = api.directorio.delete.useMutation({ onSuccess: invalidate });

  const startEdit = (m: Member) => {
    setEditingId(m.id);
    setForm({ name: m.name, role: m.role, order: m.order });
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
      <h1 className="font-display text-[1.6rem] font-semibold">
        Directorio
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        El directorio fundador que aparece en la portada, en orden
        ascendente.
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
        <input
          required
          placeholder="Cargo"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <input
          type="number"
          placeholder="Orden"
          value={form.order}
          onChange={(e) =>
            setForm({ ...form, order: Number(e.target.value) })
          }
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <div className="flex gap-3">
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
        {members.map((m) => (
          <div
            key={m.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line py-4"
          >
            <div>
              <p className="font-display font-semibold">{m.name}</p>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.05em] text-ink-soft">
                {m.role}
              </p>
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
        {members.length === 0 && (
          <p className="py-6 text-[0.9rem] text-ink-faint">
            No hay miembros todavía.
          </p>
        )}
      </div>
    </div>
  );
}
