import { BOOKING_TZ, type BookingType } from "./config";
import { getBookedStarts, getBusy, type Interval } from "./google";

const MIN = 60_000;
const DAY = 24 * 60 * MIN;

/** Décalage (ms) entre l'heure locale d'un fuseau et l'UTC à un instant donné. */
function tzOffset(at: number, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date(at))
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(at / 1000) * 1000;
}

/** Instant UTC correspondant à une heure locale (y, m 1-12, d, minutes depuis minuit) dans le fuseau. */
function zonedToUtc(y: number, m: number, d: number, minutes: number, timeZone: string): number {
  const guess = Date.UTC(y, m - 1, d, 0, minutes);
  const first = guess - tzOffset(guess, timeZone);
  return guess - tzOffset(first, timeZone);
}

/** Date locale (y, m, d, jour de semaine) d'un instant dans le fuseau. */
function localDate(at: number, timeZone: string) {
  const s = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(at));
  const [y, m, d] = s.split("-").map(Number);
  return { y, m, d, key: s, weekday: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}

function overlaps(a: Interval, list: Interval[]) {
  return list.some((b) => a.start < b.end && b.start < a.end);
}

/** Créneaux candidats d'après les horaires seuls (sans regarder l'agenda). */
function candidateSlots(type: BookingType, now: number): number[] {
  const out: number[] = [];
  const earliest = now + type.minNoticeMin * MIN;
  const today = localDate(now, BOOKING_TZ);
  for (let i = 0; i <= type.horizonDays; i++) {
    const day = localDate(Date.UTC(today.y, today.m - 1, today.d + i, 12), "UTC");
    for (const [from, to] of type.hours[day.weekday] ?? []) {
      for (let t = from * 60; t + type.durationMin <= to * 60; t += type.stepMin) {
        const start = zonedToUtc(day.y, day.m, day.d, t, BOOKING_TZ);
        if (start >= earliest) out.push(start);
      }
    }
  }
  return out;
}

function isFree(start: number, type: BookingType, busy: Interval[], booked: number[]): boolean {
  const end = start + type.durationMin * MIN;
  const window = { start: start - type.bufferBeforeMin * MIN, end: end + type.bufferAfterMin * MIN };
  if (overlaps(window, busy)) return false;
  if (type.maxPerDay) {
    const key = localDate(start, BOOKING_TZ).key;
    if (booked.filter((b) => localDate(b, BOOKING_TZ).key === key).length >= type.maxPerDay) return false;
  }
  return true;
}

async function loadCalendar(type: BookingType, from: number, to: number) {
  const timeMin = new Date(from - DAY);
  const timeMax = new Date(to + DAY);
  const [busy, booked] = await Promise.all([
    getBusy(timeMin, timeMax),
    type.maxPerDay ? getBookedStarts(type.key, timeMin, timeMax) : Promise.resolve([]),
  ]);
  return { busy, booked };
}

/** Créneaux libres (instants UTC en ms), triés. */
export async function availableSlots(type: BookingType, now = Date.now()): Promise<number[]> {
  const candidates = candidateSlots(type, now);
  if (!candidates.length) return [];
  const { busy, booked } = await loadCalendar(type, candidates[0], candidates[candidates.length - 1]);
  return candidates.filter((s) => isFree(s, type, busy, booked));
}

/** Revérifie un créneau juste avant de réserver (il a pu être pris entre-temps). */
export async function isSlotAvailable(type: BookingType, start: number, now = Date.now()): Promise<boolean> {
  if (!candidateSlots(type, now).includes(start)) return false;
  const { busy, booked } = await loadCalendar(type, start, start);
  return isFree(start, type, busy, booked);
}
