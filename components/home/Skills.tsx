import Section from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

/** Cada área lleva su propio matiz de luz; el matiz es de apoyo, la información está en el texto. */
const ACCENTS: Record<string, { ring: string; glow: string; dot: string }> = {
  desarrollo: { ring: "border-violet/60", glow: "from-violet/25", dot: "bg-violet" },
  ciberseguridad: { ring: "border-cyan/60", glow: "from-cyan/20", dot: "bg-cyan" },
  "ia-datos": { ring: "border-fuchsia-400/60", glow: "from-fuchsia-500/20", dot: "bg-fuchsia-400" },
  infraestructura: { ring: "border-sky-400/60", glow: "from-sky-500/20", dot: "bg-sky-400" },
  coordinacion: { ring: "border-green/60", glow: "from-green/15", dot: "bg-green" },
};

/**
 * Lo usado en proyectos (marcador sólido, trazo continuo) y la formación académica
 * (marcador hueco, trazo punteado) se distinguen por forma, no solo por color.
 */
export default function Skills() {
  return (
    <Section
      id="competencias"
      title="Competencias"
      band="nebula"
      intro="Separadas entre lo que he usado en proyectos, con el proyecto donde ocurrió, y lo que conozco por formación académica."
    >
      <div className="grid gap-6">
        {skillGroups.map((group) => {
          const accent = ACCENTS[group.id] ?? ACCENTS.desarrollo;
          return (
            <article
              key={group.id}
              className={`plate reveal overflow-hidden border-t-2 ${accent.ring} p-6 sm:p-8`}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${accent.glow} to-transparent`}
              />
              <h3 className="t-h3 relative">{group.title}</h3>
              <div className="relative mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <div>
                  <h4 className="font-sans text-[0.95rem] font-semibold text-soft">Usado en proyectos</h4>
                  <ul className="mt-3 space-y-3 border-l-2 border-line pl-5">
                    {group.practice.map((item) => (
                      <li key={item.name} className="leading-snug">
                        <span className="flex items-start gap-2.5 text-fg">
                          <span aria-hidden="true" className={`mt-[0.5em] size-2 shrink-0 rounded-[2px] ${accent.dot}`} />
                          <span>{item.name}</span>
                        </span>
                        <span className="t-small ml-[1.1rem] block">{item.where}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-sans text-[0.95rem] font-semibold text-fg-muted">Formación académica</h4>
                  <ul className="mt-3 space-y-2.5 border-l-2 border-dashed border-line pl-5">
                    {group.academic.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 leading-snug text-fg-muted">
                        <span aria-hidden="true" className="mt-[0.5em] size-2 shrink-0 rounded-[2px] border border-soft/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
