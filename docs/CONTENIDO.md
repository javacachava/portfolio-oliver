# Contenido del portafolio

Guía para mantener el contenido y registro de lo que está verificado y lo que falta confirmar.

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Nombre, contacto, enlaces, idiomas, ficha de la portada | `data/profile.ts` |
| Casos de proyecto (los 9 puntos de cada caso) | `data/projects.ts` (tipos y rótulos en `data/project-types.ts`) |
| Diagramas de arquitectura de cada caso y el diagrama de WUJU | `data/diagrams.ts` |
| Descripción de WUJU y de mi rol dentro de la organización | `data/wuju.ts` |
| Experiencia | `data/experience.ts` |
| Competencias (práctica vs. formación académica) | `data/skills.ts` |
| Formación, cursos, reconocimientos y participaciones | `data/education.ts` |
| Colores (tema espacial violeta y cian), tipografía, movimiento y componentes base | `app/globals.css` |

Agregar un proyecto: añade un objeto a `projects` en `data/projects.ts`. La ficha `/proyectos/[slug]`, el listado, el filtro y el sitemap se generan solos.

Agregar un diagrama: añade una entrada en `data/diagrams.ts` con el mismo `slug` del proyecto. Cada nodo indica su columna y fila; el componente `Diagram` calcula la geometría, las pistas y la versión vertical para móvil. Los diagramas se elaboran solo con lo respaldado por el CV, el repositorio o la documentación del proyecto, y cada uno lleva una nota que aclara que no es una captura.

Agregar capturas: copia las imágenes a `public/projects/<slug>/` y declara `images` en el caso, con `alt`, `width` y `height` reales. La ficha ya sabe mostrarlas con `next/image`.

## Reglas de contenido

- Fuente de verdad: el CV maestro. Lo que aparece en el sitio y no está en el CV maestro debe tener respaldo en un repositorio, en documentación del proyecto o en una demo publicada.
- Cursos y bootcamps no se presentan como certificaciones. Lo que está en curso o por iniciar se rotula así.
- Idiomas, siempre exactamente: «Español: Nativo | Inglés: B1».
- En proyectos de equipo se indica qué parte es propia. Los stacks se marcan «Mi parte» o «Del proyecto».
- No se publican cifras de pruebas, usuarios, despliegues ni resultados sin verificarlos antes.

## Pendiente de confirmar

Estas decisiones de contenido dependen de información que no pude verificar. Hasta confirmarlas, el sitio usa la opción más conservadora.

1. **Stack del POS.** El repositorio `POS` es Laravel 13 + Vue 3 + PostgreSQL 16 + Redis + Reverb (etiqueta `v1.0.0`, creado el 2026-03-19). El CV maestro dice React, Node.js, PostgreSQL y sincronización con Firestore para el servicio social (nov 2025 – mar 2026). Sospecha: el servicio social entregó una primera versión y el repositorio actual es una reescritura. El sitio muestra solo lo verificado en el repositorio y omite la línea de React/Node/Firestore en Experiencia.
2. **Producción del POS y del bot.** Ningún repositorio demuestra que estén en uso real. El sitio dice «Versión 1.0» (POS) y «Funcional» (bot), sin «en producción» ni «cliente real».
3. **Cifras de pruebas del POS.** El CHANGELOG del 2026-07-07 registra 567 pruebas PHPUnit y 936 Vitest. No se pudieron reejecutar ni se verificaron las 109 E2E. El sitio no publica cifras.
4. **TuGuíaSV.** El CV maestro cita DigitalOcean, Cloudflare CDN y SendGrid. El repositorio documenta otra arquitectura (Flutter, Supabase autoalojado, VPS) y otro enfoque de producto (recomendaciones verificadas en persona, rutas de bus y lealtad). El sitio sigue el CV maestro y no menciona el sistema de reseñas ni el mapa interactivo que aparecían en la versión anterior del sitio.
5. **Tu parte en proyectos de equipo.** CuencaOS y Terrivo usan la redacción del CV maestro. Del bot de WhatsApp, FlowCore y TuGuíaSV no hay un rol documentado en el CV; los textos de rol son conservadores.
6. **Terrivo / Atria.** El CV habla de componentes de datos en Python para Atria. El repositorio `terrivo` es el sitio web (Next.js). No hay repositorio de Atria a la vista.
7. **Scrum.** El curso de la Fundación Caprile comienza el 13 de octubre de 2026. Cuando comience, cambiar su estado en `data/education.ts` (`inProgress`) y la fila de Scrum en `data/skills.ts`.
8. **CV descargable.** `public/cv/CV_Oliver_Ascencio.pdf` sigue siendo el CV anterior (contiene datos que difieren del CV maestro). Reemplazarlo cuando el PDF del CV maestro esté disponible como archivo.
9. **Foto y capturas.** No hay foto real ni capturas de proyectos; el sitio no usa avatares. Las demos de `public/demos/` son simulaciones con datos ficticios y se identifican como tales.
10. **Repositorios privados.** Las fichas dicen «el repositorio es privado» sin exponer su contenido. Confirmar que eso es aceptable.
11. **Diagramas.** Los de `data/diagrams.ts` los elaboré a partir del CV, los repositorios y la documentación de cada proyecto. Conviene que los revises, sobre todo el flujo de CuencaOS (sensores, borde, plataforma, Akhet y revisión humana), la composición de Terrivo / Atria y el diagrama de WUJU frente a tu rol. Los de TuGuíaSV solo muestran los servicios con los que trabajaste, sin flujo de datos.
12. **Entradas retiradas.** Quedaron fuera por no figurar en el CV maestro: taller de Tableau, curso de Java de Udemy, SOLID y Clean Code, y Blockchain.

## Demos

`/demos/pos` y `/demos/restaurante-chatbot` sirven los `index.html` de `public/demos/` mediante `rewrites` en `next.config.ts`. Los enlaces anteriores con barra final devolvían 404 porque Next recorta la barra (308) y `public/` no sirve `index.html` de carpetas. Llevan `X-Robots-Tag: noindex`.
