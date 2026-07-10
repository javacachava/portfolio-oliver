"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);
const ordered = [...featured, ...rest];

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionEyebrow className="mb-2">Proyectos</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-3 w-fit pb-1">
            Software real. Clientes reales.
          </h2>
          <p className="text-muted max-w-xl">
            No tutoriales, no clones. Cada proyecto resuelve un problema concreto
            y tiene código en producción o demo funcional.
          </p>
        </motion.div>

        {/* Índice de misiones — filas editoriales */}
        <div className="border-t border-[var(--border)]">
          {ordered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.25) }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
