"use client";

import { api, type RouterOutputs } from "~/trpc/react";

type Mensaje = RouterOutputs["contacto"]["getRecent"][number];

export function MensajesManager({ initial }: { initial: Mensaje[] }) {
  const utils = api.useUtils();
  const { data: mensajes = initial } = api.contacto.getRecent.useQuery(
    undefined,
    { initialData: initial },
  );
  const remove = api.contacto.delete.useMutation({
    onSuccess: () => utils.contacto.getRecent.invalidate(),
  });

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold">Mensajes</h1>
      <p className="mt-1.5 text-[0.9rem] text-ink-soft">
        Mensajes enviados desde el formulario de{" "}
        <span className="font-medium text-ink">/contacto</span>.
      </p>

      <div className="mt-8 border-t border-paper-line">
        {mensajes.map((m) => (
          <div key={m.id} className="border-b border-paper-line py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display font-semibold">{m.nombre}</p>
                <p className="font-mono text-[0.78rem] text-ink-soft">
                  {m.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.72rem] text-ink-faint">
                  {new Date(m.createdAt).toLocaleString("es-BO")}
                </span>
                <button
                  onClick={() => remove.mutate({ id: m.id })}
                  disabled={remove.isPending}
                  className="font-mono text-[0.75rem] uppercase text-accent disabled:opacity-60"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <p className="mt-2.5 max-w-[64ch] text-[0.9rem] text-ink-soft">
              {m.mensaje}
            </p>
          </div>
        ))}
        {mensajes.length === 0 && (
          <p className="py-6 text-[0.9rem] text-ink-faint">
            No hay mensajes todavía.
          </p>
        )}
      </div>
    </div>
  );
}
