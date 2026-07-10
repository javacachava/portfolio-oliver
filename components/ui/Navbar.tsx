"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Skills", href: "/#skills" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Wuju", href: "/#wuju" },
  { label: "Formación", href: "/formacion" },
  { label: "Contacto", href: "/#contacto" },
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
      <nav className="relative w-full h-full flex items-center justify-between m-auto max-w-7xl">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 group">
          <span className="font-mono text-sm font-bold text-[#b49bff] opacity-60 group-hover:opacity-100 transition-opacity">
            ›_
          </span>
          <span className="text-sm font-semibold text-gray-300 tracking-tight">
            Oliver<span className="text-[#b49bff]">.</span>dev
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex h-full flex-row items-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center justify-between gap-1 h-auto border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-full text-gray-200">
            {links.map((l) => {
              const isActive = isLinkActive(l.href);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`cursor-pointer px-2.5 text-sm transition ${
                      isActive
                        ? "text-[rgb(112,66,248)]"
                        : "hover:text-[rgb(112,66,248)]"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] border-b border-[#2A0E61] p-5 flex flex-col items-center text-gray-300 md:hidden">
          <ul className="flex flex-col items-center gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
