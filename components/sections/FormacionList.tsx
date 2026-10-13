"use client";

import { motion } from "framer-motion";
import { formacion } from "@/data/formacion";

export default function FormacionList() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10">
      {formacion.map((cat, ci) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: ci * 0.04 }}
        >
          <p
            className="font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2"
            style={{ color: cat.color }}
          >
            <span aria-hidden>▸</span> {cat.label}
          </p>
          <ul className="flex flex-col gap-2.5 border-l pl-5" style={{ borderColor: `${cat.color}25` }}>
            {cat.items.map((item) => (
              <li key={item.name} className="flex flex-col sm:flex-row sm:items-baseline gap-x-3">
                <span className="text-sm text-[var(--foreground)] leading-snug">
                  {item.name}
                  {item.detail && (
                    <span className="text-gray-500 text-xs"> — {item.detail}</span>
                  )}
                </span>
                <span className="font-mono text-[11px] text-[var(--muted)] shrink-0 sm:ml-auto sm:text-right">
                  {item.institution}
                  {item.hours ? ` · ${item.hours}h` : ""}
                  {item.date ? ` · ${item.date}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
