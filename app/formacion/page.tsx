import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import DeferredStarsCanvas from "@/components/ui/DeferredStarsCanvas";
import Constellation from "@/components/ui/Constellation";
import FormacionList from "@/components/sections/FormacionList";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Counter from "@/components/ui/Counter";
import { formacionStats } from "@/data/formacion";

export const metadata: Metadata = {
  title: "Formación en seguridad de aplicaciones — Oliver Ascencio",
  description:
    "Formación académica y complementaria de Oliver Ascencio, con foco en ciberseguridad, seguridad de aplicaciones, cloud y desarrollo de software.",
};

const stats = [
  { value: formacionStats.totalHours, suffix: "h", label: "documentadas", color: "#7042f8" },
  { value: formacionStats.totalItems, suffix: "", label: "certificaciones e ítems", color: "#06b6d4" },
  { value: formacionStats.totalInstitutions, suffix: "", label: "instituciones", color: "#00ff9f" },
];

export default function FormacionPage() {
  return (
    <>
      <DeferredStarsCanvas />
      <Navbar />
      <main id="contenido-principal" className="relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14 text-center">
          <SectionEyebrow className="mb-3 justify-center flex">
            Formación verificable
          </SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 w-fit mx-auto pb-2">
            Formación para seguridad aplicada
          </h1>
          <p className="text-[var(--muted)] max-w-xl mx-auto mt-3">
            Formación académica y complementaria que sostiene mi práctica en
            seguridad de aplicaciones, backend y cloud — {formacionStats.yearRange}.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold tabular-nums" style={{ color: s.color }}>
                  <Counter to={s.value} />
                  {s.suffix}
                </p>
                <p className="font-mono text-[11px] text-[var(--muted)] mt-1 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Constelación — solo desktop (requiere mouse) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 mb-20">
          <Constellation />
        </div>

        {/* Lista terminal — principal en móvil, índice en desktop */}
        <div className="px-4 sm:px-6 mt-8">
          <FormacionList />
        </div>
      </main>
      <Footer />
    </>
  );
}
