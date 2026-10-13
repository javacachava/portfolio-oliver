"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Shield } from "@/components/ui/Icons";
import LanguageIcon, { type LanguageName } from "@/components/ui/LanguageIcons";
import { profile } from "@/data/profile";

interface Area {
  id: string;
  /** Rótulo corto de la etiqueta flotante. */
  chip: string;
  title: string;
  evidence: string;
  href: string;
  /** Posición de la etiqueta dentro de la escena (en %). */
  at: { left?: string; right?: string; top: string };
}

const AREAS: Area[] = [
  {
    id: "software",
    chip: "Software",
    title: "Desarrollo de software",
    evidence: "Sistema POS para Pizza Brava, bot de pedidos por WhatsApp y gestión de invitaciones.",
    href: "/proyectos",
    at: { left: "5%", top: "21%" },
  },
  {
    id: "seguridad",
    chip: "Seguridad",
    title: "Ciberseguridad",
    evidence: "TSU en Ciberseguridad. Control de acceso por roles aplicado en el POS.",
    href: "/proyectos/pos-pizza-brava",
    at: { right: "4%", top: "36%" },
  },
  {
    id: "ia",
    chip: "IA y datos",
    title: "IA y datos",
    evidence: "Componentes de análisis en Python para CuencaOS / Akhet y Terrivo / Atria.",
    href: "/proyectos/cuencaos",
    at: { left: "5%", top: "74%" },
  },
  {
    id: "coordinacion",
    chip: "Coordinación",
    title: "Coordinación técnica",
    evidence: "Líder técnico de un equipo de seis personas en WUJU.",
    href: "/#wuju",
    at: { right: "6%", top: "86%" },
  },
];

interface Language {
  name: LanguageName;
  label: string;
  color: string;
  /** Centro del icono dentro de la escena (en %). */
  x: number;
  y: number;
  drift: number;
  tilt: number;
  dur: number;
  delay: number;
}

/* Lenguajes con los que he trabajado (ver Competencias). Se distribuyen sobre la órbita. */
const LANGUAGES: Language[] = [
  { name: "Python", label: "Python", color: "#4b8bbe", x: 30, y: 16, drift: -10, tilt: 3, dur: 8.5, delay: 0 },
  { name: "JavaScript", label: "JavaScript", color: "#f7df1e", x: 66, y: 11, drift: 9, tilt: -3, dur: 9.5, delay: 0.8 },
  { name: "TypeScript", label: "TypeScript", color: "#3178c6", x: 88, y: 28, drift: -8, tilt: 4, dur: 8, delay: 1.4 },
  { name: "Java", label: "Java", color: "#f89820", x: 16, y: 44, drift: 11, tilt: -4, dur: 10, delay: 1.8 },
  { name: "PostgreSQL", label: "PostgreSQL", color: "#4169e1", x: 84, y: 54, drift: -11, tilt: 3, dur: 9, delay: 0.4 },
  { name: "PHP", label: "PHP", color: "#8993be", x: 24, y: 88, drift: -9, tilt: -3, dur: 9.5, delay: 1.1 },
  { name: "CSharp", label: "C#", color: "#9b6cff", x: 60, y: 92, drift: 8, tilt: 4, dur: 8.5, delay: 1.6 },
  { name: "Bash", label: "Bash", color: "#4eaa25", x: 50, y: 70, drift: 10, tilt: -4, dur: 10, delay: 0.6 },
];

const STACK_CHIPS = ["Python", "JavaScript", "React", "PostgreSQL", "Laravel", "RBAC"];

export default function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // El video del agujero negro es decorativo: solo se carga si no hay ahorro de datos
  // ni preferencia de movimiento reducido, solo en pantallas anchas, y se pausa cuando el hero
  // sale de la pantalla.
  useEffect(() => {
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (
      connection.connection?.saveData ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 768px)").matches
    ) {
      return;
    }
    const timeout = window.setTimeout(() => setShowVideo(true), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "120px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) void video.play().catch(() => undefined);
    else video.pause();
  }, [inView, showVideo]);

  const activate = (i: number) => () => setActive(i);
  const deactivate = () => setActive(null);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="inicio-titulo"
      className="relative overflow-hidden"
    >
      {showVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[-14rem] z-0 h-[120%] w-full rotate-180 object-cover opacity-60 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)] lg:opacity-30"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
        </video>
      )}

      <div className="wrap relative z-10 grid items-center gap-x-10 gap-y-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-7">
          <p className="pill rise" style={{ "--i": 0 } as React.CSSProperties}>
            <Shield size={16} className="text-soft" />
            Estudiante de Ingeniería en Desarrollo de Software y cofundador de WUJU
          </p>

          <h1 id="inicio-titulo" className="rise mt-7" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="t-display block">{profile.shortName}</span>
            <span className="gradient-text mt-3 block pb-2 font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em]">
              Software, ciberseguridad
              <br />e IA aplicada
            </span>
          </h1>

          <p className="t-lead measure rise mt-6" style={{ "--i": 2 } as React.CSSProperties}>{profile.intro}</p>

          <ul className="rise mt-6 flex flex-wrap gap-2" aria-label="Tecnologías con las que he trabajado" style={{ "--i": 3 } as React.CSSProperties}>
            {STACK_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-violet/40 bg-nebula/60 px-3 py-1 font-mono text-[0.76rem] text-[#cdbfff]"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <Link href="/proyectos" className="btn btn-primary">
              Ver proyectos
            </Link>
            <a href={profile.cv} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              Ver CV<span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
            </a>
            <Link href="/#contacto" className="btn btn-ghost">
              Contactar
            </Link>
          </div>

          <p className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.92rem]" style={{ "--i": 5 } as React.CSSProperties}>
            <a
              href={profile.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-fg-muted no-underline transition-colors hover:text-white"
            >
              <GithubIcon size={16} />
              {profile.github.label.replace("github.com/", "")}
              <span className="sr-only"> en GitHub (se abre en una pestaña nueva)</span>
            </a>
            <a
              href={profile.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-fg-muted no-underline transition-colors hover:text-white"
            >
              <LinkedinIcon size={16} />
              {profile.linkedin.label.replace("linkedin.com/in/", "")}
              <span className="sr-only"> en LinkedIn (se abre en una pestaña nueva)</span>
            </a>
          </p>
        </div>

        {/* Escena orbital decorativa. El equivalente accesible es la lista de áreas de abajo. */}
        <div className="lg:col-span-5" aria-hidden="true">
          <div className="orbit" onPointerLeave={deactivate}>
            <div className="orbit-grid" />

            <span
              className="orbit-ring orbit-spin h-[88%] w-[88%] border-violet/45"
              style={{ "--t": "90s" } as React.CSSProperties}
            />
            <span
              className="orbit-ring orbit-spin h-[64%] w-[64%] border-cyan/40"
              style={{ "--t": "60s", animationDirection: "reverse" } as React.CSSProperties}
            />
            <span
              className="orbit-ring orbit-spin h-[42%] w-[42%] border-rose-400/35"
              style={{ "--t": "45s" } as React.CSSProperties}
            />

            <div className="globe-stage">
              <div className="globe">
                <span className="globe-core" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="globe-line" style={{ transform: `rotateY(${i * 30}deg)` }} />
                ))}
                <span className="globe-line" style={{ transform: "rotateX(90deg)" }} />
                <span
                  className="globe-line"
                  style={{ transform: "rotateX(90deg) translateZ(2.5rem) scale(0.82)" }}
                />
                <span
                  className="globe-line"
                  style={{ transform: "rotateX(90deg) translateZ(-2.5rem) scale(0.82)" }}
                />
              </div>
            </div>

            {LANGUAGES.map((language) => (
              <span
                key={language.name}
                className="orbit-icon"
                style={
                  {
                    left: `${language.x}%`,
                    top: `${language.y}%`,
                    margin: "-1.8rem 0 0 -1.8rem",
                    "--drift": `${language.drift}px`,
                    "--tilt": `${language.tilt}deg`,
                    "--dur": `${language.dur}s`,
                    "--delay": `${language.delay}s`,
                  } as React.CSSProperties
                }
              >
                <LanguageIcon
                  name={language.name}
                  className="size-8"
                  style={{ color: language.color, filter: `drop-shadow(0 0 10px ${language.color}88)` }}
                />
              </span>
            ))}

            {AREAS.map((area, i) => (
              <span
                key={area.id}
                className="orbit-area"
                data-active={active === i}
                style={{ left: area.at.left, right: area.at.right, top: area.at.top }}
              >
                {area.chip}
              </span>
            ))}
          </div>
        </div>

        <ul className="grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {AREAS.map((area, i) => (
            <li key={area.id}>
              <Link
                href={area.href}
                className="group block no-underline"
                onMouseEnter={activate(i)}
                onMouseLeave={deactivate}
                onFocus={activate(i)}
                onBlur={deactivate}
              >
                <span className="t-h3 block text-ink transition-colors group-hover:text-soft group-focus-visible:text-soft">
                  {area.title}
                </span>
                <span className="t-small mt-2 block">{area.evidence}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
