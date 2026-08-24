import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const contactoRouter = createTRPCRouter({
  /** Envía un mensaje desde el formulario de contacto público. */
  create: publicProcedure
    .input(
      z.object({
        nombre: z.string().min(2, "Ingresa tu nombre completo"),
        email: z.string().email("Correo electrónico inválido"),
        mensaje: z.string().min(10, "Cuéntanos un poco más en tu mensaje"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.mensaje.create({ data: input });
    }),

  /** Lista los mensajes más recientes — solo para el backoffice. */
  getRecent: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.mensaje.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.mensaje.delete({ where: { id: input.id } });
    }),
});
