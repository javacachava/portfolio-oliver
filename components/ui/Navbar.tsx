"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Cloud,
  ShieldCheck,
  CircleUser,
  GraduationCap,
  Mail,
  type LucideIcon,
} from "lucide-react";

const links: Array<{ label: string; href: string; Icon: LucideIcon }> = [
  {
    label: "Seguridad aplicada",
    href: "/#seguridad",
    Icon: ShieldCheck,
  },
  { label: "Cloud & habilidades", href: "/#skills", Icon: Cloud },
  { label: "Perfil", href: "/#sobre-mi", Icon: CircleUser },
  { label: "Formación", href: "/formacion", Icon: GraduationCap },
  { label: "Contacto", href: "/#contacto", Icon: Mail },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const isLinkActive = (href: string) =>
    href === "/formacion"
      ? pathname === "/formacion"
      : pathname !== "/formacion" && href === `/#${activeSection}`;

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-4 sm:px-10">
      <nav
        aria-label="Navegación principal"
        className="relative w-full h-full flex items-center justify-between m-auto max-w-7xl"
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Ir al inicio de Oliver Ascencio"
          className="flex items-center gap-1.5 group"
        >
          <span className="font-mono text-sm font-bold text-[#b49bff] opacity-65 transition-opacity group-hover:opacity-100">
            ›_
          </span>
          <span className="text-sm font-semibold text-gray-300 tracking-tight">
            Oliver<span className="text-[#b49bff]">.sec</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex h-full flex-row items-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center justify-between gap-1 h-auto border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-full text-gray-200">
            {links.map((l) => {
              const isActive = isLinkActive(l.href);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`cursor-pointer px-2.5 text-sm transition inline-flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "text-[rgb(112,66,248)]"
                        : "hover:text-[rgb(112,66,248)]"
                    }`}
                  >
                    <l.Icon
                      size={13}
                      className={isActive ? "" : "opacity-60"}
                    />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={open}
          aria-controls="menu-principal"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="menu-principal"
          className="absolute top-[65px] left-0 w-full bg-[#030014] border-b border-[#2A0E61] p-5 flex flex-col items-center text-gray-300 lg:hidden"
        >
          <ul className="flex flex-col items-center gap-4">
            {links.map((l) => {
              const isActive = isLinkActive(l.href);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={`cursor-pointer transition inline-flex items-center gap-2 ${
                      isActive
                        ? "text-[rgb(112,66,248)]"
                        : "hover:text-[rgb(112,66,248)]"
                    }`}
                  >
                    <l.Icon size={15} className={isActive ? "" : "opacity-60"} />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
