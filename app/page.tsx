import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";
import ProjectRow, { toSummary } from "@/components/ui/ProjectRow";
import Section from "@/components/ui/Section";
import { formalEducation, inProgress } from "@/data/education";
import { experience } from "@/data/experience";
import { heroFacts, profile } from "@/data/profile";
import { featuredProjects, projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const areas = [
  {
    title: "Desarrollo de software",
    body: "Sistema POS para Pizza Brava, bot de pedidos por WhatsApp y gestión de invitaciones.",
    href: "/proyectos",
  },
  {
    title: "Ciberseguridad",
    body: "TSU en Ciberseguridad. Control de acceso por roles y mínimo privilegio aplicados en el POS.",
    href: "/formacion",
  },
  {
    title: "IA y datos",
    body: "Componentes de análisis en Python para CuencaOS / Akhet y Terrivo / Atria.",
    href: "/proyectos/cuencaos",
  },
  {
    title: "Coordinación técnica",
    body: "Líder técnico de un equipo de seis personas en WUJU.",
    href: "/#experiencia",
  },
] as const;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  url: profile.siteUrl,
  email: profile.email,
  description: profile.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Ana",
    addressCountry: "SV",
  },
  worksFor: { "@type": "Organization", name: "WUJU", url: "https://wuju.dev" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidad Católica de El Salvador (UNICAES)" },
    { "@type": "EducationalOrganization", name: "ESIT / MINED" },
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Español" },
    { "@type": "Language", name: "Inglés" },
  ],
  knowsAbout: [
    "Desarrollo de software",
    "Ciberseguridad",
    "Control de acceso basado en roles",
    "Bases de datos",
    "Inteligencia artificial aplicada",
    "Análisis de datos",
    "Coordinación de proyectos tecnológicos",
  ],
  sameAs: [profile.github.href, profile.linkedin.href],
};

export default function HomePage() {
  const featured = featuredProjects.map(toSummary);

  return (
    <>
      <JsonLd data={personJsonLd} />

      {/* Presentación */}
      <section
        aria-labelledby="inicio-titulo"
        className="wrap grid gap-12 pb-16 pt-14 sm:pb-20 sm:pt-24 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <p className="eyebrow rise">Portafolio · {profile.location}</p>
          <h1 id="inicio-titulo" className="display rise rise-2 mt-5">
            {profile.shortName}
          </h1>
          <p className="rise rise-2 mt-4 font-serif text-[1.45rem] italic leading-snug text-muted sm:text-[1.85rem]">
            {profile.role}
          </p>
          <p className="measure rise rise-3 mt-8 text-[1.125rem]">{profile.tagline}</p>
          <div className="rise rise-4 mt-9 flex flex-wrap gap-3">
            <Link href="/proyectos" className="btn btn-primary">
              Ver proyectos
              <ArrowRight size={16} />
            </Link>
            <a
              href={profile.cv}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver CV<span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
            </a>
            <Link href="/#contacto" className="btn btn-secondary">
              Contactar
            </Link>
          </div>
        </div>

        <aside aria-label="Datos de perfil" className="rise rise-4 lg:col-span-4">
          <dl className="border-t border-ink">
            {heroFacts.map((fact) => (
              <div key={fact.label} className="border-b border-rule py-3">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-0.5 text-[0.98rem] text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Áreas de trabajo */}
      <section aria-labelledby="areas-titulo" className="border-t border-rule">
        <div className="wrap py-12">
          <h2 id="areas-titulo" className="eyebrow">
            En qué trabajo
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <li key={area.title}>
                <h3 className="h3">
                  <Link href={area.href} className="text-ink no-underline hover:text-accent">
                    {area.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.98rem]">{area.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proyectos destacados */}
      <Section
        id="proyectos"
        index="01"
        eyebrow="Proyectos"
        title="Proyectos destacados"
        intro={
          <>
            Cuatro casos con su contexto, mi parte y su estado real.{" "}
            <Link href="/proyectos" className="link">
              Ver los {projects.length} proyectos
            </Link>
            .
          </>
        }
      >
        <ol>
          {featured.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              number={String(i + 1).padStart(2, "0")}
            />
          ))}
        </ol>
      </Section>

      {/* Experiencia */}
      <Section id="experiencia" index="02" eyebrow="Experiencia" title="Experiencia">
        <ol>
          {experience.map((entry) => (
            <li
              key={`${entry.organization}-${entry.period}`}
              className="grid gap-x-8 gap-y-3 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr]"
            >
              <div>
                <p className="meta text-ink">{entry.period}</p>
                <p className="meta mt-1">{entry.organization}</p>
              </div>
              <div>
                <h3 className="h3">{entry.role}</h3>
                <p className="meta mt-1">{entry.context}</p>
                <ul className="mt-4 space-y-2.5">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span aria-hidden="true" className="select-none text-accent">
                        –
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.95rem]">
                  <span className="meta">Casos relacionados: </span>
                  {entry.projects.map((slug, i) => {
                    const project = projects.find((p) => p.slug === slug);
                    if (!project) return null;
                    return (
                      <span key={slug}>
                        {i > 0 && ", "}
                        <Link href={`/proyectos/${slug}`} className="link">
                          {project.title}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Competencias */}
      <Section
        id="competencias"
        index="03"
        eyebrow="Competencias"
        title="Competencias"
        intro="Separadas entre lo que he usado en proyectos, con el proyecto donde ocurrió, y lo que conozco por formación académica."
      >
        <div>
          {skillGroups.map((group) => (
            <div key={group.id} className="border-t border-rule py-8 first:border-t-0 first:pt-0">
              <h3 className="h3">{group.title}</h3>
              <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <h4 className="eyebrow">En proyectos</h4>
                  <ul className="mt-3 space-y-2.5">
                    {group.practice.map((item) => (
                      <li key={item.name} className="text-[0.98rem] leading-snug">
                        <span className="text-ink">{item.name}</span>
                        <span className="meta block">{item.where}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="eyebrow">Formación académica</h4>
                  <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug">
                    {group.academic.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Formación (resumen) */}
      <Section
        id="formacion"
        index="04"
        eyebrow="Formación"
        title="Formación"
        intro={
          <Link href="/formacion" className="link">
            Ver cursos, bootcamps y reconocimientos
          </Link>
        }
      >
        <ul>
          {formalEducation.map((item) => (
            <li
              key={item.title}
              className="grid gap-x-8 gap-y-1 border-t border-rule py-6 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr]"
            >
              <p className="meta">{item.period}</p>
              <div>
                <h3 className="h3">{item.title}</h3>
                <p className="meta mt-1">{item.institution}</p>
                <p className="mt-2">{item.status}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-rule pt-6">
          <h3 className="eyebrow">En curso</h3>
          <ul className="mt-3 space-y-2">
            {inProgress.map((course) => (
              <li key={course.title}>
                <span className="text-ink">{course.title}</span>
                <span className="meta">
                  {" "}
                  · {course.provider} · {course.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
