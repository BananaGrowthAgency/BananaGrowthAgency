export const CALENDLY_URL = "https://calendly.com/banana-growth-agency";

export const HERO = {
  title: "L'agence de Growth Marketing",
  titleHighlight: "qui vitamine votre croissance",
  cta: "Prendre Rendez-vous",
} as const;

export const NAV_LINKS = [
  { label: "Manifesto", href: "/#manifesto" },
  { label: "Nos services", href: "/#services" },
  { label: "Avis", href: "/#avis" },
  { label: "Use Case", href: "/#use-cases" },
  { label: "Parcs de loisirs", href: "/accompagnement-marketing-digital-parc-de-loisir" },
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

export const TESTIMONIALS = [
  {
    quote:
      "Sérieux, pro, force de proposition, disponible… tout ce dont on peut rêver quand on cherche un accompagnement.",
    author: "Hugo Perpere",
    role: "Fondateur & PDG, Nikito",
    photo: "home-hugo-perpere",
    logo: "nikito",
    company: "Nikito",
  },
  {
    quote:
      "Très bonne expertise, une bonne pédagogie et un bon drive de growth. Je recommande !",
    author: "Hugo Manoukian",
    role: "Investisseur & Co-fondateur, Maison Serena",
    photo: "home-hugo-manoukian",
    logo: "maison-serena",
    company: "Maison Serena",
  },
  {
    quote:
      "Ultra professionnels et réactifs, ils ont su analyser et corriger des erreurs liées au e-commerce. Ils ont augmenté les revenus tout en faisant attention à notre marge. Ce sont des « game changers » dans la vie d'une entreprise.",
    author: "Laure Lagarde",
    role: "Fondatrice & PDG, Emily's Pillow",
    photo: "home-laure-lagarde",
    logo: "emilys",
    company: "Emily's Pillow",
  },
  {
    quote:
      "En seulement deux mois, nous avons observé une augmentation significative du trafic, du panier moyen et des ventes, le tout en maintenant un suivi rigoureux de la rentabilité.",
    author: "Marie Esquellisse",
    role: "Co-fondatrice, Cercle",
    photo: "team-05",
    logo: "cercle",
    company: "Cercle",
  },
  {
    quote:
      "Ils ont été très rapides pour comprendre et analyser nos besoins. Ils ont proposé des solutions efficaces à un très bon rapport qualité-prix. C'est très rare de rencontrer de bons marketeurs avec une vision globale et digitale.",
    author: "Laurent Houitte",
    role: "Fondateur & PDG, Kite & Connect",
    photo: "home-laurent-houitte",
    logo: "kute-connect",
    company: "Kite & Connect",
  },
  {
    quote:
      "Ce qui les distingue, c'est leur aptitude à combiner une analyse minutieuse des données avec une compréhension instinctive du marché et des tendances. Je recommande à 100% !",
    author: "Emeline Siron",
    role: "Fondatrice & PDG, Evermind",
    photo: "home-emeline-siron",
    logo: "evermind",
    company: "Evermind",
  },
] as const;

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

/* ─────────────────────────────────────────────────────────────
   Landing dédiée : parcs de loisirs indoor & outdoor
   ───────────────────────────────────────────────────────────── */
export const PARC = {
  hero: {
    eyebrow: "Parcs de loisirs indoor & outdoor",
    title: "L'agence de Growth Marketing dédiée aux",
    titleHighlight: "parcs de loisirs",
    subtitle:
      "Nous générons de la fréquentation pour les acteurs du loisir actif — indoor comme outdoor — avec une méthode clés en main, réplicable et mesurable.",
    cta: "Réserver mon audit",
  },
  problem: {
    eyebrow: "Vous gérez un parc de loisir ?",
    lines: [
      "Chez Banana Growth Agency, nous avons plus de 5 ans d'expérience dans la génération de fréquentation pour les acteurs du loisir actif.",
      "Nous savons à quel point le marketing peut être complexe et chronophage pour les équipes opérationnelles.",
      "Sans compter que le ROI de vos actions marketing reste souvent flou.",
    ],
    punch:
      "Nous avons développé une méthode unique, clés en main, réplicable et mesurable, pour maximiser le taux de remplissage de votre parc.",
  },
  stats: [
    { value: "+20 parcs", label: "Accompagnés avec succès" },
    { value: "+5 ans", label: "d'expérience avec les parcs" },
    { value: "1 méthode", label: "Scalable et réplicable" },
  ],
  mission: {
    eyebrow: "Notre mission",
    title: "Notre mission est simple",
    lines: [
      "Nous simplifions votre marketing et transmettons à vos équipes les méthodes, process et stratégies nécessaires pour accélérer votre croissance.",
      "Nous pilotons votre stratégie marketing, afin que vous puissiez vous concentrer sur l'essentiel : l'expérience client et la gestion de votre parc.",
    ],
    ctaTitle: "Prêt(e) à booster la fréquentation de votre parc ?",
    ctaText:
      "Prenons rendez-vous. En 30 minutes, nous identifierons ensemble vos principaux leviers d'optimisation.",
    cta: "Réserver mon audit",
  },
  services: [
    {
      title: "Stratégie Digitale",
      desc: "Des stratégies éprouvées pour booster la fréquentation.",
      icon: "target",
    },
    {
      title: "Suivi de Campagnes",
      desc: "Des campagnes conçues et pilotées pour remplir votre parc.",
      icon: "growth",
    },
    {
      title: "SEO",
      desc: "Stratégie et contenus que Google adore.",
      icon: "web",
    },
    {
      title: "Tracking",
      desc: "Des trackers qui nourrissent les algorithmes et maximisent votre CA.",
      icon: "analytics",
    },
    {
      title: "Reporting",
      desc: "Rapports détaillés pour suivre, ajuster et maximiser vos résultats.",
      icon: "roi",
    },
    {
      title: "Paid Marketing",
      desc: "Nous optimisons vos comptes publicitaires SEA & Social Ads.",
      icon: "rocket",
    },
    {
      title: "Visuels & Vidéos",
      desc: "Des contenus créatifs pensés pour la performance.",
      icon: "video",
    },
    {
      title: "Stratégie d'influence",
      desc: "Connectez votre marque aux créateurs qui font cliquer.",
      icon: "influence",
    },
    {
      title: "Accompagnement",
      desc: "Un coaching complet pour former vos équipes et booster vos résultats.",
      icon: "partnership",
    },
  ],
  testimonials: [
    {
      quote:
        "Banana Growth Agency vous accompagne avec dynamisme, enthousiasme et intelligence dans votre stratégie de marketing digital. Ils permettent aussi de vulgariser cet aspect désormais clef de la communication mais pas toujours accessible et compréhensible par tous. En tant qu'entrepreneur dans le loisirs depuis plus de 20 ans, ils viennent nous donner LE coup de pouce essentiel dans un secteur en pleine croissance et de plus en plus concurrentiel.",
      author: "Sylvain Houeix",
      role: "Directeur Général, Overland Games",
      photo: "parc-01",
      logo: "overland",
      company: "Overland Games",
    },
    {
      quote:
        "Banana Growth Agency nous apportent un accompagnement complet et constant sur nos sujets de marketing digital, toujours avec une grande réactivité. J'ai particulièrement apprécié leur approche : simples, organisés, toujours force de proposition et capables de challenger nos habitudes pour aller plus loin. Leur expertise du digital appliquée aux loisirs actifs fait vraiment la différence. Mon équipe et moi sommes ravis de cette collaboration, que je recommande sans réserve.",
      author: "Emeric Ruget",
      role: "Président OnlyKart, Lyon",
      photo: "parc-02",
      logo: "onlykart",
      company: "OnlyKart",
    },
    {
      quote:
        "Banana Growth s'occupent de la communication de plusieurs sociétés avec lesquelles je travaille. Très modernes dans leur approche, ils vont droit au but pour maximiser l'efficacité. Moins de blabla plus d'action et des choses concrètes mises en place ! Le tout, bien sûr, en restant disponible et en expliquant les choses de manière pédagogique ! L'adaptation se fait avec chaque client, parfait pour moi !",
      author: "Guillaume Groell",
      role: "Indoor Entertainment Entrepreneur, SPACE",
      photo: "parc-03",
      logo: "space",
      company: "SPACE",
    },
    {
      quote:
        "Sérieux, pro, force de proposition, disponible… tout ce dont on peut rêver quand on cherche un accompagnement.",
      author: "Hugo Perpere",
      role: "Fondateur & PDG de Nikito",
      photo: "parc-04",
      logo: "nikito",
      company: "Nikito",
    },
  ],
  faq: [
    {
      q: "Combien coûte votre prestation ?",
      a: "Chaque parc est différent : nos accompagnements sont sur-mesure et adaptés à vos objectifs et à votre maturité digitale. Le tarif est défini après un premier audit gratuit, en toute transparence.",
    },
    {
      q: "Quel doit être le budget média ?",
      a: "Nous travaillons avec des budgets variés. L'objectif n'est pas de dépenser plus, mais mieux : nous calibrons l'investissement média en fonction de votre capacité d'accueil et de votre rentabilité cible.",
    },
    {
      q: "Comment ça fonctionne ?",
      a: "Après un audit gratuit, nous construisons une stratégie sur-mesure sur 30 jours, puis nous la déployons et la pilotons. Vous gardez une visibilité complète sur les résultats grâce à un reporting clair.",
    },
    {
      q: "En combien de temps puis-je avoir un retour sur investissement ?",
      a: "Les premiers signaux apparaissent dès les premières semaines. Un ROI mesurable s'installe généralement sous quelques mois, selon votre saisonnalité et vos leviers actuels.",
    },
    {
      q: "Y a-t-il un contrat ?",
      a: "Nous fonctionnons avec des engagements clairs et flexibles. L'objectif est de bâtir une relation de confiance fondée sur les résultats, pas de vous enfermer.",
    },
    {
      q: "Pourquoi vous choisir ?",
      a: "Parce que nous combinons une vraie expertise growth et une connaissance fine du secteur des loisirs actifs. Nous prenons en main l'ensemble de votre acquisition et nous engageons sur des résultats concrets.",
    },
  ],
  finalCta: {
    title: "Votre croissance commence ici.",
    subtitle: "Réservez votre audit gratuit et remplissez votre parc.",
    cta: "Réserver mon audit",
  },
} as const;
