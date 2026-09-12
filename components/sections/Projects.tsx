"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ClipboardCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { projects } from "@/data/projects";

const securityCases = projects.filter((project) => project.securityCase);
const supportingProjects = projects.filter((project) => !project.securityCase);
const icons = [ShieldCheck, LockKeyhole, ClipboardCheck];

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
            Los productos detrás de los controles.
          </h2>
          <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
            Los casos de seguridad anteriores nacen de estos productos. Aquí está el contexto
            funcional donde apliqué cada decisión de identidad, autorización o validación.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {securityCases.map((project, index) => {
            const security = project.securityCase!;
            const Icon = icons[index % icons.length];
            const accent = project.accentColor;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group rounded-2xl border bg-[var(--card)] overflow-hidden flex flex-col"
                style={{ borderColor: `${accent}45` }}
              >
                <div className="p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${accent}16`, border: `1px solid ${accent}40`, color: accent }}
                    >
                      <Icon size={19} aria-hidden="true" />
                    </div>
                    <span
                      className="font-mono text-[10px] tracking-wider px-2 py-1 rounded-full"
                      style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}30` }}
                    >
                      CASO {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider mb-2">
                    {project.title}
                  </p>
                  <h3 className="text-lg font-bold text-[var(--foreground)] leading-snug mb-5">
                    {project.tagline}
                  </h3>

                  <div className="rounded-xl border border-[var(--border)] bg-black/10 p-4 text-sm leading-relaxed">
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: accent }}>
                      Control destacado
                    </p>
                    <p className="text-[var(--muted)]">{security.control}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-[var(--border)]">
                    {project.stack.slice(0, 4).map((technology) => (
                      <span
                        key={technology}
                        className="font-mono text-[10px] px-2 py-1 rounded border"
                        style={{ color: `${accent}dd`, background: `${accent}0c`, borderColor: `${accent}25` }}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
                      style={{ color: accent }}
                    >
                      Ver producto
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {supportingProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-10 sm:mt-14 pt-8 border-t border-[var(--border)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] mb-4">
              Otros productos de ingeniería
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {supportingProjects.map((project) => (
                <article key={project.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">{project.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mt-2">{project.tagline}</p>
                </article>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
