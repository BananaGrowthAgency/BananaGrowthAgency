import type { Contenu, GuideOutil } from "@/lib/tracking/types";

/**
 * Guía Qweekle en español, en dos versiones.
 *
 * La V3 está documentada por el editor (referencia dataLayer 1.1 del 18/09/2026)
 * y ofrece cuatro módulos GTM listos para importar. La V2 sigue desplegada en
 * muchos parques: aquí se documenta a partir de los contenedores que
 * gestionamos, ya que el editor no publica nada sobre ella.
 *
 * Las dos conviven en producción. La guía no elige por el lector: le ayuda
 * a identificar su versión y después le da el plan adecuado.
 */

/* ══════════════════════════ VERSIÓN 3 ══════════════════════════ */

const V3: Contenu = {
  pilier: {
    titre: "Plan de etiquetado Qweekle V3: medir tus conversiones",
    description:
      "Qweekle V3 ofrece cuatro módulos GTM listos para importar y una capa de datos conforme a GA4. Arquitectura, eventos, reglas monetarias y plan de etiquetado.",
    chapo:
      "Qweekle V3 es el motor mejor equipado del panel en cuanto a medición: trece eventos con nombres conformes, un objeto de usuario ya cifrado con hash, el Consent Mode integrado y, sobre todo, cuatro módulos de Google Tag Manager listos para importar. El verdadero reto no es construirlo todo, sino entender sus reglas monetarias, porque no son intuitivas.",
    architecture: {
      intro:
        "El recorrido se compone de tres dominios, y solo uno carga Tag Manager.",
      points: [
        "La tienda funciona en client.qweekle.shop. Ahí vive el contenedor y ahí se producen todos los eventos medibles.",
        "El pago se hace en payments.qweekle.app, un dominio dedicado que no carga Tag Manager. No hay ninguna etiqueta que instalar ahí, y nada es medible.",
        "La web corporativa del parque, si existe, es el tercer dominio. De ella parte el visitante, y para ella hay que configurar el seguimiento entre dominios.",
        "No se pierde ningún dato pese al corte: la compra se emite a la vuelta, en la página de confirmación de la tienda, tras un pago correcto.",
        "La tienda es una aplicación de una sola página. La navegación no recarga la página, lo que obliga a desactivar la detección automática de cambio de URL en las etiquetas de Meta para evitar duplicados.",
        "El editor proporciona cuatro módulos de Tag Manager para importar: un módulo Base obligatorio y, después, GA4, Meta y Google Ads, cada uno independiente.",
      ],
    },
    dataLayer: {
      intro:
        "Trece eventos cubren el recorrido. Cada uno va precedido de un vaciado del objeto de comercio electrónico, lo que evita la contaminación entre eventos, un cuidado que pocos editores tienen.",
      events: [
        { nom: "page_view", note: "cada cambio de ruta" },
        { nom: "view_item_list", note: "visualización de una lista o de un carrusel" },
        { nom: "view_item", note: "visualización de una ficha de producto" },
        { nom: "add_to_cart", note: "añadido al carrito" },
        { nom: "remove_from_cart", note: "eliminación del carrito" },
        { nom: "view_cart", note: "visualización del carrito" },
        { nom: "begin_checkout", note: "entrada en el embudo de compra" },
        {
          nom: "add_shipping_info",
          note: "validación del paso de reserva: nombre de GA4 reutilizado, no hay envío",
        },
        { nom: "add_payment_info", note: "último paso medible antes de la redirección" },
        { nom: "purchase", note: "a la vuelta, en la página de confirmación" },
        { nom: "login", note: "inicio de sesión" },
        { nom: "sign_up", note: "creación de cuenta" },
        { nom: "sign_out", note: "cierre de sesión" },
      ],
      variables: [
        "ecommerce.value — valor del pedido, nunca reducido por una tarjeta regalo ni por un anticipo",
        "ecommerce.items — productos, con cuatro niveles de categoría",
        "ecommerce.transaction_id — identificador único del pedido, en la compra",
        "ecommerce.affiliation — slug del establecimiento, en todos los eventos",
        "ecommerce.coupon, tax, shipping, payment_type, shipping_tier",
        "user.user_id y user.email_sha256 — hash listo para las conversiones mejoradas",
        "amount_paid, amount_due, gift_card_amount — en la raíz, en la compra",
      ],
      remarque:
        "Lo que hay que entender antes que nada son las reglas monetarias. En Qweekle, value representa el valor del pedido (la facturación) y no el importe cobrado online. Tres mecanismos reducen lo que se paga en el momento sin tener el mismo significado: un código de descuento es una rebaja real y reduce value; una tarjeta regalo prepagada es un medio de pago y no lo modifica; un anticipo es una modalidad de pago y tampoco lo modifica. La comprobación es sencilla: amount_paid más amount_due más gift_card_amount debe ser igual a value. La trampa es que la interfaz ofrece un único campo para «cupón o tarjeta regalo», pero la capa de datos lo encamina de forma distinta según el tipo detectado. Un parque que mide el importe cobrado online en lugar del valor del pedido declara de menos su facturación de forma permanente, y el saldo de un anticipo, pagado in situ, nunca se recuperará.",
    },
    parcours: {
      intro:
        "Visión general. Los módulos que entrega el editor cubren las columnas GA4, Meta y Google Ads; TikTok queda por construir.",
      etapes: [
        {
          etape: "Visualización de una lista",
          source: "view_item_list",
          ga4: "Cubierto por el módulo GA4",
          ads: "—",
          meta: "—",
          tiktok: "Por construir",
        },
        {
          etape: "Consulta de un producto",
          source: "view_item",
          ga4: "Cubierto por el módulo GA4",
          ads: "Remarketing, cubierto por el módulo",
          meta: "ViewContent, cubierto por el módulo",
          tiktok: "Por construir",
        },
        {
          etape: "Añadido al carrito",
          source: "add_to_cart",
          ga4: "Cubierto por el módulo GA4",
          ads: "—",
          meta: "AddToCart, cubierto por el módulo",
          tiktok: "Por construir",
        },
        {
          etape: "Vista del carrito",
          source: "view_cart",
          ga4: "Cubierto por el módulo GA4",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Inicio del pedido",
          source: "begin_checkout",
          ga4: "Cubierto por el módulo GA4",
          ads: "—",
          meta: "InitiateCheckout, cubierto por el módulo",
          tiktok: "Por construir",
        },
        {
          etape: "Paso de reserva",
          source: "add_shipping_info",
          ga4: "Cubierto por el módulo GA4",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Validación del pago",
          source: "add_payment_info",
          ga4: "Cubierto por el módulo GA4",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Pedido confirmado",
          source: "purchase",
          ga4: "Cubierto por el módulo GA4",
          ads: "Conversión principal, cubierta por el módulo",
          meta: "Purchase, cubierto por el módulo",
          tiktok: "CompletePayment, por construir",
        },
      ],
    },
    ordre: [
      "Importar el módulo Base: aporta las variables, los activadores y el Consent Mode. Sin él no funciona nada.",
      "Conectar tu banner de cookies al Consent Mode antes de activar cualquier etiqueta de medición.",
      "Rellenar las constantes de dominio: tienda, web de pago y web corporativa.",
      "Importar los módulos GA4, Meta y Google Ads según las plataformas que uses y, después, rellenar sus identificadores.",
      "Construir TikTok a mano: el editor no proporciona módulo.",
      "Comprobar en la vista previa que nada se activa antes de aceptar las cookies y, después, publicar.",
    ],
  },

  plateformes: [
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Instalar Google Analytics 4 en una tienda Qweekle V3",
      description:
        "Un módulo GTM que importar y un identificador que rellenar. Lo esencial está en otra parte: entender por qué value no equivale al importe cobrado online.",
      chapo:
        "Es la instalación más rápida del panel: importas el módulo, pegas tu ID de medición y listo. El verdadero trabajo consiste en entender lo que Qweekle llama valor, y en no confundirlo con lo que el cliente ha pagado online.",
      prerequis: [
        "El módulo Base está importado en tu contenedor y el Consent Mode está conectado a tu banner de cookies.",
        "El contenedor de Tag Manager está configurado en la administración de Qweekle.",
        "Un ID de medición de GA4, con el formato G-XXXXXXXXXX.",
      ],
      variables: [
        {
          nom: "Qweekle - CONST - [A CONFIGURER] GA4 Measurement ID",
          type: "Constante — incluida en el módulo",
          cle: "G-XXXXXXXXXX",
          note: "El único valor que hay que rellenar para una puesta en marcha estándar.",
        },
        {
          nom: "Qweekle - DLV - ecommerce.value",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "ecommerce.value",
          note: "Valor del pedido, nunca reducido por una tarjeta regalo ni por un anticipo.",
        },
        {
          nom: "Qweekle - DLV - amount_paid",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "amount_paid",
          note: "Importe realmente cobrado online. Envíalo como parámetro personalizado, nunca como valor de conversión.",
        },
        {
          nom: "Qweekle - DLV - amount_due",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "amount_due",
          note: "Saldo pagado in situ. Es facturación real que GA4 no verá nunca de otro modo.",
        },
        {
          nom: "Qweekle - DLV - gift_card_amount",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "gift_card_amount",
        },
        {
          nom: "Qweekle - DLV - user.email_sha256",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "user.email_sha256",
          note: "Hash ya calculado por Qweekle. Alimenta directamente las conversiones mejoradas.",
        },
      ],
      declencheurs: [
        {
          nom: "Qweekle - CE - Tous les evenements ecommerce",
          type: "Evento personalizado, expresión regular — incluido en el módulo",
          condition: "el conjunto de los eventos de comercio electrónico en una sola regla",
          note: "Como los nombres ya son conformes, una sola regla transmite todo el recorrido.",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Evento personalizado — incluido en el módulo",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Module à importer : qweekle-2-ga4.json",
          type: "Importación GTM — combinar, nunca sobrescribir",
          declencheur: "—",
          champs: [
            { cle: "Requisito previo", valeur: "qweekle-1-base.json ya importado" },
            { cle: "Modo de importación", valeur: "Combinar, no sobrescribir" },
            {
              cle: "Qué rellenar después",
              valeur: "la constante GA4 Measurement ID",
            },
          ],
          note: "El módulo aporta la etiqueta de configuración, las etiquetas de evento y los parámetros de consentimiento. Importa siempre en modo combinar: sobrescribir eliminaría el resto de tu contenedor.",
        },
        {
          nom: "Event Google Analytics | Montants complémentaires",
          type: "Google Analytics: evento de GA4 — por añadir",
          declencheur: "Qweekle - CE - purchase",
          champs: [
            { cle: "Nombre del evento", valeur: "purchase" },
            {
              cle: "Parámetro amount_paid",
              valeur: "{{Qweekle - DLV - amount_paid}}",
            },
            {
              cle: "Parámetro amount_due",
              valeur: "{{Qweekle - DLV - amount_due}}",
            },
            {
              cle: "Parámetro gift_card_amount",
              valeur: "{{Qweekle - DLV - gift_card_amount}}",
            },
          ],
          note: "Fuera del módulo, y sin embargo esencial en un parque que trabaja con anticipos o vende tarjetas regalo. Declara estos tres parámetros como dimensiones personalizadas en GA4 para poder conciliar con la caja.",
        },
      ],
      pieges: [
        {
          titre: "Tomar el importe cobrado por el valor del pedido",
          desc: "Es el error que más caro sale en Qweekle. Un parque que cobra un anticipo del 30 % y el resto in situ verá su facturación dividida por tres si mide amount_paid. El valor de conversión debe ser siempre value: el saldo pagado in situ no aparecerá en ningún otro sitio.",
        },
        {
          titre: "Confundir código de descuento y tarjeta regalo",
          desc: "La interfaz tiene un solo campo para ambos, pero no significan lo mismo. Un código de descuento es una rebaja y reduce el valor; una tarjeta regalo es un medio de pago y no lo modifica. La capa de datos hace la distinción: te toca a ti no perderla por el camino.",
        },
        {
          titre: "Importar sobrescribiendo",
          desc: "La importación de GTM ofrece dos modos. «Sobrescribir» elimina todo lo que ya contiene tu contenedor. En un contenedor de cliente con otras etiquetas, es irreversible sin copia de seguridad.",
        },
        {
          titre: "Agrupar el carrito por ID de producto",
          desc: "Varias líneas pueden llevar el mismo item_id: es intencionado, cada línea conserva el contexto desde el que se añadió. Agruparlas hace perder la medición de lo que convierte.",
        },
      ],
      verification: [
        "En la vista previa de Tag Manager, comprobar que nada se activa antes de aceptar el banner de cookies.",
        "Hacer un pedido de prueba y comprobar que ecommerce.value está en euros, no en céntimos.",
        "Comprobar que ecommerce.items no está vacío y lleva item_id, price y quantity.",
        "En un pedido con anticipo, comprobar que amount_paid más amount_due más gift_card_amount es igual a value.",
        "Comprobar en DebugView que los eventos llegan con sus nombres originales.",
        "Comparar la facturación de GA4 con la de la caja durante un mes completo.",
      ],
    },

    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Seguimiento de conversiones de Google Ads en una tienda Qweekle V3",
      description:
        "El módulo Ads de Qweekle gestiona el seguimiento entre tres dominios mediante constantes. Falta rellenarlas bien y activar las conversiones mejoradas.",
      chapo:
        "El módulo de Google Ads que entrega Qweekle cubre la configuración, el seguimiento entre dominios, la conversión de compra y el remarketing. Su particularidad: el seguimiento entre dominios se configura mediante constantes, porque el recorrido atraviesa hasta tres dominios.",
      prerequis: [
        "El módulo Base está importado y el Consent Mode está conectado.",
        "Un ID de Google Ads con el formato AW-XXXXXXXXXX y la etiqueta de la conversión de compra.",
        "El dominio exacto de tu tienda Qweekle, y el de tu web corporativa si la tienes.",
      ],
      variables: [
        {
          nom: "Qweekle - CONST - [A CONFIGURER] Google Ads Conversion ID",
          type: "Constante — incluida en el módulo",
          cle: "AW-XXXXXXXXXX",
        },
        {
          nom: "Qweekle - CONST - [A CONFIGURER] Google Ads Conversion Label",
          type: "Constante — incluida en el módulo",
          cle: "la etiqueta de la conversión de compra",
        },
        {
          nom: "Qweekle - CONST - [A CONFIGURER] URL du site de VEL",
          type: "Constante — incluida en el módulo",
          cle: "client.qweekle.shop",
          note: "Valor de ejemplo que hay que sustituir por el dominio real de la tienda. Es el olvido más frecuente.",
        },
        {
          nom: "Qweekle - CONST - URL du site de paiement",
          type: "Constante — incluida en el módulo",
          cle: "payments.qweekle.app",
          note: "Ya rellenada e idéntica en demostración y en producción. No hay que modificarla.",
        },
        {
          nom: "Qweekle - CONST - [A CONFIGURER] URL site vitrine",
          type: "Constante — incluida en el módulo",
          cle: "monsite.fr",
          note: "Rellénala si el parque tiene una web corporativa que redirige a la tienda.",
        },
      ],
      declencheurs: [
        {
          nom: "All Pages",
          type: "Página vista — incluido en el módulo",
          condition: "todas las páginas",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Evento personalizado — incluido en el módulo",
          condition: "purchase",
        },
        {
          nom: "Qweekle - CE - view_item",
          type: "Evento personalizado — incluido en el módulo",
          condition: "view_item",
        },
      ],
      balises: [
        {
          nom: "Module à importer : qweekle-4-ads.json",
          type: "Importación GTM — combinar",
          declencheur: "—",
          champs: [
            { cle: "Requisito previo", valeur: "qweekle-1-base.json ya importado" },
            { cle: "Modo de importación", valeur: "Combinar" },
          ],
        },
        {
          nom: "[Google Ads] Configuration",
          type: "Etiqueta de Google — incluida en el módulo",
          declencheur: "All Pages",
          champs: [{ cle: "Consentimiento necesario", valeur: "ad_storage, ad_user_data" }],
        },
        {
          nom: "[Google Ads] Conversion Linker",
          type: "Vinculación de conversiones — incluida en el módulo",
          declencheur: "All Pages",
          champs: [
            { cle: "Consentimiento necesario", valeur: "ad_storage" },
            {
              cle: "Dominios",
              valeur: "alimentados por las tres constantes de dominio",
            },
          ],
          note: "Aquí es donde se decide la atribución. Hay que rellenar los tres dominios, sin protocolo ni barra final.",
        },
        {
          nom: "[Google Ads] Conversion - Purchase",
          type: "Seguimiento de conversiones — incluida en el módulo",
          declencheur: "Qweekle - CE - purchase",
          champs: [
            { cle: "Valor", valeur: "{{Qweekle - DLV - ecommerce.value}}" },
            {
              cle: "ID de pedido",
              valeur: "{{Qweekle - DLV - ecommerce.transaction_id}}",
            },
            { cle: "Consentimiento necesario", valeur: "ad_storage, ad_user_data" },
          ],
        },
        {
          nom: "[Google Ads] Remarketing",
          type: "Remarketing — incluida en el módulo",
          declencheur: "Qweekle - CE - view_item",
          champs: [{ cle: "Consentimiento necesario", valeur: "ad_storage, ad_user_data" }],
        },
      ],
      pieges: [
        {
          titre: "Dejar los dominios de ejemplo",
          desc: "Las constantes llegan rellenadas con client.qweekle.shop y monsite.fr. Mientras no se sustituyan por los dominios reales, el seguimiento entre dominios no hace nada, y nada te avisa: las conversiones se siguen contando, pero atribuidas al canal equivocado.",
        },
        {
          titre: "Olvidar la web corporativa en el seguimiento entre dominios",
          desc: "El recorrido atraviesa hasta tres dominios. Rellenar la tienda y el pago pero olvidar la web corporativa rompe la atribución desde el primer clic, que es precisamente el que viene de la publicidad.",
        },
        {
          titre: "Intentar medir en la web de pago",
          desc: "No carga Tag Manager, por diseño. No hay nada que instalar ni nada que esperar ahí. La compra se registra a la vuelta, en la tienda.",
        },
        {
          titre: "No activar las conversiones mejoradas",
          desc: "Qweekle proporciona el email ya cifrado con hash. Prescindir de él es dejar de lado la mejor recuperación de señal disponible, sin tener que hacer ningún trabajo de hash por tu cuenta.",
        },
      ],
      verification: [
        "Hacer clic desde la web corporativa hacia la tienda y comprobar que el parámetro de vinculación se añade a la URL.",
        "Comprobar en la vista previa que el Conversion Linker se activa en los dos dominios medibles.",
        "Hacer un pedido de prueba y comprobar que aparece en Google Ads en un plazo de 48 horas, con su valor.",
        "Comprobar en el diagnóstico de Google Ads que las conversiones mejoradas se reciben correctamente.",
        "Comprobar que ninguna etiqueta se envía antes de aceptar el banner de cookies.",
      ],
    },

    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Instalar el píxel de Meta en una tienda Qweekle V3",
      description:
        "El módulo Meta de Qweekle aporta el píxel, los cuatro eventos del recorrido y el Advanced Matching. Ojo al ajuste para aplicaciones SPA que evita duplicados.",
      chapo:
        "El módulo de Meta que entrega Qweekle aporta el píxel, los cuatro eventos del recorrido y el Advanced Matching alimentado por el email ya cifrado con hash. Un ajuste merece atención: como la tienda es una aplicación de una sola página, hay que desactivar la detección automática de cambio de URL.",
      prerequis: [
        "El módulo Base está importado y el Consent Mode está conectado.",
        "Un ID de píxel de Meta de 15 o 16 cifras.",
      ],
      variables: [
        {
          nom: "Qweekle - CONST - [A CONFIGURER] Meta Pixel ID",
          type: "Constante — incluida en el módulo",
          cle: "000000000000000",
        },
        {
          nom: "Qweekle - DLV - user.email_sha256",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "user.email_sha256",
          note: "Alimenta el Advanced Matching. Qweekle proporciona el hash, no hay nada que calcular.",
        },
        {
          nom: "Qweekle - DLV - ecommerce.transaction_id",
          type: "Variable de capa de datos — incluida en el módulo",
          cle: "ecommerce.transaction_id",
          note: "Sirve como ID de evento para la deduplicación con la API de conversiones.",
        },
      ],
      declencheurs: [
        {
          nom: "All Pages",
          type: "Página vista — incluido en el módulo",
          condition: "todas las páginas",
        },
        {
          nom: "Qweekle - CE - view_item",
          type: "Evento personalizado — incluido en el módulo",
          condition: "view_item",
        },
        {
          nom: "Qweekle - CE - add_to_cart",
          type: "Evento personalizado — incluido en el módulo",
          condition: "add_to_cart",
        },
        {
          nom: "Qweekle - CE - begin_checkout",
          type: "Evento personalizado — incluido en el módulo",
          condition: "begin_checkout",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Evento personalizado — incluido en el módulo",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Module à importer : qweekle-3-meta.json",
          type: "Importación GTM — combinar",
          declencheur: "—",
          champs: [
            { cle: "Requisito previo", valeur: "qweekle-1-base.json ya importado" },
            { cle: "Qué rellenar", valeur: "la constante Meta Pixel ID" },
          ],
        },
        {
          nom: "[Meta] Pixel Base + PageView",
          type: "HTML personalizado — incluida en el módulo",
          declencheur: "All Pages",
          note: "Es esta etiqueta la que lleva el ajuste para SPA. Comprueba que la detección automática de cambio de URL está desactivada; si no, cada navegación cuenta una página vista de más.",
        },
        {
          nom: "[Meta] ViewContent",
          type: "HTML personalizado — incluida en el módulo",
          declencheur: "Qweekle - CE - view_item",
        },
        {
          nom: "[Meta] AddToCart",
          type: "HTML personalizado — incluida en el módulo",
          declencheur: "Qweekle - CE - add_to_cart",
        },
        {
          nom: "[Meta] InitiateCheckout",
          type: "HTML personalizado — incluida en el módulo",
          declencheur: "Qweekle - CE - begin_checkout",
        },
        {
          nom: "[Meta] Purchase",
          type: "HTML personalizado — incluida en el módulo",
          declencheur: "Qweekle - CE - purchase",
          note: "Lleva el valor del pedido y el ID de transacción. Este último es lo que permitirá conectar la API de conversiones sin contar cada compra dos veces.",
        },
      ],
      pieges: [
        {
          titre: "Dejar activa la detección automática de URL",
          desc: "La tienda es una aplicación de una sola página: cada navegación activaría una página vista adicional. El módulo incluye el ajuste, pero hay que comprobar que sigue en su sitio después de importar.",
        },
        {
          titre: "Añadir un segundo píxel encima del módulo",
          desc: "Si el píxel ya estaba instalado antes de importar, acabas con dos cargas y eventos duplicados. Haz limpieza antes de importar.",
        },
        {
          titre: "Ignorar el Advanced Matching",
          desc: "Qweekle proporciona el email con hash listo para usar. No conectarlo es renunciar gratis a precisión tanto en las audiencias como en las conversiones.",
        },
      ],
      verification: [
        "Instalar la extensión Meta Pixel Helper y recorrer una compra completa.",
        "Comprobar que la página vista solo se envía una vez por navegación: es el control prioritario en una aplicación de una sola página.",
        "Comprobar en el Administrador de eventos que los cuatro eventos llegan con sus valores.",
        "Comprobar que el Advanced Matching se recibe correctamente.",
        "Comprobar que ninguna etiqueta se envía antes de aceptar el banner de cookies.",
      ],
    },

    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Instalar el píxel de TikTok en una tienda Qweekle V3",
      description:
        "Qweekle ofrece módulos GA4, Meta y Google Ads, pero no TikTok. Es la única plataforma que hay que construir por completo a mano, eso sí, sobre una base limpia.",
      chapo:
        "Es la única plataforma para la que Qweekle no proporciona módulo. Hay que construirlo todo, pero sobre unos cimientos limpios, ya que el módulo Base aporta ya las variables, los activadores y el Consent Mode.",
      prerequis: [
        "El módulo Base está importado: sus variables y sus activadores se reutilizan tal cual.",
        "Un ID de píxel de TikTok, disponible en el Administrador de eventos de TikTok.",
      ],
      variables: [
        {
          nom: "Qweekle - DLV - ecommerce.value",
          type: "Variable de capa de datos — incluida en el módulo Base",
          cle: "ecommerce.value",
        },
        {
          nom: "Qweekle - DLV - ecommerce.currency",
          type: "Variable de capa de datos — incluida en el módulo Base",
          cle: "ecommerce.currency",
        },
        {
          nom: "Qweekle - DLV - ecommerce.transaction_id",
          type: "Variable de capa de datos — incluida en el módulo Base",
          cle: "ecommerce.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Qweekle - CE - view_item",
          type: "Evento personalizado — incluido en el módulo Base",
          condition: "view_item",
        },
        {
          nom: "Qweekle - CE - add_to_cart",
          type: "Evento personalizado — incluido en el módulo Base",
          condition: "add_to_cart",
        },
        {
          nom: "Qweekle - CE - begin_checkout",
          type: "Evento personalizado — incluido en el módulo Base",
          condition: "begin_checkout",
        },
        {
          nom: "Qweekle - CE - purchase",
          type: "Evento personalizado — incluido en el módulo Base",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "TikTok Ads | Main Tag",
          type: "HTML personalizado",
          declencheur: "All Pages",
          note: "Condiciona esta etiqueta al consentimiento, como hacen los módulos del editor: el módulo Base proporciona los parámetros necesarios.",
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
          type: "HTML personalizado",
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
          type: "HTML personalizado",
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
          type: "HTML personalizado",
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
          type: "HTML personalizado",
          declencheur: "Qweekle - CE - purchase",
          note: "El valor que hay que enviar es el valor del pedido, no el importe cobrado online. TikTok espera CompletePayment, no Purchase.",
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
          titre: "Olvidar condicionar las etiquetas al consentimiento",
          desc: "Los módulos del editor gestionan el consentimiento; tus etiquetas de TikTok no, porque las escribes tú. Es la trampa propia de esta plataforma en Qweekle: todo el resto del contenedor es conforme, y TikTok se cuela.",
        },
        {
          titre: "Usar el vocabulario de Meta",
          desc: "CompletePayment y no Purchase. Un evento mal nombrado no aparece en ningún informe de TikTok.",
        },
        {
          titre: "Enviar el importe cobrado en lugar del valor del pedido",
          desc: "En un parque que trabaja con anticipos, la diferencia es enorme. La regla es la misma que en las demás plataformas: el valor, siempre.",
        },
        {
          titre: "Olvidar ttq.page() en la etiqueta base",
          desc: "Sin esta llamada, las audiencias de remarketing se quedan vacías aunque las conversiones se registren.",
        },
      ],
      verification: [
        "Instalar la extensión TikTok Pixel Helper y recorrer una compra completa.",
        "Comprobar que ninguna etiqueta de TikTok se envía antes de aceptar el banner de cookies.",
        "Comprobar en el Administrador de eventos de TikTok que los cuatro eventos llegan con sus valores.",
        "Comprobar que el valor de la compra corresponde al pedido, no al importe cobrado.",
      ],
    },
  ],
};

/* ══════════════════════════ VERSIÓN 2 ══════════════════════════ */

const V2: Contenu = {
  pilier: {
    titre: "Plan de etiquetado Qweekle V2: medir tus conversiones",
    description:
      "La V2 de Qweekle sigue desplegada en muchos parques. Su capa de datos mezcla nombres conformes y una nomenclatura obsoleta: así es como hay que tratarla.",
    chapo:
      "La V2 sigue en producción en muchos parques, y el editor no publica ninguna documentación sobre ella. Lo que sigue procede de los contenedores que gestionamos. Dos diferencias importantes con la V3: la nomenclatura mezcla nombres conformes y herencia de Universal Analytics, y no existe ni módulo listo para importar ni mecanismo de consentimiento.",
    architecture: {
      intro: "Una arquitectura más sencilla que la V3, pero con menos herramientas.",
      points: [
        "La tienda funciona en un subdominio dedicado por cliente, con el formato monparc.qweekle.com/shop/monparc.",
        "Es un dominio raíz distinto del del parque: el seguimiento entre dominios es obligatorio.",
        "Cada operador puede colocar su propio contenedor de Google Tag Manager en la tienda.",
        "Hay que instalar el mismo contenedor en ambos lados, en la web del parque y en la tienda.",
        "Las páginas de la tienda están en noindex: nunca aparecerán en Google.",
        "Ningún módulo listo para importar, ningún mecanismo de consentimiento incluido: hay que construirlo todo.",
      ],
    },
    dataLayer: {
      intro:
        "Siete eventos, registrados en embudos en producción. El editor no los documenta.",
      events: [
        { nom: "view_item", note: "consulta de un producto" },
        { nom: "add_to_cart", note: "añadido al carrito" },
        { nom: "remove_from_cart", note: "eliminación del carrito" },
        { nom: "begin_checkout", note: "entrada en el embudo de pago" },
        {
          nom: "checkout_progress",
          note: "avance en el pago: nomenclatura obsoleta",
        },
        {
          nom: "set_checkout_option",
          note: "elección de una opción: nomenclatura obsoleta",
        },
        { nom: "purchase", note: "reserva pagada" },
      ],
      variables: [
        "ecommerce.value — importe de la transacción",
        "ecommerce.currency — moneda",
        "ecommerce.transaction_id — identificador del pedido",
      ],
      remarque:
        "Dos de estos nombres, checkout_progress y set_checkout_option, proceden de la especificación de Universal Analytics que Google sustituyó en 2023. GA4 no los reconoce: espera add_shipping_info y add_payment_info. Si se transmiten tal cual, llegan como eventos personalizados y no alimentan el embudo de compra. Otra sutileza: begin_checkout y checkout_progress conviven, y hay que decidir cuál representa el inicio del pago so pena de contar dos veces el mismo paso. La V3 resolvió ambos problemas: si tu parque puede migrar, es el argumento técnico más sólido que poner en la balanza.",
    },
    parcours: {
      intro:
        "Visión general. Todo debe construirse manualmente: esta versión no incluye ningún módulo.",
      etapes: [
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
          ads: "Conversión secundaria, con valor",
          meta: "AddToCart",
          tiktok: "AddToCart",
        },
        {
          etape: "Inicio del pago",
          source: "begin_checkout",
          ga4: "begin_checkout",
          ads: "Conversión secundaria, con valor",
          meta: "InitiateCheckout",
          tiktok: "InitiateCheckout",
        },
        {
          etape: "Paso de pago",
          source: "checkout_progress",
          ga4: "add_payment_info — por renombrar",
          ads: "—",
          meta: "—",
          tiktok: "—",
        },
        {
          etape: "Reserva pagada",
          source: "purchase",
          ga4: "purchase",
          ads: "Conversión principal, con orderId",
          meta: "Purchase, con eventID",
          tiktok: "CompletePayment",
        },
      ],
    },
    ordre: [
      "Montar la base: contenedor en los dos dominios, variables de capa de datos, activadores.",
      "Google Analytics 4 primero: es la fuente de verdad que servirá para controlar el resto.",
      "Después Google Ads, con el seguimiento entre dominios: ahí es donde se decide la atribución.",
      "Meta y TikTok al final, con los mismos activadores.",
      "Prever un mecanismo de consentimiento: esta versión no incluye nada.",
    ],
  },

  plateformes: [
    {
      slug: "google-analytics",
      nom: "Google Analytics 4",
      titre: "Instalar Google Analytics 4 en una tienda Qweekle V2",
      description:
        "En la V2 de Qweekle, el trabajo consiste en traducir checkout_progress y en no renombrar lo que ya es conforme. Variables, activadores y etiquetas, paso a paso.",
      chapo:
        "Qweekle V2 ya envía una capa de comercio electrónico: el trabajo consiste menos en crear eventos que en traducir los que llevan un nombre obsoleto, y sobre todo en no inventar otros nuevos.",
      prerequis: [
        "El contenedor de Google Tag Manager del parque está instalado en la web y en la tienda.",
        "Un ID de medición de GA4 con el formato G-XXXXXXXXXX.",
        "El seguimiento entre dominios está configurado entre el dominio del parque y qweekle.com.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de capa de datos",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de capa de datos",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de capa de datos",
          cle: "ecommerce.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Event | View Item",
          type: "Evento personalizado",
          condition: "view_item",
        },
        {
          nom: "Event | Add To Cart",
          type: "Evento personalizado",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Evento personalizado",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Add Payment Info",
          type: "Evento personalizado",
          condition: "checkout_progress",
          note: "Se escucha el nombre que envía Qweekle y se envía con el nombre que espera GA4.",
        },
        {
          nom: "Event | Purchase",
          type: "Evento personalizado",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Google Analytics | Main Tag",
          type: "Etiqueta de Google",
          declencheur: "Inicialización - Todas las páginas",
          champs: [{ cle: "ID de etiqueta", valeur: "G-XXXXXXXXXX" }],
          note: "Debe activarse tanto en la web del parque como en la tienda.",
        },
        {
          nom: "Event Google Analytics | Add To Cart",
          type: "Google Analytics: evento de GA4",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "Nombre del evento", valeur: "add_to_cart" },
            { cle: "Datos de comercio electrónico", valeur: "Activado — capa de datos" },
          ],
        },
        {
          nom: "Event Google Analytics | Begin Checkout",
          type: "Google Analytics: evento de GA4",
          declencheur: "Event | Begin Checkout",
          champs: [
            { cle: "Nombre del evento", valeur: "begin_checkout" },
            { cle: "Datos de comercio electrónico", valeur: "Activado — capa de datos" },
          ],
        },
        {
          nom: "Event Google Analytics | Add Payment Info",
          type: "Google Analytics: evento de GA4",
          declencheur: "Event | Add Payment Info",
          champs: [
            { cle: "Nombre del evento", valeur: "add_payment_info" },
            { cle: "Datos de comercio electrónico", valeur: "Activado — capa de datos" },
          ],
          note: "Es la traducción de checkout_progress. No lo transmitas nunca tal cual.",
        },
        {
          nom: "Event Google Analytics | Purchase",
          type: "Google Analytics: evento de GA4",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Nombre del evento", valeur: "purchase" },
            { cle: "Datos de comercio electrónico", valeur: "Activado — capa de datos" },
            { cle: "Parámetro value", valeur: "{{ecommerce.value}}" },
            { cle: "Parámetro currency", valeur: "{{ecommerce.currency}}" },
          ],
        },
      ],
      pieges: [
        {
          titre: "Transmitir checkout_progress tal cual",
          desc: "Llega a GA4 como evento personalizado, sin entrar nunca en el embudo. Renombrarlo a add_payment_info cuesta un campo y lo cambia todo.",
        },
        {
          titre: "Contar dos veces el inicio del pago",
          desc: "La V2 envía begin_checkout y checkout_progress. Si ambos activan un evento de inicio de pago, el embudo muestra el doble de entradas que en la realidad.",
        },
        {
          titre: "Renombrar los eventos para hacerlos legibles",
          desc: "GA4 espera nombres en minúsculas con guiones bajos. Un evento llamado «Add To Cart» no alimenta ni el informe de monetización ni el embudo.",
        },
        {
          titre: "Olvidar los datos de comercio electrónico en los pasos intermedios",
          desc: "La compra casi siempre está bien configurada; el carrito, mucho menos. Sin la recuperación de los datos de comercio electrónico, no llegan ni productos ni valor.",
        },
      ],
      verification: [
        "En la vista previa de Tag Manager, recorrer una compra de principio a fin.",
        "Comprobar en DebugView que los eventos llegan con sus nombres normalizados.",
        "Comprobar que la compra lleva value, currency, transaction_id y la matriz items.",
        "Comprobar que qweekle.com no aparece en el informe de fuentes de tráfico.",
      ],
    },

    {
      slug: "google-ads",
      nom: "Google Ads",
      titre: "Seguimiento de conversiones de Google Ads en una tienda Qweekle V2",
      description:
        "El dominio qweekle.com en el Conversion Linker y el ID de pedido solo en la compra: las etiquetas que crear en la V2 y los errores que falsean la atribución.",
      chapo:
        "Aquí es donde se juega lo esencial. La tienda V2 vive en un dominio distinto del de la web del parque: sin un seguimiento entre dominios bien configurado, Google Ads pierde el rastro del clic y atribuye las ventas al canal equivocado.",
      prerequis: [
        "El contenedor de Google Tag Manager del parque está instalado en la web y en la tienda.",
        "Un ID de Google Ads con el formato AW-XXXXXXXXX.",
        "Las acciones de conversión están creadas en Google Ads, cada una con su etiqueta.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de capa de datos",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de capa de datos",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de capa de datos",
          cle: "ecommerce.transaction_id",
        },
        {
          nom: "Automatic Data Collection",
          type: "Datos proporcionados por el usuario — Google Ads",
          cle: "Modo automático",
          note: "La V2 no proporciona email con hash: la detección automática es la única forma de alimentar las conversiones mejoradas.",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Add To Cart",
          type: "Evento personalizado",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Evento personalizado",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Purchase",
          type: "Evento personalizado",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Google Ads | Main Tag",
          type: "Etiqueta de Google",
          declencheur: "Inicialización - Todas las páginas",
          champs: [{ cle: "ID de etiqueta", valeur: "AW-XXXXXXXXX" }],
        },
        {
          nom: "Google Ads | Conversion Linker",
          type: "Vinculación de conversiones",
          declencheur: "Inicialización - Todas las páginas",
          champs: [
            { cle: "Habilitar la vinculación entre dominios", valeur: "Sí" },
            { cle: "Aceptar parámetros entrantes", valeur: "Sí" },
            { cle: "Dominios que vincular", valeur: "monparc.fr, qweekle.com" },
          ],
          note: "La etiqueta más importante de toda la instalación. Dominios sin más, sin protocolo ni barra final.",
        },
        {
          nom: "Google Ads | Automatic Data Collection",
          type: "Datos proporcionados por el usuario — Google Ads",
          declencheur: "Todas las páginas",
          champs: [
            { cle: "ID de conversión", valeur: "AW-XXXXXXXXX" },
            {
              cle: "Variable de datos de usuario",
              valeur: "{{Automatic Data Collection}}",
            },
          ],
        },
        {
          nom: "Google Ads | Event Add To Cart",
          type: "Seguimiento de conversiones de Google Ads",
          declencheur: "Event | Add To Cart",
          champs: [
            { cle: "Valor de conversión", valeur: "{{ecommerce.value}}" },
            { cle: "Código de moneda", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de pedido", valeur: "dejar vacío" },
          ],
          note: "No rellenes aquí el ID de pedido bajo ningún concepto: Google Ads lo usa para deduplicar, y fusionaría esta conversión con la compra.",
        },
        {
          nom: "Google Ads | Event Purchase",
          type: "Seguimiento de conversiones de Google Ads",
          declencheur: "Event | Purchase",
          champs: [
            { cle: "Valor de conversión", valeur: "{{ecommerce.value}}" },
            { cle: "Código de moneda", valeur: "{{ecommerce.currency}}" },
            { cle: "ID de pedido", valeur: "{{ecommerce.transaction_id}}" },
            { cle: "Conversiones mejoradas", valeur: "Activadas" },
          ],
          note: "La única etiqueta que debe llevar el ID de pedido.",
        },
      ],
      pieges: [
        {
          titre: "El dominio del motor ausente de la lista",
          desc: "Tras una migración desde otro motor, el dominio antiguo se queda en la lista y qweekle.com no se añade nunca. Las conversiones se siguen contando, pero atribuidas al motor de reservas. Es el error más frecuente y el más costoso.",
        },
        {
          titre: "Los dominios introducidos con el protocolo",
          desc: "Escribir https://monparc.fr/ en lugar de monparc.fr. La interfaz lo acepta, la decoración de enlaces no se produce y nada avisa.",
        },
        {
          titre: "El ID de pedido en los pasos intermedios",
          desc: "Si se rellena en otro sitio que no sea la compra, hace que Google Ads fusione las conversiones. Síntoma: se registran menos conversiones que ventas reales.",
        },
        {
          titre: "Dos conversiones para la misma acción",
          desc: "Una conversión en el clic del botón «Reservar» y otra en la llegada a la tienda cuentan dos veces al mismo visitante. Quédate con la que se activa a la llegada.",
        },
      ],
      verification: [
        "Hacer clic hacia la tienda desde la web del parque y comprobar que el parámetro de vinculación se añade a la URL.",
        "Comprobar en la vista previa que el Conversion Linker se activa en ambos lados.",
        "Hacer un pedido de prueba y comprobar que aparece en un plazo de 48 horas, con su valor.",
        "Comparar las conversiones de Google Ads con las reservas en caja durante un mes completo.",
      ],
    },

    {
      slug: "meta-ads",
      nom: "Meta Ads",
      titre: "Instalar el píxel de Meta en una tienda Qweekle V2",
      description:
        "Sin módulo en la V2: el código fbq que copiar etiqueta por etiqueta, con el valor y la moneda leídos de la capa de datos, y los errores que hay que evitar.",
      chapo:
        "Esta versión no incluye ningún módulo: todo pasa por etiquetas de HTML personalizado. Es sencillo, pero también es ahí donde se cuelan con más frecuencia los errores de valor y de moneda.",
      prerequis: [
        "El contenedor de Google Tag Manager del parque está instalado en la web y en la tienda.",
        "Un ID de píxel de Meta de 15 o 16 cifras.",
        "Las variables de capa de datos están creadas.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de capa de datos",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de capa de datos",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de capa de datos",
          cle: "ecommerce.transaction_id",
          note: "Sirve como ID de evento para la deduplicación.",
        },
      ],
      declencheurs: [
        {
          nom: "Event | View Item",
          type: "Evento personalizado",
          condition: "view_item",
        },
        {
          nom: "Event | Add To Cart",
          type: "Evento personalizado",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Evento personalizado",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Purchase",
          type: "Evento personalizado",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "Meta Ads | Main Tag",
          type: "HTML personalizado",
          declencheur: "Todas las páginas",
          note: "Debe activarse tanto en la web del parque como en la tienda. Si falta la etiqueta base en la tienda, los eventos de compra desaparecen sin error.",
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
          type: "HTML personalizado",
          declencheur: "Event | Add To Cart",
          note: "El valor y la moneda son imprescindibles. Sin ellos, el algoritmo no distingue una entrada de 15 € de un cumpleaños de 300 €.",
          code: `<script>
  fbq('track', 'AddToCart', {
    value: {{ecommerce.value}},
    currency: {{ecommerce.currency}}
  });
</script>`,
        },
        {
          nom: "Event Meta Ads | Initiate Checkout",
          type: "HTML personalizado",
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
          type: "HTML personalizado",
          declencheur: "Event | Purchase",
          note: "El ID de evento permitirá añadir más adelante la API de conversiones sin duplicar las compras.",
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
          titre: "El añadido al carrito sin valor",
          desc: "fbq('track', 'AddToCart') sin parámetros es el caso más extendido. El evento se registra, pero sin importe: imposible optimizar según el valor del carrito.",
        },
        {
          titre: "La moneda escrita a mano",
          desc: "currency: 'EUR' fijado en la etiqueta en lugar de leer la capa de datos. Sin consecuencias en Francia, pero la incoherencia con GA4 hace imposibles las conciliaciones.",
        },
        {
          titre: "La compra sin ID de evento",
          desc: "Sin eventID, añadir después la API de conversiones duplica todas las compras.",
        },
        {
          titre: "El píxel base ausente de la tienda",
          desc: "Si la etiqueta base solo se activa en la web del parque, los eventos enviados desde la tienda no tienen biblioteca a la que llamar y desaparecen en silencio.",
        },
      ],
      verification: [
        "Instalar la extensión Meta Pixel Helper y recorrer una compra completa.",
        "Comprobar que el píxel base también se carga en las páginas de la tienda.",
        "Comprobar que los tres eventos llegan con su valor y su moneda.",
        "Comprobar que la compra lleva un ID de evento.",
      ],
    },

    {
      slug: "tiktok-ads",
      nom: "TikTok Ads",
      titre: "Instalar el píxel de TikTok en una tienda Qweekle V2",
      description:
        "Mismo principio que Meta en la V2: etiquetas HTML y los mismos activadores. Ojo al nombre de evento que espera TikTok, que es distinto del que usa Meta.",
      chapo:
        "TikTok funciona como Meta en esta versión: etiquetas de HTML personalizado, los mismos activadores, pero una nomenclatura propia. Si Meta ya está instalado, cuenta con media hora.",
      prerequis: [
        "El contenedor de Google Tag Manager del parque está instalado en la web y en la tienda.",
        "Un ID de píxel de TikTok.",
        "Los activadores ya están creados para Meta o GA4: se reutilizan tal cual.",
      ],
      variables: [
        {
          nom: "ecommerce.value",
          type: "Variable de capa de datos",
          cle: "ecommerce.value",
        },
        {
          nom: "ecommerce.currency",
          type: "Variable de capa de datos",
          cle: "ecommerce.currency",
        },
        {
          nom: "ecommerce.transaction_id",
          type: "Variable de capa de datos",
          cle: "ecommerce.transaction_id",
        },
      ],
      declencheurs: [
        {
          nom: "Event | Add To Cart",
          type: "Evento personalizado",
          condition: "add_to_cart",
        },
        {
          nom: "Event | Begin Checkout",
          type: "Evento personalizado",
          condition: "begin_checkout",
        },
        {
          nom: "Event | Purchase",
          type: "Evento personalizado",
          condition: "purchase",
        },
      ],
      balises: [
        {
          nom: "TikTok Ads | Main Tag",
          type: "HTML personalizado",
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
          type: "HTML personalizado",
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
          type: "HTML personalizado",
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
          type: "HTML personalizado",
          declencheur: "Event | Purchase",
          note: "TikTok espera CompletePayment, no Purchase. Una etiqueta mal nombrada no aparece en ningún informe.",
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
          titre: "Usar el vocabulario de Meta",
          desc: "Copiar la etiqueta de Meta sustituyendo simplemente fbq por ttq produce un evento Purchase que TikTok ignora.",
        },
        {
          titre: "Olvidar ttq.page() en la etiqueta base",
          desc: "Sin esta llamada, la página vista no se envía nunca: las audiencias de remarketing se quedan vacías.",
        },
        {
          titre: "Cargar el píxel dos veces",
          desc: "Si TikTok se instaló primero directamente en el código de la web y después se volvió a añadir en Tag Manager, cada evento se envía por duplicado.",
        },
      ],
      verification: [
        "Instalar la extensión TikTok Pixel Helper y recorrer una compra completa.",
        "Comprobar que los tres eventos llegan con valor y moneda.",
        "Comprobar que la página vista se registra tanto en la web como en la tienda.",
        "Comprobar que ningún evento aparece duplicado.",
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════ */

export const QWEEKLE_ES: GuideOutil = {
  slug: "qweekle",
  nom: "Qweekle",
  versions: [
    {
      id: "v3",
      label: "Versión 3",
      statut: "la versión actual",
      reconnaitre: "tu tienda está en una dirección .qweekle.shop",
    },
    {
      id: "v2",
      label: "Versión 2",
      statut: "la versión anterior, todavía muy desplegada",
      reconnaitre: "tu tienda está en una dirección .qweekle.com",
    },
  ],
  variantes: { v3: V3, v2: V2 },
  pilier: V3.pilier,
  plateformes: V3.plateformes,
};
