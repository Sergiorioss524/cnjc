import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

/**
 * Esquema base compartido por las tres categorías de postulación.
 */
const baseSchema = {
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(6, "Ingresa un teléfono válido"),
  ciudad: z.enum(["La Paz", "Santa Cruz", "Cochabamba", "Otra"]),
};

const postulacionInput = z.discriminatedUnion("categoria", [
  z.object({
    categoria: z.literal("EMPRENDEDOR"),
    ...baseSchema,
    empresa: z.string().min(1, "Ingresa el nombre de tu empresa"),
    nit: z.string().optional(),
    antiguedad: z.string().min(1, "Selecciona la antigüedad de tu empresa"),
  }),
  z.object({
    categoria: z.literal("PROFESIONAL"),
    ...baseSchema,
    profesion: z.string().min(1, "Ingresa tu profesión"),
    experiencia: z.coerce.number().int().min(0),
  }),
  z.object({
    categoria: z.literal("UNIVERSITARIO"),
    ...baseSchema,
    universidad: z.string().min(1, "Ingresa tu universidad"),
    carrera: z.string().min(1, "Ingresa tu carrera"),
    semestre: z.string().min(1, "Ingresa tu semestre actual"),
  }),
]);

export const postulacionRouter = createTRPCRouter({
  /** Crea una nueva postulación. Usado por el formulario de la landing. */
  create: publicProcedure
    .input(postulacionInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.postulacion.create({
        data: input,
      });
    }),

  /** Lista las postulaciones más recientes — solo para el backoffice. */
  getRecent: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.postulacion.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }),
});
