import type { GuideOutil } from "./types";

export const QWEEKLE: GuideOutil = {
  slug: "qweekle",
  nom: "Qweekle",
  pilier: {
    titre: "Plan de taggage Qweekle : suivre ses conversions publicitaires",
    description:
      "Le tunnel Qweekle vit sur un autre domaine et pousse des noms d'événements périmés. La couche de données réelle, le plan de taggage et l'ordre de déploiement.",
    chapo:
      "Qweekle héberge le tunnel de réservation sur son propre domaine et pousse une couche e-commerce complète. Tout est donc mesurable. Restent deux difficultés : la nomenclature des événements date d'une spécification que Google a abandonnée, et le changement de domaine casse l'attribution si personne ne s'en occupe.",
    architecture: {
      intro:
        "Avant de poser la moindre balise, il faut comprendre où se passe l'achat.",
      points: [
        "Le tunnel tourne sur un sous-domaine dédié par client, au format monparc.qweekle.com/shop/monparc.",
        "C'est un domaine racine différent de celui du parc. Pour un navigateur comme pour Google Analytics, monparc.fr et monparc.qweekle.com sont deux sites distincts : le suivi inter-domaines est obligatoire, pas optionnel.",
        "Chaque exploitant peut déposer son propre conteneur Google Tag Manager sur la boutique. C'est ce qui rend l'ensemble mesurable, et c'est loin d'être le cas de tous les moteurs du marché.",
        "Le même conteneur doit être installé des deux côtés : sur le site du parc et sur la boutique. C'est lui qui assure la continuité du parcours.",
        "Les pages du tunnel sont en noindex et nofollow : elles n'apparaîtront jamais dans Google.",
      ],
    },
    dataLayer: {
      intro:
        "Qweekle alimente une couche de données e-commerce sur la boutique. Voici les événements relevés sur des tunnels en production.",
      events: [
        { nom: "view_item", note: "consultation d'un produit" },
        { nom: "add_to_cart", note: "ajout au panier" },
        { nom: "remove_from_cart", note: "retrait du panier" },
        { nom: "begin_checkout", note: "entrée dans le tunnel de paiement" },
        {
          nom: "checkout_progress",
          note: "progression dans le paiement — nomenclature obsolète",
        },
        {
          nom: "set_checkout_option",
          note: "choix d'une option — nomenclature obsolète",
        },
        { nom: "purchase", note: "réservation payée" },
      ],
      variables: [
        "ecommerce.value — montant de la transaction",
        "ecommerce.currency — devise",
        "ecommerce.transaction_id — identifiant de commande",
      ],
      remarque:
        "Deux de ces noms, checkout_progress et set_checkout_option, viennent de l'ancienne spécification Universal Analytics. Google Analytics 4 ne les reconnaît pas : il attend add_shipping_info et add_payment_info. Ils arrivent donc comme événements personnalisés et n'alimentent pas l'entonnoir d'achat standard. Autre subtilité : begin_checkout et checkout_progress coexistent. Il faut décider lequel représente le début du paiement, sinon la même étape est comptée deux fois.",
    },
    parcours: {
      intro:
        "Vue d'ensemble du parcours. Chaque ligne part d'un événement Qweekle et le redistribue vers les quatre destinations.",
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
      "Poser le socle commun : conteneur sur les deux domaines, variables de couche de données, déclencheurs d'événements.",
      "Google Analytics 4 en premier : c'est la source de vérité qui servira à contrôler tout le reste.",
      "Google Ads ensuite, avec le suivi inter-domaines — c'est là que se joue l'attribution.",
      "Meta et TikTok en dernier : ils consomment les mêmes déclencheurs, une fois ceux-ci éprouvés.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Installer Google Analytics 4 sur un tunnel Qweekle",
      description:
        "Traduire checkout_progress, activer les données e-commerce, nommer les événements en minuscules : variables, déclencheurs et balises GA4 pour un tunnel Qweekle.",
      chapo:
        "Qweekle pousse déjà une couche e-commerce : le travail consiste moins à créer des événements qu'à traduire ceux qui portent un nom périmé, et à ne surtout pas en inventer de nouveaux.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique Qweekle.",
        "Un identifiant de mesure Google Analytics 4 au format G-XXXXXXXXXX.",
        "Le suivi inter-domaines est configuré entre le domaine du parc et qweekle.com — voir le guide Google Ads.",
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
          note: "Une seule balise de socle, qui doit se déclencher sur le site du parc comme sur la boutique.",
        },
        {
          nom: "Event Google Analytics | View Item",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | View Item",
          champs: [
            { cle: "Nom de l'événement", valeur: "view_item" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
        },
        {
          nom: "Event Google Analytics | Add To Cart",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "Nom de l'événement", valeur: "add_to_cart" },
            { cle: "Données e-commerce", valeur: "Activé — couche de données" },
          ],
          note: "Activer la récupération des données e-commerce est ce qui transmet le tableau items et la valeur. Sans cela, l'événement remonte vide.",
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
          note: "C'est la traduction de checkout_progress. Ne transmettez jamais checkout_progress tel quel : GA4 le rangera parmi les événements personnalisés.",
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
          titre: "Renommer les événements pour les rendre lisibles",
          desc: "Il est tentant de nommer un événement « Add To Cart » avec majuscules et espaces, parce que c'est plus lisible dans l'interface. GA4 est sensible à la casse et attend des noms en minuscules avec des tirets bas. Un événement mal nommé n'alimente ni le rapport de monétisation ni l'entonnoir d'achat.",
        },
        {
          titre: "Transmettre checkout_progress tel quel",
          desc: "Il arrive alors dans GA4 comme événement personnalisé, sans jamais rejoindre l'entonnoir. Le renommer en add_payment_info coûte un champ et change tout.",
        },
        {
          titre: "Compter deux fois le début du paiement",
          desc: "Qweekle pousse begin_checkout et checkout_progress. Si les deux déclenchent un événement de début de paiement, l'entonnoir affiche deux fois plus d'entrées que la réalité. Choisissez-en un.",
        },
        {
          titre: "Oublier les données e-commerce sur les étapes intermédiaires",
          desc: "L'achat est presque toujours bien configuré. Le panier et le début de paiement, beaucoup moins : sans la récupération des données e-commerce, ni les produits ni la valeur ne remontent.",
        },
      ],
      verification: [
        "Dans l'aperçu Tag Manager, parcourir un achat de bout en bout depuis le site du parc jusqu'à la confirmation.",
        "Dans le DebugView de GA4, vérifier que les cinq événements apparaissent avec leurs noms normalisés.",
        "Vérifier que l'achat porte value, currency, transaction_id et le tableau items.",
        "Après 24 à 48 heures, contrôler que le rapport Monétisation affiche bien les achats et le chiffre d'affaires.",
        "Vérifier que qweekle.com n'apparaît pas dans le rapport des sources de trafic.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads avec Qweekle",
      description:
        "Ajouter qweekle.com au Conversion Linker, réserver l'ID de commande à l'achat : les balises Google Ads à créer sur un tunnel Qweekle, et les pièges à éviter.",
      chapo:
        "C'est ici que se joue l'essentiel. Le tunnel Qweekle vit sur un autre domaine que le site du parc : sans suivi inter-domaines correctement posé, Google Ads perd la trace du clic et crédite les ventes au mauvais canal.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique Qweekle.",
        "Un identifiant Google Ads au format AW-XXXXXXXXX.",
        "Les actions de conversion sont créées côté Google Ads, chacune avec son libellé de conversion.",
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
          note: "Alimente les conversions améliorées : email, téléphone et adresse détectés automatiquement dans les formulaires.",
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
              valeur: "monparc.fr, qweekle.com",
            },
          ],
          note: "La balise la plus importante de toute l'installation. Saisissez des domaines nus, sans https ni barre oblique finale : un format incorrect est accepté par l'interface mais ne décore pas les liens.",
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
          note: "Active les conversions améliorées. Sur un tunnel de réservation où le visiteur saisit son email, c'est le meilleur rattrapage de signal disponible.",
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Libellé de conversion", valeur: "votre libellé" },
            { cle: "Valeur de conversion", valeur: "{{ecommerce.value}}" },
            { cle: "Code devise", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
          note: "Ne renseignez surtout pas l'ID de commande ici : Google Ads s'en sert pour dédupliquer, et il fusionnerait cette conversion avec l'achat.",
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
            {
              cle: "ID de commande",
              valeur: "{{ecommerce.transaction_id}}",
            },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
          note: "C'est la seule balise qui doit porter l'ID de commande. Il évite de compter deux fois un achat en cas de rechargement de la page de confirmation.",
        },
      ],
      pieges: [
        {
          titre: "Le domaine du moteur absent de la liste",
          desc: "Après une migration depuis un autre moteur de réservation, l'ancien domaine reste dans la liste du Conversion Linker et qweekle.com n'y est jamais ajouté. Les conversions continuent d'être comptées, mais attribuées au moteur de réservation. C'est l'erreur la plus fréquente et la plus coûteuse.",
        },
        {
          titre: "Les domaines saisis avec le protocole",
          desc: "Écrire https://monparc.fr/ au lieu de monparc.fr. L'interface accepte, la décoration des liens ne se fait pas. Rien n'alerte.",
        },
        {
          titre: "L'ID de commande sur les étapes intermédiaires",
          desc: "Renseigné sur l'ajout au panier ou le début de paiement, il pousse Google Ads à fusionner les trois conversions. Symptôme : le nombre de conversions remontées est inférieur à celui de la caisse.",
        },
        {
          titre: "Deux conversions pour la même action",
          desc: "Une conversion sur le clic du bouton « Réserver » et une autre sur l'arrivée dans la boutique comptent deux fois le même visiteur. Gardez celle qui se déclenche à l'arrivée : elle est plus fiable que le clic.",
        },
      ],
      verification: [
        "Cliquer sur un lien vers la boutique depuis le site du parc et vérifier que le paramètre _gl est bien ajouté à l'URL.",
        "Dans l'aperçu Tag Manager, vérifier que le Conversion Linker se déclenche des deux côtés.",
        "Passer une commande test et contrôler dans Google Ads que la conversion remonte sous 24 à 48 heures, avec sa valeur.",
        "Vérifier dans le diagnostic Google Ads que les conversions améliorées sont bien reçues.",
        "Rapprocher le nombre de conversions Google Ads du nombre de réservations en caisse sur un mois complet.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur un tunnel Qweekle",
      description:
        "Le code fbq à copier, balise par balise, pour un tunnel Qweekle : socle, ViewContent, AddToCart, InitiateCheckout et Purchase avec identifiant d'événement.",
      chapo:
        "Meta n'a pas de modèle de balise natif dans Google Tag Manager : tout passe par des balises HTML personnalisées. C'est simple, mais c'est aussi là que les erreurs de valeur et de devise se glissent le plus souvent.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique Qweekle.",
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
        "Les variables de couche de données ecommerce.value, ecommerce.currency et ecommerce.transaction_id sont créées.",
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
          note: "Charge la bibliothèque et envoie la vue de page. Remplacez l'identifiant par le vôtre.",
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
          code: `<script>
  fbq('track', 'ViewContent', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  });
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
          note: "L'identifiant d'événement est ce qui permettra d'ajouter l'API de conversions plus tard sans compter chaque achat deux fois. Il ne coûte rien aujourd'hui et évite une reprise complète demain.",
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
          desc: "Sans eventID, l'ajout ultérieur de l'API de conversions double tous les achats. Le poser dès la première installation est gratuit.",
        },
        {
          titre: "Le pixel de socle absent de la boutique",
          desc: "Si la balise de socle ne se déclenche que sur le site du parc, les événements envoyés depuis la boutique n'ont pas de bibliothèque à appeler et disparaissent silencieusement.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que le pixel de socle se charge aussi sur les pages de la boutique.",
        "Contrôler dans le Gestionnaire d'événements que AddToCart, InitiateCheckout et Purchase arrivent avec leur valeur et leur devise.",
        "Vérifier que l'achat porte bien un identifiant d'événement.",
        "Comparer le nombre d'achats Meta et le nombre de transactions GA4 sur sept jours : un écart supérieur à 15 % signale une perte de signal.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur un tunnel Qweekle",
      description:
        "Le code ttq à copier pour un tunnel Qweekle. Attention au nom : TikTok attend CompletePayment, pas Purchase — une balise mal nommée ne remonte nulle part.",
      chapo:
        "TikTok fonctionne comme Meta : balises HTML personnalisées, mêmes déclencheurs, mais une nomenclature d'événements et des paramètres qui lui sont propres. Si Meta est déjà posé, comptez une demi-heure.",
      prerequis: [
        "Le conteneur Google Tag Manager du parc est installé sur le site et sur la boutique Qweekle.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
        "Les déclencheurs d'événements sont déjà créés pour Meta ou Google Analytics — ils se réutilisent tels quels.",
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
          note: "Attention au nom : TikTok n'utilise pas Purchase mais CompletePayment. Une balise nommée Purchase ne remonte dans aucun rapport.",
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
          desc: "TikTok attend CompletePayment là où Meta attend Purchase. Copier la balise Meta en changeant seulement ttq pour fbq produit un événement que TikTok ignore.",
        },
        {
          titre: "Oublier ttq.page() dans la balise de socle",
          desc: "Sans cet appel, la vue de page n'est jamais envoyée et les audiences de remarketing restent vides, même si les conversions remontent.",
        },
        {
          titre: "Charger le pixel deux fois",
          desc: "Si TikTok a d'abord été posé en dur dans le code du site puis rajouté dans Tag Manager, chaque événement part en double. Vérifiez avant d'ajouter.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier dans le Gestionnaire d'événements TikTok que AddToCart, InitiateCheckout et CompletePayment arrivent, avec valeur et devise.",
        "Contrôler que la vue de page remonte sur les pages du site comme sur celles de la boutique.",
        "Vérifier que chaque événement n'apparaît qu'une seule fois par action.",
      ],
    },
  ],
};
