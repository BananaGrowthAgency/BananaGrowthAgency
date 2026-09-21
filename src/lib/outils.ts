/**
 * Contenu éditorial des fiches « outils pour parcs de loisirs ».
 *
 * Phase 1 : une fiche par outil — pour qui c'est fait, fonctionnalités clés,
 * tarifs. Le comparatif transversal et les guides d'implémentation du suivi
 * publicitaire viendront en phase 2 et 3.
 *
 * Règle éditoriale : on ne publie que ce qui est vérifiable. Tout ce qui n'a
 * pas pu être confirmé va dans `lacunes`, affiché tel quel sur la page. Les
 * chiffres repris d'un tiers portent leur source dans le texte.
 */

export type Fonctionnalite = { titre: string; desc: string };

export type LigneTarif = {
  label: string;
  valeur: string;
  /** D'où vient le chiffre. Absent = communication officielle de l'éditeur. */
  source?: string;
};

export type Outil = {
  slug: string;
  nom: string;
  /** Une phrase, affichée sous le titre et dans les cartes du hub. */
  baseline: string;
  /** Méta-description, propre à la fiche. Viser 150 à 160 caractères. */
  description: string;
  /** Résumé d'une ligne du public cible, pour les cartes du hub. */
  pourQuiCourt: string;
  editeur: { pays: string; depuis?: string; groupe?: string };
  chiffres: { valeur: string; label: string }[];
  pourQui: { intro: string; profils: string[]; moinsAdapte: string[] };
  fonctionnalites: Fonctionnalite[];
  tarifs: {
    /** true si l'éditeur affiche publiquement une grille. */
    publie: boolean;
    intro: string;
    lignes: LigneTarif[];
    manquant: string[];
  };
  /** Constats issus d'installations réelles. Absent si non audité. */
  constate?: { intro: string; points: string[] };
  vigilance: string[];
  /** Ce qu'on n'a pas pu vérifier — affiché en clair sur la page. */
  lacunes: string[];
  site: string;
  sources: { label: string; url: string }[];
};

/* ────────────────────────────────────────────────────────────── */

export const OUTILS: Outil[] = [
  {
    slug: "qweekle",
    nom: "Qweekle",
    baseline:
      "Plateforme française de billetterie et de contrôle d'accès, pensée pour les sites à forte fréquentation et à jauges.",
    description:
      "Qweekle : billetterie, contrôle d'accès et jauges. À qui s'adresse l'outil, ses fonctions clés, ses tarifs, et ce que révèle une installation en production.",
    pourQuiCourt:
      "Sites à jauges et contrôle d'accès : parcs animaliers, aquatiques, musées, trampoline.",
    editeur: { pays: "France" },
    chiffres: [
      { valeur: "10+", label: "secteurs couverts" },
      { valeur: "7/7", label: "support annoncé" },
      { valeur: "API", label: "modules interconnectés" },
    ],
    pourQui: {
      intro:
        "Qweekle vise les exploitants dont le métier se joue sur le flux d'entrée : gérer une jauge, contrôler des accès, vendre des billets horodatés et absorber des pics de fréquentation sans créer de file d'attente.",
      profils: [
        "Parcs animaliers, zoos et aquariums",
        "Parcs aquatiques et piscines à jauge réglementée",
        "Trampoline parks et aires de jeux couvertes",
        "Musées, châteaux et sites patrimoniaux",
        "Parcours aventure, grottes et sites souterrains",
        "Escape games, laser games et centres de réalité virtuelle",
        "Équipements sportifs : futsal, escalade, patinoire",
      ],
      moinsAdapte: [
        "Les centres dont le cœur d'activité est le chronométrage sportif : Qweekle ne propose pas de module de live timing.",
        "Les exploitants qui cherchent une grille tarifaire publique pour arbitrer vite : aucun prix n'est communiqué en ligne.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Billetterie",
        desc: "Billets open ou horodatés, usage unique ou multiple pour les abonnements, et billetterie privée destinée aux revendeurs et partenaires. Diffusion en e-billet ou en impression thermique, rouleau et planches A4, avec codes-barres numérotés à usage unique.",
      },
      {
        titre: "Contrôle d'accès",
        desc: "Contrôle fixe ou mobile adossé aux billets émis. C'est le point fort revendiqué de la plateforme et ce qui la distingue des solutions purement transactionnelles.",
      },
      {
        titre: "Caisse",
        desc: "Encaissement sur site, relié aux mêmes référentiels produits et tarifs que la vente en ligne.",
      },
      {
        titre: "Vente en ligne",
        desc: "Boutique de réservation et de paiement hébergée par Qweekle, synchronisée en temps réel avec le planning et les jauges.",
      },
      {
        titre: "Planning et jauges",
        desc: "Calendrier d'activités avec gestion des capacités, des équipements et des casiers vestiaires.",
      },
      {
        titre: "Tarification",
        desc: "Grille adaptable par produit et par type de client, tarification en heures pleines et creuses ou au temps passé, quantités minimales et maximales par commande.",
      },
      {
        titre: "Marketing et reporting",
        desc: "Modules de fidélisation et de suivi d'activité. Le périmètre exact n'est pas détaillé publiquement.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Qweekle ne publie aucune grille tarifaire. Le prix s'obtient sur devis, après qualification du besoin.",
      lignes: [
        {
          label: "Abonnement mensuel",
          valeur: "Non communiqué",
        },
        {
          label: "Frais de mise en service",
          valeur: "Non communiqué",
        },
        {
          label: "Commission sur les réservations en ligne",
          valeur: "Non communiquée",
        },
        {
          label: "Matériel (caisse, imprimante, contrôle d'accès)",
          valeur: "Non communiqué",
        },
      ],
      manquant: [
        "La grille par palier et ce que chaque niveau inclut",
        "L'existence et le taux d'une éventuelle commission sur les ventes en ligne",
        "Le coût du matériel de contrôle d'accès, qui pèse lourd sur ce type d'installation",
        "La durée d'engagement et les conditions de sortie",
      ],
    },
    constate: {
      intro:
        "Nous opérons plusieurs parcs équipés de Qweekle. Voici ce que montre une installation en production, vérifié en septembre 2026 sur le tunnel de Prison Island Le Mans.",
      points: [
        "Le tunnel de réservation tourne sur un sous-domaine dédié par client, au format prisonisland-lemans.qweekle.com, et non sur le domaine du parc.",
        "Chaque exploitant peut déposer son propre conteneur Google Tag Manager sur la boutique, ce qui permet d'y installer ses propres outils de mesure.",
        "Le tunnel pousse des événements de commerce : ajout au panier, progression dans le tunnel et achat.",
        "Les pages de la boutique sont en noindex : elles ne remontent pas dans Google, tout le référencement doit donc vivre sur le site du parc.",
      ],
    },
    vigilance: [
      "La boutique étant hébergée sur qweekle.com, le visiteur change de domaine entre le site du parc et le paiement. Sans configuration spécifique, les statistiques attribuent une partie des ventes à « qweekle.com » plutôt qu'à la source réelle — publicité, Google ou réseaux sociaux.",
      "La nomenclature des événements de suivi repose sur une spécification que Google a remplacée depuis. Cela reste exploitable, mais demande un travail de correspondance pour alimenter correctement les outils publicitaires.",
      "Aucun tarif public : il faut passer par un devis pour comparer, ce qui allonge la phase de choix.",
    ],
    lacunes: [
      "Grille tarifaire complète et paliers",
      "Existence d'une commission sur les réservations en ligne",
      "Délai entre signature et mise en service",
      "Conditions d'export de la base clients en cas de départ",
      "Documentation officielle du suivi des conversions",
    ],
    site: "https://www.qweekle.com/",
    sources: [
      { label: "Site officiel Qweekle", url: "https://www.qweekle.com/" },
      {
        label: "Qweekle — module billetterie",
        url: "https://www.qweekle.com/fonctionalites/billetterie-logiciel-loisir-culture/",
      },
      {
        label: "Qweekle — parcs d'attractions",
        url: "https://www.qweekle.com/secteurs/logiciel-billetterie-gestion-controle-dacces-parc-dattractions-marketing/",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "playpro",
    nom: "PlayPro",
    baseline:
      "Solution française tout-en-un, la seule du panel à afficher publiquement son tarif et à revendiquer un fonctionnement sans engagement.",
    description:
      "PlayPro : le seul du panel à afficher son tarif, dès 39 €/mois sans engagement. 65 modules, 14 secteurs — à qui il s'adresse et ce qu'il couvre vraiment.",
    pourQuiCourt:
      "Structures qui veulent un tarif lisible et tout regrouper : padel, bowling, escape, karaoké.",
    editeur: { pays: "France", depuis: "2023", groupe: "Nehos Groupe" },
    chiffres: [
      { valeur: "65+", label: "modules annoncés" },
      { valeur: "39 €", label: "point d'entrée mensuel" },
      { valeur: "14+", label: "secteurs adressés" },
    ],
    pourQui: {
      intro:
        "PlayPro s'adresse aux exploitants qui veulent remplacer un empilement d'outils par une seule plateforme, avec un tarif connu d'avance. Le positionnement est explicitement celui du rapport prix-couverture fonctionnelle.",
      profils: [
        "Clubs de padel, golfs et structures de réservation à créneaux",
        "Bowlings, laser games et karaokés",
        "Escape games, quiz rooms et centres de réalité virtuelle",
        "Paintball, parcs de trampolines et parcs enfants",
        "Karting et centres multiactivités",
        "Petites structures et indépendants, l'offre d'entrée étant sans engagement",
      ],
      moinsAdapte: [
        "Les sites dont l'enjeu principal est le contrôle d'accès physique sur de grosses jauges : ce n'est pas l'axe mis en avant.",
        "Les centres de karting qui ont besoin d'un chronométrage intégré : PlayPro ne revendique pas de module de live timing.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Réservation en ligne",
        desc: "Prise de réservation 24h/24, gestion centralisée des disponibilités et des annulations. L'offre peut être diffusée simultanément sur une vingtaine de plateformes, dont Tripadvisor, Expedia et Booking.",
      },
      {
        titre: "Caisse",
        desc: "Encaissement sur site relié au même référentiel que la réservation.",
      },
      {
        titre: "CRM et marketing",
        desc: "Base clients et automatisation des emails. C'est le point sur lequel PlayPro se différencie le plus frontalement de ses concurrents historiques.",
      },
      {
        titre: "Fidélité et cartes cadeaux",
        desc: "Programmes de fidélité et vente de bons cadeaux intégrés.",
      },
      {
        titre: "Application mobile",
        desc: "Application destinée aux clients finaux du centre.",
      },
      {
        titre: "Site web ou intégration",
        desc: "L'exploitant peut conserver son site actuel et y intégrer le système de réservation et de paiement, ou faire réaliser par PlayPro un site avec boutique en ligne.",
      },
      {
        titre: "Ressources humaines et automatisation",
        desc: "Planning du personnel et automatisation de tâches administratives.",
      },
      {
        titre: "Comptabilité",
        desc: "Génération de devis et de factures.",
      },
      {
        titre: "Intelligence artificielle",
        desc: "Agent de réservation et assistant d'analyse. Fonctions récentes, dont le périmètre réel reste à éprouver.",
      },
      {
        titre: "Intégrations",
        desc: "Stripe, Zapier, Make, Google Business, Google Agenda, Twilio, Mailjet, Google Analytics et Google Tag Manager, ainsi qu'une API ouverte et des webhooks.",
      },
    ],
    tarifs: {
      publie: true,
      intro:
        "PlayPro est le seul outil du panel à afficher un prix. Attention toutefois : les montants diffèrent selon les pages de l'éditeur, ce qui suggère plusieurs paliers dont la structure n'est pas détaillée.",
      lignes: [
        {
          label: "Point d'entrée",
          valeur: "À partir de 39 €/mois, sans engagement",
        },
        {
          label: "Tarif cité sur leur blog",
          valeur: "79 €/mois",
          source: "article comparatif publié par PlayPro",
        },
        {
          label: "Argument de comparaison affiché",
          valeur: "Remplace un empilement d'outils chiffré à 397 €/mois",
        },
        {
          label: "Commission sur les réservations en ligne",
          valeur: "Non communiquée",
        },
        { label: "Frais de mise en service", valeur: "Non communiqué" },
      ],
      manquant: [
        "Le détail des paliers entre 39 € et 79 €, et ce que chacun contient",
        "Ce qui bascule en supplément : application mobile, modules d'IA, site web",
        "L'existence et le taux d'une commission sur les ventes en ligne",
        "Le coût du matériel de caisse",
      ],
    },
    vigilance: [
      "L'éditeur communique des volumes clients variables selon les pages, de 150 exploitants à plus de 650 établissements. L'ordre de grandeur est crédible, le chiffre exact ne l'est pas.",
      "La solution a été lancée en 2023 : elle est nettement plus jeune que ses concurrents, ce qui joue dans les deux sens — moins de dette technique, mais moins de recul en exploitation.",
      "PlayPro publie des comparatifs qui la placent en tête face à ses concurrents. À lire comme de la communication commerciale, pas comme une source neutre.",
    ],
    lacunes: [
      "Structure exacte des paliers tarifaires",
      "Architecture du tunnel de réservation : reste-t-il sur le domaine du parc ?",
      "Existence d'une commission sur les réservations en ligne",
      "Fonctionnement concret des intégrations Analytics et Tag Manager annoncées",
      "Délai de mise en service et contenu de la formation",
    ],
    site: "https://playpro.fr/",
    sources: [
      { label: "Site officiel PlayPro", url: "https://playpro.fr/" },
      { label: "PlayPro — cas clients", url: "https://playpro.fr/cas-clients/" },
      { label: "Nehos Groupe", url: "https://nehos-groupe.com/playpro/" },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "apex-timing",
    nom: "Apex Timing",
    baseline:
      "Spécialiste français du karting, né du chronométrage. La seule solution du panel à intégrer nativement le live timing.",
    description:
      "Apex Timing : le spécialiste français du karting, seul à intégrer le chronométrage. Pour qui, fonctions clés, tarifs, et ce que montre un tunnel en production.",
    pourQuiCourt:
      "Karting de loisir, et centres multiactivités adossés à une piste.",
    editeur: { pays: "France", depuis: "2011" },
    chiffres: [
      { valeur: "2011", label: "année de création" },
      { valeur: "ms", label: "précision du chronométrage" },
      { valeur: "1", label: "logiciel pour piste et centre" },
    ],
    pourQui: {
      intro:
        "Apex Timing vient du chronométrage avant de venir de la gestion. C'est ce qui en fait le choix par défaut des kartings de loisir : le même logiciel pilote la course et la caisse, sans passerelle à maintenir entre deux éditeurs.",
      profils: [
        "Kartings de loisir, en intérieur comme en extérieur",
        "Centres multiactivités construits autour d'une piste",
        "Exploitants qui organisent des courses, des manches et des championnats",
        "Structures qui ont besoin d'affichages de résultats et de live timing",
      ],
      moinsAdapte: [
        "Les parcs sans activité chronométrée : une large part de la valeur du produit devient inutile.",
        "Les exploitants qui veulent une plateforme marketing complète — c'est le reproche que lui adressent ses concurrents, et le module marketing n'est pas son axe fort.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Chronométrage et live timing",
        desc: "Mesure du temps de chaque pilote à la milliseconde et position en course en temps réel. C'est le socle historique du produit et sa vraie différence.",
      },
      {
        titre: "Affichages et gestion de course",
        desc: "Écrans de résultats et outils d'organisation des sessions pour les commissaires de piste.",
      },
      {
        titre: "Réservation en ligne",
        desc: "Choix du produit, sélection de la date, réservation de sessions, paiement et e-ticket.",
      },
      {
        titre: "Billetterie",
        desc: "Vente de billets, bons cadeaux, tickets comités d'entreprise, bar et restauration.",
      },
      {
        titre: "Caisse NF525",
        desc: "Encaissement multipaiement et multidevise, facturation et gestion des stocks, conforme à la norme NF525.",
      },
      {
        titre: "Planning multiactivité",
        desc: "Calendrier couvrant plusieurs activités sur un même site.",
      },
      {
        titre: "Application mobile personnalisée",
        desc: "Application aux couleurs et au logo du centre : inscription, réservation de sessions et d'événements, paiement sécurisé, facturation et accès facilité.",
      },
      {
        titre: "Fidélité et gestion commerciale",
        desc: "Programme de fidélité, emailing et suivi commercial.",
      },
      {
        titre: "Analyse et maintenance",
        desc: "Rapports d'activité, export comptable et suivi de la maintenance du parc de karts.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Apex Timing ne publie pas de grille. Le seul montant en circulation provient d'un comparatif publié par un concurrent direct : il doit être traité comme une estimation non confirmée, pas comme un tarif.",
      lignes: [
        {
          label: "Abonnement mensuel",
          valeur: "Environ 300 €/mois",
          source:
            "chiffre avancé par PlayPro, concurrent direct — non confirmé par Apex Timing",
        },
        { label: "Module chronométrage", valeur: "Inclusion non précisée" },
        {
          label: "Matériel de piste et affichages",
          valeur: "Non communiqué",
        },
        {
          label: "Commission sur les réservations en ligne",
          valeur: "Non communiquée",
        },
      ],
      manquant: [
        "Une grille tarifaire émanant de l'éditeur lui-même",
        "Ce que couvre l'abonnement, et ce qui relève du matériel de chronométrage",
        "Le coût des boucles, transpondeurs et écrans d'affichage",
        "L'existence d'une commission sur les ventes en ligne",
      ],
    },
    constate: {
      intro:
        "Nous opérons des centres équipés d'Apex Timing. Voici ce que montre une installation en production, vérifié en septembre 2026 sur le tunnel de Fun Space.",
      points: [
        "Le tunnel de réservation tourne sur le domaine d'Apex Timing lui-même, chaque centre étant identifié par un paramètre dans l'adresse. Ce domaine est donc partagé entre tous les centres clients.",
        "Chaque centre dispose de son propre conteneur de mesure, avec ses identifiants Google Analytics, Google Ads et son pixel publicitaire.",
        "Le tunnel pousse des événements de commerce conformes à la spécification actuelle de Google, complétés par des événements métier nommés : réservation en ligne, commande de chèques cadeaux.",
        "Sur la qualité du suivi, c'est l'implémentation la plus propre des cinq outils examinés — un constat qui va à l'encontre de ce qu'affirment les comparatifs publiés par ses concurrents.",
      ],
    },
    vigilance: [
      "Le tunnel étant hébergé sur un domaine mutualisé entre tous les centres Apex, les cookies de mesure sont posés sur ce domaine partagé. Un visiteur qui réserve dans deux centres différents peut être vu comme un même individu par les outils d'analyse. C'est à prendre en compte dans le paramétrage.",
      "Le visiteur quitte le site du centre pour réserver. Sans configuration adaptée, une partie du chiffre d'affaires est attribuée au domaine d'Apex plutôt qu'à la vraie source du client.",
      "Les concurrents lui reprochent l'absence de fonctions marketing avancées. Le reproche est cohérent avec la documentation publique, mais il émane de parties intéressées.",
    ],
    lacunes: [
      "Grille tarifaire officielle de l'éditeur",
      "Périmètre inclus dans l'abonnement contre matériel facturé à part",
      "Existence d'une commission sur les réservations en ligne",
      "Option de sous-domaine ou de domaine dédié pour le tunnel",
      "Délai de mise en service et contenu de la formation",
    ],
    site: "https://www.apex-timing.com/",
    sources: [
      {
        label: "Apex Timing — gestion de centre de karting",
        url: "https://www.apex-timing.com/en/karting-center-management-software/",
      },
      {
        label: "Apex Timing — solution centres de loisirs",
        url: "https://www.apex-timing.com/en/leisure-center-management-software/",
      },
      { label: "Apex Timing France", url: "http://www.apex-timing.fr/fr/" },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "roller",
    nom: "ROLLER",
    baseline:
      "Plateforme australienne déployée dans plus de 30 pays, la plus aboutie du panel sur l'expérience visiteur et la mesure.",
    description:
      "ROLLER : 3 000 clients, 30 pays, bornes libre-service et mesure native. À qui il s'adresse, ce qu'il couvre, ses paliers — d'après un groupe multi-sites équipé.",
    pourQuiCourt:
      "Structures à fort volume et groupes multi-sites, avec une exigence de parcours visiteur.",
    editeur: { pays: "Australie" },
    chiffres: [
      { valeur: "3 000+", label: "clients" },
      { valeur: "30+", label: "pays" },
      { valeur: "Multi", label: "gestion de plusieurs sites" },
    ],
    pourQui: {
      intro:
        "ROLLER s'adresse aux structures dont le volume justifie d'industrialiser le parcours visiteur : bornes en libre-service, portefeuille sans espèces, mesure de la satisfaction. C'est la solution la plus mûre du panel, et la plus internationale.",
      profils: [
        "Trampoline parks et centres de divertissement familial à fort volume",
        "Parcs aquatiques et parcs à thème",
        "Musées, zoos et aquariums",
        "Groupes exploitant plusieurs sites sous une direction commune",
        "Exploitants qui vendent beaucoup d'anniversaires, d'abonnements et de restauration",
      ],
      moinsAdapte: [
        "Les structures uniques et de petite taille : le niveau de fonctionnalités dépasse souvent le besoin.",
        "Les exploitants qui veulent un interlocuteur et une documentation en français — la plateforme et son support sont anglophones.",
        "Les kartings : aucun module de chronométrage.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Billetterie en ligne",
        desc: "Tunnel de réservation progressif, conçu pour réduire les frictions à chaque étape du parcours. Deux intégrations possibles : un tunnel hébergé, sur le domaine de l'éditeur ou sur un sous-domaine du parc, ou un widget embarqué directement dans les pages du site.",
      },
      {
        titre: "Caisse et paiements centralisés",
        desc: "Encaissement sur site et centralisation des flux de paiement sur l'ensemble des points de vente.",
      },
      {
        titre: "Abonnements et adhésions",
        desc: "Gestion des memberships, un levier de récurrence que peu de solutions du panel traitent aussi complètement.",
      },
      {
        titre: "Ventes additionnelles",
        desc: "Anniversaires et événements privatisés, cartes cadeaux, commande de restauration depuis le mobile du visiteur.",
      },
      {
        titre: "Bornes en libre-service",
        desc: "Kiosques d'achat autonomes en entrée de site, pour absorber les pics sans mobiliser de personnel.",
      },
      {
        titre: "Portefeuille sans espèces",
        desc: "Cashless wallet permettant au visiteur de consommer sur site sans carte ni monnaie.",
      },
      {
        titre: "Décharges de responsabilité",
        desc: "Waivers signés en ligne avant la visite, indispensables sur les activités à risque.",
      },
      {
        titre: "Contrôle d'accès et jauges",
        desc: "Gestion des entrées et pilotage des capacités par créneau.",
      },
      {
        titre: "Guest Experience Score",
        desc: "Mesure normalisée de la satisfaction visiteur, propre à l'éditeur, exploitable comme indicateur de pilotage.",
      },
      {
        titre: "Suivi publicitaire",
        desc: "La plateforme documente nativement le suivi des conversions : Google Analytics sur tous les plans, pixels publicitaires et Tag Manager sur les paliers supérieurs. C'est le seul outil du panel à publier cette documentation, le seul à exposer un événement de remboursement, et le seul dont chaque événement identifie l'établissement concerné — ce qui change tout pour un groupe multi-sites.",
      },
      {
        titre: "Multi-sites et reporting",
        desc: "Pilotage centralisé de plusieurs établissements, rapports détaillés et gestion fine des droits par utilisateur.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "ROLLER ne publie pas de grille tarifaire, mais structure clairement son offre en paliers nommés — Lite, Pro et Premium — dont la documentation technique révèle le contenu.",
      lignes: [
        { label: "Abonnement mensuel", valeur: "Non communiqué" },
        {
          label: "Suivi Google Analytics",
          valeur: "Inclus sur tous les paliers",
        },
        {
          label: "Pixels publicitaires",
          valeur: "À partir du palier Pro",
        },
        {
          label: "Google Tag Manager",
          valeur:
            "Palier Premium, ou option payante sur les paliers Lite et Pro",
        },
        {
          label: "Domaine de réservation personnalisé",
          valeur: "Disponible, conditions non communiquées",
        },
        {
          label: "Commission sur les réservations en ligne",
          valeur: "Non communiquée",
        },
      ],
      manquant: [
        "Le prix de chaque palier, et le seuil de bascule entre eux",
        "Le coût de l'option Tag Manager sur les paliers inférieurs",
        "Le coût du domaine de réservation personnalisé",
        "Le coût des bornes libre-service et du matériel cashless",
        "L'existence d'une commission sur les ventes en ligne",
      ],
    },
    constate: {
      intro:
        "Nous opérons un groupe multi-sites équipé de ROLLER. Voici ce que montre une installation en production, vérifié en septembre 2026.",
      points: [
        "Le tunnel peut tourner sur le domaine de l'éditeur, mais aussi sur un sous-domaine du parc lui-même. Nous avons constaté les deux dans un même compte, avec un domaine dédié par établissement : c'est l'option de domaine personnalisé, et elle fait disparaître le problème de changement de domaine.",
        "ROLLER propose également un mode widget embarqué directement dans les pages du site du parc, en complément du tunnel hébergé.",
        "La couche de données suit la spécification actuelle de Google : les événements sont émis au bon format, sans transformation à prévoir.",
        "Le parcours instrumenté couvre la consultation produit, l'ajout au panier, l'entrée en paiement, l'achat, la consultation des formulaires d'abonnement — et le remboursement. C'est le seul outil du panel à exposer un événement de remboursement.",
        "Chaque événement porte l'établissement concerné, ce qui permet de piloter plusieurs sites depuis une seule configuration de mesure. Aucun autre outil du panel ne le fait.",
      ],
    },
    vigilance: [
      "Par défaut, le tunnel est hébergé sur un domaine appartenant à l'éditeur. L'option de domaine personnalisé existe bel et bien et résout le problème, mais son coût n'est pas public et elle se configure par établissement.",
      "Le mode widget embarqué est le plus délicat à mesurer : le contenu est isolé du reste de la page, et le suivi demande un travail spécifique que le mode hébergé ne réclame pas. À arbitrer avant de choisir son intégration.",
      "Les fonctions de mesure les plus utiles sont réparties sur les paliers supérieurs. Un exploitant qui investit en publicité doit vérifier que son palier couvre bien ses besoins avant de signer.",
      "L'éditeur indique que son support n'accompagne pas le paramétrage des outils de mesure : cette partie reste à la charge de l'exploitant ou de son agence.",
      "Documentation, interface et support en anglais.",
    ],
    lacunes: [
      "Grille tarifaire complète par palier",
      "Coût du domaine de réservation personnalisé, et s'il se facture par établissement",
      "Disponibilité d'un support en français et sur horaires européens",
      "Références clients en France",
      "Existence d'une commission sur les réservations en ligne",
    ],
    site: "https://www.roller.software/",
    sources: [
      { label: "Site officiel ROLLER", url: "https://www.roller.software/" },
      {
        label: "ROLLER — fonctionnalités",
        url: "https://www.roller.software/features/",
      },
      {
        label: "ROLLER — suivi des conversions",
        url: "https://mysupport.roller.software/hc/en-us/articles/4941711216015-Track-guest-behavior-and-conversions-in-progressive-checkouts",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "bmi-leisure",
    nom: "BMI Leisure",
    baseline:
      "Éditeur espagnol installé depuis plus de vingt-cinq ans, fort sur le karting et le bowling, très discret sur ses conditions.",
    description:
      "BMI Leisure : 25 ans, 300 sites, fort sur karting et bowling — et l'éditeur le plus opaque du panel. Ce qu'il fait, et ce que nous avons pu vérifier nous-mêmes.",
    pourQuiCourt:
      "Karting, bowling et centres de divertissement familial cherchant un éditeur éprouvé.",
    editeur: { pays: "Espagne" },
    chiffres: [
      { valeur: "25+", label: "années d'activité" },
      { valeur: "300+", label: "sites équipés" },
      { valeur: "15+", label: "types d'activités couverts" },
    ],
    pourQui: {
      intro:
        "BMI Leisure vise les centres de divertissement familial qui combinent plusieurs activités sous un même toit, avec une profondeur particulière sur le karting et le bowling. L'argument principal est l'ancienneté : vingt-cinq ans de terrain et trois cents sites.",
      profils: [
        "Kartings, avec chronométrage et direction de course intégrés",
        "Bowlings et centres de divertissement familial multiactivités",
        "Parcs de trampolines et parcs d'attractions",
        "Laser tag, escape rooms, arcades et centres de réalité virtuelle",
        "Mini-golfs, aires de jeux couvertes et parcs aventure",
        "Musées, zoos et aquariums",
      ],
      moinsAdapte: [
        "Les exploitants qui ont besoin de savoir précisément ce qu'ils achètent avant d'engager une discussion commerciale : c'est l'éditeur le plus opaque du panel.",
        "Ceux dont la priorité est le pilotage publicitaire : la mesure est possible, mais elle repose sur une spécification périmée qu'il faut retraduire entièrement, et le coût d'implémentation s'en ressent.",
        "Les groupes multi-sites qui veulent une configuration unique : ici, chaque établissement demande son propre paramétrage.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Réservation en ligne",
        desc: "Réservation et paiement à distance, avec une personnalisation annoncée comme adaptable au design du site de l'exploitant.",
      },
      {
        titre: "Chronométrage karting et direction de course",
        desc: "Chronométrage, race control, organisation des manches, sécurité et positionnement des karts, affichages en stand et résultats de course.",
      },
      {
        titre: "Caisse",
        desc: "Encaissement sur site relié aux réservations et aux stocks.",
      },
      {
        titre: "Décharges de responsabilité",
        desc: "Gestion des waivers, signés avant la session.",
      },
      {
        titre: "Réservations de groupe et événements",
        desc: "Organisation de bout en bout des groupes, anniversaires et événements d'entreprise.",
      },
      {
        titre: "CRM et automatisation marketing",
        desc: "Base clients et séquences marketing automatisées. Le périmètre concret n'est pas détaillé publiquement.",
      },
      {
        titre: "Gamification",
        desc: "Mécaniques de jeu et de classement adossées aux sessions, un axe peu traité par les autres éditeurs du panel.",
      },
      {
        titre: "Gestion du personnel",
        desc: "Planning des équipes et gestion des droits d'accès.",
      },
      {
        titre: "Facturation, stocks et reporting",
        desc: "Facturation, encaissement, gestion des stocks et rapports d'exploitation.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Aucune information tarifaire publique, sur aucun canal. C'est l'éditeur le moins transparent des cinq examinés.",
      lignes: [
        { label: "Abonnement mensuel", valeur: "Non communiqué" },
        { label: "Frais de mise en service", valeur: "Non communiqué" },
        {
          label: "Matériel de chronométrage et d'affichage",
          valeur: "Non communiqué",
        },
        {
          label: "Commission sur les réservations en ligne",
          valeur: "Non communiquée",
        },
      ],
      manquant: [
        "L'intégralité de la grille tarifaire",
        "La structure de l'offre : y a-t-il seulement des paliers ?",
        "Le coût du matériel de piste sur les installations karting",
        "La durée d'engagement et les conditions de sortie",
      ],
    },
    constate: {
      intro:
        "L'éditeur ne documente rien publiquement sur la mesure. Nous avons donc examiné une installation réelle, restée en place après une migration, ce qui nous permet de décrire ce que BMI Leisure expose vraiment. Vérifié en septembre 2026.",
      points: [
        "Le tunnel de réservation tourne sur un sous-domaine de l'éditeur, distinct du domaine du parc. Le parcours d'achat s'y déroule en deux étapes identifiables, le panier puis la confirmation de commande.",
        "Le conteneur de mesure du parc peut être déposé sur le tunnel : l'exploitant garde donc la main sur ses propres outils.",
        "La couche de données transmet le détail attendu d'une transaction : identifiant de commande, chiffre d'affaires, taxes, frais et devise, avec le détail des produits.",
        "BMI expose un indicateur de consentement aux cookies dans sa couche de données. C'est le seul élément de conformité que nous ayons pu constater sur la plateforme, et il est exploitable.",
        "L'événement d'achat porte le nom de l'établissement concerné. Sur un groupe multi-sites, cela oblige à créer une règle de déclenchement par établissement au lieu d'une seule.",
      ],
    },
    vigilance: [
      "La couche de données repose sur une spécification que Google a remplacée en 2023. Elle reste exploitable, mais aucun événement n'arrive au format attendu par les outils d'analyse actuels : tout doit être retraduit. C'est un surcoût d'implémentation permanent, et une source d'erreurs à chaque évolution.",
      "L'événement d'achat étant suffixé par établissement, la configuration se multiplie avec le nombre de sites. Un groupe de quatre parcs demande quatre fois le même paramétrage, à maintenir quatre fois.",
      "Rien de tout cela n'est documenté publiquement. Un exploitant ne peut pas savoir avant achat ce qu'il pourra mesurer, ni ce que coûtera l'implémentation.",
      "Aucune information tarifaire, sur aucun canal. C'est l'éditeur le moins transparent des cinq.",
      "Éditeur espagnol : la disponibilité d'un support en français reste à confirmer.",
    ],
    lacunes: [
      "Toute la grille tarifaire",
      "Une option de domaine de réservation aux couleurs du parc",
      "Une documentation officielle de la couche de données",
      "Le passage à la spécification actuelle est-il prévu ?",
      "Disponibilité d'un support en français",
      "Références clients en France",
      "Conditions d'export des données en cas de départ",
    ],
    site: "https://bmileisure.com/",
    sources: [
      { label: "Site officiel BMI Leisure", url: "https://bmileisure.com/" },
      {
        label: "BMI Leisure — fonctionnalités",
        url: "https://bmileisure.com/features/",
      },
      {
        label: "BMI Leisure — karting",
        url: "https://bmileisure.com/industries/karting/",
      },
    ],
  },
];

export function getOutil(slug: string): Outil | undefined {
  return OUTILS.find((o) => o.slug === slug);
}

/* ────────────────────────────────────────────────────────────── */

export const OUTILS_HUB = {
  eyebrow: "Ressources — parcs de loisirs",
  title: "Outils et logiciels de gestion pour",
  titleHighlight: "parc de loisirs",
  intro:
    "Billetterie, caisse, réservation en ligne, contrôle d'accès : le logiciel de gestion est la colonne vertébrale d'un parc de loisirs. C'est aussi l'un des choix les plus difficiles à défaire une fois engagé.",
  intro2:
    "Nous accompagnons une vingtaine de parcs en France sur leur acquisition. Nous travaillons donc tous les jours dans ces outils, côté exploitation comme côté mesure. Ces fiches rassemblent ce que nous savons de chacun : à qui il s'adresse, ce qu'il fait, et ce qu'il coûte.",
  methodo: {
    titre: "Notre méthode",
    lignes: [
      "Nous nous appuyons sur la documentation publique des éditeurs, sur les installations que nous opérons en production, et sur nos propres vérifications techniques.",
      "Nous ne sommes revendeurs, affiliés ou partenaires d'aucun de ces éditeurs. Aucune de ces fiches n'est sponsorisée.",
      "Ce que nous n'avons pas pu vérifier est signalé comme tel sur chaque fiche, plutôt que comblé par des suppositions. Nous sollicitons chaque éditeur pour compléter ces zones d'ombre, et les fiches seront mises à jour au fil des réponses.",
    ],
  },
  suite: {
    titre: "La suite",
    lignes: [
      "Un comparatif transversal des cinq solutions, une fois les réponses des éditeurs reçues.",
      "Les plans de taggage sont déjà en ligne, outil par outil, pour savoir enfin d'où viennent vraiment vos réservations.",
    ],
  },
  taggage: {
    titre: "Déjà équipé ?",
    texte:
      "Le choix de l'outil n'est que la moitié du sujet. Encore faut-il savoir ce qu'il permet de mesurer, et le brancher correctement à vos campagnes. Nous avons écrit un plan de taggage détaillé pour chacun des moteurs que nous opérons.",
    bouton: "Découvrir nos guides de plan de taggage",
  },
  cta: {
    titre: "Vous hésitez entre deux outils ?",
    texte:
      "Nous opérons ces plateformes au quotidien pour une vingtaine de parcs. Trente minutes suffisent à cadrer le choix selon votre activité, votre volume et vos objectifs de fréquentation.",
    bouton: "Réserver mon audit",
  },
} as const;
