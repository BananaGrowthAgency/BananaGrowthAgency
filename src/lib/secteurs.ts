/* ─────────────────────────────────────────────────────────────
   Pages « marketing digital + secteur »

   Une page par acteur du loisir expérientiel, sur le modèle de
   /accompagnement-marketing-digital-parc-de-loisir. Les requêtes
   « marketing + secteur » ne se cherchent presque pas (SE Ranking FR,
   oct. 2026 : < 10/mois pour la plupart) : ces pages servent de lien
   commercial, de page d'atterrissage Ads et de source pour les IA.

   Pour qu'elles ne soient pas des copies dont seul le mot change, chaque
   secteur porte ses propres données : la demande grand public mesurée
   (volumes Google France), ses publics, sa saisonnalité et sa FAQ.
   ───────────────────────────────────────────────────────────── */

/** Préfixe commun des URLs : le slug du secteur vient après. */
export const SECTEUR_PREFIXE = "accompagnement-marketing-digital-";

export type Famille = "indoor" | "outdoor" | "sejour";

export const FAMILLES: Record<Famille, string> = {
  indoor: "Loisirs indoor",
  outdoor: "Loisirs outdoor & sites de visite",
  sejour: "Séjours & bien-être",
};

export type Requete = { mot: string; volume: number };

export type Secteur = {
  slug: string;
  famille: Famille;
  /** Libellé court, pour le pied de page et les liens croisés. */
  nom: string;
  /** Titre Google, quand « Marketing digital pour {pour} » est trop long. */
  titre?: string;
  /** Complément du H1 : « Accompagnement marketing digital pour {pour} ». */
  pour: string;
  /** Sujet de « Vous gérez {un} ? ». */
  un: string;
  /** Possessif réutilisé dans les textes communs : « remplir {votre} ». */
  votre: string;
  metaDescription: string;
  subtitle: string;
  probleme: readonly string[];
  demande: {
    intro: string;
    requetes: readonly Requete[];
  };
  publics: readonly { titre: string; texte: string }[];
  saison: string;
  faq: readonly { q: string; a: string }[];
};

export const SECTEURS: readonly Secteur[] = [
  /* ── Loisirs indoor ─────────────────────────────────────── */
  {
    slug: "karting",
    famille: "indoor",
    nom: "Karting",
    pour: "les kartings",
    un: "un karting",
    votre: "votre karting",
    metaDescription:
      "Agence marketing digital pour kartings : Google Ads, Meta Ads, SEO local et tracking pour remplir vos sessions, anniversaires et événements d'entreprise.",
    subtitle:
      "Sessions grand public, anniversaires, enterrements de vie de garçon, séminaires : nous remplissons vos pistes avec une méthode testée sur d'autres kartings.",
    probleme: [
      "Un karting vit de plusieurs clientèles qui ne se cherchent pas de la même façon : le pilote du samedi, le parent qui organise un anniversaire, le CE qui prépare son séminaire.",
      "Entre la météo, les vacances scolaires et les créneaux creux du mardi, le planning se remplit rarement tout seul.",
      "Et quand le module de réservation n'est pas relié à Google et Meta, impossible de savoir quelle pub a vraiment vendu une session.",
    ],
    demande: {
      intro:
        "« Karting » se cherche 135 000 fois par mois en France, presque toujours suivi d'une ville. La bataille se joue donc en local : fiche Google, annonces géolocalisées et pages par offre.",
      requetes: [
        { mot: "karting", volume: 135000 },
        { mot: "karting enfant", volume: 5700 },
        { mot: "karting indoor", volume: 3100 },
        { mot: "prix karting", volume: 610 },
        { mot: "karting anniversaire", volume: 590 },
        { mot: "karting team building", volume: 70 },
      ],
    },
    publics: [
      {
        titre: "Les pilotes loisirs",
        texte:
          "Le cœur du chiffre. On les capte sur Google au moment où ils cherchent, puis on les fait revenir avec des offres de fidélité et du remarketing.",
      },
      {
        titre: "Les anniversaires enfants",
        texte:
          "Des parents qui comparent vite. Une page claire (âge minimum, formule, prix) et des annonces Meta ciblées font la différence.",
      },
      {
        titre: "EVG et groupes d'amis",
        texte:
          "Un panier élevé et une décision collective. Vidéos courtes, offres packagées et réponse rapide aux demandes de devis.",
      },
      {
        titre: "Entreprises et séminaires",
        texte:
          "Le levier des jours de semaine. Campagnes Google sur les requêtes team building, formulaire B2B suivi comme une vraie conversion.",
      },
    ],
    saison:
      "Le karting outdoor dépend de la météo, l'indoor des vacances scolaires et des week-ends de pluie. Nous ajustons les budgets semaine par semaine et poussons les offres entreprises quand le grand public décroche.",
    faq: [
      {
        q: "Vous travaillez avec quels logiciels de réservation karting ?",
        a: "Nous avons déjà implémenté le suivi des réservations sur Apex Timing, Qweekle et ROLLER, entre autres. L'objectif est toujours le même : que Google Ads et Meta voient chaque réservation payée, avec son montant.",
      },
      {
        q: "Faut-il une page par offre (anniversaire, EVG, entreprise) ?",
        a: "Oui. Chaque public tape des mots différents et attend des informations différentes. Une page par offre améliore à la fois le référencement et le taux de conversion de vos publicités.",
      },
      {
        q: "Comment remplir les créneaux de semaine ?",
        a: "Avec les entreprises, les centres de loisirs et les offres happy hour. Nous créons des campagnes dédiées aux jours creux, avec un budget qui ne tourne que quand vous avez de la place.",
      },
    ],
  },
  {
    slug: "bowling",
    famille: "indoor",
    nom: "Bowling",
    pour: "les bowlings",
    un: "un bowling",
    votre: "votre bowling",
    metaDescription:
      "Agence marketing digital pour bowlings : Google, Meta, SEO local et suivi des réservations pour remplir vos pistes, votre bar et vos soirées d'entreprise.",
    subtitle:
      "Pistes, bar, restauration, soirées d'entreprise : nous faisons venir du monde en semaine comme le week-end, et nous mesurons ce que chaque euro de pub rapporte.",
    probleme: [
      "Un bowling ne vend pas qu'une partie : il vend une soirée, avec le bar, la restauration et souvent d'autres activités autour.",
      "Pourtant la plupart des bowlings communiquent encore comme il y a dix ans, avec un site vitrine et une page Facebook.",
      "Résultat : des pistes pleines le samedi soir, vides le mardi, et aucune visibilité sur ce qui fait venir les clients.",
    ],
    demande: {
      intro:
        "135 000 recherches mensuelles pour « bowling », et une demande qui associe de plus en plus la partie à un repas ou un verre. Votre offre complète doit apparaître dès la recherche.",
      requetes: [
        { mot: "bowling", volume: 135000 },
        { mot: "bowling restaurant", volume: 480 },
        { mot: "bowling prix", volume: 360 },
        { mot: "bowling enfant", volume: 320 },
        { mot: "anniversaire bowling", volume: 60 },
      ],
    },
    publics: [
      {
        titre: "Les sorties entre amis",
        texte:
          "Ils décident le jour même. Fiche Google irréprochable, avis récents et annonces locales le jeudi et le vendredi.",
      },
      {
        titre: "Les familles",
        texte:
          "Mercredis, week-ends et vacances : des formules enfants claires et des campagnes Meta calées sur le calendrier scolaire.",
      },
      {
        titre: "Les entreprises",
        texte:
          "Afterworks, séminaires, fêtes de fin d'année. Le panier le plus élevé, avec un parcours devis suivi de bout en bout.",
      },
    ],
    saison:
      "Le bowling profite de l'automne, de l'hiver et des jours de pluie. Nous anticipons les fêtes de fin d'année dès septembre côté entreprises, et relançons le grand public quand la météo bascule.",
    faq: [
      {
        q: "Peut-on promouvoir le bar et la restauration en même temps ?",
        a: "Oui, et c'est souvent là que se trouve la marge. Nous construisons des offres « partie + repas » et mesurons le panier moyen, pas seulement le nombre de parties.",
      },
      {
        q: "Comment attirer des clients en semaine ?",
        a: "Avec des campagnes dédiées aux entreprises, aux associations et aux étudiants, diffusées uniquement sur les jours où vous avez de la place.",
      },
      {
        q: "Les avis Google ont-ils vraiment un impact ?",
        a: "Énorme : pour une recherche « bowling + ville », la fiche Google passe avant votre site. Nous mettons en place une collecte d'avis régulière après chaque visite.",
      },
    ],
  },
  {
    slug: "escape-game",
    famille: "indoor",
    nom: "Escape game",
    pour: "les escape games",
    un: "un escape game",
    votre: "votre escape game",
    metaDescription:
      "Agence marketing digital pour escape games : Google Ads, Meta Ads, SEO local et suivi des réservations pour remplir vos salles en semaine comme le week-end.",
    subtitle:
      "Groupes d'amis, anniversaires, EVJF, team building : nous remplissons vos salles avec des campagnes pensées pour un marché où la concurrence est à deux rues.",
    probleme: [
      "L'escape game est l'un des loisirs les plus concurrentiels : dans une grande ville, vos clients comparent dix enseignes en deux minutes.",
      "Les thèmes, les notes Google et les photos font la décision bien avant votre site.",
      "Et une fois la salle jouée, le client ne revient que si vous avez un nouveau scénario à lui proposer, au bon moment.",
    ],
    demande: {
      intro:
        "135 000 recherches par mois pour « escape game ». Les requêtes à forte valeur sont les plus précises : team building, anniversaire, EVJF. Ce sont elles qu'il faut travailler une par une.",
      requetes: [
        { mot: "escape game", volume: 135000 },
        { mot: "escape game team building", volume: 590 },
        { mot: "escape game anniversaire", volume: 480 },
        { mot: "escape game réalité virtuelle", volume: 320 },
        { mot: "escape game evjf", volume: 260 },
      ],
    },
    publics: [
      {
        titre: "Les joueurs passionnés",
        texte:
          "Ils ont fait toutes les salles de la ville. On les fidélise par email et réseaux sociaux à chaque nouveau scénario.",
      },
      {
        titre: "Les groupes d'amis et EVJF",
        texte:
          "Ils cherchent une expérience à raconter. Des vidéos de vos décors et des avis visibles font la décision.",
      },
      {
        titre: "Les entreprises",
        texte:
          "Le team building remplit vos salles en semaine. Campagnes Google dédiées et page B2B avec formulaire de devis suivi.",
      },
    ],
    saison:
      "Pic à la rentrée et en hiver, creux l'été en ville. Nous déplaçons le budget vers les touristes et les centres de loisirs en juillet-août, et vers les entreprises de septembre à décembre.",
    faq: [
      {
        q: "Comment se démarquer de la concurrence locale ?",
        a: "Par les thèmes, les preuves sociales et la vitesse de réservation. Nous travaillons votre fiche Google, vos visuels et un parcours de réservation sans friction, puis nous enchérissons sur les requêtes précises que vos concurrents négligent.",
      },
      {
        q: "Faut-il communiquer à chaque nouvelle salle ?",
        a: "Oui : un lancement de scénario est le meilleur moment pour réactiver vos anciens joueurs. Nous préparons une séquence email, des contenus courts et une campagne de remarketing.",
      },
      {
        q: "Le team building vaut-il l'investissement publicitaire ?",
        a: "Souvent oui : le clic coûte plus cher, mais un groupe d'entreprise vaut plusieurs réservations grand public et remplit les créneaux de semaine.",
      },
    ],
  },
  {
    slug: "trampoline-park",
    famille: "indoor",
    nom: "Trampoline park",
    pour: "les trampoline parks",
    un: "un trampoline park",
    votre: "votre trampoline park",
    metaDescription:
      "Agence marketing digital pour trampoline parks : Meta, Google, SEO local et suivi des réservations pour remplir sessions et anniversaires toute l'année.",
    subtitle:
      "Sessions libres, anniversaires, écoles et centres de loisirs : nous transformons la demande des familles de votre zone en réservations mesurées.",
    probleme: [
      "Le trampoline park a explosé en quelques années, et chaque agglomération a désormais plusieurs enseignes.",
      "La clientèle est surtout familiale : le parent décide, souvent sur son téléphone, entre deux autres activités.",
      "Sans tracking fiable, impossible de savoir si vos anniversaires viennent de Google, d'Instagram ou du bouche-à-oreille.",
    ],
    demande: {
      intro:
        "110 000 recherches par mois pour « trampoline park ». Les parents cherchent aussi plus largement un « parc indoor » ou un « loisir indoor » : il faut être présent sur les deux.",
      requetes: [
        { mot: "trampoline park", volume: 110000 },
        { mot: "parc indoor", volume: 1300 },
        { mot: "loisir indoor", volume: 390 },
        { mot: "centre de loisirs indoor", volume: 30 },
      ],
    },
    publics: [
      {
        titre: "Les familles",
        texte:
          "Le mercredi, le week-end et les vacances. Campagnes Meta géolocalisées et offres claires par tranche d'âge.",
      },
      {
        titre: "Les anniversaires",
        texte:
          "Le produit le plus rentable. Une page dédiée, des photos de vos salles de fête et une réservation en ligne simple.",
      },
      {
        titre: "Ados et sportifs",
        texte:
          "Créneaux freestyle, soirées, dodgeball : des contenus vidéo courts sur Instagram et TikTok.",
      },
      {
        titre: "Groupes et collectivités",
        texte:
          "Écoles, centres de loisirs, CE : un formulaire de devis suivi et des relances ciblées avant chaque période de vacances.",
      },
    ],
    saison:
      "Pic pendant les vacances scolaires et les week-ends de pluie, creux à la belle saison. Nous préparons les vacances deux semaines en avance et basculons le budget sur les anniversaires et les groupes quand le soleil revient.",
    faq: [
      {
        q: "Meta ou Google pour un trampoline park ?",
        a: "Les deux, avec des rôles différents : Google capte ceux qui cherchent déjà, Meta crée l'envie chez les parents de votre zone. La répartition dépend de votre concurrence locale.",
      },
      {
        q: "Comment augmenter les réservations d'anniversaires ?",
        a: "Avec une page dédiée qui répond à toutes les questions (âge, durée, gâteau, prix), une réservation en ligne et des campagnes qui tournent toute l'année. C'est souvent le premier levier que nous activons.",
      },
      {
        q: "Peut-on mesurer les ventes faites sur place ?",
        a: "Partiellement : nous suivons les réservations en ligne avec précision et estimons l'effet des campagnes sur la fréquentation globale en comparant les périodes.",
      },
    ],
  },
  {
    slug: "laser-game",
    famille: "indoor",
    nom: "Laser game",
    pour: "les laser games",
    un: "un laser game",
    votre: "votre laser game",
    metaDescription:
      "Agence marketing digital pour laser games : Google Ads, Meta Ads, SEO local et tracking pour remplir vos parties, vos anniversaires et vos soirées d'entreprise.",
    subtitle:
      "Anniversaires, groupes d'ados, EVG, séminaires : nous faisons du laser game le premier choix de votre ville, et nous mesurons chaque réservation.",
    probleme: [
      "Le laser game est un classique : tout le monde connaît, ce qui rend la différenciation difficile.",
      "Vos clients ne cherchent pas « le meilleur laser game », ils cherchent « laser game + ma ville » et prennent le premier qui inspire confiance.",
      "La visibilité locale et la réputation font donc l'essentiel du travail.",
    ],
    demande: {
      intro:
        "60 500 recherches par mois pour « laser game », et une longue traîne quasi inexistante : tout se joue sur le nom de l'activité suivi de la ville. Le SEO local et la fiche Google sont prioritaires.",
      requetes: [
        { mot: "laser game", volume: 60500 },
        { mot: "laser game enfant", volume: 170 },
        { mot: "laser game anniversaire", volume: 10 },
        { mot: "laser game prix", volume: 10 },
      ],
    },
    publics: [
      {
        titre: "Les anniversaires",
        texte:
          "Enfants et ados : une offre lisible et une réservation en ligne, poussées par Meta auprès des parents de votre zone.",
      },
      {
        titre: "Les groupes de jeunes adultes",
        texte:
          "Soirées, EVG, sorties étudiantes : contenus courts, offres de groupe et présence forte sur Google Maps.",
      },
      {
        titre: "Les entreprises",
        texte:
          "Team building et afterworks pour remplir la semaine, avec un formulaire de devis suivi.",
      },
    ],
    saison:
      "Activité stable toute l'année avec des pics pendant les vacances et l'hiver. Nous concentrons le budget sur les périodes de forte demande et sur les entreprises en semaine.",
    faq: [
      {
        q: "Comment ressortir dans Google Maps ?",
        a: "Avec une fiche complète, des photos récentes, des réponses aux avis et un flux régulier de nouveaux avis. C'est le premier chantier que nous ouvrons pour un laser game.",
      },
      {
        q: "Un laser game a-t-il besoin de publicité payante ?",
        a: "Dès qu'il y a de la concurrence dans votre zone, oui. Nous commençons par des campagnes locales à petit budget et augmentons uniquement si la rentabilité suit.",
      },
      {
        q: "Peut-on associer le laser game à d'autres activités de votre centre ?",
        a: "Oui, les packs multi-activités augmentent le panier moyen. Nous les mettons en avant pour les anniversaires et les groupes.",
      },
    ],
  },
  {
    slug: "jeux-aventure-indoor",
    titre: "Marketing digital pour jeux d'aventure indoor",
    famille: "indoor",
    nom: "Jeux d'aventure indoor",
    pour: "les jeux d'aventure indoor",
    un: "un centre de jeux d'aventure",
    votre: "votre centre",
    metaDescription:
      "Agence marketing digital pour jeux d'aventure indoor (défis en équipe, quiz, action games) : Google Ads, Meta Ads, SEO local et suivi des réservations.",
    subtitle:
      "Défis en équipe, quiz géants, salles d'action : nous faisons connaître votre concept et remplissons vos créneaux, entre amis comme en entreprise.",
    probleme: [
      "Les nouveaux concepts de jeux en équipe séduisent vite, mais il faut d'abord expliquer ce qu'on y fait.",
      "Vos futurs clients ne savent pas encore qu'ils vous cherchent : ils tapent « activité entre amis » ou le nom d'une enseigne connue.",
      "La vidéo et la preuve sociale sont donc indispensables pour transformer la curiosité en réservation.",
    ],
    demande: {
      intro:
        "Les grandes enseignes du secteur génèrent à elles seules des dizaines de milliers de recherches. La demande existe, encore faut-il qu'elle vous trouve.",
      requetes: [
        { mot: "prison island", volume: 49500 },
        { mot: "quiz room", volume: 27100 },
        { mot: "action game", volume: 3600 },
        { mot: "loisir indoor", volume: 390 },
      ],
    },
    publics: [
      {
        titre: "Groupes d'amis",
        texte:
          "Ils veulent une expérience à partager. Des vidéos immersives sur Instagram et TikTok déclenchent l'envie.",
      },
      {
        titre: "Familles avec ados",
        texte:
          "Une activité qui met tout le monde d'accord. Offres claires par âge et campagnes Meta le week-end.",
      },
      {
        titre: "Entreprises",
        texte:
          "Le format défi en équipe est taillé pour le team building. Campagnes Google dédiées et page B2B.",
      },
    ],
    saison:
      "Activité soutenue d'octobre à avril et pendant les vacances, plus calme aux beaux jours. Nous relançons les entreprises et les groupes quand le grand public part dehors.",
    faq: [
      {
        q: "Comment expliquer un concept nouveau en une publicité ?",
        a: "Avec de la vidéo : quinze secondes de joueurs en action valent mieux qu'un long texte. Nous produisons et testons plusieurs formats pour trouver celui qui convertit.",
      },
      {
        q: "Vous connaissez déjà ce type de concept ?",
        a: "Oui, nous accompagnons des centres de jeux d'aventure indoor et connaissons leurs logiciels de réservation et leurs pics d'activité.",
      },
      {
        q: "Faut-il enchérir sur le nom des concurrents ?",
        a: "C'est possible mais à manier avec précaution. Nous privilégions les requêtes génériques et locales, plus rentables sur la durée.",
      },
    ],
  },
  {
    slug: "paintball",
    titre: "Marketing digital pour le paintball",
    famille: "indoor",
    nom: "Paintball",
    pour: "les terrains de paintball",
    un: "un terrain de paintball",
    votre: "votre terrain",
    metaDescription:
      "Agence marketing digital pour terrains de paintball et airsoft : campagnes Google et Meta, SEO local et suivi des réservations de groupes, EVG et anniversaires.",
    subtitle:
      "EVG, anniversaires, groupes d'amis et entreprises : nous remplissons votre terrain avec des campagnes taillées pour les réservations de groupe.",
    probleme: [
      "Le paintball se réserve presque toujours en groupe, et souvent plusieurs semaines à l'avance.",
      "La décision est collective : celui qui organise doit convaincre les autres, et compare les prix et les formules.",
      "Une offre claire, des photos qui donnent envie et une réponse rapide aux demandes font toute la différence.",
    ],
    demande: {
      intro:
        "47 500 recherches par mois pour « paintball ». Les déclinaisons enfant et EVG montrent deux publics très différents, à adresser avec des messages distincts.",
      requetes: [
        { mot: "paintball", volume: 47500 },
        { mot: "paintball enfant", volume: 590 },
        { mot: "paintball evg", volume: 50 },
        { mot: "paintball prix", volume: 20 },
      ],
    },
    publics: [
      {
        titre: "EVG et groupes d'amis",
        texte:
          "Le cœur de cible : formules packagées, vidéos d'ambiance et relances rapides des demandes de devis.",
      },
      {
        titre: "Anniversaires enfants et ados",
        texte:
          "Avec le paintball kids, un public familial à capter via Meta et une page dédiée rassurante.",
      },
      {
        titre: "Entreprises",
        texte:
          "Cohésion d'équipe en plein air : campagnes Google ciblées et offres combinées avec d'autres activités.",
      },
    ],
    saison:
      "Haute saison du printemps à l'automne pour les terrains extérieurs, avec un pic des EVG de mai à septembre. Nous démarrons les campagnes EVG dès février, au moment où les témoins organisent.",
    faq: [
      {
        q: "Quand lancer les campagnes EVG ?",
        a: "Deux à trois mois avant la saison : les témoins comparent tôt. Nous ouvrons les campagnes en fin d'hiver pour remplir les week-ends de mai à septembre.",
      },
      {
        q: "Comment rassurer les parents pour le paintball enfant ?",
        a: "Avec une page qui détaille l'équipement, l'encadrement et l'âge minimum, et des photos réelles. Les questions de sécurité sont le principal frein.",
      },
      {
        q: "Le paintball peut-il se combiner avec d'autres activités ?",
        a: "Oui, les packs (paintball + karting, paintball + repas) augmentent le panier et vous différencient. Nous les mettons en avant pour les groupes.",
      },
    ],
  },
  {
    slug: "karaoke",
    famille: "indoor",
    nom: "Karaoké",
    pour: "les karaokés",
    un: "un karaoké",
    votre: "votre karaoké",
    metaDescription:
      "Agence marketing digital pour karaokés et box privatives : campagnes Google et Meta, SEO local et tracking des réservations pour remplir vos salles chaque soir.",
    subtitle:
      "Box privatives, bar karaoké, anniversaires et afterworks : nous remplissons vos salles du lundi au samedi, avec des campagnes qui tournent quand vous avez de la place.",
    probleme: [
      "Le karaoké se décide souvent le jour même, entre amis ou entre collègues.",
      "Il faut donc être visible au bon moment, sur Google Maps comme sur Instagram.",
      "Et les créneaux de début de semaine restent vides si personne ne leur donne une raison de venir.",
    ],
    demande: {
      intro:
        "40 500 recherches mensuelles pour « karaoké », avec une montée des formats privatifs. La demande est très locale et très liée aux soirées.",
      requetes: [
        { mot: "karaoké", volume: 40500 },
        { mot: "bar karaoké", volume: 370 },
        { mot: "karaoké box", volume: 180 },
      ],
    },
    publics: [
      {
        titre: "Les soirées entre amis",
        texte:
          "Décision rapide : fiche Google soignée, avis récents et annonces locales en fin de semaine.",
      },
      {
        titre: "Les anniversaires et EVJF",
        texte:
          "Des groupes qui réservent à l'avance. Offres packagées boissons + salle, et réservation en ligne simple.",
      },
      {
        titre: "Les afterworks",
        texte:
          "Le levier du lundi au jeudi : campagnes ciblées entreprises et offres de début de soirée.",
      },
    ],
    saison:
      "Pics en fin d'année, en janvier et autour des événements (anniversaires, EVJF au printemps). Nous anticipons les fêtes d'entreprise dès septembre.",
    faq: [
      {
        q: "Comment remplir les box en début de semaine ?",
        a: "Avec des offres dédiées (happy hour, tarifs afterwork) poussées uniquement sur ces créneaux, auprès des entreprises et des étudiants de votre zone.",
      },
      {
        q: "Instagram ou TikTok pour un karaoké ?",
        a: "Les deux fonctionnent bien : le karaoké produit naturellement du contenu fun. Nous vous aidons à le capter et à le transformer en publicité.",
      },
      {
        q: "Peut-on suivre le chiffre d'affaires bar ?",
        a: "Nous suivons les réservations en ligne et, quand votre caisse le permet, rapprochons les ventes sur place des campagnes.",
      },
    ],
  },
  {
    slug: "mini-golf",
    famille: "indoor",
    nom: "Mini-golf",
    pour: "les mini-golfs",
    un: "un mini-golf",
    votre: "votre mini-golf",
    metaDescription:
      "Agence marketing digital pour mini-golfs indoor et outdoor : SEO local, campagnes Google et Meta et tracking pour attirer familles, touristes et groupes.",
    subtitle:
      "Familles, touristes, couples et groupes : nous rendons votre mini-golf visible au moment où l'on cherche une sortie, et mesurons ce qui fait venir les joueurs.",
    probleme: [
      "Le mini-golf est souvent une sortie d'impulsion, décidée sur place ou la veille.",
      "Les nouveaux concepts indoor (lumière noire, thèmes, bar) ont changé la donne et attirent un public adulte.",
      "Encore faut-il le faire savoir au-delà des habitués et des passants.",
    ],
    demande: {
      intro:
        "22 400 recherches par mois pour « mini golf », et une demande indoor qui monte. Les requêtes sont locales : la fiche Google et le référencement local passent avant tout.",
      requetes: [
        { mot: "mini golf", volume: 22400 },
        { mot: "mini golf indoor", volume: 480 },
        { mot: "black light mini golf", volume: 10 },
      ],
    },
    publics: [
      {
        titre: "Les familles",
        texte:
          "Week-ends et vacances : présence sur Google Maps, avis visibles et campagnes Meta locales.",
      },
      {
        titre: "Les touristes",
        texte:
          "En zone touristique, ils cherchent sur place : fiche Google à jour, horaires exacts et annonces géolocalisées.",
      },
      {
        titre: "Couples et groupes d'adultes",
        texte:
          "Le mini-golf indoor à thème devient une sortie du soir. Contenus Instagram et offres combinées avec le bar.",
      },
    ],
    saison:
      "Outdoor : saison d'avril à septembre, portée par le tourisme. Indoor : toute l'année, avec des pics en hiver. Nous adaptons le budget au type de parcours et à la météo.",
    faq: [
      {
        q: "Un mini-golf a-t-il besoin d'un site internet ?",
        a: "Oui, même simple : il sert de base au référencement et à la réservation. Mais la fiche Google reste votre première vitrine.",
      },
      {
        q: "Comment toucher les touristes ?",
        a: "Avec des annonces géolocalisées autour des zones d'hébergement et une fiche Google traduite et à jour. Nous ciblons les personnes présentes dans la zone, pas seulement les habitants.",
      },
      {
        q: "Le mini-golf indoor se vend-il différemment ?",
        a: "Oui : on vend une ambiance et une soirée, pas seulement un parcours. Le visuel et la vidéo prennent alors toute leur importance.",
      },
    ],
  },
  {
    slug: "salle-arcade",
    famille: "indoor",
    nom: "Salle d'arcade",
    pour: "les salles d'arcade",
    un: "une salle d'arcade",
    votre: "votre salle",
    metaDescription:
      "Agence marketing digital pour salles d'arcade et bars arcade : SEO local, campagnes Meta et Google, tracking pour attirer joueurs, familles et groupes.",
    subtitle:
      "Bornes rétro, jeux récents, bar arcade : nous faisons connaître votre salle aux joueurs, aux familles et aux groupes de votre ville.",
    probleme: [
      "La salle d'arcade revient en force, souvent associée à un bar ou à d'autres activités.",
      "Mais le mot « arcade » se cherche aussi pour les jeux vidéo et les bornes à acheter.",
      "Il faut donc un ciblage précis pour ne payer que les clics de ceux qui veulent venir jouer chez vous.",
    ],
    demande: {
      intro:
        "33 100 recherches pour « arcade » et 8 100 pour « salle d'arcade » chaque mois. Le terme générique est ambigu : la précision du ciblage fait la rentabilité.",
      requetes: [
        { mot: "arcade", volume: 33100 },
        { mot: "salle d'arcade", volume: 8100 },
      ],
    },
    publics: [
      {
        titre: "Les joueurs et nostalgiques",
        texte:
          "Des passionnés qui aiment partager. Contenus Instagram et TikTok, événements et tournois.",
      },
      {
        titre: "Les familles",
        texte:
          "Une sortie accessible le week-end. Formules cartes de jeu et campagnes Meta locales.",
      },
      {
        titre: "Les groupes et afterworks",
        texte:
          "Bar arcade et privatisations : offres de groupe et campagnes Google ciblées.",
      },
    ],
    saison:
      "Pics en hiver, les jours de pluie et pendant les vacances. Nous programmons des événements (tournois, soirées rétro) pour créer des temps forts hors vacances.",
    faq: [
      {
        q: "Comment éviter les clics inutiles sur « arcade » ?",
        a: "En excluant les recherches d'achat et de jeux vidéo, et en ciblant les intentions locales. Nous nettoyons les termes de recherche chaque semaine.",
      },
      {
        q: "Les tournois et événements valent-ils le coup ?",
        a: "Oui, ce sont d'excellents prétextes de communication et de fidélisation. Nous les annonçons par email, sur les réseaux et en publicité locale.",
      },
      {
        q: "Peut-on vendre des privatisations en ligne ?",
        a: "Oui, avec un formulaire ou une réservation en ligne suivie comme une conversion, pour savoir quelles campagnes génèrent ces demandes.",
      },
    ],
  },
  {
    slug: "lancer-de-hache",
    titre: "Marketing digital pour le lancer de hache",
    famille: "indoor",
    nom: "Lancer de hache",
    pour: "les salles de lancer de hache",
    un: "une salle de lancer de hache",
    votre: "votre salle",
    metaDescription:
      "Agence marketing digital pour salles de lancer de hache : Meta, Google, SEO local et tracking pour remplir vos pistes avec groupes et entreprises.",
    subtitle:
      "EVJF, EVG, anniversaires, afterworks : nous faisons du lancer de hache l'activité dont votre ville parle, et remplissons vos pistes.",
    probleme: [
      "Le lancer de hache est une activité jeune : beaucoup de clients ne savent pas encore qu'elle existe près de chez eux.",
      "Il faut donc créer la demande, pas seulement la capter.",
      "La vidéo, les réseaux sociaux et les offres de groupe sont vos meilleurs alliés.",
    ],
    demande: {
      intro:
        "4 400 recherches par mois pour « lancer de hache », et une demande « bar » qui progresse. Un marché encore petit mais peu concurrencé : idéal pour prendre la place tôt.",
      requetes: [
        { mot: "lancer de hache", volume: 4400 },
        { mot: "bar lancer de hache", volume: 480 },
        { mot: "lancer de hache prix", volume: 30 },
      ],
    },
    publics: [
      {
        titre: "EVJF et EVG",
        texte:
          "Une activité originale qui se raconte. Vidéos courtes et offres packagées pour les organisateurs.",
      },
      {
        titre: "Groupes d'amis",
        texte:
          "Soirées et anniversaires : campagnes Meta locales et bar mis en avant.",
      },
      {
        titre: "Entreprises",
        texte:
          "Team building et afterworks pour remplir la semaine, avec un formulaire de devis suivi.",
      },
    ],
    saison:
      "Pics au printemps (EVJF, EVG), en fin d'année (soirées d'entreprise) et en hiver. Nous lançons les campagnes groupes deux mois avant chaque pic.",
    faq: [
      {
        q: "Comment créer la demande pour une activité méconnue ?",
        a: "Avec Meta, Instagram et TikTok : montrer l'activité en vidéo suffit souvent à déclencher l'envie. Google prend ensuite le relais sur les recherches de nom.",
      },
      {
        q: "Faut-il mettre en avant la sécurité ?",
        a: "Oui, c'est le premier frein. Une section claire sur l'encadrement et les règles rassure et augmente le taux de réservation.",
      },
      {
        q: "Le bar est-il un argument marketing ?",
        a: "Oui : « bar à haches » se cherche et se partage. Nous l'intégrons dans vos offres de soirée et de groupe.",
      },
    ],
  },
  {
    slug: "parc-indoor-enfants",
    titre: "Marketing digital parcs de jeux indoor enfants",
    famille: "indoor",
    nom: "Parc de jeux indoor enfants",
    pour: "les parcs de jeux indoor pour enfants",
    un: "un parc de jeux indoor",
    votre: "votre parc",
    metaDescription:
      "Agence marketing digital pour parcs de jeux indoor et aires de jeux couvertes : campagnes Meta et Google, anniversaires, SEO local et tracking des réservations.",
    subtitle:
      "Mercredis, week-ends, vacances et anniversaires : nous faisons venir les familles de votre zone et nous mesurons chaque réservation.",
    probleme: [
      "Un parc de jeux indoor vit au rythme des familles : mercredis, week-ends, vacances et jours de pluie.",
      "Le parent cherche une solution rapide, rassurante et proche.",
      "Les anniversaires sont souvent le produit le plus rentable, mais aussi le plus sous-exploité en ligne.",
    ],
    demande: {
      intro:
        "« Anniversaire enfant » se cherche 5 400 fois par mois, « parc indoor » 1 300 fois. Les parents cherchent une solution, rarement une enseigne : il faut être présent sur leurs mots.",
      requetes: [
        { mot: "anniversaire enfant", volume: 5400 },
        { mot: "parc indoor", volume: 1300 },
        { mot: "parc de jeux indoor", volume: 590 },
        { mot: "aire de jeux indoor", volume: 320 },
        { mot: "parc de loisirs enfants", volume: 110 },
      ],
    },
    publics: [
      {
        titre: "Les parents du quotidien",
        texte:
          "Mercredis et week-ends : campagnes Meta géolocalisées et fiche Google irréprochable.",
      },
      {
        titre: "Les anniversaires",
        texte:
          "Page dédiée, photos des salles, formules claires et réservation en ligne : c'est là que se fait la marge.",
      },
      {
        titre: "Crèches, écoles et centres de loisirs",
        texte:
          "Des groupes réguliers en semaine, à capter avec un formulaire de devis et des relances avant chaque vacances.",
      },
    ],
    saison:
      "Pic d'octobre à mars, pendant les vacances scolaires et les jours de pluie. Nous préparons chaque période de vacances en avance et relançons les anniversaires toute l'année.",
    faq: [
      {
        q: "Comment rassurer les parents en ligne ?",
        a: "Avec des photos réelles, des informations claires sur l'hygiène, l'encadrement et les âges, et des avis récents. La confiance passe avant le prix.",
      },
      {
        q: "Faut-il communiquer sur les anniversaires toute l'année ?",
        a: "Oui : les parents réservent quatre à six semaines à l'avance. Une campagne anniversaire permanente est souvent notre premier levier.",
      },
      {
        q: "Et l'été, quand les familles sont dehors ?",
        a: "Nous misons sur les centres de loisirs, les jours de canicule ou de pluie, et sur les offres combinées avec vos autres activités.",
      },
    ],
  },
  {
    slug: "realite-virtuelle",
    titre: "Marketing digital salles de réalité virtuelle",
    famille: "indoor",
    nom: "Réalité virtuelle",
    pour: "les salles de réalité virtuelle",
    un: "une salle de réalité virtuelle",
    votre: "votre salle",
    metaDescription:
      "Agence marketing digital pour salles de réalité virtuelle et escape games VR : campagnes Meta et Google, SEO local et tracking pour remplir vos sessions.",
    subtitle:
      "Escape games VR, arènes multijoueurs, simulateurs : nous rendons l'expérience désirable avant même que le casque soit sur la tête.",
    probleme: [
      "La réalité virtuelle est une expérience difficile à décrire : il faut la montrer.",
      "Beaucoup de clients ne savent pas qu'une salle VR existe près de chez eux.",
      "Le marketing doit donc créer l'envie, puis lever les freins (âge, mal des transports, durée).",
    ],
    demande: {
      intro:
        "La demande est encore modeste (quelques centaines de recherches par mois) mais très qualifiée. Les réseaux sociaux créent la demande, Google la capte.",
      requetes: [
        { mot: "escape game réalité virtuelle", volume: 320 },
        { mot: "salle de réalité virtuelle", volume: 260 },
        { mot: "vr arena", volume: 210 },
      ],
    },
    publics: [
      {
        titre: "Joueurs et curieux de technologie",
        texte:
          "Ils veulent tester les nouveautés : contenus vidéo, nouveautés de jeux et offres de lancement.",
      },
      {
        titre: "Groupes et anniversaires",
        texte:
          "Ados et jeunes adultes : offres groupe, réservation en ligne et campagnes Meta.",
      },
      {
        titre: "Entreprises",
        texte:
          "Le team building VR est un argument fort : campagnes Google dédiées et page B2B.",
      },
    ],
    saison:
      "Toute l'année, avec des pics en hiver et pendant les vacances. Chaque nouveau jeu est l'occasion d'une campagne de relance.",
    faq: [
      {
        q: "Comment montrer une expérience VR en publicité ?",
        a: "En filmant les joueurs autant que le jeu : leurs réactions vendent mieux que les images de synthèse. Nous testons plusieurs formats vidéo.",
      },
      {
        q: "La VR se positionne-t-elle comme un escape game ?",
        a: "C'est souvent la porte d'entrée la plus efficace, car l'escape game est déjà connu. Nous travaillons les deux angles et gardons celui qui convertit.",
      },
      {
        q: "Quels freins faut-il lever ?",
        a: "L'âge minimum, le confort (nausées), le nombre de joueurs et la durée. Une FAQ claire sur votre page de réservation augmente le taux de conversion.",
      },
    ],
  },

  /* ── Loisirs outdoor & sites de visite ─────────────────── */
  {
    slug: "zoo-parc-animalier",
    titre: "Marketing digital zoos et parcs animaliers",
    famille: "outdoor",
    nom: "Zoo & parc animalier",
    pour: "les zoos et parcs animaliers",
    un: "un zoo ou un parc animalier",
    votre: "votre parc",
    metaDescription:
      "Agence marketing digital pour zoos, parcs animaliers et aquariums : Google, Meta, SEO et billetterie en ligne pour augmenter la fréquentation.",
    subtitle:
      "Familles, scolaires, touristes, abonnés : nous augmentons la fréquentation et la billetterie en ligne de votre parc, saison après saison.",
    probleme: [
      "Un zoo ou un parc animalier attire de loin : la décision se prend souvent la veille, parfois des semaines avant pendant la préparation des vacances.",
      "La billetterie en ligne est un levier énorme (anticipation, panier, données), encore sous-utilisé.",
      "Et sans mesure précise, il est difficile de savoir si une campagne a fait venir des visiteurs ou seulement des clics.",
    ],
    demande: {
      intro:
        "« Zoo » et « aquarium » dépassent chacun 100 000 recherches par mois. La demande est énorme et saisonnière : il faut être visible bien avant le jour de la visite.",
      requetes: [
        { mot: "zoo", volume: 110000 },
        { mot: "aquarium", volume: 110000 },
        { mot: "parc animalier", volume: 22200 },
        { mot: "parc zoologique", volume: 8100 },
        { mot: "safari parc", volume: 480 },
      ],
    },
    publics: [
      {
        titre: "Les familles de la région",
        texte:
          "Week-ends et mercredis : campagnes Meta, événements saisonniers et pass annuels.",
      },
      {
        titre: "Les touristes",
        texte:
          "Ils préparent leurs vacances : SEO, campagnes Google dans les zones émettrices et billetterie en ligne.",
      },
      {
        titre: "Les scolaires et groupes",
        texte:
          "Sorties pédagogiques et CE : relances avant chaque période de réservation, formulaire de devis suivi.",
      },
    ],
    saison:
      "Forte saisonnalité, du printemps aux vacances de la Toussaint. Nous préparons la saison dès l'hiver (pass annuels, cadeaux de Noël) et poussons la billetterie en ligne avant chaque pont et vacances.",
    faq: [
      {
        q: "Comment augmenter la part de billets vendus en ligne ?",
        a: "Avec une billetterie rapide, des offres réservées au web et des campagnes qui renvoient directement vers l'achat. Chaque billet en ligne nous renseigne aussi sur l'origine des visiteurs.",
      },
      {
        q: "Comment toucher les touristes ?",
        a: "En ciblant les régions d'où viennent vos visiteurs, et les vacanciers présents dans votre zone, avec des messages différents. Le SEO prend le relais sur les recherches d'idées de sortie.",
      },
      {
        q: "Les naissances et événements sont-ils de bons sujets ?",
        a: "Excellents : ils génèrent du partage et de la couverture locale. Nous les transformons en contenus et en campagnes de relance.",
      },
    ],
  },
  {
    slug: "parc-attractions",
    famille: "outdoor",
    nom: "Parc d'attractions",
    pour: "les parcs d'attractions",
    un: "un parc d'attractions",
    votre: "votre parc",
    metaDescription:
      "Agence marketing digital pour parcs d'attractions régionaux : campagnes Google et Meta, SEO, billetterie en ligne et tracking pour remplir votre saison.",
    subtitle:
      "Familles, groupes, abonnés et touristes : nous remplissons votre saison et faisons progresser la billetterie en ligne de votre parc.",
    probleme: [
      "Face aux géants du secteur, un parc régional doit se battre pour exister dans l'esprit des familles.",
      "La saison est courte : chaque week-end raté ne se rattrape pas.",
      "Il faut donc une machine marketing prête dès l'ouverture, et capable de réagir à la météo.",
    ],
    demande: {
      intro:
        "96 200 recherches par mois pour « parc d'attraction », mais aussi des milliers de parents qui cherchent simplement une sortie en famille. C'est sur ces recherches d'idées qu'un parc régional gagne des visiteurs.",
      requetes: [
        { mot: "parc d'attraction", volume: 96200 },
        { mot: "sortie en famille", volume: 2400 },
        { mot: "idée sortie", volume: 1100 },
        { mot: "parc de loisirs enfants", volume: 110 },
        { mot: "billet parc d'attraction", volume: 90 },
      ],
    },
    publics: [
      {
        titre: "Les familles régionales",
        texte:
          "Le cœur de la fréquentation : campagnes Meta, pass saison et événements (Halloween, Noël).",
      },
      {
        titre: "Les touristes",
        texte:
          "SEO et campagnes Google dans les zones d'hébergement, partenariats campings et offices de tourisme.",
      },
      {
        titre: "Les groupes",
        texte:
          "CE, scolaires, centres de loisirs : relances en amont de la saison et formulaire de devis suivi.",
      },
    ],
    saison:
      "Saison d'avril à octobre, avec des événements qui prolongent l'activité. Nous préparons l'ouverture dès l'hiver et ajustons les budgets à la météo week-end par week-end.",
    faq: [
      {
        q: "Comment exister face aux grands parcs ?",
        a: "Par la proximité, le prix et l'expérience : un parc régional se vend comme la sortie idéale à moins d'une heure de route. Nous ciblons précisément cette zone de chalandise.",
      },
      {
        q: "Les événements saisonniers valent-ils l'investissement ?",
        a: "Oui, ils prolongent la saison et créent des temps forts de communication. Nous construisons une campagne dédiée pour chacun.",
      },
      {
        q: "Peut-on piloter les campagnes en fonction de la météo ?",
        a: "Oui : nous augmentons la pression publicitaire quand le beau temps s'annonce et la réduisons sinon, pour ne pas payer des clics qui ne viendront pas.",
      },
    ],
  },
  {
    slug: "quad-buggy",
    titre: "Marketing digital quad, buggy et segway",
    famille: "outdoor",
    nom: "Quad, buggy & segway",
    pour: "les randonnées quad, buggy et segway",
    un: "une activité de quad ou de buggy",
    votre: "votre activité",
    metaDescription:
      "Agence marketing digital pour randonnées quad, buggy et segway : campagnes Google et Meta, SEO local et suivi des réservations pour touristes, groupes et EVG.",
    subtitle:
      "Randonnées, balades, initiations : nous faisons connaître votre activité aux touristes, aux groupes et aux entreprises, et suivons chaque réservation.",
    probleme: [
      "Les randonnées motorisées se vendent surtout aux touristes et aux groupes, qui réservent souvent à la dernière minute.",
      "Les plateformes d'activités prennent une commission importante sur chaque vente.",
      "Développer la réservation en direct depuis votre site, c'est récupérer cette marge.",
    ],
    demande: {
      intro:
        "« Quad », « buggy » et « segway » dépassent chacun 40 000 recherches par mois, mais une partie concerne l'achat de véhicules. Les requêtes de location et de balade sont celles qui remplissent votre planning.",
      requetes: [
        { mot: "quad", volume: 60500 },
        { mot: "buggy", volume: 40500 },
        { mot: "segway", volume: 40500 },
        { mot: "location quad", volume: 660 },
        { mot: "randonnée quad", volume: 200 },
        { mot: "balade segway", volume: 110 },
      ],
    },
    publics: [
      {
        titre: "Les touristes",
        texte:
          "Ils cherchent sur place : fiche Google, annonces géolocalisées et réservation en ligne rapide.",
      },
      {
        titre: "EVG et groupes d'amis",
        texte:
          "Des sensations à partager : vidéos, offres de groupe et relance rapide des devis.",
      },
      {
        titre: "Entreprises",
        texte:
          "Séminaires et incentives : campagnes Google ciblées et partenariats avec les lieux de réception.",
      },
    ],
    saison:
      "Haute saison d'avril à octobre, portée par le tourisme. Nous démarrons les campagnes groupes dès l'hiver et suivons la fréquentation touristique de votre zone en saison.",
    faq: [
      {
        q: "Comment réduire la dépendance aux plateformes de réservation ?",
        a: "En captant vous-même les recherches locales avec Google Ads et le SEO, et en rendant la réservation sur votre site aussi simple que sur une plateforme.",
      },
      {
        q: "Comment éviter les clics de personnes qui veulent acheter un quad ?",
        a: "Par un ciblage précis des requêtes de balade et de location, et l'exclusion des recherches d'achat. Nous nettoyons les termes de recherche chaque semaine.",
      },
      {
        q: "La vidéo est-elle indispensable ?",
        a: "Pour une activité à sensations, oui. Quelques prises en caméra embarquée suffisent souvent à produire vos meilleures publicités.",
      },
    ],
  },
  {
    slug: "activites-nautiques",
    famille: "outdoor",
    nom: "Activités nautiques",
    pour: "les activités nautiques",
    un: "une base d'activités nautiques",
    votre: "votre base",
    metaDescription:
      "Agence marketing digital pour activités nautiques (kayak, paddle, jet ski, wakeboard) : campagnes Google et Meta, SEO local et tracking des réservations.",
    subtitle:
      "Kayak, paddle, jet ski, wakeboard, téléski nautique : nous remplissons votre saison avec les touristes, les familles et les groupes.",
    probleme: [
      "La saison nautique est courte et dépend fortement de la météo.",
      "Les clients réservent souvent le jour même, depuis leur lieu de vacances.",
      "Il faut donc être visible au bon endroit, au bon moment, et prêt à encaisser en ligne.",
    ],
    demande: {
      intro:
        "« Kayak » se cherche plus de 670 000 fois par mois, « paddle » 74 000 fois. Une grande partie concerne l'achat de matériel : le travail consiste à ne capter que ceux qui veulent pratiquer chez vous.",
      requetes: [
        { mot: "kayak", volume: 673000 },
        { mot: "paddle", volume: 74000 },
        { mot: "jet ski", volume: 18100 },
        { mot: "wakeboard", volume: 14800 },
        { mot: "location kayak", volume: 1100 },
        { mot: "location jet ski", volume: 1100 },
      ],
    },
    publics: [
      {
        titre: "Les vacanciers",
        texte:
          "Ils cherchent sur place : fiche Google, annonces géolocalisées et réservation mobile en deux clics.",
      },
      {
        titre: "Les familles de la région",
        texte:
          "Week-ends d'été : campagnes Meta et offres famille.",
      },
      {
        titre: "Groupes et centres de vacances",
        texte:
          "Colonies, CE, EVG : relances avant la saison et formulaire de devis suivi.",
      },
    ],
    saison:
      "De mai à septembre, avec un pic en juillet-août. Nous préparons la saison dès le printemps avec les groupes, puis pilotons les budgets au jour le jour selon la météo.",
    faq: [
      {
        q: "Comment toucher les vacanciers déjà sur place ?",
        a: "Avec des annonces géolocalisées autour de votre base et des zones d'hébergement, et une fiche Google complète. Nous ciblons les personnes présentes, pas seulement les habitants.",
      },
      {
        q: "Comment éviter de payer des clics d'acheteurs de matériel ?",
        a: "En ciblant les requêtes de location et de balade, et en excluant celles d'achat. Le nettoyage des recherches est hebdomadaire en saison.",
      },
      {
        q: "Faut-il un site si l'on est sur des plateformes ?",
        a: "Oui : chaque réservation directe vous évite une commission. Votre site doit permettre de réserver aussi vite que sur une plateforme.",
      },
    ],
  },
  {
    slug: "parc-aquatique",
    famille: "outdoor",
    nom: "Parc aquatique",
    pour: "les parcs aquatiques",
    un: "un parc aquatique",
    votre: "votre parc",
    metaDescription:
      "Agence marketing digital pour parcs aquatiques : campagnes Google et Meta, SEO, billetterie en ligne et tracking pour remplir votre saison.",
    subtitle:
      "Familles, touristes, groupes, abonnés : nous remplissons votre parc aquatique et faisons grimper la billetterie en ligne.",
    probleme: [
      "Un parc aquatique concentre sa fréquentation sur quelques semaines de chaleur.",
      "Chaque journée de beau temps mal exploitée est perdue.",
      "Et la concurrence des campings avec piscine et des centres aquatiques municipaux est rude.",
    ],
    demande: {
      intro:
        "33 100 recherches par mois pour « parc aquatique », 27 800 pour « centre aquatique ». Les campings avec parc aquatique attirent aussi des milliers de recherches : un partenariat à exploiter.",
      requetes: [
        { mot: "parc aquatique", volume: 33100 },
        { mot: "centre aquatique", volume: 27800 },
        { mot: "camping avec parc aquatique", volume: 5700 },
        { mot: "parc aquatique couvert", volume: 360 },
      ],
    },
    publics: [
      {
        titre: "Les familles",
        texte:
          "Le cœur de la fréquentation : campagnes Meta les jours de chaleur, offres famille et pass saison.",
      },
      {
        titre: "Les vacanciers",
        texte:
          "Annonces géolocalisées autour des hébergements et partenariats avec les campings.",
      },
      {
        titre: "Les groupes",
        texte:
          "Centres de loisirs, colonies et CE : relances au printemps et formulaire de devis.",
      },
    ],
    saison:
      "Outdoor : de juin à septembre, avec des budgets pilotés selon les prévisions de température. Couvert : toute l'année, avec des pics pendant les vacances d'hiver.",
    faq: [
      {
        q: "Peut-on déclencher les campagnes selon la météo ?",
        a: "Oui : nous augmentons la diffusion quand la chaleur arrive et la coupons les jours de pluie. Le budget suit la probabilité de visite.",
      },
      {
        q: "Comment pousser la billetterie en ligne ?",
        a: "Avec des tarifs web avantageux, une billetterie mobile rapide et des campagnes qui renvoient directement vers l'achat.",
      },
      {
        q: "Les partenariats avec les campings sont-ils utiles ?",
        a: "Très : les vacanciers cherchent quoi faire autour de leur hébergement. Nous les ciblons sur place et via les partenaires.",
      },
    ],
  },
  {
    slug: "sports-aventure",
    titre: "Marketing digital canyoning, rafting, via ferrata",
    famille: "outdoor",
    nom: "Sports d'aventure",
    pour: "les activités d'eaux vives et de montagne",
    un: "une activité de canyoning, rafting ou via ferrata",
    votre: "votre activité",
    metaDescription:
      "Agence marketing digital pour canyoning, rafting, via ferrata et hydrospeed : campagnes Google et Meta, SEO local et suivi des réservations en saison.",
    subtitle:
      "Canyoning, rafting, via ferrata, hydrospeed : nous remplissons vos départs avec les vacanciers, les groupes et les entreprises.",
    probleme: [
      "Les activités d'aventure se vendent sur une saison courte, à des vacanciers qui comparent sur leur téléphone.",
      "Les plateformes et offices de tourisme captent une partie de la demande, avec commission.",
      "La réservation directe et la visibilité locale sont les clés de la rentabilité.",
    ],
    demande: {
      intro:
        "Via ferrata, canyoning et rafting dépassent chacun 18 000 recherches mensuelles. La demande vient surtout de vacanciers qui préparent ou vivent leur séjour.",
      requetes: [
        { mot: "via ferrata", volume: 27800 },
        { mot: "canyoning", volume: 19100 },
        { mot: "rafting", volume: 18100 },
        { mot: "hydrospeed", volume: 3600 },
      ],
    },
    publics: [
      {
        titre: "Les vacanciers",
        texte:
          "Avant et pendant le séjour : SEO, fiche Google et annonces géolocalisées dans votre vallée.",
      },
      {
        titre: "Les groupes",
        texte:
          "EVG, colonies, clubs : offres de groupe et réponses rapides aux demandes.",
      },
      {
        titre: "Les entreprises",
        texte:
          "Séminaires en montagne : campagnes Google ciblées et partenariats avec les hébergeurs.",
      },
    ],
    saison:
      "De mai à septembre, avec un pic en juillet-août. Nous préparons les groupes au printemps et ciblons les vacanciers présents en saison.",
    faq: [
      {
        q: "Comment capter les vacanciers avant leur arrivée ?",
        a: "Avec du contenu SEO sur votre destination et des campagnes Google ciblant les recherches d'activités dans votre région.",
      },
      {
        q: "Comment se passer des plateformes ?",
        a: "Sans les abandonner : nous développons en parallèle la réservation directe, plus rentable, et mesurons la part de chaque canal.",
      },
      {
        q: "Faut-il une page par activité ?",
        a: "Oui : canyoning, rafting et via ferrata ont des publics et des recherches différents. Une page par activité améliore le référencement et la conversion.",
      },
    ],
  },
  {
    slug: "patinoire",
    famille: "outdoor",
    nom: "Patinoire",
    pour: "les patinoires",
    un: "une patinoire",
    votre: "votre patinoire",
    metaDescription:
      "Agence marketing digital pour patinoires de loisirs : campagnes Google et Meta, SEO local, soirées à thème et tracking pour remplir vos séances publiques.",
    subtitle:
      "Séances publiques, soirées à thème, anniversaires, groupes : nous faisons de votre patinoire une sortie incontournable de l'hiver.",
    probleme: [
      "Une patinoire concentre son activité sur l'hiver et les vacances.",
      "Les séances publiques se remplissent mal en semaine, et les soirées à thème manquent souvent de visibilité.",
      "Avec un coût par clic parmi les plus élevés du loisir sur Google, chaque euro doit être bien dépensé.",
    ],
    demande: {
      intro:
        "27 100 recherches par mois pour « patinoire », avec un coût par clic autour de 2 € : l'un des plus chers du loisir. Le SEO local et la fiche Google sont donc particulièrement rentables.",
      requetes: [{ mot: "patinoire", volume: 27100 }],
    },
    publics: [
      {
        titre: "Les familles",
        texte:
          "Mercredis, week-ends et vacances d'hiver : campagnes Meta et horaires toujours à jour sur Google.",
      },
      {
        titre: "Ados et jeunes adultes",
        texte:
          "Soirées à thème et événements : contenus Instagram et TikTok, billetterie en ligne.",
      },
      {
        titre: "Groupes et anniversaires",
        texte:
          "Écoles, CE, anniversaires : formules claires et formulaire de réservation suivi.",
      },
    ],
    saison:
      "Pic de novembre à mars, avec Noël et les vacances d'hiver. Nous lançons les campagnes dès l'automne et créons des temps forts (soirées, événements) pour lisser la fréquentation.",
    faq: [
      {
        q: "Comment remplir les séances en semaine ?",
        a: "Avec des offres dédiées (étudiants, groupes, entreprises) et des soirées à thème annoncées sur les réseaux et en publicité locale.",
      },
      {
        q: "Pourquoi le SEO local est-il prioritaire ?",
        a: "Parce que le clic Google Ads est cher sur « patinoire » : une fiche Google et des pages bien référencées captent la demande sans payer chaque visite.",
      },
      {
        q: "Une patinoire municipale peut-elle travailler avec une agence ?",
        a: "Oui, selon ses règles d'achat. Nous nous adaptons aux contraintes des structures publiques et délégataires.",
      },
    ],
  },
  {
    slug: "base-de-loisirs",
    famille: "outdoor",
    nom: "Base de loisirs",
    pour: "les bases de loisirs",
    un: "une base de loisirs",
    votre: "votre base",
    metaDescription:
      "Agence marketing digital pour bases de loisirs et bases nautiques : campagnes Google et Meta, SEO et tracking pour attirer familles, groupes et vacanciers.",
    subtitle:
      "Baignade, activités nautiques, accrobranche, restauration : nous faisons connaître toute votre offre et remplissons votre saison.",
    probleme: [
      "Une base de loisirs propose souvent une dizaine d'activités, gérées par des équipes ou des prestataires différents.",
      "Le visiteur, lui, cherche simplement une sortie en famille pour le week-end.",
      "Il faut donc une communication claire, unifiée et mesurable.",
    ],
    demande: {
      intro:
        "18 100 recherches par mois pour « base de loisirs », et des milliers de familles qui cherchent quoi faire le week-end. Votre base doit répondre à ces recherches d'idées.",
      requetes: [
        { mot: "base de loisirs", volume: 18100 },
        { mot: "que faire ce week end", volume: 5700 },
        { mot: "base nautique", volume: 4400 },
        { mot: "sortie en famille", volume: 2400 },
      ],
    },
    publics: [
      {
        titre: "Les familles de la région",
        texte:
          "Week-ends ensoleillés : campagnes Meta, programme des activités et informations pratiques à jour.",
      },
      {
        titre: "Les groupes",
        texte:
          "Centres de loisirs, colonies, scolaires, CE : relances au printemps et formulaire de devis.",
      },
      {
        titre: "Les vacanciers",
        texte:
          "SEO sur votre destination et annonces géolocalisées autour des hébergements.",
      },
    ],
    saison:
      "Concentrée de mai à septembre et très dépendante de la météo. Nous préparons les groupes dès le printemps et pilotons les budgets grand public selon les prévisions.",
    faq: [
      {
        q: "Comment communiquer sur une offre aussi large ?",
        a: "En la structurant par public (familles, groupes, sportifs) plutôt que par activité. Chaque public a sa page, ses messages et ses campagnes.",
      },
      {
        q: "Les bases publiques peuvent-elles faire de la publicité ?",
        a: "Oui. Nous travaillons avec des délégataires et des structures publiques en respectant leurs procédures d'achat.",
      },
      {
        q: "Comment mesurer la fréquentation générée ?",
        a: "Nous suivons les réservations en ligne et les demandes de groupe, et comparons la fréquentation par période pour estimer l'effet des campagnes.",
      },
    ],
  },
  {
    slug: "salle-escalade",
    famille: "outdoor",
    nom: "Salle d'escalade",
    pour: "les salles d'escalade",
    un: "une salle d'escalade",
    votre: "votre salle",
    metaDescription:
      "Agence marketing digital pour salles d'escalade et de bloc : campagnes Google et Meta, SEO local et tracking pour recruter débutants, abonnés et groupes.",
    subtitle:
      "Séances découverte, abonnements, cours enfants, entreprises : nous recrutons de nouveaux grimpeurs et remplissons vos heures creuses.",
    probleme: [
      "L'escalade en salle séduit un public de plus en plus large, bien au-delà des grimpeurs confirmés.",
      "La concurrence entre salles s'intensifie dans les grandes villes.",
      "Le défi : transformer une séance découverte en abonnement.",
    ],
    demande: {
      intro:
        "60 500 recherches par mois pour « escalade », 10 800 pour « salle d'escalade ». Les débutants et les parents (escalade enfant) sont la principale source de croissance.",
      requetes: [
        { mot: "escalade", volume: 60500 },
        { mot: "salle d'escalade", volume: 10800 },
        { mot: "escalade enfant", volume: 1300 },
        { mot: "salle de bloc", volume: 810 },
      ],
    },
    publics: [
      {
        titre: "Les débutants",
        texte:
          "Séances d'initiation et offres découverte poussées sur Google et Meta, puis relances pour l'abonnement.",
      },
      {
        titre: "Les enfants",
        texte:
          "Cours et stages pendant les vacances : campagnes ciblées parents à la rentrée et avant chaque vacances.",
      },
      {
        titre: "Les entreprises",
        texte:
          "Team building et créneaux de midi : un levier pour les heures creuses.",
      },
    ],
    saison:
      "Pics à la rentrée et en janvier (bonnes résolutions), activité plus calme l'été. Nous concentrons le recrutement d'abonnés sur ces deux périodes.",
    faq: [
      {
        q: "Comment transformer une séance découverte en abonnement ?",
        a: "Avec une séquence email et SMS après la première visite, et une offre de conversion limitée dans le temps. Nous mesurons le taux de passage à l'abonnement.",
      },
      {
        q: "L'escalade relève-t-elle du loisir ?",
        a: "Pour la majorité de vos nouveaux clients, oui : ils viennent découvrir une activité, pas pratiquer en compétition. C'est ce public que nous recrutons.",
      },
      {
        q: "Comment remplir les créneaux de journée ?",
        a: "Avec les entreprises, les étudiants et les scolaires, et des offres ciblées diffusées uniquement sur ces créneaux.",
      },
    ],
  },

  /* ── Séjours & bien-être ───────────────────────────────── */
  {
    slug: "camping",
    famille: "sejour",
    nom: "Camping",
    pour: "les campings",
    un: "un camping",
    votre: "votre camping",
    metaDescription:
      "Agence marketing digital pour campings et hôtellerie de plein air : SEO, Google Ads, Meta Ads et tracking pour augmenter les réservations en direct.",
    subtitle:
      "Mobil-homes, emplacements, séjours tout compris : nous augmentons vos réservations en direct et réduisons votre dépendance aux plateformes.",
    probleme: [
      "Les plateformes de réservation captent une part croissante des séjours, avec des commissions qui rognent votre marge.",
      "Vos clients préparent leurs vacances des mois à l'avance et comparent longuement.",
      "Un site rapide, bien référencé et relié à vos campagnes est la condition pour récupérer ces réservations en direct.",
    ],
    demande: {
      intro:
        "« Camping » se cherche plus d'un million de fois par mois en France. Les requêtes précises (piscine, bord de mer, parc aquatique) sont celles qui convertissent. Côté professionnels, le SEO et le site internet sont les sujets les plus recherchés du loisir.",
      requetes: [
        { mot: "camping", volume: 1220000 },
        { mot: "camping piscine", volume: 9900 },
        { mot: "camping bord de mer", volume: 9900 },
        { mot: "camping avec parc aquatique", volume: 5700 },
        { mot: "seo camping", volume: 110 },
        { mot: "création site internet camping", volume: 90 },
      ],
    },
    publics: [
      {
        titre: "Les familles en vacances",
        texte:
          "Elles réservent tôt : SEO sur vos atouts (piscine, mer, animations) et campagnes Google dès janvier.",
      },
      {
        titre: "Les anciens clients",
        texte:
          "Les plus rentables : emailing de fidélisation et offres de réservation anticipée.",
      },
      {
        titre: "Les courts séjours",
        texte:
          "Ponts et week-ends : campagnes Meta géociblées sur les villes proches.",
      },
    ],
    saison:
      "Les réservations démarrent dès l'automne précédent, avec un pic de janvier à mars. Nous préparons la saison suivante dès la fin de l'été et relançons les dernières disponibilités au printemps.",
    faq: [
      {
        q: "Comment augmenter les réservations en direct ?",
        a: "Avec un site rapide, un moteur de réservation simple, du SEO sur vos atouts et des campagnes sur votre propre nom pour ne pas laisser les plateformes capter vos clients.",
      },
      {
        q: "Quand lancer les campagnes ?",
        a: "Dès l'automne pour les anciens clients, puis en janvier pour le grand public : c'est là que se réserve l'essentiel de l'été.",
      },
      {
        q: "Vous créez des sites pour les campings ?",
        a: "Oui, nous créons et référençons des sites pensés pour la réservation, reliés à votre moteur et à vos outils de mesure.",
      },
    ],
  },
  {
    slug: "hebergement-insolite",
    titre: "Marketing digital pour hébergements insolites",
    famille: "sejour",
    nom: "Hébergement insolite",
    pour: "les hébergements insolites",
    un: "un hébergement insolite",
    votre: "votre hébergement",
    metaDescription:
      "Agence marketing digital pour hébergements insolites et glamping : cabanes, bulles, lodges. SEO, Meta Ads, Google Ads et tracking des réservations en direct.",
    subtitle:
      "Cabanes perchées, bulles, lodges, glamping : nous vendons l'expérience avant la nuit, et augmentons vos réservations en direct.",
    probleme: [
      "Un hébergement insolite vend une expérience, souvent offerte ou réservée pour une occasion spéciale.",
      "Les plateformes et les coffrets cadeaux prennent une part importante de la marge.",
      "Vos visuels et votre récit sont vos meilleurs atouts pour vendre en direct.",
    ],
    demande: {
      intro:
        "« Cabane dans les arbres » se cherche 40 500 fois par mois, « nuit insolite » 18 100 fois. Une demande émotionnelle, portée par les visuels : Instagram et Meta y sont particulièrement efficaces.",
      requetes: [
        { mot: "cabane dans les arbres", volume: 40500 },
        { mot: "nuit insolite", volume: 18100 },
        { mot: "hébergement insolite", volume: 12100 },
        { mot: "glamping", volume: 9900 },
      ],
    },
    publics: [
      {
        titre: "Les couples",
        texte:
          "Anniversaires, Saint-Valentin, demandes en mariage : campagnes Meta et offres romantiques.",
      },
      {
        titre: "Les offreurs de cadeaux",
        texte:
          "Bons cadeaux en ligne, avec des pics à Noël et à la fête des mères.",
      },
      {
        titre: "Les familles et amis",
        texte:
          "Week-ends et vacances : SEO sur votre région et vos hébergements.",
      },
    ],
    saison:
      "Réservations toute l'année, avec des pics à la Saint-Valentin, au printemps et en été, et des bons cadeaux en fin d'année. Nous construisons un calendrier de campagnes autour de ces occasions.",
    faq: [
      {
        q: "Instagram est-il indispensable ?",
        a: "Pour un hébergement insolite, c'est votre vitrine principale. Nous travaillons vos contenus, vos publicités Meta et les collaborations avec des créateurs.",
      },
      {
        q: "Comment vendre des bons cadeaux en direct ?",
        a: "Avec une boutique cadeau simple sur votre site et des campagnes calées sur les fêtes. Chaque bon vendu est suivi comme une conversion.",
      },
      {
        q: "Comment réduire la part des plateformes ?",
        a: "En rendant votre réservation directe aussi simple et en captant vous-même les recherches sur votre nom et votre région.",
      },
    ],
  },
  {
    slug: "tourisme",
    famille: "sejour",
    nom: "Tourisme",
    pour: "les acteurs du tourisme",
    un: "une activité touristique",
    votre: "votre activité",
    metaDescription:
      "Agence marketing digital pour acteurs du tourisme et activités touristiques : SEO, Google Ads, Meta Ads, influence et tracking pour attirer plus de visiteurs.",
    subtitle:
      "Sites de visite, activités, visites guidées, destinations : nous faisons venir les visiteurs avant et pendant leur séjour, et mesurons ce qui fonctionne.",
    probleme: [
      "Le visiteur prépare son séjour en ligne, puis cherche quoi faire une fois sur place.",
      "Votre activité doit apparaître à ces deux moments, sur Google comme sur les réseaux sociaux.",
      "Et sans mesure, impossible de savoir si vos visiteurs viennent de vos campagnes ou du hasard.",
    ],
    demande: {
      intro:
        "Les recherches d'idées de sortie se comptent en milliers chaque mois. Côté professionnels, le tourisme est l'un des rares secteurs du loisir où l'on cherche activement une agence (communication, SEO, web).",
      requetes: [
        { mot: "que faire ce week end", volume: 5700 },
        { mot: "sortie en famille", volume: 2400 },
        { mot: "idée sortie", volume: 1100 },
        { mot: "visite guidée", volume: 910 },
        { mot: "agence communication tourisme", volume: 110 },
        { mot: "agence seo tourisme", volume: 90 },
      ],
    },
    publics: [
      {
        titre: "Les visiteurs qui préparent",
        texte:
          "SEO sur votre destination et campagnes Google dans les régions émettrices.",
      },
      {
        titre: "Les visiteurs sur place",
        texte:
          "Fiche Google, annonces géolocalisées et réservation mobile.",
      },
      {
        titre: "Les groupes",
        texte:
          "Autocaristes, scolaires, CE : formulaire de devis et relances avant la saison.",
      },
    ],
    saison:
      "Saisonnalité propre à chaque destination. Nous construisons un calendrier marketing aligné sur vos périodes fortes, avec un travail de fond sur les ailes de saison.",
    faq: [
      {
        q: "Travaillez-vous avec des offices de tourisme ?",
        a: "Nous travaillons surtout avec des exploitants d'activités et de sites de visite, et collaborons volontiers avec les offices de tourisme de leur destination.",
      },
      {
        q: "L'influence marche-t-elle pour une activité touristique ?",
        a: "Oui, notamment avec des créateurs locaux. Notre plateforme Allocreator permet de trouver ceux qui sont proches de votre établissement.",
      },
      {
        q: "Comment toucher les touristes étrangers ?",
        a: "Avec des pages et des campagnes dans leur langue, ciblées sur leurs pays et leurs périodes de voyage.",
      },
    ],
  },
  {
    slug: "spa",
    famille: "sejour",
    nom: "Spa",
    pour: "les spas",
    un: "un spa",
    votre: "votre spa",
    metaDescription:
      "Agence marketing digital pour spas, day spas et spas privatifs : SEO local, Google Ads, Meta Ads, bons cadeaux et tracking des réservations.",
    subtitle:
      "Day spa, spa privatif, soins et massages, bons cadeaux : nous remplissons votre planning et faisons de votre spa l'évidence de votre ville.",
    probleme: [
      "Le spa est un marché énorme et très concurrentiel, entre hôtels, instituts et spas privatifs.",
      "Une grande partie du chiffre passe par les bons cadeaux, avec des pics très marqués.",
      "Et les créneaux de semaine restent difficiles à remplir sans offres ciblées.",
    ],
    demande: {
      intro:
        "« Spa » se cherche 550 000 fois par mois en France, « massage » 301 000 fois. Les formats privatifs et le cadeau tirent une demande à forte valeur.",
      requetes: [
        { mot: "spa", volume: 550000 },
        { mot: "massage", volume: 301000 },
        { mot: "sauna", volume: 60500 },
        { mot: "spa privatif", volume: 12100 },
        { mot: "day spa", volume: 1900 },
        { mot: "coffret spa", volume: 390 },
      ],
    },
    publics: [
      {
        titre: "Les couples",
        texte:
          "Spa privatif, soins duo : campagnes Meta et offres pour les occasions (Saint-Valentin, anniversaires).",
      },
      {
        titre: "Les offreurs de cadeaux",
        texte:
          "Bons cadeaux en ligne, avec des campagnes calées sur Noël, la fête des mères et la Saint-Valentin.",
      },
      {
        titre: "Les clients réguliers",
        texte:
          "Abonnements et cures : emailing, fidélisation et remplissage des créneaux de semaine.",
      },
    ],
    saison:
      "Pics en hiver, à Noël, à la Saint-Valentin et pour la fête des mères. Nous préparons chaque temps fort en avance et utilisons les périodes creuses pour fidéliser.",
    faq: [
      {
        q: "Comment vendre plus de bons cadeaux ?",
        a: "Avec une boutique en ligne simple, des visuels soignés et des campagnes lancées deux à trois semaines avant chaque fête. Chaque bon vendu est suivi comme une conversion.",
      },
      {
        q: "Comment remplir les créneaux de semaine ?",
        a: "Avec des offres réservées à ces créneaux, diffusées auprès des clients locaux et des entreprises de votre zone.",
      },
      {
        q: "Un spa d'hôtel peut-il travailler avec vous ?",
        a: "Oui : nous travaillons la visibilité du spa auprès de la clientèle locale, en complément de la clientèle de l'hôtel.",
      },
    ],
  },
];

export function getSecteur(slug: string): Secteur | undefined {
  return SECTEURS.find((s) => s.slug === slug);
}

export function cheminSecteur(slug: string): string {
  return `/${SECTEUR_PREFIXE}${slug}`;
}

export function secteursParFamille(): Array<{
  famille: Famille;
  label: string;
  secteurs: Secteur[];
}> {
  return (Object.keys(FAMILLES) as Famille[]).map((famille) => ({
    famille,
    label: FAMILLES[famille],
    secteurs: SECTEURS.filter((s) => s.famille === famille),
  }));
}

/**
 * FAQ « agence », placée avant la FAQ métier de chaque secteur.
 *
 * Reprend les réponses de la landing parc de loisir (fonctionnement, budget,
 * retour sur investissement, contrat, pourquoi nous) en les adaptant au
 * secteur, et les développe : chaque question reprend « marketing digital »
 * et le nom du secteur, ce que Google et les IA lisent comme une réponse
 * directe à « agence marketing digital + secteur ».
 */
export function faqAgence(s: Secteur): Array<{ q: string; a: string }> {
  return [
    {
      q: `Comment fonctionne votre accompagnement marketing digital pour ${s.pour} ?`,
      a: `Nous activons les leviers les plus performants pour ${s.votre} : SEO local, Google Ads, Meta Ads et marketing d'influence, appuyés par un tracking fiable des réservations. Nous savons déjà quels mots-clés et quelles audiences génèrent des réservations dans le loisir, nous concentrons donc vos investissements uniquement sur ce qui fonctionne. Notre méthode est simple : des techniques éprouvées chez d'autres acteurs du loisir, que nous adaptons à votre situation pour créer un véritable cercle vertueux de croissance.`,
    },
    {
      q: `Quels leviers marketing activez-vous pour ${s.votre} ?`,
      a: `Selon vos objectifs : la stratégie digitale, les campagnes Google Ads et Meta Ads, le SEO et le site internet, le tracking des réservations, le reporting, les visuels et vidéos, l'influence avec des créateurs proches de votre établissement, et la formation de vos équipes. Nous ne vendons pas un catalogue : nous commençons par les deux ou trois leviers qui auront le plus d'impact sur la fréquentation de ${s.votre}.`,
    },
    {
      q: `Quel budget prévoir pour le marketing digital de ${s.votre} ?`,
      a: `Il n'y a pas de minimum imposé pour vos campagnes publicitaires. Le budget Ads est défini et ajusté en fonction de la taille de ${s.votre}, de la saisonnalité et de vos objectifs de fréquentation. À noter : ce budget est distinct de nos honoraires mensuels. Notre rôle est d'optimiser chaque euro investi pour maximiser vos résultats.`,
    },
    {
      q: "En combien de temps puis-je avoir un retour sur investissement ?",
      a: `Nous pouvons déployer une stratégie Google Ads et Meta Ads optimisée en moins de 15 jours. Notre objectif : générer +20 % de fréquentation pour ${s.votre}, nouveaux clients comme clients réguliers, dès les 45 premiers jours. Le SEO prend plus de temps, mais ses effets durent bien au-delà de la fin des campagnes.`,
    },
    {
      q: "Y a-t-il un contrat ?",
      a: "Non, aucun engagement. Vous êtes libre d'arrêter la collaboration à tout moment, sans justification. Nous préférons nous concentrer sur ce qui compte vraiment : vous apporter de la valeur, obtenir des résultats concrets et vous satisfaire pleinement. Notre approche repose sur la confiance et la performance, pas sur les contraintes contractuelles.",
    },
    {
      q: `Pourquoi choisir Banana Growth Agency pour ${s.votre} ?`,
      a: `Nous accompagnons déjà plus de 20 acteurs du loisir en France et connaissons parfaitement leurs enjeux : saisonnalité, créneaux creux, anniversaires, groupes, logiciels de réservation. De la publicité à la data, de la création de contenus à l'influence, nous maîtrisons tous les leviers de croissance. Notre mission : augmenter la visibilité de ${s.votre}, attirer plus de clients et faire progresser votre chiffre d'affaires.`,
    },
    {
      q: "Que se passe-t-il pendant l'audit offert ?",
      a: `En 30 minutes, nous passons en revue votre présence en ligne (site, fiche Google, campagnes, suivi des réservations) et identifions ensemble les principaux leviers d'optimisation pour ${s.votre}. Vous repartez avec des pistes concrètes, que vous travailliez avec nous ou non.`,
    },
  ];
}
