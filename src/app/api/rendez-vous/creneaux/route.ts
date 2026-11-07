import { getBookingType } from "@/lib/booking/config";
import { availableSlots } from "@/lib/booking/slots";

// Créneaux libres d'un type de rendez-vous, lus en direct dans l'agenda Google de Ben.
export async function GET(request: Request) {
  const type = getBookingType(new URL(request.url).searchParams.get("type"));
  if (!type) return Response.json({ error: "Type de rendez-vous inconnu." }, { status: 400 });
  try {
    const slots = await availableSlots(type);
    return Response.json(
      { slots: slots.map((s) => new Date(s).toISOString()), durationMin: type.durationMin },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error("[rendez-vous] créneaux indisponibles", e);
    return Response.json({ error: "Agenda momentanément indisponible." }, { status: 503 });
  }
}
