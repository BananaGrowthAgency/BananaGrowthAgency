import type { GuideOutil } from "./types";

export const APEX_TIMING: GuideOutil = {
  slug: "apex-timing",
  nom: "Apex Timing",
  pilier: {
    titre: "Plan de taggage Apex Timing : suivre ses conversions publicitaires",
    description:
      "Apex Timing pousse des événements déjà conformes à GA4, mais son tunnel est mutualisé entre tous les centres. Couche de données, plan de taggage, ordre à suivre.",
    chapo:
      "Apex Timing pousse une couche e-commerce aux noms conformes à la spécification actuelle de Google : c'est le meilleur point de départ des solutions que nous avons auditées, et aucune traduction n'est nécessaire. La difficulté est ailleurs — le tunnel tourne sur un domaine partagé entre tous les centres clients.",
    architecture: {
      intro:
        "L'architecture d'Apex Timing est singulière, et c'est elle qui dicte tout le paramétrage.",
      points: [
        "Le tunnel tourne sur www.apex-timing.com/gokarts/sessions_booking.php, le centre étant identifié par un paramètre dans l'adresse. La billetterie suit le même schéma sur ticketing.php.",
        "Ce domaine est mutualisé entre tous les centres clients. Ce n'est pas un sous-domaine par client, c'est le domaine de l'éditeur.",
        "Conséquence directe : les cookies de mesure sont posés sur apex-timing.com, donc sur le même domaine racine pour tous les centres.",
        "Chaque centre peut déposer son propre conteneur Google Tag Manager sur le tunnel, avec ses propres identifiants de mesure.",
        "Le même conteneur doit être installé des deux côtés : sur le site du parc et sur le tunnel.",
        "Les pages du tunnel sont en noindex et nofollow.",
      ],
    },
    dataLayer: {
      intro:
        "Apex Timing alimente une couche de données e-commerce sur le tunnel. Voici ce que nous avons relevé en production.",
      events: [
        { nom: "add_to_cart", note: "ajout au panier" },
        { nom: "begin_checkout", note: "entrée dans le paiement" },
        { nom: "purchase", note: "réservation payée" },
      ],
      variables: [
        "ecommerce.value — montant de la transaction",
        "ecommerce.currency — devise",
        "ecommerce.transaction_id — identifiant de commande",
      ],
      remarque:
        "Les trois noms respectent la spécification Google Analytics 4 : ils alimentent directement les rapports de monétisation sans transformation. C'est un avantage réel sur les moteurs restés sur l'ancienne nomenclature. En revanche, nous n'avons pas relevé d'événement de consultation produit ni de retrait du panier : l'entonnoir démarre à l'ajout au panier. Il n'existe pas non plus d'événement marquant l'entrée dans le tunnel — il faut le fabriquer soi-même avec un déclencheur de page.",
    },
    parcours: {
      intro:
        "Vue d'ensemble du parcours. La première ligne n'est pas un événement de l'outil : c'est un repère qu'on fabrique.",
      etapes: [
        {
          etape: "Entrée dans le tunnel",
          source: "Déclencheur de page sur l'URL de réservation",
          ga4: "begin_booking, personnalisé",
          ads: "Conversion secondaire, sans valeur",
          meta: "—",
          tiktok: "—",
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
      "Poser le socle : conteneur sur le site et sur le tunnel, variables de couche de données, déclencheurs.",
      "Google Analytics 4 en premier — les noms étant déjà conformes, c'est l'étape la plus rapide des quatre.",
      "Google Ads ensuite, avec le suivi inter-domaines vers apex-timing.com.",
      "Meta et TikTok pour finir, sur les mêmes déclencheurs.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Installer Google Analytics 4 sur un tunnel Apex Timing",
      description:
        "Les noms d'événements d'Apex Timing sont déjà conformes : le vrai travail est de ne pas les réécrire, et de fabriquer le repère d'entrée de tunnel qui manque.",
      chapo:
        "C'est l'installation la plus simple des quatre moteurs que nous documentons : les noms d'événements sont déjà ceux qu'attend GA4. Le seul travail de fond consiste à fabriquer le repère d'entrée de tunnel, qui n'existe pas nativement.",
      prerequis: [
        "Le conteneur Google Tag Manager du centre est installé sur le site du parc et sur le tunnel Apex.",
        "Un identifiant de mesure Google Analytics 4 au format G-XXXXXXXXXX.",
        "Le suivi inter-domaines est configuré vers apex-timing.com — voir le guide Google Ads.",
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
          nom: "Page View | Open Booking",
          type: "Vue de page",
          condition: "URL de la page contient sessions_booking.php",
          note: "Le repère d'entrée de tunnel, à fabriquer. On peut aussi le poser sur la page de réservation du site du parc, avant la redirection.",
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
          note: "Événement personnalisé, sans équivalent standard. En minuscules avec tirets bas, comme les autres : c'est ce qui permettra de le retrouver et de l'exploiter dans les explorations.",
        },
        {
          nom: "Event Google Analytics | Add To Cart",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "Nom de l'événement", valeur: "add_to_cart" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
          note: "Activer la récupération des données e-commerce est ce qui transmet le tableau items et la valeur. C'est l'oubli le plus fréquent sur cette étape.",
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
          titre: "Réécrire les noms alors qu'ils sont déjà bons",
          desc: "C'est le piège propre à Apex Timing. La couche de données est conforme, mais il reste tentant de nommer la balise GA4 « Add To Cart » ou « Open Booking » pour la lisibilité. GA4 est sensible à la casse : un événement nommé ainsi n'alimente ni le rapport de monétisation ni l'entonnoir d'achat, et tout l'avantage d'une couche conforme est perdu.",
        },
        {
          titre: "Les données e-commerce désactivées sur le panier",
          desc: "Sans la récupération des données e-commerce, la balise envoie un événement vide : ni produits, ni valeur. L'achat est en général bien configuré, les étapes intermédiaires beaucoup moins.",
        },
        {
          titre: "Ne pas fabriquer le repère d'entrée de tunnel",
          desc: "Sans lui, l'entonnoir démarre à l'ajout au panier et on ne sait pas combien de visiteurs ont ouvert la réservation sans rien mettre au panier. C'est pourtant la fuite la plus importante à surveiller.",
        },
      ],
      verification: [
        "Dans l'aperçu Tag Manager, parcourir un achat depuis le site du parc jusqu'à la confirmation.",
        "Dans le DebugView de GA4, vérifier que les quatre événements apparaissent avec leurs noms en minuscules.",
        "Vérifier que l'achat porte value, currency, transaction_id et le tableau items.",
        "Contrôler après 48 heures que le rapport Monétisation affiche les achats et le chiffre d'affaires.",
        "Vérifier que apex-timing.com n'apparaît pas dans le rapport des sources de trafic.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads avec Apex Timing",
      description:
        "Le tunnel Apex est mutualisé entre tous les centres, donc les cookies sont partagés. Les balises Google Ads à créer, et la vigilance que cela impose.",
      chapo:
        "Le domaine mutualisé d'Apex Timing rend le suivi inter-domaines indispensable, et ajoute une vigilance que les autres moteurs ne demandent pas : les cookies sont partagés avec l'ensemble des centres clients de l'éditeur.",
      prerequis: [
        "Le conteneur Google Tag Manager du centre est installé sur le site et sur le tunnel.",
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
        },
      ],
      declencheurs: [
        {
          nom: "Page View | Open Booking",
          type: "Vue de page",
          condition: "URL de la page contient sessions_booking.php",
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
              valeur: "monparc.fr, apex-timing.com",
            },
          ],
          note: "Saisissez des domaines nus, sans https ni barre oblique finale. L'interface accepte le format complet, mais la décoration des liens ne se fait pas et rien ne vous alerte.",
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
          nom: "Google Ads | Event Open Booking",
          type: "Suivi des conversions Google Ads",
          declencheur: "Page View | Open Booking",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "laisser vide" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
          note: "Conversion sans valeur : à ce stade, aucun montant n'existe. Elle sert de signal intermédiaire sur les campagnes à faible volume d'achats.",
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{ecommerce.value}}" },
            { cle: "Code devise", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
        },
        {
          nom: "Google Ads | Event Begin Checkout",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Begin Checkout",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{ecommerce.value}}" },
            { cle: "Code devise", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{ecommerce.value}}" },
            { cle: "Code devise", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de commande", valeur: "{{ecommerce.transaction_id}}" },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
          note: "Seule balise portant l'ID de commande.",
        },
      ],
      pieges: [
        {
          titre: "Les cookies partagés entre centres",
          desc: "Le tunnel pose ses cookies sur apex-timing.com, commun à tous les centres clients de l'éditeur. Un visiteur déjà passé par le tunnel d'un autre centre peut arriver avec un identifiant déjà attribué sur ce domaine. C'est une particularité qu'aucun autre moteur du panel ne présente, et elle mérite un contrôle régulier du rapport des sources.",
        },
        {
          titre: "Les domaines saisis avec le protocole",
          desc: "Écrire https://www.apex-timing.com/ au lieu de apex-timing.com. C'est accepté à la saisie, mais le paramètre de liaison n'est jamais ajouté aux liens.",
        },
        {
          titre: "L'ID de commande sur les étapes intermédiaires",
          desc: "Google Ads dédoublonne sur ce champ. Renseigné ailleurs que sur l'achat, il fusionne les conversions et fait chuter les chiffres sans explication.",
        },
        {
          titre: "La conversion d'ajout au panier sans valeur",
          desc: "Elle compte alors des événements, pas de l'argent. Sur un parc où les achats restent peu nombreux, c'est priver l'algorithme d'un signal intermédiaire utile.",
        },
      ],
      verification: [
        "Cliquer vers le tunnel depuis le site du parc et vérifier que le paramètre _gl est présent dans l'URL.",
        "Vérifier dans l'aperçu que le Conversion Linker se déclenche sur les deux domaines.",
        "Passer une commande test et contrôler la remontée dans Google Ads sous 48 heures, avec sa valeur.",
        "Vérifier que le rapport des sources GA4 ne liste pas apex-timing.com comme référent.",
        "Rapprocher les conversions Google Ads des réservations en caisse sur un mois complet.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur un tunnel Apex Timing",
      description:
        "Le code fbq à copier pour un tunnel Apex Timing. L'entonnoir démarre au panier : pas de ViewContent natif, mais la valeur est là dès la première étape.",
      chapo:
        "Meta n'a pas de modèle natif dans Google Tag Manager : tout passe par des balises HTML personnalisées. Sur Apex Timing, l'entonnoir démarre à l'ajout au panier — il n'y a pas d'événement de consultation produit à exploiter.",
      prerequis: [
        "Le conteneur Google Tag Manager du centre est installé sur le site et sur le tunnel.",
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
          note: "Sert d'identifiant d'événement pour la déduplication avec l'API de conversions.",
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
          nom: "Meta Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Toutes les pages",
          note: "Doit se déclencher sur le site du parc comme sur le tunnel. Si la balise de socle manque sur le tunnel, les événements d'achat n'ont aucune bibliothèque à appeler et disparaissent sans erreur.",
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
          note: "Première étape mesurable du parcours sur Apex. La valeur est disponible dès ici : ne la laissez pas de côté.",
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
          note: "L'identifiant d'événement permettra d'ajouter l'API de conversions plus tard sans doubler les achats. Le poser maintenant ne coûte rien.",
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
          titre: "Chercher un événement de consultation produit",
          desc: "Il n'y en a pas sur Apex Timing. Si vous voulez un ViewContent, il faut le fabriquer avec un déclencheur de page sur les fiches produit du site du parc, en amont du tunnel.",
        },
        {
          titre: "L'ajout au panier sans valeur",
          desc: "fbq('track', 'AddToCart') sans paramètre : l'événement remonte sans montant, et l'algorithme ne peut plus distinguer une session de karting d'une privatisation complète.",
        },
        {
          titre: "La devise écrite en dur",
          desc: "currency: 'EUR' codé dans la balise au lieu de lire la couche de données : incohérence avec GA4 et rapprochements impossibles.",
        },
        {
          titre: "L'achat sans identifiant d'événement",
          desc: "Sans eventID, l'ajout ultérieur de l'API de conversions double tous les achats.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que le pixel de socle se charge aussi sur les pages du tunnel.",
        "Contrôler dans le Gestionnaire d'événements que les trois événements arrivent avec valeur et devise.",
        "Vérifier que l'achat porte un identifiant d'événement.",
        "Comparer les achats Meta et les transactions GA4 sur sept jours.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur un tunnel Apex Timing",
      description:
        "Le code ttq à copier pour un tunnel Apex Timing, sur les mêmes déclencheurs que Meta. CompletePayment et non Purchase, et ttq.page() à ne pas oublier.",
      chapo:
        "Même principe que Meta : balises HTML personnalisées et déclencheurs identiques. TikTok a sa propre nomenclature, qu'il ne faut pas confondre avec celle de Meta.",
      prerequis: [
        "Le conteneur Google Tag Manager du centre est installé sur le site et sur le tunnel.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
        "Les déclencheurs sont déjà créés pour Meta ou Google Analytics — ils se réutilisent tels quels.",
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
          note: "TikTok n'utilise pas Purchase mais CompletePayment. Une balise nommée Purchase ne remonte dans aucun rapport.",
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
          desc: "Copier la balise Meta en remplaçant simplement fbq par ttq produit un événement Purchase que TikTok ignore. Le nom attendu est CompletePayment.",
        },
        {
          titre: "Oublier ttq.page() dans la balise de socle",
          desc: "Sans cet appel, la vue de page n'est jamais envoyée : les audiences de remarketing restent vides même si les conversions remontent.",
        },
        {
          titre: "Charger le pixel deux fois",
          desc: "Si TikTok a d'abord été posé en dur dans le code du site puis ajouté dans Tag Manager, chaque événement part en double.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier dans le Gestionnaire d'événements TikTok que les trois événements arrivent avec valeur et devise.",
        "Contrôler que la vue de page remonte sur le site comme sur le tunnel.",
        "Vérifier qu'aucun événement n'apparaît en double.",
      ],
    },
  ],
};
