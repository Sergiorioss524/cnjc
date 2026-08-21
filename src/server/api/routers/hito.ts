import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const hitoInput = {
  date: z.string().min(1, "Ingresa una fecha o etiqueta"),
  title: z.string().min(1, "Ingresa un título"),
  body: z.string().min(1, "Ingresa una descripción"),
  order: z.coerce.number().int().default(0),
};

export const hitoRouter = createTRPCRouter({
  /** Lista los hitos fundacionales para la sección de timeline pública. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.hito.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  }),

  create: protectedProcedure
    .input(z.object(hitoInput))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.hito.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), ...hitoInput }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.hito.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.hito.delete({ where: { id: input.id } });
    }),
});
