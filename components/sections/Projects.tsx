"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-mono text-[var(--accent)] mb-2 tracking-widest uppercase">
            Proyectos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
            Software real. Clientes reales.
          </h2>
          <p className="text-[var(--muted)] max-w-xl">
            No tutoriales, no clones. Cada proyecto resuelve un problema concreto
            y tiene código en producción o demo funcional.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
