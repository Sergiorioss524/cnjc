import { HitosManager } from "~/app/admin/_components/hitos-manager";
import { db } from "~/server/db";

export default async function HitosAdminPage() {
  const initial = await db.hito.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <HitosManager initial={initial} />;
}
