import bcrypt from "bcryptjs";

import { db } from "~/server/db";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await db.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash },
    });
    console.log(`Admin listo: ${adminEmail}`);
  } else {
    console.log(
      "ADMIN_EMAIL / ADMIN_PASSWORD no están definidos — se omite la creación del admin.",
    );
  }

  if ((await db.evento.count()) === 0) {
    await db.evento.createMany({
      data: [
        {
          title: "Cierre de postulaciones",
          date: "[fecha pendiente]",
          place: "Convocatoria nacional",
          order: 0,
        },
        {
          title: "Entrevistas y selección",
          date: "[fecha pendiente]",
          place: "La Paz · Santa Cruz · Cochabamba",
          order: 1,
        },
        {
          title: "Juramentación del Directorio",
          date: "[fecha pendiente]",
          place: "Santa Cruz de la Sierra",
          order: 2,
        },
        {
          title: "Primer encuentro de networking",
          date: "[fecha pendiente]",
          place: "La Paz",
          order: 3,
        },
      ],
    });
  }

  if ((await db.directorioMember.count()) === 0) {
    await db.directorioMember.createMany({
      data: [
        { name: "Eduardo Larsen", role: "Presidente", order: 0 },
        { name: "Ignacio Velásquez", role: "Primer Vicepresidente", order: 1 },
        { name: "Mateo Rejas", role: "Segundo Vicepresidente", order: 2 },
        { name: "Robert Jalil", role: "Tesorero", order: 3 },
        { name: "Zoe Cabrera", role: "Vocal", order: 4 },
      ],
    });
  }

  if ((await db.hito.count()) === 0) {
    await db.hito.createMany({
      data: [
        {
          date: "29 · 07 · 2026",
          title: "Lanzamiento oficial",
          body: "La CNJ se presenta públicamente en el Hotel Los Tajibos, Santa Cruz de la Sierra, ante representantes del sector privado y la prensa nacional.",
          order: 0,
        },
        {
          date: "Vinculación institucional",
          title: "Respaldo de la Cámara Nacional de Comercio",
          body: "La CNJ nace bajo el paraguas de la CNC, que le otorga estructura, respaldo institucional y una red preexistente de aliados empresariales.",
          order: 1,
        },
        {
          date: "Presente",
          title: "Postulación abierta",
          body: "El Directorio Fundador abre la primera convocatoria de afiliación a jóvenes de La Paz, Santa Cruz y Cochabamba.",
          order: 2,
        },
      ],
    });
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async (err: unknown) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
