import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import {
  completedCourses,
  courseAreaLabels,
  formalEducation,
  inProgress,
  participations,
  recognitions,
  type Course,
  type CourseArea,
} from "@/data/education";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Formación",
  description:
    "Formación de Oliver Ascencio: Ingeniería en Desarrollo de Software (UNICAES), TSU en Ciberseguridad (ESIT / MINED), bootcamps, cursos, reconocimientos y participaciones.",
  alternates: { canonical: "/formacion" },
};

const areaOrder: CourseArea[] = ["software", "ciberseguridad", "ia-cloud", "gestion", "otros"];

function CourseItem({ course }: { course: Course }) {
  const details = [course.provider, course.date, course.hours ? `${course.hours} h` : null]
    .filter(Boolean)
    .join(" · ");
  return (
    <li className="py-3">
      <p className="text-ink">{course.title}</p>
      <p className="meta">{details}</p>
      {course.note && <p className="mt-1 text-[0.95rem]">{course.note}</p>}
    </li>
  );
}

export default function EducationPage() {
  return (
    <>
      <section aria-labelledby="formacion-titulo" className="wrap pb-12 pt-14 sm:pt-20">
        <p className="eyebrow">Formación</p>
        <h1 id="formacion-titulo" className="display mt-4 max-w-[14ch]">
          Formación
        </h1>
        <p className="measure mt-6 text-[1.125rem]">
          Educación formal, formación en curso, cursos y bootcamps, y reconocimientos, en bloques
          separados. Los cursos no son certificaciones profesionales y se presentan con su estado
          real. Idiomas: {profile.languages}.
        </p>
      </section>

      <Section id="formal" index="01" eyebrow="Formación" title="Educación formal">
        <ol>
          {formalEducation.map((item) => (
            <li
              key={item.title}
              className="grid gap-x-8 gap-y-1 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr]"
            >
              <p className="meta">{item.period}</p>
              <div>
                <h3 className="h3">{item.title}</h3>
                <p className="meta mt-1">{item.institution}</p>
                <p className="mt-3 text-ink">{item.status}</p>
                {item.details.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span aria-hidden="true" className="select-none text-accent">
                          –
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="en-curso" index="02" eyebrow="Formación" title="En curso o por iniciar">
        <ul className="divide-y divide-rule border-y border-rule">
          {inProgress.map((course) => (
            <CourseItem key={course.title} course={course} />
          ))}
        </ul>
      </Section>

      <Section
        id="cursos"
        index="03"
        eyebrow="Formación"
        title="Cursos y bootcamps completados"
        intro="Agrupados por área. Dentro de cada área, del más reciente al más antiguo."
      >
        <div className="space-y-10">
          {areaOrder.map((area) => {
            const items = completedCourses.filter((course) => course.area === area);
            if (items.length === 0) return null;
            return (
              <div key={area}>
                <h3 className="eyebrow">{courseAreaLabels[area]}</h3>
                <ul className="mt-2 divide-y divide-rule border-y border-rule">
                  {items.map((course) => (
                    <CourseItem key={course.title} course={course} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="reconocimientos" index="04" eyebrow="Trayectoria" title="Reconocimientos">
        <ul className="divide-y divide-rule border-y border-rule">
          {recognitions.map((item) => (
            <li key={item.title} className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[7rem_1fr]">
              <p className="meta">{item.year}</p>
              <div>
                <p className="text-ink">{item.title}</p>
                {(item.organizer || item.project) && (
                  <p className="meta">
                    {[item.organizer, item.project ? `Proyecto: ${item.project}` : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                {item.detail && <p className="mt-1 text-[0.95rem]">{item.detail}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="participaciones"
        index="05"
        eyebrow="Trayectoria"
        title="Ferias, congresos y hackatones"
        intro="Participaciones documentadas. No son premios."
      >
        <ul className="divide-y divide-rule border-y border-rule">
          {participations.map((item) => (
            <li key={item.title} className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[7rem_1fr]">
              <p className="meta" aria-hidden={!item.year}>
                {item.year ?? "—"}
              </p>
              <div>
                <p className="text-ink">{item.title}</p>
                {(item.organizer || item.project) && (
                  <p className="meta">
                    {[item.organizer, item.project ? `Proyecto: ${item.project}` : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                <p className="mt-1 text-[0.95rem]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
