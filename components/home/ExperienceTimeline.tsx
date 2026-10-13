import Link from "next/link";
import Section from "@/components/ui/Section";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

/** Banda crema: la línea de cobre se dibuja con el scroll y cada hito es un pad sobre ella. */
export default function ExperienceTimeline() {
  return (
    <Section
      id="experiencia"
      title="Experiencia"
      band="crema"
      intro="Responsabilidades concretas, de la más reciente a la más antigua."
    >
      <ol className="relative pl-8 sm:pl-12">
        <span
          aria-hidden="true"
          className="timeline-line absolute left-[7px] top-2 bottom-2 w-[2px] bg-accent sm:left-[11px]"
        />
        {experience.map((entry) => (
          <li key={`${entry.organization}-${entry.period}`} className="reveal relative pb-14 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-8 top-[0.55rem] size-4 rounded-full border-2 border-accent bg-bg sm:-left-12 sm:size-[1.4rem]"
            />
            <p className="font-medium text-accent">{entry.period}</p>
            <h3 className="t-h3 mt-1">{entry.role}</h3>
            <p className="t-small mt-1">
              {entry.organization}. {entry.context}.
            </p>
            <ul className="measure mt-5 space-y-3">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="t-small mt-5">
              Casos relacionados:{" "}
              {entry.projects.map((slug, i) => {
                const project = projects.find((p) => p.slug === slug);
                if (!project) return null;
                return (
                  <span key={slug}>
                    {i > 0 && ", "}
                    <Link href={`/proyectos/${slug}`} className="link">
                      {project.title}
                    </Link>
                  </span>
                );
              })}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
