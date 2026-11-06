"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

/* Formulaire de contact maison (remplace Elfsight) : /api/contact range le lead
   dans le CRM (source « Formulaire de contact ») et prévient Ben par email.
   Après envoi : /remerciements, où GTM compte la conversion. */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORE = "bb-utm";

const field =
  "w-full rounded-[14px] border border-white/15 bg-[rgba(4,5,15,0.55)] px-4 py-3 text-base text-foreground placeholder:text-foreground/40 outline-none transition focus:border-pink/85 focus:shadow-[0_0_0_1px_rgba(255,46,154,0.45),0_0_22px_rgba(255,46,154,0.22)]";
const label = "mb-1.5 block text-sm font-medium text-foreground/72";

/** UTM de l'arrivée sur le site, gardées pour la session (le formulaire est souvent sur une autre page). */
function readUtm(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  const sp = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = sp.get(k);
    if (v) fromUrl[k] = v;
  }
  try {
    if (Object.keys(fromUrl).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(fromUrl));
    else return JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}");
  } catch {
    /* stockage indisponible : on garde ce que l'URL donne */
  }
  return fromUrl;
}

export function Contact() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = performance.now();
    readUtm(); // mémorise les UTM dès l'arrivée
    router.prefetch("/remerciements");
  }, [router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          email: form.get("email"),
          phone: form.get("phone"),
          company: form.get("company"),
          message: form.get("message"),
          // Case piège invisible : un robot la coche, un humain (ou son gestionnaire de mots de passe) jamais.
          confirm: form.get("confirm") === "on",
          elapsedMs: Math.round(performance.now() - startedAt.current),
          page: window.location.pathname,
          utm: readUtm(),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Envoi impossible");
      }
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "formulaire_contact" });
      router.push("/remerciements");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Connexion impossible, réessayez dans un instant.",
      );
    }
  }

  return (
    <section id="contact" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-5 neon-ring sm:p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative">
              <h2 className="text-center font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-[5.5rem]">
                Remplissons <span className="block text-spectrum">votre parc</span>
              </h2>
              <p className="mt-4 text-center text-foreground/70 md:text-lg">
                Parlez-nous de votre parc : on vous recontacte sous 24&nbsp;h ouvrées.
              </p>

              <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-first" className={label}>
                    Prénom *
                  </label>
                  <input id="cf-first" name="firstName" required autoComplete="given-name" className={field} />
                </div>
                <div>
                  <label htmlFor="cf-last" className={label}>
                    Nom
                  </label>
                  <input id="cf-last" name="lastName" autoComplete="family-name" className={field} />
                </div>
                <div>
                  <label htmlFor="cf-email" className={label}>
                    Email *
                  </label>
                  <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
                </div>
                <div>
                  <label htmlFor="cf-phone" className={label}>
                    Téléphone
                  </label>
                  <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cf-company" className={label}>
                    Parc ou entreprise *
                  </label>
                  <input id="cf-company" name="company" required autoComplete="organization" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cf-message" className={label}>
                    Votre projet
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    placeholder="Vos objectifs, vos canaux actuels, votre saison…"
                    className={`${field} resize-y`}
                  />
                </div>

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
                    className="group relative inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-spectrum px-6 text-base font-extrabold text-white neon-ring-strong transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(255,46,154,0.42),0_0_32px_rgba(255,122,24,0.24)] active:translate-y-0 disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Envoi…
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p role="alert" className="mt-3 text-center text-sm text-pink">
                      {error} Vous pouvez aussi écrire à{" "}
                      <a href="mailto:hello@banana-growth.agency" className="underline">
                        hello@banana-growth.agency
                      </a>
                      .
                    </p>
                  )}
                  <p className="mt-4 text-center text-xs text-foreground/45">
                    Vos coordonnées servent uniquement à vous recontacter.{" "}
                    <Link href="/politique-de-confidentialite" className="underline hover:text-foreground/70">
                      Politique de confidentialité
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
