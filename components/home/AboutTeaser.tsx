import Link from "next/link";
import Section from "@/components/ui/Section";

export default function AboutTeaser() {
  return (
    <Section id="sobre-mi" title="Sobre mí" band="nebula">
      <div className="measure space-y-5 text-[1.12rem] leading-[1.7]">
        <p className="reveal">
          Soy de Santa Ana, El Salvador. Hice un bachillerato técnico en infraestructura
          tecnológica, completé los requisitos del TSU en Ciberseguridad y ahora estudio
          Ingeniería en Desarrollo de Software en UNICAES.
        </p>
        <p className="reveal">
          Me interesan el desarrollo seguro de software, la IA aplicada y, a largo plazo, la
          arquitectura de seguridad. Trabajo mejor cuando entiendo el problema junto a quien lo
          vive, como al levantar los requisitos del POS con el dueño de Pizza Brava.
        </p>
        <p className="reveal">
          <Link href="/sobre-mi" className="btn btn-ghost">
            Leer mi trayectoria
          </Link>
        </p>
      </div>
    </Section>
  );
}
