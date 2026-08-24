import { PartnersManager } from "~/app/admin/_components/partners-manager";
import { db } from "~/server/db";

export default async function PartnersAdminPage() {
  const initial = await db.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return <PartnersManager initial={initial} />;
}
