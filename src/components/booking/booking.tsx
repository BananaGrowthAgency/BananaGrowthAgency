"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Clock, Globe, Loader2, Video } from "lucide-react";
import type { BookingType } from "@/lib/booking/config";
import { readUtm } from "@/lib/utm";
import { cn } from "@/lib/utils";

/* Prise de rendez-vous maison (remplace Calendly) : calendrier des jours ouverts,
   créneaux libres lus dans l'agenda Google de Ben, puis formulaire. */

const field =
  "w-full rounded-[14px] border border-white/15 bg-[rgba(4,5,15,0.55)] px-4 py-3 text-base text-foreground placeholder:text-foreground/40 outline-none transition focus:border-pink/85 focus:shadow-[0_0_0_1px_rgba(255,46,154,0.45),0_0_22px_rgba(255,46,154,0.22)]";
const labelCls = "mb-1.5 block text-sm font-medium text-foreground/72";
const WEEKDAYS = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

const dayKey = (d: Date, tz: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

type SlotsResult = { slots: string[]; tz: string } | { error: string };

async function fetchSlots(key: string): Promise<SlotsResult> {
  try {
    const res = await fetch(`/api/rendez-vous/creneaux?type=${key}`, { cache: "no-store" });
    const body = (await res.json()) as { slots?: string[]; error?: string };
    if (!res.ok || !body.slots) throw new Error(body.error || "Agenda indisponible");
    let tz = "Europe/Paris";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || tz;
    } catch {
      /* fuseau par défaut */
    }
    return { slots: body.slots, tz };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Agenda indisponible" };
  }
}

export function Booking({ type }: { type: BookingType }) {
  const router = useRouter();
  const [tz, setTz] = useState("Europe/Paris");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [month, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "form">("pick");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const formStartedAt = useRef(0);
  const timesRef = useRef<HTMLDivElement>(null);

  function applySlots(r: SlotsResult) {
    if ("error" in r) return setLoadError(r.error);
    setSlots(r.slots);
    setLoadError("");
    setTz(r.tz);
  }
  const loadSlots = () => fetchSlots(type.key).then(applySlots);

  useEffect(() => {
    readUtm();
    router.prefetch("/rendez-vous/confirme");
    fetchSlots(type.key).then(applySlots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Créneaux regroupés par jour, dans le fuseau du visiteur.
  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const s of slots ?? []) {
      const k = dayKey(new Date(s), tz);
      map.set(k, [...(map.get(k) ?? []), s]);
    }
    return map;
  }, [slots, tz]);

  const firstDay = byDay.keys().next().value as string | undefined;
  const shownMonth = month ?? (firstDay ? { y: +firstDay.slice(0, 4), m: +firstDay.slice(5, 7) } : null);

  const fmtTime = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  const fmtDay = (k: string) =>
    new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(
      new Date(`${k}T12:00:00Z`),
    );
  const fmtSlotLong = (iso: string) => {
    const end = new Date(Date.parse(iso) + type.durationMin * 60_000).toISOString();
    const date = new Intl.DateTimeFormat("fr-FR", {
      timeZone: tz,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
    return `${fmtTime(iso)} – ${fmtTime(end)}, ${date}`;
  };
  const tzLabel = (() => {
    try {
      const name = new Intl.DateTimeFormat("fr-FR", { timeZone: tz, timeZoneName: "long" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value;
      return name ? name.charAt(0).toUpperCase() + name.slice(1) : tz;
    } catch {
      return tz;
    }
  })();

  // Grille du mois affiché (lundi en premier).
  const shownY = shownMonth?.y ?? 0;
  const shownM = shownMonth?.m ?? 0;
  const grid = useMemo(() => {
    if (!shownY) return [];
    const y = shownY;
    const m = shownM;
    const first = new Date(Date.UTC(y, m - 1, 1));
    const lead = (first.getUTCDay() + 6) % 7;
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: days }, (_, i) => `${y}-${String(m).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`),
    ];
  }, [shownY, shownM]);

  const monthKeys = [...byDay.keys()].map((k) => k.slice(0, 7));
  const curMonthKey = shownMonth ? `${shownMonth.y}-${String(shownMonth.m).padStart(2, "0")}` : "";
  const canPrev = monthKeys.some((k) => k < curMonthKey);
  const canNext = monthKeys.some((k) => k > curMonthKey);
  const shiftMonth = (delta: number) => {
    if (!shownMonth) return;
    const d = new Date(Date.UTC(shownMonth.y, shownMonth.m - 1 + delta, 1));
    setMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 });
  };

  function chooseSlot(s: string, at: number) {
    setSlot(s);
    setStep("form");
    setStatus("idle");
    setError("");
    formStartedAt.current = at;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) return;
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    const payload: Record<string, unknown> = {
      type: type.key,
      start: slot,
      confirm: form.get("confirm") === "on",
      elapsedMs: Math.round(e.timeStamp - formStartedAt.current),
      page: window.location.pathname,
      utm: readUtm(),
    };
    for (const q of type.questions) payload[q.name] = form.get(q.name);
    try {
      const res = await fetch("/api/rendez-vous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 409) {
        // Créneau pris entre-temps : on recharge et on renvoie au choix de l'horaire.
        setSlot(null);
        setStep("pick");
        await loadSlots();
        setStatus("error");
        setError(body.error || "Ce créneau vient d'être pris.");
        return;
      }
      if (!res.ok) throw new Error(body.error || "Réservation impossible");
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: "rendez_vous_reserve",
        booking_type: type.key,
      });
      const q = new URLSearchParams({ type: type.key, start: slot, tz });
      router.push(`/rendez-vous/confirme?${q}`);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Connexion impossible, réessayez dans un instant.",
      );
    }
  }

  const daySlots = day ? (byDay.get(day) ?? []) : [];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/80 neon-ring">
      <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-25" />
      <div className="relative grid md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        {/* Colonne de gauche : l'événement */}
        <aside className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
          {step === "form" && (
            <button
              type="button"
              onClick={() => setStep("pick")}
              className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink/40 text-pink transition hover:bg-pink/10"
              aria-label="Revenir au choix du créneau"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">Benjamin Joneau</p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground md:text-5xl">
            {type.title}
          </h1>
          <ul className="mt-6 space-y-3 text-sm text-foreground/75">
            <li className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-pink" /> {type.durationMin} min
            </li>
            <li className="flex items-start gap-3">
              <Video className="h-5 w-5 shrink-0 text-pink" /> Visio Google Meet, lien envoyé à la confirmation
            </li>
            {step === "form" && slot && (
              <li className="flex items-start gap-3 font-semibold text-foreground">
                <CalendarDays className="h-5 w-5 shrink-0 text-pink" /> {fmtSlotLong(slot)}
              </li>
            )}
            <li className="flex items-start gap-3">
              <Globe className="h-5 w-5 shrink-0 text-pink" /> {tzLabel}
            </li>
          </ul>
          <div className="mt-6 space-y-3 text-sm leading-relaxed text-foreground/65">
            {type.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </aside>

        {/* Colonne de droite : choix du créneau, puis formulaire */}
        <div className="p-6 md:p-8">
          {step === "pick" ? (
            <>
              <h2 className="font-display text-3xl uppercase tracking-tight text-foreground">
                Choisissez la date et l&apos;heure
              </h2>
              {status === "error" && error && (
                <p role="alert" className="mt-3 text-sm text-pink">
                  {error}
                </p>
              )}

              {loadError ? (
                <div className="mt-8 text-sm text-foreground/70">
                  <p>{loadError}</p>
                  <button type="button" onClick={() => void loadSlots()} className="mt-3 text-pink underline">
                    Réessayer
                  </button>
                </div>
              ) : !slots ? (
                <div className="mt-10 flex items-center gap-3 text-foreground/60">
                  <Loader2 className="h-5 w-5 animate-spin" /> Chargement des disponibilités…
                </div>
              ) : !slots.length ? (
                <p className="mt-8 text-sm text-foreground/70">
                  Aucun créneau libre dans les prochains jours. Écrivez-nous à{" "}
                  <a href="mailto:hello@banana-growth.agency" className="text-pink underline">
                    hello@banana-growth.agency
                  </a>
                  .
                </p>
              ) : (
                <div className={cn("mt-6 grid gap-8", day && "lg:grid-cols-[minmax(0,1fr)_200px]")}>
                  {/* Calendrier */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => shiftMonth(-1)}
                        disabled={!canPrev}
                        aria-label="Mois précédent"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-white/10 disabled:opacity-25"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <p className="font-semibold capitalize text-foreground">
                        {shownMonth &&
                          new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", month: "long", year: "numeric" }).format(
                            new Date(Date.UTC(shownMonth.y, shownMonth.m - 1, 15)),
                          )}
                      </p>
                      <button
                        type="button"
                        onClick={() => shiftMonth(1)}
                        disabled={!canNext}
                        aria-label="Mois suivant"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-white/10 disabled:opacity-25"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {WEEKDAYS.map((w) => (
                        <span key={w} className="pb-2 text-xs uppercase text-foreground/45">
                          {w}
                        </span>
                      ))}
                      {grid.map((k, i) => {
                        if (!k) return <span key={`x${i}`} />;
                        const open = byDay.has(k);
                        const selected = k === day;
                        return (
                          <button
                            key={k}
                            type="button"
                            disabled={!open}
                            onClick={() => {
                              setDay(k);
                              // Sur mobile, les horaires s'affichent sous le calendrier : on les amène à l'écran.
                              requestAnimationFrame(() =>
                                timesRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
                              );
                            }}
                            aria-pressed={selected}
                            aria-label={fmtDay(k)}
                            className={cn(
                              "mx-auto flex aspect-square w-full max-w-[46px] items-center justify-center rounded-full text-sm transition",
                              open
                                ? "bg-pink/15 font-semibold text-pink hover:bg-pink/30"
                                : "cursor-default text-foreground/30",
                              selected && "bg-spectrum text-white hover:bg-spectrum",
                            )}
                          >
                            {+k.slice(8)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horaires du jour choisi */}
                  {day && (
                    <div ref={timesRef} className="scroll-mt-24">
                      <p className="mb-3 font-semibold text-foreground first-letter:uppercase">{fmtDay(day)}</p>
                      <div className="grid max-h-[22rem] grid-cols-2 gap-2 overflow-y-auto pr-1 lg:grid-cols-1">
                        {daySlots.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={(e) => chooseSlot(s, e.timeStamp)}
                            className="rounded-xl border border-pink/45 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-transparent hover:bg-spectrum hover:text-white"
                          >
                            {fmtTime(s)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <h2 className="font-display text-3xl uppercase tracking-tight text-foreground sm:col-span-2">
                Vos informations
              </h2>
              {type.questions.map((q) => {
                const id = `bk-${q.name}`;
                const wide = q.type === "textarea" || q.type === "yesno" || q.name === "company";
                return (
                  <div key={q.name} className={cn(wide && "sm:col-span-2")}>
                    <label htmlFor={id} className={labelCls}>
                      {q.label}
                      {q.required && " *"}
                    </label>
                    {q.type === "textarea" ? (
                      <textarea id={id} name={q.name} rows={4} className={`${field} resize-y`} />
                    ) : q.type === "yesno" ? (
                      <select id={id} name={q.name} required={q.required} defaultValue="" className={field}>
                        <option value="" disabled>
                          Sélectionnez…
                        </option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                      </select>
                    ) : (
                      <input
                        id={id}
                        name={q.name}
                        type={q.name === "email" ? "email" : q.type}
                        required={q.required}
                        autoComplete={q.autoComplete}
                        className={field}
                      />
                    )}
                  </div>
                );
              })}

              {/* Piège à robots : hors écran, hors tabulation, ignoré des lecteurs d'écran. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  <input type="checkbox" name="confirm" tabIndex={-1} />
                  Confirmer
                </label>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="relative inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-spectrum px-6 text-base font-extrabold text-white neon-ring-strong transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Réservation…
                    </>
                  ) : (
                    "Confirmer le rendez-vous"
                  )}
                </button>
                {status === "error" && error && (
                  <p role="alert" className="mt-3 text-center text-sm text-pink">
                    {error}
                  </p>
                )}
                <p className="mt-4 text-center text-xs text-foreground/45">
                  Vous recevrez une invitation Google Agenda avec le lien de la visio. Vos coordonnées servent uniquement
                  à préparer et suivre ce rendez-vous.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
