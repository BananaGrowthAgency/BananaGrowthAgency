import type { GuideOutil } from "./types";

/**
 * Yurplan — billetterie d'événements.
 *
 * Source : la documentation organisateur de Yurplan (événements de suivi,
 * Google Tag Manager, Google Analytics, pixel Meta), complétée par une mise
 * en production chez un client en octobre 2026.
 */
export const YURPLAN: GuideOutil = {
  slug: "yurplan",
  nom: "Yurplan",
  pilier: {
    titre: "Plan de taggage Yurplan : suivre les ventes en ligne",
    description:
      "Yurplan pousse checkout et purchase dans Tag Manager, mais bloque le HTML personnalisé. Couche de données, balises autorisées et plan de taggage complet.",
    chapo:
      "Yurplan charge votre conteneur Tag Manager dans sa billetterie et y pousse un événement à chaque étape du tunnel. La couche de données est propre ; la contrainte est ailleurs : le conteneur y refuse les balises HTML personnalisées et les variables JavaScript personnalisées. Tout le plan de taggage doit donc tenir en modèles de balises.",
    architecture: {
      intro:
        "La billetterie tourne sur une adresse Yurplan, pas sur le site de l'organisateur. Trois façons de la mesurer coexistent, et elles ne se cumulent pas sans précaution.",
      points: [
        "Les outils de suivi s'activent dans l'espace organisateur, sur pro.yurplan.com : ouvrir l'événement, puis Applications › Gérer mes applications, rubrique Communication. Google Tag Manager, Google Analytics et le pixel Meta y sont proposés.",
        "L'activation se fait événement par événement. Chaque nouvelle édition, chaque nouvelle date créée comme un nouvel événement repart sans aucun suivi tant qu'on ne réactive pas les applications.",
        "Le conteneur Tag Manager chargé par Yurplan bloque les balises HTML personnalisées et les variables JavaScript personnalisées. Les modèles de balises — ceux de Google et ceux de la galerie communautaire — passent.",
        "Les outils ne se chargent qu'après accord dans le bandeau de cookies de la billetterie. Le visiteur qui a déjà accepté sur votre site doit accepter une seconde fois chez Yurplan.",
        "En mode widget, la billetterie s'affiche dans un cadre isolé sur votre site. Yurplan envoie alors chaque étape à la page hôte par message ; c'est le seul moyen de garder le lien avec la campagne d'origine.",
      ],
    },
    dataLayer: {
      intro:
        "Yurplan pousse deux événements dans la couche de données. L'achat suit le format e-commerce de Google Analytics 4 ; les étapes du tunnel passent toutes par un même événement, distingué par son numéro d'étape.",
      events: [
        {
          nom: "checkout — étape 1",
          note: "choix des tarifs",
        },
        { nom: "checkout — étape 2", note: "formulaire de commande" },
        {
          nom: "checkout — étape 3",
          note: "choix des produits, seulement si l'événement en propose",
        },
        { nom: "checkout — étape 4", note: "récapitulatif avant paiement" },
        { nom: "checkout — étape 5", note: "confirmation de commande" },
        {
          nom: "purchase",
          note: "commande validée, paiement accepté ou paiement différé enregistré",
        },
      ],
      variables: [
        "ecommerce.checkout.actionField.step — numéro de l'étape, de 1 à 5",
        "order_identifier — identifiant unique de la commande, à la racine et non dans ecommerce",
        "ecommerce.transaction_id — référence de commande",
        "ecommerce.value — total payé, après code promo",
        "ecommerce.tax — montant des taxes",
        "ecommerce.currency — toujours EUR",
        "ecommerce.items — une ligne par tarif ou produit acheté",
      ],
      remarque:
        "Yurplan n'envoie ni view_item, ni add_to_cart, ni begin_checkout. Pour suivre une étape, on déclenche sur checkout filtré par numéro d'étape, et on choisit soi-même le nom d'événement envoyé aux plateformes. Deux détails comptent : l'achat part aussi pour une commande en paiement différé, avant tout règlement ; et dans items, le prix est celui du premier billet du tarif — seul ecommerce.value fait foi pour le montant.",
    },
    parcours: {
      intro:
        "Vue d'ensemble, voie Tag Manager. Les noms côté plateformes sont ceux que nous utilisons en production ; Yurplan ne les impose pas.",
      etapes: [
        {
          etape: "Choix des tarifs",
          source: "checkout, étape 1",
          ga4: "begin_checkout",
          ads: "—",
          meta: "InitiateCheckout",
          tiktok: "—",
        },
        {
          etape: "Formulaire de commande",
          source: "checkout, étape 2",
          ga4: "add_to_cart",
          ads: "Conversion secondaire",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Récapitulatif avant paiement",
          source: "checkout, étape 4",
          ga4: "add_payment_info",
          ads: "Conversion secondaire",
          meta: "AddPaymentInfo",
          tiktok: "—",
        },
        {
          etape: "Commande validée",
          source: "purchase",
          ga4: "purchase",
          ads: "Conversion principale",
          meta: "Purchase",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Activer Google Tag Manager dans l'application de l'événement, avec le même conteneur que le site.",
      "Créer les variables de couche de données et les déclencheurs checkout par étape, puis purchase.",
      "Poser Google Analytics 4 : c'est la source de vérité, et la base de l'envoi serveur si vous en avez un.",
      "Choisir une seule voie pour Meta — l'application Yurplan ou les modèles dans Tag Manager — jamais les deux.",
      "Terminer par Google Ads et TikTok, puis vérifier une vraie commande en mode aperçu.",
      "Noter quelque part que chaque nouvel événement Yurplan doit être réactivé.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Suivre les ventes Yurplan dans Google Analytics 4",
      description:
        "L'application Google Analytics de Yurplan ne mesure que les pages vues. Pour les ventes, il faut Tag Manager et une balise purchase : la configuration complète.",
      chapo:
        "Yurplan propose une application Google Analytics, mais elle ne remonte que les pages vues de la billetterie. Les ventes, elles, passent par Tag Manager et une balise d'événement qui lit la couche de données. C'est la voie à prendre d'emblée.",
      prerequis: [
        "Un accès organisateur à pro.yurplan.com sur l'événement concerné.",
        "Un conteneur Google Tag Manager, de préférence celui du site, activé dans Applications › Gérer mes applications.",
        "Un identifiant de mesure Google Analytics 4 au format G-XXXXXXXXXX.",
      ],
      variables: [
        {
          nom: "DLV | ecommerce.checkout.actionField.step",
          type: "Variable de couche de données",
          cle: "ecommerce.checkout.actionField.step",
          note: "Sert à filtrer les déclencheurs d'étape.",
        },
        {
          nom: "DLV | order_identifier",
          type: "Variable de couche de données",
          cle: "order_identifier",
          note: "À la racine de l'événement, pas sous ecommerce.",
        },
      ],
      declencheurs: [
        {
          nom: "CE | Yurplan checkout étape 1",
          type: "Événement personnalisé",
          condition: "checkout, et {{DLV | ecommerce.checkout.actionField.step}} égal à 1",
        },
        {
          nom: "CE | Yurplan checkout étape 2",
          type: "Événement personnalisé",
          condition: "checkout, et {{DLV | ecommerce.checkout.actionField.step}} égal à 2",
        },
        {
          nom: "CE | Yurplan checkout étape 4",
          type: "Événement personnalisé",
          condition: "checkout, et {{DLV | ecommerce.checkout.actionField.step}} égal à 4",
        },
        {
          nom: "CE | Yurplan purchase",
          type: "Événement personnalisé",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Google Analytics | Main Tag",
          type: "Balise Google",
          declencheur: "Initialisation — Toutes les pages",
          champs: [{ cle: "ID de la balise", valeur: "G-XXXXXXXXXX" }],
          note: "La même balise que sur le site. Si l'application Google Analytics de Yurplan est aussi activée, les pages vues de la billetterie partent deux fois : gardez l'une ou l'autre.",
        },
        {
          nom: "Event Google Analytics | Begin Checkout",
          type: "Google Analytics : événement GA4",
          declencheur: "CE | Yurplan checkout étape 1",
          champs: [{ cle: "Nom de l'événement", valeur: "begin_checkout" }],
        },
        {
          nom: "Event Google Analytics | Add To Cart",
          type: "Google Analytics : événement GA4",
          declencheur: "CE | Yurplan checkout étape 2",
          champs: [{ cle: "Nom de l'événement", valeur: "add_to_cart" }],
        },
        {
          nom: "Event Google Analytics | Add Payment Info",
          type: "Google Analytics : événement GA4",
          declencheur: "CE | Yurplan checkout étape 4",
          champs: [{ cle: "Nom de l'événement", valeur: "add_payment_info" }],
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics : événement GA4",
          declencheur: "CE | Yurplan purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Envoyer les données d'e-commerce", valeur: "Oui" },
            { cle: "Source des données", valeur: "Couche de données" },
            { cle: "Paramètre event_id", valeur: "{{DLV | order_identifier}}" },
          ],
          note: "Avec la source « couche de données », la balise reprend transaction_id, value, tax, currency et items tels que Yurplan les pousse. Le paramètre event_id ne sert qu'à l'envoi serveur : il permet à l'API de conversions Meta de dédupliquer l'achat.",
        },
      ],
      pieges: [
        {
          titre: "Croire que l'application Google Analytics mesure les ventes",
          desc: "Elle ne remonte que les pages vues. Un organisateur qui s'en contente voit du trafic sur sa billetterie et zéro achat dans ses rapports, sans message d'erreur.",
        },
        {
          titre: "Créer une variable JavaScript personnalisée",
          desc: "Le conteneur chargé par Yurplan les bloque. Une variable qui marche en aperçu sur le site reste vide dans la billetterie. Tout doit passer par des variables de couche de données ou des modèles.",
        },
        {
          titre: "Oublier le suivi inter-domaines",
          desc: "La billetterie tourne sur une adresse Yurplan. Sans les deux domaines déclarés dans Google Analytics (Administration › Flux de données › Configurer vos domaines), la session se casse au passage et l'achat est attribué à votre propre site.",
        },
        {
          titre: "Compter les paiements différés comme des ventes encaissées",
          desc: "Yurplan envoie purchase dès qu'une commande en paiement différé est enregistrée, avant règlement. Si l'option est active, rapprochez les achats GA4 de l'encaissement réel.",
        },
      ],
      verification: [
        "Accepter le bandeau de cookies de la billetterie et désactiver le bloqueur de publicités : sans cela, rien ne se charge.",
        "En mode aperçu Tag Manager, parcourir le tunnel et vérifier que chaque étape déclenche la bonne balise.",
        "Dans le DebugView, vérifier que l'achat porte transaction_id, value, currency et items.",
        "Contrôler que la billetterie n'apparaît pas comme source de trafic dans les rapports d'acquisition.",
        "Vérifier sur le prochain événement créé que l'application Tag Manager est bien réactivée.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads avec Yurplan",
      description:
        "Yurplan n'a pas d'application Google Ads : tout passe par Tag Manager et ses modèles natifs, seuls autorisés dans la billetterie. Balises, variables, pièges.",
      chapo:
        "Yurplan ne propose pas d'application Google Ads. Le suivi passe par le conteneur Tag Manager chargé dans la billetterie — et comme les balises de conversion Google sont des modèles natifs, elles échappent au blocage du HTML personnalisé.",
      prerequis: [
        "Le conteneur Google Tag Manager activé sur l'événement Yurplan.",
        "Un identifiant Google Ads au format AW-XXXXXXXXX.",
        "Les actions de conversion créées côté Google Ads, chacune avec son libellé.",
      ],
      variables: [
        {
          nom: "DLV | ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "DLV | ecommerce.transaction_id",
          type: "Variable de couche de données",
          cle: "ecommerce.transaction_id",
        },
        {
          nom: "Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          cle: "Mode automatique",
        },
      ],
      declencheurs: [
        {
          nom: "CE | Yurplan checkout étape 2",
          type: "Événement personnalisé",
          condition: "checkout, et {{DLV | ecommerce.checkout.actionField.step}} égal à 2",
        },
        {
          nom: "CE | Yurplan purchase",
          type: "Événement personnalisé",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Google Ads | Main Tag",
          type: "Balise Google",
          declencheur: "Initialisation — Toutes les pages",
          champs: [{ cle: "ID de la balise", valeur: "AW-XXXXXXXXX" }],
        },
        {
          nom: "Google Ads | Conversion Linker",
          type: "Association de conversion",
          declencheur: "Initialisation — Toutes les pages",
          champs: [
            { cle: "Activer le suivi inter-domaines", valeur: "Oui" },
            { cle: "Accepter les paramètres entrants", valeur: "Oui" },
            {
              cle: "Domaines à associer",
              valeur: "monsite.fr, yurplan.com",
            },
          ],
          note: "Indispensable : la billetterie n'est jamais sur le domaine de l'organisateur. Sans association, le clic publicitaire est perdu au passage vers Yurplan.",
        },
        {
          nom: "Google Ads | Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          declencheur: "Toutes les pages",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            {
              cle: "Variable de données utilisateur",
              valeur: "{{Automatic Data Collection}}",
            },
          ],
          note: "Le formulaire de commande de Yurplan collecte l'email : c'est ce qui rend les conversions améliorées utiles ici.",
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "CE | Yurplan checkout étape 2",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "laisser vide" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
          note: "Les étapes du tunnel ne portent pas de montant chez Yurplan : la conversion secondaire se compte sans valeur.",
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Suivi des conversions Google Ads",
          declencheur: "CE | Yurplan purchase",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{DLV | ecommerce.value}}" },
            { cle: "Code devise", valeur: "EUR" },
            {
              cle: "ID de commande",
              valeur: "{{DLV | ecommerce.transaction_id}}",
            },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Attendre une valeur sur les étapes du tunnel",
          desc: "Seul purchase porte un montant. Une conversion d'étape paramétrée sur {{DLV | ecommerce.value}} remonte à zéro euro et fausse la valeur totale des conversions.",
        },
        {
          titre: "Poser la conversion en HTML personnalisé",
          desc: "Un extrait gtag collé dans une balise HTML ne se déclenche jamais dans la billetterie. Seuls les modèles de balises passent.",
        },
        {
          titre: "Oublier de réactiver Tag Manager sur le nouvel événement",
          desc: "C'est la panne la plus fréquente : la campagne tourne sur la nouvelle édition, la billetterie vend, et Google Ads ne voit rien parce que l'application n'a été activée que sur l'événement précédent.",
        },
      ],
      verification: [
        "En mode aperçu, accepter les cookies de la billetterie et parcourir une commande jusqu'à la confirmation.",
        "Vérifier que le paramètre _gl est ajouté à l'URL au passage du site vers Yurplan.",
        "Contrôler la remontée de la commande test dans Google Ads sous 48 heures, avec sa valeur.",
        "Rapprocher les conversions Google Ads des commandes Yurplan sur un mois complet.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur une billetterie Yurplan",
      description:
        "Application Pixel Meta de Yurplan ou modèle Meta dans Tag Manager ? Ce que couvre chaque voie, l'eventID pour l'API de conversions, et le doublon à éviter.",
      chapo:
        "Deux voies existent. L'application Pixel Meta de Yurplan s'active en collant un identifiant et déduplique l'achat toute seule. Le modèle Meta Pixel dans Tag Manager demande plus de travail, mais c'est le seul moyen de partager un identifiant d'événement avec l'envoi serveur à chaque étape. Le HTML personnalisé, lui, n'est pas une option.",
      prerequis: [
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
        "Pour la voie Tag Manager : le conteneur activé sur l'événement, et les modèles Meta Pixel et Unique Event ID importés depuis la galerie.",
      ],
      variables: [
        {
          nom: "DLV | ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "DLV | order_identifier",
          type: "Variable de couche de données",
          cle: "order_identifier",
        },
        {
          nom: "UEID | Unique Event ID",
          type: "Modèle de variable — Unique Event ID",
          cle: "—",
          note: "Remplace la variable JavaScript qu'on utiliserait ailleurs, bloquée chez Yurplan. La même valeur doit partir dans la balise GA4 de l'étape pour que l'envoi serveur déduplique.",
        },
      ],
      declencheurs: [
        {
          nom: "PV | Billetterie Yurplan",
          type: "Page vue",
          condition: "Page Hostname contient yurplan",
          note: "Limite les balises Meta du conteneur à la billetterie, si le site porte déjà son propre pixel.",
        },
        {
          nom: "CE | Yurplan checkout étape 1",
          type: "Événement personnalisé",
          condition: "checkout, étape 1",
        },
        {
          nom: "CE | Yurplan checkout étape 2",
          type: "Événement personnalisé",
          condition: "checkout, étape 2",
        },
        {
          nom: "CE | Yurplan checkout étape 4",
          type: "Événement personnalisé",
          condition: "checkout, étape 4",
        },
        {
          nom: "CE | Yurplan purchase",
          type: "Événement personnalisé",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Voie 1 — application Pixel Meta de Yurplan",
          type: "Paramétrage dans Yurplan",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur: "Applications › Gérer mes applications › Communication",
            },
            { cle: "Champ à renseigner", valeur: "Votre identifiant de pixel" },
          ],
          note: "Envoie PageView, InitiateCheckout au formulaire (AddToCart en widget) et Purchase à la confirmation, avec valeur, devise et l'identifiant de commande en eventID. Suffisant sans envoi serveur. Si vous choisissez cette voie, ne créez aucune balise Meta dans Tag Manager.",
        },
        {
          nom: "Meta Pixel | PageView",
          type: "Modèle — Meta Pixel",
          declencheur: "PV | Billetterie Yurplan",
          champs: [
            { cle: "Pixel ID", valeur: "VOTRE_PIXEL_ID" },
            { cle: "Événement", valeur: "PageView" },
            { cle: "Event ID", valeur: "{{UEID | Unique Event ID}}" },
          ],
          note: "Voie 2, Tag Manager. Le modèle officiel de la galerie remplace le code fbq habituel.",
        },
        {
          nom: "Meta Pixel | InitiateCheckout",
          type: "Modèle — Meta Pixel",
          declencheur: "CE | Yurplan checkout étape 1",
          champs: [
            { cle: "Événement", valeur: "InitiateCheckout" },
            { cle: "Event ID", valeur: "{{UEID | Unique Event ID}}" },
          ],
        },
        {
          nom: "Meta Pixel | AddToCart",
          type: "Modèle — Meta Pixel",
          declencheur: "CE | Yurplan checkout étape 2",
          champs: [
            { cle: "Événement", valeur: "AddToCart" },
            { cle: "Event ID", valeur: "{{UEID | Unique Event ID}}" },
          ],
        },
        {
          nom: "Meta Pixel | AddPaymentInfo",
          type: "Modèle — Meta Pixel",
          declencheur: "CE | Yurplan checkout étape 4",
          champs: [
            { cle: "Événement", valeur: "AddPaymentInfo" },
            { cle: "Event ID", valeur: "{{UEID | Unique Event ID}}" },
          ],
        },
        {
          nom: "Meta Pixel | Purchase",
          type: "Modèle — Meta Pixel",
          declencheur: "CE | Yurplan purchase",
          champs: [
            { cle: "Événement", valeur: "Purchase" },
            { cle: "Event ID", valeur: "{{DLV | order_identifier}}" },
            { cle: "value", valeur: "{{DLV | ecommerce.value}}" },
            { cle: "currency", valeur: "EUR" },
          ],
          note: "L'identifiant de commande sert d'eventID, comme dans l'application Yurplan : l'API de conversions doit envoyer le même pour que Meta ne compte l'achat qu'une fois.",
        },
      ],
      pieges: [
        {
          titre: "Activer l'application et les modèles en même temps",
          desc: "Chaque étape part alors deux fois, avec deux eventID différents : Meta ne peut pas dédupliquer. Le coût par achat affiché devient deux fois trop bas, sans alerte.",
        },
        {
          titre: "Recopier la balise fbq du site",
          desc: "Une balise HTML personnalisée ne se déclenche pas dans la billetterie. C'est la raison d'être des modèles de la galerie.",
        },
        {
          titre: "Laisser le PageView du site partir deux fois",
          desc: "Si le site porte un pixel en HTML avec son bloc noscript, Tag Manager injecte aussi l'image du noscript : deux PageView par page. Retirez le noscript des balises HTML de Tag Manager — il ne sert à rien sans JavaScript, puisque Tag Manager ne se charge pas non plus.",
        },
        {
          titre: "Ignorer le second bandeau de cookies",
          desc: "Le visiteur doit accepter à nouveau chez Yurplan. Une part des acheteurs refuse ou ignore ce bandeau : le pixel navigateur sous-compte, et seul l'envoi serveur rattrape une partie de l'écart.",
        },
      ],
      verification: [
        "Installer Meta Pixel Helper, accepter les cookies de la billetterie et parcourir une commande.",
        "Vérifier que chaque événement n'apparaît qu'une fois — c'est le contrôle prioritaire.",
        "Dans le Gestionnaire d'événements, vérifier que l'achat arrive avec valeur, devise et eventID.",
        "Avec un envoi serveur, contrôler que navigateur et serveur sont bien dédupliqués sur la même commande.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur une billetterie Yurplan",
      description:
        "Yurplan n'a pas d'application TikTok et bloque le HTML personnalisé : le pixel passe par le modèle officiel TikTok dans Tag Manager. Balises et pièges.",
      chapo:
        "Pas d'application TikTok chez Yurplan, et pas de HTML personnalisé dans le conteneur : il reste le modèle officiel TikTok Pixel de la galerie Tag Manager. Il couvre tout le parcours, à condition de parler le vocabulaire de TikTok.",
      prerequis: [
        "Le conteneur Google Tag Manager activé sur l'événement Yurplan.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
        "Le modèle TikTok Pixel importé depuis la galerie communautaire.",
      ],
      variables: [
        {
          nom: "DLV | ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "DLV | order_identifier",
          type: "Variable de couche de données",
          cle: "order_identifier",
        },
      ],
      declencheurs: [
        {
          nom: "PV | Billetterie Yurplan",
          type: "Page vue",
          condition: "Page Hostname contient yurplan",
        },
        {
          nom: "CE | Yurplan checkout étape 2",
          type: "Événement personnalisé",
          condition: "checkout, étape 2",
        },
        {
          nom: "CE | Yurplan purchase",
          type: "Événement personnalisé",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "TikTok Pixel | PageView",
          type: "Modèle — TikTok Pixel",
          declencheur: "PV | Billetterie Yurplan",
          champs: [
            { cle: "Pixel ID", valeur: "VOTRE_PIXEL_ID" },
            { cle: "Événement", valeur: "Page View" },
          ],
        },
        {
          nom: "TikTok Pixel | AddToCart",
          type: "Modèle — TikTok Pixel",
          declencheur: "CE | Yurplan checkout étape 2",
          champs: [{ cle: "Événement", valeur: "AddToCart" }],
        },
        {
          nom: "TikTok Pixel | CompletePayment",
          type: "Modèle — TikTok Pixel",
          declencheur: "CE | Yurplan purchase",
          champs: [
            { cle: "Événement", valeur: "CompletePayment" },
            { cle: "value", valeur: "{{DLV | ecommerce.value}}" },
            { cle: "currency", valeur: "EUR" },
            { cle: "Event ID", valeur: "{{DLV | order_identifier}}" },
          ],
          note: "TikTok attend CompletePayment, pas Purchase.",
        },
      ],
      pieges: [
        {
          titre: "Utiliser le vocabulaire de Meta",
          desc: "Un événement nommé Purchase ne remonte dans aucun rapport TikTok. L'achat s'appelle CompletePayment.",
        },
        {
          titre: "Coller le code d'installation de TikTok",
          desc: "Le code fourni par TikTok est du HTML personnalisé : il ne se charge pas dans la billetterie. Seul le modèle de la galerie fonctionne.",
        },
        {
          titre: "Doubler le pixel du site",
          desc: "Si le site charge déjà TikTok, limitez les balises du conteneur à la billetterie avec le déclencheur sur le nom d'hôte, sinon chaque page du site compte deux vues.",
        },
      ],
      verification: [
        "Installer TikTok Pixel Helper, accepter les cookies de la billetterie et parcourir une commande.",
        "Vérifier que chaque événement n'apparaît qu'une fois.",
        "Contrôler dans le Gestionnaire d'événements TikTok que CompletePayment arrive avec valeur et devise.",
      ],
    },
  ],
};
