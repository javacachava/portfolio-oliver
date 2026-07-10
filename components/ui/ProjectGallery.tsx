"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({
  images,
  title,
  color,
  onClose,
}: {
  images: string[];
  title: string;
  color: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4">
        <span className="font-mono text-xs text-gray-300">
          {title}
          <span className="ml-3 tabular-nums" style={{ color }}>
            {idx + 1}/{images.length}
          </span>
        </span>
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="h-9 w-9 rounded-lg flex items-center justify-center border border-white/15 text-gray-300 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Imagen */}
      <div
        className="relative w-full max-w-5xl h-[72vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
          >
            <Image
              src={images[idx]}
              alt={`${title} — captura ${idx + 1}`}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{ filter: `drop-shadow(0 0 40px ${color}20)` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl flex items-center justify-center border bg-[#030014]/80 text-gray-200 hover:text-white transition-colors cursor-pointer"
            style={{ borderColor: `${color}50` }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Siguiente"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl flex items-center justify-center border bg-[#030014]/80 text-gray-200 hover:text-white transition-colors cursor-pointer"
            style={{ borderColor: `${color}50` }}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              aria-label={`Captura ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className="h-1.5 rounded-full transition-all cursor-pointer"
              style={{
                width: i === idx ? 20 : 6,
                background: i === idx ? color : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
