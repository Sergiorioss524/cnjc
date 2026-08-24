import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const partnerInput = {
  name: z.string().min(1, "Ingresa un nombre"),
  logoUrl: z.string().url("Ingresa una URL de imagen válida"),
  websiteUrl: z
    .union([z.string().url("Ingresa una URL válida"), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  order: z.coerce.number().int().default(0),
};

export const partnerRouter = createTRPCRouter({
  /** Lista los partners para el carrusel de la sección pública. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.partner.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  }),

  create: protectedProcedure
    .input(z.object(partnerInput))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.partner.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), ...partnerInput }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.partner.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.partner.delete({ where: { id: input.id } });
    }),
});
