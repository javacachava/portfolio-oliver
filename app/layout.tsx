import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Starfield from "@/components/ui/Starfield";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Solo para etiquetas técnicas (cápsulas y rótulos de diagramas).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
  themeColor: "#030014",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Starfield />
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
