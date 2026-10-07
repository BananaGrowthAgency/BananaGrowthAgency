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
        "Deux générations de Qweekle coexistent en production, et l'écart entre les deux est considérable sur la mesure. Nous opérons des parcs sur l'une comme sur l'autre. Vérifié en octobre 2026.",
      points: [
        "La version 3 héberge la boutique sur une adresse en .qweekle.shop, le paiement sur un domaine dédié qui ne charge aucune balise, et le site vitrine du parc reste le point de départ. Trois domaines, un seul mesurable.",
        "La version 2, encore largement déployée, place la boutique sur une adresse en .qweekle.com. C'est le moyen le plus rapide de savoir laquelle on a sous les yeux.",
        "La version 3 fournit quatre modules Google Tag Manager prêts à importer — un module socle obligatoire, puis Google Analytics, Meta et Google Ads. Aucun autre éditeur du panel ne va aussi loin.",
        "Sa couche de données compte treize événements aux noms conformes à la spécification actuelle, contre sept en version 2, dont deux portent encore une nomenclature abandonnée par Google en 2023.",
        "La version 3 livre aussi l'adresse email du client déjà hachée, ce qui alimente sans effort les conversions améliorées et l'appariement avancé. Personne d'autre ne le fait dans ce panel.",
        "Les pages de la boutique sont en noindex dans les deux versions : tout le référencement doit vivre sur le site du parc.",
      ],
    },
    vigilance: [
      "La boutique étant hébergée sur qweekle.com, le visiteur change de domaine entre le site du parc et le paiement. Sans configuration spécifique, les statistiques attribuent une partie des ventes à « qweekle.com » plutôt qu'à la source réelle — publicité, Google ou réseaux sociaux.",
      "La règle monétaire de la version 3 mérite d'être comprise avant toute mise en place : la valeur d'une commande correspond au chiffre d'affaires, pas au montant encaissé en ligne. Un bon cadeau et un acompte ne la diminuent pas, un code de réduction si. L'interface ne propose pourtant qu'un seul champ pour saisir un coupon ou un bon cadeau. Un parc qui pratique l'acompte et mesure le montant encaissé sous-déclare massivement ses ventes, et le solde réglé sur place n'est jamais rattrapé.",
      "En version 2, deux événements portent une nomenclature que Google a abandonnée en 2023. Cela reste exploitable, mais demande un travail de traduction que la version 3 supprime entièrement.",
      "Aucun tarif public : il faut passer par un devis pour comparer, ce qui allonge la phase de choix.",
    ],
    lacunes: [
      "Grille tarifaire complète et paliers",
      "Existence d'une commission sur les réservations en ligne",
      "Délai entre signature et mise en service",
      "Conditions d'export de la base clients en cas de départ",
      "Les conditions et le coût d'une migration de la version 2 vers la version 3",
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
      "Spécialiste français du karting, né du chronométrage. Plus de 900 clients dans 67 pays, et la seule solution du panel à intégrer nativement le live timing.",
    description:
      "Apex Timing : 900 clients, 67 pays, le spécialiste du karting né du chronométrage. Pour qui, fonctions clés, packs tarifaires et commission — documentation à l'appui.",
    pourQuiCourt:
      "Karting de loisir, et centres multiactivités adossés à une piste.",
    editeur: { pays: "France", depuis: "2011" },
    chiffres: [
      { valeur: "900+", label: "clients" },
      { valeur: "67", label: "pays" },
      { valeur: "0 %", label: "commission sur les ventes en ligne" },
    ],
    pourQui: {
      intro:
        "Apex Timing vient du chronométrage avant de venir de la gestion : fondée en 2011 à Annecy, l'entreprise chronométrait les championnats du monde et d'Europe de karting dès ses débuts. C'est ce qui en fait le choix par défaut des kartings de loisir — le même logiciel pilote la course et la caisse, sans passerelle à maintenir entre deux éditeurs.",
      profils: [
        "Kartings de loisir, en intérieur comme en extérieur",
        "Centres multiactivités construits autour d'une piste — jusqu'à une douzaine d'activités sur un même logiciel",
        "Exploitants qui organisent des courses, des manches, des endurances et des championnats",
        "Groupes multi-centres : les bons cadeaux et les données clients se partagent entre établissements",
        "Structures équipées en bowling ou en arcade, grâce aux liaisons Brunswick, QubicaAMF, Intercard et Playzwell",
      ],
      moinsAdapte: [
        "Les parcs sans activité chronométrée : une large part de la valeur du produit devient inutile.",
        "Les exploitants qui veulent vendre en ligne dès l'offre d'entrée : l'e-commerce n'apparaît qu'à partir du pack intermédiaire.",
        "Ceux qui comptent brancher un outil externe par API : la liaison n'existe que sur le pack le plus élevé.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Chronométrage et live timing",
        desc: "Mesure à la milliseconde, gestion multi-boucles avec arrêts au stand, découpage en trois secteurs de piste, pénalités automatiques ou appliquées en direct. Compatible Mylaps, RaceResult, Chronolec, Tag Heuer, Kart-Timer et MyWER. C'est le socle historique du produit et sa vraie différence.",
      },
      {
        titre: "Gestion de piste et de course",
        desc: "Affectation des karts, Arrive & Drive, sprints et endurances avec création d'équipes et identification RFID. Gestion des karts électriques avec contrôle de vitesse et boost, et changement rapide de configuration de piste — normale, XL ou inversée.",
      },
      {
        titre: "Affichages et briefing",
        desc: "Écrans de résultats, affichage dynamique, et briefing vidéo de sécurité aux couleurs du centre, sous-titré dans sa langue. Option RDisplay : un écran embarqué sur le volant qui remonte les drapeaux au pilote.",
      },
      {
        titre: "Vente en ligne sans commission",
        desc: "Module web intégré au site du centre et synchronisé avec le calendrier : réservation d'activités, billetterie, événements, abonnements, bons cadeaux. Plus de trente moyens de paiement intégrés, et un mode invité qui permet de commander sans créer de compte.",
      },
      {
        titre: "Caisse NF525",
        desc: "Encaissement multipaiement et multidevise, facturation, stocks. Certifiée NF525 en France, avec les équivalents TSE en Allemagne et Verifactu en Espagne.",
      },
      {
        titre: "Kiosque et décharges",
        desc: "Inscription autonome depuis une borne ou l'appareil du client, avec récupération automatique des décharges de responsabilité signées et gestion du cas des mineurs. Borne de check-in rapide par QR code.",
      },
      {
        titre: "Bar et restauration",
        desc: "Prise de commande en mode autonome sur tablette, par QR code depuis le téléphone du client, ou en mode serveur. Système centralisé, sans commission, avec un nombre illimité de postes et un plan de salle paramétrable.",
      },
      {
        titre: "Application mobile personnalisée",
        desc: "Aux couleurs du centre : carte de membre virtuelle, réservation et paiement, suivi des performances, organisation de championnats entre amis et messagerie interne.",
      },
      {
        titre: "Fidélisation",
        desc: "Bons de réduction, points de fidélité, porte-monnaie virtuel, cagnottage, tarifs membres et abonnements. Synchronisation des données clients entre plusieurs centres.",
      },
      {
        titre: "Communication",
        desc: "Campagnes d'e-mailing avec éditeur par glisser-déposer et statistiques d'ouverture, e-mails automatiques déclenchés par événement, SMS de confirmation ou de rappel, et notifications push.",
      },
      {
        titre: "GoManager et API",
        desc: "Application de pilotage avec tableaux de bord personnalisables et comparaison entre plusieurs centres. Une API permet de récupérer ventes, membres et sessions pour les brancher sur un outil externe comme Power BI.",
      },
      {
        titre: "Gestion commerciale et comptable",
        desc: "Devis, factures, acomptes et notes de crédit générés depuis le logiciel, envoi par lien de paiement sans commission, export comptable au format CSV paramétrable par code produit et taux de TVA.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Apex Timing ne publie pas de montants, mais sa documentation commerciale détaille la structure de l'offre — et celle-ci réserve quelques surprises. Deux modes d'acquisition coexistent, achat ou location, assortis d'un abonnement aux solutions web réparti en trois packs.",
      lignes: [
        {
          label: "Modèle",
          valeur: "Achat ou location, plus un abonnement web",
          source: "documentation commerciale de l'éditeur, octobre 2026",
        },
        {
          label: "Les trois packs",
          valeur: "Support (Web Basic), Web Pro, Web Premium",
        },
        {
          label: "Commission sur les réservations en ligne",
          valeur: "0 %",
          source: "annoncé explicitement par l'éditeur",
        },
        {
          label: "Vente en ligne",
          valeur: "À partir du pack Web Pro",
        },
        {
          label: "Réservation d'activités et paiement",
          valeur: "Pack Web Premium uniquement",
        },
        {
          label: "Liaison par API vers un outil externe",
          valeur: "Pack Web Premium uniquement",
        },
        {
          label: "Volume d'e-mailing inclus",
          valeur: "25 000/mois en Pro, 90 000/mois en Premium",
        },
        {
          label: "Frais annexes",
          valeur:
            "Mise en service, intégration bancaire et pack SMS facturés à part",
        },
        { label: "Montant des abonnements", valeur: "Non communiqué" },
      ],
      manquant: [
        "Le montant de chaque pack, et l'écart entre achat et location",
        "Le coût de la mise en service, de l'intégration bancaire et du pack SMS",
        "Le prix du matériel : boucles, transpondeurs, écrans, bornes, RDisplay",
        "La durée d'engagement et les conditions de sortie",
      ],
    },
    constate: {
      intro:
        "Nous opérons des centres équipés d'Apex Timing, et l'éditeur publie par ailleurs une documentation technique de son plan de taggage. Voici ce que montrent les deux, croisés, en octobre 2026.",
      points: [
        "Le tunnel de réservation s'affiche en cadres intégrés dans les pages du site du centre, servis depuis le domaine d'Apex Timing. Chaque centre est identifié par un paramètre dans l'adresse : le domaine est donc partagé entre tous les clients de l'éditeur.",
        "Les identifiants de mesure se renseignent directement dans l'espace client — Google Analytics, Google Tag Manager et pixel Meta disposent chacun de leur champ. Aucun développement n'est nécessaire pour les poser.",
        "La couche de données couvre tout le parcours, de la vue de la liste de produits jusqu'à l'achat, en passant par le panier, sa modification et son abandon. Les noms respectent la spécification actuelle de Google.",
        "L'éditeur expose une fonction dédiée au consentement, qui permet de transmettre le choix du visiteur aux balises chargées dans le cadre intégré. Peu de moteurs du panel offrent ce pont.",
        "Apex Timing indique en revanche ne pas assurer de support sur la configuration de Tag Manager, et recommande de passer par un spécialiste.",
      ],
    },
    vigilance: [
      "L'e-commerce n'est pas inclus dans le pack d'entrée, et la réservation d'activités avec paiement — le cœur de métier d'un karting — n'apparaît que sur le pack le plus élevé. Un exploitant qui compte vendre en ligne doit vérifier son pack avant de signer, pas après.",
      "Le tunnel étant servi depuis un domaine mutualisé entre tous les centres Apex, les cookies de mesure sont posés sur ce domaine partagé. Un visiteur qui réserve dans deux centres différents peut être vu comme un même individu par les outils d'analyse.",
      "Le contenu de réservation s'affichant dans un cadre intégré, la mesure demande un paramétrage spécifique que n'exige pas un tunnel classique. C'est faisable et documenté, mais ce n'est pas automatique.",
      "Plusieurs fonctions utiles sont facturées en supplément : mise en service, intégration bancaire, pack SMS. À faire chiffrer dès le devis pour éviter la mauvaise surprise.",
      "Un montant d'environ 300 €/mois a circulé dans un comparatif publié par un concurrent. La documentation de l'éditeur montre que l'offre se structure en trois packs, en achat ou en location, avec des frais annexes : ramener cela à un chiffre unique n'a pas de sens.",
    ],
    lacunes: [
      "Le montant de chacun des trois packs",
      "L'écart de coût entre achat et location",
      "Le prix du matériel de piste et des bornes",
      "Le coût de la mise en service et de l'intégration bancaire",
      "La durée d'engagement et les conditions de sortie",
      "Le délai entre signature et mise en service",
    ],
    site: "https://www.apex-timing.com/",
    sources: [
      {
        label: "Apex Timing — gestion de centre de karting",
        url: "https://www.apex-timing.com/en/karting-center-management-software/",
      },
      {
        label: "Apex Timing — documentation Google Tag Manager",
        url: "https://wiki.apex-timing.com/doc/gokarts/google-tag-manager",
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
