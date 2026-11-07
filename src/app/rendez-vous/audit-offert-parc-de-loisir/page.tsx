import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Booking } from "@/components/booking/booking";
import { BOOKING_TYPES } from "@/lib/booking/config";

export const metadata: Metadata = {
  title: "Audit offert pour parcs de loisirs — Banana Growth Agency",
  description:
    "Réservez votre audit offert de 30 minutes : on identifie ensemble vos meilleures pistes pour remplir votre parc.",
  alternates: { canonical: "/rendez-vous/audit-offert-parc-de-loisir" },
  robots: { index: false, follow: true },
};

export default function AuditOffertPage() {
  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl">
          <Booking type={BOOKING_TYPES.audit} />
        </div>
      </main>
      <Footer />
    </>
  );
}
