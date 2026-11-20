import type { GuideOutil } from "@/lib/tracking/types";

/**
 * Yurplan — venta de entradas para eventos (versión en español).
 *
 * Traducción de src/lib/tracking/yurplan.ts. Los nombres de etiquetas,
 * activadores y variables, los tipos de GTM, las condiciones y los nombres
 * de eventos se mantienen idénticos al original.
 */
export const YURPLAN_ES: GuideOutil = {
  slug: "yurplan",
  nom: "Yurplan",
  pilier: {
    titre: "Plan de etiquetado Yurplan: medir las ventas online",
    description:
      "Yurplan envía checkout y purchase a Tag Manager, pero bloquea el HTML personalizado. Capa de datos, etiquetas permitidas y plan de etiquetado completo.",
    chapo:
      "Yurplan carga tu contenedor de Tag Manager en su ticketing y envía un evento en cada etapa del embudo. La capa de datos es limpia; la restricción está en otra parte: el contenedor rechaza allí las etiquetas HTML personalizadas y las variables JavaScript personalizadas. Así que todo el plan de etiquetado tiene que resolverse con plantillas de etiquetas.",
    architecture: {
      intro:
        "El ticketing funciona en una dirección de Yurplan, no en la web del organizador. Conviven tres formas de medirlo, y no se pueden combinar sin precaución.",
      points: [
        "Las herramientas de seguimiento se activan en el área del organizador, en pro.yurplan.com: abrir el evento y luego Applications › Gérer mes applications, apartado Communication. Allí se ofrecen Google Tag Manager, Google Analytics y el píxel de Meta.",
        "La activación se hace evento por evento. Cada nueva edición, cada nueva fecha creada como un evento nuevo, empieza sin ningún seguimiento mientras no se vuelvan a activar las aplicaciones.",
        "El contenedor de Tag Manager que carga Yurplan bloquea las etiquetas HTML personalizadas y las variables JavaScript personalizadas. Las plantillas de etiquetas, tanto las de Google como las de la galería de la comunidad, sí pasan.",
        "Las herramientas solo se cargan tras la aceptación en el banner de cookies del ticketing. El visitante que ya ha aceptado en tu web tiene que aceptar una segunda vez en Yurplan.",
        "En modo widget, el ticketing se muestra en un marco aislado dentro de tu web. Yurplan envía entonces cada etapa a la página anfitriona mediante mensajes; es la única forma de mantener el vínculo con la campaña de origen.",
      ],
    },
    dataLayer: {
      intro:
        "Yurplan envía dos eventos a la capa de datos. La compra sigue el formato de comercio electrónico de Google Analytics 4; las etapas del embudo pasan todas por un mismo evento, que se distingue por su número de paso.",
      events: [
        {
          nom: "checkout — paso 1",
          note: "elección de tarifas",
        },
        { nom: "checkout — paso 2", note: "formulario de pedido" },
        {
          nom: "checkout — paso 3",
          note: "elección de productos, solo si el evento los ofrece",
        },
        { nom: "checkout — paso 4", note: "resumen antes del pago" },
        { nom: "checkout — paso 5", note: "confirmación del pedido" },
        {
          nom: "purchase",
          note: "pedido validado, pago aceptado o pago aplazado registrado",
        },
      ],
      variables: [
        "ecommerce.checkout.actionField.step — número de paso, de 1 a 5",
        "order_identifier — ID único del pedido, en la raíz y no dentro de ecommerce",
        "ecommerce.transaction_id — referencia del pedido",
        "ecommerce.value — total pagado, después del código promocional",
        "ecommerce.tax — importe de los impuestos",
        "ecommerce.currency — siempre EUR",
        "ecommerce.items — una línea por tarifa o producto comprado",
      ],
      remarque:
        "Yurplan no envía ni view_item, ni add_to_cart, ni begin_checkout. Para seguir una etapa, se activa con checkout filtrado por número de paso y se elige uno mismo el nombre del evento que se envía a las plataformas. Hay dos detalles importantes: la compra también se envía para un pedido con pago aplazado, antes de cualquier cobro; y en items, el precio es el de la primera entrada de la tarifa; solo ecommerce.value es fiable para el importe.",
    },
    parcours: {
      intro:
        "Vista general, vía Tag Manager. Los nombres del lado de las plataformas son los que usamos en producción; Yurplan no los impone.",
      etapes: [
        {
          etape: "Elección de tarifas",
          source: "checkout, paso 1",
          ga4: "begin_checkout",
          ads: "—",
          meta: "InitiateCheckout",
          tiktok: "—",
        },
        {
          etape: "Formulario de pedido",
          source: "checkout, paso 2",
          ga4: "add_to_cart",
          ads: "Conversión secundaria",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Resumen antes del pago",
          source: "checkout, paso 4",
          ga4: "add_payment_info",
          ads: "Conversión secundaria",
          meta: "AddPaymentInfo",
          tiktok: "—",
        },
        {
          etape: "Pedido validado",
          source: "purchase",
          ga4: "purchase",
          ads: "Conversión principal",
          meta: "Purchase",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Activar Google Tag Manager en la aplicación del evento, con el mismo contenedor que la web.",
      "Crear las variables de capa de datos y los activadores de checkout por paso, y después el de purchase.",
      "Instalar Google Analytics 4: es la fuente de verdad y la base del envío desde servidor, si lo tienes.",
      "Elegir una sola vía para Meta (la aplicación de Yurplan o las plantillas en Tag Manager), nunca las dos.",
      "Terminar con Google Ads y TikTok, y luego comprobar un pedido real en modo vista previa.",
      "Anotar en algún sitio que cada nuevo evento de Yurplan debe reactivarse.",
    ],
  },

  plateformes: [
    /* ─────────────── GA4 ─────────────── */
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Medir las ventas de Yurplan en Google Analytics 4",
      description:
        "La aplicación Google Analytics de Yurplan solo mide páginas vistas. Para las ventas hacen falta Tag Manager y una etiqueta purchase: la configuración completa.",
      chapo:
        "Yurplan ofrece una aplicación de Google Analytics, pero solo envía las páginas vistas del ticketing. Las ventas pasan por Tag Manager y una etiqueta de evento que lee la capa de datos. Es la vía que hay que tomar desde el principio.",
      prerequis: [
        "Acceso de organizador a pro.yurplan.com en el evento correspondiente.",
        "Un contenedor de Google Tag Manager, preferiblemente el de la web, activado en Applications › Gérer mes applications.",
        "Un ID de medición de Google Analytics 4 con formato G-XXXXXXXXXX.",
      ],
      variables: [
        {
          nom: "DLV | ecommerce.checkout.actionField.step",
          type: "Variable de couche de données",
          cle: "ecommerce.checkout.actionField.step",
          note: "Sirve para filtrar los activadores de paso.",
        },
        {
          nom: "DLV | order_identifier",
          type: "Variable de couche de données",
          cle: "order_identifier",
          note: "En la raíz del evento, no dentro de ecommerce.",
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
          declencheur: "Inicialización — Todas las páginas",
          champs: [{ cle: "ID de la balise", valeur: "G-XXXXXXXXXX" }],
          note: "La misma etiqueta que en la web. Si la aplicación de Google Analytics de Yurplan también está activada, las páginas vistas del ticketing se envían dos veces: quédate con una u otra.",
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
            { cle: "Enviar datos de comercio electrónico", valeur: "Sí" },
            { cle: "Source des données", valeur: "Capa de datos" },
            { cle: "Paramètre event_id", valeur: "{{DLV | order_identifier}}" },
          ],
          note: "Con la fuente «capa de datos», la etiqueta recoge transaction_id, value, tax, currency e items tal como los envía Yurplan. El parámetro event_id solo sirve para el envío desde servidor: permite que la API de conversiones de Meta deduplique la compra.",
        },
      ],
      pieges: [
        {
          titre: "Creer que la aplicación de Google Analytics mide las ventas",
          desc: "Solo envía las páginas vistas. Un organizador que se conforma con ella ve tráfico en su ticketing y cero compras en sus informes, sin ningún mensaje de error.",
        },
        {
          titre: "Crear una variable JavaScript personalizada",
          desc: "El contenedor que carga Yurplan las bloquea. Una variable que funciona en la vista previa de la web se queda vacía en el ticketing. Todo debe pasar por variables de capa de datos o por plantillas.",
        },
        {
          titre: "Olvidar el seguimiento entre dominios",
          desc: "El ticketing funciona en una dirección de Yurplan. Sin los dos dominios declarados en Google Analytics (Administrar › Flujos de datos › Configurar tus dominios), la sesión se rompe al pasar y la compra se atribuye a tu propia web.",
        },
        {
          titre: "Contar los pagos aplazados como ventas cobradas",
          desc: "Yurplan envía purchase en cuanto se registra un pedido con pago aplazado, antes del cobro. Si la opción está activa, coteja las compras de GA4 con los cobros reales.",
        },
      ],
      verification: [
        "Aceptar el banner de cookies del ticketing y desactivar el bloqueador de anuncios: sin eso, no se carga nada.",
        "En el modo vista previa de Tag Manager, recorrer el embudo y comprobar que cada paso dispara la etiqueta correcta.",
        "En el DebugView, comprobar que la compra lleva transaction_id, value, currency e items.",
        "Comprobar que el ticketing no aparece como fuente de tráfico en los informes de adquisición.",
        "Comprobar en el próximo evento creado que la aplicación de Tag Manager se ha reactivado.",
      ],
    },

    /* ─────────────── Google Ads ─────────────── */
    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Seguimiento de conversiones de Google Ads con Yurplan",
      description:
        "Yurplan no tiene aplicación de Google Ads: todo pasa por Tag Manager y sus plantillas nativas, las únicas permitidas en el ticketing. Etiquetas y trampas.",
      chapo:
        "Yurplan no ofrece aplicación de Google Ads. El seguimiento pasa por el contenedor de Tag Manager cargado en el ticketing y, como las etiquetas de conversión de Google son plantillas nativas, escapan al bloqueo del HTML personalizado.",
      prerequis: [
        "El contenedor de Google Tag Manager activado en el evento de Yurplan.",
        "Un ID de Google Ads con formato AW-XXXXXXXXX.",
        "Las acciones de conversión creadas en Google Ads, cada una con su etiqueta.",
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
              valeur: "miweb.es, yurplan.com",
            },
          ],
          note: "Imprescindible: el ticketing nunca está en el dominio del organizador. Sin vinculación, el clic publicitario se pierde al pasar a Yurplan.",
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
          note: "El formulario de pedido de Yurplan recoge el email: es lo que hace útiles aquí las conversiones mejoradas.",
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Suivi des conversions Google Ads",
          declencheur: "CE | Yurplan checkout étape 2",
          champs: [
            { cle: "ID de conversion", valeur: "AW-XXXXXXXXX" },
            { cle: "Valeur de conversion", valeur: "dejar vacío" },
            { cle: "ID de commande", valeur: "dejar vacío" },
          ],
          note: "En Yurplan, las etapas del embudo no llevan importe: la conversión secundaria se cuenta sin valor.",
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
            { cle: "Conversions améliorées", valeur: "Activadas" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Esperar un valor en las etapas del embudo",
          desc: "Solo purchase lleva un importe. Una conversión de etapa configurada sobre {{DLV | ecommerce.value}} llega con cero euros y distorsiona el valor total de las conversiones.",
        },
        {
          titre: "Instalar la conversión en HTML personalizado",
          desc: "Un fragmento gtag pegado en una etiqueta HTML nunca se dispara en el ticketing. Solo pasan las plantillas de etiquetas.",
        },
        {
          titre: "Olvidar reactivar Tag Manager en el nuevo evento",
          desc: "Es la avería más frecuente: la campaña funciona en la nueva edición, el ticketing vende y Google Ads no ve nada porque la aplicación solo se activó en el evento anterior.",
        },
      ],
      verification: [
        "En modo vista previa, aceptar las cookies del ticketing y recorrer un pedido hasta la confirmación.",
        "Comprobar que el parámetro _gl se añade a la URL al pasar de la web a Yurplan.",
        "Comprobar que el pedido de prueba llega a Google Ads en 48 horas, con su valor.",
        "Cotejar las conversiones de Google Ads con los pedidos de Yurplan durante un mes completo.",
      ],
    },

    /* ─────────────── Meta ─────────────── */
    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Instalar el píxel de Meta en un ticketing de Yurplan",
      description:
        "¿Aplicación Pixel Meta de Yurplan o plantilla de Meta en Tag Manager? Qué cubre cada vía, el eventID para la API de conversiones y el duplicado que evitar.",
      chapo:
        "Existen dos vías. La aplicación Pixel Meta de Yurplan se activa pegando un identificador y deduplica la compra por sí sola. La plantilla Meta Pixel en Tag Manager exige más trabajo, pero es la única forma de compartir un ID de evento con el envío desde servidor en cada etapa. El HTML personalizado, en cambio, no es una opción.",
      prerequis: [
        "Un ID de píxel de Meta de 15 o 16 cifras.",
        "Para la vía Tag Manager: el contenedor activado en el evento y las plantillas Meta Pixel y Unique Event ID importadas desde la galería.",
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
          note: "Sustituye a la variable JavaScript que se usaría en otros casos, bloqueada en Yurplan. El mismo valor debe enviarse en la etiqueta GA4 de la etapa para que el envío desde servidor deduplique.",
        },
      ],
      declencheurs: [
        {
          nom: "PV | Billetterie Yurplan",
          type: "Page vue",
          condition: "Page Hostname contient yurplan",
          note: "Limita las etiquetas de Meta del contenedor al ticketing, si la web ya lleva su propio píxel.",
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
          nom: "Vía 1 — aplicación Pixel Meta de Yurplan",
          type: "Configuración en Yurplan",
          declencheur: "—",
          champs: [
            {
              cle: "Emplacement",
              valeur: "Applications › Gérer mes applications › Communication",
            },
            { cle: "Champ à renseigner", valeur: "Tu ID de píxel" },
          ],
          note: "Envía PageView, InitiateCheckout en el formulario (AddToCart en el widget) y Purchase en la confirmación, con valor, moneda y el ID del pedido como eventID. Suficiente sin envío desde servidor. Si eliges esta vía, no crees ninguna etiqueta de Meta en Tag Manager.",
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
          note: "Vía 2, Tag Manager. La plantilla oficial de la galería sustituye al código fbq habitual.",
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
          note: "El ID del pedido sirve como eventID, igual que en la aplicación de Yurplan: la API de conversiones debe enviar el mismo para que Meta cuente la compra una sola vez.",
        },
      ],
      pieges: [
        {
          titre: "Activar la aplicación y las plantillas a la vez",
          desc: "Cada etapa se envía entonces dos veces, con dos eventID distintos: Meta no puede deduplicar. El coste por compra mostrado resulta la mitad de lo real, sin ninguna alerta.",
        },
        {
          titre: "Copiar la etiqueta fbq de la web",
          desc: "Una etiqueta HTML personalizada no se dispara en el ticketing. Esa es la razón de ser de las plantillas de la galería.",
        },
        {
          titre: "Dejar que el PageView de la web se envíe dos veces",
          desc: "Si la web lleva un píxel en HTML con su bloque noscript, Tag Manager inyecta también la imagen del noscript: dos PageView por página. Quita el noscript de las etiquetas HTML de Tag Manager; no sirve de nada sin JavaScript, ya que Tag Manager tampoco se carga.",
        },
        {
          titre: "Ignorar el segundo banner de cookies",
          desc: "El visitante tiene que volver a aceptar en Yurplan. Parte de los compradores rechaza o ignora ese banner: el píxel del navegador se queda corto, y solo el envío desde servidor recupera parte de la diferencia.",
        },
      ],
      verification: [
        "Instalar Meta Pixel Helper, aceptar las cookies del ticketing y recorrer un pedido.",
        "Comprobar que cada evento aparece una sola vez: es la comprobación prioritaria.",
        "En el Administrador de eventos, comprobar que la compra llega con valor, moneda y eventID.",
        "Con envío desde servidor, comprobar que navegador y servidor quedan bien deduplicados en el mismo pedido.",
      ],
    },

    /* ─────────────── TikTok ─────────────── */
    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Instalar el píxel de TikTok en un ticketing de Yurplan",
      description:
        "Yurplan no tiene aplicación de TikTok y bloquea el HTML personalizado: el píxel pasa por la plantilla oficial de TikTok en Tag Manager. Etiquetas y trampas.",
      chapo:
        "Yurplan no tiene aplicación de TikTok, y el contenedor no admite HTML personalizado: queda la plantilla oficial TikTok Pixel de la galería de Tag Manager. Cubre todo el recorrido, siempre que hables el vocabulario de TikTok.",
      prerequis: [
        "El contenedor de Google Tag Manager activado en el evento de Yurplan.",
        "Un ID de píxel de TikTok, disponible en el Administrador de eventos de TikTok.",
        "La plantilla TikTok Pixel importada desde la galería de la comunidad.",
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
          note: "TikTok espera CompletePayment, no Purchase.",
        },
      ],
      pieges: [
        {
          titre: "Usar el vocabulario de Meta",
          desc: "Un evento llamado Purchase no aparece en ningún informe de TikTok. La compra se llama CompletePayment.",
        },
        {
          titre: "Pegar el código de instalación de TikTok",
          desc: "El código que proporciona TikTok es HTML personalizado: no se carga en el ticketing. Solo funciona la plantilla de la galería.",
        },
        {
          titre: "Duplicar el píxel de la web",
          desc: "Si la web ya carga TikTok, limita las etiquetas del contenedor al ticketing con el activador por nombre de host; si no, cada página de la web cuenta dos vistas.",
        },
      ],
      verification: [
        "Instalar TikTok Pixel Helper, aceptar las cookies del ticketing y recorrer un pedido.",
        "Comprobar que cada evento aparece una sola vez.",
        "Comprobar en el Administrador de eventos de TikTok que CompletePayment llega con valor y moneda.",
      ],
    },
  ],
};
