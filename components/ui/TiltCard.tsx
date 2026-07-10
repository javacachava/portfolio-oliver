"use client";

import { useRef, useState, useCallback } from "react";

export default function TiltCard({
  children,
  glowColor = "#7042f8",
  className = "",
}: {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current !== null) return;
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      setTilt({ rx: (0.5 - py) * 5, ry: (px - 0.5) * 7 });
      setSpot({ x: px * 100, y: py * 100, visible: true });
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setSpot((s) => ({ ...s, visible: false }));
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: spot.visible
          ? "transform 0.1s ease-out"
          : "transform 0.45s cubic-bezier(0.25, 0, 0, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Spotlight que sigue el cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl z-10"
        style={{
          opacity: spot.visible ? 1 : 0,
          transition: "opacity 0.3s",
          background: `radial-gradient(380px circle at ${spot.x}% ${spot.y}%, ${glowColor}14, transparent 65%)`,
        }}
      />
      {/* Borde iluminado donde pasa el cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl z-10"
        style={{
          opacity: spot.visible ? 1 : 0,
          transition: "opacity 0.3s",
          background: `radial-gradient(220px circle at ${spot.x}% ${spot.y}%, ${glowColor}35, transparent 70%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
}
