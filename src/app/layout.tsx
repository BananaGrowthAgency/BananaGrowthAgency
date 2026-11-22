import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Script from "next/script";
import { Inter, Bebas_Neue, Geist_Mono } from "next/font/google";
import "./globals.css";

const GTM_ID = "GTM-5PJDZ8HW";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Police de titres — Bebas Neue (haute, condensee, capitales).
const displayFont = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Banana Growth Agency — L'agence Growth qui vitamine votre croissance",
  description:
    "Agence de Growth Marketing : stratégie, data, SEO, paid, CRM, contenu et CRO. 10 ans d'expertise pour accélérer votre acquisition.",
  metadataBase: new URL(SITE_URL),
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
    <html suppressHydrationWarning
      lang="fr"
      className={`${inter.variable} ${displayFont.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Pages /es : langue du document en espagnol. Fait côté client pour
            garder tout le site en statique (lire le chemin côté serveur
            rendrait chaque page dynamique). Les hreflang portent le signal SEO. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(/^\\/es(\\/|$)/.test(location.pathname))document.documentElement.lang='es'",
          }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        {/* Bandeau « Accéder à nos replays » (webinaire Qweekle × Banana). */}
        <Script
          id="bandeau-webinaire"
          src="https://webinaire.banana-growth.agency/bandeau-webinaire.js"
          data-source="bga"
          data-mode="replays"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
