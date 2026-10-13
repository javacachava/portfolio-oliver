import type { Metadata } from "next";
import ProjectFilter from "@/components/ui/ProjectFilter";
import { toSummary } from "@/components/ui/ProjectRow";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Casos de proyecto de Oliver Ascencio: CuencaOS, Terrivo, TuGuíaSV, un sistema POS, un bot de pedidos, gestión de invitaciones y FlowCore. Con su contexto, su aporte y su estado.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="proyectos-titulo" className="wrap pb-8 pt-14 sm:pt-20">
        <p className="eyebrow">Proyectos</p>
        <h1 id="proyectos-titulo" className="display mt-4 max-w-[14ch]">
          Proyectos
        </h1>
        <p className="measure mt-6 text-[1.125rem]">
          {projects.length} proyectos de software, investigación, IA y emprendimiento. Cada caso
          explica el problema, el contexto, mi parte, las decisiones técnicas y el estado actual.
          Los proyectos de WUJU son trabajo de equipo, y en cada uno se indica qué parte es mía.
        </p>
      </section>

      <section aria-label="Listado de proyectos" className="wrap pb-8 pt-8">
        <ProjectFilter projects={projects.map(toSummary)} />
      </section>
    </>
  );
}
