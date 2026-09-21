import type { GuideOutil } from "./types";

export const ROLLER: GuideOutil = {
  slug: "roller",
  nom: "ROLLER",
  pilier: {
    titre: "Plan de taggage ROLLER : suivre ses conversions publicitaires",
    description:
      "ROLLER intègre nativement GA4, Meta et TikTok ; seul Google Ads demande Tag Manager. Couche de données, plan de taggage, et ce que change votre palier.",
    chapo:
      "ROLLER est le seul moteur du panel à intégrer nativement les outils de mesure : pour Google Analytics, Meta et TikTok, il suffit de coller un identifiant dans l'administration. Le travail se déplace ailleurs — sur Google Ads, qui n'a aucune intégration native, et sur le choix du mode d'intégration du tunnel.",
    architecture: {
      intro:
        "ROLLER propose plusieurs façons d'intégrer la réservation, et ce choix détermine toute la suite.",
      points: [
        "Le tunnel hébergé tourne par défaut sur un domaine appartenant à l'éditeur. Dans ce cas, le suivi inter-domaines est obligatoire.",
        "Une option de domaine personnalisé permet d'héberger le tunnel sur un sous-domaine du parc lui-même. Nous l'avons constatée en production, avec un domaine dédié par établissement. Elle fait disparaître le problème de changement de domaine — c'est la configuration à privilégier.",
        "Un mode widget embarqué existe également : la réservation s'affiche à l'intérieur des pages du site. C'est le mode le plus délicat à mesurer, car le contenu est isolé du reste de la page.",
        "Les intégrations de mesure sont réparties par palier d'abonnement : Google Analytics est disponible partout, les pixels publicitaires à partir du palier intermédiaire, et Google Tag Manager sur le palier supérieur ou en option payante.",
        "Vérifiez votre palier avant de planifier : sans accès à Tag Manager, le suivi Google Ads n'est pas réalisable.",
      ],
    },
    dataLayer: {
      intro:
        "ROLLER émet des événements au format Google Analytics 4. Lus depuis Google Tag Manager, leurs paramètres sont accessibles sous le préfixe eventModel.",
      events: [
        { nom: "view_item", note: "consultation d'un produit" },
        { nom: "add_to_cart", note: "ajout au panier" },
        { nom: "begin_checkout", note: "entrée dans le paiement" },
        { nom: "purchase", note: "réservation payée" },
        { nom: "refund", note: "remboursement — unique dans le panel" },
        {
          nom: "view_form_memberships",
          note: "consultation d'un formulaire d'abonnement",
        },
      ],
      variables: [
        "eventModel.value — montant de la transaction",
        "eventModel.currency — devise",
        "eventModel.transaction_id — identifiant de commande",
        "eventModel.items — détail des produits",
        "eventModel.venue — établissement concerné",
      ],
      remarque:
        "Deux singularités méritent d'être soulignées. ROLLER est le seul moteur du panel à exposer un événement de remboursement, ce qui permet de déduire les annulations du chiffre d'affaires mesuré au lieu de le surestimer en permanence. Et chaque événement porte l'établissement concerné : un groupe multi-sites peut piloter tous ses parcs depuis une seule configuration, là où les autres moteurs imposent un paramétrage par site.",
    },
    parcours: {
      intro:
        "Vue d'ensemble. Les colonnes Google Analytics, Meta et TikTok se remplissent nativement si votre palier le permet ; la colonne Google Ads demande toujours Tag Manager.",
      etapes: [
        {
          etape: "Consultation d'un produit",
          source: "view_item",
          ga4: "Natif",
          ads: "—",
          meta: "Natif — ViewContent",
          tiktok: "Natif — ViewContent",
        },
        {
          etape: "Ajout au panier",
          source: "add_to_cart",
          ga4: "Natif",
          ads: "Conversion secondaire, via Tag Manager",
          meta: "Natif — AddToCart",
          tiktok: "Natif — AddToCart",
        },
        {
          etape: "Début du paiement",
          source: "begin_checkout",
          ga4: "Natif",
          ads: "Conversion secondaire, via Tag Manager",
          meta: "Natif — InitiateCheckout",
          tiktok: "Natif — InitiateCheckout",
        },
        {
          etape: "Réservation payée",
          source: "purchase",
          ga4: "Natif",
          ads: "Conversion principale, via Tag Manager",
          meta: "Natif — Purchase",
          tiktok: "Natif — CompletePayment",
        },
        {
          etape: "Remboursement",
          source: "refund",
          ga4: "Natif",
          ads: "Ajustement de conversion, manuel",
          meta: "—",
          tiktok: "—",
        },
      ],
    },
    ordre: [
      "Vérifier le palier d'abonnement : il détermine ce qui est faisable nativement et ce qui demande Tag Manager.",
      "Choisir le mode d'intégration — domaine personnalisé de préférence, tunnel hébergé sinon, widget en dernier recours.",
      "Activer Google Analytics dans l'administration : c'est immédiat et cela devient la source de vérité.",
      "Activer les pixels Meta et TikTok si le palier le permet.",
      "Terminer par Google Ads dans Tag Manager, seule plateforme sans intégration native.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Installer Google Analytics 4 sur un tunnel ROLLER",
      description:
        "Un identifiant à coller dans l'administration ROLLER et le parcours remonte. La vraie question : quand passer quand même par Tag Manager, et pourquoi.",
      chapo:
        "C'est l'installation la plus rapide de tout le panel : un identifiant à coller dans l'administration, et le parcours complet remonte. La question intéressante n'est donc pas comment installer, mais quand passer quand même par Tag Manager.",
      prerequis: [
        "Un accès administrateur à l'espace de gestion ROLLER.",
        "Un identifiant de mesure Google Analytics 4 au format G-XXXXXXXXXX.",
        "Si le tunnel tourne sur le domaine de l'éditeur : un suivi inter-domaines configuré — voir le guide Google Ads.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
          note: "Uniquement si vous passez par Tag Manager.",
        },
        {
          nom: "eventModel.currency",
          type: "Variable de couche de données",
          cle: "eventModel.currency",
        },
        {
          nom: "eventModel.transaction_id",
          type: "Variable de couche de données",
          cle: "eventModel.transaction_id",
        },
        {
          nom: "eventModel.venue",
          type: "Variable de couche de données",
          cle: "eventModel.venue",
          note: "L'établissement concerné. À envoyer en dimension personnalisée sur un groupe multi-sites.",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
          note: "Uniquement si vous complétez l'intégration native par Tag Manager.",
        },
        {
          nom: "Event | Refund",
          type: "Événement personnalisé",
          condition: "refund",
        },
      ],
      balises: [
        {
          nom: "Intégration native — aucune balise à créer",
          type: "Paramétrage dans ROLLER",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur:
                "Administration › Tunnel de réservation › Paramètres › Suivi web",
            },
            { cle: "Champ à renseigner", valeur: "G-XXXXXXXXXX" },
          ],
          note: "Disponible sur tous les paliers. Une fois l'identifiant collé, ROLLER envoie de lui-même la vue de page, la consultation produit, l'ajout au panier, le retrait du panier, l'entrée en paiement, les étapes de paiement et l'achat.",
        },
        {
          nom: "Event Google Analytics | Venue",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Paramètre venue", valeur: "{{eventModel.venue}}" },
          ],
          note: "Optionnel, et réservé aux groupes multi-sites. Permet de segmenter les rapports par établissement, ce que l'intégration native ne fait pas seule. Demande un palier donnant accès à Tag Manager.",
        },
      ],
      pieges: [
        {
          titre: "Croire que l'intégration native dispense du suivi inter-domaines",
          desc: "Si le tunnel reste sur le domaine de l'éditeur, les événements remontent bien dans GA4 mais la session se casse au passage d'un domaine à l'autre. Les conversions sont alors créditées au moteur de réservation. L'intégration native mesure, elle n'attribue pas.",
        },
        {
          titre: "Doubler la mesure en ajoutant Tag Manager par-dessus",
          desc: "Si l'intégration native est active et qu'on recrée les mêmes événements dans Tag Manager, chaque achat est compté deux fois. Choisissez : soit le natif, soit Tag Manager, pas les deux sur le même événement.",
        },
        {
          titre: "Ignorer l'événement de remboursement",
          desc: "ROLLER est le seul à l'exposer. Ne pas le traiter revient à surestimer durablement son chiffre d'affaires mesuré, et donc à mal juger la rentabilité de ses campagnes.",
        },
        {
          titre: "Le mode widget",
          desc: "Si la réservation est embarquée dans les pages du site plutôt qu'hébergée, le contenu est isolé et l'intégration native ne se comporte pas de la même façon. C'est le seul cas où il faut prévoir un travail spécifique.",
        },
      ],
      verification: [
        "Dans le DebugView de GA4, parcourir un achat complet et vérifier que les événements remontent sans les avoir créés.",
        "Vérifier que l'achat porte value, currency, transaction_id et le tableau items.",
        "Contrôler que le domaine du tunnel n'apparaît pas dans le rapport des sources de trafic.",
        "Provoquer un remboursement test et vérifier qu'il remonte.",
        "Sur un groupe multi-sites, vérifier que l'établissement est bien distinguable dans les rapports.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Suivi des conversions Google Ads avec ROLLER",
      description:
        "La seule plateforme que ROLLER n'intègre pas nativement : Google Ads passe par Tag Manager, donc par un palier qui y donne accès. Balises et variables eventModel.",
      chapo:
        "C'est la seule plateforme que ROLLER n'intègre pas nativement. Tout passe donc par Google Tag Manager — ce qui suppose un palier d'abonnement qui y donne accès, ou l'option payante. À vérifier avant de promettre quoi que ce soit.",
      prerequis: [
        "Un palier ROLLER donnant accès à Google Tag Manager, ou l'option payante activée.",
        "Le conteneur Tag Manager renseigné dans l'administration ROLLER, et installé sur le site du parc.",
        "Un identifiant Google Ads au format AW-XXXXXXXXX.",
        "Les actions de conversion créées côté Google Ads, chacune avec son libellé.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
        },
        {
          nom: "eventModel.currency",
          type: "Variable de couche de données",
          cle: "eventModel.currency",
        },
        {
          nom: "eventModel.transaction_id",
          type: "Variable de couche de données",
          cle: "eventModel.transaction_id",
        },
        {
          nom: "Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          cle: "Mode automatique",
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
              valeur: "monparc.fr, le domaine du tunnel",
            },
          ],
          note: "Inutile si le tunnel tourne sur un sous-domaine du parc grâce à l'option de domaine personnalisé : dans ce cas, il n'y a pas de changement de domaine racine à gérer. C'est le principal intérêt de cette option.",
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
            { cle: "Valeur de conversion", valeur: "{{eventModel.value}}" },
            { cle: "Code devise", valeur: "{{eventModel.currency}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
        },
        {
          nom: "Google Ads | Event Begin Checkout",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Begin Checkout",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{eventModel.value}}" },
            { cle: "Code devise", valeur: "{{eventModel.currency}}" },
            { cle: "ID de commande", valeur: "laisser vide" },
          ],
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{eventModel.value}}" },
            { cle: "Code devise", valeur: "{{eventModel.currency}}" },
            { cle: "ID de commande", valeur: "{{eventModel.transaction_id}}" },
            { cle: "Conversions améliorées", valeur: "Activées" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Découvrir le palier trop tard",
          desc: "Tag Manager n'est pas disponible sur tous les paliers ROLLER. Un exploitant qui a signé sur une offre d'entrée et qui investit en publicité découvre parfois après coup qu'il ne peut pas mesurer ses conversions Google Ads. La question se pose avant la signature.",
        },
        {
          titre: "Utiliser les noms de variables des autres moteurs",
          desc: "ROLLER expose ses paramètres sous le préfixe eventModel, pas ecommerce. Une variable créée sur ecommerce.value reste vide, sans message d'erreur, et la conversion remonte à zéro euro.",
        },
        {
          titre: "Configurer un suivi inter-domaines devenu inutile",
          desc: "Si le tunnel est passé sur un sous-domaine du parc, il n'y a plus de changement de domaine racine. Laisser une configuration héritée n'est pas nocif, mais elle masque la réalité lors d'un audit.",
        },
        {
          titre: "Oublier de déclarer les remboursements",
          desc: "Google Ads accepte des ajustements de conversion. ROLLER exposant l'événement de remboursement, il est possible de les remonter — peu d'annonceurs le font, et leur rentabilité affichée est durablement fausse.",
        },
      ],
      verification: [
        "Vérifier que le conteneur Tag Manager est bien renseigné dans l'administration ROLLER et qu'il se charge sur le tunnel.",
        "Dans l'aperçu Tag Manager, parcourir un achat et vérifier que les variables eventModel sont remplies.",
        "Passer une commande test et contrôler la remontée dans Google Ads sous 48 heures, avec sa valeur.",
        "Si le tunnel est sur le domaine de l'éditeur, vérifier que le paramètre _gl est ajouté au passage.",
        "Rapprocher les conversions Google Ads des réservations sur un mois complet.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Installer le pixel Meta sur un tunnel ROLLER",
      description:
        "Le pixel Meta s'active en collant un identifiant dans ROLLER. Le piège : cumuler le natif et Tag Manager double chaque achat, sans qu'aucun outil ne le signale.",
      chapo:
        "Comme pour Google Analytics, ROLLER intègre le pixel Meta nativement — à partir du palier intermédiaire. Un identifiant à coller, et le parcours remonte. Le passage par Tag Manager ne se justifie que pour des besoins précis.",
      prerequis: [
        "Un palier ROLLER donnant accès aux pixels publicitaires.",
        "Un identifiant de pixel Meta à 15 ou 16 chiffres.",
        "Pour la voie Tag Manager : un palier donnant accès à Tag Manager, ou l'option payante.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
          note: "Uniquement pour la voie Tag Manager.",
        },
        {
          nom: "eventModel.currency",
          type: "Variable de couche de données",
          cle: "eventModel.currency",
        },
        {
          nom: "eventModel.transaction_id",
          type: "Variable de couche de données",
          cle: "eventModel.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
          note: "Uniquement si vous remplacez l'intégration native par Tag Manager.",
        },
      ],
      balises: [
        {
          nom: "Intégration native — aucune balise à créer",
          type: "Paramétrage dans ROLLER",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur:
                "Administration › Tunnel de réservation › Paramètres › Suivi web",
            },
            { cle: "Champ à renseigner", valeur: "Votre identifiant de pixel" },
          ],
          note: "Disponible à partir du palier intermédiaire. ROLLER envoie alors la vue de page, la consultation produit, l'ajout au panier, l'entrée en paiement et l'achat, sans code à écrire.",
        },
        {
          nom: "Meta Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Toutes les pages",
          note: "Voie Tag Manager, à n'utiliser que si l'intégration native est désactivée. Les deux en parallèle doublent tous les événements.",
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
          nom: "Event Meta Ads | Purchase",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase",
          note: "La seule raison valable de préférer Tag Manager au natif : poser un identifiant d'événement, indispensable pour brancher l'API de conversions sans compter deux fois chaque achat.",
          code: `<script>
  fbq('track', 'Purchase', {
    value: {{eventModel.value}},
    currency: {{eventModel.currency}}
  }, {
    eventID: {{eventModel.transaction_id}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Cumuler l'intégration native et Tag Manager",
          desc: "C'est l'erreur spécifique à ROLLER. Si le pixel est renseigné dans l'administration et recréé dans Tag Manager, chaque achat part deux fois. Meta ne signale rien, et le coût par achat affiché devient deux fois trop bas.",
        },
        {
          titre: "Attendre un identifiant d'événement de l'intégration native",
          desc: "L'intégration native n'expose pas de champ pour l'identifiant d'événement. Si vous prévoyez l'API de conversions, il faut passer par Tag Manager — donc par un palier supérieur. À anticiper.",
        },
        {
          titre: "Utiliser le préfixe des autres moteurs",
          desc: "Sur la voie Tag Manager, les paramètres sont exposés sous eventModel. Une variable créée sur ecommerce.value reste vide et l'achat remonte à zéro euro.",
        },
      ],
      verification: [
        "Installer l'extension Meta Pixel Helper et parcourir un achat complet.",
        "Vérifier que chaque événement n'apparaît qu'une seule fois — c'est le contrôle prioritaire sur ROLLER.",
        "Contrôler dans le Gestionnaire d'événements que l'achat arrive avec valeur et devise.",
        "Si vous avez choisi Tag Manager, vérifier la présence de l'identifiant d'événement.",
        "Comparer les achats Meta et les transactions GA4 sur sept jours.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Installer le pixel TikTok sur un tunnel ROLLER",
      description:
        "ROLLER est le seul moteur du panel à proposer TikTok sans écrire une ligne de code. Ce que couvre l'intégration native, et quand basculer sur Tag Manager.",
      chapo:
        "Même logique que Meta : intégration native à partir du palier intermédiaire, un identifiant à coller. ROLLER est le seul moteur du panel à proposer TikTok sans écrire une ligne de code.",
      prerequis: [
        "Un palier ROLLER donnant accès aux pixels publicitaires.",
        "Un identifiant de pixel TikTok, disponible dans le Gestionnaire d'événements TikTok.",
        "Pour la voie Tag Manager : un palier donnant accès à Tag Manager, ou l'option payante.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
          note: "Uniquement pour la voie Tag Manager.",
        },
        {
          nom: "eventModel.currency",
          type: "Variable de couche de données",
          cle: "eventModel.currency",
        },
        {
          nom: "eventModel.transaction_id",
          type: "Variable de couche de données",
          cle: "eventModel.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
          note: "Uniquement si vous remplacez l'intégration native par Tag Manager.",
        },
      ],
      balises: [
        {
          nom: "Intégration native — aucune balise à créer",
          type: "Paramétrage dans ROLLER",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur:
                "Administration › Tunnel de réservation › Paramètres › Suivi web",
            },
            { cle: "Champ à renseigner", valeur: "Votre identifiant de pixel" },
          ],
          note: "Disponible à partir du palier intermédiaire, au même endroit que Google Analytics et Meta.",
        },
        {
          nom: "TikTok Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Toutes les pages",
          note: "Voie Tag Manager, à n'utiliser que si l'intégration native est désactivée.",
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
          nom: "Event TikTok Ads | Complete Payment",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase",
          note: "TikTok attend CompletePayment, pas Purchase. Ne recopiez pas la balise Meta en changeant seulement le préfixe.",
          code: `<script>
  ttq.track('CompletePayment', {
    value: {{eventModel.value}},
    currency: {{eventModel.currency}}
  }, {
    event_id: {{eventModel.transaction_id}}
  });
</script>`,
        },
      ],
      pieges: [
        {
          titre: "Cumuler l'intégration native et Tag Manager",
          desc: "Même piège que sur Meta, avec la même conséquence : chaque achat compté deux fois, et un coût par acquisition apparent deux fois trop bas.",
        },
        {
          titre: "Utiliser le vocabulaire de Meta",
          desc: "Sur la voie Tag Manager, TikTok attend CompletePayment. Un événement nommé Purchase ne remonte dans aucun rapport.",
        },
        {
          titre: "Compter sur TikTok au palier d'entrée",
          desc: "Les pixels publicitaires ne sont pas disponibles sur le premier palier. Un parc qui prévoit d'investir sur TikTok doit le savoir avant de choisir son abonnement.",
        },
      ],
      verification: [
        "Installer l'extension TikTok Pixel Helper et parcourir un achat complet.",
        "Vérifier que chaque événement n'apparaît qu'une seule fois.",
        "Contrôler dans le Gestionnaire d'événements TikTok que l'achat arrive avec valeur et devise.",
        "Vérifier que la vue de page remonte sur le site comme sur le tunnel.",
      ],
    },
  ],
};
