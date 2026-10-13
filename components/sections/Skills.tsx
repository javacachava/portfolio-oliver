"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AmbientVideo from "@/components/ui/AmbientVideo";
import {
  Bug,
  ClipboardList,
  KeyRound,
  Mail,
  Network,
  RefreshCw,
  ShieldCheck,
  Siren,
  SquareKanban,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import ConceptTile from "@/components/ui/ConceptTile";
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

interface Concept {
  name: string;
  Icon: LucideIcon;
}

interface Group {
  label: string;
  note?: string;
  icons?: IconSkill[];
  concepts?: Concept[];
}

/* Fuente: CV maestro (sección de habilidades). Sin tecnologías que no figuren ahí. */
const GROUPS: Group[] = [
  {
    label: "Lenguajes",
    icons: [
      { name: "Python", image: "python.svg", width: 70, height: 70 },
      { name: "Java", image: "java.svg", width: 56, height: 70 },
      { name: "JavaScript", image: "js.png", width: 65, height: 65 },
      { name: "C#", image: "csharp.svg", width: 70, height: 70 },
    ],
  },
  {
    label: "Frameworks y herramientas",
    icons: [
      { name: "React", image: "react.png", width: 80, height: 80 },
      { name: "Node.js", image: "node.png", width: 80, height: 80 },
      { name: "Spring Boot", image: "spring.svg", width: 70, height: 70 },
      { name: "Git", image: "git.svg", width: 62, height: 62 },
      { name: "GitHub", image: "github.svg", width: 62, height: 62 },
    ],
  },
  {
    label: "Bases de datos",
    icons: [
      { name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
      { name: "MySQL", image: "mysql.svg", width: 70, height: 70 },
      { name: "SQLite", image: "sqlite.svg", width: 62, height: 62 },
      { name: "Firestore", image: "firebase.png", width: 55, height: 55 },
    ],
  },
  {
    label: "Cloud",
    note: "DigitalOcean, Cloudflare y SendGrid en TuGuíaSV; AWS (fundamentos) y Google Cloud vienen de cursos.",
    icons: [
      { name: "DigitalOcean", image: "digitalocean.svg", width: 62, height: 62 },
      { name: "Cloudflare", image: "cloudflare.svg", width: 72, height: 72 },
      { name: "AWS (fundamentos)", image: "amazonaws.svg", width: 72, height: 72 },
      { name: "Google Cloud (cursos)", image: "googlecloud.svg", width: 62, height: 62 },
    ],
    concepts: [{ name: "SendGrid", Icon: Mail }],
  },
  {
    label: "Ciberseguridad",
    note: "RBAC aplicado en un POS; el resto es base académica del TSU en Ciberseguridad.",
    concepts: [
      { name: "RBAC y mínimo privilegio", Icon: ShieldCheck },
      { name: "OWASP Top 10", Icon: Bug },
      { name: "Redes", Icon: Network },
      { name: "Criptografía", Icon: KeyRound },
      { name: "Respuesta a incidentes", Icon: Siren },
      { name: "Hacking ético", Icon: Terminal },
    ],
  },
  {
    label: "Scrum y gestión",
    note: "Prácticas ágiles en WUJU; curso de Scrum Master inscrito; ITIL a nivel de fundamentos.",
    concepts: [
      { name: "Scrum", Icon: RefreshCw },
      { name: "Seguimiento de tareas", Icon: SquareKanban },
      { name: "Requisitos", Icon: ClipboardList },
      { name: "ITIL", Icon: Workflow },
    ],
  },
];

const EXTRA_STACK = [
  "SQL",
  "Análisis en Python",
  "ML introductorio",
  "IA responsable",
  "Vertex AI Studio",
  "Transformers y BERT",
  "Data lakes y warehouses",
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
          variants={slideInFromLeft(0.1)}
          className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          Lo que uso y lo que he estudiado.
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.2)}
          className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
        >
          Según mi CV maestro, sin porcentajes.
        </motion.div>
      </motion.div>

      {/* Grupos de habilidades */}
      {GROUPS.map((group) => {
        const iconCount = group.icons?.length ?? 0;
        return (
          <div
            key={group.label}
            role="group"
            aria-label={group.label}
            className="flex w-full max-w-4xl flex-col items-center mt-8 px-5 sm:px-0"
          >
            <h3 className="font-mono text-[12px] tracking-wider text-gray-400">{group.label}</h3>
            {group.note && (
              <p className="mt-1 max-w-md text-center text-[12px] text-gray-400">{group.note}</p>
            )}
            <div className={`flex flex-row flex-wrap justify-center mt-4 gap-5 ${group.icons ? "items-center" : "items-start"}`}>
              {group.icons?.map((skill, i) => (
                <SkillIcon
                  key={skill.name}
                  src={skill.image}
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                />
              ))}
              {group.concepts?.map((concept, i) => (
                <ConceptTile
                  key={concept.name}
                  Icon={concept.Icon}
                  label={concept.name}
                  index={iconCount + i}
                />
              ))}
            </div>
          </div>
        );
      })}

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
            <AmbientVideo src="/videos/skills-bg.webm" className="w-full h-auto" />
          </div>
        </div>
      )}
    </section>
  );
}
