"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Building,
  Chip,
  Close,
  Folder,
  Graduation,
  Menu,
  User,
} from "@/components/ui/Icons";
import { profile } from "@/data/profile";

const links = [
  { label: "Proyectos", href: "/proyectos", route: "/proyectos", Icon: Folder },
  { label: "WUJU", href: "/#wuju", Icon: Building },
  { label: "Experiencia", href: "/#experiencia", Icon: Briefcase },
  { label: "Competencias", href: "/#competencias", Icon: Chip },
  { label: "Formación", href: "/formacion", route: "/formacion", Icon: Graduation },
  { label: "Sobre mí", href: "/sobre-mi", route: "/sobre-mi", Icon: User },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // El menú cuenta como abierto solo en la ruta donde se abrió: al navegar se cierra solo.
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenFor(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/70 backdrop-blur-md">
      <div className="wrap relative flex h-[4.25rem] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${profile.shortName}, ir al inicio`}
          className="group flex items-center gap-2 no-underline"
        >
          <span
            aria-hidden="true"
            className="font-mono text-[0.95rem] font-bold text-soft opacity-70 transition-opacity group-hover:opacity-100"
          >
            ›_
          </span>
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
            {profile.shortName}
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="absolute left-1/2 hidden -translate-x-1/2 xl:block"
        >
          <ul className="nav-pill">
            {links.map(({ label, href, Icon, ...rest }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="nav-link"
                  aria-current={
                    "route" in rest && (pathname === rest.route || pathname.startsWith(`${rest.route}/`))
                      ? "page"
                      : undefined
                  }
                >
                  <Icon size={14} className="opacity-70" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/#contacto" className="btn btn-primary !min-h-10 !px-4 !py-1.5 hidden text-[0.9rem] xl:inline-flex">
          Contacto
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          {open ? <Close size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Panel móvil: se despliega con una transición de altura; inert cuando está cerrado. */}
      <div
        id="menu-movil"
        inert={!open}
        className={`grid border-line transition-[grid-template-rows,border-color] duration-300 ease-out xl:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <nav aria-label="Principal" className="overflow-hidden bg-void/95">
          <ul className="wrap py-3">
            {links.map(({ label, href, Icon, ...rest }, i) => (
              <li
                key={label}
                className="border-b border-line transition-all duration-300"
                style={{
                  transitionDelay: open ? `${60 + i * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(-0.4rem)",
                }}
              >
                <Link
                  href={href}
                  className="nav-link w-full !rounded-lg py-1 text-[1.05rem]"
                  aria-current={
                    "route" in rest && (pathname === rest.route || pathname.startsWith(`${rest.route}/`))
                      ? "page"
                      : undefined
                  }
                  onClick={() => setOpenFor(null)}
                >
                  <Icon size={16} className="opacity-70" />
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link href="/#contacto" className="btn btn-primary w-full" onClick={() => setOpenFor(null)}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
