import { Download, Mail } from "@/components/ui/Icons";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

const contactLinks = [
  {
    label: "Correo",
    text: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
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
    text: "Descargar CV (PDF)",
    href: profile.cv,
    Icon: Download,
    external: true,
  },
] as const;

export default function SiteFooter() {
  return (
    <footer id="contacto" className="mt-24 border-t border-rule">
      <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="eyebrow">Contacto</p>
          <h2 className="h2 mt-3 max-w-[18ch]">
            ¿Una oportunidad, una pasantía o una colaboración?
          </h2>
          <p className="measure mt-4 text-body">
            Escríbeme por correo. Respondo desde Santa Ana, El Salvador, en español.
          </p>
        </div>

        <ul className="lg:col-span-5 lg:col-start-8">
          {contactLinks.map(({ label, text, href, Icon, ...rest }) => (
            <li key={label} className="border-t border-rule first:border-t-0 lg:first:border-t">
              <a
                href={href}
                className="group flex min-h-14 items-center gap-4 py-3 text-ink no-underline"
                {...("external" in rest
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon size={18} className="shrink-0 text-muted group-hover:text-accent" />
                <span className="grid">
                  <span className="meta">{label}</span>
                  <span className="break-all underline decoration-rule underline-offset-4 group-hover:decoration-accent">
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

      <div className="border-t border-rule">
        <div className="wrap flex flex-col gap-1 py-5 sm:flex-row sm:justify-between">
          <p className="meta">© 2026 {profile.name}</p>
          <p className="meta">{profile.languages}</p>
        </div>
      </div>
    </footer>
  );
}
