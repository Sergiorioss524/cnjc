# CNJ Bolivia — landing + postulación (T3 Stack)

Landing page de postulación para la Cámara Nacional de Juventud (CNJ) Bolivia,
construida con **Next.js (App Router) + TypeScript + Tailwind CSS + tRPC +
Prisma**.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — paleta y tipografía en `src/styles/globals.css` y
  `tailwind.config.ts` (rojo/blanco, tipografías Fraunces + Archivo + JetBrains Mono vía `next/font/google`)
- **tRPC** — API con validación end-to-end en `src/server/api/`
- **Prisma** — modelo `Postulacion` en `prisma/schema.prisma`, usando
  **SQLite** por defecto (archivo local, cero configuración) para que
  funcione sin montar un servidor de base de datos

El formulario de postulación (`src/app/_components/postulacion-form.tsx`)
ya llama a una mutación real de tRPC (`postulacion.create`) que guarda cada
postulación en la base de datos — no depende de ningún servicio externo
(Formspree, Google Forms, etc.).

## Poner a andar el proyecto en VS Code

```bash
# 1. Instalar dependencias
npm install

# 2. Crear tu archivo de entorno
cp .env.example .env

# 3. Crear la base de datos SQLite local (genera prisma/db.sqlite)
npm run db:push

# 4. Levantar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El formulario de
`#postulacion` ya escribe filas reales en la base de datos local.

Para ver/inspeccionar las postulaciones guardadas sin escribir SQL:

```bash
npm run db:studio
```

Esto abre Prisma Studio en el navegador, con una tabla editable de
`Postulacion`.

## Conectar una base de datos real más adelante

Todo el proyecto ya está armado para que este cambio sea mínimo:

1. Levanta una base Postgres/MySQL (Railway, Supabase, Neon, PlanetScale, etc.)
2. En `prisma/schema.prisma`, cambia:
   ```prisma
   datasource db {
       provider = "postgresql" // o "mysql"
       url      = env("DATABASE_URL")
   }
   ```
3. En `.env`, reemplaza `DATABASE_URL` por la connection string real.
4. Corre `npm run db:push` (o `npx prisma migrate dev` si prefieres
   migraciones versionadas) para crear las tablas en la base nueva.

No hace falta tocar el router de tRPC ni el formulario — Prisma Client
sigue teniendo exactamente el mismo tipado.

## Estructura

```
src/
  app/
    page.tsx                 → ensambla la landing completa
    layout.tsx                → fuentes + provider de tRPC
    _components/              → Header, Hero, About, Articles, Audience,
                                 Directorio, Timeline, PostulacionForm, Footer
    api/trpc/[trpc]/route.ts  → endpoint HTTP de tRPC (App Router)
  server/
    db.ts                     → cliente de Prisma (singleton)
    api/
      trpc.ts                 → contexto + procedure helpers
      root.ts                 → router raíz
      routers/postulacion.ts  → mutación create + query getRecent, con
                                 validación Zod (discriminated union por
                                 categoría: Emprendedor / Profesional /
                                 Universitario)
  trpc/
    react.tsx                 → provider de React Query + cliente tRPC
    query-client.ts           → configuración de QueryClient (superjson)
  styles/globals.css          → tokens de color (light/dark) + Tailwind
prisma/schema.prisma          → modelo Postulacion
```

## Datos pendientes de reemplazar

El footer y algunos textos usan placeholders entre corchetes
(`[correo@cnj.org.bo]`, `[dirección pendiente]`, etc.) — reemplázalos con
la información real de la CNJ antes de publicar.
# cnjc
