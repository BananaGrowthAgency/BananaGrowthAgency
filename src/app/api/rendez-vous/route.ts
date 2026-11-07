import { BOOKING_TZ, getBookingType } from "@/lib/booking/config";
import { createEvent } from "@/lib/booking/google";
import { isSlotAvailable } from "@/lib/booking/slots";

// Réservation d'un rendez-vous : événement Google Agenda (Meet + invitation au prospect),
// puis lead dans le CRM (même circuit que le formulaire de contact, qui prévient Ben par email).

const CRM_ENDPOINT = process.env.CRM_CONTACT_ENDPOINT ?? "https://crm.banana-growth.agency/api/formulaire-contact";
const MIN_FILL_MS = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clip = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function formatParis(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: BOOKING_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

async function sendToCrm(payload: Record<string, unknown>) {
  const secret = process.env.CONTACT_FORM_SECRET;
  if (!secret) throw new Error("CONTACT_FORM_SECRET manquante");
  const res = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      ...(process.env.CRM_BYPASS_TOKEN && { "x-vercel-protection-bypass": process.env.CRM_BYPASS_TOKEN }),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`CRM ${res.status} : ${(await res.text()).slice(0, 200)}`);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const type = getBookingType(typeof body?.type === "string" ? body.type : null);
  if (!body || !type) return Response.json({ error: "Requête invalide." }, { status: 400 });

  const answers: Record<string, string> = {};
  for (const q of type.questions) answers[q.name] = clip(body[q.name], q.type === "textarea" ? 3000 : 300);
  const email = answers.email.toLowerCase();

  // Anti-robot : on répond « ok » sans rien réserver, et on garde une trace.
  if (body.confirm === true || (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS)) {
    console.warn("[rendez-vous] écarté (robot probable)", { email, elapsedMs: body.elapsedMs });
    return Response.json({ ok: true });
  }

  const missing = type.questions.filter((q) => q.required && !answers[q.name]);
  if (missing.length || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Merci de remplir tous les champs obligatoires avec un email valide." }, { status: 400 });
  }

  const start = Date.parse(typeof body.start === "string" ? body.start : "");
  if (!Number.isFinite(start)) return Response.json({ error: "Créneau invalide." }, { status: 400 });

  try {
    if (!(await isSlotAvailable(type, start))) {
      return Response.json({ error: "Ce créneau vient d'être pris. Choisissez-en un autre." }, { status: 409 });
    }
  } catch (e) {
    console.error("[rendez-vous] vérification impossible", e);
    return Response.json({ error: "Agenda momentanément indisponible." }, { status: 503 });
  }

  const startDate = new Date(start);
  const end = new Date(start + type.durationMin * 60_000);
  const fullName = [answers.firstName, answers.lastName].filter(Boolean).join(" ");
  const when = formatParis(startDate);
  const yesNo = (v: string) => (v === "oui" ? "Oui" : v === "non" ? "Non" : v);

  const details = type.questions
    .filter((q) => !["firstName", "lastName", "email"].includes(q.name) && answers[q.name])
    .map((q) => `${q.label.replace(/\s*\?$/, "")} : ${q.type === "yesno" ? yesNo(answers[q.name]) : answers[q.name]}`);

  let event;
  try {
    event = await createEvent({
      summary: `${type.eventLabel} Banana Growth × ${answers.company || fullName}`,
      description: [
        `${type.title} — réservé sur banana-growth.agency`,
        "",
        `Contact : ${fullName} <${email}>`,
        ...details,
      ].join("\n"),
      start: startDate,
      end,
      timeZone: BOOKING_TZ,
      attendee: { email, displayName: fullName },
      bookingType: type.key,
    });
  } catch (e) {
    console.error("[rendez-vous] création de l'événement impossible", e, { email, start: startDate.toISOString() });
    return Response.json({ error: "La réservation n'a pas pu aboutir. Réessayez dans un instant." }, { status: 502 });
  }

  // Le rendez-vous est posé : un échec du CRM ne doit pas le faire échouer.
  try {
    await sendToCrm({
      firstName: answers.firstName,
      lastName: answers.lastName,
      email,
      phone: answers.phone,
      company: answers.company || fullName,
      message: [`📅 ${type.title} réservé : ${when} (heure de Paris)`, ...details].join("\n"),
      page: clip(body.page, 200) || type.path,
      utm: body.utm,
    });
  } catch (e) {
    console.error("[rendez-vous] lead non transmis au CRM", e, { email });
  }

  return Response.json({ ok: true, start: startDate.toISOString(), meet: event.hangoutLink ?? null });
}
