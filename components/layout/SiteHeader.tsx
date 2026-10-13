"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Menu } from "@/components/ui/Icons";
import { profile } from "@/data/profile";

const links = [
  { label: "Proyectos", href: "/proyectos", route: "/proyectos" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Competencias", href: "/#competencias" },
  { label: "Formación", href: "/formacion", route: "/formacion" },
  { label: "Sobre mí", href: "/sobre-mi", route: "/sobre-mi" },
  { label: "Contacto", href: "/#contacto" },
] as const;

type NavLink = (typeof links)[number];

function isCurrent(pathname: string, link: NavLink) {
  return "route" in link && (pathname === link.route || pathname.startsWith(`${link.route}/`));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // El menú se considera abierto solo en la ruta donde se abrió: al navegar se cierra solo.
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
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/90 backdrop-blur-sm">
      <div className="wrap flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-[1.2rem] tracking-tight text-ink no-underline"
          aria-label={`${profile.shortName}, ir al inicio`}
        >
          {profile.shortName}
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="nav-link"
                  aria-current={isCurrent(pathname, link) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Principal"
          className="border-t border-rule bg-bg lg:hidden"
        >
          <ul className="wrap py-2">
            {links.map((link) => (
              <li key={link.label} className="border-b border-rule last:border-b-0">
                <Link
                  href={link.href}
                  className="nav-link w-full justify-between py-1"
                  aria-current={isCurrent(pathname, link) ? "page" : undefined}
                  onClick={() => setOpenFor(null)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
