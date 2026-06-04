export const CALENDLY_URL = "https://calendly.com/banana-growth-agency";

export const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Nos services", href: "#services" },
  { label: "Avis", href: "#avis" },
  { label: "Use Case", href: "#use-cases" },
] as const;

export const CLIENTS = [
  "Kite&Connect",
  "The Artist Academy",
  "Nikito",
  "The Family",
  "M6 Publicité",
  "Emily's Pillow",
] as const;

export const SERVICES = [
  {
    title: "Stratégie",
    desc: "Une feuille de route claire, pensée pour votre marché et vos objectifs de croissance.",
    icon: "Compass",
  },
  {
    title: "Data",
    desc: "Tracking, dashboards et décisions pilotées par la donnée, pas à l'intuition.",
    icon: "BarChart3",
  },
  {
    title: "SEO",
    desc: "Du trafic organique durable : technique, contenu et autorité.",
    icon: "Search",
  },
  {
    title: "Visuels & Vidéos",
    desc: "Des créas qui arrêtent le scroll et convertissent.",
    icon: "Clapperboard",
  },
  {
    title: "Paid Marketing",
    desc: "Meta, Google, TikTok : des campagnes rentables et scalables.",
    icon: "Megaphone",
  },
  {
    title: "CRM & Emailing",
    desc: "Automatisations et séquences qui transforment vos leads en clients.",
    icon: "Mail",
  },
  {
    title: "Copywriting",
    desc: "Les mots justes pour vendre, à chaque point de contact.",
    icon: "PenLine",
  },
  {
    title: "Performance",
    desc: "On optimise chaque euro investi pour maximiser le ROAS.",
    icon: "Gauge",
  },
  {
    title: "CRO",
    desc: "Plus de conversions à trafic constant : A/B tests et UX.",
    icon: "MousePointerClick",
  },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "On se rencontre",
    desc: "Vous réservez un créneau, on échange sur votre situation.",
  },
  {
    step: "02",
    title: "On cadre les objectifs",
    desc: "On définit ensemble vos cibles et vos priorités de croissance.",
  },
  {
    step: "03",
    title: "On présente l'offre",
    desc: "Une proposition sur-mesure, adaptée à vos enjeux.",
  },
  {
    step: "04",
    title: "On déploie en 30 jours",
    desc: "Mise en place rapide et résultats mesurables dès le 1er mois.",
  },
] as const;

export const USE_CASES = [
  {
    tag: "Meta Ads",
    metric: "10K€ → 150K€",
    unit: "/mois de budget piloté",
    desc: "Montée en charge maîtrisée sur les campagnes Meta.",
  },
  {
    tag: "Google Ads",
    metric: "7K€ → 170K€",
    unit: "/mois de budget piloté",
    desc: "Scaling rentable de l'acquisition Google.",
  },
  {
    tag: "SEO",
    metric: "100 → 900",
    unit: "clics / jour",
    desc: "x9 sur le trafic organique en quelques mois.",
  },
  {
    tag: "E-commerce",
    metric: "+490%",
    unit: "de CA annuel (Shopify)",
    desc: "Croissance explosive d'une boutique Shopify.",
  },
  {
    tag: "Optimisation Meta",
    metric: "560%",
    unit: "de ROAS",
    desc: "Rentabilité multipliée sur les campagnes existantes.",
  },
  {
    tag: "SEO",
    metric: "60 → 500",
    unit: "clics / jour",
    desc: "Croissance organique régulière et durable.",
  },
  {
    tag: "Lead Gen B2B",
    metric: "~75",
    unit: "prospects / mois à 5€/lead",
    desc: "Génération de leads qualifiés à coût maîtrisé.",
  },
] as const;

export const TESTIMONIAL = {
  quote:
    "Ultra professionnels et réactifs. L'équipe a compris nos enjeux dès le départ et les résultats ont suivi.",
  author: "Laure Lagarde",
  role: "Fondatrice, Emily's Pillow",
} as const;
