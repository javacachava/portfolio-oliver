import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import StatusBadge from "@/components/ui/StatusBadge";
import { projectKindLabels, type ProjectCase } from "@/data/project-types";

export type ProjectSummary = Pick<
  ProjectCase,
  "slug" | "title" | "summary" | "kinds" | "status" | "organization" | "period"
>;

export function toSummary(project: ProjectCase): ProjectSummary {
  const { slug, title, summary, kinds, status, organization, period } = project;
  return { slug, title, summary, kinds, status, organization, period };
}

/** Fila de un índice de proyectos. Toda la fila es clicable desde el enlace del título. */
export default function ProjectRow({
  project,
  number,
  headingLevel: Heading = "h3",
}: {
  project: ProjectSummary;
  number: string;
  /** Nivel del título según el contexto: h2 si la página no tiene otra sección intermedia. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <li className="project-row relative grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 border-t border-rule py-7 first:border-t-0 sm:grid-cols-[3.25rem_1fr_auto] sm:gap-x-5">
      <span className="meta pt-2">{number}</span>
      <div>
        <Heading className="h3">
          <Link
            href={`/proyectos/${project.slug}`}
            className="text-ink no-underline after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="measure mt-2 text-body">{project.summary}</p>
        <div className="mt-3 space-y-1">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <StatusBadge status={project.status} />
            <span className="meta">
              {project.kinds.map((kind) => projectKindLabels[kind]).join(" · ")}
            </span>
          </p>
          <p className="meta">
            {project.organization}
            {project.period ? ` · ${project.period}` : ""}
          </p>
        </div>
      </div>
      <ArrowRight size={20} className="arrow mt-2 text-muted" />
    </li>
  );
}
