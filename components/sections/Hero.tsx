"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0, 0, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
      {/* Floating content wrapper */}
      <motion.div
        animate={{ y: [0, -13, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        {/* HUD corner brackets (Star Wars targeting style) */}
        <div className="absolute -inset-8 pointer-events-none hidden sm:block">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--accent)] opacity-25" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] opacity-25" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--green)] opacity-25" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--green)] opacity-25" />
        </div>
        {/* Pixel badge — Press Start 2P */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent)] mb-7 tracking-widest uppercase leading-relaxed"
        >
          ›_ disponible para nuevos proyectos
        </motion.p>

        {/* Name — animated gradient */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-7xl font-bold mb-5 text-gradient"
        >
          Oliver Ascencio
        </motion.h1>

        {/* Subtitle with cursor blink */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg sm:text-xl text-[var(--accent)] font-medium mb-4 cursor-blink"
        >
          Desarrollador Full-Stack · Cofundador de Wuju
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Construyo software que resuelve problemas reales en El Salvador.
          <br className="hidden sm:block" /> Backend sólido, producto con propósito.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <a
            href="#proyectos"
            className="px-6 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium text-sm transition-all duration-150 w-full sm:w-auto text-center hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_var(--accent)/30]"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="px-6 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/60 text-[var(--foreground)] font-medium text-sm transition-all duration-150 w-full sm:w-auto text-center hover:-translate-y-0.5 active:translate-y-0"
          >
            Hablemos
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/javacachava"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <GithubIcon size={16} />
            javacachava
          </a>
          <span className="text-[var(--border)]">·</span>
          <a
            href="https://linkedin.com/in/oliver-ascencio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <LinkedinIcon size={16} />
            oliver-ascencio
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown size={18} className="text-[var(--muted)] animate-bounce" />
      </motion.div>
    </section>
  );
}
