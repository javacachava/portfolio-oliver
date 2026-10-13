"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import NeuralBackground from "@/components/ui/NeuralBackground";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

const TOOLS: Array<{ name: string; icon: string }> = [
  { name: "GPT", icon: "/ai/openai.svg" },
  { name: "Claude", icon: "/ai/claude.svg" },
  { name: "Gemini", icon: "/ai/googlegemini.svg" },
  { name: "Cursor", icon: "/ai/cursor.svg" },
];

function ToolIcon({
  tool,
  index,
}: {
  tool: { name: string; icon: string };
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex flex-col items-center gap-2.5 w-[104px]"
      title={tool.name}
    >
      <div
        className="h-16 w-16 rounded-2xl flex items-center justify-center border border-[#7042f8]/35 bg-[#0b0322]/70"
        style={{ boxShadow: "0 0 18px rgba(112,66,248,0.15)" }}
      >
        <Image
          src={tool.icon}
          alt={tool.name}
          width={30}
          height={30}
          unoptimized
          className="opacity-90"
        />
      </div>
      <span className="font-mono text-[10px] text-gray-400 text-center leading-tight">
        {tool.name}
      </span>
    </motion.div>
  );
}

export default function AITools() {
  return (
    <section
      id="ia"
      className="flex flex-col items-center justify-center relative overflow-hidden py-12 sm:py-24 px-4"
    >
      <NeuralBackground />
      {/* Header — mismo patrón que la sección de tecnologías */}
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
            Herramientas de IA para el desarrollo
          </h2>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.1)}
          className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          IA como apoyo, con revisión humana.
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.2)}
          className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
        >
          Para prototipar, analizar y apoyar el desarrollo.
        </motion.div>
      </motion.div>

      {/* Iconos de herramientas */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 max-w-4xl w-full">
        {TOOLS.map((t, i) => (
          <ToolIcon key={t.name} tool={t} index={i} />
        ))}
      </div>

      {/* Workflow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl text-center mt-12"
      >
        Uso GPT, Claude, Gemini y Cursor para prototipar, analizar y apoyar el
        desarrollo. En WUJU trabajo en IA aplicada con componentes de datos en
        Python para Akhet y Atria, y los resultados pasan por revisión humana.
      </motion.p>
    </section>
  );
}
