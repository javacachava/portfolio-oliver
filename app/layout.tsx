import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/ui/MotionProvider";

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
  alternates: { canonical: "/" },
  title: "Oliver Ascencio — Software, ciberseguridad e IA aplicada",
  description:
    "Portfolio de Oliver Ascencio: estudiante de Ingeniería en Desarrollo de Software, formación técnica en ciberseguridad y cofundador de WUJU. Proyectos de software, datos e IA aplicada. Santa Ana, El Salvador.",
  authors: [
    {
      name: "Oliver Ascencio",
      url: "https://github.com/javacachava",
    },
  ],
  keywords: [
    "desarrollo de software",
    "ciberseguridad",
    "inteligencia artificial aplicada",
    "análisis de datos",
    "WUJU",
    "Python",
    "Node.js",
    "El Salvador",
    "portafolio",
  ],
  openGraph: {
    title: "Oliver Ascencio — Software, ciberseguridad e IA aplicada",
    description:
      "Estudiante de Ingeniería en Desarrollo de Software y cofundador de WUJU, con proyectos de software, ciberseguridad, datos e IA aplicada.",
    url: "https://oliver-ascencio.wuju.dev",
    siteName: "Oliver Ascencio Portfolio",
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Ascencio — Software, ciberseguridad e IA aplicada",
    description:
      "Estudiante de Ingeniería en Desarrollo de Software y cofundador de WUJU, con proyectos de software, ciberseguridad, datos e IA aplicada.",
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
        {/* Sin JS no hay hidratación: las entradas animadas no deben dejar contenido oculto. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
