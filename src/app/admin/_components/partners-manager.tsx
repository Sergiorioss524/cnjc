"use client";

import { useState } from "react";

import { api, type RouterOutputs } from "~/trpc/react";

type Partner = RouterOutputs["partner"]["list"][number];

const emptyForm = { name: "", logoUrl: "", websiteUrl: "", order: 0 };

export function PartnersManager({ initial }: { initial: Partner[] }) {
  const utils = api.useUtils();
  const { data: partners = initial } = api.partner.list.useQuery(undefined, {
    initialData: initial,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const invalidate = () => utils.partner.list.invalidate();

  const onError = (err: { message: string }) => setError(err.message);

  const create = api.partner.create.useMutation({
    onSuccess: () => {
      invalidate();
      setForm(emptyForm);
      setError(null);
    },
    onError,
  });
  const update = api.partner.update.useMutation({
    onSuccess: () => {
      invalidate();
      setEditingId(null);
      setForm(emptyForm);
      setError(null);
    },
    onError,
  });
  const remove = api.partner.delete.useMutation({ onSuccess: invalidate });

  const startEdit = (p: Partner) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      logoUrl: p.logoUrl,
      websiteUrl: p.websiteUrl ?? "",
      order: p.order,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
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
      <h1 className="font-display text-[1.6rem] font-semibold">Partners</h1>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        Aparecen en el carrusel de la sección &quot;Comunidad&quot; de la
        portada. El logo se referencia por URL — súbelo a cualquier hosting
        de imágenes y pega el link aquí.
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
          placeholder="URL del logo (https://…)"
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          className="rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.9rem] focus:border-accent"
        />
        <input
          placeholder="Sitio web (opcional)"
          value={form.websiteUrl}
          onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
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
        {error && <p className="text-[0.85rem] text-accent sm:col-span-2">{error}</p>}
        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm border border-accent bg-accent px-5 py-2.5 font-semibold text-accent-ink disabled:opacity-60"
          >
            {editingId ? "Guardar cambios" : "Agregar partner"}
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
        {partners.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line py-4"
          >
            <div className="flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logoUrl}
                alt={p.name}
                className="h-8 w-auto object-contain"
              />
              <div>
                <p className="font-display font-semibold">{p.name}</p>
                {p.websiteUrl && (
                  <p className="text-[0.8rem] text-ink-soft">
                    {p.websiteUrl}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(p)}
                className="font-mono text-[0.75rem] uppercase text-ink-soft hover:text-ink"
              >
                Editar
              </button>
              <button
                onClick={() => remove.mutate({ id: p.id })}
                disabled={remove.isPending}
                className="font-mono text-[0.75rem] uppercase text-accent disabled:opacity-60"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <p className="py-6 text-[0.9rem] text-ink-faint">
            No hay partners todavía.
          </p>
        )}
      </div>
    </div>
  );
}
