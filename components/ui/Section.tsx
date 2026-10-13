type Band = "nebula";

interface SectionProps {
  id: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  band?: Band;
  /** Quita el relleno superior cuando la sección sigue a un encabezado de página. */
  flush?: boolean;
}

/**
 * Sección: el encabezado ocupa 4/12 (fijo al hacer scroll en escritorio) y el contenido 8/12.
 * El título lleva degradado violeta a cian y una pista de luz debajo.
 */
export default function Section({ id, title, intro, children, band, flush }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`${band ? `band-${band}` : ""} ${flush ? "pt-0" : "pt-20 sm:pt-28"} pb-20 sm:pb-28`}
    >
      <div className="wrap grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <header className="self-start lg:sticky lg:top-28 lg:col-span-4">
          <h2
            id={`${id}-titulo`}
            className="t-h2 section-title !text-[clamp(1.9rem,3.1vw,2.7rem)] [hyphens:auto]"
          >
            <span className="reveal-title gradient-text block pb-1">{title}</span>
          </h2>
          {intro && <div className="t-small reveal mt-5 max-w-[36ch]">{intro}</div>}
        </header>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
