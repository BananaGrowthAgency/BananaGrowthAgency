export const CALENDLY_URL = "https://calendly.com/banana-growth-agency";

export const HERO = {
  title: "L'agence de Growth Marketing",
  titleHighlight: "qui vitamine votre croissance",
  cta: "Prendre Rendez-vous",
} as const;

export const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Nos services", href: "#services" },
  { label: "Avis", href: "#avis" },
  { label: "Use Case", href: "#use-cases" },
] as const;

export const CLIENTS = [
  { name: "OnlyKart", file: "onlykart" },
  { name: "Space", file: "space" },
  { name: "Evermind", file: "evermind" },
  { name: "Prison Island", file: "prison-island" },
  { name: "Emily's Pillow", file: "emilys" },
  { name: "O'Scarlett", file: "oscarlett" },
  { name: "Fun Space", file: "funspace" },
  { name: "Overland", file: "overland" },
  { name: "Ludykid", file: "ludykid" },
  { name: "Laser Karting", file: "laser-karting" },
  { name: "Classic Racing School", file: "karting-club" },
  { name: "Colonies", file: "colonies" },
  { name: "Golden Moustache", file: "golden-moustache" },
  { name: "Cercle", file: "cercle" },
  { name: "Mister EV", file: "mister-ev" },
  { name: "The Family", file: "the-family" },
  { name: "The Artist Academy", file: "the-artist" },
  { name: "Héritage", file: "heritage" },
  { name: "Nikito", file: "nikito" },
  { name: "Kute & Connect", file: "kute-connect" },
  { name: "M6 Publicité", file: "m6" },
] as const;

export const PROBLEM = {
  title: "Vous stagnez dans votre croissance ?",
  intro:
    "Il ne suffit pas de dépenser de l'argent sur Meta ou Google pour faire de la croissance.",
  lines: [
    "Aujourd'hui, les tendances évoluent vite. Et vos concurrents aussi.",
    "Chaque semaine sans stratégie claire est une opportunité qu'ils prennent à votre place.",
    "Créer une synergie entre vos canaux d'acquisition et leurs algorithmes est fondamental pour votre succès.",
  ],
  punch: "Et chez Banana Growth Agency, c'est ce que l'on fait de mieux.",
  outro:
    "Nous créons des stratégies marketing sur-mesure multicanaux qui garantissent le ROI de nos clients.",
} as const;

export const DIFFERENTIATION = {
  title: "En quoi sommes-nous différents ?",
  lines: [
    "Depuis 10 ans, nous concevons, mettons en place et analysons chaque stratégie que nous déployons.",
    "Nous maîtrisons les dynamiques actuelles de communication, les enjeux techniques et l'orchestration des canaux pour en tirer un maximum de performance.",
    "En prenant pleinement en main l'ensemble des sujets d'acquisition, nous garantissons des résultats concrets.",
  ],
  highlights: [
    "C'est simple : nous nous occupons de tout.",
    "Notre seul objectif : vous faire gagner de l'argent.",
  ],
  closing:
    "Prenons rendez-vous. En 30 minutes, nous identifierons ensemble les principaux leviers d'optimisation.",
} as const;

export const SERVICES_HEADING = "Un cocktail de services qui porte ses fruits";

export const SERVICES = [
  {
    title: "Stratégie",
    desc: "Nous proposons une roadmap selon vos objectifs.",
    icon: "target",
  },
  {
    title: "Data",
    desc: "Nous implémentons des trackers qui nourrissent les algorithmes.",
    icon: "analytics",
  },
  {
    title: "SEO",
    desc: "Nous créons stratégie et contenus que Google adore.",
    icon: "web",
  },
  {
    title: "Visuels & Vidéos",
    desc: "Nous élaborons des contenus créatifs à forte performance.",
    icon: "video",
  },
  {
    title: "Paid Marketing",
    desc: "Nous optimisons vos comptes publicitaires SEA & Social Ads.",
    icon: "rocket",
  },
  {
    title: "CRM & Emailing",
    desc: "Nous optimisons l'ensemble de votre CRM & votre lead gen.",
    icon: "email",
  },
  {
    title: "Copywriting",
    desc: "Nous écrivons des textes qui génèrent du chiffre d'affaires.",
    icon: "content",
  },
  {
    title: "Performance",
    desc: "Nous analysons et maximisons vos volumes de marge.",
    icon: "growth",
  },
  {
    title: "CRO",
    desc: "Nous optimisons votre taux de conversion et augmentons vos ventes.",
    icon: "roi",
  },
] as const;

export const PROCESS = [
  {
    step: "1",
    desc: "Vous réservez un rendez-vous avec notre équipe.",
  },
  {
    step: "2",
    desc: "Nous échangeons sur vos objectifs, votre modèle d'affaire, votre stratégie d'acquisition actuelle.",
  },
  {
    step: "3",
    desc: "Nous présentons une offre d'accompagnement sur-mesure qui se déroulera sur 30 jours.",
  },
  {
    step: "4",
    desc: "Nous travaillons à fond les bananes pendant 30 jours pour structurer une stratégie d'acquisition sur-mesure et scalable.",
  },
] as const;

export const USE_CASES = [
  {
    channel: "Meta Ads",
    context: "E-Commerce qui souhaite scaler",
    headline: "x15 sur le CA mensuel en 6 mois",
    detail: "De 10 000€ à 150 000€/mois sur Meta Ads",
    image: "meta-scale",
  },
  {
    channel: "Google Ads",
    context: "Business à forte intention d'achat",
    headline: "x20 sur le CA mensuel en 12 mois",
    detail: "De 7 000€ à 170 000€/mois de CA",
    image: "google-ads",
  },
  {
    channel: "SEO",
    context: "E-Commerce à forte saisonnalité",
    headline: "De 100 à 900 clics/jour en 12 mois",
    detail: "Croissance du trafic organique multipliée par 9",
    image: "seo-clicks",
  },
  {
    channel: "Acquisition 360°",
    context: "E-Commerce BtoC sur Shopify",
    headline: "+490% de CA d'une année à l'autre",
    detail: "Stratégie d'acquisition complète déployée",
    image: "shopify-490",
  },
  {
    channel: "Meta Ads",
    context: "E-Commerce qui souhaite maximiser sa marge",
    headline: "ROAS de 560%",
    detail:
      "20 000€ de CA supplémentaire par mois pour 3 650€ de dépenses",
    image: "meta-roas",
  },
  {
    channel: "Lead Gen B2B",
    context: "Génération de leads (brochure d'informations)",
    headline: "~75 prospects/mois à moins de 5€/lead",
    detail:
      "Leads qualifiés : nom, prénom, email, téléphone, entreprise, poste",
    image: "meta-leads",
  },
  {
    channel: "SEO",
    context: "E-Commerce qui veut augmenter son trafic organique",
    headline: "De 60 à 500 clics/jour en 6 mois",
    detail: "Trafic organique multiplié par 8",
    image: null,
  },
] as const;

export const TESTIMONIAL = {
  heading: "Ils adorent notre cocktail",
  quote:
    "Ultra professionnels et réactifs, ils ont su analyser et corriger des erreurs liées au e-commerce. Ils ont augmenté les revenus tout en faisant attention à notre marge. Ce sont des « game changers » dans la vie d'une entreprise.",
  author: "Laure Lagarde",
  role: "Fondatrice & PDG d'Emily's Pillow",
} as const;

export const FINAL_CTA = {
  title: "Prêt à vitaminer votre croissance ?",
  subtitle: "Réservez votre audit gratuit.",
  cta: "Prendre Rendez-vous",
} as const;

export const CONTACT = {
  title: "Une question ?",
  subtitle: "Notre équipe est à votre écoute.",
} as const;

export const FOOTER_TAGLINE =
  "L'agence de Growth Marketing qui vitamine la croissance des entreprises ambitieuses.";
