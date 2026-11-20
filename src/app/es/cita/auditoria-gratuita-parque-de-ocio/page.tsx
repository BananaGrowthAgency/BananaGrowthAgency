import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Booking } from "@/components/booking/booking";
import { bookingTypeFor } from "@/lib/booking/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Auditoría gratuita para parques de ocio",
    description:
      "Reserva tu auditoría gratuita de 30 minutos: identificamos juntos tus mejores palancas para llenar tu parque.",
    path: "/rendez-vous/audit-offert-parc-de-loisir",
    locale: "es",
  }),
  robots: { index: false, follow: true },
};

export default function AuditoriaGratuitaPage() {
  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl">
          <Booking type={bookingTypeFor("audit", "es")} locale="es" />
        </div>
      </main>
      <Footer locale="es" />
    </>
  );
}
