import Link from "next/link";

const sections = [
  {
    href: "/admin/eventos",
    label: "Eventos",
    body: "Próximos eventos que aparecen en el panel de la portada.",
  },
  {
    href: "/admin/directorio",
    label: "Directorio",
    body: "Miembros del directorio fundador que aparecen en la portada.",
  },
  {
    href: "/admin/hitos",
    label: "Hitos",
    body: "Línea de tiempo de hitos fundacionales de la portada.",
  },
  {
    href: "/admin/partners",
    label: "Partners",
    body: "Logos del carrusel de partners en la sección Comunidad.",
  },
  {
    href: "/admin/miembros",
    label: "Miembros",
    body: "Directorio completo de miembros afiliados.",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold">
        Panel de administración
      </h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-sm border border-paper-line p-5 no-underline transition-colors hover:border-accent"
          >
            <h2 className="font-display text-[1.05rem] font-semibold text-ink">
              {s.label}
            </h2>
            <p className="mt-1.5 text-[0.85rem] text-ink-soft">{s.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
