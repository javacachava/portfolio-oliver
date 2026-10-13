import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { profile } from "@/data/profile";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1315" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
