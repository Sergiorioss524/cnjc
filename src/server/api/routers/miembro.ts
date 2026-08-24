import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const miembroInput = {
  name: z.string().min(1, "Ingresa un nombre"),
  categoria: z.enum(["EMPRENDEDOR", "PROFESIONAL", "UNIVERSITARIO"]),
  ciudad: z
    .union([z.enum(["La Paz", "Santa Cruz", "Cochabamba", "Otra"]), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  order: z.coerce.number().int().default(0),
};

export const miembroRouter = createTRPCRouter({
  /** Lista el directorio completo de miembros para la sección pública. */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.miembro.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  }),

  create: protectedProcedure
    .input(z.object(miembroInput))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.miembro.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), ...miembroInput }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.miembro.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.miembro.delete({ where: { id: input.id } });
    }),
});
