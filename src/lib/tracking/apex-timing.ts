import type { GuideOutil } from "./types";

/**
 * Guide Apex Timing.
 *
 * Révisé en octobre 2026 à partir de la documentation officielle de l'éditeur
 * (wiki.apex-timing.com), qui a corrigé trois points établis jusque-là sur la
 * seule observation d'un conteneur client : le tunnel s'affiche en cadres
 * intégrés, la couche de données compte huit événements et non trois, et
 * l'éditeur fournit une fonction de transmission du consentement.
 */
export const APEX_TIMING: GuideOutil = {
  slug: "apex-timing",
  nom: "Apex Timing",
  pilier: {
    titre: "Plan de taggage Apex Timing : suivre ses conversions publicitaires",
    description:
      "Apex Timing documente huit événements conformes à GA4 et une fonction de consentement, mais sert son tunnel en cadres intégrés. Couche de données et plan de taggage.",
    chapo:
      "Apex Timing est l'un des rares moteurs à documenter publiquement son plan de taggage — et cette documentation est bonne : huit événements aux noms conformes à la spécification actuelle, et une fonction dédiée à la transmission du consentement. La difficulté est architecturale : le tunnel s'affiche en cadres intégrés servis depuis le domaine de l'éditeur.",
    architecture: {
      intro:
        "C'est l'architecture d'Apex Timing qui dicte tout le paramétrage, et elle n'est pas celle qu'on suppose au premier regard.",
      points: [
        "Les pages de réservation ne sont pas des pages du site du parc : ce sont des cadres intégrés, servis depuis www.apex-timing.com, que l'on insère dans ses propres pages. Chaque centre est identifié par un paramètre center dans l'adresse.",
        "Huit adresses composent le parcours : billetterie (ticketing.php), réservations (sessions_booking.php), événements (events_booking.php), panier (cart_contents.php), validation (cart_payment.php), initiation du paiement (functions/cart_do_payment.php), remerciement (cart_paid.php) et connexion (cart_login.php).",
        "Le domaine est mutualisé entre tous les centres clients de l'éditeur : les cookies de mesure sont donc posés sur un domaine racine partagé.",
        "Les identifiants se renseignent directement dans l'espace client, sans développement : GoKarts puis Paramètres, où trois champs attendent respectivement Google Analytics, Google Tag Manager et le pixel Meta.",
        "Le contenu étant isolé dans un cadre, la communication entre la page du parc et le tunnel passe par des fonctions fournies par l'éditeur, à appeler après le chargement du cadre.",
        "Apex Timing précise ne pas assurer de support sur la configuration de Tag Manager et recommande de passer par un spécialiste.",
      ],
    },
    dataLayer: {
      intro:
        "Apex Timing documente sa couche de données. Huit événements couvrent le parcours, de la vue de la liste jusqu'à l'achat.",
      events: [
        {
          nom: "view_item_list",
          note: "affichage de la billetterie, des réservations ou des événements",
        },
        { nom: "view_item", note: "clic sur « réserver » un produit" },
        { nom: "add_to_cart", note: "ajout au panier ou hausse de quantité" },
        {
          nom: "edit_in_cart",
          note: "retour sur la fiche produit puis validation — propre à Apex",
        },
        { nom: "view_cart", note: "chargement de la page panier" },
        {
          nom: "remove_from_cart",
          note: "baisse de quantité ou suppression",
        },
        { nom: "begin_checkout", note: "initiation du paiement" },
        { nom: "purchase", note: "chargement de la page de remerciement" },
      ],
      variables: [
        "ecommerce.items — détail produit : item_name, item_id, item_category, item_category2, price, discount, quantity",
        "ecommerce.value — montant, à partir du panier",
        "ecommerce.tax — taxes, sur l'initiation du paiement",
        "ecommerce.coupon — code promotionnel, au paiement et à l'achat",
      ],
      remarque:
        "Sept de ces huit noms respectent la spécification Google Analytics 4 et alimentent les rapports sans transformation : c'est le meilleur point de départ des moteurs que nous documentons. Seul edit_in_cart est propre à Apex, sans équivalent standard. Deux précisions comptent. D'abord, la documentation officielle ne mentionne pas de transaction_id sur l'achat, alors que les installations que nous auditons en lisent un : à vérifier sur votre tunnel avant de s'en servir pour dédupliquer. Ensuite, Apex expose une fonction de transmission du consentement, ce qui en fait l'un des rares moteurs du panel à permettre un Consent Mode correct à l'intérieur d'un cadre intégré.",
    },
    parcours: {
      intro:
        "Vue d'ensemble du parcours documenté par l'éditeur, redistribué vers les quatre destinations.",
      etapes: [
        {
          etape: "Affichage de l'offre",
          source: "view_item_list",
          ga4: "view_item_list",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
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
          ads: "Conversion secondaire",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Modification du panier",
          source: "edit_in_cart, remove_from_cart",
          ga4: "remove_from_cart — edit_in_cart à ignorer",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Vue du panier",
          source: "view_cart",
          ga4: "view_cart, avec la valeur",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Début du paiement",
          source: "begin_checkout",
          ga4: "begin_checkout, avec valeur et taxes",
          ads: "Conversion secondaire, avec valeur",
          meta: "InitiateCheckout",
          tiktok: "InitiateCheckout",
        },
        {
          etape: "Réservation payée",
          source: "purchase",
          ga4: "purchase, avec valeur, items et coupon",
          ads: "Conversion principale",
          meta: "Purchase",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Poser le socle : conteneur sur le site et identifiants renseignés dans l'espace client Apex.",
      "Câbler le consentement avant toute balise — l'éditeur fournit la fonction, c'est le moment de s'en servir.",
      "Google Analytics 4 : les noms étant déjà conformes, c'est l'étape la plus rapide des quatre.",
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
        "Sept des huit événements Apex sont déjà au format GA4 : le travail consiste à ne pas les réécrire, et à traiter le cas d'edit_in_cart qui n'a pas d'équivalent.",
      chapo:
        "C'est l'installation la plus simple des quatre moteurs que nous documentons : les noms d'événements sont déjà ceux qu'attend GA4. Le vrai piège est de vouloir les renommer pour les rendre lisibles dans l'interface.",
      prerequis: [
        "L'identifiant de mesure est renseigné dans l'espace client Apex : GoKarts, puis Paramètres, champ « Google Analytics ».",
        "Le conteneur Google Tag Manager du centre est renseigné dans le champ voisin, et installé sur le site du parc.",
        "Le suivi inter-domaines est configuré vers apex-timing.com — voir le guide Google Ads.",
      ],
      variables: [
        {
          nom: "DLV - ecommerce.items",
          type: "Variable de couche de données",
          cle: "ecommerce.items",
          note: "Le tableau produit complet, directement au format attendu par GA4.",
        },
        {
          nom: "DLV - ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "DLV - ecommerce.tax",
          type: "Variable de couche de données",
          cle: "ecommerce.tax",
        },
        {
          nom: "DLV - ecommerce.coupon",
          type: "Variable de couche de données",
          cle: "ecommerce.coupon",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Apex Ecommerce",
          type: "Événement personnalisé, expression régulière",
          condition:
            "^(view_item_list|view_item|add_to_cart|remove_from_cart|view_cart|begin_checkout|purchase)$",
          note: "Un seul déclencheur pour les sept événements conformes, puisque la balise relaiera le nom tel quel. edit_in_cart est volontairement exclu.",
        },
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
          note: "Déclencheur séparé, utile pour les balises qui ne doivent partir qu'à l'achat.",
        },
      ],
      balises: [
        {
          nom: "Apex | Consent Bridge",
          type: "HTML personnalisé",
          declencheur: "Fenêtre chargée — pages portant un cadre Apex",
          note: "À poser avant tout le reste. Le contenu de réservation étant isolé dans un cadre, il n'a pas connaissance du choix fait par le visiteur sur le bandeau du site : il faut le lui transmettre. Apex fournit la fonction pour cela, et c'est ce qui rend un Consent Mode correct possible à l'intérieur du cadre — peu de moteurs du panel le permettent. Remplacez les valeurs par celles de votre gestionnaire de consentement.",
          code: `<script>
  // À exécuter après le chargement du cadre Apex.
  // Remplacer les valeurs par l'état réel du consentement, lu depuis votre CMP.
  AxIframe.sendGoogleDataLayerData({
    event: 'consent_update',
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_personalization: 'granted',
    ad_user_data: 'granted'
  });
</script>`,
        },
        {
          nom: "Google Analytics | Main Tag",
          type: "Balise Google",
          declencheur: "Initialisation — Toutes les pages",
          champs: [{ cle: "ID de la balise", valeur: "G-XXXXXXXXXX" }],
        },
        {
          nom: "Event Google Analytics | Apex Ecommerce",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Apex Ecommerce",
          champs: [
            { cle: "Nom de l'événement", valeur: "{{Event}}" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
          note: "Une seule balise relaie les sept événements sous leur nom d'origine. C'est tout l'avantage d'une couche de données conforme : on transmet, on ne traduit pas.",
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
            { cle: "Paramètre value", valeur: "{{DLV - ecommerce.value}}" },
            { cle: "Paramètre coupon", valeur: "{{DLV - ecommerce.coupon}}" },
          ],
          note: "À n'utiliser que si vous voulez enrichir l'achat de paramètres supplémentaires. Dans ce cas, excluez purchase du déclencheur précédent pour ne pas le compter deux fois.",
        },
      ],
      pieges: [
        {
          titre: "Renommer les événements alors qu'ils sont déjà bons",
          desc: "C'est le piège propre à Apex Timing. La couche de données est conforme, mais il reste tentant de nommer la balise « Add To Cart » ou « Open Booking » pour la lisibilité. GA4 est sensible à la casse : un événement nommé ainsi n'alimente ni le rapport de monétisation ni l'entonnoir d'achat, et tout l'avantage d'une couche conforme est perdu.",
        },
        {
          titre: "Transmettre edit_in_cart tel quel",
          desc: "Cet événement est propre à Apex et n'a aucun équivalent dans la spécification Google. Transmis sans réflexion, il crée un événement personnalisé qui n'alimente rien. Soit vous l'ignorez, soit vous le traduisez délibérément — mais ne le laissez pas passer par défaut.",
        },
        {
          titre: "Compter sur un identifiant de transaction non documenté",
          desc: "La documentation officielle ne liste pas de transaction_id sur l'achat. Les installations que nous auditons en lisent pourtant un. Vérifiez sa présence dans l'aperçu avant de bâtir une déduplication dessus : une variable vide ne déclenche aucune erreur, elle dégrade juste silencieusement vos conversions.",
        },
        {
          titre: "Oublier que le contenu est dans un cadre intégré",
          desc: "Les événements remontent bien au conteneur, mais tout ce qui relève du contexte de page — URL, titre, référent — décrit le cadre et non la page du parc. Ne bâtissez pas vos conditions de déclenchement sur l'URL si vous pouvez les bâtir sur les événements.",
        },
      ],
      verification: [
        "Dans l'aperçu Tag Manager, parcourir un achat complet depuis la page du parc jusqu'à la confirmation.",
        "Vérifier que les sept événements apparaissent dans le DebugView de GA4, sous leurs noms d'origine.",
        "Contrôler que l'achat porte value, items et coupon.",
        "Vérifier la présence — ou l'absence — d'un identifiant de transaction, et en tirer les conséquences.",
        "Après 48 heures, contrôler que le rapport Monétisation affiche les achats et le chiffre d'affaires.",
        "Vérifier que apex-timing.com n'apparaît pas dans le rapport des sources de trafic.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads avec Apex Timing",
      description:
        "Domaine mutualisé entre tous les centres et contenu en cadre intégré : les deux particularités d'Apex qui décident du paramétrage Google Ads.",
      chapo:
        "Deux particularités d'Apex Timing décident de tout ici : le tunnel est servi depuis un domaine partagé par l'ensemble des centres clients, et son contenu s'affiche dans un cadre intégré. Aucune des deux n'est bloquante, les deux demandent un paramétrage délibéré.",
      prerequis: [
        "Le conteneur Google Tag Manager est renseigné dans l'espace client Apex et installé sur le site du parc.",
        "Un identifiant Google Ads au format AW-XXXXXXXXX.",
        "Les actions de conversion sont créées côté Google Ads, chacune avec son libellé.",
      ],
      variables: [
        {
          nom: "DLV - ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "DLV - ecommerce.coupon",
          type: "Variable de couche de données",
          cle: "ecommerce.coupon",
        },
        {
          nom: "Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          cle: "Mode automatique",
          note: "Les conversions améliorées comptent double ici : le cadre intégré dégrade une partie du signal classique.",
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
            {
              cle: "Domaines à associer",
              valeur: "monparc.fr, apex-timing.com",
            },
          ],
          note: "Domaines nus, sans https ni barre oblique finale. L'interface accepte le format complet, mais la décoration des liens ne se fait pas et rien ne vous alerte.",
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
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "laisser vide" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
          note: "La couche Apex ne porte pas de valeur sur l'ajout au panier — elle n'apparaît qu'à partir de la vue du panier. Assumez une conversion sans montant plutôt que de brancher une variable vide.",
        },
        {
          nom: "Google Ads | Event Begin Checkout",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Begin Checkout",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{DLV - ecommerce.value}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{DLV - ecommerce.value}}" },
            {
              cle: "ID de commande",
              valeur: "à renseigner uniquement si le tunnel en expose un",
            },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
          note: "L'identifiant de commande n'étant pas documenté par l'éditeur, vérifiez sa présence avant de le câbler. Une variable vide dans ce champ est sans effet, mais elle donne l'illusion d'une déduplication qui n'existe pas.",
        },
      ],
      pieges: [
        {
          titre: "Les cookies partagés entre tous les centres",
          desc: "Le tunnel pose ses cookies sur apex-timing.com, domaine racine commun à l'ensemble des centres clients de l'éditeur. Un visiteur déjà passé par le tunnel d'un autre centre peut arriver avec un identifiant déjà attribué. C'est une particularité qu'aucun autre moteur du panel ne présente.",
        },
        {
          titre: "Les domaines saisis avec le protocole",
          desc: "Écrire https://www.apex-timing.com/ au lieu de apex-timing.com. C'est accepté à la saisie, mais le paramètre de liaison n'est jamais ajouté aux liens, et l'attribution se casse en silence.",
        },
        {
          titre: "Une valeur attendue trop tôt dans le parcours",
          desc: "La couche de données n'expose de montant qu'à partir de la vue du panier. Brancher une valeur sur l'ajout au panier produit un champ vide, pas une erreur.",
        },
        {
          titre: "Bâtir ses conversions sur des règles d'URL",
          desc: "Le contenu étant dans un cadre intégré, l'URL vue par le conteneur n'est pas toujours celle que vous croyez. Préférez systématiquement les événements de la couche de données aux conditions de page.",
        },
      ],
      verification: [
        "Cliquer vers le tunnel depuis le site du parc et vérifier la présence du paramètre _gl dans l'adresse.",
        "Vérifier dans l'aperçu que le Conversion Linker se déclenche des deux côtés.",
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
        "Apex Timing offre un champ dédié au pixel Meta dans son espace client. Quand s'en contenter, et quand passer par Tag Manager pour gagner les paramètres.",
      chapo:
        "Apex Timing réserve un champ au pixel Meta dans son espace client : le poser ne demande aucun développement. Mais ce champ ne transmet qu'une vue de page — pour les événements de commerce et leurs montants, il faut passer par Tag Manager.",
      prerequis: [
        "Le conteneur Google Tag Manager est renseigné dans l'espace client Apex et installé sur le site du parc.",
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
        "Les variables de couche de données sont créées — voir le guide Google Analytics.",
      ],
      variables: [
        {
          nom: "DLV - ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
        },
        {
          nom: "DLV - ecommerce.items",
          type: "Variable de couche de données",
          cle: "ecommerce.items",
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
          note: "À ne poser que si vous n'avez pas renseigné le pixel dans l'espace client Apex. Les deux en parallèle doublent chaque vue de page.",
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
          nom: "Event Meta Ads | View Content",
          type: "HTML personnalisé",
          declencheur: "Event | View Item",
          note: "Disponible sur Apex, contrairement à ce que laisse croire un audit limité à un conteneur peu équipé : la consultation produit est bien documentée.",
          code: `<script>
  fbq('track', 'ViewContent');
</script>`,
        },
        {
          nom: "Event Meta Ads | Add To Cart",
          type: "HTML personnalisé",
          declencheur: "Event | Add To Cart",
          note: "Sans montant : la couche Apex n'expose de valeur qu'à partir de la vue du panier. L'événement reste utile pour les audiences de remarketing.",
          code: `<script>
  fbq('track', 'AddToCart');
</script>`,
        },
        {
          nom: "Event Meta Ads | Initiate Checkout",
          type: "HTML personnalisé",
          declencheur: "Event | Begin Checkout",
          code: `<script>
  fbq('track', 'InitiateCheckout', {
    value: {{DLV - ecommerce.value}},
    currency: 'EUR'
  });
</script>`,
        },
        {
          nom: "Event Meta Ads | Purchase",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase",
          note: "Si votre tunnel expose un identifiant de transaction, ajoutez-le en eventID : c'est ce qui permettra de brancher l'API de conversions plus tard sans compter chaque achat deux fois.",
          code: `<script>
  fbq('track', 'Purchase', {
    value: {{DLV - ecommerce.value}},
    currency: 'EUR'
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Cumuler le champ de l'espace client et Tag Manager",
          desc: "Si le pixel est renseigné côté Apex et que vous posez en plus une balise de socle dans Tag Manager, chaque vue de page part deux fois. Choisissez : le champ pour la simplicité, Tag Manager pour les paramètres.",
        },
        {
          titre: "Croire que le champ de l'espace client suffit",
          desc: "Il charge le pixel et envoie la vue de page. Il n'envoie ni ajout au panier, ni début de paiement, ni achat, ni montant. Pour optimiser une campagne sur la valeur, Tag Manager reste nécessaire.",
        },
        {
          titre: "Attendre une valeur sur l'ajout au panier",
          desc: "Elle n'existe pas à cette étape chez Apex. Mieux vaut un AddToCart sans montant qu'un AddToCart avec une valeur vide, qui fausse les rapports.",
        },
        {
          titre: "La devise écrite en dur",
          desc: "Apex ne documente pas de variable de devise : l'écrire en dur est ici légitime, à condition de le faire consciemment et de le revoir si le centre vend un jour dans une autre monnaie.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que la vue de page n'est envoyée qu'une seule fois — c'est le contrôle prioritaire sur Apex.",
        "Contrôler dans le Gestionnaire d'événements que ViewContent, AddToCart, InitiateCheckout et Purchase arrivent.",
        "Vérifier que l'achat porte bien une valeur.",
        "Comparer les achats Meta et les transactions GA4 sur sept jours.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur un tunnel Apex Timing",
      description:
        "TikTok n'a pas de champ dédié chez Apex, contrairement à Meta : tout passe par Tag Manager, sur les mêmes déclencheurs que le pixel Meta.",
      chapo:
        "Contrairement à Google Analytics et à Meta, TikTok n'a pas de champ réservé dans l'espace client Apex. Tout passe donc par Tag Manager — sur exactement les mêmes déclencheurs que Meta, ce qui rend l'étape rapide si celui-ci est déjà posé.",
      prerequis: [
        "Le conteneur Google Tag Manager est renseigné dans l'espace client Apex et installé sur le site du parc.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
        "Les déclencheurs sont déjà créés pour Meta ou Google Analytics — ils se réutilisent tels quels.",
      ],
      variables: [
        {
          nom: "DLV - ecommerce.value",
          type: "Variable de couche de données",
          cle: "ecommerce.value",
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
          nom: "Event TikTok Ads | View Content",
          type: "HTML personnalisé",
          declencheur: "Event | View Item",
          code: `<script>
  ttq.track('ViewContent');
</script>`,
        },
        {
          nom: "Event TikTok Ads | Add To Cart",
          type: "HTML personnalisé",
          declencheur: "Event | Add To Cart",
          code: `<script>
  ttq.track('AddToCart');
</script>`,
        },
        {
          nom: "Event TikTok Ads | Initiate Checkout",
          type: "HTML personnalisé",
          declencheur: "Event | Begin Checkout",
          code: `<script>
  ttq.track('InitiateCheckout', {
    value: {{DLV - ecommerce.value}},
    currency: 'EUR'
  });
</script>`,
        },
        {
          nom: "Event TikTok Ads | Complete Payment",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase",
          note: "TikTok attend CompletePayment, pas Purchase. Ne recopiez pas la balise Meta en changeant seulement le préfixe.",
          code: `<script>
  ttq.track('CompletePayment', {
    value: {{DLV - ecommerce.value}},
    currency: 'EUR'
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Chercher un champ TikTok dans l'espace client",
          desc: "Il n'y en a pas. Apex réserve des champs à Google Analytics, à Tag Manager et au pixel Meta, mais pas à TikTok. Tout passe par Tag Manager, sans exception.",
        },
        {
          titre: "Utiliser le vocabulaire de Meta",
          desc: "Copier la balise Meta en remplaçant simplement fbq par ttq produit un événement Purchase que TikTok ignore. Le nom attendu est CompletePayment.",
        },
        {
          titre: "Oublier ttq.page() dans la balise de socle",
          desc: "Sans cet appel, la vue de page n'est jamais envoyée : les audiences de remarketing restent vides même si les conversions remontent.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier dans le Gestionnaire d'événements TikTok que les quatre événements arrivent.",
        "Contrôler que la vue de page remonte sur le site comme dans le tunnel.",
        "Vérifier qu'aucun événement n'apparaît en double.",
      ],
    },
  ],
};
