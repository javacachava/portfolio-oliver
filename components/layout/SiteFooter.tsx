import { Download, Mail } from "@/components/ui/Icons";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

const contactLinks = [
  { label: "Correo", text: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  {
    label: "GitHub",
    text: profile.github.label,
    href: profile.github.href,
    Icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    text: profile.linkedin.label,
    href: profile.linkedin.href,
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Currículum",
    text: "Descargar CV en PDF",
    href: profile.cv,
    Icon: Download,
    external: true,
  },
] as const;

export default function SiteFooter() {
  return (
    <footer id="contacto" aria-labelledby="contacto-titulo">
      <div className="band-cobre">
        <div className="wrap grid gap-x-10 gap-y-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="contacto-titulo" className="t-display !text-[clamp(2.8rem,8vw,6.4rem)]">
              Hablemos de
              <br />
              lo que sigue.
            </h2>
            <p className="measure t-lead mt-8 !text-espresso">
              Busco oportunidades laborales, pasantías, becas y colaboraciones en desarrollo de
              software, ciberseguridad y datos e IA aplicada. Escríbeme por correo.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="btn btn-primary mt-8 w-full sm:w-auto"
            >
              Escribir un correo
            </a>
          </div>

          <ul className="lg:col-span-5 lg:col-start-8">
            {contactLinks.map(({ label, text, href, Icon, ...rest }) => (
              <li key={label} className="border-t border-espresso/30 last:border-b">
                <a
                  href={href}
                  className="group flex min-h-16 items-center gap-4 py-3 text-espresso no-underline"
                  {...("external" in rest
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="grid">
                    <span className="text-[0.82rem] font-medium text-espresso/80">{label}</span>
                    <span className="break-all font-medium underline decoration-espresso/40 underline-offset-4 transition-colors group-hover:decoration-espresso">
                      {text}
                      {"external" in rest && (
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      )}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line bg-espresso">
        <div className="wrap flex flex-col gap-2 py-6 text-[0.85rem] text-fg-muted sm:flex-row sm:justify-between">
          <p>© 2026 {profile.name}</p>
          <p>
            {profile.location}. {profile.languages}
          </p>
        </div>
      </div>
    </footer>
  );
}
