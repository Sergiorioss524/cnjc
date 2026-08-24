"use client";

import { useState, type FormEvent } from "react";

import { api } from "~/trpc/react";

const inputClass =
  "w-full rounded-sm border border-paper-line bg-paper px-3.5 py-3 font-body text-[0.98rem] text-ink focus:border-accent";
const labelClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint";

export function ContactoForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const createMensaje = api.contacto.create.useMutation({
    onSuccess: () => setForm({ nombre: "", email: "", mensaje: "" }),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createMensaje.mutate(form);
  }

  return (
    <div className="border border-paper-line bg-paper-raised p-6 md:p-12">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className={labelClass} htmlFor="nombre">
              Nombre completo
            </label>
            <input
              id="nombre"
              required
              className={inputClass}
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass} htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            required
            rows={5}
            className={inputClass}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          />
        </div>

        {createMensaje.isSuccess && (
          <div className="border border-dashed border-accent p-5 text-[0.92rem] text-ink-soft">
            <strong className="mb-1.5 block font-display text-[1.1rem] text-ink">
              Mensaje enviado.
            </strong>
            Te responderemos a la brevedad.
          </div>
        )}

        {createMensaje.isError && (
          <div className="border border-dashed border-accent p-5 text-[0.92rem] text-ink-soft">
            <strong className="mb-1.5 block font-display text-[1.1rem] text-ink">
              No se pudo enviar tu mensaje.
            </strong>
            {createMensaje.error.message}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={createMensaje.isPending}
            className="rounded-sm border border-accent bg-accent px-7 py-3.5 font-semibold text-accent-ink disabled:opacity-60"
          >
            {createMensaje.isPending ? "Enviando…" : "Enviar mensaje"}
          </button>
        </div>
      </form>
    </div>
  );
}
