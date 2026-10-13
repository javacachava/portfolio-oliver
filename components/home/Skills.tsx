import Section from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

/**
 * Lo usado en proyectos (marcador de cobre sólido, trazo continuo) y la formación académica
 * (marcador hueco, trazo punteado) se distinguen por forma, no solo por color.
 */
export default function Skills() {
  return (
    <Section
      id="competencias"
      title="Competencias"
      intro="Separadas entre lo que he usado en proyectos, con el proyecto donde ocurrió, y lo que conozco por formación académica."
    >
      <div>
        {skillGroups.map((group) => (
          <div key={group.id} className="reveal border-t border-line py-9 first:border-t-0 first:pt-0">
            <h3 className="t-h3">{group.title}</h3>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div className="border-l-2 border-cobre pl-5">
                <h4 className="font-sans text-[0.95rem] font-semibold text-caramelo">Usado en proyectos</h4>
                <ul className="mt-3 space-y-3">
                  {group.practice.map((item) => (
                    <li key={item.name} className="leading-snug">
                      <span className="flex items-start gap-2.5 text-fg">
                        <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 bg-cobre" />
                        <span>{item.name}</span>
                      </span>
                      <span className="t-small ml-[1.1rem] block">{item.where}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-dashed border-caramelo/50 pl-5">
                <h4 className="font-sans text-[0.95rem] font-semibold text-fg-muted">Formación académica</h4>
                <ul className="mt-3 space-y-2.5">
                  {group.academic.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 leading-snug text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45em] size-2 shrink-0 border border-caramelo/70"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
