import { EventosManager } from "~/app/admin/_components/eventos-manager";
import { db } from "~/server/db";

export default async function EventosAdminPage() {
  const initial = await db.evento.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <EventosManager initial={initial} />;
}
