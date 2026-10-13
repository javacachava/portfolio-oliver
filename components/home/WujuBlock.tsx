import Link from "next/link";
import Diagram from "@/components/ui/Diagram";
import StatusBadge from "@/components/ui/StatusBadge";
import { wujuDiagram } from "@/data/diagrams";
import { experience } from "@/data/experience";
import { getProject } from "@/data/projects";
import { wuju } from "@/data/wuju";

const wujuProjects = ["cuencaos", "terrivo"].flatMap((slug) => {
  const project = getProject(slug);
  return project ? [project] : [];
});

export default function WujuBlock() {
  const role = experience.find((entry) => entry.organization === "WUJU");
  return (
    <section
      id="wuju"
      aria-labelledby="wuju-titulo"
      className="band-mocha relative overflow-hidden py-20 sm:py-28"
    >
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
      <div className="wrap relative">
        <h2 id="wuju-titulo" className="t-h2 section-title">
          <span className="reveal-title block">WUJU</span>
        </h2>
        <p className="measure t-lead reveal mt-6">
          Una organización de la que soy cofundador. Esta sección separa lo que es de WUJU de lo
          que es mío.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="plate reveal p-6 sm:p-8">
            <h3 className="t-h3">La organización</h3>
            <div className="measure mt-4 space-y-4">
              {wuju.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a
              href={wuju.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-6"
            >
              Conocer WUJU en wuju.dev
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </article>

          <article className="plate reveal border-cobre/50 p-6 sm:p-8">
            <h3 className="t-h3">Mi rol</h3>
            <p className="mt-4 font-medium text-caramelo">{wuju.roleTitle}</p>
            {role && (
              <ul className="measure mt-4 space-y-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-cobre" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="t-small measure mt-5 border-l-2 border-line pl-4">{wuju.notMine}</p>
          </article>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <Diagram id="wuju-diagram" diagram={wujuDiagram} />
          </div>

          <ul className="space-y-4 lg:col-span-5">
            {wujuProjects.map((project) => (
              <li key={project.slug} className="reveal border-t border-line pt-4">
                <h3 className="t-h3">
                  <Link href={`/proyectos/${project.slug}`} className="no-underline hover:text-caramelo">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-fg">{project.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <StatusBadge status={project.status} />
                  <span className="t-small">Proyecto colectivo</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
