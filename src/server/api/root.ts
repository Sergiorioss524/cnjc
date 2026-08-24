import { directorioRouter } from "~/server/api/routers/directorio";
import { eventoRouter } from "~/server/api/routers/evento";
import { hitoRouter } from "~/server/api/routers/hito";
import { miembroRouter } from "~/server/api/routers/miembro";
import { partnerRouter } from "~/server/api/routers/partner";
import { postulacionRouter } from "~/server/api/routers/postulacion";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * Router raíz de la API. Cada dominio nuevo se agrega aquí como una nueva
 * propiedad.
 */
export const appRouter = createTRPCRouter({
  postulacion: postulacionRouter,
  evento: eventoRouter,
  directorio: directorioRouter,
  hito: hitoRouter,
  partner: partnerRouter,
  miembro: miembroRouter,
});

export type AppRouter = typeof appRouter;
