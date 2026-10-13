"use client";

import { useEffect, useRef, useState } from "react";

type AmbientVideoProps = {
  src: string;
  className?: string;
  /** Opacidad final; el video entra con un fade desde 0. */
  maxOpacity?: number;
};

// Video decorativo de fondo: no se monta con movimiento reducido ni ahorro de datos,
// solo se reproduce mientras está en pantalla y con la pestaña activa, y entra con fade.
export default function AmbientVideo({ src, className, maxOpacity = 1 }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    setAllowed(
      !connection.connection?.saveData &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let onScreen = false;
    const sync = () => {
      if (onScreen && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [allowed]);

  if (!allowed) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={className}
      style={{ opacity: playing ? maxOpacity : 0, transition: "opacity 700ms ease-out" }}
      onPlaying={() => setPlaying(true)}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
