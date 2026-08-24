import { MensajesManager } from "~/app/admin/_components/mensajes-manager";
import { db } from "~/server/db";

export default async function MensajesAdminPage() {
  const initial = await db.mensaje.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return <MensajesManager initial={initial} />;
}
