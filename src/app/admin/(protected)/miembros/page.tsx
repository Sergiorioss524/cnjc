import { MiembrosManager } from "~/app/admin/_components/miembros-manager";
import { db } from "~/server/db";

export default async function MiembrosAdminPage() {
  const initial = await db.miembro.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <MiembrosManager initial={initial} />;
}
