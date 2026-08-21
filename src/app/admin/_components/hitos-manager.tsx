"use client";

import { useState } from "react";

import { api, type RouterOutputs } from "~/trpc/react";

type Hito = RouterOutputs["hito"]["list"][number];

const emptyForm = { date: "", title: "", body: "", order: 0 };

export function HitosManager({ initial }: { initial: Hito[] }) {
  const utils = api.useUtils();
  const { data: hitos = initial } = api.hito.list.useQuery(undefined, {
    initialData: initial,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const invalidate = () => utils.hito.list.invalidate();

  const create = api.hito.create.useMutation({
    onSuccess: () => {
      invalidate();
      setForm(emptyForm);
    },
  });
  const update = api.hito.update.useMutation({
    onSuccess: () => {
      invalidate();
      setEditingId(null);
      setForm(emptyForm);
    },
  });
  const remove = api.hito.delete.useMutation({ onSuccess: invalidate });

  const startEdit = (h: Hito) => {
    setEditingId(h.id);
    setForm({ date: h.date, title: h.title, body: h.body, order: h.order });
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
      <h1 className="font-display text-[1.6rem] font-semibold">Hitos</h1>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        La línea de tiempo de hitos fundacionales de la portada, en orden
        ascendente.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-3.5 rounded-sm border border-paper-line p-5"
      >
        <div className="grid gap-3.5 sm:grid-cols-2">
          <input
            required
            placeholder="Fecha o etiqueta (ej. 29 · 07 · 2026)"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
          />
          <input
            required
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
          />
        </div>
        <textarea
          required
          placeholder="Descripción"
          rows={3}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <input
          type="number"
          placeholder="Orden"
          value={form.order}
          onChange={(e) =>
            setForm({ ...form, order: Number(e.target.value) })
          }
          className="w-32 rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm border border-accent bg-accent px-5 py-2.5 font-semibold text-accent-ink disabled:opacity-60"
          >
            {editingId ? "Guardar cambios" : "Agregar hito"}
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
        {hitos.map((h) => (
          <div
            key={h.id}
            className="flex flex-wrap items-start justify-between gap-3 border-b border-paper-line py-4"
          >
            <div className="max-w-[52ch]">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">
                {h.date}
              </p>
              <p className="font-display font-semibold">{h.title}</p>
              <p className="mt-1 text-[0.85rem] text-ink-soft">{h.body}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(h)}
                className="font-mono text-[0.75rem] uppercase text-ink-soft hover:text-ink"
              >
                Editar
              </button>
              <button
                onClick={() => remove.mutate({ id: h.id })}
                disabled={remove.isPending}
                className="font-mono text-[0.75rem] uppercase text-accent disabled:opacity-60"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {hitos.length === 0 && (
          <p className="py-6 text-[0.9rem] text-ink-faint">
            No hay hitos todavía.
          </p>
        )}
      </div>
    </div>
  );
}
