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

/* Balisage Organization : aide Google à rattacher les recherches de marque
   (« Banana Growth », « agence banana ») à l'accueil. */
const ORGANISATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Banana Growth Agency",
  alternateName: "Banana Growth",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logoCol.png`,
  description:
    "Agence de Growth Marketing spécialisée dans les acteurs du loisir : stratégie, publicité, SEO, tracking et contenus.",
  areaServed: "FR",
  sameAs: ["https://www.instagram.com/bananagrowthagency/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATION) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Manifesto />
        <Differentiation />
        <Services />
        <Testimonial />
        <Process />
        <UseCases />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
