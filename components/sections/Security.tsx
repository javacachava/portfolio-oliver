"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
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
    line: string;
    icon: string;
    tag: string;
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
      line: "bg-cyan-400",
      icon: "border-cyan-400/35 bg-cyan-400/10 text-cyan-300",
      tag: "border-cyan-400/25 bg-cyan-400/10 text-cyan-100",
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
      line: "bg-emerald-400",
      icon: "border-emerald-400/35 bg-emerald-400/10 text-emerald-300",
      tag: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
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
      line: "bg-violet-400",
      icon: "border-violet-400/35 bg-violet-400/10 text-violet-300",
      tag: "border-violet-400/25 bg-violet-400/10 text-violet-100",
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
      line: "bg-fuchsia-400",
      icon: "border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-300",
      tag: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-100",
    },
  },
];

export default function Security() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="seguridad"
      aria-labelledby="seguridad-title"
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-3xl sm:mb-12"
        >
          <SectionEyebrow className="mb-3">
            AppSec · controles verificables
          </SectionEyebrow>
          <h2
            id="seguridad-title"
            className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl"
          >
            Seguridad aplicada, no solo palabras clave.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
            Diseño controles alrededor de riesgos concretos: quién puede hacer
            qué, cómo se valida una integración y qué superficie queda expuesta
            al navegador.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.08 }}
          className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#7042f8]/30 bg-[#7042f8]/[0.06] p-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7042f8]/40 bg-[#7042f8]/10 text-[#b49bff]"
            >
              <BadgeCheck size={20} />
            </span>
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-wider text-[#b49bff] uppercase">
                Método de trabajo
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--foreground)] sm:text-base">
                Riesgo
                <ArrowRight
                  aria-hidden="true"
                  className="mx-1 inline h-4 w-4 text-[#b49bff]"
                />
                control
                <ArrowRight
                  aria-hidden="true"
                  className="mx-1 inline h-4 w-4 text-[#b49bff]"
                />
                evidencia
              </p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
            Son controles implementados o configurados en proyectos
            identificables; no sustituyen una auditoría o un pentest
            independiente.
          </p>
        </motion.div>

        <ul
          className="grid gap-4 md:grid-cols-2 lg:gap-6"
          aria-label="Casos de seguridad aplicada"
        >
          {SECURITY_CASES.map((securityCase, index) => {
            const { Icon } = securityCase;
            const titleId = `security-case-${securityCase.id}`;

            return (
              <motion.li
                key={securityCase.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                }}
                className="h-full"
              >
                <article
                  aria-labelledby={titleId}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_18px_45px_rgba(3,0,20,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#7042f8]/60 hover:bg-[var(--card-elevated)] focus-within:border-[#7042f8]/60 sm:p-6"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px ${securityCase.accent.line}`}
                  />

                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${securityCase.accent.icon}`}
                    >
                      <Icon size={21} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] tracking-wider text-[var(--muted)] uppercase">
                        Caso {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3
                        id={titleId}
                        className="mt-1 text-xl font-semibold leading-6 text-[var(--foreground)]"
                      >
                        {securityCase.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {securityCase.summary}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-4 border-t border-[var(--border)] pt-5">
                    <div>
                      <dt className="font-mono text-[10px] font-semibold tracking-wider text-[#f0a1bb] uppercase">
                        Riesgo
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                        {securityCase.risk}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] font-semibold tracking-wider text-[#b49bff] uppercase">
                        Control aplicado
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-[var(--foreground)]">
                        {securityCase.control}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] font-semibold tracking-wider text-[#6ee7b7] uppercase">
                        Evidencia
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                        {securityCase.evidence}
                      </dd>
                    </div>
                  </dl>

                  <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label={`Tecnologías y prácticas de ${securityCase.title}`}
                  >
                    {securityCase.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full border px-2.5 py-1 font-mono text-[10px] ${securityCase.accent.tag}`}
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
