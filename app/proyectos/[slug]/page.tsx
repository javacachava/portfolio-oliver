import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/ui/JsonLd";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import StatusBadge from "@/components/ui/StatusBadge";
import { profile } from "@/data/profile";
import { getProject, projectKindLabels, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${profile.shortName}`,
      description: project.summary,
      url: `/proyectos/${project.slug}`,
      type: "article",
    },
  };
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="measure space-y-4">
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { id: "problema", label: "Problema" },
    { id: "contexto", label: "Contexto y usuarios" },
    { id: "solucion", label: "Solución" },
    { id: "mi-papel", label: "Mi papel" },
    { id: "stack", label: "Stack tecnológico" },
    ...(project.decisions.length > 0 ? [{ id: "decisiones", label: "Decisiones técnicas" }] : []),
    { id: "estado", label: "Estado actual" },
    { id: "evidencias", label: "Resultados y evidencias" },
    { id: "recursos", label: "Recursos" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: profile.siteUrl },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `${profile.siteUrl}/proyectos` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${profile.siteUrl}/proyectos/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        <header className="wrap pb-12 pt-10 sm:pt-14">
          <nav aria-label="Ruta de navegación" className="meta">
            <ol className="flex flex-wrap gap-x-2">
              <li>
                <Link href="/proyectos" className="link">
                  Proyectos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <p className="eyebrow mt-8">
            {project.kinds.map((kind) => projectKindLabels[kind]).join(" · ")}
          </p>
          <h1 className="display mt-4 max-w-[16ch]">{project.title}</h1>
          <p className="measure mt-6 font-serif text-[1.35rem] leading-snug text-body sm:text-[1.6rem]">
            {project.summary}
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-ink pt-5 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
            <div>
              <dt className="eyebrow">Organización</dt>
              <dd className="mt-1 text-ink">{project.organization}</dd>
            </div>
            {project.period && (
              <div>
                <dt className="eyebrow">Período</dt>
                <dd className="mt-1 text-ink">{project.period}</dd>
              </div>
            )}
            <div>
              <dt className="eyebrow">Estado</dt>
              <dd className="mt-1">
                <StatusBadge status={project.status} />
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Mi rol</dt>
              <dd className="mt-1 text-ink">{project.role.title}</dd>
            </div>
          </dl>
          {project.teamNote && <p className="meta mt-4">{project.teamNote}</p>}
        </header>

        <div className="wrap grid gap-x-8 gap-y-10 border-t border-rule pb-8 pt-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="Secciones del caso" className="lg:sticky lg:top-24">
              <p className="eyebrow">En esta página</p>
              <ol className="mt-3 space-y-1.5 text-[0.95rem]">
                {sections.map((section, i) => (
                  <li key={section.id} className="flex gap-3">
                    <span className="meta pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <a href={`#${section.id}`} className="text-body no-underline hover:text-accent hover:underline">
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-14 lg:col-span-8 lg:col-start-5">
            <section id="problema" aria-labelledby="problema-t">
              <h2 id="problema-t" className="h3">
                Problema que aborda
              </h2>
              <div className="mt-4">
                <Paragraphs items={project.problem} />
              </div>
            </section>

            <section id="contexto" aria-labelledby="contexto-t">
              <h2 id="contexto-t" className="h3">
                Contexto y usuarios
              </h2>
              <div className="mt-4">
                <Paragraphs items={project.context} />
              </div>
            </section>

            <section id="solucion" aria-labelledby="solucion-t">
              <h2 id="solucion-t" className="h3">
                Solución
              </h2>
              <div className="mt-4">
                <Paragraphs items={project.solution} />
              </div>
            </section>

            <section id="mi-papel" aria-labelledby="papel-t">
              <h2 id="papel-t" className="h3">
                Mi papel y contribuciones
              </h2>
              <p className="mt-4 text-ink">{project.role.title}</p>
              <ul className="measure mt-4 space-y-2.5">
                {project.role.contributions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="select-none text-accent">
                      –
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {project.role.notMine && (
                <p className="measure mt-5 border-l-2 border-rule pl-4 text-[0.98rem] text-muted">
                  {project.role.notMine}
                </p>
              )}
            </section>

            <section id="stack" aria-labelledby="stack-t">
              <h2 id="stack-t" className="h3">
                Stack tecnológico
              </h2>
              <ul className="mt-4 border-t border-rule">
                {project.stack.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-x-6 gap-y-1 border-b border-rule py-3 sm:grid-cols-[14rem_1fr_auto]"
                  >
                    <span className="text-ink">{item.name}</span>
                    <span>{item.use}</span>
                    <span className="meta">{item.scope === "mine" ? "Mi parte" : "Del proyecto"}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.decisions.length > 0 && (
              <section id="decisiones" aria-labelledby="decisiones-t">
                <h2 id="decisiones-t" className="h3">
                  Decisiones técnicas
                </h2>
                <ul className="mt-4 space-y-6">
                  {project.decisions.map((decision) => (
                    <li key={decision.title}>
                      <h3 className="font-sans text-[1.05rem] font-medium text-ink">{decision.title}</h3>
                      <p className="measure mt-1">{decision.body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="estado" aria-labelledby="estado-t">
              <h2 id="estado-t" className="h3">
                Estado actual
              </h2>
              <div className="mt-4">
                <Paragraphs items={project.currentState} />
              </div>
            </section>

            <section id="evidencias" aria-labelledby="evidencias-t">
              <h2 id="evidencias-t" className="h3">
                Resultados y evidencias
              </h2>
              <ul className="measure mt-4 space-y-2.5">
                {project.evidence.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="select-none text-accent">
                      –
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {project.images && project.images.length > 0 && (
                <div className="mt-6 grid gap-6">
                  {project.images.map((image) => (
                    <figure key={image.src}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 46rem, 100vw"
                        className="h-auto w-full border border-rule"
                      />
                      {image.caption && <figcaption className="meta mt-2">{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </section>

            <section id="recursos" aria-labelledby="recursos-t">
              <h2 id="recursos-t" className="h3">
                Recursos
              </h2>
              {project.links.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="link inline-flex items-center gap-1.5"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label}
                        <ArrowUpRight size={15} />
                        {link.external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                      </a>
                      {link.note && <span className="meta"> · {link.note}</span>}
                    </li>
                  ))}
                </ul>
              )}
              {project.noPublicResources && (
                <p className="measure mt-4 text-muted">{project.noPublicResources}</p>
              )}
            </section>
          </div>
        </div>

        <nav aria-label="Otro proyecto" className="wrap mt-8 border-t border-rule pt-8">
          <p className="eyebrow">Siguiente proyecto</p>
          <Link
            href={`/proyectos/${next.slug}`}
            className="group mt-2 inline-flex items-center gap-3 font-serif text-[1.6rem] text-ink no-underline hover:text-accent"
          >
            {next.title}
            <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </article>
    </>
  );
}
