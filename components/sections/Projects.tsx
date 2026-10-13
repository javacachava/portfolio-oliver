"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="proyectos" className="py-14 sm:py-24 px-4 sm:px-6" aria-labelledby="proyectos-titulo">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <SectionEyebrow className="mb-2">Evidencia en producto</SectionEyebrow>
          <h2 id="proyectos-titulo" className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3">
            Proyectos, no solo palabras clave.
          </h2>
          <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
            Cada proyecto es real: producto en uso, cliente real o repositorio verificable. Stack,
            decisiones y — cuando aplica — el control de seguridad concreto que implementé.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project, index) => {
            const accent = project.accentColor;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                className="group rounded-2xl border bg-[var(--card)] overflow-hidden flex flex-col"
                style={{ borderColor: `${accent}45` }}
              >
                <div className="p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1.5">
                        {project.title}
                      </p>
                      <h3 className="text-lg font-bold text-[var(--foreground)] leading-snug">
                        {project.tagline}
                      </h3>
                    </div>
                    <span
                      className="shrink-0 font-mono text-[10px] tracking-wider px-2 py-1 rounded-full"
                      style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}30` }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-[var(--foreground)]">
                        <span aria-hidden="true" style={{ color: accent }}>
                          ▸
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {project.securityCase && (
                    <div className="rounded-xl border border-[var(--border)] bg-black/10 p-4 text-sm leading-relaxed mt-5">
                      <p
                        className="font-mono text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5"
                        style={{ color: accent }}
                      >
                        <ShieldCheck size={12} aria-hidden="true" />
                        Seguridad implementada
                      </p>
                      <p className="text-[var(--muted)]">
                        <span className="text-[var(--foreground)]">Riesgo: </span>
                        {project.securityCase.risk}
                      </p>
                      <p className="mt-2 text-[var(--muted)]">
                        <span className="text-[var(--foreground)]">Control: </span>
                        {project.securityCase.control}
                      </p>
                    </div>
                  )}

                  {project.note && (
                    <p className="mt-4 font-mono text-[10px] text-[var(--muted)] italic">{project.note}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-[var(--border)]">
                    {project.stack.map((technology) => (
                      <span
                        key={technology}
                        className="font-mono text-[10px] px-2 py-1 rounded border"
                        style={{ color: `${accent}dd`, background: `${accent}0c`, borderColor: `${accent}25` }}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {(project.demo || project.github) && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
                          style={{ color: accent }}
                        >
                          Ver producto
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-white"
                        >
                          <GithubIcon size={14} />
                          Ver GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
