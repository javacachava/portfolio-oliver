import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Cedarville_Cursive } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const cedarvilleCursive = Cedarville_Cursive({
  variable: "--font-cursive",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oliver-ascencio.wuju.dev"),
  title: "Oliver Ascencio — Seguridad de aplicaciones & Backend",
  description:
    "Portfolio de Oliver Ascencio. Seguridad de aplicaciones y backend seguro: autenticación, autorización, protección de integraciones y controles desde el diseño. Santa Ana, El Salvador.",
  authors: [
    {
      name: "Oliver Ascencio",
      url: "https://github.com/javacachava",
    },
  ],
  keywords: [
    "ciberseguridad",
    "cybersecurity",
    "seguridad de aplicaciones",
    "AppSec",
    "OWASP",
    "RBAC",
    "backend",
    "desarrollador",
    "TypeScript",
    "Node.js",
    "El Salvador",
    "portafolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oliver Ascencio — Seguridad de aplicaciones & Backend",
    description:
      "Controles de seguridad aplicados a productos reales: autenticación, autorización e integraciones verificadas.",
    url: "https://oliver-ascencio.wuju.dev",
    siteName: "Oliver Ascencio Portfolio",
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Ascencio — Seguridad de aplicaciones & Backend",
    description:
      "Seguridad de aplicaciones y backend seguro, con controles aplicados a productos reales.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cedarvilleCursive.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-y-scroll overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
