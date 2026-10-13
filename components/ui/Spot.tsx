"use client";

import { useRef } from "react";

/**
 * Contenedor que expone la posición del cursor como variables CSS (--mx, --my).
 * El destello del borde (.plate-spot) se dibuja solo con CSS.
 */
export default function Spot({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={className}>
      {children}
    </div>
  );
}
