import Link from "next/link";
import Section from "@/components/ui/Section";
import { formalEducation, inProgress, recognitions } from "@/data/education";

export default function EducationSummary() {
  return (
    <Section
      id="formacion"
      title="Formación y reconocimientos"
      intro={
        <Link href="/formacion" className="link">
          Ver cursos, bootcamps, eventos y participaciones
        </Link>
      }
    >
      <div className="space-y-14">
        <p className="t-small measure">
          Los cursos y bootcamps no son certificaciones profesionales: en la página de formación
          se presentan por separado y con su estado real.
        </p>
        <div>
          <h3 className="t-h3">Educación formal</h3>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {formalEducation.map((item) => (
              <li key={item.title} className="reveal border-t-2 border-cobre pt-4">
                <p className="t-small">{item.period}</p>
                <p className="mt-2 font-display text-[1.15rem] font-semibold leading-tight text-crema">
                  {item.title}
                </p>
                <p className="t-small mt-2">{item.institution}</p>
                <p className="mt-3 text-[0.95rem]">{item.status}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          <div>
            <h3 className="t-h3">En curso o por iniciar</h3>
            <ul className="mt-6 space-y-4">
              {inProgress.map((course) => (
                <li key={course.title} className="reveal border-l-2 border-dashed border-caramelo/60 pl-4">
                  <p className="text-crema">{course.title}</p>
                  <p className="t-small">
                    {course.provider}. {course.date}.
                  </p>
                  {course.note && <p className="t-small">{course.note}.</p>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="t-h3">Reconocimientos</h3>
            <ul className="mt-6 space-y-4">
              {recognitions.map((item) => (
                <li key={item.title} className="reveal border-l-2 border-cobre pl-4">
                  <p className="text-crema">{item.title}</p>
                  <p className="t-small">
                    {item.year}
                    {item.project ? `. Proyecto: ${item.project}` : ""}
                  </p>
                  {item.detail && <p className="t-small">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
