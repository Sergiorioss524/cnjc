import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const memberInput = {
  name: z.string().min(1, "Ingresa un nombre"),
  role: z.string().min(1, "Ingresa un cargo"),
  order: z.coerce.number().int().default(0),
};

export const directorioRouter = createTRPCRouter({
  /** Lista el directorio fundador para la sección pública. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.directorioMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  }),

  create: protectedProcedure
    .input(z.object(memberInput))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.directorioMember.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), ...memberInput }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.directorioMember.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.directorioMember.delete({ where: { id: input.id } });
    }),
});
