import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Trayectoria, intereses, enfoque de trabajo y objetivos de Oliver Ascencio, estudiante de Ingeniería en Desarrollo de Software y cofundador de WUJU en Santa Ana, El Salvador.",
  alternates: { canonical: "/sobre-mi" },
};

const timeline = [
  {
    year: "2023 y antes",
    items: [
      "Bachillerato técnico en Infraestructura Tecnológica y Servicios Informáticos, Centro Escolar INSA. Diploma de honor: primer lugar de la especialidad.",
      "Diploma de Mérito Estudiantil en TECH FEST 2023 por un proyecto de invernadero automatizado.",
    ],
  },
  {
    year: "2024",
    items: [
      "Bootcamp de Programación del MINED (mayo).",
      "Cofundación de TuGuíaSV (junio), presentado en Feria Eureka 2024.",
      "Bootcamp de Inteligencia Artificial del MINED (noviembre).",
      "Tercer lugar en el Campeonato Nacional de Robótica TechLive.",
      "Inicio del TSU en Ciberseguridad en ESIT / MINED.",
    ],
  },
  {
    year: "2025",
    items: [
      "Inicio de Ingeniería en Desarrollo de Software en UNICAES.",
      "Bootcamp de Java Developer de Kodigo (marzo) y cursos de ciberseguridad, AWS e ITIL con ESIT / AECID.",
      "Cofundación de WUJU, donde soy líder técnico.",
      "Inicio del servicio social: sistema POS para Pizza Brava (noviembre).",
    ],
  },
  {
    year: "2026",
    items: [
      "Cierre del servicio social (marzo). Requisitos académicos del TSU completos; graduación pendiente.",
      "Bootcamp Full Stack Junior de Kodigo, en curso.",
      "Trabajo en CuencaOS / Akhet y Terrivo / Atria.",
      "Finalista de StartupSTEM 2026 con CuencaOS y póster en InspiraSTEM 2026.",
    ],
  },
];

const approach = [
  {
    title: "Entender el problema con quien lo vive",
    body: "En el POS levanté los requisitos directamente con el dueño del negocio y capacité al personal. El software se prueba con las personas que lo usan.",
  },
  {
    title: "Seguridad desde el diseño",
    body: "Aplico el principio de mínimo privilegio al definir quién puede hacer qué, y lo hago cumplir en el servidor, no solo en la interfaz.",
  },
  {
    title: "Decisiones documentadas",
    body: "Registro las decisiones técnicas y doy seguimiento a los entregables, con prácticas ágiles, para que el equipo pueda revisarlas.",
  },
  {
    title: "Una persona revisa lo que produce un modelo",
    body: "En proyectos de datos, las salidas relacionadas con riesgo y las recomendaciones pasan por revisión humana antes de usarse.",
  },
  {
    title: "Herramientas de IA como apoyo",
    body: "Uso GPT, Claude, Gemini y Cursor para prototipar, analizar y apoyar el desarrollo.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        id="sobre-titulo"
        title="Sobre mí"
        lead={
          <div className="space-y-4">
            <p>
              Soy estudiante de Ingeniería en Desarrollo de Software en UNICAES y tengo completados
              los requisitos académicos del TSU en Ciberseguridad; mi graduación está pendiente.
              Vivo en {profile.location}.
            </p>
            <p>
              Soy cofundador de WUJU, donde coordino un equipo técnico en proyectos de software,
              datos e investigación aplicada. Trabajo con bases de datos, desarrollo web y análisis
              en Python, y llevo la seguridad como criterio de diseño.
            </p>
          </div>
        }
      />

      <Section id="trayectoria" title="Trayectoria" flush>
        <ol className="relative pl-8 sm:pl-12">
          <span
            aria-hidden="true"
            className="timeline-line absolute left-[7px] top-2 bottom-2 w-[2px] bg-cobre sm:left-[11px]"
          />
          {timeline.map((period) => (
            <li key={period.year} className="reveal relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-[0.45rem] size-4 rounded-full border-2 border-cobre bg-espresso sm:-left-12 sm:size-[1.4rem]"
              />
              <h3 className="t-h3">{period.year}</h3>
              <ul className="measure mt-4 space-y-3">
                {period.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-cobre" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="enfoque" title="Enfoque de trabajo" band="mocha">
        <ul>
          {approach.map((item) => (
            <li key={item.title} className="reveal border-t border-line py-6 first:border-t-0 first:pt-0">
              <h3 className="font-sans text-[1.1rem] font-semibold text-crema">{item.title}</h3>
              <p className="measure mt-1.5">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="intereses" title="Intereses y objetivos">
        <div className="measure space-y-4">
          <p>
            Me interesan la estrategia de ciberseguridad, el cumplimiento y la gestión de riesgo, el
            desarrollo seguro de software, la IA aplicada y, a largo plazo, la arquitectura de
            seguridad.
          </p>
          <p>
            Busco oportunidades laborales, pasantías, becas y colaboraciones donde pueda aportar en
            desarrollo de software, ciberseguridad o datos e IA aplicada, y seguir aprendiendo con
            un equipo.
          </p>
          <p className="flex flex-wrap gap-3 pt-2">
            <Link href="/proyectos" className="btn btn-primary">
              Ver proyectos
            </Link>
            <Link href="/#contacto" className="btn btn-ghost">
              Contactar
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
