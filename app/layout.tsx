import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { profile } from "@/data/profile";

// Titulares: Bricolage Grotesque, con eje óptico para que los tamaños grandes ganen contraste.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Solo para las etiquetas técnicas de los diagramas.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const siteTitle = `${profile.shortName} — ${profile.role}`;
const siteDescription =
  "Portafolio de Oliver Ascencio: estudiante de Ingeniería en Desarrollo de Software, formación técnica en ciberseguridad y cofundador de WUJU. Proyectos de software, datos e IA aplicada en El Salvador.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: siteTitle, template: `%s — ${profile.shortName}` },
  description: siteDescription,
  applicationName: `${profile.shortName} — portafolio`,
  authors: [{ name: profile.shortName, url: profile.github.href }],
  creator: profile.shortName,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: profile.siteUrl,
    siteName: `${profile.shortName} — portafolio`,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15100d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="relative z-10 flex min-h-dvh flex-col">
          <a href="#contenido" className="skip-link">
            Saltar al contenido
          </a>
          <SiteHeader />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
