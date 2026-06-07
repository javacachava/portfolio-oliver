import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import DataDuck from "@/components/sections/DataDuck";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { StarField } from "@/components/ui/StarField";

export default function Page() {
  return (
    <>
      <StarField count={200} />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <DataDuck />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
