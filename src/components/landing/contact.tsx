"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Reveal } from "@/components/reveal";

const ELFSIGHT_APP_CLASS = "elfsight-app-601ffa1e-33b9-4f7e-bee9-ca84346fcf7b";
const STYLE_ID = "bb-neon-elfsight-form";

/* Le formulaire Elfsight est rendu dans un shadow DOM (ouvert) : le CSS global
   du site ne peut pas l'atteindre. On injecte donc ces règles DANS le shadow
   root pour harmoniser le formulaire avec la DA néon du site. */
const NEON_FORM_CSS = `
  form { width: 100% !important; }

  /* Boîte visible du champ (Elfsight : .es-fields-short-text, -long-text, …).
     :not(#bb) booste la spécificité pour battre les feuilles de style
     adoptées (constructable stylesheets) d'Elfsight. */
  [class*="es-fields"]:not(#bb) {
    background: rgba(4, 5, 15, 0.55) !important;
    border: 1px solid rgba(255, 255, 255, 0.14) !important;
    border-radius: 14px !important;
    box-shadow: none !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
  }

  [class*="es-fields"]:not(#bb):focus-within {
    border-color: rgba(255, 46, 154, 0.85) !important;
    box-shadow: 0 0 0 1px rgba(255, 46, 154, 0.45),
                0 0 22px rgba(255, 46, 154, 0.22) !important;
  }

  input:not(#bb), textarea:not(#bb), select:not(#bb) {
    background: transparent !important;
    color: #f6f4fb !important;
    font-size: 16px !important;
    border-radius: 14px !important;
  }

  textarea:not(#bb) { resize: vertical !important; }

  input::placeholder, textarea::placeholder {
    color: rgba(246, 244, 251, 0.4) !important;
  }

  label:not(#bb) {
    color: rgba(246, 244, 251, 0.72) !important;
    font-weight: 500 !important;
  }

  button, input[type="submit"], [class*="ButtonContainer"] {
    border: none !important;
    border-radius: 9999px !important;
    background: linear-gradient(90deg, #ffd21e 0%, #ff7a18 48%, #ff2e9a 100%) !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    min-height: 54px !important;
    cursor: pointer !important;
    box-shadow: 0 0 28px rgba(255, 46, 154, 0.3),
                0 0 22px rgba(255, 122, 24, 0.16) !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease !important;
  }

  button:hover, input[type="submit"]:hover, [class*="ButtonContainer"]:hover {
    transform: translateY(-2px) !important;
    filter: saturate(1.08) !important;
    box-shadow: 0 0 42px rgba(255, 46, 154, 0.42),
                0 0 32px rgba(255, 122, 24, 0.24) !important;
  }

  button:active, input[type="submit"]:active, [class*="ButtonContainer"]:active {
    transform: translateY(0) !important;
  }
`;

function useNeonElfsightForm() {
  useEffect(() => {
    let shadowObserver: MutationObserver | null = null;

    const addStyle = (sr: ShadowRoot) => {
      if (sr.getElementById(STYLE_ID)) return;
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = NEON_FORM_CSS;
      sr.appendChild(style);
    };

    const inject = () => {
      const app = document.querySelector("." + ELFSIGHT_APP_CLASS);
      if (!app) return;

      let host: Element | null = null;
      for (const el of app.querySelectorAll("*")) {
        if (el.shadowRoot) {
          host = el;
          break;
        }
      }
      if (!host || !host.shadowRoot) return;

      const sr = host.shadowRoot;
      if (!sr.querySelector("form")) return;

      addStyle(sr);

      // Réinjecte si Elfsight re-render le formulaire (ex. après envoi).
      if (!shadowObserver) {
        shadowObserver = new MutationObserver(() => addStyle(sr));
        shadowObserver.observe(sr, { childList: true, subtree: true });
      }
    };

    // Elfsight se charge en asynchrone : on retente jusqu'à ce que le form existe.
    inject();
    const interval = setInterval(inject, 500);
    const bodyObserver = new MutationObserver(inject);
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    const stop = setTimeout(() => clearInterval(interval), 25000);

    return () => {
      clearInterval(interval);
      clearTimeout(stop);
      bodyObserver.disconnect();
      shadowObserver?.disconnect();
    };
  }, []);
}

export function Contact() {
  useNeonElfsightForm();

  return (
    <section id="contact" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-4 neon-ring sm:p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            {/* Formulaire Elfsight (stylé via injection dans son shadow DOM) */}
            <div className="relative">
              <Script
                src="https://elfsightcdn.com/platform.js"
                strategy="afterInteractive"
              />
              <div
                className={ELFSIGHT_APP_CLASS}
                data-elfsight-app-lazy
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
