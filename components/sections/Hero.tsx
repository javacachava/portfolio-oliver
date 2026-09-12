"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import {
  Cloud,
  Database,
  Download,
  GitBranch,
  KeyRound,
  LockKeyhole,
  Server,
  Terminal,
  Workflow,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    if (
      connection.connection?.saveData ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => setShowVideo(true), 1000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col h-full w-full overflow-hidden"
    >
      {/* Black hole video */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover z-0 opacity-90"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
        </video>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-5 sm:px-10 lg:px-20 mt-24 sm:mt-32 lg:mt-40 mb-14 sm:mb-20 w-full gap-6 sm:gap-10"
      >
        {/* Left: copy */}
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start max-w-2xl">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
          >
            <ShieldCheckIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <p className="Welcome-text text-[13px]">
              Application &amp; Cloud Security Junior
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="mt-6 max-w-[650px] w-auto h-auto"
          >
            <h1
              id="hero-title"
              className="flex flex-col gap-2 text-4xl sm:text-6xl font-bold leading-tight text-white"
            >
              <span>Oliver Ascencio</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                Cybersecurity · Application Security · Cloud
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 max-w-[600px]"
          >
            Combino desarrollo de software y ciberseguridad para construir
            aplicaciones, APIs y sistemas con controles de acceso, seguridad
            de datos y buenas prácticas cloud desde el diseño.
          </motion.p>

          <motion.div
            variants={slideInFromLeft(0.9)}
            aria-label="Tecnologías principales"
            className="flex flex-wrap gap-2 -mt-1"
          >
            {[
              { label: "OWASP", Icon: LockKeyhole },
              { label: "RBAC", Icon: KeyRound },
              { label: "PostgreSQL", Icon: Database },
              { label: "Node.js", Icon: Server },
              { label: "Cloud Security", Icon: Cloud },
              { label: "Git / GitHub", Icon: GitBranch },
            ].map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#7042f8]/35 bg-[#0b0322]/60 px-3 py-1.5 font-mono text-[11px] text-gray-300"
              >
                <Icon size={13} className="text-cyan-300" aria-hidden="true" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={slideInFromLeft(1)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#proyectos"
              className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[240px]"
            >
              Ver proyectos
            </a>
            <a
              href="/cv/CV_Oliver_Ascencio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 px-6 text-center text-white cursor-pointer rounded-lg max-w-[240px] border border-[#7042f88b] hover:bg-[#7042f8]/10 transition-colors"
            >
              <Download size={15} aria-hidden="true" />
              Descargar CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={slideInFromLeft(1.2)}
            className="flex items-center gap-5 mt-2"
          >
            <a
              href="https://github.com/javacachava"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon size={16} />
              javacachava
            </a>
            <span className="text-[#2a0e61]">·</span>
            <a
              href="https://linkedin.com/in/oliver-ascencio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <LinkedinIcon size={16} />
              oliver-ascencio
            </a>
          </motion.div>
        </div>

        {/* Right: hero illustration */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full hidden lg:flex justify-center items-center"
        >
          <div
            aria-hidden="true"
            className="relative flex aspect-square w-full max-w-[520px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#7042f8]/30 bg-[#0b0322]/70 shadow-[0_0_80px_rgba(112,66,248,0.16)]"
          >
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(112,66,248,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(112,66,248,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(112,66,248,0.32),transparent_58%)]" />
            <div className="absolute inset-8 rounded-full border border-[#7042f8]/20 animate-[spin_24s_linear_infinite] motion-reduce:animate-none" />
            <div className="absolute inset-20 rounded-full border border-cyan-400/20 animate-[spin_18s_linear_infinite_reverse] motion-reduce:animate-none" />
            <div className="relative z-10 flex flex-col items-center gap-5 text-center">
              <div className="rounded-3xl border border-[#b49bff]/40 bg-[#7042f8]/15 p-7 shadow-[0_0_45px_rgba(112,66,248,0.3)]">
                <ShieldCheckIcon className="h-24 w-24 text-[#b49bff]" />
              </div>
              <div className="space-y-2">
                <p className="font-mono text-xs tracking-[0.25em] text-cyan-200">
                  PERFIL DE ENFOQUE
                </p>
                <p className="text-sm text-gray-300">
                  Seguridad · cloud · Scrum
                </p>
              </div>
            </div>
            <div className="absolute left-7 top-9 flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-[#071327]/85 px-3 py-2 shadow-lg">
              <Cloud size={17} className="text-cyan-300" />
              <span className="font-mono text-[10px] tracking-wider text-cyan-100">CLOUD</span>
            </div>
            <div className="absolute right-7 top-24 flex items-center gap-2 rounded-xl border border-[#b49bff]/30 bg-[#160933]/85 px-3 py-2 shadow-lg">
              <Workflow size={16} className="text-[#cbbdff]" />
              <span className="font-mono text-[10px] tracking-wider text-purple-100">SCRUM</span>
            </div>
            <div className="absolute bottom-24 left-8 flex items-center gap-2 rounded-xl border border-[#00ff9f]/25 bg-[#05221d]/85 px-3 py-2 shadow-lg">
              <KeyRound size={16} className="text-[#82ffca]" />
              <span className="font-mono text-[10px] tracking-wider text-[#c2ffe7]">SECURITY</span>
            </div>
            <div className="absolute bottom-7 right-7 flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#09061b]/90 px-3 py-2 font-mono text-[10px] text-gray-300 shadow-lg">
              <Terminal size={14} className="text-[#b49bff]" />
              <span>JAVA · JS · PY · SH</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
