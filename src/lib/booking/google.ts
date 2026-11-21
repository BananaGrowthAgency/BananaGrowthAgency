/* Côté serveur uniquement (lit les secrets Google).
   Accès à l'agenda Google de Ben (projet Google Cloud « Banana RDV », compte ben.joneau@gmail.com).
   Jeton longue durée dans GOOGLE_REFRESH_TOKEN ; niveaux calendar.events + calendar.freebusy. */

const API = "https://www.googleapis.com/calendar/v3";
let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) throw new Error("Accès Google Agenda non configuré");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  const body = (await res.json()) as { access_token?: string; expires_in?: number; error?: string };
  if (!body.access_token) throw new Error(`Jeton Google refusé : ${body.error ?? res.status}`);
  cached = { token: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cached.token;
}

async function gcal<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google Agenda ${res.status} : ${(await res.text()).slice(0, 300)}`);
  return res.json() as Promise<T>;
}

/** Agendas qui rendent Ben indisponible (par défaut : son agenda principal). */
function busyCalendars(): string[] {
  return (process.env.GOOGLE_BUSY_CALENDARS || "primary").split(",").map((s) => s.trim()).filter(Boolean);
}

export type Interval = { start: number; end: number };

export async function getBusy(timeMin: Date, timeMax: Date): Promise<Interval[]> {
  const data = await gcal<{ calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }> }>(
    "/freeBusy",
    {
      method: "POST",
      body: JSON.stringify({
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: busyCalendars().map((id) => ({ id })),
      }),
    },
  );
  return Object.values(data.calendars).flatMap((c) =>
    (c.busy ?? []).map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) })),
  );
}

/** Rendez-vous déjà pris via le site pour ce type (pour la limite par jour). */
export async function getBookedStarts(bookingType: string, timeMin: Date, timeMax: Date): Promise<number[]> {
  const q = new URLSearchParams({
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: "true",
    privateExtendedProperty: `bookingType=${bookingType}`,
    maxResults: "250",
  });
  const data = await gcal<{ items?: { status?: string; start?: { dateTime?: string } }[] }>(`/calendars/primary/events?${q}`);
  return (data.items ?? [])
    .filter((e) => e.status !== "cancelled" && e.start?.dateTime)
    .map((e) => Date.parse(e.start!.dateTime!));
}

export type CreatedEvent = { id: string; htmlLink?: string; hangoutLink?: string };

export async function createEvent(input: {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  timeZone: string;
  attendee: { email: string; displayName?: string };
  bookingType: string;
}): Promise<CreatedEvent> {
  return gcal<CreatedEvent>("/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all", {
    method: "POST",
    body: JSON.stringify({
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.start.toISOString(), timeZone: input.timeZone },
      end: { dateTime: input.end.toISOString(), timeZone: input.timeZone },
      attendees: [input.attendee],
      conferenceData: {
        createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } },
      },
      extendedProperties: { private: { bookingType: input.bookingType, source: "site" } },
      reminders: { useDefault: true },
    }),
  });
}
