# Contenido del portafolio

Estructura del sitio original (una sola página con las secciones Inicio, Proyectos, Seguridad, Experiencia, Habilidades, Premios, Sobre mí y Contacto, más `/formacion`), con el texto actualizado según el CV maestro.

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Proyectos (tarjetas, estado, stack, enlaces) | `data/projects.ts` |
| Logros y participaciones | `data/awards.ts` |
| Formación (página `/formacion` y contadores) | `data/formacion.ts` |
| Titular, chips y escena del hero | `components/sections/Hero.tsx` |
| Casos de seguridad | `components/sections/Security.tsx` |
| Experiencia | `components/sections/Experience.tsx` |
| Habilidades (usado en proyectos y formación académica) | `components/sections/Skills.tsx` |
| Perfil, formación relevante e idiomas | `components/sections/About.tsx` |
| Metadatos, JSON-LD e imagen social | `app/layout.tsx`, `app/page.tsx`, `app/opengraph-image.tsx` |

## Reglas de contenido

- Fuente de verdad: el CV maestro. Lo que no esté ahí debe tener respaldo en un repositorio, en documentación del proyecto o en una demo publicada.
- Cursos y bootcamps no se presentan como certificaciones profesionales.
- Idiomas: «Español: Nativo | Inglés: B1».
- En proyectos de WUJU se indica que son colectivos y qué parte es propia.
- No se publican cifras de pruebas, usuarios, despliegues en producción ni resultados sin verificarlos antes.

## Pendiente de confirmar

1. **Stack del POS.** El repositorio `POS` es Laravel 13 + Vue 3 + PostgreSQL 16 (etiqueta `v1.0.0`). El CV maestro dice React, Node.js, PostgreSQL y Firestore para el servicio social. El sitio muestra lo verificado en el repositorio.
2. **«En producción» y cifras de pruebas.** Ningún repositorio lo demuestra, así que no se publica. El CHANGELOG del POS (7 jul 2026) registra 567 pruebas PHPUnit y 936 Vitest, sin reejecutar.
3. **TuGuíaSV.** El CV cita DigitalOcean, Cloudflare CDN y SendGrid; el repositorio documenta otra arquitectura (Flutter, Supabase autoalojado). El caso de seguridad de TuGuíaSV se rotula como diseño documentado.
4. **Terrivo / Atria.** El CV habla de componentes Python para Atria; el repositorio `terrivo` es el sitio web (Next.js).
5. **Scrum.** El curso de la Fundación Caprile comienza el 13 de octubre de 2026. Cuando comience, cambiar su estado en `data/formacion.ts`.
6. **CV descargable.** `public/cv/CV_Oliver_Ascencio.pdf` sigue siendo el CV anterior. Reemplazarlo cuando el PDF del CV maestro esté disponible como archivo.
7. **Retratos.** Los dos retratos del perfil son ilustraciones; si prefieres una foto real, reemplaza `public/images/oliver*.png`.
8. **Entradas retiradas.** Francés, taller de Tableau, cursos de Udemy (SOLID, Java básico, Blockchain) y Docker/Terraform como habilidad dominada no figuran en el CV maestro.

## Demos

`/demos/pos` y `/demos/restaurante-chatbot` sirven los `index.html` de `public/demos/` mediante `rewrites` en `next.config.ts`; antes daban 404 porque Next recorta la barra final. Son simulaciones con datos ficticios y llevan `X-Robots-Tag: noindex`.
