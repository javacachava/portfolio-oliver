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
  title: "Oliver Ascencio | Application & Cloud Security",
  description:
    "Portfolio de Oliver Ascencio, estudiante de Ingeniería de Software y próximo egresado en Ciberseguridad, enfocado en Application Security, Cloud Security y desarrollo seguro.",
  authors: [
    {
      name: "Oliver Ascencio",
      url: "https://github.com/javacachava",
    },
  ],
  keywords: [
    "application security",
    "cloud security",
    "devsecops",
    "ciberseguridad",
    "cybersecurity",
    "cloud",
    "OWASP",
    "RBAC",
    "PostgreSQL",
    "Node.js",
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
    "El Salvador",
    "portafolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oliver Ascencio | Application & Cloud Security",
    description:
      "Application Security, Cloud Security y desarrollo seguro, con evidencia en controles de acceso, bases de datos e integraciones reales.",
    url: "https://oliver-ascencio.wuju.dev",
    siteName: "Oliver Ascencio Portfolio",
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Ascencio | Application & Cloud Security",
    description:
      "Application Security, Cloud Security y desarrollo backend con controles aplicados a productos reales.",
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
