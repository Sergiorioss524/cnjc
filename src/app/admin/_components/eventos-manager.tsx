"use client";

import { useState } from "react";

import { api, type RouterOutputs } from "~/trpc/react";

type Evento = RouterOutputs["evento"]["list"][number];

const emptyForm = { title: "", date: "", place: "", order: 0 };

export function EventosManager({ initial }: { initial: Evento[] }) {
  const utils = api.useUtils();
  const { data: eventos = initial } = api.evento.list.useQuery(undefined, {
    initialData: initial,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const invalidate = () => utils.evento.list.invalidate();

  const create = api.evento.create.useMutation({
    onSuccess: () => {
      invalidate();
      setForm(emptyForm);
    },
  });
  const update = api.evento.update.useMutation({
    onSuccess: () => {
      invalidate();
      setEditingId(null);
      setForm(emptyForm);
    },
  });
  const remove = api.evento.delete.useMutation({ onSuccess: invalidate });

  const startEdit = (e: Evento) => {
    setEditingId(e.id);
    setForm({ title: e.title, date: e.date, place: e.place, order: e.order });
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
      <h1 className="font-display text-[1.6rem] font-semibold">Eventos</h1>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        Aparecen en el panel &quot;Próximos eventos&quot; de la portada, en
        orden ascendente.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-3.5 rounded-sm border border-paper-line p-5 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <input
          required
          placeholder="Fecha (ej. 15 de sep 2026)"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <input
          required
          placeholder="Lugar"
          value={form.place}
          onChange={(e) => setForm({ ...form, place: e.target.value })}
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
        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm border border-accent bg-accent px-5 py-2.5 font-semibold text-accent-ink disabled:opacity-60"
          >
            {editingId ? "Guardar cambios" : "Agregar evento"}
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
        {eventos.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line py-4"
          >
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">
                {e.date}
              </p>
              <p className="font-display font-semibold">{e.title}</p>
              <p className="text-[0.85rem] text-ink-soft">{e.place}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(e)}
                className="font-mono text-[0.75rem] uppercase text-ink-soft hover:text-ink"
              >
                Editar
              </button>
              <button
                onClick={() => remove.mutate({ id: e.id })}
                disabled={remove.isPending}
                className="font-mono text-[0.75rem] uppercase text-accent disabled:opacity-60"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {eventos.length === 0 && (
          <p className="py-6 text-[0.9rem] text-ink-faint">
            No hay eventos todavía.
          </p>
        )}
      </div>
    </div>
  );
}
