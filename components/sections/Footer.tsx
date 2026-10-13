import { Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[var(--muted)] mb-1.5">
            [oliver@security-cloud ~]$&nbsp;<span className="cursor-blink text-[var(--accent)]" />
          </p>
          <p className="text-xs text-[var(--muted)]">
            © 2026 Oliver Ascencio
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/javacachava"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Oliver Ascencio"
            className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/oliver-ascencio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Oliver Ascencio"
            className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <LinkedinIcon size={14} />
            LinkedIn
          </a>
          <a
            href="/cv/CV_Oliver_Ascencio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar CV de Oliver Ascencio en PDF"
            className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <Download size={14} />
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
