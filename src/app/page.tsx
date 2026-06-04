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

export default function Home() {
  return (
    <>
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
