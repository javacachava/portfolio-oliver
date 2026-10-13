import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProjectPlate from "@/components/ui/ProjectPlate";
import { projectKindLabels, projects, type ProjectKind } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Casos de proyecto de Oliver Ascencio: CuencaOS, Terrivo, TuGuíaSV, un sistema POS, un bot de pedidos, gestión de invitaciones y FlowCore. Con su contexto, su aporte y su estado.",
  alternates: { canonical: "/proyectos" },
};

const kindOrder: ProjectKind[] = ["software", "investigacion", "ia-datos", "emprendimiento"];

export default function ProjectsPage() {
  const options = [
    { value: "todos", label: "Todos", count: projects.length },
    ...kindOrder.map((kind) => ({
      value: kind,
      label: projectKindLabels[kind],
      count: projects.filter((p) => p.kinds.includes(kind)).length,
    })),
  ];

  return (
    <>
      <PageHeader
        id="proyectos-titulo"
        title="Proyectos"
        lead={
          <p>
            {projects.length} proyectos de software, investigación, IA y emprendimiento. Cada caso
            explica el problema, el contexto, mi parte y el estado actual. Los de WUJU son trabajo
            de equipo y en cada uno indico qué parte es mía.
          </p>
        }
      />

      <section aria-labelledby="listado-titulo" className="filter pb-24">
        <h2 id="listado-titulo" className="sr-only">
          Listado de proyectos
        </h2>
        <div className="wrap">
          <fieldset>
            <legend className="sr-only">Filtrar proyectos por tipo</legend>
            <div className="flex flex-wrap gap-3">
              {options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    name="tipo"
                    value={option.value}
                    defaultChecked={option.value === "todos"}
                    className="sr-only"
                  />
                  <span className="filter-pill">
                    {option.label}
                    <span className="text-[0.8rem] opacity-70">{option.count}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project, i) => (
              <li
                key={project.slug}
                data-kinds={project.kinds.join(" ")}
                className={i === 0 ? "lg:col-span-2" : undefined}
              >
                <ProjectPlate project={project} large={i === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
