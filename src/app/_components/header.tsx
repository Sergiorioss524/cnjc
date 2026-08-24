import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#articulos", label: "Beneficios" },
  { href: "/#directorio", label: "Directorio" },
  { href: "/miembros", label: "Miembros" },
  { href: "/#hitos", label: "Hitos" },
  { href: "/#postulacion", label: "Postulación" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-6 px-5 py-4 md:px-16">
        <Link
          href="/#top"
          className="flex items-center gap-3 text-ink no-underline"
        >
          <Image
            src="/logo.png"
            alt="CNJ"
            width={36}
            height={36}
            className="h-9 w-9 flex-shrink-0 rounded-lg"
          />
          <span className="leading-tight">
            <strong className="block font-display text-[1.02rem] font-semibold tracking-tight">
              Cámara Nacional de Juventud
            </strong>
            <span className="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
              CNJ · Bolivia
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden gap-7 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative pb-1 text-[0.9rem] font-medium text-ink-soft no-underline hover:text-ink"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="/#postulacion"
          className="whitespace-nowrap rounded-sm border border-accent bg-accent px-4 py-2.5 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-accent-ink no-underline transition-opacity hover:opacity-85"
        >
          Postularme
        </a>
      </div>
    </header>
  );
}
