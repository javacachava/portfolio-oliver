import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Security from "@/components/sections/Security";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import AITools from "@/components/sections/AITools";
import DataDuck from "@/components/sections/DataDuck";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import DeferredStarsCanvas from "@/components/ui/DeferredStarsCanvas";

export default function Page() {
  return (
    <>
      <DeferredStarsCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Security />
        <Projects />
        <AITools />
        <About />
        <DataDuck />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
