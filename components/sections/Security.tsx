"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  UsersRound,
  Webhook,
  type LucideIcon,
} from "lucide-react";

import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface SecurityCase {
  id: string;
  title: string;
  summary: string;
  risk: string;
  control: string;
  evidence: string;
  tags: string[];
  Icon: LucideIcon;
  accent: {
    glow: string;
    icon: string;
    badge: string;
    signal: string;
  };
}

const SECURITY_CASES: SecurityCase[] = [
  {
    id: "tuguiasv",
    title: "TuGuiaSV · identidad y acceso",
    summary: "Datos geoespaciales con distintos niveles de responsabilidad.",
    risk:
      "Que una sesión autenticada lea o modifique información fuera del alcance de su cuenta.",
    control:
      "Diseño de sesiones JWT, roles y políticas RLS para separar usuarios, propietarios y personal autorizado; el acceso privilegiado queda reservado a funciones de servidor autorizadas.",
    evidence:
      "El esquema de TuGuiaSV documenta políticas RLS, guardas para columnas sensibles y que la service_role no llega al navegador.",
    tags: ["JWT", "RLS", "Mínimo privilegio"],
    Icon: KeyRound,
    accent: {
      glow: "bg-cyan-400/20",
      icon: "border-cyan-300/40 bg-cyan-400/15 text-cyan-200",
      badge: "border-cyan-300/30 bg-cyan-400/10 text-cyan-100",
      signal: "bg-cyan-300",
    },
  },
  {
    id: "whatsapp-webhook",
    title: "Bot de pedidos · webhook firmado",
    summary: "Una integración pública no debe confiar ciegamente en cada POST.",
    risk:
      "Que alguien envíe eventos falsos a la URL pública del webhook y active procesamiento no autorizado.",
    control:
      "Con APP_SECRET configurado, se compara un HMAC-SHA256 del body crudo con X-Hub-Signature-256 antes de procesar el evento.",
    evidence:
      "La verificación vive en webhook_security.js y tiene pruebas para firmas válidas, inválidas y configuración ausente.",
    tags: ["HMAC-SHA256", "Meta Cloud API", "Validación de origen"],
    Icon: Webhook,
    accent: {
      glow: "bg-emerald-400/20",
      icon: "border-emerald-300/40 bg-emerald-400/15 text-emerald-200",
      badge: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
      signal: "bg-emerald-300",
    },
  },
  {
    id: "restaurant-pos",
    title: "POS · autorización por función",
    summary: "Caja, cocina, meseros y administración no comparten las mismas acciones.",
    risk:
      "Que un usuario ejecute una operación o consulte un recurso que corresponde a otro rol operativo.",
    control:
      "Roles y permisos por acción para los módulos operativos, con autorización en API además de la separación visible en la interfaz.",
    evidence:
      "La especificación enumera roles y permisos; las pruebas E2E verifican respuestas 403 cuando falta autorización. El POS v1.0 está en producción.",
    tags: ["RBAC", "Permisos", "Pruebas E2E"],
    Icon: UsersRound,
    accent: {
      glow: "bg-violet-400/20",
      icon: "border-violet-300/40 bg-violet-400/15 text-violet-200",
      badge: "border-violet-300/30 bg-violet-400/10 text-violet-100",
      signal: "bg-violet-300",
    },
  },
  {
    id: "portfolio-hardening",
    title: "Este portfolio · hardening web",
    summary: "También aplico controles al producto que estoy mostrando.",
    risk:
      "Abrir innecesariamente el navegador a framing, tipos de contenido ambiguos o capacidades que la página no necesita.",
    control:
      "CSP, HSTS, anti-framing, nosniff, políticas de referrer y permissions; además de aislamiento entre orígenes cuando corresponde.",
    evidence:
      "Las cabeceras están centralizadas en next.config.ts y se declaran para todas las rutas con /:path*.",
    tags: ["CSP", "HSTS", "Security headers"],
    Icon: ShieldCheck,
    accent: {
      glow: "bg-fuchsia-400/20",
      icon: "border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-200",
      badge: "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100",
      signal: "bg-fuchsia-300",
    },
  },
];

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export default function Security() {
  const prefersReducedMotion = useReducedMotion();
  const allowMotion = prefersReducedMotion === false;
  const [saveData, setSaveData] = useState(true);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "250px 0px",
  });

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  const showVideo = inView && allowMotion && !saveData;

  return (
    <section
      ref={sectionRef}
      id="seguridad"
      aria-labelledby="seguridad-title"
      className="relative isolate w-full overflow-hidden bg-[#030014] px-4 py-20 text-white sm:px-6 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {showVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover opacity-75"
          >
            <source src="/videos/encryption-bg.webm" type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 bg-[#030014]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(112,66,248,0.42),transparent_33%),linear-gradient(180deg,rgba(3,0,20,0.25),#030014_88%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={allowMotion ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionEyebrow className="mb-4 text-cyan-200">
            AppSec · controles verificables
          </SectionEyebrow>
          <h2
            id="seguridad-title"
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Seguridad aplicada,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d8c9ff] via-[#b49bff] to-cyan-200">
              no solo palabras clave.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Diseño controles alrededor de riesgos concretos: quién puede hacer
            qué, cómo se valida una integración y qué superficie queda expuesta
            al navegador.
          </p>
        </motion.div>

        <motion.div
          initial={allowMotion ? { opacity: 0, y: 18 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: allowMotion ? 0.08 : 0 }}
          className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-[#b49bff]/30 bg-[#0b0322]/75 p-5 shadow-[0_0_0_1px_rgba(112,66,248,0.08),0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#7042f8]/20 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center">
            <div className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#050119]/70 px-5 py-8 text-center sm:min-h-80">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(112,66,248,0.32),transparent_54%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-7 rounded-full border border-[#b49bff]/15"
              />
              <div
                aria-hidden="true"
                className="absolute inset-14 rounded-full border border-cyan-300/15"
              />

              <motion.div
                aria-hidden="true"
                animate={allowMotion ? { y: [0, -7, 0] } : undefined}
                transition={
                  allowMotion
                    ? { duration: 3.2, ease: "easeInOut", repeat: Infinity }
                    : undefined
                }
                className="relative z-10 flex flex-col items-center"
              >
                <Image
                  src="/lock-top.png"
                  alt=""
                  width={62}
                  height={53}
                  className="relative z-0 translate-y-6 drop-shadow-[0_0_18px_rgba(180,155,255,0.85)]"
                />
                <Image
                  src="/lock-main.png"
                  alt=""
                  width={110}
                  height={110}
                  className="relative z-10 drop-shadow-[0_0_30px_rgba(112,66,248,0.75)]"
                />
              </motion.div>

              <div className="relative z-10 mt-5 flex items-center gap-2 rounded-full border border-[#b49bff]/45 bg-[#7042f8]/15 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.16em] text-[#e7e0ff] uppercase shadow-[inset_0_0_18px_rgba(180,155,255,0.12)]">
                <ShieldCheck aria-hidden="true" size={15} className="text-cyan-200" />
                Controles aplicados
              </div>
              <p className="relative z-10 mt-3 max-w-xs text-sm leading-6 text-slate-300">
                Seguridad desde el diseño, con evidencia en proyectos
                identificables.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#b49bff]/40 bg-[#7042f8]/15 text-[#d8c9ff]"
                >
                  <BadgeCheck size={21} />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-cyan-200 uppercase">
                    Método de trabajo
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    Riesgo, control y evidencia.
                  </h3>
                </div>
              </div>

              <ol className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Método de seguridad aplicada">
                {[
                  ["01", "Riesgo", "Qué podría salir mal."],
                  ["02", "Control", "Qué se implementó."],
                  ["03", "Evidencia", "Dónde se comprueba."],
                ].map(([step, label, description], index) => (
                  <li
                    key={label}
                    className="relative rounded-xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    {index < 2 && (
                      <ArrowRight
                        aria-hidden="true"
                        size={16}
                        className="absolute -right-[14px] top-1/2 z-10 hidden -translate-y-1/2 text-[#b49bff] sm:block"
                      />
                    )}
                    <p className="font-mono text-[10px] tracking-widest text-[#b49bff]">
                      {step}
                    </p>
                    <p className="mt-2 font-semibold text-white">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-5 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-3 text-sm leading-6 text-slate-200">
                Son controles implementados o configurados; no sustituyen una
                auditoría ni un pentest independiente.
              </p>
            </div>
          </div>
        </motion.div>

        <ul
          className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-6"
          aria-label="Casos de seguridad aplicada"
        >
          {SECURITY_CASES.map((securityCase, index) => {
            const { Icon } = securityCase;
            const titleId = `security-case-${securityCase.id}`;

            return (
              <motion.li
                key={securityCase.id}
                initial={allowMotion ? { opacity: 0, y: 24 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.48,
                  delay: allowMotion ? index * 0.07 : 0,
                }}
                className="h-full"
              >
                <article
                  aria-labelledby={titleId}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0b0322]/80 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#b49bff]/55 hover:bg-[#130636]/90 focus-within:border-[#b49bff]/55 sm:p-6"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition-opacity duration-300 ${securityCase.accent.glow} opacity-45 group-hover:opacity-100`}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px ${securityCase.accent.signal}`}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <span
                        aria-hidden="true"
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${securityCase.accent.icon}`}
                      >
                        <Icon size={22} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] tracking-[0.15em] text-slate-300 uppercase">
                          Caso {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3
                          id={titleId}
                          className="mt-1 text-xl font-semibold leading-6 text-white"
                        >
                          {securityCase.title}
                        </h3>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xl font-semibold text-white/15"
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <p className="relative mt-4 text-sm leading-6 text-slate-200">
                    {securityCase.summary}
                  </p>

                  <dl className="relative mt-5 space-y-3">
                    <div className="rounded-xl border border-rose-200/10 bg-rose-300/[0.045] p-3.5">
                      <dt className="font-mono text-[10px] font-semibold tracking-[0.14em] text-rose-200 uppercase">
                        Riesgo
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-slate-200">
                        {securityCase.risk}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-[#b49bff]/15 bg-[#7042f8]/[0.07] p-3.5">
                      <dt className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#d8c9ff] uppercase">
                        Control aplicado
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-white">
                        {securityCase.control}
                      </dd>
                    </div>
                    <div className="flex gap-2.5 rounded-xl border border-emerald-200/10 bg-emerald-300/[0.045] p-3.5">
                      <CheckCircle2
                        aria-hidden="true"
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-200"
                      />
                      <div>
                        <dt className="font-mono text-[10px] font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                          Evidencia
                        </dt>
                        <dd className="mt-1.5 text-sm leading-6 text-slate-200">
                          {securityCase.evidence}
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <ul
                    className="relative mt-5 flex flex-wrap gap-2"
                    aria-label={`Tecnologías y prácticas de ${securityCase.title}`}
                  >
                    {securityCase.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium ${securityCase.accent.badge}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
