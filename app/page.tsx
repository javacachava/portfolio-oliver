import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Security from "@/components/sections/Security";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import DeferredStarsCanvas from "@/components/ui/DeferredStarsCanvas";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oliver Ascencio",
  url: "https://oliver-ascencio.wuju.dev",
  jobTitle: "Ciberseguridad y Cloud",
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
    "Trabajo ágil",
    "Java",
    "JavaScript",
    "Python",
    "Shell",
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
        <Security />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
