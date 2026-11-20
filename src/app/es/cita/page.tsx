import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Booking } from "@/components/booking/booking";
import { bookingTypeFor } from "@/lib/booking/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Reservar una cita",
    description: "Reserva 30 minutos por videollamada con Benjamin Joneau, fundador de Banana Growth Agency.",
    path: "/rendez-vous",
    locale: "es",
  }),
  robots: { index: false, follow: true },
};

export default function CitaPage() {
  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl">
          <Booking type={bookingTypeFor("rdv", "es")} locale="es" />
        </div>
      </main>
      <Footer locale="es" />
    </>
  );
}
