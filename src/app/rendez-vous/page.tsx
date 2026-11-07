import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Booking } from "@/components/booking/booking";
import { BOOKING_TYPES } from "@/lib/booking/config";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — Banana Growth Agency",
  description: "Réservez 30 minutes en visio avec Benjamin Joneau, fondateur de Banana Growth Agency.",
  alternates: { canonical: "/rendez-vous" },
  robots: { index: false, follow: true },
};

export default function RendezVousPage() {
  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl">
          <Booking type={BOOKING_TYPES.rdv} />
        </div>
      </main>
      <Footer />
    </>
  );
}
