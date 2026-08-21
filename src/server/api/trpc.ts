/**
 * Configuración base de tRPC. Este archivo define el contexto y los
 * "procedure helpers" que usan todos los routers.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/server/auth";
import { db } from "~/server/db";

/**
 * Contexto disponible en cada request de tRPC, incluye la sesión del
 * backoffice si el usuario está autenticado.
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();
  return {
    db,
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

/**
 * Middleware de timing — útil para ver cuánto tarda cada procedure en dev.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  const result = await next();
  const end = Date.now();
  if (process.env.NODE_ENV === "development") {
    console.log(`[tRPC] ${path} tomó ${end - start}ms`);
  }
  return result;
});

/** Procedure público — no requiere sesión. Todo el sitio de CNJ lo usa. */
export const publicProcedure = t.procedure.use(timingMiddleware);

/** Procedure protegido — requiere sesión activa del backoffice (/admin). */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({ ctx: { ...ctx, session: ctx.session } });
  });
