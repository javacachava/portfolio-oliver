"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Wuju", href: "#wuju" },
  { label: "Premios", href: "#premios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-4 sm:px-10">
      <nav className="w-full h-full flex items-center justify-between m-auto max-w-7xl">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 group">
          <span className="font-pixel text-[9px] text-[#b49bff] opacity-60 group-hover:opacity-100 transition-opacity">
            ›_
          </span>
          <span className="text-sm font-semibold text-gray-300 tracking-tight">
            Oliver<span className="text-[#b49bff]">.</span>dev
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex h-full flex-row items-center">
          <ul className="flex items-center justify-between gap-1 h-auto border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[20px] py-[10px] rounded-full text-gray-200">
            {links.map((l) => {
              const isActive = `#${activeSection}` === l.href;
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

        {/* Social icons (desktop) */}
        <div className="hidden md:flex flex-row gap-5">
          <a
            href="https://github.com/javacachava"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white hover:text-[rgb(112,66,248)] transition-colors"
          >
            <GithubIcon size={22} />
          </a>
          <a
            href="https://linkedin.com/in/oliver-ascencio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white hover:text-[rgb(112,66,248)] transition-colors"
          >
            <LinkedinIcon size={22} />
          </a>
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
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="https://github.com/javacachava"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white"
            >
              <GithubIcon size={26} />
            </a>
            <a
              href="https://linkedin.com/in/oliver-ascencio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white"
            >
              <LinkedinIcon size={26} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
