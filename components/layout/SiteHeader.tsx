"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Menu } from "@/components/ui/Icons";
import { profile } from "@/data/profile";

const links = [
  { label: "Proyectos", href: "/proyectos", route: "/proyectos" },
  { label: "WUJU", href: "/#wuju" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Competencias", href: "/#competencias" },
  { label: "Formación", href: "/formacion", route: "/formacion" },
  { label: "Sobre mí", href: "/sobre-mi", route: "/sobre-mi" },
] as const;

type NavLink = (typeof links)[number];

function isCurrent(pathname: string, link: NavLink) {
  return "route" in link && (pathname === link.route || pathname.startsWith(`${link.route}/`));
}

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
    <header className="sticky top-0 z-40 border-b border-line bg-espresso/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${profile.shortName}, ir al inicio`}
          className="group flex items-center gap-3 no-underline"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-[3px] border border-cobre font-display text-[0.8rem] font-bold text-cobre transition-colors group-hover:bg-cobre group-hover:text-espresso"
          >
            OA
          </span>
          <span className="font-display text-[1.1rem] font-semibold tracking-tight text-crema">
            {profile.shortName}
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6">
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
          <Link href="/#contacto" className="btn btn-primary !min-h-10 !px-4 !py-1.5 text-[0.9rem]">
            Contacto
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-crema lg:hidden"
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
        className={`grid border-line transition-[grid-template-rows,border-color] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <nav aria-label="Principal" className="overflow-hidden bg-espresso">
          <ul className="wrap py-3">
            {links.map((link, i) => (
              <li
                key={link.label}
                className="border-b border-line transition-all duration-300"
                style={{
                  transitionDelay: open ? `${60 + i * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(-0.4rem)",
                }}
              >
                <Link
                  href={link.href}
                  className="nav-link w-full py-1 text-[1.05rem]"
                  aria-current={isCurrent(pathname, link) ? "page" : undefined}
                  onClick={() => setOpenFor(null)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link
                href="/#contacto"
                className="btn btn-primary w-full"
                onClick={() => setOpenFor(null)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
