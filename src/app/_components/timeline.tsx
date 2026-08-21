import { db } from "~/server/db";

export async function Timeline() {
  const items = await db.hito.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <section
      id="hitos"
      className="border-b border-paper-line py-14 md:py-20"
    >
      <div className="mx-auto max-w-wrap px-5 md:px-16">
        <div className="mb-11">
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent before:block before:h-px before:w-6 before:bg-accent">
            Artículo 10 · Registro
          </p>
          <h2 className="mt-3.5 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            Hitos fundacionales
          </h2>
        </div>

        <div className="relative pl-7 before:absolute before:bottom-1.5 before:left-[5px] before:top-1.5 before:w-px before:bg-paper-line">
          {items.map((it, i) => (
            <div
              key={it.id}
              className={`relative ${i === items.length - 1 ? "" : "pb-9"}`}
            >
              <span className="absolute -left-7 top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-1 ring-paper-line" />
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent">
                {it.date}
              </p>
              <h3 className="mt-1.5 font-display text-[1.05rem] font-semibold">
                {it.title}
              </h3>
              <p className="mt-1.5 max-w-[52ch] text-[0.92rem] text-ink-soft">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
