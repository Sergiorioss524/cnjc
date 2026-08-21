import { type NextAuthConfig } from "next-auth";

/**
 * Config edge-safe: sin Credentials/bcrypt/Prisma. Solo decodifica el JWT
 * de sesión ya existente — usado por middleware.ts, que corre en Edge
 * runtime y no puede cargar el cliente de Prisma.
 */
export const edgeAuthConfig = {
  providers: [],
  pages: { signIn: "/admin/login" },
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
