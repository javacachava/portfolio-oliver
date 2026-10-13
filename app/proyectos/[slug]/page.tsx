import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Diagram from "@/components/ui/Diagram";
import JsonLd from "@/components/ui/JsonLd";
import { ArrowUpRight } from "@/components/ui/Icons";
import StatusBadge from "@/components/ui/StatusBadge";
import { diagrams } from "@/data/diagrams";
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

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="measure space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-violet" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="reveal">
      <h2 id={`${id}-t`} className="t-h3 !text-[clamp(1.6rem,3vw,2.1rem)]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
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

  const diagram = diagrams[project.slug];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { id: "problema", label: "Problema" },
    { id: "contexto", label: "Contexto y usuarios" },
    { id: "solucion", label: "Solución" },
    { id: "mi-papel", label: "Mi papel" },
    { id: "stack", label: "Tecnologías" },
    ...(project.decisions.length > 0 ? [{ id: "decisiones", label: "Decisiones técnicas" }] : []),
    { id: "estado", label: "Estado actual" },
    { id: "evidencias", label: "Resultados y evidencias" },
    { id: "material", label: "Material y enlaces" },
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
        <header className="relative overflow-hidden">
          <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(112,66,248,0.26),transparent)]"
          />
          <div className="wrap relative grid gap-x-10 gap-y-10 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <nav aria-label="Ruta de navegación" className="t-small">
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
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Categorías">
                {project.kinds.map((kind) => (
                  <li key={kind} className="chip">
                    {projectKindLabels[kind]}
                  </li>
                ))}
              </ul>
              <h1 className="t-display gradient-text mt-5 !text-[clamp(2.6rem,7.5vw,5.4rem)] pb-2">{project.title}</h1>
              <p className="t-lead measure mt-6">{project.summary}</p>
            </div>

            <aside aria-label="Ficha del proyecto" className="lg:col-span-4 lg:self-end">
              <div className="plate p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="t-small">Organización</dt>
                  <dd className="mt-0.5 text-ink">{project.organization}</dd>
                </div>
                {project.period && (
                  <div>
                    <dt className="t-small">Período</dt>
                    <dd className="mt-0.5 text-ink">{project.period}</dd>
                  </div>
                )}
                <div>
                  <dt className="t-small">Estado</dt>
                  <dd className="mt-1">
                    <StatusBadge status={project.status} />
                  </dd>
                </div>
                <div>
                  <dt className="t-small">Mi rol</dt>
                  <dd className="mt-0.5 text-ink">{project.role.title}</dd>
                </div>
              </dl>
              {project.teamNote && <p className="t-small mt-4 border-t border-line pt-3">{project.teamNote}</p>}
              </div>
            </aside>
          </div>
        </header>

        {diagram && (
          <section aria-labelledby="arquitectura-t" className="wrap pb-16 sm:pb-20">
            <h2 id="arquitectura-t" className="t-h3 !text-[clamp(1.6rem,3vw,2.1rem)]">
              Cómo está armado
            </h2>
            <div className="plate reveal mt-6 p-6 sm:p-10">
              <Diagram id={`caso-${project.slug}`} diagram={diagram} />
            </div>
          </section>
        )}

        <div className="border-t border-line">
        <div className="wrap grid gap-x-10 gap-y-12 pb-10 pt-16 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="Secciones del caso" className="lg:sticky lg:top-28">
              <p className="t-small font-medium text-soft">En esta página</p>
              <ul className="mt-3 space-y-1 border-l border-line">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1 pl-4 text-[0.95rem] text-fg-muted no-underline transition-colors hover:border-violet hover:text-ink"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-16 lg:col-span-8 lg:col-start-5">
            <CaseSection id="problema" title="Problema que aborda">
              <Paragraphs items={project.problem} />
            </CaseSection>

            <CaseSection id="contexto" title="Contexto y usuarios">
              <Paragraphs items={project.context} />
            </CaseSection>

            <CaseSection id="solucion" title="Solución">
              <Paragraphs items={project.solution} />
            </CaseSection>

            <CaseSection id="mi-papel" title="Mi papel y contribuciones">
              <p className="font-medium text-soft">{project.role.title}</p>
              <div className="mt-4">
                <Bullets items={project.role.contributions} />
              </div>
              {project.role.notMine && (
                <p className="t-small measure mt-6 border-l-2 border-line pl-4">{project.role.notMine}</p>
              )}
            </CaseSection>

            <CaseSection id="stack" title="Tecnologías">
              <ul className="border-t border-line">
                {project.stack.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-x-6 gap-y-1 border-b border-line py-3.5 sm:grid-cols-[13rem_1fr_7rem]"
                  >
                    <span className="flex items-center gap-2.5 text-ink">
                      <span
                        aria-hidden="true"
                        className={`size-2 shrink-0 ${
                          item.scope === "mine" ? "bg-violet" : "border border-soft/70"
                        }`}
                      />
                      {item.name}
                    </span>
                    <span>{item.use}</span>
                    <span className="t-small sm:text-right">
                      {item.scope === "mine" ? "Mi parte" : "Del proyecto"}
                    </span>
                  </li>
                ))}
              </ul>
            </CaseSection>

            {project.decisions.length > 0 && (
              <CaseSection id="decisiones" title="Decisiones técnicas">
                <ul className="space-y-7">
                  {project.decisions.map((decision) => (
                    <li key={decision.title} className="border-l-2 border-violet pl-5">
                      <h3 className="font-sans text-[1.05rem] font-semibold text-ink">{decision.title}</h3>
                      <p className="measure mt-1.5">{decision.body}</p>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            )}

            <CaseSection id="estado" title="Estado actual">
              <Paragraphs items={project.currentState} />
            </CaseSection>

            <CaseSection id="evidencias" title="Resultados y evidencias">
              <Bullets items={project.evidence} />
              {project.images && project.images.length > 0 && (
                <div className="mt-8 grid gap-6">
                  {project.images.map((image) => (
                    <figure key={image.src}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 46rem, 100vw"
                        className="h-auto w-full border border-line"
                      />
                      {image.caption && <figcaption className="t-small mt-2">{image.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </CaseSection>

            <CaseSection id="material" title="Material y enlaces">
              {project.links.length > 0 && (
                <ul className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="btn btn-ghost"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label}
                        <ArrowUpRight size={16} />
                        {link.external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                      </a>
                      {link.note && <p className="t-small mt-1.5">{link.note}</p>}
                    </li>
                  ))}
                </ul>
              )}
              {project.noPublicResources && (
                <p className="measure mt-4 text-fg-muted">{project.noPublicResources}</p>
              )}
            </CaseSection>
          </div>
        </div>
        </div>

        <nav aria-label="Otro proyecto" className="wrap mt-10 border-t border-line pt-10">
          <p className="t-small">Siguiente proyecto</p>
          <Link
            href={`/proyectos/${next.slug}`}
            className="t-h2 mt-2 inline-block !text-[clamp(1.8rem,4.5vw,3rem)] no-underline transition-colors hover:text-soft"
          >
            {next.title}
          </Link>
        </nav>
      </article>
    </>
  );
}
