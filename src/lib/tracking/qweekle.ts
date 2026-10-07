import type { Contenu, GuideOutil } from "./types";

/**
 * Guide Qweekle, en deux versions.
 *
 * La V3 est documentée par l'éditeur (référence dataLayer 1.1 du 18/09/2026)
 * et livre quatre modules GTM prêts à importer. La V2 reste déployée chez de
 * nombreux parcs : elle est documentée ici d'après les conteneurs que nous
 * opérons, puisque l'éditeur n'en publie rien.
 *
 * Les deux coexistent en production. Le guide ne choisit pas pour le lecteur,
 * il l'aide à identifier sa version puis lui donne le bon plan.
 */

/* ══════════════════════════ VERSION 3 ══════════════════════════ */

const V3: Contenu = {
  pilier: {
    titre: "Plan de taggage Qweekle V3 : suivre ses conversions publicitaires",
    description:
      "Qweekle V3 livre quatre modules GTM prêts à importer et une couche de données conforme GA4. Architecture, événements, règles monétaires et plan de taggage.",
    chapo:
      "Qweekle V3 est le moteur le mieux outillé du panel sur la mesure : treize événements aux noms conformes, un objet utilisateur déjà haché, le Consent Mode intégré, et surtout quatre modules Google Tag Manager prêts à importer. Le vrai sujet n'est donc pas de tout construire, mais de comprendre ses règles monétaires — car elles ne sont pas intuitives.",
    architecture: {
      intro:
        "Trois domaines composent le parcours, et un seul charge Tag Manager.",
      points: [
        "La boutique tourne sur client.qweekle.shop. C'est là que vit le conteneur et que se produisent tous les événements mesurables.",
        "Le paiement se fait sur payments.qweekle.app, un domaine dédié qui ne charge pas Tag Manager. Aucune balise à y installer, et rien n'y est mesurable.",
        "Le site vitrine du parc, s'il existe, est le troisième domaine. C'est de lui que part le visiteur, et c'est pour lui qu'il faut configurer le suivi inter-domaines.",
        "Aucune donnée n'est perdue malgré la coupure : l'achat est émis au retour sur la page de confirmation de la boutique, après paiement réussi.",
        "La boutique est une application monopage. La navigation ne recharge pas la page, ce qui impose de désactiver la détection automatique de changement d'URL sur les balises Meta pour éviter les doublons.",
        "L'éditeur fournit quatre modules Tag Manager à importer : un module Base obligatoire, puis GA4, Meta et Google Ads, chacun indépendant.",
      ],
    },
    dataLayer: {
      intro:
        "Treize événements couvrent le parcours. Chacun est précédé d'un vidage de l'objet e-commerce, ce qui évite les pollutions entre événements — un soin que peu d'éditeurs prennent.",
      events: [
        { nom: "page_view", note: "chaque changement de route" },
        { nom: "view_item_list", note: "affichage d'une liste ou d'un carrousel" },
        { nom: "view_item", note: "affichage d'une fiche produit" },
        { nom: "add_to_cart", note: "ajout au panier" },
        { nom: "remove_from_cart", note: "retrait du panier" },
        { nom: "view_cart", note: "affichage du panier" },
        { nom: "begin_checkout", note: "entrée dans le tunnel de commande" },
        {
          nom: "add_shipping_info",
          note: "validation de l'étape réservation — nom GA4 réemployé, il n'y a pas de livraison",
        },
        { nom: "add_payment_info", note: "dernière étape mesurable avant la redirection" },
        { nom: "purchase", note: "au retour sur la page de confirmation" },
        { nom: "login", note: "connexion" },
        { nom: "sign_up", note: "création de compte" },
        { nom: "sign_out", note: "déconnexion" },
      ],
      variables: [
        "ecommerce.value — valeur de commande, jamais minorée par un bon cadeau ni un acompte",
        "ecommerce.items — produits, avec quatre niveaux de catégorie",
        "ecommerce.transaction_id — identifiant unique de commande, sur l'achat",
        "ecommerce.affiliation — slug de l'établissement, sur tous les événements",
        "ecommerce.coupon, tax, shipping, payment_type, shipping_tier",
        "user.user_id et user.email_sha256 — hash prêt pour les conversions améliorées",
        "amount_paid, amount_due, gift_card_amount — à la racine, sur l'achat",
      ],
      remarque:
        "Le point à comprendre avant tout le reste, ce sont les règles monétaires. Chez Qweekle, value représente la valeur de la commande — le chiffre d'affaires — et non le montant encaissé en ligne. Trois mécanismes réduisent ce qui est payé sur le moment sans avoir le même sens : un code de réduction est une vraie remise et diminue value ; un bon cadeau prépayé est un moyen de paiement et ne la touche pas ; un acompte est une modalité de règlement et ne la touche pas davantage. Le contrôle est simple : amount_paid plus amount_due plus gift_card_amount doit égaler value. Le piège est que l'interface propose un champ unique pour « coupon ou bon cadeau », mais que la couche de données route différemment selon le type résolu. Un parc qui mesure le montant encaissé en ligne au lieu de la valeur de commande sous-déclare durablement son chiffre d'affaires — et le solde d'un acompte, réglé sur place, ne sera jamais rattrapé.",
    },
    parcours: {
      intro:
        "Vue d'ensemble. Les modules livrés par l'éditeur couvrent les colonnes GA4, Meta et Google Ads ; TikTok reste à construire.",
      etapes: [
        {
          etape: "Affichage d'une liste",
          source: "view_item_list",
          ga4: "Couvert par le module GA4",
          ads: "—",
          meta: "—",
          tiktok: "À construire",
        },
        {
          etape: "Consultation d'un produit",
          source: "view_item",
          ga4: "Couvert par le module GA4",
          ads: "Remarketing, couvert par le module",
          meta: "ViewContent, couvert par le module",
          tiktok: "À construire",
        },
        {
          etape: "Ajout au panier",
          source: "add_to_cart",
          ga4: "Couvert par le module GA4",
          ads: "—",
          meta: "AddToCart, couvert par le module",
          tiktok: "À construire",
        },
        {
          etape: "Vue du panier",
          source: "view_cart",
          ga4: "Couvert par le module GA4",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Entrée en commande",
          source: "begin_checkout",
          ga4: "Couvert par le module GA4",
          ads: "—",
          meta: "InitiateCheckout, couvert par le module",
          tiktok: "À construire",
        },
        {
          etape: "Étape réservation",
          source: "add_shipping_info",
          ga4: "Couvert par le module GA4",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Validation du paiement",
          source: "add_payment_info",
          ga4: "Couvert par le module GA4",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Commande confirmée",
          source: "purchase",
          ga4: "Couvert par le module GA4",
          ads: "Conversion principale, couverte par le module",
          meta: "Purchase, couvert par le module",
          tiktok: "CompletePayment, à construire",
        },
      ],
    },
    ordre: [
      "Importer le module Base : il apporte les variables, les déclencheurs et le Consent Mode. Rien ne fonctionne sans lui.",
      "Brancher votre bandeau cookies sur le Consent Mode avant d'activer la moindre balise de mesure.",
      "Renseigner les constantes de domaine : boutique, site de paiement et site vitrine.",
      "Importer les modules GA4, Meta et Google Ads selon les plateformes que vous utilisez, puis renseigner leurs identifiants.",
      "Construire TikTok à la main : l'éditeur ne fournit pas de module.",
      "Vérifier dans l'aperçu que rien ne se déclenche avant acceptation des cookies, puis publier.",
    ],
  },

  plateformes: [
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Installer Google Analytics 4 sur une boutique Qweekle V3",
      description:
        "Un module GTM à importer et un identifiant à renseigner. L'essentiel du travail est ailleurs : comprendre pourquoi value ne vaut pas le montant encaissé.",
      chapo:
        "C'est l'installation la plus rapide du panel : vous importez le module, vous collez votre identifiant de mesure, c'est fini. Le vrai travail consiste à comprendre ce que Qweekle appelle une valeur — et à ne pas la confondre avec ce que le client a payé en ligne.",
      prerequis: [
        "Le module Base est importé dans votre conteneur, et le Consent Mode est branché sur votre bandeau cookies.",
        "Le conteneur Tag Manager est renseigné dans l'administration Qweekle.",
        "Un identifiant de mesure GA4, au format G-XXXXXXXXXX.",
      ],
      variables: [
        {
          nom: "Qweekle - CONST - [A CONFIGURER] GA4 Measurement ID",
          type: "Constante — fournie par le module",
          cle: "G-XXXXXXXXXX",
          note: "La seule valeur à renseigner pour une mise en route standard.",
        },
        {
          nom: "Qweekle - DLV - ecommerce.value",
          type: "Variable de couche de données — fournie par le module",
          cle: "ecommerce.value",
          note: "Valeur de commande, jamais minorée par un bon cadeau ni un acompte.",
        },
        {
          nom: "Qweekle - DLV - amount_paid",
          type: "Variable de couche de données — fournie par le module",
          cle: "amount_paid",
          note: "Montant réellement encaissé en ligne. À envoyer en paramètre personnalisé, jamais comme valeur de conversion.",
        },
        {
          nom: "Qweekle - DLV - amount_due",
          type: "Variable de couche de données — fournie par le module",
          cle: "amount_due",
          note: "Solde réglé sur place. C'est du chiffre d'affaires réel que GA4 ne verra jamais autrement.",
        },
        {
          nom: "Qweekle - DLV - gift_card_amount",
          type: "Variable de couche de données — fournie par le module",
          cle: "gift_card_amount",
        },
        {
          nom: "Qweekle - DLV - user.email_sha256",
          type: "Variable de couche de données — fournie par le module",
          cle: "user.email_sha256",
          note: "Hash déjà calculé par Qweekle. Alimente directement les conversions améliorées.",
        },
      ],
      declencheurs: [
        {
          nom: "Qweekle - CE - Tous les evenements ecommerce",
          type: "Événement personnalisé, expression régulière — fourni par le module",
          condition: "l'ensemble des événements e-commerce en une seule règle",
          note: "Les noms étant déjà conformes, une seule règle relaie tout le parcours.",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Événement personnalisé — fourni par le module",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Module à importer : qweekle-2-ga4.json",
          type: "Import GTM — fusion, jamais écrasement",
          declencheur: "—",
          champs: [
            { cle: "Prérequis", valeur: "qweekle-1-base.json déjà importé" },
            { cle: "Mode d'import", valeur: "Fusionner, pas écraser" },
            {
              cle: "À renseigner ensuite",
              valeur: "la constante GA4 Measurement ID",
            },
          ],
          note: "Le module apporte la balise de configuration, les balises d'événement et les paramètres de consentement. Importez toujours en fusion : l'écrasement supprimerait le reste de votre conteneur.",
        },
        {
          nom: "Event Google Analytics | Montants complémentaires",
          type: "Google Analytics : événement GA4 — à ajouter",
          declencheur: "Qweekle - CE - purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            {
              cle: "Paramètre amount_paid",
              valeur: "{{Qweekle - DLV - amount_paid}}",
            },
            {
              cle: "Paramètre amount_due",
              valeur: "{{Qweekle - DLV - amount_due}}",
            },
            {
              cle: "Paramètre gift_card_amount",
              valeur: "{{Qweekle - DLV - gift_card_amount}}",
            },
          ],
          note: "Hors module, et pourtant essentiel sur un parc qui pratique l'acompte ou vend des bons cadeaux. Déclarez ces trois paramètres en dimensions personnalisées dans GA4 pour pouvoir réconcilier avec la caisse.",
        },
      ],
      pieges: [
        {
          titre: "Prendre le montant encaissé pour la valeur de la commande",
          desc: "C'est l'erreur qui coûte le plus cher sur Qweekle. Un parc qui encaisse un acompte de 30 % et règle le solde sur place verra son chiffre d'affaires divisé par trois s'il mesure amount_paid. La valeur de conversion doit toujours être value : le solde payé sur place n'apparaîtra jamais ailleurs.",
        },
        {
          titre: "Confondre code de réduction et bon cadeau",
          desc: "L'interface n'a qu'un champ pour les deux, mais ils n'ont pas le même sens. Un code de réduction est une remise et diminue la valeur ; un bon cadeau est un moyen de paiement et ne la touche pas. La couche de données fait la distinction — à vous de ne pas la perdre en route.",
        },
        {
          titre: "Importer en écrasement",
          desc: "L'import GTM propose deux modes. « Écraser » supprime tout ce que contient déjà votre conteneur. Sur un conteneur client qui porte d'autres balises, c'est irréversible sans sauvegarde.",
        },
        {
          titre: "Agréger le panier par identifiant produit",
          desc: "Plusieurs lignes peuvent porter le même item_id : c'est voulu, chaque ligne garde le contexte d'où elle a été ajoutée. Les agréger fait perdre la mesure de ce qui convertit.",
        },
      ],
      verification: [
        "Dans l'aperçu Tag Manager, vérifier que rien ne se déclenche avant acceptation du bandeau cookies.",
        "Passer une commande test et contrôler que ecommerce.value est en euros, pas en centimes.",
        "Vérifier que ecommerce.items n'est pas vide et porte item_id, price et quantity.",
        "Sur une commande avec acompte, vérifier que amount_paid plus amount_due plus gift_card_amount égale value.",
        "Contrôler dans le DebugView que les événements arrivent sous leurs noms d'origine.",
        "Rapprocher le chiffre d'affaires GA4 de celui de la caisse sur un mois complet.",
      ],
    },

    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads sur une boutique Qweekle V3",
      description:
        "Le module Ads de Qweekle gère le cross-domaine à trois domaines par constantes. Reste à les renseigner correctement, et à activer les conversions améliorées.",
      chapo:
        "Le module Google Ads livré par Qweekle couvre la configuration, le suivi inter-domaines, la conversion d'achat et le remarketing. Sa particularité : le cross-domaine se paramètre par constantes, parce que le parcours traverse jusqu'à trois domaines.",
      prerequis: [
        "Le module Base est importé et le Consent Mode est branché.",
        "Un identifiant Google Ads au format AW-XXXXXXXXXX et le libellé de la conversion d'achat.",
        "Le domaine exact de votre boutique Qweekle, et celui de votre site vitrine s'il en existe un.",
      ],
      variables: [
        {
          nom: "Qweekle - CONST - [A CONFIGURER] Google Ads Conversion ID",
          type: "Constante — fournie par le module",
          cle: "AW-XXXXXXXXXX",
        },
        {
          nom: "Qweekle - CONST - [A CONFIGURER] Google Ads Conversion Label",
          type: "Constante — fournie par le module",
          cle: "le libellé de la conversion d'achat",
        },
        {
          nom: "Qweekle - CONST - [A CONFIGURER] URL du site de VEL",
          type: "Constante — fournie par le module",
          cle: "client.qweekle.shop",
          note: "Valeur d'exemple à remplacer par le vrai domaine de la boutique. C'est l'oubli le plus fréquent.",
        },
        {
          nom: "Qweekle - CONST - URL du site de paiement",
          type: "Constante — fournie par le module",
          cle: "payments.qweekle.app",
          note: "Déjà renseignée et identique entre démonstration et production. À ne pas modifier.",
        },
        {
          nom: "Qweekle - CONST - [A CONFIGURER] URL site vitrine",
          type: "Constante — fournie par le module",
          cle: "monsite.fr",
          note: "À renseigner si le parc possède un site vitrine qui renvoie vers la boutique.",
        },
      ],
      declencheurs: [
        {
          nom: "All Pages",
          type: "Vue de page — fourni par le module",
          condition: "toutes les pages",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Événement personnalisé — fourni par le module",
          condition: "purchase",
        },
        {
          nom: "Qweekle - CE - view_item",
          type: "Événement personnalisé — fourni par le module",
          condition: "view_item",
        },
      ],
      balises: [
        {
          nom: "Module à importer : qweekle-4-ads.json",
          type: "Import GTM — fusion",
          declencheur: "—",
          champs: [
            { cle: "Prérequis", valeur: "qweekle-1-base.json déjà importé" },
            { cle: "Mode d'import", valeur: "Fusionner" },
          ],
        },
        {
          nom: "[Google Ads] Configuration",
          type: "Balise Google — fournie par le module",
          declencheur: "All Pages",
          champs: [{ cle: "Consentement requis", valeur: "ad_storage, ad_user_data" }],
        },
        {
          nom: "[Google Ads] Conversion Linker",
          type: "Association de conversion — fournie par le module",
          declencheur: "All Pages",
          champs: [
            { cle: "Consentement requis", valeur: "ad_storage" },
            {
              cle: "Domaines",
              valeur: "alimentés par les trois constantes de domaine",
            },
          ],
          note: "C'est ici que se joue l'attribution. Les trois domaines doivent être renseignés, sans protocole ni barre oblique finale.",
        },
        {
          nom: "[Google Ads] Conversion - Purchase",
          type: "Suivi des conversions — fournie par le module",
          declencheur: "Qweekle - CE - purchase",
          champs: [
            { cle: "Valeur", valeur: "{{Qweekle - DLV - ecommerce.value}}" },
            {
              cle: "ID de commande",
              valeur: "{{Qweekle - DLV - ecommerce.transaction_id}}",
            },
            { cle: "Consentement requis", valeur: "ad_storage, ad_user_data" },
          ],
        },
        {
          nom: "[Google Ads] Remarketing",
          type: "Remarketing — fournie par le module",
          declencheur: "Qweekle - CE - view_item",
          champs: [{ cle: "Consentement requis", valeur: "ad_storage, ad_user_data" }],
        },
      ],
      pieges: [
        {
          titre: "Laisser les domaines d'exemple en place",
          desc: "Les constantes arrivent préremplies avec client.qweekle.shop et monsite.fr. Tant qu'elles ne sont pas remplacées par les vrais domaines, le suivi inter-domaines ne fait rien — et rien ne vous alerte, les conversions continuant d'être comptées, mais attribuées au mauvais canal.",
        },
        {
          titre: "Oublier le site vitrine dans le cross-domaine",
          desc: "Le parcours traverse jusqu'à trois domaines. Renseigner la boutique et le paiement mais oublier le site vitrine casse l'attribution dès le premier clic, qui est pourtant celui qui vient de la publicité.",
        },
        {
          titre: "Chercher à mesurer sur le site de paiement",
          desc: "Il ne charge pas Tag Manager, par conception. Il n'y a rien à y installer et rien à y attendre. L'achat remonte au retour sur la boutique.",
        },
        {
          titre: "Ne pas activer les conversions améliorées",
          desc: "Qweekle fournit l'email déjà haché. S'en priver, c'est laisser de côté le meilleur rattrapage de signal disponible, et sans aucun travail de hachage à faire soi-même.",
        },
      ],
      verification: [
        "Cliquer depuis le site vitrine vers la boutique et vérifier que le paramètre de liaison est ajouté à l'adresse.",
        "Vérifier dans l'aperçu que le Conversion Linker se déclenche sur les deux domaines mesurables.",
        "Passer une commande test et contrôler la remontée dans Google Ads sous 48 heures, avec sa valeur.",
        "Vérifier dans le diagnostic Google Ads que les conversions améliorées sont bien reçues.",
        "Contrôler qu'aucune balise ne part avant acceptation du bandeau cookies.",
      ],
    },

    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur une boutique Qweekle V3",
      description:
        "Le module Meta de Qweekle apporte le pixel, les quatre événements et l'Advanced Matching. Attention au réglage SPA qui évite les doublons.",
      chapo:
        "Le module Meta livré par Qweekle apporte le pixel, les quatre événements de parcours et l'Advanced Matching alimenté par l'email déjà haché. Un réglage mérite l'attention : la boutique étant une application monopage, la détection automatique de changement d'URL doit être désactivée.",
      prerequis: [
        "Le module Base est importé et le Consent Mode est branché.",
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
      ],
      variables: [
        {
          nom: "Qweekle - CONST - [A CONFIGURER] Meta Pixel ID",
          type: "Constante — fournie par le module",
          cle: "000000000000000",
        },
        {
          nom: "Qweekle - DLV - user.email_sha256",
          type: "Variable de couche de données — fournie par le module",
          cle: "user.email_sha256",
          note: "Alimente l'Advanced Matching. Le hash est fourni par Qweekle, il n'y a rien à calculer.",
        },
        {
          nom: "Qweekle - DLV - ecommerce.transaction_id",
          type: "Variable de couche de données — fournie par le module",
          cle: "ecommerce.transaction_id",
          note: "Sert d'identifiant d'événement pour la déduplication avec l'API de conversions.",
        },
      ],
      declencheurs: [
        {
          nom: "All Pages",
          type: "Vue de page — fourni par le module",
          condition: "toutes les pages",
        },
        {
          nom: "Qweekle - CE - view_item",
          type: "Événement personnalisé — fourni par le module",
          condition: "view_item",
        },
        {
          nom: "Qweekle - CE - add_to_cart",
          type: "Événement personnalisé — fourni par le module",
          condition: "add_to_cart",
        },
        {
          nom: "Qweekle - CE - begin_checkout",
          type: "Événement personnalisé — fourni par le module",
          condition: "begin_checkout",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Événement personnalisé — fourni par le module",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Module à importer : qweekle-3-meta.json",
          type: "Import GTM — fusion",
          declencheur: "—",
          champs: [
            { cle: "Prérequis", valeur: "qweekle-1-base.json déjà importé" },
            { cle: "À renseigner", valeur: "la constante Meta Pixel ID" },
          ],
        },
        {
          nom: "[Meta] Pixel Base + PageView",
          type: "HTML personnalisé — fournie par le module",
          declencheur: "All Pages",
          note: "C'est cette balise qui porte le réglage SPA. Vérifiez que la détection automatique de changement d'URL est désactivée, sans quoi chaque navigation compte une vue de page en trop.",
        },
        {
          nom: "[Meta] ViewContent",
          type: "HTML personnalisé — fournie par le module",
          declencheur: "Qweekle - CE - view_item",
        },
        {
          nom: "[Meta] AddToCart",
          type: "HTML personnalisé — fournie par le module",
          declencheur: "Qweekle - CE - add_to_cart",
        },
        {
          nom: "[Meta] InitiateCheckout",
          type: "HTML personnalisé — fournie par le module",
          declencheur: "Qweekle - CE - begin_checkout",
        },
        {
          nom: "[Meta] Purchase",
          type: "HTML personnalisé — fournie par le module",
          declencheur: "Qweekle - CE - purchase",
          note: "Porte la valeur de commande et l'identifiant de transaction. Ce dernier est ce qui permettra de brancher l'API de conversions sans compter chaque achat deux fois.",
        },
      ],
      pieges: [
        {
          titre: "Laisser la détection automatique d'URL active",
          desc: "La boutique est une application monopage : chaque navigation déclencherait une vue de page supplémentaire. Le module prévoit le réglage, encore faut-il vérifier qu'il est bien en place après l'import.",
        },
        {
          titre: "Poser un second pixel par-dessus le module",
          desc: "Si le pixel était déjà installé avant l'import, vous vous retrouvez avec deux chargements et des événements en double. Faites le ménage avant d'importer.",
        },
        {
          titre: "Ignorer l'Advanced Matching",
          desc: "Qweekle fournit l'email haché prêt à l'emploi. Ne pas le brancher revient à se priver gratuitement de précision sur les audiences comme sur les conversions.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que la vue de page n'est envoyée qu'une fois par navigation — c'est le contrôle prioritaire sur une application monopage.",
        "Contrôler dans le Gestionnaire d'événements que les quatre événements arrivent avec leurs valeurs.",
        "Vérifier que l'Advanced Matching est bien reçu.",
        "Contrôler qu'aucune balise ne part avant acceptation du bandeau cookies.",
      ],
    },

    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur une boutique Qweekle V3",
      description:
        "Qweekle livre des modules GA4, Meta et Google Ads, mais pas TikTok. C'est la seule plateforme à construire entièrement à la main — sur des bases propres.",
      chapo:
        "C'est la seule plateforme pour laquelle Qweekle ne fournit pas de module. Tout est à construire — mais sur des fondations propres, puisque le module Base apporte déjà les variables, les déclencheurs et le Consent Mode.",
      prerequis: [
        "Le module Base est importé : ses variables et ses déclencheurs se réutilisent tels quels.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
      ],
      variables: [
        {
          nom: "Qweekle - DLV - ecommerce.value",
          type: "Variable de couche de données — fournie par le module Base",
          cle: "ecommerce.value",
        },
        {
          nom: "Qweekle - DLV - ecommerce.currency",
          type: "Variable de couche de données — fournie par le module Base",
          cle: "ecommerce.currency",
        },
        {
          nom: "Qweekle - DLV - ecommerce.transaction_id",
          type: "Variable de couche de données — fournie par le module Base",
          cle: "ecommerce.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Qweekle - CE - view_item",
          type: "Événement personnalisé — fourni par le module Base",
          condition: "view_item",
        },
        {
          nom: "Qweekle - CE - add_to_cart",
          type: "Événement personnalisé — fourni par le module Base",
          condition: "add_to_cart",
        },
        {
          nom: "Qweekle - CE - begin_checkout",
          type: "Événement personnalisé — fourni par le module Base",
          condition: "begin_checkout",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Événement personnalisé — fourni par le module Base",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "TikTok Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "All Pages",
          note: "Conditionnez cette balise au consentement, comme le font les modules de l'éditeur : le module Base fournit les paramètres nécessaires.",
          code: `<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
    ttq._o=ttq._o||{};ttq._o[e]=n||{};
    var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=r+"?sdkid="+e+"&lib="+t;
    var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

  ttq.load('VOTRE_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>`,
        },
        {
          nom: "Event TikTok Ads | View Content",
          type: "HTML personnalisé",
          declencheur: "Qweekle - CE - view_item",
          code: `<script>
  ttq.track('ViewContent', {
    value: {{Qweekle - DLV - ecommerce.value}},
    currency: {{Qweekle - DLV - ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event TikTok Ads | Add To Cart",
          type: "HTML personnalisé",
          declencheur: "Qweekle - CE - add_to_cart",
          code: `<script>
  ttq.track('AddToCart', {
    value: {{Qweekle - DLV - ecommerce.value}},
    currency: {{Qweekle - DLV - ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event TikTok Ads | Initiate Checkout",
          type: "HTML personnalisé",
          declencheur: "Qweekle - CE - begin_checkout",
          code: `<script>
  ttq.track('InitiateCheckout', {
    value: {{Qweekle - DLV - ecommerce.value}},
    currency: {{Qweekle - DLV - ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event TikTok Ads | Complete Payment",
          type: "HTML personnalisé",
          declencheur: "Qweekle - CE - purchase",
          note: "La valeur à envoyer est bien la valeur de commande, pas le montant encaissé en ligne. TikTok attend CompletePayment, pas Purchase.",
          code: `<script>
  ttq.track('CompletePayment', {
    value: {{Qweekle - DLV - ecommerce.value}},
    currency: {{Qweekle - DLV - ecommerce.currency}}
  }, {
    event_id: {{Qweekle - DLV - ecommerce.transaction_id}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Oublier de conditionner les balises au consentement",
          desc: "Les modules de l'éditeur gèrent le consentement ; vos balises TikTok, non, puisque vous les écrivez. C'est le piège propre à cette plateforme sur Qweekle : tout le reste du conteneur est conforme, et TikTok passe à travers.",
        },
        {
          titre: "Utiliser le vocabulaire de Meta",
          desc: "CompletePayment et non Purchase. Un événement mal nommé ne remonte dans aucun rapport TikTok.",
        },
        {
          titre: "Envoyer le montant encaissé plutôt que la valeur de commande",
          desc: "Sur un parc qui pratique l'acompte, l'écart est massif. La règle est la même que pour les autres plateformes : la valeur, toujours.",
        },
        {
          titre: "Oublier ttq.page() dans la balise de socle",
          desc: "Sans cet appel, les audiences de remarketing restent vides même si les conversions remontent.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier qu'aucune balise TikTok ne part avant acceptation du bandeau cookies.",
        "Contrôler dans le Gestionnaire d'événements TikTok que les quatre événements arrivent avec leurs valeurs.",
        "Vérifier que la valeur de l'achat correspond à la commande, pas au montant encaissé.",
      ],
    },
  ],
};

/* ══════════════════════════ VERSION 2 ══════════════════════════ */

const V2: Contenu = {
  pilier: {
    titre: "Plan de taggage Qweekle V2 : suivre ses conversions publicitaires",
    description:
      "La V2 de Qweekle reste déployée dans de nombreux parcs. Sa couche de données mêle noms conformes et nomenclature périmée : voici comment la traiter.",
    chapo:
      "La V2 reste en production dans de nombreux parcs, et l'éditeur n'en publie aucune documentation. Ce qui suit vient des conteneurs que nous opérons. Deux différences majeures avec la V3 : la nomenclature mêle noms conformes et héritage d'Universal Analytics, et il n'existe ni module prêt à importer, ni mécanisme de consentement.",
    architecture: {
      intro: "Une architecture plus simple que la V3, mais moins outillée.",
      points: [
        "La boutique tourne sur un sous-domaine dédié par client, au format monparc.qweekle.com/shop/monparc.",
        "C'est un domaine racine différent de celui du parc : le suivi inter-domaines est obligatoire.",
        "Chaque exploitant peut déposer son propre conteneur Google Tag Manager sur la boutique.",
        "Le même conteneur doit être installé des deux côtés, sur le site du parc et sur la boutique.",
        "Les pages de la boutique sont en noindex : elles ne remonteront jamais dans Google.",
        "Aucun module prêt à importer, aucun mécanisme de consentement fourni : tout est à construire.",
      ],
    },
    dataLayer: {
      intro:
        "Sept événements, relevés sur des tunnels en production. L'éditeur ne les documente pas.",
      events: [
        { nom: "view_item", note: "consultation d'un produit" },
        { nom: "add_to_cart", note: "ajout au panier" },
        { nom: "remove_from_cart", note: "retrait du panier" },
        { nom: "begin_checkout", note: "entrée dans le tunnel de paiement" },
        {
          nom: "checkout_progress",
          note: "progression dans le paiement — nomenclature périmée",
        },
        {
          nom: "set_checkout_option",
          note: "choix d'une option — nomenclature périmée",
        },
        { nom: "purchase", note: "réservation payée" },
      ],
      variables: [
        "ecommerce.value — montant de la transaction",
        "ecommerce.currency — devise",
        "ecommerce.transaction_id — identifiant de commande",
      ],
      remarque:
        "Deux de ces noms, checkout_progress et set_checkout_option, viennent de la spécification Universal Analytics que Google a remplacée en 2023. GA4 ne les reconnaît pas : il attend add_shipping_info et add_payment_info. Transmis tels quels, ils arrivent comme événements personnalisés et n'alimentent pas l'entonnoir d'achat. Autre subtilité : begin_checkout et checkout_progress coexistent, il faut décider lequel représente le début du paiement sous peine de compter la même étape deux fois. La V3 a réglé ces deux problèmes — si votre parc peut migrer, c'est l'argument technique le plus solide à mettre dans la balance.",
    },
    parcours: {
      intro:
        "Vue d'ensemble. Tout est à construire manuellement : aucun module n'est fourni sur cette version.",
      etapes: [
        {
          etape: "Consultation d'un produit",
          source: "view_item",
          ga4: "view_item",
          ads: "—",
          meta: "ViewContent",
          tiktok: "ViewContent",
        },
        {
          etape: "Ajout au panier",
          source: "add_to_cart",
          ga4: "add_to_cart",
          ads: "Conversion secondaire, avec valeur",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Début du paiement",
          source: "begin_checkout",
          ga4: "begin_checkout",
          ads: "Conversion secondaire, avec valeur",
          meta: "InitiateCheckout",
          tiktok: "InitiateCheckout",
        },
        {
          etape: "Étape de paiement",
          source: "checkout_progress",
          ga4: "add_payment_info — à renommer",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Réservation payée",
          source: "purchase",
          ga4: "purchase",
          ads: "Conversion principale, avec orderId",
          meta: "Purchase, avec eventID",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Poser le socle : conteneur sur les deux domaines, variables de couche de données, déclencheurs.",
      "Google Analytics 4 en premier : c'est la source de vérité qui servira à contrôler le reste.",
      "Google Ads ensuite, avec le suivi inter-domaines — c'est là que se joue l'attribution.",
      "Meta et TikTok en dernier, sur les mêmes déclencheurs.",
      "Prévoir un mécanisme de consentement : rien n'est fourni sur cette version.",
    ],
  },

  plateformes: [
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Installer Google Analytics 4 sur une boutique Qweekle V2",
      description:
        "Sur la V2, le travail consiste à traduire checkout_progress et à ne pas renommer ce qui est déjà conforme. Variables, déclencheurs et balises.",
      chapo:
        "Qweekle V2 pousse déjà une couche e-commerce : le travail consiste moins à créer des événements qu'à traduire ceux qui portent un nom périmé, et à ne surtout pas en inventer de nouveaux.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique.",
        "Un identifiant de mesure GA4 au format G-XXXXXXXXXX.",
        "Le suivi inter-domaines est configuré entre le domaine du parc et qweekle.com.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de couche de données",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de couche de données",
          cle: "ecommerce.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Event | View Item",
          type: "Événement personnalisé",
          condition: "view_item",
        },
        {
          nom: "Event | Add To Cart",
          type: "Événement personnalisé",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Événement personnalisé",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Add Payment Info",
          type: "Événement personnalisé",
          condition: "checkout_progress",
          note: "On écoute le nom poussé par Qweekle, on l'envoie sous le nom attendu par GA4.",
        },
        {
          nom: "Event | Purchase",
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
          note: "Doit se déclencher sur le site du parc comme sur la boutique.",
        },
        {
          nom: "Event Google Analytics | Add To Cart",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "Nom de l'événement", valeur: "add_to_cart" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
        },
        {
          nom: "Event Google Analytics | Begin Checkout",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Begin Checkout",
          champs: [
            { cle: "Nom de l'événement", valeur: "begin_checkout" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
        },
        {
          nom: "Event Google Analytics | Add Payment Info",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Add Payment Info",
          champs: [
            { cle: "Nom de l'événement", valeur: "add_payment_info" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
          note: "C'est la traduction de checkout_progress. Ne le transmettez jamais tel quel.",
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
            { cle: "Paramètre value", valeur: "{{ecommerce.value}}" },
            { cle: "Paramètre currency", valeur: "{{ecommerce.currency}}" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Transmettre checkout_progress tel quel",
          desc: "Il arrive dans GA4 comme événement personnalisé, sans jamais rejoindre l'entonnoir. Le renommer en add_payment_info coûte un champ et change tout.",
        },
        {
          titre: "Compter deux fois le début du paiement",
          desc: "La V2 pousse begin_checkout et checkout_progress. Si les deux déclenchent un événement de début de paiement, l'entonnoir affiche deux fois plus d'entrées que la réalité.",
        },
        {
          titre: "Renommer les événements pour les rendre lisibles",
          desc: "GA4 attend des noms en minuscules avec des tirets bas. Un événement nommé « Add To Cart » n'alimente ni le rapport de monétisation ni l'entonnoir.",
        },
        {
          titre: "Oublier les données e-commerce sur les étapes intermédiaires",
          desc: "L'achat est presque toujours bien configuré, le panier beaucoup moins. Sans la récupération des données e-commerce, ni produits ni valeur ne remontent.",
        },
      ],
      verification: [
        "Dans l'aperçu Tag Manager, parcourir un achat de bout en bout.",
        "Vérifier dans le DebugView que les événements arrivent avec leurs noms normalisés.",
        "Vérifier que l'achat porte value, currency, transaction_id et le tableau items.",
        "Contrôler que qweekle.com n'apparaît pas dans le rapport des sources de trafic.",
      ],
    },

    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads sur une boutique Qweekle V2",
      description:
        "Le domaine qweekle.com dans le Conversion Linker, l'ID de commande réservé à l'achat : les balises à créer sur la V2, et les erreurs qui faussent l'attribution.",
      chapo:
        "C'est ici que se joue l'essentiel. La boutique V2 vit sur un autre domaine que le site du parc : sans suivi inter-domaines correctement posé, Google Ads perd la trace du clic et crédite les ventes au mauvais canal.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique.",
        "Un identifiant Google Ads au format AW-XXXXXXXXX.",
        "Les actions de conversion sont créées côté Google Ads, chacune avec son libellé.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de couche de données",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de couche de données",
          cle: "ecommerce.transaction_id",
        },
        {
          nom: "Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          cle: "Mode automatique",
          note: "La V2 ne fournit pas d'email haché : la détection automatique est le seul moyen d'alimenter les conversions améliorées.",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Add To Cart",
          type: "Événement personnalisé",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Événement personnalisé",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Purchase",
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
            { cle: "Domaines à associer", valeur: "monparc.fr, qweekle.com" },
          ],
          note: "La balise la plus importante de toute l'installation. Domaines nus, sans protocole ni barre oblique finale.",
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
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "Valeur de conversion", valeur: "{{ecommerce.value}}" },
            { cle: "Code devise", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
          note: "Ne renseignez surtout pas l'ID de commande ici : Google Ads s'en sert pour dédupliquer, et il fusionnerait cette conversion avec l'achat.",
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Valeur de conversion", valeur: "{{ecommerce.value}}" },
            { cle: "Code devise", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de commande", valeur: "{{ecommerce.transaction_id}}" },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
          note: "Seule balise qui doit porter l'ID de commande.",
        },
      ],
      pieges: [
        {
          titre: "Le domaine du moteur absent de la liste",
          desc: "Après une migration depuis un autre moteur, l'ancien domaine reste dans la liste et qweekle.com n'y est jamais ajouté. Les conversions continuent d'être comptées, mais attribuées au moteur de réservation. C'est l'erreur la plus fréquente et la plus coûteuse.",
        },
        {
          titre: "Les domaines saisis avec le protocole",
          desc: "Écrire https://monparc.fr/ au lieu de monparc.fr. L'interface accepte, la décoration des liens ne se fait pas, rien n'alerte.",
        },
        {
          titre: "L'ID de commande sur les étapes intermédiaires",
          desc: "Renseigné ailleurs que sur l'achat, il pousse Google Ads à fusionner les conversions. Symptôme : moins de conversions remontées que de ventes réelles.",
        },
        {
          titre: "Deux conversions pour la même action",
          desc: "Une conversion sur le clic du bouton « Réserver » et une autre sur l'arrivée dans la boutique comptent deux fois le même visiteur. Gardez celle qui se déclenche à l'arrivée.",
        },
      ],
      verification: [
        "Cliquer vers la boutique depuis le site du parc et vérifier que le paramètre de liaison est ajouté à l'adresse.",
        "Vérifier dans l'aperçu que le Conversion Linker se déclenche des deux côtés.",
        "Passer une commande test et contrôler la remontée sous 48 heures, avec sa valeur.",
        "Rapprocher les conversions Google Ads des réservations en caisse sur un mois complet.",
      ],
    },

    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur une boutique Qweekle V2",
      description:
        "Pas de module sur la V2 : le code fbq à copier balise par balise, avec la valeur et la devise lues dans la couche de données.",
      chapo:
        "Aucun module n'est fourni sur cette version : tout passe par des balises HTML personnalisées. C'est simple, mais c'est aussi là que les erreurs de valeur et de devise se glissent le plus souvent.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique.",
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
        "Les variables de couche de données sont créées.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de couche de données",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de couche de données",
          cle: "ecommerce.transaction_id",
          note: "Sert d'identifiant d'événement pour la déduplication.",
        },
      ],
      declencheurs: [
        {
          nom: "Event | View Item",
          type: "Événement personnalisé",
          condition: "view_item",
        },
        {
          nom: "Event | Add To Cart",
          type: "Événement personnalisé",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Événement personnalisé",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Meta Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Toutes les pages",
          note: "Doit se déclencher sur le site du parc comme sur la boutique. Si la balise de socle manque sur la boutique, les événements d'achat disparaissent sans erreur.",
          code: `<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'VOTRE_PIXEL_ID');
fbq('set', 'agent', 'tmgoogletagmanager', 'VOTRE_PIXEL_ID');
fbq('track', 'PageView');
</script>`,
        },
        {
          nom: "Event Meta Ads | Add To Cart",
          type: "HTML personnalisé",
          declencheur: "Event | Add To Cart",
          note: "La valeur et la devise sont indispensables. Sans elles, l'algorithme ne distingue pas un billet à 15 € d'un anniversaire à 300 €.",
          code: `<script>
  fbq('track', 'AddToCart', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event Meta Ads | Initiate Checkout",
          type: "HTML personnalisé",
          declencheur: "Event | Begin Checkout",
          code: `<script>
  fbq('track', 'InitiateCheckout', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event Meta Ads | Purchase",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase",
          note: "L'identifiant d'événement permettra d'ajouter l'API de conversions plus tard sans doubler les achats.",
          code: `<script>
  fbq('track', 'Purchase', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  }, {
    eventID: {{ecommerce.transaction_id}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "L'ajout au panier sans valeur",
          desc: "fbq('track', 'AddToCart') sans paramètre est le cas le plus répandu. L'événement remonte, mais sans montant : impossible d'optimiser sur la valeur du panier.",
        },
        {
          titre: "La devise écrite en dur",
          desc: "currency: 'EUR' codé dans la balise au lieu de lire la couche de données. Sans conséquence en France, mais l'incohérence avec GA4 rend les rapprochements impossibles.",
        },
        {
          titre: "L'achat sans identifiant d'événement",
          desc: "Sans eventID, l'ajout ultérieur de l'API de conversions double tous les achats.",
        },
        {
          titre: "Le pixel de socle absent de la boutique",
          desc: "Si la balise de socle ne se déclenche que sur le site du parc, les événements envoyés depuis la boutique n'ont pas de bibliothèque à appeler et disparaissent silencieusement.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que le pixel de socle se charge aussi sur les pages de la boutique.",
        "Contrôler que les trois événements arrivent avec leur valeur et leur devise.",
        "Vérifier que l'achat porte bien un identifiant d'événement.",
      ],
    },

    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur une boutique Qweekle V2",
      description:
        "Même principe que Meta sur la V2 : balises HTML et mêmes déclencheurs. Attention au nom attendu par TikTok, qui diffère de celui de Meta.",
      chapo:
        "TikTok fonctionne comme Meta sur cette version : balises HTML personnalisées, mêmes déclencheurs, mais une nomenclature propre. Si Meta est déjà posé, comptez une demi-heure.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique.",
        "Un identifiant de pixel TikTok.",
        "Les déclencheurs sont déjà créés pour Meta ou GA4 — ils se réutilisent tels quels.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de couche de données",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de couche de données",
          cle: "ecommerce.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Add To Cart",
          type: "Événement personnalisé",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Événement personnalisé",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "TikTok Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Toutes les pages",
          code: `<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
  ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
    ttq._o=ttq._o||{};ttq._o[e]=n||{};
    var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=r+"?sdkid="+e+"&lib="+t;
    var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

  ttq.load('VOTRE_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>`,
        },
        {
          nom: "Event TikTok Ads | Add To Cart",
          type: "HTML personnalisé",
          declencheur: "Event | Add To Cart",
          code: `<script>
  ttq.track('AddToCart', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event TikTok Ads | Initiate Checkout",
          type: "HTML personnalisé",
          declencheur: "Event | Begin Checkout",
          code: `<script>
  ttq.track('InitiateCheckout', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event TikTok Ads | Complete Payment",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase",
          note: "TikTok attend CompletePayment, pas Purchase. Une balise mal nommée ne remonte dans aucun rapport.",
          code: `<script>
  ttq.track('CompletePayment', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  }, {
    event_id: {{ecommerce.transaction_id}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Utiliser le vocabulaire de Meta",
          desc: "Copier la balise Meta en remplaçant simplement fbq par ttq produit un événement Purchase que TikTok ignore.",
        },
        {
          titre: "Oublier ttq.page() dans la balise de socle",
          desc: "Sans cet appel, la vue de page n'est jamais envoyée : les audiences de remarketing restent vides.",
        },
        {
          titre: "Charger le pixel deux fois",
          desc: "Si TikTok a d'abord été posé en dur dans le code du site puis rajouté dans Tag Manager, chaque événement part en double.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier que les trois événements arrivent avec valeur et devise.",
        "Contrôler que la vue de page remonte sur le site comme sur la boutique.",
        "Vérifier qu'aucun événement n'apparaît en double.",
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════ */

export const QWEEKLE: GuideOutil = {
  slug: "qweekle",
  nom: "Qweekle",
  versions: [
    {
      id: "v3",
      label: "Version 3",
      statut: "la version actuelle",
      reconnaitre: "votre boutique est sur une adresse en .qweekle.shop",
    },
    {
      id: "v2",
      label: "Version 2",
      statut: "l'ancienne version, encore largement déployée",
      reconnaitre: "votre boutique est sur une adresse en .qweekle.com",
    },
  ],
  variantes: { v3: V3, v2: V2 },
  pilier: V3.pilier,
  plateformes: V3.plateformes,
};
