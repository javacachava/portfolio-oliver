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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Software real. Clientes reales.
          </h2>
          <p className="text-muted max-w-xl">
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

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-xl border border-[#00ff9f]/20 bg-[#00ff9f]/5 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
        >
          <div className="shrink-0 w-10 h-10 rounded-full bg-[#00ff9f]/15 border border-[#00ff9f]/30 flex items-center justify-center">
            <span className="font-pixel text-[9px] text-[#00ff9f]">JT</span>
          </div>
          <div className="flex-1">
            <p className="text-foreground text-base leading-relaxed mb-4">
              &ldquo;El bot de WhatsApp cambió completamente la forma en que tomamos pedidos.
              Ahora recibimos órdenes a cualquier hora sin necesidad de estar pendientes del teléfono.
              El sistema funciona solo y los clientes están muy contentos.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Juan Trejo</p>
                <p className="text-xs text-muted">Dueño · Pizza Brava · Santa Ana, El Salvador</p>
              </div>
              <span
                className="font-pixel text-[7px] px-2 py-1 rounded ml-auto"
                style={{ color: "#00ff9f", background: "rgba(0,255,159,0.1)", border: "1px solid rgba(0,255,159,0.25)" }}
              >
                ● CLIENTE ACTIVO
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
