import { Download, Mail } from "@/components/ui/Icons";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer id="contacto" aria-labelledby="contacto-titulo">
      <div className="relative overflow-hidden border-t border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(112,66,248,0.28),transparent)]"
        />
        <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative flex flex-col items-center py-24 text-center sm:py-32">
          <p className="pill">Abierto a oportunidades, pasantías, becas y colaboraciones</p>
          <h2 id="contacto-titulo" className="t-display gradient-text mt-8 pb-2">
            ¿Hablamos?
          </h2>
          <p className="t-lead measure mt-5">
            Busco aportar en desarrollo de software, ciberseguridad y datos e IA aplicada. Escríbeme
            por correo o encuéntrame en GitHub y LinkedIn.
          </p>

          <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <Mail size={17} />
              {profile.email}
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Download size={17} />
              Descargar CV
              <span className="sr-only"> (PDF, se abre en una pestaña nueva)</span>
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            <li>
              <a
                href={profile.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-violet/40 bg-nebula/60 px-4 py-1.5 font-mono text-[0.78rem] text-ink no-underline transition-colors hover:border-soft hover:bg-violet/15"
              >
                <GithubIcon size={15} />
                {profile.github.label}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-violet/40 bg-nebula/60 px-4 py-1.5 font-mono text-[0.78rem] text-ink no-underline transition-colors hover:border-soft hover:bg-violet/15"
              >
                <LinkedinIcon size={15} />
                {profile.linkedin.label}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line bg-void/80">
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
