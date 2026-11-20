import type { GuideOutil } from "@/lib/tracking/types";

/**
 * Guía Apex Timing (versión en español).
 *
 * Traducción de src/lib/tracking/apex-timing.ts. Los nombres de etiquetas,
 * activadores y variables, los tipos, las condiciones y el código se
 * mantienen idénticos al original: son lo que el lector escribe en GTM.
 */
export const APEX_TIMING_ES: GuideOutil = {
  slug: "apex-timing",
  nom: "Apex Timing",
  pilier: {
    titre: "Plan de etiquetado Apex Timing: medir tus conversiones",
    description:
      "Apex Timing documenta ocho eventos GA4 y una función de consentimiento, pero sirve su embudo en marcos integrados. Capa de datos y plan de etiquetado.",
    chapo:
      "Apex Timing es uno de los pocos motores que documenta públicamente su plan de etiquetado, y esa documentación es buena: ocho eventos con nombres conformes a la especificación actual y una función dedicada a transmitir el consentimiento. La dificultad es de arquitectura: el embudo se muestra en marcos integrados servidos desde el dominio del proveedor.",
    architecture: {
      intro:
        "Es la arquitectura de Apex Timing la que dicta toda la configuración, y no es la que uno supone a primera vista.",
      points: [
        "Las páginas de reserva no son páginas de la web del parque: son marcos integrados, servidos desde www.apex-timing.com, que se insertan en tus propias páginas. Cada centro se identifica mediante un parámetro center en la dirección.",
        "Ocho direcciones componen el recorrido: venta de entradas (ticketing.php), reservas (sessions_booking.php), eventos (events_booking.php), carrito (cart_contents.php), validación (cart_payment.php), inicio del pago (functions/cart_do_payment.php), agradecimiento (cart_paid.php) e inicio de sesión (cart_login.php).",
        "El dominio se comparte entre todos los centros clientes del proveedor: las cookies de medición se instalan, por tanto, en un dominio raíz compartido.",
        "Los identificadores se introducen directamente en el área de cliente, sin desarrollo: GoKarts y luego Parámetros, donde tres campos esperan respectivamente Google Analytics, Google Tag Manager y el píxel de Meta.",
        "Como el contenido está aislado en un marco, la comunicación entre la página del parque y el embudo pasa por funciones que proporciona el proveedor, a las que hay que llamar después de que cargue el marco.",
        "Apex Timing indica que no ofrece soporte para la configuración de Tag Manager y recomienda recurrir a un especialista.",
      ],
    },
    dataLayer: {
      intro:
        "Apex Timing documenta su capa de datos. Ocho eventos cubren el recorrido, desde la vista del listado hasta la compra.",
      events: [
        {
          nom: "view_item_list",
          note: "visualización de la venta de entradas, las reservas o los eventos",
        },
        { nom: "view_item", note: "clic en «reservar» un producto" },
        { nom: "add_to_cart", note: "añadido al carrito o aumento de cantidad" },
        {
          nom: "edit_in_cart",
          note: "vuelta a la ficha del producto y validación: propio de Apex",
        },
        { nom: "view_cart", note: "carga de la página del carrito" },
        {
          nom: "remove_from_cart",
          note: "reducción de cantidad o eliminación",
        },
        { nom: "begin_checkout", note: "inicio del pago" },
        { nom: "purchase", note: "carga de la página de agradecimiento" },
      ],
      variables: [
        "ecommerce.items — detalle del producto: item_name, item_id, item_category, item_category2, price, discount, quantity",
        "ecommerce.value — importe, a partir del carrito",
        "ecommerce.tax — impuestos, en el inicio del pago",
        "ecommerce.coupon — código promocional, en el pago y en la compra",
      ],
      remarque:
        "Siete de estos ocho nombres respetan la especificación de Google Analytics 4 y alimentan los informes sin transformación: es el mejor punto de partida de los motores que documentamos. Solo edit_in_cart es propio de Apex, sin equivalente estándar. Hay dos matices importantes. Primero, la documentación oficial no menciona ningún transaction_id en la compra, mientras que las instalaciones que auditamos sí leen uno: compruébalo en tu embudo antes de usarlo para deduplicar. Segundo, Apex expone una función de transmisión del consentimiento, lo que lo convierte en uno de los pocos motores del panel que permite un Consent Mode correcto dentro de un marco integrado.",
    },
    parcours: {
      intro:
        "Vista general del recorrido documentado por el proveedor, redistribuido hacia los cuatro destinos.",
      etapes: [
        {
          etape: "Visualización de la oferta",
          source: "view_item_list",
          ga4: "view_item_list",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Consulta de un producto",
          source: "view_item",
          ga4: "view_item",
          ads: "—",
          meta: "ViewContent",
          tiktok: "ViewContent",
        },
        {
          etape: "Añadido al carrito",
          source: "add_to_cart",
          ga4: "add_to_cart",
          ads: "Conversión secundaria",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Modificación del carrito",
          source: "edit_in_cart, remove_from_cart",
          ga4: "remove_from_cart — edit_in_cart, a ignorar",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Vista del carrito",
          source: "view_cart",
          ga4: "view_cart, con el valor",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Inicio del pago",
          source: "begin_checkout",
          ga4: "begin_checkout, con valor e impuestos",
          ads: "Conversión secundaria, con valor",
          meta: "InitiateCheckout",
          tiktok: "InitiateCheckout",
        },
        {
          etape: "Reserva pagada",
          source: "purchase",
          ga4: "purchase, con valor, items y cupón",
          ads: "Conversión principal",
          meta: "Purchase",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Montar la base: contenedor en la web e identificadores introducidos en el área de cliente de Apex.",
      "Conectar el consentimiento antes que cualquier etiqueta: el proveedor proporciona la función, y este es el momento de usarla.",
      "Google Analytics 4: como los nombres ya son conformes, es el paso más rápido de los cuatro.",
      "Después Google Ads, con el seguimiento entre dominios hacia apex-timing.com.",
      "Meta y TikTok para terminar, con los mismos activadores.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Instalar Google Analytics 4 en un embudo Apex Timing",
      description:
        "Siete de los ocho eventos de Apex ya tienen formato GA4: el trabajo consiste en no reescribirlos y en resolver edit_in_cart, que no tiene equivalente.",
      chapo:
        "Es la instalación más sencilla de los motores que documentamos: los nombres de eventos ya son los que espera GA4. La verdadera trampa es querer renombrarlos para que se lean mejor en la interfaz.",
      prerequis: [
        "El ID de medición está introducido en el área de cliente de Apex: GoKarts, luego Parámetros, campo «Google Analytics».",
        "El contenedor de Google Tag Manager del centro está introducido en el campo contiguo e instalado en la web del parque.",
        "El seguimiento entre dominios está configurado hacia apex-timing.com: consulta la guía de Google Ads.",
      ],
      variables: [
        {
          nom: "DLV - ecommerce.items",
          type: "Variable de couche de données",
          cle: "ecommerce.items",
          note: "La matriz completa de productos, directamente en el formato que espera GA4.",
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
          note: "Un solo activador para los siete eventos conformes, ya que la etiqueta transmitirá el nombre tal cual. edit_in_cart queda excluido a propósito.",
        },
        {
          nom: "Event | Purchase",
          type: "Événement personnalisé",
          condition: "purchase",
          note: "Activador independiente, útil para las etiquetas que solo deben dispararse en la compra.",
        },
      ],
      balises: [
        {
          nom: "Apex | Consent Bridge",
          type: "HTML personnalisé",
          declencheur: "Ventana cargada — páginas que contienen un marco de Apex",
          note: "Colócala antes que todo lo demás. Como el contenido de reserva está aislado en un marco, no conoce la elección que el visitante ha hecho en el banner de la web: hay que transmitírsela. Apex proporciona la función para ello, y es lo que hace posible un Consent Mode correcto dentro del marco; pocos motores del panel lo permiten. Sustituye los valores por los de tu gestor de consentimiento.",
          code: `<script>
  // Ejecutar después de que cargue el marco de Apex.
  // Sustituir los valores por el estado real del consentimiento, leído desde tu CMP.
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
          declencheur: "Inicialización — Todas las páginas",
          champs: [{ cle: "ID de la balise", valeur: "G-XXXXXXXXXX" }],
        },
        {
          nom: "Event Google Analytics | Apex Ecommerce",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Apex Ecommerce",
          champs: [
            { cle: "Nom de l'événement", valeur: "{{Event}}" },
            { cle: "Données e-commerce", valeur: "Activado — capa de datos" },
          ],
          note: "Una sola etiqueta transmite los siete eventos con su nombre original. Es la gran ventaja de una capa de datos conforme: se transmite, no se traduce.",
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics : événement GA4",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Nom de l'événement", valeur: "purchase" },
            { cle: "Données e-commerce", valeur: "Activado — capa de datos" },
            { cle: "Paramètre value", valeur: "{{DLV - ecommerce.value}}" },
            { cle: "Paramètre coupon", valeur: "{{DLV - ecommerce.coupon}}" },
          ],
          note: "Úsala solo si quieres enriquecer la compra con parámetros adicionales. En ese caso, excluye purchase del activador anterior para no contarla dos veces.",
        },
      ],
      pieges: [
        {
          titre: "Renombrar los eventos cuando ya son correctos",
          desc: "Es la trampa propia de Apex Timing. La capa de datos es conforme, pero sigue siendo tentador llamar a la etiqueta «Add To Cart» u «Open Booking» para que se lea mejor. GA4 distingue mayúsculas y minúsculas: un evento con ese nombre no alimenta ni el informe de monetización ni el embudo de compra, y se pierde toda la ventaja de una capa conforme.",
        },
        {
          titre: "Transmitir edit_in_cart tal cual",
          desc: "Este evento es propio de Apex y no tiene ningún equivalente en la especificación de Google. Transmitido sin pensarlo, crea un evento personalizado que no alimenta nada. O lo ignoras o lo traduces de forma deliberada, pero no lo dejes pasar por defecto.",
        },
        {
          titre: "Contar con un ID de transacción no documentado",
          desc: "La documentación oficial no incluye ningún transaction_id en la compra. Sin embargo, las instalaciones que auditamos sí leen uno. Comprueba que está presente en la vista previa antes de construir una deduplicación sobre él: una variable vacía no provoca ningún error, simplemente degrada tus conversiones en silencio.",
        },
        {
          titre: "Olvidar que el contenido está en un marco integrado",
          desc: "Los eventos llegan bien al contenedor, pero todo lo que depende del contexto de página (URL, título, referente) describe el marco y no la página del parque. No bases tus condiciones de activación en la URL si puedes basarlas en los eventos.",
        },
      ],
      verification: [
        "En la vista previa de Tag Manager, recorrer una compra completa desde la página del parque hasta la confirmación.",
        "Comprobar que los siete eventos aparecen en el DebugView de GA4 con sus nombres originales.",
        "Comprobar que la compra lleva value, items y coupon.",
        "Comprobar la presencia, o la ausencia, de un ID de transacción y sacar las conclusiones oportunas.",
        "Pasadas 48 horas, comprobar que el informe de Monetización muestra las compras y los ingresos.",
        "Comprobar que apex-timing.com no aparece en el informe de fuentes de tráfico.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Seguimiento de conversiones de Google Ads con Apex Timing",
      description:
        "Dominio compartido entre todos los centros y contenido en un marco integrado: las dos particularidades de Apex que deciden la configuración de Google Ads.",
      chapo:
        "Aquí dos particularidades de Apex Timing lo deciden todo: el embudo se sirve desde un dominio compartido por todos los centros clientes y su contenido se muestra en un marco integrado. Ninguna de las dos es un obstáculo insalvable, pero ambas exigen una configuración deliberada.",
      prerequis: [
        "El contenedor de Google Tag Manager está introducido en el área de cliente de Apex e instalado en la web del parque.",
        "Un ID de Google Ads con formato AW-XXXXXXXXX.",
        "Las acciones de conversión están creadas en Google Ads, cada una con su etiqueta.",
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
          note: "Aquí las conversiones mejoradas cuentan el doble: el marco integrado degrada parte de la señal clásica.",
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
              valeur: "miparque.es, apex-timing.com",
            },
          ],
          note: "Dominios sin más, sin https ni barra final. La interfaz acepta el formato completo, pero la decoración de enlaces no se produce y nada te avisa.",
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
            { cle: "Valeur de conversion", valeur: "dejar vacío" },
            { cle: "ID de commande", valeur: "dejar vacío" },
          ],
          note: "La capa de Apex no lleva valor en el añadido al carrito: solo aparece a partir de la vista del carrito. Asume una conversión sin importe en lugar de conectar una variable vacía.",
        },
        {
          nom: "Google Ads | Event Begin Checkout",
          type: "Suivi des conversions Google Ads",
          declencheur: "Event | Begin Checkout",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "{{DLV - ecommerce.value}}" },
            { cle: "ID de commande", valeur: "dejar vacío" },
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
              valeur: "rellenar solo si el embudo expone uno",
            },
            { cle: "Conversions améliorées", valeur: "Activadas" },
          ],
          note: "Como el proveedor no documenta el ID de pedido, comprueba que existe antes de conectarlo. Una variable vacía en este campo no tiene efecto, pero da la ilusión de una deduplicación que no existe.",
        },
      ],
      pieges: [
        {
          titre: "Las cookies compartidas entre todos los centros",
          desc: "El embudo instala sus cookies en apex-timing.com, dominio raíz común a todos los centros clientes del proveedor. Un visitante que ya ha pasado por el embudo de otro centro puede llegar con un identificador ya asignado. Es una particularidad que ningún otro motor del panel presenta.",
        },
        {
          titre: "Los dominios introducidos con el protocolo",
          desc: "Escribir https://www.apex-timing.com/ en lugar de apex-timing.com. Se acepta al introducirlo, pero el parámetro de vinculación nunca se añade a los enlaces y la atribución se rompe en silencio.",
        },
        {
          titre: "Un valor esperado demasiado pronto en el recorrido",
          desc: "La capa de datos solo expone un importe a partir de la vista del carrito. Conectar un valor en el añadido al carrito produce un campo vacío, no un error.",
        },
        {
          titre: "Basar tus conversiones en reglas de URL",
          desc: "Como el contenido está en un marco integrado, la URL que ve el contenedor no siempre es la que crees. Prefiere siempre los eventos de la capa de datos a las condiciones de página.",
        },
      ],
      verification: [
        "Hacer clic hacia el embudo desde la web del parque y comprobar que el parámetro _gl aparece en la dirección.",
        "Comprobar en la vista previa que el Conversion Linker se dispara en ambos lados.",
        "Hacer un pedido de prueba y comprobar que llega a Google Ads en 48 horas, con su valor.",
        "Comprobar que el informe de fuentes de GA4 no muestra apex-timing.com como referente.",
        "Cotejar las conversiones de Google Ads con las reservas en caja durante un mes completo.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Instalar el píxel de Meta en un embudo Apex Timing",
      description:
        "Apex Timing ofrece un campo dedicado al píxel de Meta en su área de cliente. Cuándo basta con él y cuándo pasar por Tag Manager para ganar los parámetros.",
      chapo:
        "Apex Timing reserva un campo para el píxel de Meta en su área de cliente: instalarlo no requiere ningún desarrollo. Pero ese campo solo transmite una vista de página; para los eventos de comercio y sus importes hay que pasar por Tag Manager.",
      prerequis: [
        "El contenedor de Google Tag Manager está introducido en el área de cliente de Apex e instalado en la web del parque.",
        "Un ID de píxel de Meta de 15 o 16 cifras.",
        "Las variables de capa de datos están creadas: consulta la guía de Google Analytics.",
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
          declencheur: "Todas las páginas",
          note: "Colócala solo si no has introducido el píxel en el área de cliente de Apex. Las dos a la vez duplican cada vista de página.",
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
          note: "Disponible en Apex, al contrario de lo que haría creer una auditoría limitada a un contenedor poco equipado: la consulta de producto está bien documentada.",
          code: `<script>
  fbq('track', 'ViewContent');
</script>`,
        },
        {
          nom: "Event Meta Ads | Add To Cart",
          type: "HTML personnalisé",
          declencheur: "Event | Add To Cart",
          note: "Sin importe: la capa de Apex solo expone un valor a partir de la vista del carrito. El evento sigue siendo útil para las audiencias de remarketing.",
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
          note: "Si tu embudo expone un ID de transacción, añádelo como eventID: es lo que permitirá conectar más adelante la API de conversiones sin contar cada compra dos veces.",
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
          titre: "Combinar el campo del área de cliente y Tag Manager",
          desc: "Si el píxel está introducido en Apex y además colocas una etiqueta base en Tag Manager, cada vista de página se envía dos veces. Elige: el campo por sencillez, Tag Manager por los parámetros.",
        },
        {
          titre: "Creer que el campo del área de cliente es suficiente",
          desc: "Carga el píxel y envía la vista de página. No envía ni añadido al carrito, ni inicio del pago, ni compra, ni importe. Para optimizar una campaña por valor, Tag Manager sigue siendo necesario.",
        },
        {
          titre: "Esperar un valor en el añadido al carrito",
          desc: "En Apex no existe en esta etapa. Más vale un AddToCart sin importe que un AddToCart con un valor vacío, que distorsiona los informes.",
        },
        {
          titre: "La moneda escrita a mano",
          desc: "Apex no documenta ninguna variable de moneda: escribirla a mano es aquí legítimo, siempre que se haga de forma consciente y se revise si algún día el centro vende en otra moneda.",
        },
      ],
      verification: [
        "Instalar la extensión Meta Pixel Helper y recorrer una compra completa.",
        "Comprobar que la vista de página se envía una sola vez: es la comprobación prioritaria en Apex.",
        "Comprobar en el Administrador de eventos que llegan ViewContent, AddToCart, InitiateCheckout y Purchase.",
        "Comprobar que la compra lleva un valor.",
        "Comparar las compras de Meta y las transacciones de GA4 durante siete días.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Instalar el píxel de TikTok en un embudo Apex Timing",
      description:
        "A diferencia de Meta, TikTok no tiene campo dedicado en Apex: todo pasa por Tag Manager, con los mismos activadores que el píxel de Meta. Etiquetas y pasos.",
      chapo:
        "A diferencia de Google Analytics y de Meta, TikTok no tiene un campo reservado en el área de cliente de Apex. Así que todo pasa por Tag Manager, con exactamente los mismos activadores que Meta, lo que hace que este paso sea rápido si ese píxel ya está instalado.",
      prerequis: [
        "El contenedor de Google Tag Manager está introducido en el área de cliente de Apex e instalado en la web del parque.",
        "Un ID de píxel de TikTok, disponible en el Administrador de eventos de TikTok.",
        "Los activadores ya están creados para Meta o Google Analytics: se reutilizan tal cual.",
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
          note: "TikTok espera CompletePayment, no Purchase. No copies la etiqueta de Meta cambiando solo el prefijo.",
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
          titre: "Buscar un campo de TikTok en el área de cliente",
          desc: "No lo hay. Apex reserva campos para Google Analytics, Tag Manager y el píxel de Meta, pero no para TikTok. Todo pasa por Tag Manager, sin excepción.",
        },
        {
          titre: "Usar el vocabulario de Meta",
          desc: "Copiar la etiqueta de Meta sustituyendo simplemente fbq por ttq produce un evento Purchase que TikTok ignora. El nombre esperado es CompletePayment.",
        },
        {
          titre: "Olvidar ttq.page() en la etiqueta base",
          desc: "Sin esta llamada, la vista de página nunca se envía: las audiencias de remarketing se quedan vacías aunque las conversiones lleguen.",
        },
      ],
      verification: [
        "Instalar la extensión TikTok Pixel Helper y recorrer una compra completa.",
        "Comprobar en el Administrador de eventos de TikTok que llegan los cuatro eventos.",
        "Comprobar que la vista de página llega tanto en la web como en el embudo.",
        "Comprobar que ningún evento aparece duplicado.",
      ],
    },
  ],
};
