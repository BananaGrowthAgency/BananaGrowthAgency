import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Clients } from "@/components/landing/clients";
import { Manifesto } from "@/components/landing/manifesto";
import { Differentiation } from "@/components/landing/differentiation";
import { Services } from "@/components/landing/services";
import { Testimonial } from "@/components/landing/testimonial";
import { Process } from "@/components/landing/process";
import { UseCases } from "@/components/landing/use-cases";
import { Cta } from "@/components/landing/cta";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";
import { SITE_URL } from "@/lib/site";
import {
  HERO_ES,
  HERO_STATS_ES,
  PROCESS_ES,
  TESTIMONIALS_ES,
} from "@/lib/es/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Agencia de Growth Marketing que vitamina tu crecimiento",
  description:
    "Agencia de Growth Marketing: estrategia, data, SEO, paid, CRM, contenidos y CRO. 10 años de experiencia para acelerar tu adquisición.",
  path: "/",
  locale: "es",
});

/* Marcado Organization, versión española. */
const ORGANIZACION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Banana Growth Agency",
  alternateName: "Banana Growth",
  url: `${SITE_URL}/es`,
  logo: `${SITE_URL}/logo/logoCol.png`,
  description:
    "Agencia de Growth Marketing especializada en el sector del ocio: estrategia, publicidad, SEO, tracking y contenidos.",
  areaServed: ["FR", "ES"],
  inLanguage: "es",
  sameAs: ["https://www.instagram.com/bananagrowthagency/"],
};

export default function InicioEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZACION) }}
      />
      <Navbar />
      <main>
        <Hero locale="es" content={HERO_ES} stats={HERO_STATS_ES} />
        <Clients locale="es" />
        <Manifesto locale="es" />
        <Differentiation locale="es" />
        <Services locale="es" />
        <Testimonial locale="es" items={TESTIMONIALS_ES} />
        <Process locale="es" steps={PROCESS_ES} />
        <UseCases locale="es" />
        <Cta locale="es" />
        <Contact locale="es" />
      </main>
      <Footer locale="es" />
    </>
  );
}
