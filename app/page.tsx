import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Security from "@/components/sections/Security";
import Experience from "@/components/sections/Experience";
import Awards from "@/components/sections/Awards";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import DeferredStarsCanvas from "@/components/ui/DeferredStarsCanvas";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oliver Ascencio",
  url: "https://oliver-ascencio.wuju.dev",
  jobTitle: "Application & Cloud Security",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santa Ana",
    addressCountry: "SV",
  },
  sameAs: [
    "https://github.com/javacachava",
    "https://linkedin.com/in/oliver-ascencio",
  ],
  knowsAbout: [
    "Ciberseguridad",
    "OWASP",
    "Control de acceso basado en roles",
    "Cloud fundamentals",
    "AWS",
    "Google Cloud",
    "PostgreSQL",
    "Node.js",
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido principal
      </a>
      <DeferredStarsCanvas />
      <Navbar />
      <main id="contenido-principal" className="relative z-10">
        <Hero />
        <Projects />
        <Security />
        <Experience />
        <Skills />
        <Awards />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
