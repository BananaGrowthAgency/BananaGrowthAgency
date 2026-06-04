import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Banana Growth Agency — L'agence Growth qui vitamine votre croissance",
  description:
    "Agence de Growth Marketing : stratégie, data, SEO, paid, CRM, contenu et CRO. 10 ans d'expertise pour accélérer votre acquisition.",
  metadataBase: new URL("https://www.banana-growth.agency"),
  openGraph: {
    title: "Banana Growth Agency",
    description:
      "L'agence de Growth Marketing qui vitamine votre croissance.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
