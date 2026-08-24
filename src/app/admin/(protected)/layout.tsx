import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "~/server/auth";

const links = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/directorio", label: "Directorio" },
  { href: "/admin/hitos", label: "Hitos" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/miembros", label: "Miembros" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-paper-line">
        <div className="mx-auto flex max-w-wrap items-center justify-between gap-6 px-5 py-4 md:px-16">
          <nav className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-ink-soft no-underline hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-ink-faint hover:text-ink"
            >
              Cerrar sesión — {session.user.email}
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-wrap px-5 py-10 md:px-16">
        {children}
      </main>
    </div>
  );
}
