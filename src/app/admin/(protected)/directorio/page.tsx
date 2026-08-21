import { DirectorioManager } from "~/app/admin/_components/directorio-manager";
import { db } from "~/server/db";

export default async function DirectorioAdminPage() {
  const initial = await db.directorioMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <DirectorioManager initial={initial} />;
}
