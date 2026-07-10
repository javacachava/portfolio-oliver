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
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oliver.wuju.dev"),
  title: "Oliver Alexander Ascencio Pleitez — Desarrollador Full-Stack",
  description:
    "Portfolio de Oliver Alexander Ascencio Pleitez. Desarrollador Full-Stack. Proyectos reales en TypeScript, Node.js, React y cloud. Santa Ana, El Salvador.",
  authors: [
    {
      name: "Oliver Alexander Ascencio Pleitez",
      url: "https://github.com/javacachava",
    },
  ],
  keywords: [
    "desarrollador",
    "full-stack",
    "TypeScript",
    "Node.js",
    "React",
    "El Salvador",
    "portafolio",
  ],
  openGraph: {
    title: "Oliver Ascencio — Desarrollador Full-Stack",
    description:
      "Construyo software que resuelve problemas reales en El Salvador. Backend sólido, producto con propósito.",
    url: "https://oliver.wuju.dev",
    siteName: "Oliver Ascencio Portfolio",
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliver Ascencio — Desarrollador Full-Stack",
    description:
      "Construyo software que resuelve problemas reales en El Salvador.",
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
