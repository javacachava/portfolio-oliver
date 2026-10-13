export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-[var(--muted)] mb-1.5">
            [oliver@dev ~]$&nbsp;<span className="cursor-blink text-[var(--accent)]" />
          </p>
          <p className="text-xs text-[var(--muted)]">
            © 2026 Oliver Ascencio
          </p>
        </div>
        <a
          href="/cv/Oliver_Ascencio_Master_CV.pdf"
          download="Oliver_Ascencio_Master_CV.pdf"
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
        >
          Descargar CV (PDF, en inglés)
        </a>
      </div>
    </footer>
  );
}
