"use client";

import { useState, type FormEvent } from "react";

import { api } from "~/trpc/react";

type Categoria = "EMPRENDEDOR" | "PROFESIONAL" | "UNIVERSITARIO";

const categorias: { value: Categoria; label: string }[] = [
  { value: "EMPRENDEDOR", label: "Emprendedor" },
  { value: "PROFESIONAL", label: "Profesional" },
  { value: "UNIVERSITARIO", label: "Universitario" },
];

const inputClass =
  "w-full rounded-sm border border-paper-line bg-paper px-3.5 py-3 font-body text-[0.98rem] text-ink focus:border-accent";
const labelClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint";

export function PostulacionForm() {
  const [categoria, setCategoria] = useState<Categoria>("EMPRENDEDOR");
  const [consent, setConsent] = useState(false);

  const [common, setCommon] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
  });
  const [emprendedor, setEmprendedor] = useState({
    empresa: "",
    nit: "",
    antiguedad: "",
  });
  const [profesional, setProfesional] = useState({
    profesion: "",
    experiencia: "",
  });
  const [universitario, setUniversitario] = useState({
    universidad: "",
    carrera: "",
    semestre: "",
  });

  const createPostulacion = api.postulacion.create.useMutation();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const base = {
      nombre: common.nombre,
      email: common.email,
      telefono: common.telefono,
      ciudad: common.ciudad as "La Paz" | "Santa Cruz" | "Cochabamba" | "Otra",
    };

    if (categoria === "EMPRENDEDOR") {
      createPostulacion.mutate({ categoria, ...base, ...emprendedor });
    } else if (categoria === "PROFESIONAL") {
      createPostulacion.mutate({
        categoria,
        ...base,
        profesion: profesional.profesion,
        experiencia: Number(profesional.experiencia || 0),
      });
    } else {
      createPostulacion.mutate({ categoria, ...base, ...universitario });
    }
  }

  return (
    <div className="border border-paper-line bg-paper-raised p-6 md:p-12">
      <div
        role="group"
        aria-label="Categoría de postulación"
        className="mb-9 flex flex-wrap gap-2.5"
      >
        {categorias.map((c) => (
          <button
            key={c.value}
            type="button"
            aria-pressed={categoria === c.value}
            onClick={() => setCategoria(c.value)}
            className={`rounded-sm border px-5 py-3 font-mono text-[0.78rem] tracking-[0.05em] transition-colors ${
              categoria === c.value
                ? "border-accent bg-accent text-accent-ink"
                : "border-paper-line text-ink-soft hover:border-ink-soft hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-7 md:gap-y-6"
      >
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            required
            className={inputClass}
            value={common.nombre}
            onChange={(e) => setCommon({ ...common, nombre: e.target.value })}
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
            value={common.email}
            onChange={(e) => setCommon({ ...common, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            required
            className={inputClass}
            value={common.telefono}
            onChange={(e) =>
              setCommon({ ...common, telefono: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="ciudad">
            Ciudad
          </label>
          <select
            id="ciudad"
            required
            className={inputClass}
            value={common.ciudad}
            onChange={(e) =>
              setCommon({ ...common, ciudad: e.target.value })
            }
          >
            <option value="">Selecciona</option>
            <option>La Paz</option>
            <option>Santa Cruz</option>
            <option>Cochabamba</option>
            <option>Otra</option>
          </select>
        </div>

        {categoria === "EMPRENDEDOR" && (
          <>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="empresa">
                Nombre de la empresa
              </label>
              <input
                id="empresa"
                required
                className={inputClass}
                value={emprendedor.empresa}
                onChange={(e) =>
                  setEmprendedor({ ...emprendedor, empresa: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="nit">
                NIT
              </label>
              <input
                id="nit"
                className={inputClass}
                value={emprendedor.nit}
                onChange={(e) =>
                  setEmprendedor({ ...emprendedor, nit: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="antiguedad">
                Antigüedad de la empresa
              </label>
              <select
                id="antiguedad"
                required
                className={inputClass}
                value={emprendedor.antiguedad}
                onChange={(e) =>
                  setEmprendedor({
                    ...emprendedor,
                    antiguedad: e.target.value,
                  })
                }
              >
                <option value="">Selecciona</option>
                <option>Menos de 1 año</option>
                <option>1–3 años</option>
                <option>3–5 años</option>
              </select>
            </div>
          </>
        )}

        {categoria === "PROFESIONAL" && (
          <>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="profesion">
                Profesión
              </label>
              <input
                id="profesion"
                required
                className={inputClass}
                value={profesional.profesion}
                onChange={(e) =>
                  setProfesional({
                    ...profesional,
                    profesion: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="experiencia">
                Años de experiencia
              </label>
              <input
                id="experiencia"
                type="number"
                min={0}
                className={inputClass}
                value={profesional.experiencia}
                onChange={(e) =>
                  setProfesional({
                    ...profesional,
                    experiencia: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}

        {categoria === "UNIVERSITARIO" && (
          <>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="universidad">
                Universidad
              </label>
              <input
                id="universidad"
                required
                className={inputClass}
                value={universitario.universidad}
                onChange={(e) =>
                  setUniversitario({
                    ...universitario,
                    universidad: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="carrera">
                Carrera
              </label>
              <input
                id="carrera"
                required
                className={inputClass}
                value={universitario.carrera}
                onChange={(e) =>
                  setUniversitario({
                    ...universitario,
                    carrera: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass} htmlFor="semestre">
                Semestre actual
              </label>
              <input
                id="semestre"
                required
                className={inputClass}
                value={universitario.semestre}
                onChange={(e) =>
                  setUniversitario({
                    ...universitario,
                    semestre: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}

        <label className="col-span-full mt-1.5 flex items-start gap-3 text-[0.86rem] text-ink-soft">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span>
            Declaro que la información proporcionada es verídica y acepto el
            tratamiento de mis datos conforme al estatuto de la CNJ.
          </span>
        </label>

        {createPostulacion.isSuccess && (
          <div className="col-span-full border border-dashed border-accent p-5 text-[0.92rem] text-ink-soft">
            <strong className="mb-1.5 block font-display text-[1.1rem] text-ink">
              Postulación registrada.
            </strong>
            El Directorio revisará tu solicitud y te contactará por correo o
            teléfono en los próximos días.
          </div>
        )}

        {createPostulacion.isError && (
          <div className="col-span-full border border-dashed border-accent p-5 text-[0.92rem] text-ink-soft">
            <strong className="mb-1.5 block font-display text-[1.1rem] text-ink">
              No se pudo enviar tu postulación.
            </strong>
            {createPostulacion.error.message}
          </div>
        )}

        <div className="col-span-full mt-1 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={createPostulacion.isPending}
            className="rounded-sm border border-accent bg-accent px-7 py-3.5 font-semibold text-accent-ink disabled:opacity-60"
          >
            {createPostulacion.isPending ? "Enviando…" : "Enviar postulación"}
          </button>
          <span className="text-[0.78rem] text-ink-faint">
            Revisión por el Directorio en un plazo estimado de 5 a 10 días
            hábiles.
          </span>
        </div>
      </form>
    </div>
  );
}
