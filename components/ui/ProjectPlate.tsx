import Link from "next/link";
import Diagram from "@/components/ui/Diagram";
import Spot from "@/components/ui/Spot";
import StatusBadge from "@/components/ui/StatusBadge";
import { diagrams } from "@/data/diagrams";
import { projectKindLabels, type ProjectCase } from "@/data/project-types";

/**
 * Placa de proyecto: diagrama de componentes arriba (compacto, decorativo; el texto
 * equivalente está en la ficha) y resumen abajo. Todo el borde reacciona al cursor.
 */
export default function ProjectPlate({
  project,
  large = false,
}: {
  project: ProjectCase;
  large?: boolean;
}) {
  const diagram = diagrams[project.slug];
  return (
    <Spot className="plate plate-spot group flex h-full flex-col overflow-hidden transition-colors hover:border-cobre/60">
      {diagram && (
        <div className="relative border-b border-line px-6 pb-4 pt-10 sm:px-8">
          <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
          <div data-hover-pulse className={`relative mx-auto ${large ? "max-w-[34rem]" : "max-w-[26rem]"}`}>
            <Diagram id={`plate-${project.slug}`} diagram={diagram} variant="compact" showLegend={false} decorative />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div>
          <h3 className={large ? "t-h2 !text-[clamp(1.9rem,3.4vw,2.6rem)]" : "t-h3"}>
            <Link
              href={`/proyectos/${project.slug}`}
              className="no-underline after:absolute after:inset-0 after:z-10 after:content-['']"
            >
              {project.title}
            </Link>
          </h3>
          <p className="measure mt-3 text-fg">{project.summary}</p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Categorías">
          {project.kinds.map((kind) => (
            <li key={kind} className="chip">
              {projectKindLabels[kind]}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <StatusBadge status={project.status} />
          <p className="t-small">
            {project.organization}
            {project.period && <span className="block sm:ml-3 sm:inline">{project.period}</span>}
          </p>
        </div>
      </div>
    </Spot>
  );
}
