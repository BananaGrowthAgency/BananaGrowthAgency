/* Prise de rendez-vous maison (remplace Calendly).
   Réglages repris des deux types d'événement Calendly de Ben (novembre 2026). */

export const BOOKING_TZ = "Europe/Paris";

export type BookingQuestion = {
  name: string;
  label: string;
  type: "text" | "tel" | "textarea" | "yesno";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

export type BookingType = {
  key: BookingKey;
  path: string;
  title: string;
  /** Titre court de l'événement dans l'agenda. */
  eventLabel: string;
  description: string[];
  durationMin: number;
  stepMin: number;
  bufferBeforeMin: number;
  bufferAfterMin: number;
  maxPerDay?: number;
  horizonDays: number;
  minNoticeMin: number;
  /** Plages ouvertes par jour de semaine (0 = dimanche), en heures décimales, heure de Paris. */
  hours: Partial<Record<number, [number, number][]>>;
  questions: BookingQuestion[];
};

export type BookingKey = "audit" | "rdv";

// « Heures de travail » de Calendly : lun–jeu 10 h–20 h, ven 10 h–17 h, sam 10 h–15 h.
const WORK_HOURS: BookingType["hours"] = {
  1: [[10, 20]],
  2: [[10, 20]],
  3: [[10, 20]],
  4: [[10, 20]],
  5: [[10, 17]],
  6: [[10, 15]],
};
const WEEKDAYS_ONLY = Object.fromEntries(Object.entries(WORK_HOURS).filter(([d]) => d !== "6"));

export const BOOKING_TYPES: Record<BookingKey, BookingType> = {
  audit: {
    key: "audit",
    path: "/rendez-vous/audit-offert-parc-de-loisir",
    title: "Audit offert acteurs du loisir expérientiel",
    eventLabel: "Audit offert",
    description: [
      "Vous proposez des activités de loisirs ou des expériences uniques à vivre, en intérieur comme en extérieur ?",
      "Chez Banana Growth Agency, nous avons plus de 5 ans d’expérience dans la génération de fréquentation pour les acteurs du loisir actif et expérientiel.",
      "Prenez rendez-vous et identifions ensemble vos meilleures pistes d’optimisation. 🚀",
    ],
    durationMin: 30,
    stepMin: 30,
    bufferBeforeMin: 60,
    bufferAfterMin: 60,
    maxPerDay: 2,
    horizonDays: 15,
    minNoticeMin: 24 * 60,
    hours: WORK_HOURS,
    questions: [
      { name: "firstName", label: "Prénom", type: "text", required: true, autoComplete: "given-name" },
      { name: "lastName", label: "Nom", type: "text", required: true, autoComplete: "family-name" },
      { name: "email", label: "Email", type: "text", required: true, autoComplete: "email" },
      { name: "company", label: "Comment s'appelle votre parc de loisirs ?", type: "text", required: true, autoComplete: "organization" },
      { name: "googleAds", label: "Faites-vous de la publicité sur Google ?", type: "yesno", required: true },
      { name: "metaAds", label: "Faites-vous de la publicité sur Instagram et Facebook ?", type: "yesno", required: true },
    ],
  },
  rdv: {
    key: "rdv",
    path: "/rendez-vous",
    title: "Rendez-vous de 30 min",
    eventLabel: "Rendez-vous",
    description: [
      "30 minutes en visio pour parler de votre croissance : vos objectifs, vos canaux actuels et ce qu'on peut faire ensemble.",
    ],
    durationMin: 30,
    stepMin: 30,
    bufferBeforeMin: 15,
    bufferAfterMin: 15,
    horizonDays: 15,
    minNoticeMin: 24 * 60,
    hours: WEEKDAYS_ONLY,
    questions: [
      { name: "firstName", label: "Prénom", type: "text", required: true, autoComplete: "given-name" },
      { name: "lastName", label: "Nom", type: "text", required: true, autoComplete: "family-name" },
      { name: "email", label: "Email", type: "text", required: true, autoComplete: "email" },
      { name: "phone", label: "Téléphone", type: "tel", required: true, autoComplete: "tel" },
      { name: "company", label: "Entreprise", type: "text", autoComplete: "organization" },
      {
        name: "message",
        label: "Tout ce qui pourra être utile à la préparation de notre échange",
        type: "textarea",
      },
    ],
  },
};

export function getBookingType(key: string | null | undefined): BookingType | null {
  return key && key in BOOKING_TYPES ? BOOKING_TYPES[key as BookingKey] : null;
}
