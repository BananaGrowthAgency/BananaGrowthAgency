/**
 * Contenu de la page chapeau des plans de taggage.
 *
 * Elle se place au-dessus des quatre guides par outil et adresse le lecteur
 * avant qu'il ne sache quel est son problème : il constate un écart entre ses
 * conversions et sa caisse, il ne sait pas encore que la cause est le tunnel
 * de réservation.
 */

export const TAGGAGE_HUB = {
  eyebrow: "Ressources — parcs de loisirs",
  title: "Plan de taggage pour",
  titleHighlight: "parc de loisirs",
  chapo:
    "Votre Google Ads affiche quarante réservations, votre caisse en compte douze. Ce n'est presque jamais la publicité qui ment : c'est la mesure qui se casse quelque part entre votre site et votre moteur de réservation.",
  intro:
    "Un parc de loisirs a une particularité que peu d'autres commerces partagent : le paiement ne se fait pas sur son site. Il se fait sur le tunnel de son logiciel de réservation, souvent hébergé sur un domaine qui ne lui appartient pas. Pour un navigateur, ce sont deux sites différents — et la piste du visiteur s'arrête là si personne ne l'a raccordée.",
  intro2:
    "Ces guides partent de cette réalité. Ils sont écrits à partir de conteneurs de mesure réellement déployés sur des tunnels en production, un par moteur de réservation.",

  symptomes: {
    titre: "Vous reconnaissez l'un de ces symptômes ?",
    liste: [
      "Vos conversions Google Ads dépassent largement le nombre de réservations encaissées.",
      "Le nom de votre moteur de réservation apparaît comme source de trafic dans vos statistiques.",
      "Meta annonce un coût par réservation trop beau pour être vrai.",
      "Le chiffre d'affaires de vos outils d'analyse ne tombe jamais juste face à votre caisse.",
      "Vos audiences de remarketing se vident sans raison apparente.",
      "Vous ne savez pas dire quelle part de vos réservations vient de Google et laquelle vient des réseaux sociaux.",
    ],
    conclusion:
      "Tous ont la même famille de causes, et elles se règlent. Le guide correspondant à votre moteur les passe une par une.",
  },

  causes: {
    titre: "Les quatre causes, tous moteurs confondus",
    liste: [
      {
        titre: "Le changement de domaine non raccordé",
        desc: "C'est la première cause, et de loin. Le visiteur passe du site du parc au tunnel de réservation, hébergé ailleurs. Sans raccordement explicite, la session repart de zéro : la vente est créditée au moteur de réservation au lieu de la campagne qui l'a générée. Rien ne signale l'erreur — les conversions continuent d'être comptées, simplement au mauvais endroit.",
      },
      {
        titre: "L'identifiant de commande mal placé",
        desc: "Google Ads s'en sert pour éviter de compter deux fois le même achat. Renseigné par erreur sur l'ajout au panier ou sur l'étape de paiement, il fusionne les trois conversions en une seule. Le symptôme est contre-intuitif : moins de conversions que de ventes réelles.",
      },
      {
        titre: "Les étapes intermédiaires sans montant",
        desc: "Un ajout au panier remonté sans valeur empêche les algorithmes de distinguer un billet à quinze euros d'une privatisation à mille. Sur un parc où les achats restent peu nombreux, c'est priver l'optimisation de son meilleur signal intermédiaire.",
      },
      {
        titre: "Le consentement affiché mais non câblé",
        desc: "Un bandeau de cookies qui s'affiche ne suffit pas. Tant que les balises ne sont pas conditionnées au choix du visiteur, elles se déclenchent quoi qu'il clique. Et depuis 2024, Google conditionne le remarketing et les audiences personnalisées à la transmission de ce consentement : sans lui, les fonctions se dégradent silencieusement.",
      },
    ],
  },

  comparatif: {
    titre: "Ce que chaque moteur permet vraiment",
    intro:
      "Tous les moteurs ne se valent pas sur la mesure, et l'écart est plus large qu'on ne le croit. Voici ce que nous avons constaté sur des installations réelles.",
    colonnes: ["Qweekle", "Apex Timing", "ROLLER", "BMI Leisure"],
    lignes: [
      {
        critere: "Nomenclature des événements",
        valeurs: ["Partiellement obsolète", "Conforme", "Conforme", "Périmée"],
      },
      {
        critere: "Intégrations sans code",
        valeurs: ["Non", "Non", "Oui", "Non"],
      },
      {
        critere: "Tunnel sur le domaine du parc",
        valeurs: ["Non", "Non", "En option", "Non"],
      },
      {
        critere: "Événement de remboursement",
        valeurs: ["Non", "Non", "Oui", "Non"],
      },
      {
        critere: "Multi-sites sans configuration en double",
        valeurs: ["Non", "Non", "Oui", "Non"],
      },
      {
        critere: "Effort d'implémentation",
        valeurs: ["Moyen", "Faible", "Faible", "Élevé"],
      },
    ],
  },

  cta: {
    titre: "Vous préférez qu'on s'en occupe ?",
    texte:
      "Nous opérons ces plateformes au quotidien pour une vingtaine de parcs en France. Nous auditons votre installation, vous disons ce qui se perd, où, et combien ça coûte — puis nous le corrigeons.",
    bouton: "Réserver mon audit",
  },
} as const;
