import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section aria-labelledby="no-encontrada" className="wrap py-24">
      <p className="eyebrow">Error 404</p>
      <h1 id="no-encontrada" className="display mt-4 max-w-[14ch]">
        Página no encontrada
      </h1>
      <p className="measure mt-6 text-[1.125rem]">
        La dirección no existe o cambió de lugar. Puedes volver al inicio o ver los proyectos.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Ir al inicio
        </Link>
        <Link href="/proyectos" className="btn btn-secondary">
          Ver proyectos
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
