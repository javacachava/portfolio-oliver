# Portafolio de Oliver Ascencio

Sitio personal de [Oliver Ascencio](https://oliver-ascencio.wuju.dev): proyectos, experiencia, competencias y formación. Next.js 16 (App Router), React 19 y Tailwind CSS 4, sin otras dependencias de interfaz.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compila y prerenderiza todas las rutas
npm run start    # sirve la compilación
```

> Next 16 tiene cambios respecto a versiones anteriores. Antes de tocar código, consulta la guía correspondiente en `node_modules/next/dist/docs/`.

## Estructura

```
app/            rutas: / · /proyectos · /proyectos/[slug] · /formacion · /sobre-mi
components/     layout (cabecera, pie) y ui (secciones, filas de proyecto, filtro)
data/           contenido: perfil, proyectos, experiencia, competencias, formación
public/cv/      CV descargable
public/demos/   demostraciones con datos simulados (HTML autocontenido)
docs/           guía de contenido y asuntos pendientes (docs/CONTENIDO.md)
```

El contenido vive en `data/` y las páginas lo leen: para agregar un proyecto o un curso no hace falta tocar componentes. Ver [docs/CONTENIDO.md](docs/CONTENIDO.md).

## Despliegue

Un push a `main` ejecuta `.github/workflows/deploy.yml`: entra por SSH al VPS, hace `git pull` y `docker compose up -d --build`. La imagen (`Dockerfile`) compila con `output: "standalone"` y se publica detrás de Caddy.
