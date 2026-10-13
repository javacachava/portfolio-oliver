import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="no-encontrada" className="wrap py-28">
      <h1 id="no-encontrada" className="t-display !text-[clamp(3rem,10vw,7rem)]">
        Página no encontrada
      </h1>
      <p className="t-lead measure mt-7">
        La dirección no existe o cambió de lugar. Vuelve al inicio o revisa los proyectos.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Ir al inicio
        </Link>
        <Link href="/proyectos" className="btn btn-ghost">
          Ver proyectos
        </Link>
      </div>
    </section>
  );
}
