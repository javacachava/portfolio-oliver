"use client";

import { useState } from "react";
import ProjectRow, { type ProjectSummary } from "@/components/ui/ProjectRow";
import { projectKindLabels, type ProjectKind } from "@/data/project-types";

type Filter = "todos" | ProjectKind;

const order: ProjectKind[] = ["software", "investigacion", "ia-datos", "emprendimiento"];

export default function ProjectFilter({ projects }: { projects: ProjectSummary[] }) {
  const [filter, setFilter] = useState<Filter>("todos");

  const visible =
    filter === "todos" ? projects : projects.filter((project) => project.kinds.includes(filter));

  const options: Array<{ value: Filter; label: string; count: number }> = [
    { value: "todos", label: "Todos", count: projects.length },
    ...order.map((kind) => ({
      value: kind,
      label: projectKindLabels[kind],
      count: projects.filter((project) => project.kinds.includes(kind)).length,
    })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filtrar proyectos por tipo" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const pressed = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(option.value)}
              className={`btn min-h-11 px-4 py-1.5 text-[0.9rem] ${
                pressed ? "btn-primary" : "btn-secondary border-rule"
              }`}
            >
              {option.label}
              <span className={pressed ? "opacity-80" : "text-muted"}>{option.count}</span>
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only-live">
        {visible.length === 1 ? "Se muestra 1 proyecto" : `Se muestran ${visible.length} proyectos`}
      </p>

      <ol className="mt-8 border-t border-ink">
        {visible.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            number={String(i + 1).padStart(2, "0")}
            headingLevel="h2"
          />
        ))}
      </ol>
    </div>
  );
}
