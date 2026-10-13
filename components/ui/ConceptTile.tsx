"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ConceptTileProps = {
  Icon: LucideIcon;
  label: string;
  index: number;
};

// Habilidad sin logotipo propio (conceptos y prácticas): icono genérico con su nombre visible.
export default function ConceptTile({ Icon, label, index }: ConceptTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="flex w-[92px] flex-col items-center gap-2 text-center"
    >
      <span className="grid size-14 place-items-center rounded-xl border border-[#7042f8]/40 bg-[#0b0322]/60 text-[#b49bff]">
        <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="font-mono text-[11px] leading-tight text-gray-300">{label}</span>
    </motion.div>
  );
}
