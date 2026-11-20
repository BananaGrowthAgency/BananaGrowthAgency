import type { GuideOutil } from "@/lib/tracking/types";

/**
 * Guía ROLLER (versión en español).
 *
 * Traducción de src/lib/tracking/roller.ts. Los nombres de etiquetas,
 * activadores y variables, los tipos de GTM, las condiciones y el código se
 * mantienen idénticos al original.
 */
export const ROLLER_ES: GuideOutil = {
  slug: "roller",
  nom: "ROLLER",
  pilier: {
    titre: "Plan de etiquetado ROLLER: medir tus conversiones",
    description:
      "ROLLER integra de forma nativa GA4, Meta y TikTok; solo Google Ads requiere Tag Manager. Capa de datos, plan de etiquetado y qué cambia según tu plan.",
    chapo:
      "ROLLER es el único motor del panel que integra de forma nativa las herramientas de medición: para Google Analytics, Meta y TikTok basta con pegar un identificador en la administración. El trabajo se desplaza a otro sitio: a Google Ads, que no tiene ninguna integración nativa, y a la elección del modo de integración del embudo.",
    architecture: {
      intro:
        "ROLLER ofrece varias formas de integrar la reserva, y esa elección determina todo lo demás.",
      points: [
        "El embudo alojado funciona por defecto en un dominio propiedad del proveedor. En ese caso, el seguimiento entre dominios es obligatorio.",
        "Una opción de dominio personalizado permite alojar el embudo en un subdominio del propio parque. La hemos visto en producción, con un dominio dedicado por establecimiento. Elimina el problema del cambio de dominio: es la configuración preferible.",
        "También existe un modo widget integrado: la reserva se muestra dentro de las páginas de la web. Es el modo más delicado de medir, porque el contenido está aislado del resto de la página.",
        "Las integraciones de medición se reparten por plan de suscripción: Google Analytics está disponible en todos, los píxeles publicitarios a partir del plan intermedio y Google Tag Manager en el plan superior o como opción de pago.",
        "Comprueba tu plan antes de planificar: sin acceso a Tag Manager, el seguimiento de Google Ads no es viable.",
      ],
    },
    dataLayer: {
      intro:
        "ROLLER emite eventos con formato Google Analytics 4. Leídos desde Google Tag Manager, sus parámetros están accesibles bajo el prefijo eventModel.",
      events: [
        { nom: "view_item", note: "consulta de un producto" },
        { nom: "add_to_cart", note: "añadido al carrito" },
        { nom: "begin_checkout", note: "entrada en el pago" },
        { nom: "purchase", note: "reserva pagada" },
        { nom: "refund", note: "reembolso: único en el panel" },
        {
          nom: "view_form_memberships",
          note: "consulta de un formulario de abono",
        },
      ],
      variables: [
        "eventModel.value — importe de la transacción",
        "eventModel.currency — moneda",
        "eventModel.transaction_id — ID del pedido",
        "eventModel.items — detalle de los productos",
        "eventModel.venue — establecimiento correspondiente",
      ],
      remarque:
        "Hay dos singularidades que merece la pena destacar. ROLLER es el único motor del panel que expone un evento de reembolso, lo que permite descontar las cancelaciones de los ingresos medidos en lugar de sobrestimarlos permanentemente. Y cada evento lleva el establecimiento correspondiente: un grupo con varias sedes puede gestionar todos sus parques desde una sola configuración, mientras que los demás motores obligan a configurar cada sitio por separado.",
    },
    parcours: {
      intro:
        "Vista general. Las columnas de Google Analytics, Meta y TikTok se rellenan de forma nativa si tu plan lo permite; la columna de Google Ads siempre requiere Tag Manager.",
      etapes: [
        {
          etape: "Consulta de un producto",
          source: "view_item",
          ga4: "Nativo",
          ads: "—",
          meta: "Nativo — ViewContent",
          tiktok: "Nativo — ViewContent",
        },
        {
          etape: "Añadido al carrito",
          source: "add_to_cart",
          ga4: "Nativo",
          ads: "Conversión secundaria, vía Tag Manager",
          meta: "Nativo — AddToCart",
          tiktok: "Nativo — AddToCart",
        },
        {
          etape: "Inicio del pago",
          source: "begin_checkout",
          ga4: "Nativo",
          ads: "Conversión secundaria, vía Tag Manager",
          meta: "Nativo — InitiateCheckout",
          tiktok: "Nativo — InitiateCheckout",
        },
        {
          etape: "Reserva pagada",
          source: "purchase",
          ga4: "Nativo",
          ads: "Conversión principal, vía Tag Manager",
          meta: "Nativo — Purchase",
          tiktok: "Nativo — CompletePayment",
        },
        {
          etape: "Reembolso",
          source: "refund",
          ga4: "Nativo",
          ads: "Ajuste de conversión, manual",
          meta: "—",
          tiktok: "—",
        },
      ],
    },
    ordre: [
      "Comprobar el plan de suscripción: determina qué se puede hacer de forma nativa y qué requiere Tag Manager.",
      "Elegir el modo de integración: dominio personalizado preferiblemente, embudo alojado si no, widget como último recurso.",
      "Activar Google Analytics en la administración: es inmediato y se convierte en la fuente de verdad.",
      "Activar los píxeles de Meta y TikTok si el plan lo permite.",
      "Terminar con Google Ads en Tag Manager, la única plataforma sin integración nativa.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Instalar Google Analytics 4 en un embudo ROLLER",
      description:
        "Un identificador que pegar en la administración de ROLLER y el recorrido llega. La verdadera pregunta: cuándo pasar igualmente por Tag Manager, y por qué.",
      chapo:
        "Es la instalación más rápida de todo el panel: un identificador que pegar en la administración y el recorrido completo llega. Así que la pregunta interesante no es cómo instalarlo, sino cuándo pasar igualmente por Tag Manager.",
      prerequis: [
        "Acceso de administrador al área de gestión de ROLLER.",
        "Un ID de medición de Google Analytics 4 con formato G-XXXXXXXXXX.",
        "Si el embudo funciona en el dominio del proveedor: un seguimiento entre dominios configurado; consulta la guía de Google Ads.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
          note: "Solo si pasas por Tag Manager.",
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
          note: "El establecimiento correspondiente. Envíalo como dimensión personalizada en un grupo con varias sedes.",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
          note: "Solo si completas la integración nativa con Tag Manager.",
        },
        {
          nom: "Event | Refund",
          type: "Événement personnalisé",
          condition: "refund",
        },
      ],
      balises: [
        {
          nom: "Integración nativa — ninguna etiqueta que crear",
          type: "Configuración en ROLLER",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur:
                "Administración › Embudo de reserva › Parámetros › Seguimiento web",
            },
            { cle: "Champ à renseigner", valeur: "G-XXXXXXXXXX" },
          ],
          note: "Disponible en todos los planes. Una vez pegado el identificador, ROLLER envía por sí solo la vista de página, la consulta de producto, el añadido al carrito, la retirada del carrito, la entrada en el pago, los pasos del pago y la compra.",
        },
        {
          nom: "Event Google Analytics | Venue",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Paramètre venue", valeur: "{{eventModel.venue}}" },
          ],
          note: "Opcional, y reservado a los grupos con varias sedes. Permite segmentar los informes por establecimiento, algo que la integración nativa no hace por sí sola. Requiere un plan con acceso a Tag Manager.",
        },
      ],
      pieges: [
        {
          titre: "Creer que la integración nativa exime del seguimiento entre dominios",
          desc: "Si el embudo se queda en el dominio del proveedor, los eventos llegan bien a GA4, pero la sesión se rompe al pasar de un dominio a otro. Las conversiones se atribuyen entonces al motor de reservas. La integración nativa mide, no atribuye.",
        },
        {
          titre: "Duplicar la medición añadiendo Tag Manager encima",
          desc: "Si la integración nativa está activa y se vuelven a crear los mismos eventos en Tag Manager, cada compra se cuenta dos veces. Elige: o lo nativo o Tag Manager, no ambos en el mismo evento.",
        },
        {
          titre: "Ignorar el evento de reembolso",
          desc: "ROLLER es el único que lo expone. No tratarlo equivale a sobrestimar de forma duradera los ingresos medidos y, por tanto, a juzgar mal la rentabilidad de tus campañas.",
        },
        {
          titre: "El modo widget",
          desc: "Si la reserva está integrada en las páginas de la web en lugar de alojada, el contenido queda aislado y la integración nativa no se comporta igual. Es el único caso en el que hay que prever un trabajo específico.",
        },
      ],
      verification: [
        "En el DebugView de GA4, recorrer una compra completa y comprobar que los eventos llegan sin haberlos creado.",
        "Comprobar que la compra lleva value, currency, transaction_id y la matriz items.",
        "Comprobar que el dominio del embudo no aparece en el informe de fuentes de tráfico.",
        "Provocar un reembolso de prueba y comprobar que llega.",
        "En un grupo con varias sedes, comprobar que el establecimiento se distingue bien en los informes.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Seguimiento de conversiones de Google Ads con ROLLER",
      description:
        "La única plataforma que ROLLER no integra de forma nativa: Google Ads pasa por Tag Manager, y por tanto por un plan que dé acceso. Etiquetas y variables.",
      chapo:
        "Es la única plataforma que ROLLER no integra de forma nativa. Todo pasa, pues, por Google Tag Manager, lo que supone un plan de suscripción que dé acceso a él, o la opción de pago. Compruébalo antes de prometer nada.",
      prerequis: [
        "Un plan de ROLLER con acceso a Google Tag Manager, o la opción de pago activada.",
        "El contenedor de Tag Manager introducido en la administración de ROLLER e instalado en la web del parque.",
        "Un ID de Google Ads con formato AW-XXXXXXXXX.",
        "Las acciones de conversión creadas en Google Ads, cada una con su etiqueta.",
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
          declencheur: "Inicialización — Todas las páginas",
          champs: [{ cle: "ID de la balise", valeur: "AW-XXXXXXXXX" }],
        },
        {
          nom: "Google Ads | Conversion Linker",
          type: "Association de conversion",
          declencheur: "Inicialización — Todas las páginas",
          champs: [
            { cle: "Activer le suivi inter-domaines", valeur: "Sí" },
            { cle: "Accepter les paramètres entrants", valeur: "Sí" },
            {
              cle: "Domaines à associer",
              valeur: "miparque.es, el dominio del embudo",
            },
          ],
          note: "Innecesario si el embudo funciona en un subdominio del parque gracias a la opción de dominio personalizado: en ese caso no hay cambio de dominio raíz que gestionar. Es la principal ventaja de esta opción.",
        },
        {
          nom: "Google Ads | Automatic Data Collection",
          type: "Données fournies par l'utilisateur — Google Ads",
          declencheur: "Todas las páginas",
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
            { cle: "ID de commande", valeur: "dejar vacío" },
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
            { cle: "ID de commande", valeur: "dejar vacío" },
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
            { cle: "Conversions améliorées", valeur: "Activadas" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Descubrir el plan demasiado tarde",
          desc: "Tag Manager no está disponible en todos los planes de ROLLER. Un operador que ha firmado una oferta de entrada e invierte en publicidad a veces descubre a posteriori que no puede medir sus conversiones de Google Ads. La pregunta debe hacerse antes de firmar.",
        },
        {
          titre: "Usar los nombres de variables de otros motores",
          desc: "ROLLER expone sus parámetros bajo el prefijo eventModel, no ecommerce. Una variable creada sobre ecommerce.value se queda vacía, sin mensaje de error, y la conversión llega con cero euros.",
        },
        {
          titre: "Configurar un seguimiento entre dominios que ya no hace falta",
          desc: "Si el embudo ha pasado a un subdominio del parque, ya no hay cambio de dominio raíz. Dejar una configuración heredada no es perjudicial, pero oculta la realidad durante una auditoría.",
        },
        {
          titre: "Olvidar declarar los reembolsos",
          desc: "Google Ads acepta ajustes de conversión. Como ROLLER expone el evento de reembolso, es posible enviarlos; pocos anunciantes lo hacen, y su rentabilidad mostrada es falsa de forma duradera.",
        },
      ],
      verification: [
        "Comprobar que el contenedor de Tag Manager está bien introducido en la administración de ROLLER y que se carga en el embudo.",
        "En la vista previa de Tag Manager, recorrer una compra y comprobar que las variables eventModel están rellenas.",
        "Hacer un pedido de prueba y comprobar que llega a Google Ads en 48 horas, con su valor.",
        "Si el embudo está en el dominio del proveedor, comprobar que el parámetro _gl se añade al pasar.",
        "Cotejar las conversiones de Google Ads con las reservas durante un mes completo.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Instalar el píxel de Meta en un embudo ROLLER",
      description:
        "El píxel de Meta se activa pegando un ID en ROLLER. La trampa: combinar lo nativo y Tag Manager duplica cada compra sin que ninguna herramienta avise.",
      chapo:
        "Como con Google Analytics, ROLLER integra el píxel de Meta de forma nativa, a partir del plan intermedio. Un identificador que pegar, y el recorrido llega. Pasar por Tag Manager solo se justifica para necesidades concretas.",
      prerequis: [
        "Un plan de ROLLER con acceso a los píxeles publicitarios.",
        "Un ID de píxel de Meta de 15 o 16 cifras.",
        "Para la vía Tag Manager: un plan con acceso a Tag Manager, o la opción de pago.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
          note: "Solo para la vía Tag Manager.",
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
          note: "Solo si sustituyes la integración nativa por Tag Manager.",
        },
      ],
      balises: [
        {
          nom: "Integración nativa — ninguna etiqueta que crear",
          type: "Configuración en ROLLER",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur:
                "Administración › Embudo de reserva › Parámetros › Seguimiento web",
            },
            { cle: "Champ à renseigner", valeur: "Tu ID de píxel" },
          ],
          note: "Disponible a partir del plan intermedio. ROLLER envía entonces la vista de página, la consulta de producto, el añadido al carrito, la entrada en el pago y la compra, sin escribir código.",
        },
        {
          nom: "Meta Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Todas las páginas",
          note: "Vía Tag Manager, para usar solo si la integración nativa está desactivada. Las dos a la vez duplican todos los eventos.",
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
          note: "La única razón válida para preferir Tag Manager a lo nativo: añadir un ID de evento, imprescindible para conectar la API de conversiones sin contar dos veces cada compra.",
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
          titre: "Combinar la integración nativa y Tag Manager",
          desc: "Es el error específico de ROLLER. Si el píxel está introducido en la administración y se vuelve a crear en Tag Manager, cada compra se envía dos veces. Meta no avisa de nada, y el coste por compra mostrado resulta la mitad de lo real.",
        },
        {
          titre: "Esperar un ID de evento de la integración nativa",
          desc: "La integración nativa no ofrece ningún campo para el ID de evento. Si tienes previsto usar la API de conversiones, hay que pasar por Tag Manager y, por tanto, por un plan superior. Conviene anticiparlo.",
        },
        {
          titre: "Usar el prefijo de otros motores",
          desc: "En la vía Tag Manager, los parámetros se exponen bajo eventModel. Una variable creada sobre ecommerce.value se queda vacía y la compra llega con cero euros.",
        },
      ],
      verification: [
        "Instalar la extensión Meta Pixel Helper y recorrer una compra completa.",
        "Comprobar que cada evento aparece una sola vez: es la comprobación prioritaria en ROLLER.",
        "Comprobar en el Administrador de eventos que la compra llega con valor y moneda.",
        "Si has elegido Tag Manager, comprobar que el ID de evento está presente.",
        "Comparar las compras de Meta y las transacciones de GA4 durante siete días.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Instalar el píxel de TikTok en un embudo ROLLER",
      description:
        "ROLLER es el único motor del panel que ofrece TikTok sin escribir una línea de código. Qué cubre la integración nativa y cuándo conviene pasar a Tag Manager.",
      chapo:
        "La misma lógica que con Meta: integración nativa a partir del plan intermedio, un identificador que pegar. ROLLER es el único motor del panel que ofrece TikTok sin escribir una línea de código.",
      prerequis: [
        "Un plan de ROLLER con acceso a los píxeles publicitarios.",
        "Un ID de píxel de TikTok, disponible en el Administrador de eventos de TikTok.",
        "Para la vía Tag Manager: un plan con acceso a Tag Manager, o la opción de pago.",
      ],
      variables: [
        {
          nom: "eventModel.value",
          type: "Variable de couche de données",
          cle: "eventModel.value",
          note: "Solo para la vía Tag Manager.",
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
          note: "Solo si sustituyes la integración nativa por Tag Manager.",
        },
      ],
      balises: [
        {
          nom: "Integración nativa — ninguna etiqueta que crear",
          type: "Configuración en ROLLER",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur:
                "Administración › Embudo de reserva › Parámetros › Seguimiento web",
            },
            { cle: "Champ à renseigner", valeur: "Tu ID de píxel" },
          ],
          note: "Disponible a partir del plan intermedio, en el mismo lugar que Google Analytics y Meta.",
        },
        {
          nom: "TikTok Ads | Main Tag",
          type: "HTML personnalisé",
          declencheur: "Todas las páginas",
          note: "Vía Tag Manager, para usar solo si la integración nativa está desactivada.",
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
          note: "TikTok espera CompletePayment, no Purchase. No copies la etiqueta de Meta cambiando solo el prefijo.",
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
          titre: "Combinar la integración nativa y Tag Manager",
          desc: "La misma trampa que en Meta, con la misma consecuencia: cada compra contada dos veces y un coste por adquisición aparente que resulta la mitad de lo real.",
        },
        {
          titre: "Usar el vocabulario de Meta",
          desc: "En la vía Tag Manager, TikTok espera CompletePayment. Un evento llamado Purchase no aparece en ningún informe.",
        },
        {
          titre: "Contar con TikTok en el plan de entrada",
          desc: "Los píxeles publicitarios no están disponibles en el primer plan. Un parque que tenga previsto invertir en TikTok debe saberlo antes de elegir su suscripción.",
        },
      ],
      verification: [
        "Instalar la extensión TikTok Pixel Helper y recorrer una compra completa.",
        "Comprobar que cada evento aparece una sola vez.",
        "Comprobar en el Administrador de eventos de TikTok que la compra llega con valor y moneda.",
        "Comprobar que la vista de página llega tanto en la web como en el embudo.",
      ],
    },
  ],
};
