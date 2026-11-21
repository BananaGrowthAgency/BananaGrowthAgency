import { Check } from "lucide-react";
import { RDV_URL } from "@/lib/site";
import { lien, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";
import { CtaButton } from "@/components/cta-button";

/**
 * L'offre en deux piliers : générer les contacts (acquisition), puis les
 * traiter mieux et plus vite (optimisation : CRM, devis automatisés,
 * réponses préparées, OS opérationnel). Forfait sur-mesure ; on peut ne
 * prendre que l'optimisation si l'acquisition tourne déjà.
 *
 * Bloc commun à l'accueil, à la page parcs et à toutes les fiches secteurs.
 * Pas de prix : on n'en affiche jamais publiquement.
 */

const TEXTES = {
  fr: {
    eyebrow: "Notre approche",
    titre: ["Générer vos contacts.", "Puis mieux les traiter."],
    intro: (votre?: string) =>
      `Tout le monde n'a pas besoin de la même chose. Nous travaillons au forfait, sur-mesure : d'abord l'acquisition, puis l'optimisation de tout ce qui se passe après le premier contact${votre ? `, pour ${votre}` : ""}.`,
    piliers: [
      {
        num: "01",
        icon: "rocket",
        nom: "Acquisition",
        titre: "Plus de contacts entrants",
        points: [
          "Campagnes Google Ads et Meta Ads",
          "Référencement local et fiche Google",
          "Contenus, vidéos et influence",
          "Tracking : vous savez d'où vient chaque réservation",
        ],
      },
      {
        num: "02",
        icon: "automation",
        nom: "Optimisation",
        titre: "Un système qui traite vos contacts",
        points: [
          "Un CRM à votre image, où chaque contact est suivi",
          "Des devis générés automatiquement",
          "Des réponses préparées pour chaque demande, réunies dans une seule plateforme",
          "Votre propre OS opérationnel : relances, planning, tableaux de bord",
        ],
      },
    ],
    resultat:
      "Résultat : moins de temps perdu dans l'opérationnel, plus de temps pour l'essentiel, la vente.",
    seul: "Vous avez déjà un système d'acquisition ?",
    seulTexte:
      "Nous pouvons intervenir uniquement sur l'optimisation de vos process : CRM, devis, réponses automatisées, outils internes.",
    forfait: "Forfait sur-mesure, construit selon vos besoins.",
    cta: "Parler de mon projet",
  },
  es: {
    eyebrow: "Nuestro enfoque",
    titre: ["Generar tus contactos.", "Y gestionarlos mejor."],
    intro: (votre?: string) =>
      `No todos los negocios necesitan lo mismo. Trabajamos con una cuota a medida: primero la captación, después la optimización de todo lo que pasa tras el primer contacto${votre ? `, para ${votre}` : ""}.`,
    piliers: [
      {
        num: "01",
        icon: "rocket",
        nom: "Captación",
        titre: "Más contactos entrantes",
        points: [
          "Campañas de Google Ads y Meta Ads",
          "SEO local y ficha de Google",
          "Contenidos, vídeos e influencia",
          "Tracking: sabes de dónde viene cada reserva",
        ],
      },
      {
        num: "02",
        icon: "automation",
        nom: "Optimización",
        titre: "Un sistema que gestiona tus contactos",
        points: [
          "Un CRM a tu medida, donde se sigue cada contacto",
          "Presupuestos generados automáticamente",
          "Respuestas preparadas para cada solicitud, reunidas en una sola plataforma",
          "Tu propio sistema operativo: recordatorios, agenda, cuadros de mando",
        ],
      },
    ],
    resultat:
      "Resultado: menos tiempo perdido en lo operativo, más tiempo para lo esencial, vender.",
    seul: "¿Ya tienes un sistema de captación?",
    seulTexte:
      "Podemos trabajar solo en la optimización de tus procesos: CRM, presupuestos, respuestas automatizadas, herramientas internas.",
    forfait: "Cuota a medida, según tus necesidades.",
    cta: "Hablar de mi proyecto",
  },
} as const;

export function OffrePiliers({
  locale = "fr",
  votre,
}: {
  locale?: Locale;
  /** Sur une fiche secteur : « votre karting », « tu camping »… */
  votre?: string;
}) {
  const t = TEXTES[locale];
  return (
    <section id="approche" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-base uppercase tracking-[0.2em] text-pink/80 md:text-xl">
            {t.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.titre[0]}{" "}
            <span className="text-spectrum">{t.titre[1]}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
            {t.intro(votre)}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {t.piliers.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1} className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-6 neon-ring md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-30" />
                <div className="relative flex items-center gap-4">
                  <NeonIcon
                    src={`/canva/icons/${p.icon}.png`}
                    className="h-16 w-16 object-contain md:h-20 md:w-20"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-pink/80">
                      {p.num} · {p.nom}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
                      {p.titre}
                    </h3>
                  </div>
                </div>
                <ul className="relative mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-base text-foreground/70">
                      <Check className="mt-1 h-4 w-4 flex-none text-pink" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {t.resultat}
          </p>
        </Reveal>

        {/* Bloc dédié : l'optimisation seule, pour qui a déjà son acquisition. */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-ink-soft/60 p-6 text-center md:flex-row md:p-8 md:text-left">
            <NeonIcon
              src="/canva/icons/partnership.png"
              className="h-14 w-14 flex-none object-contain"
            />
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {t.seul}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60 md:text-base">
                {t.seulTexte}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-pink/70">
                {t.forfait}
              </p>
            </div>
            <CtaButton href={lien(locale, RDV_URL)} className="w-full flex-none md:w-auto">
              {t.cta}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
