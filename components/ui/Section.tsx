interface SectionProps {
  id: string;
  /** Número editorial de la sección, p. ej. "01". */
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  /** Quita la línea superior (primera sección tras un encabezado de página). */
  flush?: boolean;
}

/**
 * Sección editorial: encabezado en la columna izquierda (4/12) y contenido a la derecha (8/12)
 * a partir de `lg`; apilado en pantallas menores.
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  flush,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`${flush ? "" : "border-t border-rule"} py-16 sm:py-20`}
    >
      <div className="wrap grid gap-x-8 gap-y-8 lg:grid-cols-12">
        <header className="self-start lg:sticky lg:top-24 lg:col-span-4">
          {(index || eyebrow) && (
            <p className="eyebrow">
              {index && <span className="mr-3 text-accent">{index}</span>}
              {eyebrow}
            </p>
          )}
          <h2 id={`${id}-titulo`} className="h2 mt-3">
            {title}
          </h2>
          {intro && <div className="mt-4 max-w-[34ch] text-[0.98rem] text-muted">{intro}</div>}
        </header>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
