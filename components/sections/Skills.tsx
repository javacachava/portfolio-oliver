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

/* Fuente: CV maestro (sección de habilidades). Sin tecnologías que no figuren ahí. */
const ROW_LENGUAJES: IconSkill[] = [
  { name: "Python", image: "python.svg", width: 70, height: 70 },
  { name: "Java", image: "java.svg", width: 56, height: 70 },
  { name: "JavaScript", image: "js.png", width: 65, height: 65 },
  { name: "C#", image: "csharp.svg", width: 70, height: 70 },
  { name: "PHP (básico)", image: "php.svg", width: 80, height: 80 },
];

const ROW_FRONTEND: IconSkill[] = [
  { name: "React", image: "react.png", width: 80, height: 80 },
  { name: "Node.js", image: "node.png", width: 80, height: 80 },
  { name: "Spring Boot", image: "spring.svg", width: 70, height: 70 },
];

const ROW_BACKEND: IconSkill[] = [
  { name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { name: "MySQL", image: "mysql.svg", width: 70, height: 70 },
  { name: "SQLite", image: "sqlite.svg", width: 62, height: 62 },
  { name: "Firestore", image: "firebase.png", width: 55, height: 55 },
];

const ROW_DATA: IconSkill[] = [
  { name: "DigitalOcean", image: "digitalocean.svg", width: 62, height: 62 },
  { name: "Cloudflare", image: "cloudflare.svg", width: 72, height: 72 },
  { name: "AWS (fundamentos)", image: "amazonaws.svg", width: 72, height: 72 },
  { name: "Google Cloud (cursos)", image: "googlecloud.svg", width: 62, height: 62 },
  { name: "Git", image: "git.svg", width: 62, height: 62 },
  { name: "GitHub", image: "github.svg", width: 62, height: 62 },
];

const EXTRA_STACK = [
  "SQL",
  "SendGrid",
  "Análisis en Python",
  "ML introductorio",
  "IA responsable",
  "Vertex AI Studio",
  "Transformers y BERT",
  "Data lakes y warehouses",
  "RBAC y mínimo privilegio",
  "OWASP Top 10",
  "Redes",
  "Criptografía",
  "Respuesta a incidentes",
  "Hacking ético",
  "ITIL",
  "Scrum y trabajo ágil",
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
            Tecnologías y conocimientos
          </h2>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          Lo que uso y lo que he estudiado.
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.5)}
          className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
        >
          Según mi CV maestro, sin porcentajes.
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
