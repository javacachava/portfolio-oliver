"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  speed: number;
}

/**
 * Cielo estrellado en un canvas 2D ligero (sin three.js): unas cuantas estrellas con parpadeo
 * suave y deriva lenta. Con prefers-reduced-motion o ahorro de datos se dibuja una sola vez.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / 5200);
      stars = Array.from({ length: Math.min(count, 320) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.25,
        a: Math.random() * 0.6 + 0.25,
        tw: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.04 + 0.01,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = motion.matches ? 1 : 0.65 + Math.sin(time / 1400 + star.tw) * 0.35;
        ctx.globalAlpha = star.a * twinkle;
        ctx.fillStyle = star.r > 1.1 ? "#cdbfff" : "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        if (!motion.matches) {
          star.y -= star.speed;
          if (star.y < -2) {
            star.y = height + 2;
            star.x = Math.random() * width;
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    // 30 cuadros por segundo bastan para un parpadeo y una deriva lentos, y cuestan la mitad.
    let last = 0;
    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - last < 33) return;
      last = time;
      draw(time);
    };

    const start = () => {
      if (running || motion.matches || saveData) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      draw(0);
    };

    resize();
    draw(0);
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", () => (motion.matches ? stop() : start()));

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="starfield" />;
}
