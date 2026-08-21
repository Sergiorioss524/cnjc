import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const eventoInput = {
  title: z.string().min(1, "Ingresa un título"),
  date: z.string().min(1, "Ingresa una fecha"),
  place: z.string().min(1, "Ingresa un lugar"),
  order: z.coerce.number().int().default(0),
};

export const eventoRouter = createTRPCRouter({
  /** Lista los eventos para el panel de "Próximos eventos" en el hero. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.evento.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  }),

  create: protectedProcedure
    .input(z.object(eventoInput))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.evento.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), ...eventoInput }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.evento.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.evento.delete({ where: { id: input.id } });
    }),
});
