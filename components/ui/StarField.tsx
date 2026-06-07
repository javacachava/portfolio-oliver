"use client";

import { useEffect, useRef } from "react";

const STAR_COLORS = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#00ff9f",
  "#0ea5e9",
  "#a78bfa",
  "#f0f0ff",
];

export function StarField({ count = 200 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2.2 + 0.4;
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      const duration = (Math.random() * 4 + 2).toFixed(1);
      const delay = (Math.random() * 5).toFixed(1);
      const opacity = (Math.random() * 0.65 + 0.15).toFixed(2);

      star.style.cssText =
        `position:absolute;` +
        `left:${(Math.random() * 100).toFixed(2)}%;` +
        `top:${(Math.random() * 100).toFixed(2)}%;` +
        `width:${size.toFixed(2)}px;` +
        `height:${size.toFixed(2)}px;` +
        `border-radius:50%;` +
        `background:${color};` +
        `opacity:${opacity};` +
        `animation:twinkle ${duration}s ease-in-out ${delay}s infinite alternate;`;

      frag.appendChild(star);
    }

    el.appendChild(frag);

    return () => {
      while (el.firstChild) el.removeChild(el.firstChild);
    };
  }, [count]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
