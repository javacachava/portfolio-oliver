export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-pixel text-[9px] text-[var(--muted)] mb-1.5">
            [oliver@wuju ~]$&nbsp;<span className="cursor-blink text-[var(--accent)]" />
          </p>
          <p className="text-xs text-[var(--muted)]">
            © 2026 Oliver Ascencio ·{" "}
            <a
              href="https://github.com/javacachava"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Wuju
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
