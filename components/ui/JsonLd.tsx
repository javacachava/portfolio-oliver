/**
 * Datos estructurados (JSON-LD). El contenido proviene solo de datos propios del repositorio,
 * nunca de entrada de usuarios, y se reemplaza "<" por su escape unicode para que ningún valor
 * pueda cerrar la etiqueta <script> (patrón recomendado en la guía de Next.js).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
