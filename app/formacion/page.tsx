import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
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
  title: "Formación y reconocimientos",
  description:
    "Formación de Oliver Ascencio: Ingeniería en Desarrollo de Software (UNICAES), TSU en Ciberseguridad (ESIT / MINED), bootcamps, cursos, reconocimientos y participaciones.",
  alternates: { canonical: "/formacion" },
};

const areaOrder: CourseArea[] = ["software", "ciberseguridad", "ia-cloud", "gestion", "otros"];

function CourseItem({ course, dashed = false }: { course: Course; dashed?: boolean }) {
  const details = [course.provider, course.date, course.hours ? `${course.hours} horas` : null]
    .filter(Boolean)
    .join(". ");
  return (
    <li
      className={`reveal border-l-2 py-1 pl-5 ${dashed ? "border-dashed border-soft/60" : "border-violet"}`}
    >
      <p className="text-ink">{course.title}</p>
      <p className="t-small">{details}.</p>
      {course.note && <p className="t-small mt-0.5 text-fg">{course.note}.</p>}
    </li>
  );
}

export default function EducationPage() {
  return (
    <>
      <PageHeader
        id="formacion-titulo"
        title="Formación y reconocimientos"
        lead={
          <p>
            Educación formal, formación en curso, cursos y bootcamps, y reconocimientos, en bloques
            separados. Los cursos no son certificaciones profesionales y se presentan con su estado
            real. Idiomas: {profile.languages}.
          </p>
        }
      />

      <Section id="formal" title="Educación formal" flush>
        <ol>
          {formalEducation.map((item) => (
            <li
              key={item.title}
              className="reveal grid gap-x-8 gap-y-2 border-t-2 border-violet py-7 first:mt-0 sm:grid-cols-[11rem_1fr]"
            >
              <p className="t-small">{item.period}</p>
              <div>
                <h3 className="t-h3">{item.title}</h3>
                <p className="t-small mt-1">{item.institution}</p>
                <p className="mt-3 font-medium text-soft">{item.status}</p>
                {item.details.length > 0 && (
                  <ul className="measure mt-3 space-y-2">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-violet" />
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

      <Section id="en-curso" title="En curso o por iniciar" band="nebula">
        <ul className="space-y-5">
          {inProgress.map((course) => (
            <CourseItem key={course.title} course={course} dashed />
          ))}
        </ul>
      </Section>

      <Section
        id="cursos"
        title="Cursos y bootcamps completados"
        intro="Agrupados por área. Dentro de cada área, del más reciente al más antiguo."
      >
        <div className="space-y-12">
          {areaOrder.map((area) => {
            const items = completedCourses.filter((course) => course.area === area);
            if (items.length === 0) return null;
            return (
              <div key={area}>
                <h3 className="t-h3">{courseAreaLabels[area]}</h3>
                <ul className="mt-5 space-y-5">
                  {items.map((course) => (
                    <CourseItem key={course.title} course={course} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="reconocimientos" title="Reconocimientos" band="nebula">
        <ul className="space-y-6">
          {recognitions.map((item) => (
            <li key={item.title} className="reveal border-l-2 border-violet py-1 pl-5">
              <p className="text-ink">{item.title}</p>
              <p className="t-small">
                {[item.year, item.organizer, item.project ? `Proyecto: ${item.project}` : null]
                  .filter(Boolean)
                  .join(". ")}
                .
              </p>
              {item.detail && <p className="t-small mt-0.5 text-fg">{item.detail}</p>}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="participaciones"
        title="Ferias, congresos y hackatones"
        intro="Participaciones documentadas. No son premios."
      >
        <ul className="space-y-6">
          {participations.map((item) => (
            <li key={item.title} className="reveal border-l-2 border-dashed border-soft/60 py-1 pl-5">
              <p className="text-ink">{item.title}</p>
              {(item.year || item.organizer || item.project) && (
                <p className="t-small">
                  {[item.year, item.organizer, item.project ? `Proyecto: ${item.project}` : null]
                    .filter(Boolean)
                    .join(". ")}
                  .
                </p>
              )}
              <p className="t-small mt-0.5 text-fg">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
