"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-sm border border-paper-line p-8"
      >
        <h1 className="font-display text-[1.4rem] font-semibold">
          Backoffice CNJ
        </h1>
        <p className="mt-1.5 text-[0.9rem] text-ink-soft">
          Inicia sesión para administrar el contenido del sitio.
        </p>

        <div className="mt-7 space-y-4">
          <div>
            <label className="block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint">
              Correo
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink focus:border-accent"
            />
          </div>
          <div>
            <label className="block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-paper-line bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink focus:border-accent"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-[0.85rem] text-accent">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-sm border border-accent bg-accent px-4 py-2.5 font-semibold text-accent-ink disabled:opacity-60"
        >
          {loading ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
