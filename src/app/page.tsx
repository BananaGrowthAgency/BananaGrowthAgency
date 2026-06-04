import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Clients } from "@/components/landing/clients";
import { Services } from "@/components/landing/services";
import { Process } from "@/components/landing/process";
import { UseCases } from "@/components/landing/use-cases";
import { Testimonial } from "@/components/landing/testimonial";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Process />
        <Testimonial />
        <UseCases />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
