"use client";

import { motion } from "framer-motion";
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

const ROW_BASE: IconSkill[] = [
  { name: "HTML5", image: "html.png", width: 80, height: 80 },
  { name: "CSS3", image: "css.png", width: 80, height: 80 },
  { name: "JavaScript", image: "js.png", width: 65, height: 65 },
  { name: "TypeScript", image: "ts.png", width: 80, height: 80 },
];

const ROW_FRONTEND: IconSkill[] = [
  { name: "React", image: "react.png", width: 80, height: 80 },
  { name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
  { name: "Next.js", image: "next.png", width: 80, height: 80 },
  { name: "Figma", image: "figma.png", width: 50, height: 50 },
];

const ROW_BACKEND: IconSkill[] = [
  { name: "Node.js", image: "node.png", width: 80, height: 80 },
  { name: "Express", image: "express.png", width: 80, height: 80 },
  { name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { name: "Firebase", image: "firebase.png", width: 55, height: 55 },
  { name: "Docker", image: "docker.png", width: 70, height: 70 },
];

const EXTRA_STACK = [
  "Java",
  "Spring Boot",
  "PHP",
  "Python",
  "AWS Cloud",
  "Google Cloud",
  "Vertex AI",
  "Redis",
  "Supabase",
  "PostGIS",
  "Git · GitHub",
  "OWASP Top 10",
  "Swagger/OpenAPI",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
      style={{ transform: "scale(0.9)" }}
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
      {[ROW_BASE, ROW_FRONTEND, ROW_BACKEND].map((row, r) => (
        <div
          key={r}
          className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center"
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
      <div className="w-full h-full absolute -z-10">
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
    </section>
  );
}
