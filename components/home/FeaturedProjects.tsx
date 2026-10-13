import Link from "next/link";
import ProjectPlate from "@/components/ui/ProjectPlate";
import { featuredProjects, projects } from "@/data/projects";

/** Composición asimétrica: las placas alternan ancho para dar jerarquía (CuencaOS y Terrivo primero). */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function FeaturedProjects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h2 id="proyectos-titulo" className="t-h2 section-title">
              <span className="reveal-title block">Proyectos destacados</span>
            </h2>
            <p className="measure reveal mt-6 text-fg">
              Cuatro casos con su contexto, mi parte y su estado real. Los de WUJU son trabajo
              colectivo y siguen en desarrollo.
            </p>
          </div>
          <Link href="/proyectos" className="btn btn-ghost">
            Ver los {projects.length} proyectos
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-12">
          {featuredProjects.map((project, i) => (
            <li key={project.slug} className={`reveal ${SPANS[i % SPANS.length]}`}>
              <ProjectPlate project={project} large={i < 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
