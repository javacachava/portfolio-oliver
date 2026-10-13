import type { Metadata } from "next";
import AboutTeaser from "@/components/home/AboutTeaser";
import EducationSummary from "@/components/home/EducationSummary";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import WujuBlock from "@/components/home/WujuBlock";
import JsonLd from "@/components/ui/JsonLd";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  url: profile.siteUrl,
  email: profile.email,
  description: profile.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Ana",
    addressCountry: "SV",
  },
  worksFor: { "@type": "Organization", name: "WUJU", url: "https://wuju.dev" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidad Católica de El Salvador (UNICAES)" },
    { "@type": "EducationalOrganization", name: "ESIT / MINED" },
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Español" },
    { "@type": "Language", name: "Inglés" },
  ],
  knowsAbout: [
    "Desarrollo de software",
    "Ciberseguridad",
    "Control de acceso basado en roles",
    "Bases de datos",
    "Inteligencia artificial aplicada",
    "Análisis de datos",
    "Coordinación de proyectos tecnológicos",
  ],
  sameAs: [profile.github.href, profile.linkedin.href],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <Hero />
      <FeaturedProjects />
      <WujuBlock />
      <ExperienceTimeline />
      <Skills />
      <EducationSummary />
      <AboutTeaser />
    </>
  );
}
