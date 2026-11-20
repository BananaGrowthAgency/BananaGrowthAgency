import type { GuideOutil } from "@/lib/tracking/types";

/**
 * Guía BMI Leisure (versión en español).
 *
 * Traducción de src/lib/tracking/bmi-leisure.ts. Los nombres de etiquetas,
 * activadores y variables, los tipos de GTM, las claves, las condiciones y
 * el código se mantienen idénticos al original.
 */
export const BMI_LEISURE_ES: GuideOutil = {
  slug: "bmi-leisure",
  nom: "BMI Leisure",
  pilier: {
    titre: "Plan de etiquetado BMI Leisure: medir tus conversiones",
    description:
      "La capa de datos de BMI data de 2015: nada llega en el formato esperado. El trabajo de traducción, el plan de etiquetado y la trampa de los eventos por sede.",
    chapo:
      "BMI Leisure no documenta públicamente nada sobre medición, y su capa de datos se basa en una especificación que Google sustituyó en 2023. Todo se puede medir, pero nada llega en el formato esperado: esta guía es ante todo un trabajo de traducción. Nuestras observaciones proceden de una instalación real, que siguió en funcionamiento tras una migración.",
    architecture: {
      intro:
        "Dos particularidades estructuran toda la configuración, y ninguna de las dos aparece en la documentación comercial.",
      points: [
        "El embudo de reserva funciona en un subdominio del proveedor, con el formato booking.bmileisure.com. Es un dominio raíz distinto del del parque: el seguimiento entre dominios es obligatorio.",
        "El recorrido de compra se identifica por dos rutas de URL: la página del carrito y la página de confirmación del pedido.",
        "El contenedor de Google Tag Manager del parque se puede instalar en el embudo. Es lo que permite recuperar el conjunto pese a la falta de documentación.",
        "El evento de compra lleva el nombre del establecimiento como sufijo. En un grupo con varias sedes, esto obliga a crear un activador por establecimiento en lugar de uno solo: la configuración se multiplica por el número de parques.",
        "BMI expone un indicador de consentimiento de cookies en su capa de datos. Es el único elemento de cumplimiento normativo que hemos podido constatar, y se puede aprovechar para condicionar las etiquetas.",
      ],
    },
    dataLayer: {
      intro:
        "La capa de datos sigue la especificación Enhanced Ecommerce de Universal Analytics. Los nombres siguientes no corresponden a nada de lo que esperan las herramientas actuales.",
      events: [
        {
          nom: "purchase:nomdeletablissement",
          note: "compra, con el establecimiento como sufijo",
        },
      ],
      variables: [
        "ecommerce.purchase.actionField.id — ID del pedido",
        "ecommerce.purchase.actionField.revenue — ingresos",
        "ecommerce.purchase.actionField.tax — impuestos",
        "ecommerce.purchase.actionField.shipping — gastos",
        "ecommerce.currencyCode — moneda",
        "transactionProducts — detalle de los productos",
        "allowCookies — consentimiento de cookies",
      ],
      remarque:
        "Ninguno de estos nombres lo entienden Google Analytics 4, el píxel de Meta ni TikTok. Hay que crear una capa de variables de traducción y construir todo el etiquetado encima. Es un sobrecoste de implementación permanente: cada cambio en el embudo obliga a volver a comprobar la correspondencia. A diferencia de los otros tres motores del panel, el trabajo no consiste en redistribuir una capa limpia, sino en reconstruir una.",
    },
    parcours: {
      intro:
        "Vista general. El recorrido medible es más corto que en los demás motores: solo hemos detectado la compra como evento de capa de datos, y las etapas previas hay que reconstruirlas a partir de las URL.",
      etapes: [
        {
          etape: "Apertura del embudo",
          source: "Activador de página en el dominio del embudo",
          ga4: "begin_booking, personalizado",
          ads: "Conversión secundaria, sin valor",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Carrito",
          source: "Activador de página en la ruta del carrito",
          ga4: "add_to_cart, sin detalle de producto",
          ads: "Conversión secundaria, sin valor",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Reserva pagada",
          source: "purchase:nomdeletablissement",
          ga4: "purchase, tras la traducción",
          ads: "Conversión principal, con orderId",
          meta: "Purchase, con eventID",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Crear primero la capa de variables de traducción: es la que hace posible todo lo demás.",
      "Crear un activador de compra por establecimiento y luego un activador que los agrupe, para no duplicar cada etiqueta.",
      "Google Analytics 4 primero, como fuente de verdad.",
      "Después Google Ads, con el seguimiento entre dominios hacia el dominio del embudo.",
      "Meta y TikTok para terminar, con las mismas variables traducidas.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Instalar Google Analytics 4 en un embudo BMI Leisure",
      description:
        "Sin capa de traducción, ningún evento de BMI llega correctamente, y nada lo indica. Las variables que hay que crear y las etiquetas GA4 que conectar a ellas.",
      chapo:
        "Lo esencial del trabajo no está en las etiquetas, sino en las variables. Mientras no esté instalada la capa de traducción, ningún evento llegará correctamente, y nada señalará el error.",
      prerequis: [
        "El contenedor de Google Tag Manager del parque está instalado en la web y en el embudo de BMI.",
        "Un ID de medición de Google Analytics 4 con formato G-XXXXXXXXXX.",
        "La lista exacta de los nombres de establecimiento usados como sufijo del evento de compra.",
      ],
      variables: [
        {
          nom: "DLV - Transaction ID",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.id",
          note: "Traducción del ID del pedido.",
        },
        {
          nom: "DLV - Transaction Revenue",
          type: "Variable de couche de données",
          cle: "ecommerce.purchase.actionField.revenue",
          note: "Traducción del importe. Atención: este campo suele incluir los impuestos.",
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
          note: "El nombre difiere de la convención actual, que espera simplemente currency.",
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
          note: "La pieza clave. La matriz de productos de BMI no tiene ni la misma estructura ni los mismos nombres de campo que la que espera GA4: hay que transformarla.",
        },
        {
          nom: "DLV - Allow Cookies",
          type: "Variable de couche de données",
          cle: "allowCookies",
          note: "Sirve para condicionar la activación de las etiquetas al consentimiento.",
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
          note: "Un solo activador en lugar de uno por parque. Es lo que evita duplicar cada etiqueta tantas veces como establecimientos haya.",
        },
      ],
      balises: [
        {
          nom: "Google Analytics | Main Tag",
          type: "Balise Google",
          declencheur: "Inicialización — Todas las páginas",
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
          note: "Reconstruido a partir de la URL del carrito, a falta de un evento dedicado. Sin valor ni detalle de producto en esta etapa: es una limitación del motor, no un descuido.",
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase — Tous établissements",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Données e-commerce", valeur: "Desactivado" },
            {
              cle: "Paramètre transaction_id",
              valeur: "{{DLV - Transaction ID}}",
            },
            { cle: "Paramètre value", valeur: "{{DLV - Transaction Revenue}}" },
            { cle: "Paramètre currency", valeur: "{{DLV - Currency Code}}" },
            { cle: "Paramètre tax", valeur: "{{DLV - Transaction Tax}}" },
            { cle: "Paramètre items", valeur: "{{JS - Items GA4}}" },
          ],
          note: "Desactiva la recuperación automática de los datos de comercio electrónico: buscaría una estructura que BMI no proporciona. Todos los parámetros se rellenan a mano, a partir de las variables traducidas.",
        },
      ],
      pieges: [
        {
          titre: "Activar la recuperación automática de los datos de comercio electrónico",
          desc: "Es el reflejo natural, y aquí es un error. Google Analytics 4 busca entonces un objeto ecommerce estructurado a su manera, que BMI no genera. El evento llega vacío, sin error, y puedes pasarte semanas buscando por qué.",
        },
        {
          titre: "Crear una etiqueta por establecimiento",
          desc: "Como el evento lleva el parque como sufijo, la tentación es duplicar cada etiqueta otras tantas veces. Un activador por expresión regular resuelve el problema y divide el mantenimiento por el número de sedes.",
        },
        {
          titre: "Confundir ingresos con importe sin impuestos",
          desc: "El campo de ingresos suele incluir los impuestos, al contrario de lo que esperan algunos informes. Compruébalo en un pedido real antes de dejarlo fijo; si no, todas tus conciliaciones estarán desviadas en el tipo de IVA.",
        },
        {
          titre: "Olvidar convertir la matriz de productos",
          desc: "La estructura de productos de BMI no es la de GA4. Transmitida tal cual, se ignora: tendrás los ingresos, pero nunca el detalle de los artículos.",
        },
      ],
      verification: [
        "En la vista previa de Tag Manager, hacer un pedido de prueba y comprobar, una por una, que cada variable traducida está bien rellena.",
        "En el DebugView de GA4, comprobar que la compra llega con transaction_id, value, currency e items.",
        "Comparar el importe recibido con el de la caja de BMI, con o sin impuestos según tu elección.",
        "En un grupo con varias sedes, comprobar que el activador por expresión regular captura bien todos los establecimientos.",
        "Comprobar que el dominio del embudo no aparece en el informe de fuentes de tráfico.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Seguimiento de conversiones de Google Ads con BMI Leisure",
      description:
        "Las conversiones de BMI se conectan a las variables traducidas, nunca a ecommerce.value. Las etiquetas que crear y cómo no olvidarte de ningún establecimiento.",
      chapo:
        "Una vez instalada la capa de traducción para Google Analytics, Google Ads se conecta a ella sin esfuerzo adicional. Queda el seguimiento entre dominios, imprescindible porque el embudo vive en el dominio del proveedor.",
      prerequis: [
        "La capa de variables de traducción está creada: consulta la guía de Google Analytics.",
        "El contenedor de Google Tag Manager está instalado en la web y en el embudo.",
        "Un ID de Google Ads con formato AW-XXXXXXXXX.",
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
              valeur: "miparque.es, bmileisure.com",
            },
          ],
          note: "Dominios sin más, sin protocolo ni barra final.",
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
          note: "Especialmente útil aquí: como el recorrido previo está poco instrumentado, las conversiones mejoradas recuperan parte de la señal perdida.",
        },
        {
          nom: "Google Ads | Event Open Booking",
          type: "Suivi des conversions Google Ads",
          declencheur: "Page View | Open Booking",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "dejar vacío" },
            { cle: "ID de commande", valeur: "dejar vacío" },
          ],
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "Page View | Cart",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "dejar vacío" },
            { cle: "ID de commande", valeur: "dejar vacío" },
          ],
          note: "Sin valor: en esta etapa, BMI no expone el importe del carrito. Es una limitación que hay que aceptar.",
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
            { cle: "Conversions améliorées", valeur: "Activadas" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Conectar las conversiones a las variables equivocadas",
          desc: "Una conversión configurada sobre ecommerce.value o ecommerce.transaction_id, por costumbre heredada de otro motor, llega sistemáticamente con cero euros. BMI no usa ninguno de esos dos nombres.",
        },
        {
          titre: "Olvidar un establecimiento",
          desc: "Si creas un activador por parque en lugar de una expresión regular, la apertura de una nueva sede pasa desapercibida: sus ventas nunca llegan, y nadie se da cuenta hasta el balance.",
        },
        {
          titre: "Esperar un valor en las etapas previas",
          desc: "El carrito no expone ningún importe. Crear una conversión de carrito con valor produce un campo vacío, no un error. Mejor asumirla sin valor.",
        },
      ],
      verification: [
        "Hacer clic hacia el embudo desde la web del parque y comprobar que el parámetro _gl aparece en la URL.",
        "Hacer un pedido de prueba y comprobar que llega a Google Ads en 48 horas, con su valor y su ID de pedido.",
        "Comprobar en cada establecimiento que la compra dispara la conversión.",
        "Cotejar las conversiones de Google Ads con las reservas en caja durante un mes completo.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Instalar el píxel de Meta en un embudo BMI Leisure",
      description:
        "El código fbq que copiar para un embudo BMI Leisure. La compra es el único evento que lleva un valor: concentra toda la señal, así que conviene cuidarla bien.",
      chapo:
        "No hay integración nativa: todo pasa por etiquetas HTML personalizadas, conectadas a las variables traducidas. Como el recorrido medible es corto, la compra lleva lo esencial de la señal, razón de más para cuidarla.",
      prerequis: [
        "La capa de variables de traducción está creada: consulta la guía de Google Analytics.",
        "El contenedor de Google Tag Manager está instalado en la web y en el embudo.",
        "Un ID de píxel de Meta de 15 o 16 cifras.",
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
          note: "Sirve como ID de evento para la deduplicación.",
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
          declencheur: "Todas las páginas",
          note: "Debe dispararse tanto en la web del parque como en el embudo.",
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
          note: "Sin valor, porque en esta etapa no se expone ningún importe. Es una limitación del motor: más vale un evento sin valor que ningún evento, porque alimenta las audiencias de remarketing.",
          code: `<script>
  fbq('track', 'AddToCart');
</script>`,
        },
        {
          nom: "Event Meta Ads | Purchase",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase — Tous établissements",
          note: "El único evento con valor en BMI. El ID de evento prepara la API de conversiones, especialmente útil aquí, donde la señal del navegador ya es pobre.",
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
          titre: "Reutilizar una etiqueta escrita para otro motor",
          desc: "Las variables son distintas. Una etiqueta copiada de una instalación de Qweekle o Apex envía un valor vacío, y Meta registra compras de cero euros sin avisar.",
        },
        {
          titre: "El píxel base ausente del embudo",
          desc: "Si la etiqueta base solo se dispara en la web del parque, el evento de compra no tiene ninguna biblioteca a la que llamar. Desaparece en silencio, y es precisamente el evento que más cuenta.",
        },
        {
          titre: "Olvidar un establecimiento",
          desc: "Sin activador por expresión regular, cada nuevo parque que se abre es invisible para Meta.",
        },
      ],
      verification: [
        "Instalar la extensión Meta Pixel Helper y recorrer una compra completa.",
        "Comprobar que el píxel base se carga en las páginas del embudo.",
        "Comprobar en el Administrador de eventos que la compra llega con su valor, y no a cero.",
        "Comprobar que el ID de evento está presente.",
        "Probar en al menos dos establecimientos distintos.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Instalar el píxel de TikTok en un embudo BMI Leisure",
      description:
        "El código ttq que copiar para un embudo BMI Leisure, conectado a las variables traducidas. CompletePayment y no Purchase, y una prueba por cada establecimiento.",
      chapo:
        "El mismo enfoque que con Meta: etiquetas HTML personalizadas conectadas a las variables traducidas, y los mismos activadores. Si Meta ya está instalado, calcula media hora.",
      prerequis: [
        "La capa de variables de traducción está creada: consulta la guía de Google Analytics.",
        "El contenedor de Google Tag Manager está instalado en la web y en el embudo.",
        "Un ID de píxel de TikTok, disponible en el Administrador de eventos de TikTok.",
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
          declencheur: "Todas las páginas",
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
          note: "Sin valor, como en Meta: BMI no expone el importe del carrito.",
          code: `<script>
  ttq.track('AddToCart');
</script>`,
        },
        {
          nom: "Event TikTok Ads | Complete Payment",
          type: "HTML personnalisé",
          declencheur: "Event | Purchase — Tous établissements",
          note: "TikTok espera CompletePayment, no Purchase.",
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
          titre: "Usar el vocabulario de Meta",
          desc: "CompletePayment y no Purchase. Un evento mal nombrado no aparece en ningún informe de TikTok.",
        },
        {
          titre: "Olvidar ttq.page() en la etiqueta base",
          desc: "Sin esta llamada, las audiencias de remarketing se quedan vacías aunque las compras lleguen.",
        },
        {
          titre: "Reutilizar las variables de otro motor",
          desc: "BMI no expone ni ecommerce.value ni eventModel.value. Una etiqueta copiada envía un valor vacío.",
        },
      ],
      verification: [
        "Instalar la extensión TikTok Pixel Helper y recorrer una compra completa.",
        "Comprobar que la compra llega con su valor y su moneda en el Administrador de eventos de TikTok.",
        "Comprobar que la vista de página llega tanto en la web como en el embudo.",
        "Probar en al menos dos establecimientos distintos.",
      ],
    },
  ],
};
