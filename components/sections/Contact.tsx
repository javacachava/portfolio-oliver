"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { slideInFromTop } from "@/lib/motion";

const SOCIAL_CHIPS = [
  {
    label: "github.com/javacachava",
    href: "https://github.com/javacachava",
    Icon: GithubIcon,
  },
  {
    label: "in/oliver-ascencio",
    href: "https://linkedin.com/in/oliver-ascencio",
    Icon: LinkedinIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="py-28 px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-6"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <span className="Welcome-text text-[13px]">
          Disponible para proyectos remotos o en El Salvador
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 pb-2"
      >
        Hablemos.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-[var(--muted)] max-w-md mt-3 mb-10"
      >
        ¿Un proyecto, una idea o algo para Wuju? Un correo o un WhatsApp y
        seguimos la conversación.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto px-6 sm:px-0"
      >
        <a
          href="mailto:oliver.a.ascencio@gmail.com"
          className="button-primary flex items-center justify-center gap-2 py-3 px-8 text-white rounded-lg text-sm font-medium"
        >
          <Mail size={15} />
          oliver.a.ascencio@gmail.com
        </a>
        <a
          href="https://wa.me/50375398164"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-8 text-white rounded-lg text-sm font-medium border border-[#00ff9f]/40 hover:bg-[#00ff9f]/10 transition-colors"
        >
          <MessageCircle size={15} className="text-[#00ff9f]" />
          WhatsApp
        </a>
      </motion.div>

      {/* Social chips */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {SOCIAL_CHIPS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] px-3.5 py-1.5 rounded-full border border-[#7042f8]/40 bg-[#0b0322]/60 text-gray-300 hover:text-white hover:border-[#7042f8] transition-colors"
          >
            <Icon size={13} />
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
