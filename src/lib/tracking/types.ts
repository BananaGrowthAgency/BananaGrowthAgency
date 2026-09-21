/**
 * Modèle des guides de plan de taggage.
 *
 * Un outil = une page pilier + une page par plateforme publicitaire.
 * Le pilier explique l'architecture et la couche de données ; chaque page
 * plateforme donne les balises à créer, nommées et paramétrées.
 *
 * Les noms de balises suivent la convention que nous utilisons en production
 * chez nos clients : « <Plateforme> | <Rôle> » pour les balises de socle,
 * « Event <Plateforme> | <Étape> » pour les événements.
 */

/** Une variable Google Tag Manager à créer. */
export type Variable = {
  nom: string;
  type: string;
  cle: string;
  note?: string;
};

/** Un déclencheur Google Tag Manager à créer. */
export type Declencheur = {
  nom: string;
  type: string;
  condition: string;
  note?: string;
};

/** Une balise Google Tag Manager à créer. */
export type Balise = {
  nom: string;
  type: string;
  declencheur: string;
  note?: string;
  /** Champs à renseigner dans l'interface de la balise. */
  champs?: { cle: string; valeur: string }[];
  /** Code, pour les balises HTML personnalisées. */
  code?: string;
};

export type Plateforme = {
  /** Segment d'URL : google-analytics, google-ads, meta-ads, tiktok-ads. */
  slug: string;
  /** Nom court, pour la navigation. */
  nom: string;
  /** Titre de page, formulé sur la requête réellement cherchée. */
  titre: string;
  /** Méta-description, propre à la page. Viser 150 à 160 caractères. */
  description: string;
  chapo: string;
  prerequis: string[];
  variables: Variable[];
  declencheurs: Declencheur[];
  balises: Balise[];
  pieges: { titre: string; desc: string }[];
  verification: string[];
};

export type GuideOutil = {
  /** Correspond au slug de l'outil dans OUTILS. */
  slug: string;
  nom: string;
  /** Page pilier. */
  pilier: {
    titre: string;
    /** Méta-description, propre au pilier. Viser 150 à 160 caractères. */
    description: string;
    chapo: string;
    architecture: { intro: string; points: string[] };
    dataLayer: {
      intro: string;
      events: { nom: string; note?: string }[];
      variables: string[];
      remarque: string;
    };
    /** Vue d'ensemble : une étape du parcours par ligne. */
    parcours: {
      intro: string;
      etapes: {
        etape: string;
        source: string;
        ga4: string;
        ads: string;
        meta: string;
        tiktok: string;
      }[];
    };
    ordre: string[];
  };
  plateformes: Plateforme[];
};
