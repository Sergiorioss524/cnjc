import { postulacionRouter } from "~/server/api/routers/postulacion";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * Router raíz de la API. Cada dominio nuevo (ej. "eventos", "miembros")
 * se agrega aquí como una nueva propiedad.
 */
export const appRouter = createTRPCRouter({
  postulacion: postulacionRouter,
});

export type AppRouter = typeof appRouter;
