import type { GuideOutil } from "./types";

export const BMI_LEISURE: GuideOutil = {
  slug: "bmi-leisure",
  nom: "BMI Leisure",
  pilier: {
    titre: "Plan de taggage BMI Leisure : suivre ses conversions publicitaires",
    description:
      "La couche de données BMI date de 2015 : rien n'arrive au format attendu. Le travail de traduction, le plan de taggage, et le piège des événements par site.",
    chapo:
      "BMI Leisure ne documente rien publiquement sur la mesure, et sa couche de données repose sur une spécification que Google a remplacée en 2023. Tout est mesurable, mais rien n'arrive au format attendu : ce guide est avant tout un travail de traduction. Nos constats proviennent d'une installation réelle, restée en place après une migration.",
    architecture: {
      intro:
        "Deux particularités structurent tout le paramétrage, et aucune des deux n'apparaît dans la documentation commerciale.",
      points: [
        "Le tunnel de réservation tourne sur un sous-domaine de l'éditeur, au format booking.bmileisure.com. C'est un domaine racine différent de celui du parc : le suivi inter-domaines est obligatoire.",
        "Le parcours d'achat s'identifie par deux chemins d'URL : la page panier et la page de confirmation de commande.",
        "Le conteneur Google Tag Manager du parc peut être déposé sur le tunnel. C'est ce qui rend l'ensemble récupérable malgré l'absence de documentation.",
        "L'événement d'achat porte le nom de l'établissement en suffixe. Sur un groupe multi-sites, cela impose un déclencheur par établissement au lieu d'un seul — la configuration se multiplie par le nombre de parcs.",
        "BMI expose un indicateur de consentement aux cookies dans sa couche de données. C'est le seul élément de conformité que nous ayons pu constater, et il est exploitable pour conditionner les balises.",
      ],
    },
    dataLayer: {
      intro:
        "La couche de données suit la spécification Enhanced Ecommerce d'Universal Analytics. Les noms ci-dessous ne correspondent à rien de ce qu'attendent les outils actuels.",
      events: [
        {
          nom: "purchase:nomdeletablissement",
          note: "achat — suffixé par établissement",
        },
      ],
      variables: [
        "ecommerce.purchase.actionField.id — identifiant de commande",
        "ecommerce.purchase.actionField.revenue — chiffre d'affaires",
        "ecommerce.purchase.actionField.tax — taxes",
        "ecommerce.purchase.actionField.shipping — frais",
        "ecommerce.currencyCode — devise",
        "transactionProducts — détail des produits",
        "allowCookies — consentement aux cookies",
      ],
      remarque:
        "Aucun de ces noms n'est compris par Google Analytics 4, par le pixel Meta ou par TikTok. Il faut créer une couche de variables de traduction, puis construire tout le marquage par-dessus. C'est un surcoût d'implémentation permanent : chaque évolution du tunnel oblige à revérifier la correspondance. À l'inverse des trois autres moteurs du panel, le travail ne consiste pas à redistribuer une couche propre mais à en reconstruire une.",
    },
    parcours: {
      intro:
        "Vue d'ensemble. Le parcours mesurable est plus court que sur les autres moteurs : nous n'avons relevé que l'achat comme événement de couche de données, les étapes amont devant être reconstruites à partir des URL.",
      etapes: [
        {
          etape: "Ouverture du tunnel",
          source: "Déclencheur de page sur le domaine du tunnel",
          ga4: "begin_booking, personnalisé",
          ads: "Conversion secondaire, sans valeur",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Panier",
          source: "Déclencheur de page sur le chemin du panier",
          ga4: "add_to_cart, sans détail produit",
          ads: "Conversion secondaire, sans valeur",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Réservation payée",
          source: "purchase:nomdeletablissement",
          ga4: "purchase, après traduction",
          ads: "Conversion principale, avec orderId",
          meta: "Purchase, avec eventID",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Créer d'abord la couche de variables de traduction : c'est elle qui rend tout le reste possible.",
      "Créer un déclencheur d'achat par établissement, puis un déclencheur regroupant, pour ne pas dupliquer chaque balise.",
      "Google Analytics 4 en premier, comme source de vérité.",
      "Google Ads ensuite, avec le suivi inter-domaines vers le domaine du tunnel.",
      "Meta et TikTok pour finir, sur les mêmes variables traduites.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Installer Google Analytics 4 sur un tunnel BMI Leisure",
      description:
        "Sans couche de traduction, aucun événement BMI n'arrive correctement — et rien ne le signale. Les variables à créer, puis les balises GA4 à brancher dessus.",
      chapo:
        "L'essentiel du travail n'est pas dans les balises mais dans les variables. Tant que la couche de traduction n'est pas posée, aucun événement ne remontera correctement — et rien ne signalera l'erreur.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur le tunnel BMI.",
        "Un identifiant de mesure Google Analytics 4 au format G-XXXXXXXXXX.",
        "La liste exacte des noms d'établissement utilisés en suffixe de l'événement d'achat.",
      ],
      variables: [
        {
          nom: "DLV - Transaction ID",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.id",
          note: "Traduction de l'identifiant de commande.",
        },
        {
          nom: "DLV - Transaction Revenue",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.revenue",
          note: "Traduction du montant. Attention : ce champ inclut en général les taxes.",
        },
        {
          nom: "DLV - Transaction Tax",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.tax",
        },
        {
          nom: "DLV - Currency Code",
          type: "Variable de couche de données",
          cle: "ecommerce.currencyCode",
          note: "Le nom diffère de la convention actuelle, qui attend simplement currency.",
        },
        {
          nom: "DLV - Products",
          type: "Variable de couche de données",
          cle: "transactionProducts",
        },
        {
          nom: "JS - Items GA4",
          type: "Variable JavaScript personnalisée",
          cle: "Convertit DLV - Products au format items",
          note: "La pièce maîtresse. Le tableau produits de BMI n'a ni la même structure ni les mêmes noms de champs que celui attendu par GA4 : il faut le transformer.",
        },
        {
          nom: "DLV - Allow Cookies",
          type: "Variable de couche de données",
          cle: "allowCookies",
          note: "Sert à conditionner le déclenchement des balises au consentement.",
        },
      ],
      declencheurs: [
        {
          nom: "Page View | Open Booking",
          type: "Vue de page",
          condition: "Nom d'hôte contient booking.bmileisure.com",
        },
        {
          nom: "Page View | Cart",
          type: "Vue de page",
          condition: "Chemin de la page contient le chemin du panier",
        },
        {
          nom: "Event | Purchase — Tous établissements",
          type: "Événement personnalisé",
          condition: "Expression régulière : ^purchase:",
          note: "Un seul déclencheur au lieu d'un par parc. C'est ce qui évite de dupliquer chaque balise autant de fois qu'il y a d'établissements.",
        },
      ],
      balises: [
        {
          nom: "Google Analytics | Main Tag",
          type: "Balise Google",
          declencheur: "Initialisation — Toutes les pages",
          champs: [{ cle: "ID de la balise", valeur: "G-XXXXXXXXXX" }],
        },
        {
          nom: "Event Google Analytics | Begin Booking",
          type: "Google Analytics : événement GA4",
          declencheur: "Page View | Open Booking",
          champs: [{ cle: "Nom de l'événement", valeur: "begin_booking" }],
        },
        {
          nom: "Event Google Analytics | Add To Cart",
          type: "Google Analytics : événement GA4",
          declencheur: "Page View | Cart",
          champs: [{ cle: "Nom de l'événement", valeur: "add_to_cart" }],
          note: "Reconstruit à partir de l'URL du panier, faute d'événement dédié. Sans valeur ni détail produit à ce stade : c'est une limite du moteur, pas une négligence.",
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase — Tous établissements",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Données e-commerce", valeur: "Désactivé" },
            {
              cle: "Paramètre transaction_id",
              valeur: "{{DLV - Transaction ID}}",
            },
            { cle: "Paramètre value", valeur: "{{DLV - Transaction Revenue}}" },
            { cle: "Paramètre currency", valeur: "{{DLV - Currency Code}}" },
            { cle: "Paramètre tax", valeur: "{{DLV - Transaction Tax}}" },
            { cle: "Paramètre items", valeur: "{{JS - Items GA4}}" },
          ],
          note: "Désactivez la récupération automatique des données e-commerce : elle irait chercher une structure que BMI ne fournit pas. Tous les paramètres se renseignent à la main, depuis les variables traduites.",
        },
      ],
      pieges: [
        {
          titre: "Activer la récupération automatique des données e-commerce",
          desc: "C'est le réflexe naturel, et c'est faux ici. Google Analytics 4 cherche alors un objet ecommerce structuré à sa façon, que BMI ne produit pas. L'événement remonte vide, sans erreur, et on peut passer des semaines à chercher pourquoi.",
        },
        {
          titre: "Créer une balise par établissement",
          desc: "L'événement étant suffixé par parc, la tentation est de dupliquer chaque balise autant de fois. Un déclencheur par expression régulière règle le problème et divise la maintenance par le nombre de sites.",
        },
        {
          titre: "Confondre chiffre d'affaires et montant hors taxes",
          desc: "Le champ de revenu inclut généralement les taxes, contrairement à ce qu'attendent certains rapports. Vérifiez sur une commande réelle avant de figer, sinon tous vos rapprochements seront décalés du taux de TVA.",
        },
        {
          titre: "Oublier de convertir le tableau produits",
          desc: "La structure produits de BMI n'est pas celle de GA4. Transmise telle quelle, elle est ignorée : vous aurez le chiffre d'affaires, jamais le détail des articles.",
        },
      ],
      verification: [
        "Dans l'aperçu Tag Manager, passer une commande test et vérifier que chaque variable traduite est bien remplie, une par une.",
        "Dans le DebugView de GA4, vérifier que l'achat arrive avec transaction_id, value, currency et items.",
        "Comparer le montant remonté à celui de la caisse BMI, taxes comprises ou non selon votre choix.",
        "Sur un groupe multi-sites, vérifier que le déclencheur par expression régulière capte bien tous les établissements.",
        "Contrôler que le domaine du tunnel n'apparaît pas dans le rapport des sources de trafic.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads avec BMI Leisure",
      description:
        "Les conversions BMI se branchent sur les variables traduites, jamais sur ecommerce.value. Les balises à créer, et comment ne pas oublier un établissement.",
      chapo:
        "Une fois la couche de traduction posée pour Google Analytics, Google Ads se branche dessus sans effort supplémentaire. Reste le suivi inter-domaines, indispensable puisque le tunnel vit sur le domaine de l'éditeur.",
      prerequis: [
        "La couche de variables de traduction est créée — voir le guide Google Analytics.",
        "Le conteneur Google Tag Manager est installé sur le site et sur le tunnel.",
        "Un identifiant Google Ads au format AW-XXXXXXXXX.",
      ],
      variables: [
        {
          nom: "DLV - Transaction ID",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.id",
        },
        {
          nom: "DLV - Transaction Revenue",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.revenue",
        },
        {
          nom: "DLV - Currency Code",
          type: "Variable de couche de données",
          cle: "ecommerce.currencyCode",
        },
        {
          nom: "Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          cle: "Mode automatique",
        },
      ],
      declencheurs: [
        {
          nom: "Page View | Open Booking",
          type: "Vue de page",
          condition: "Nom d'hôte contient booking.bmileisure.com",
        },
        {
          nom: "Page View | Cart",
          type: "Vue de page",
          condition: "Chemin de la page contient le chemin du panier",
        },
        {
          nom: "Event | Purchase — Tous établissements",
          type: "Événement personnalisé",
          condition: "Expression régulière : ^purchase:",
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
              valeur: "monparc.fr, bmileisure.com",
            },
          ],
          note: "Domaines nus, sans protocole ni barre oblique finale.",
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
          note: "Particulièrement utile ici : le parcours amont étant peu instrumenté, les conversions améliorées rattrapent une partie du signal perdu.",
        },
        {
          nom: "Google Ads | Event Open Booking",
          type: "Suivi des conversions Google Ads",
          declencheur: "Page View | Open Booking",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "laisser vide" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "Page View | Cart",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "laisser vide" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
          note: "Sans valeur : à ce stade, BMI n'expose pas le montant du panier. C'est une limite à accepter.",
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Purchase — Tous établissements",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            {
              cle: "Valeur de conversion",
              valeur: "{{DLV - Transaction Revenue}}",
            },
            { cle: "Code devise", valeur: "{{DLV - Currency Code}}" },
            { cle: "ID de commande", valeur: "{{DLV - Transaction ID}}" },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Brancher les conversions sur les mauvaises variables",
          desc: "Une conversion configurée sur ecommerce.value ou ecommerce.transaction_id, par réflexe venu d'un autre moteur, remonte systématiquement à zéro euro. BMI n'utilise aucun de ces deux noms.",
        },
        {
          titre: "Oublier un établissement",
          desc: "Si vous créez un déclencheur par parc au lieu d'une expression régulière, l'ouverture d'un nouveau site passe inaperçue : ses ventes ne remontent jamais, et personne ne s'en aperçoit avant le bilan.",
        },
        {
          titre: "Attendre une valeur sur les étapes amont",
          desc: "Le panier n'expose pas de montant. Créer une conversion de panier avec valeur produit un champ vide, pas une erreur. Mieux vaut l'assumer sans valeur.",
        },
      ],
      verification: [
        "Cliquer vers le tunnel depuis le site du parc et vérifier la présence du paramètre _gl dans l'URL.",
        "Passer une commande test et contrôler la remontée dans Google Ads sous 48 heures, avec sa valeur et son identifiant de commande.",
        "Vérifier sur chaque établissement que l'achat déclenche bien la conversion.",
        "Rapprocher les conversions Google Ads des réservations en caisse sur un mois complet.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur un tunnel BMI Leisure",
      description:
        "Le code fbq à copier pour un tunnel BMI Leisure. L'achat est le seul événement qui porte une valeur : c'est lui qui concentre tout le signal, autant le soigner.",
      chapo:
        "Aucune intégration native : tout passe par des balises HTML personnalisées, branchées sur les variables traduites. Le parcours mesurable étant court, l'achat porte l'essentiel du signal — raison de plus pour le soigner.",
      prerequis: [
        "La couche de variables de traduction est créée — voir le guide Google Analytics.",
        "Le conteneur Google Tag Manager est installé sur le site et sur le tunnel.",
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
      ],
      variables: [
        {
          nom: "DLV - Transaction Revenue",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.revenue",
        },
        {
          nom: "DLV - Currency Code",
          type: "Variable de couche de données",
          cle: "ecommerce.currencyCode",
        },
        {
          nom: "DLV - Transaction ID",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.id",
          note: "Sert d'identifiant d'événement pour la déduplication.",
        },
      ],
      declencheurs: [
        {
          nom: "Page View | Cart",
          type: "Vue de page",
          condition: "Chemin de la page contient le chemin du panier",
        },
        {
          nom: "Event | Purchase — Tous établissements",
          type: "Événement personnalisé",
          condition: "Expression régulière : ^purchase:",
        },
      ],
      balises: [
        {
          nom: "Meta Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Toutes les pages",
          note: "Doit se déclencher sur le site du parc comme sur le tunnel.",
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
          declencheur: "Page View | Cart",
          note: "Sans valeur, faute de montant exposé à cette étape. C'est une limite du moteur : mieux vaut un événement sans valeur que pas d'événement du tout, car il alimente les audiences de remarketing.",
          code: `<script>
  fbq('track', 'AddToCart');
</script>`,
        },
        {
          nom: "Event Meta Ads | Purchase",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase — Tous établissements",
          note: "Le seul événement portant une valeur sur BMI. L'identifiant d'événement prépare l'API de conversions, particulièrement utile ici où le signal navigateur est déjà pauvre.",
          code: `<script>
  fbq('track', 'Purchase', {
    value: {{DLV - Transaction Revenue}},
    currency: {{DLV - Currency Code}}
  }, {
    eventID: {{DLV - Transaction ID}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Reprendre une balise écrite pour un autre moteur",
          desc: "Les variables sont différentes. Une balise copiée depuis une installation Qweekle ou Apex envoie une valeur vide, et Meta enregistre des achats à zéro euro sans le signaler.",
        },
        {
          titre: "Le pixel de socle absent du tunnel",
          desc: "Si la balise de socle ne se déclenche que sur le site du parc, l'événement d'achat n'a aucune bibliothèque à appeler. Il disparaît silencieusement, et c'est exactement l'événement qui compte le plus.",
        },
        {
          titre: "Oublier un établissement",
          desc: "Sans déclencheur par expression régulière, chaque nouveau parc ouvert est invisible pour Meta.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que le pixel de socle se charge sur les pages du tunnel.",
        "Contrôler dans le Gestionnaire d'événements que l'achat arrive avec sa valeur — et pas à zéro.",
        "Vérifier la présence de l'identifiant d'événement.",
        "Tester sur au moins deux établissements différents.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur un tunnel BMI Leisure",
      description:
        "Le code ttq à copier pour un tunnel BMI Leisure, branché sur les variables traduites. CompletePayment et non Purchase, et un test par établissement.",
      chapo:
        "Même approche que Meta : balises HTML personnalisées branchées sur les variables traduites, et les mêmes déclencheurs. Si Meta est déjà en place, comptez une demi-heure.",
      prerequis: [
        "La couche de variables de traduction est créée — voir le guide Google Analytics.",
        "Le conteneur Google Tag Manager est installé sur le site et sur le tunnel.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
      ],
      variables: [
        {
          nom: "DLV - Transaction Revenue",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.revenue",
        },
        {
          nom: "DLV - Currency Code",
          type: "Variable de couche de données",
          cle: "ecommerce.currencyCode",
        },
        {
          nom: "DLV - Transaction ID",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.id",
        },
      ],
      declencheurs: [
        {
          nom: "Page View | Cart",
          type: "Vue de page",
          condition: "Chemin de la page contient le chemin du panier",
        },
        {
          nom: "Event | Purchase — Tous établissements",
          type: "Événement personnalisé",
          condition: "Expression régulière : ^purchase:",
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
          declencheur: "Page View | Cart",
          note: "Sans valeur, comme sur Meta : BMI n'expose pas le montant du panier.",
          code: `<script>
  ttq.track('AddToCart');
</script>`,
        },
        {
          nom: "Event TikTok Ads | Complete Payment",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase — Tous établissements",
          note: "TikTok attend CompletePayment, pas Purchase.",
          code: `<script>
  ttq.track('CompletePayment', {
    value: {{DLV - Transaction Revenue}},
    currency: {{DLV - Currency Code}}
  }, {
    event_id: {{DLV - Transaction ID}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Utiliser le vocabulaire de Meta",
          desc: "CompletePayment et non Purchase. Un événement mal nommé ne remonte dans aucun rapport TikTok.",
        },
        {
          titre: "Oublier ttq.page() dans la balise de socle",
          desc: "Sans cet appel, les audiences de remarketing restent vides même si les achats remontent.",
        },
        {
          titre: "Reprendre les variables d'un autre moteur",
          desc: "BMI n'expose ni ecommerce.value ni eventModel.value. Une balise copiée envoie une valeur vide.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier que l'achat arrive avec sa valeur et sa devise dans le Gestionnaire d'événements TikTok.",
        "Contrôler que la vue de page remonte sur le site comme sur le tunnel.",
        "Tester sur au moins deux établissements différents.",
      ],
    },
  ],
};
