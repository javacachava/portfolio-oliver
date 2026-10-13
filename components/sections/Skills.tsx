"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SparklesIcon } from "@heroicons/react/24/solid";
import SkillIcon from "@/components/ui/SkillIcon";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

interface IconSkill {
  name: string;
  image: string;
  width: number;
  height: number;
}

const ROW_LENGUAJES: IconSkill[] = [
  { name: "JavaScript", image: "js.png", width: 65, height: 65 },
  { name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { name: "PHP", image: "php.svg", width: 80, height: 80 },
  { name: "Python", image: "python.svg", width: 70, height: 70 },
  { name: "HTML5", image: "html.png", width: 80, height: 80 },
  { name: "CSS3", image: "css.png", width: 80, height: 80 },
];

const ROW_FRONTEND: IconSkill[] = [
  { name: "Vue 3", image: "vuejs.svg", width: 70, height: 70 },
  { name: "React", image: "react.png", width: 80, height: 80 },
  { name: "Next.js", image: "next.png", width: 80, height: 80 },
  { name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
];

const ROW_BACKEND: IconSkill[] = [
  { name: "Laravel", image: "laravel.svg", width: 65, height: 65 },
  { name: "FastAPI", image: "fastapi.svg", width: 70, height: 70 },
  { name: "Django", image: "django.svg", width: 55, height: 55 },
  { name: "NestJS", image: "nestjs.svg", width: 70, height: 70 },
  { name: "Node.js", image: "node.png", width: 80, height: 80 },
  { name: "Express", image: "express.png", width: 80, height: 80 },
];

const ROW_DATA: IconSkill[] = [
  { name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { name: "Supabase", image: "supabase.svg", width: 62, height: 62 },
  { name: "Firebase", image: "firebase.png", width: 55, height: 55 },
  { name: "Docker", image: "docker.png", width: 70, height: 70 },
  { name: "Figma", image: "figma.png", width: 50, height: 50 },
];

const EXTRA_STACK = [
  "Pinia",
  "Vitest",
  "pytest",
  "PHPStan · Pint",
  "Three.js",
  "HTMX",
  "AWS Cloud",
  "Google Cloud",
  "Vertex AI",
  "Redis",
  "PostGIS",
  "Git · GitHub",
  "OWASP Top 10",
  "Swagger/OpenAPI",
];

export default function Skills() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px",
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-14 sm:py-20"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full h-auto flex flex-col items-center justify-center"
      >
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h2 className="Welcome-text text-[13px]">
            Stack probado en producción
          </h2>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          Tecnologías con las que construyo.
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.5)}
          className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
        >
          Del backend a la nube, sin humo.
        </motion.div>
      </motion.div>

      {/* Icon rows */}
      {[ROW_LENGUAJES, ROW_FRONTEND, ROW_BACKEND, ROW_DATA].map((row, r) => (
        <div
          key={r}
          className="flex w-full max-w-4xl flex-row flex-wrap justify-center items-center mt-4 gap-5 px-5 sm:px-0"
        >
          {row.map((skill, i) => (
            <SkillIcon
              key={skill.name}
              src={skill.image}
              name={skill.name}
              width={skill.width}
              height={skill.height}
              index={i}
            />
          ))}
        </div>
      ))}

      {/* Extra stack chips (sin icono, mismo peso real) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mt-10 max-w-3xl px-5"
      >
        {EXTRA_STACK.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-[#7042f8]/40 bg-[#0b0322]/60 text-gray-300"
          >
            {s}
          </span>
        ))}
      </motion.div>

      {/* Background video */}
      {inView && (
        <div className="w-full h-full absolute -z-10" aria-hidden="true">
          <div className="w-full h-full opacity-30 absolute flex items-center justify-center bg-cover">
            <video
              className="w-full h-auto"
              preload="none"
              playsInline
              loop
              muted
              autoPlay
            >
              <source src="/videos/skills-bg.webm" type="video/webm" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
