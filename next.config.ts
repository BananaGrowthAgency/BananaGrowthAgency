import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirections 301 des anciennes URLs (site Wix) vers les nouvelles pages.
  async redirects() {
    return [
      // Pages légales : anciennes URLs accentuées -> nouvelles (sans accent).
      // On gère la forme décodée ET la forme encodée (%C3%A9 = é).
      {
        source: "/mentions-légales",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/mentions-l%C3%A9gales",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/politique-de-confidentialité",
        destination: "/politique-de-confidentialite",
        permanent: true,
      },
      {
        source: "/politique-de-confidentialit%C3%A9",
        destination: "/politique-de-confidentialite",
        permanent: true,
      },
      // Ancienne page parcs en espagnol -> page parcs FR.
      {
        source: "/agencia-marketing-digital-parque-de-ocio",
        destination: "/accompagnement-marketing-digital-parc-de-loisir",
        permanent: true,
      },
      // Ancienne page de réservation Wix -> prise de rendez-vous Calendly.
      {
        source: "/book-online",
        destination: "https://calendly.com/banana-growth/30min",
        permanent: true,
      },
      // Ancienne page client « Space » -> accueil.
      {
        source: "/space",
        destination: "/",
        permanent: true,
      },

      /* Réorganisation de la section ressources.
         Les fiches outils passent sous /logiciel-gestion-parc-de-loisirs, et
         les plans de taggage remontent d'un cran sous leur propre racine.
         L'ordre compte : les règles les plus spécifiques d'abord, sinon la
         redirection du hub avalerait les pages filles. */
      {
        source: "/outils-parc-de-loisirs/:outil/tracking/:plateforme",
        destination: "/plan-de-taggage-parc-de-loisirs/:outil/:plateforme",
        permanent: true,
      },
      {
        source: "/outils-parc-de-loisirs/:outil/tracking",
        destination: "/plan-de-taggage-parc-de-loisirs/:outil",
        permanent: true,
      },
      {
        source: "/outils-parc-de-loisirs/:outil",
        destination: "/logiciel-gestion-parc-de-loisirs/:outil",
        permanent: true,
      },
      {
        source: "/outils-parc-de-loisirs",
        destination: "/logiciel-gestion-parc-de-loisirs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
