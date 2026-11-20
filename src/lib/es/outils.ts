import type { Outil } from "@/lib/outils";

/* ─────────────────────────────────────────────────────────────
   Fichas « herramientas para parques de ocio » — versión española.
   Misma estructura y mismo orden que OUTILS en outils.ts.
   Regla editorial: solo lo verificable.
   ───────────────────────────────────────────────────────────── */

export const OUTILS_ES: Outil[] = [
  {
    slug: "qweekle",
    nom: "Qweekle",
    baseline:
      "Plataforma francesa de venta de entradas y control de accesos, pensada para recintos con mucha afluencia y aforo limitado.",
    description:
      "Qweekle: venta de entradas, control de accesos y aforos. Para quién es, sus funciones clave, sus precios y lo que revela una instalación real en producción.",
    pourQuiCourt:
      "Recintos con aforo y control de accesos: parques de animales, acuáticos, museos, trampolines.",
    editeur: { pays: "Francia" },
    chiffres: [
      { valeur: "10+", label: "sectores cubiertos" },
      { valeur: "7/7", label: "soporte anunciado" },
      { valeur: "API", label: "módulos interconectados" },
    ],
    pourQui: {
      intro:
        "Qweekle se dirige a los operadores cuyo negocio depende del flujo de entrada: gestionar un aforo, controlar accesos, vender entradas con franja horaria y absorber picos de afluencia sin generar colas.",
      profils: [
        "Parques de animales, zoos y acuarios",
        "Parques acuáticos y piscinas con aforo regulado",
        "Trampoline parks y parques infantiles cubiertos",
        "Museos, castillos y lugares patrimoniales",
        "Parques de aventura, cuevas y recintos subterráneos",
        "Escape rooms, láser games y centros de realidad virtual",
        "Instalaciones deportivas: fútbol sala, escalada, pista de hielo",
      ],
      moinsAdapte: [
        "Los centros cuyo núcleo de actividad es el cronometraje deportivo: Qweekle no ofrece módulo de live timing.",
        "Los operadores que buscan una tarifa pública para decidir rápido: no se publica ningún precio en línea.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Venta de entradas",
        desc: "Entradas abiertas o con franja horaria, de uso único o múltiple para los abonos, y ticketing privado para revendedores y socios. Emisión como entrada electrónica o en impresión térmica, en rollo o en hojas A4, con códigos de barras numerados de un solo uso.",
      },
      {
        titre: "Control de accesos",
        desc: "Control fijo o móvil vinculado a las entradas emitidas. Es el punto fuerte que reivindica la plataforma y lo que la distingue de las soluciones puramente transaccionales.",
      },
      {
        titre: "Caja/TPV",
        desc: "Cobro in situ, conectado a los mismos catálogos de productos y tarifas que la venta en línea.",
      },
      {
        titre: "Venta en línea",
        desc: "Tienda de reserva y pago alojada por Qweekle, sincronizada en tiempo real con la planificación y los aforos.",
      },
      {
        titre: "Planificación y aforos",
        desc: "Calendario de actividades con gestión de capacidades, equipos y taquillas de vestuario.",
      },
      {
        titre: "Tarificación",
        desc: "Tarifas adaptables por producto y por tipo de cliente, precios en horas punta y valle o por tiempo de uso, y cantidades mínimas y máximas por pedido.",
      },
      {
        titre: "Marketing y reporting",
        desc: "Módulos de fidelización y de seguimiento de actividad. Su alcance exacto no se detalla públicamente.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Qweekle no publica ninguna tarifa. El precio se obtiene por presupuesto, tras analizar la necesidad.",
      lignes: [
        { label: "Suscripción mensual", valeur: "No comunicado" },
        { label: "Gastos de puesta en marcha", valeur: "No comunicados" },
        { label: "Comisión sobre las reservas en línea", valeur: "No comunicada" },
        {
          label: "Hardware (caja, impresora, control de accesos)",
          valeur: "No comunicado",
        },
      ],
      manquant: [
        "Las tarifas por nivel y lo que incluye cada uno",
        "Si existe una comisión sobre las ventas en línea y cuál es su porcentaje",
        "El coste del hardware de control de accesos, que pesa mucho en este tipo de instalación",
        "La duración del compromiso y las condiciones de salida",
      ],
    },
    constate: {
      intro:
        "Dos generaciones de Qweekle conviven en producción, y la diferencia entre ambas en materia de medición es enorme. Operamos parques en una y en otra. Verificado en octubre de 2026.",
      points: [
        "La versión 3 aloja la tienda en una dirección .qweekle.shop y el pago en un dominio dedicado que no carga ninguna etiqueta, mientras que la web corporativa del parque sigue siendo el punto de partida. Tres dominios, y solo uno medible.",
        "La versión 2, todavía muy extendida, sitúa la tienda en una dirección .qweekle.com. Es la forma más rápida de saber cuál tienes delante.",
        "La versión 3 ofrece cuatro módulos de Google Tag Manager listos para importar: un módulo base obligatorio y, después, Google Analytics, Meta y Google Ads. Ningún otro proveedor del panel llega tan lejos.",
        "Su capa de datos incluye trece eventos con nombres conformes a la especificación actual, frente a siete en la versión 2, dos de los cuales siguen usando una nomenclatura que Google abandonó en 2023.",
        "La versión 3 envía además el email del cliente ya hasheado, lo que alimenta sin esfuerzo las conversiones mejoradas y la coincidencia avanzada. Nadie más lo hace en este panel.",
        "Las páginas de la tienda están en noindex en ambas versiones: todo el posicionamiento SEO debe vivir en la web del parque.",
      ],
    },
    vigilance: [
      "Como la tienda está alojada en qweekle.com, el visitante cambia de dominio entre la web del parque y el pago. Sin una configuración específica, las estadísticas atribuyen parte de las ventas a «qweekle.com» en lugar de a la fuente real: publicidad, Google o redes sociales.",
      "Conviene entender la regla monetaria de la versión 3 antes de cualquier implementación: el valor de un pedido corresponde a la facturación, no al importe cobrado en línea. Un bono regalo o un anticipo no lo reducen; un código de descuento sí. Sin embargo, la interfaz solo ofrece un campo para introducir un cupón o un bono regalo. Un parque que trabaja con anticipos y mide el importe cobrado infradeclara masivamente sus ventas, y el saldo pagado in situ nunca se recupera.",
      "En la versión 2, dos eventos usan una nomenclatura que Google abandonó en 2023. Siguen siendo aprovechables, pero exigen un trabajo de traducción que la versión 3 elimina por completo.",
      "Sin tarifas públicas: hay que pedir presupuesto para comparar, lo que alarga la fase de elección.",
    ],
    lacunes: [
      "Tarifas completas y niveles",
      "Existencia de una comisión sobre las reservas en línea",
      "Plazo entre la firma y la puesta en marcha",
      "Condiciones de exportación de la base de clientes en caso de baja",
      "Condiciones y coste de una migración de la versión 2 a la versión 3",
    ],
    site: "https://www.qweekle.com/",
    sources: [
      { label: "Web oficial de Qweekle", url: "https://www.qweekle.com/" },
      {
        label: "Qweekle — módulo de venta de entradas",
        url: "https://www.qweekle.com/fonctionalites/billetterie-logiciel-loisir-culture/",
      },
      {
        label: "Qweekle — parques de atracciones",
        url: "https://www.qweekle.com/secteurs/logiciel-billetterie-gestion-controle-dacces-parc-dattractions-marketing/",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "playpro",
    nom: "PlayPro",
    baseline:
      "Solución francesa todo en uno, la única del panel que muestra públicamente su precio y presume de funcionar sin permanencia.",
    description:
      "PlayPro: el único del panel que publica su precio, desde 39 €/mes sin permanencia. 65 módulos y 14 sectores: para quién es y qué cubre realmente la herramienta.",
    pourQuiCourt:
      "Negocios que quieren un precio claro y reunirlo todo: pádel, bolera, escape room, karaoke.",
    editeur: { pays: "Francia", depuis: "2023", groupe: "Nehos Groupe" },
    chiffres: [
      { valeur: "65+", label: "módulos anunciados" },
      { valeur: "39 €", label: "precio de entrada mensual" },
      { valeur: "14+", label: "sectores cubiertos" },
    ],
    pourQui: {
      intro:
        "PlayPro se dirige a los operadores que quieren sustituir un montón de herramientas por una sola plataforma, con un precio conocido de antemano. Su posicionamiento es explícitamente el de la relación entre precio y cobertura funcional.",
      profils: [
        "Clubes de pádel, campos de golf y negocios de reserva por franjas",
        "Boleras, láser games y karaokes",
        "Escape rooms, quiz rooms y centros de realidad virtual",
        "Paintball, parques de trampolines y parques infantiles",
        "Karting y centros multiactividad",
        "Pequeños negocios e independientes, ya que la oferta de entrada no tiene permanencia",
      ],
      moinsAdapte: [
        "Los recintos cuyo principal reto es el control de accesos físico con grandes aforos: no es el eje que destaca.",
        "Los centros de karting que necesitan un cronometraje integrado: PlayPro no reivindica módulo de live timing.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Reserva en línea",
        desc: "Reservas 24 h/24 y gestión centralizada de disponibilidades y cancelaciones. La oferta puede difundirse simultáneamente en una veintena de plataformas, entre ellas Tripadvisor, Expedia y Booking.",
      },
      {
        titre: "Caja/TPV",
        desc: "Cobro in situ conectado al mismo catálogo que la reserva.",
      },
      {
        titre: "CRM y marketing",
        desc: "Base de clientes y automatización de emails. Es el punto en el que PlayPro se diferencia de forma más directa de sus competidores históricos.",
      },
      {
        titre: "Fidelización y tarjetas regalo",
        desc: "Programas de fidelización y venta de bonos regalo integrados.",
      },
      {
        titre: "App móvil",
        desc: "Aplicación destinada a los clientes finales del centro.",
      },
      {
        titre: "Web o integración",
        desc: "El operador puede conservar su web actual e integrar en ella el sistema de reserva y pago, o encargar a PlayPro una web con tienda en línea.",
      },
      {
        titre: "Recursos humanos y automatización",
        desc: "Planificación del personal y automatización de tareas administrativas.",
      },
      {
        titre: "Contabilidad",
        desc: "Generación de presupuestos y facturas.",
      },
      {
        titre: "Inteligencia artificial",
        desc: "Agente de reservas y asistente de análisis. Funciones recientes cuyo alcance real está por demostrar.",
      },
      {
        titre: "Integraciones",
        desc: "Stripe, Zapier, Make, Google Business, Google Calendar, Twilio, Mailjet, Google Analytics y Google Tag Manager, además de una API abierta y webhooks.",
      },
    ],
    tarifs: {
      publie: true,
      intro:
        "PlayPro es la única herramienta del panel que muestra un precio. Pero ojo: los importes varían según las páginas del proveedor, lo que sugiere varios niveles cuya estructura no se detalla.",
      lignes: [
        {
          label: "Precio de entrada",
          valeur: "Desde 39 €/mes, sin permanencia",
        },
        {
          label: "Precio citado en su blog",
          valeur: "79 €/mes",
          source: "artículo comparativo publicado por PlayPro",
        },
        {
          label: "Argumento comparativo que muestran",
          valeur: "Sustituye un conjunto de herramientas valorado en 397 €/mes",
        },
        {
          label: "Comisión sobre las reservas en línea",
          valeur: "No comunicada",
        },
        { label: "Gastos de puesta en marcha", valeur: "No comunicados" },
      ],
      manquant: [
        "El detalle de los niveles entre 39 € y 79 €, y lo que incluye cada uno",
        "Lo que pasa a ser un extra: app móvil, módulos de IA, web",
        "Si existe una comisión sobre las ventas en línea y cuál es su porcentaje",
        "El coste del hardware de caja",
      ],
    },
    vigilance: [
      "El proveedor comunica volúmenes de clientes distintos según la página, desde 150 operadores hasta más de 650 establecimientos. El orden de magnitud es creíble; la cifra exacta, no.",
      "La solución se lanzó en 2023: es claramente más joven que sus competidores, lo que juega en ambos sentidos: menos deuda técnica, pero menos recorrido en explotación.",
      "PlayPro publica comparativas que la sitúan por delante de sus competidores. Hay que leerlas como comunicación comercial, no como una fuente neutral.",
    ],
    lacunes: [
      "Estructura exacta de los niveles de precio",
      "Arquitectura del embudo de reserva: ¿se queda en el dominio del parque?",
      "Existencia de una comisión sobre las reservas en línea",
      "Funcionamiento concreto de las integraciones anunciadas con Analytics y Tag Manager",
      "Plazo de puesta en marcha y contenido de la formación",
    ],
    site: "https://playpro.fr/",
    sources: [
      { label: "Web oficial de PlayPro", url: "https://playpro.fr/" },
      { label: "PlayPro — casos de clientes", url: "https://playpro.fr/cas-clients/" },
      { label: "Nehos Groupe", url: "https://nehos-groupe.com/playpro/" },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "apex-timing",
    nom: "Apex Timing",
    baseline:
      "Especialista francés del karting, nacido del cronometraje. Más de 900 clientes en 67 países, y la única solución del panel que integra de forma nativa el live timing.",
    description:
      "Apex Timing: 900 clientes en 67 países, el especialista del karting nacido del cronometraje. Para quién es, funciones, precios y comisión, con su documentación.",
    pourQuiCourt:
      "Karting de ocio y centros multiactividad construidos junto a una pista.",
    editeur: { pays: "Francia", depuis: "2011" },
    chiffres: [
      { valeur: "900+", label: "clientes" },
      { valeur: "67", label: "países" },
      { valeur: "0 %", label: "de comisión sobre las ventas en línea" },
    ],
    pourQui: {
      intro:
        "Apex Timing viene del cronometraje antes que de la gestión: fundada en 2011 en Annecy, la empresa cronometraba campeonatos del mundo y de Europa de karting desde sus inicios. Por eso es la opción por defecto de los kartings de ocio: el mismo software gestiona la carrera y la caja, sin pasarela que mantener entre dos proveedores.",
      profils: [
        "Kartings de ocio, tanto indoor como outdoor",
        "Centros multiactividad construidos en torno a una pista, con hasta una docena de actividades en un mismo software",
        "Operadores que organizan carreras, mangas, resistencias y campeonatos",
        "Grupos con varios centros: los bonos regalo y los datos de clientes se comparten entre establecimientos",
        "Negocios con bolera o arcade, gracias a las conexiones con Brunswick, QubicaAMF, Intercard y Playzwell",
      ],
      moinsAdapte: [
        "Los parques sin actividad cronometrada: buena parte del valor del producto deja de servir.",
        "Los operadores que quieren vender en línea desde la oferta de entrada: el e-commerce solo aparece a partir del pack intermedio.",
        "Quienes piensan conectar una herramienta externa por API: la conexión solo existe en el pack más alto.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Cronometraje y live timing",
        desc: "Medición al milisegundo, gestión multibucle con paradas en boxes, división de la pista en tres sectores y penalizaciones automáticas o aplicadas en directo. Compatible con Mylaps, RaceResult, Chronolec, Tag Heuer, Kart-Timer y MyWER. Es la base histórica del producto y su verdadera diferencia.",
      },
      {
        titre: "Gestión de pista y de carrera",
        desc: "Asignación de karts, Arrive & Drive, sprints y resistencias con creación de equipos e identificación RFID. Gestión de karts eléctricos con control de velocidad y boost, y cambio rápido de configuración de pista: normal, XL o invertida.",
      },
      {
        titre: "Pantallas y briefing",
        desc: "Pantallas de resultados, señalización dinámica y briefing de seguridad en vídeo con la imagen del centro, subtitulado en su idioma. Opción RDisplay: una pantalla embarcada en el volante que muestra las banderas al piloto.",
      },
      {
        titre: "Venta en línea sin comisión",
        desc: "Módulo web integrado en la web del centro y sincronizado con el calendario: reserva de actividades, venta de entradas, eventos, abonos y bonos regalo. Más de treinta medios de pago integrados y un modo invitado que permite comprar sin crear cuenta.",
      },
      {
        titre: "Caja NF525",
        desc: "Cobro con múltiples medios de pago y divisas, facturación y stock. Certificada NF525 en Francia, con sus equivalentes TSE en Alemania y Verifactu en España.",
      },
      {
        titre: "Quiosco y exenciones",
        desc: "Registro autónomo desde un terminal o el dispositivo del cliente, con recuperación automática de las exenciones de responsabilidad firmadas y gestión del caso de los menores. Terminal de check-in rápido por código QR.",
      },
      {
        titre: "Bar y restauración",
        desc: "Toma de pedidos en modo autónomo en tablet, por código QR desde el móvil del cliente o en modo camarero. Sistema centralizado, sin comisión, con puestos ilimitados y un plano de sala configurable.",
      },
      {
        titre: "App móvil personalizada",
        desc: "Con la imagen del centro: tarjeta de socio virtual, reserva y pago, seguimiento del rendimiento, organización de campeonatos entre amigos y mensajería interna.",
      },
      {
        titre: "Fidelización",
        desc: "Vales de descuento, puntos de fidelidad, monedero virtual, acumulación de saldo, tarifas para socios y abonos. Sincronización de los datos de clientes entre varios centros.",
      },
      {
        titre: "Comunicación",
        desc: "Campañas de email marketing con editor de arrastrar y soltar y estadísticas de apertura, emails automáticos activados por eventos, SMS de confirmación o recordatorio y notificaciones push.",
      },
      {
        titre: "GoManager y API",
        desc: "App de gestión con paneles personalizables y comparación entre varios centros. Una API permite recuperar ventas, socios y sesiones para conectarlos a una herramienta externa como Power BI.",
      },
      {
        titre: "Gestión comercial y contable",
        desc: "Presupuestos, facturas, anticipos y notas de crédito generados desde el software, envío por enlace de pago sin comisión y exportación contable en CSV configurable por código de producto y tipo de IVA.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Apex Timing no publica importes, pero su documentación comercial detalla la estructura de la oferta, y esta trae alguna sorpresa. Conviven dos modalidades de adquisición, compra o alquiler, junto con una suscripción a las soluciones web repartida en tres packs.",
      lignes: [
        {
          label: "Modelo",
          valeur: "Compra o alquiler, más una suscripción web",
          source: "documentación comercial del proveedor, octubre de 2026",
        },
        {
          label: "Los tres packs",
          valeur: "Support (Web Basic), Web Pro, Web Premium",
        },
        {
          label: "Comisión sobre las reservas en línea",
          valeur: "0 %",
          source: "anunciado explícitamente por el proveedor",
        },
        {
          label: "Venta en línea",
          valeur: "A partir del pack Web Pro",
        },
        {
          label: "Reserva de actividades y pago",
          valeur: "Solo en el pack Web Premium",
        },
        {
          label: "Conexión por API con una herramienta externa",
          valeur: "Solo en el pack Web Premium",
        },
        {
          label: "Volumen de email marketing incluido",
          valeur: "25 000/mes en Pro, 90 000/mes en Premium",
        },
        {
          label: "Gastos adicionales",
          valeur:
            "Puesta en marcha, integración bancaria y pack de SMS facturados aparte",
        },
        { label: "Importe de las suscripciones", valeur: "No comunicado" },
      ],
      manquant: [
        "El importe de cada pack, y la diferencia entre compra y alquiler",
        "El coste de la puesta en marcha, de la integración bancaria y del pack de SMS",
        "El precio del hardware: bucles, transpondedores, pantallas, terminales, RDisplay",
        "La duración del compromiso y las condiciones de salida",
      ],
    },
    constate: {
      intro:
        "Operamos centros equipados con Apex Timing, y el proveedor publica además una documentación técnica de su plan de etiquetado. Esto es lo que muestran ambas fuentes, cruzadas, en octubre de 2026.",
      points: [
        "El embudo de reserva se muestra en marcos integrados dentro de las páginas de la web del centro, servidos desde el dominio de Apex Timing. Cada centro se identifica con un parámetro en la URL: el dominio, por tanto, lo comparten todos los clientes del proveedor.",
        "Los identificadores de medición se introducen directamente en el área de cliente: Google Analytics, Google Tag Manager y el píxel de Meta tienen cada uno su campo. No hace falta ningún desarrollo para instalarlos.",
        "La capa de datos cubre todo el recorrido, desde la vista de la lista de productos hasta la compra, pasando por el carrito, su modificación y su abandono. Los nombres respetan la especificación actual de Google.",
        "El proveedor expone una función dedicada al consentimiento, que permite transmitir la elección del visitante a las etiquetas cargadas en el marco integrado. Pocos motores del panel ofrecen este puente.",
        "Apex Timing indica, en cambio, que no da soporte sobre la configuración de Tag Manager y recomienda recurrir a un especialista.",
      ],
    },
    vigilance: [
      "El e-commerce no está incluido en el pack de entrada, y la reserva de actividades con pago, el núcleo del negocio de un karting, solo aparece en el pack más alto. Un operador que piensa vender en línea debe comprobar su pack antes de firmar, no después.",
      "Como el embudo se sirve desde un dominio compartido por todos los centros Apex, las cookies de medición se instalan en ese dominio común. Un visitante que reserva en dos centros distintos puede ser visto como la misma persona por las herramientas de analítica.",
      "Como el contenido de reserva se muestra en un marco integrado, la medición requiere una configuración específica que no exige un embudo clásico. Es factible y está documentado, pero no es automático.",
      "Varias funciones útiles se facturan aparte: puesta en marcha, integración bancaria, pack de SMS. Pide que te las presupuesten desde el principio para evitar sorpresas.",
      "En una comparativa publicada por un competidor circuló un importe de unos 300 €/mes. La documentación del proveedor muestra que la oferta se estructura en tres packs, en compra o en alquiler, con gastos adicionales: reducirlo a una única cifra no tiene sentido.",
    ],
    lacunes: [
      "El importe de cada uno de los tres packs",
      "La diferencia de coste entre compra y alquiler",
      "El precio del hardware de pista y de los terminales",
      "El coste de la puesta en marcha y de la integración bancaria",
      "La duración del compromiso y las condiciones de salida",
      "El plazo entre la firma y la puesta en marcha",
    ],
    site: "https://www.apex-timing.com/",
    sources: [
      {
        label: "Apex Timing — gestión de centros de karting",
        url: "https://www.apex-timing.com/en/karting-center-management-software/",
      },
      {
        label: "Apex Timing — documentación de Google Tag Manager",
        url: "https://wiki.apex-timing.com/doc/gokarts/google-tag-manager",
      },
      {
        label: "Apex Timing — solución para centros de ocio",
        url: "https://www.apex-timing.com/en/leisure-center-management-software/",
      },
      { label: "Apex Timing Francia", url: "http://www.apex-timing.fr/fr/" },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "roller",
    nom: "ROLLER",
    baseline:
      "Plataforma australiana implantada en más de 30 países, la más completa del panel en experiencia del visitante y medición.",
    description:
      "ROLLER: 3 000 clientes, 30 países, quioscos de autoservicio y medición nativa. Para quién es, qué cubre y sus niveles, según un grupo multisede equipado con él.",
    pourQuiCourt:
      "Negocios con mucho volumen y grupos multisede, exigentes con el recorrido del visitante.",
    editeur: { pays: "Australia" },
    chiffres: [
      { valeur: "3 000+", label: "clientes" },
      { valeur: "30+", label: "países" },
      { valeur: "Multi", label: "gestión de varias sedes" },
    ],
    pourQui: {
      intro:
        "ROLLER se dirige a los negocios cuyo volumen justifica industrializar el recorrido del visitante: quioscos de autoservicio, monedero sin efectivo, medición de la satisfacción. Es la solución más madura del panel y la más internacional.",
      profils: [
        "Trampoline parks y centros de entretenimiento familiar con mucho volumen",
        "Parques acuáticos y parques temáticos",
        "Museos, zoos y acuarios",
        "Grupos que gestionan varias sedes bajo una dirección común",
        "Operadores que venden muchos cumpleaños, abonos y restauración",
      ],
      moinsAdapte: [
        "Los negocios de una sola sede y de pequeño tamaño: el nivel de funcionalidades suele superar la necesidad.",
        "Los operadores que quieren un interlocutor y documentación en francés: la plataforma y su soporte son anglófonos.",
        "Los kartings: no hay módulo de cronometraje.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Venta de entradas en línea",
        desc: "Embudo de reserva progresivo, diseñado para reducir la fricción en cada etapa del recorrido. Dos integraciones posibles: un embudo alojado, en el dominio del proveedor o en un subdominio del parque, o un widget incrustado directamente en las páginas de la web.",
      },
      {
        titre: "Caja/TPV y pagos centralizados",
        desc: "Cobro in situ y centralización de los flujos de pago de todos los puntos de venta.",
      },
      {
        titre: "Abonos y membresías",
        desc: "Gestión de memberships, una palanca de recurrencia que pocas soluciones del panel tratan de forma tan completa.",
      },
      {
        titre: "Ventas adicionales",
        desc: "Cumpleaños y eventos privados, tarjetas regalo, pedidos de restauración desde el móvil del visitante.",
      },
      {
        titre: "Quioscos de autoservicio",
        desc: "Terminales de compra autónomos a la entrada del recinto, para absorber los picos sin movilizar personal.",
      },
      {
        titre: "Monedero sin efectivo",
        desc: "Cashless wallet que permite al visitante consumir in situ sin tarjeta ni dinero.",
      },
      {
        titre: "Exenciones de responsabilidad",
        desc: "Waivers firmados en línea antes de la visita, imprescindibles en las actividades de riesgo.",
      },
      {
        titre: "Control de accesos y aforos",
        desc: "Gestión de las entradas y control de las capacidades por franja horaria.",
      },
      {
        titre: "Guest Experience Score",
        desc: "Medición normalizada de la satisfacción del visitante, propia del proveedor, utilizable como indicador de gestión.",
      },
      {
        titre: "Seguimiento publicitario",
        desc: "La plataforma documenta de forma nativa el seguimiento de conversiones: Google Analytics en todos los planes, píxeles publicitarios y Tag Manager en los niveles superiores. Es la única herramienta del panel que publica esta documentación, la única que expone un evento de reembolso y la única en la que cada evento identifica el establecimiento afectado, algo que lo cambia todo para un grupo multisede.",
      },
      {
        titre: "Multisede y reporting",
        desc: "Gestión centralizada de varios establecimientos, informes detallados y control preciso de los permisos por usuario.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "ROLLER no publica tarifas, pero estructura claramente su oferta en niveles con nombre, Lite, Pro y Premium, cuyo contenido revela su documentación técnica.",
      lignes: [
        { label: "Suscripción mensual", valeur: "No comunicado" },
        {
          label: "Seguimiento con Google Analytics",
          valeur: "Incluido en todos los niveles",
        },
        {
          label: "Píxeles publicitarios",
          valeur: "A partir del nivel Pro",
        },
        {
          label: "Google Tag Manager",
          valeur:
            "Nivel Premium, u opción de pago en los niveles Lite y Pro",
        },
        {
          label: "Dominio de reserva personalizado",
          valeur: "Disponible, condiciones no comunicadas",
        },
        {
          label: "Comisión sobre las reservas en línea",
          valeur: "No comunicada",
        },
      ],
      manquant: [
        "El precio de cada nivel y el umbral para pasar de uno a otro",
        "El coste de la opción Tag Manager en los niveles inferiores",
        "El coste del dominio de reserva personalizado",
        "El coste de los quioscos de autoservicio y del hardware cashless",
        "Si existe una comisión sobre las ventas en línea",
      ],
    },
    constate: {
      intro:
        "Operamos un grupo multisede equipado con ROLLER. Esto es lo que muestra una instalación en producción, verificado en septiembre de 2026.",
      points: [
        "El embudo puede funcionar en el dominio del proveedor, pero también en un subdominio del propio parque. Hemos visto ambos casos en una misma cuenta, con un dominio dedicado por establecimiento: es la opción de dominio personalizado, y elimina el problema del cambio de dominio.",
        "ROLLER ofrece también un modo widget incrustado directamente en las páginas de la web del parque, como complemento del embudo alojado.",
        "La capa de datos sigue la especificación actual de Google: los eventos se emiten en el formato correcto, sin necesidad de transformarlos.",
        "El recorrido medido cubre la consulta de producto, el añadido al carrito, el inicio del pago, la compra, la consulta de los formularios de abono y el reembolso. Es la única herramienta del panel que expone un evento de reembolso.",
        "Cada evento indica el establecimiento afectado, lo que permite gestionar varias sedes desde una sola configuración de medición. Ninguna otra herramienta del panel lo hace.",
      ],
    },
    vigilance: [
      "Por defecto, el embudo está alojado en un dominio propiedad del proveedor. La opción de dominio personalizado existe y resuelve el problema, pero su coste no es público y se configura por establecimiento.",
      "El modo widget incrustado es el más delicado de medir: el contenido está aislado del resto de la página y el seguimiento exige un trabajo específico que el modo alojado no requiere. Decídelo antes de elegir la integración.",
      "Las funciones de medición más útiles se reparten en los niveles superiores. Un operador que invierte en publicidad debe comprobar que su nivel cubre sus necesidades antes de firmar.",
      "El proveedor indica que su soporte no acompaña la configuración de las herramientas de medición: esa parte queda a cargo del operador o de su agencia.",
      "Documentación, interfaz y soporte en inglés.",
    ],
    lacunes: [
      "Tarifas completas por nivel",
      "Coste del dominio de reserva personalizado, y si se factura por establecimiento",
      "Disponibilidad de soporte en francés y en horario europeo",
      "Referencias de clientes en Francia",
      "Existencia de una comisión sobre las reservas en línea",
    ],
    site: "https://www.roller.software/",
    sources: [
      { label: "Web oficial de ROLLER", url: "https://www.roller.software/" },
      {
        label: "ROLLER — funcionalidades",
        url: "https://www.roller.software/features/",
      },
      {
        label: "ROLLER — seguimiento de conversiones",
        url: "https://mysupport.roller.software/hc/en-us/articles/4941711216015-Track-guest-behavior-and-conversions-in-progressive-checkouts",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "bmi-leisure",
    nom: "BMI Leisure",
    baseline:
      "Proveedor español con más de veinticinco años de trayectoria, fuerte en karting y bolera, y muy discreto sobre sus condiciones.",
    description:
      "BMI Leisure: 25 años, 300 recintos, fuerte en karting y bolera, y el proveedor más opaco del panel. Qué hace y lo que hemos podido verificar nosotros mismos.",
    pourQuiCourt:
      "Karting, bolera y centros de entretenimiento familiar que buscan un proveedor probado.",
    editeur: { pays: "España" },
    chiffres: [
      { valeur: "25+", label: "años de actividad" },
      { valeur: "300+", label: "recintos equipados" },
      { valeur: "15+", label: "tipos de actividad cubiertos" },
    ],
    pourQui: {
      intro:
        "BMI Leisure se dirige a los centros de entretenimiento familiar que combinan varias actividades bajo un mismo techo, con una profundidad especial en karting y bolera. Su principal argumento es la veteranía: veinticinco años de experiencia y trescientos recintos.",
      profils: [
        "Kartings, con cronometraje y dirección de carrera integrados",
        "Boleras y centros de entretenimiento familiar multiactividad",
        "Parques de trampolines y parques de atracciones",
        "Laser tag, escape rooms, arcades y centros de realidad virtual",
        "Minigolfs, parques infantiles cubiertos y parques de aventura",
        "Museos, zoos y acuarios",
      ],
      moinsAdapte: [
        "Los operadores que necesitan saber con precisión qué compran antes de iniciar una conversación comercial: es el proveedor más opaco del panel.",
        "Aquellos cuya prioridad es la gestión publicitaria: la medición es posible, pero se basa en una especificación obsoleta que hay que traducir por completo, y el coste de implementación lo acusa.",
        "Los grupos multisede que quieren una configuración única: aquí, cada establecimiento requiere su propia configuración.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Reserva en línea",
        desc: "Reserva y pago a distancia, con una personalización anunciada como adaptable al diseño de la web del operador.",
      },
      {
        titre: "Cronometraje de karting y dirección de carrera",
        desc: "Cronometraje, race control, organización de mangas, seguridad y posicionamiento de los karts, pantallas en boxes y resultados de carrera.",
      },
      {
        titre: "Caja/TPV",
        desc: "Cobro in situ conectado a las reservas y al stock.",
      },
      {
        titre: "Exenciones de responsabilidad",
        desc: "Gestión de waivers, firmados antes de la sesión.",
      },
      {
        titre: "Reservas de grupo y eventos",
        desc: "Organización integral de grupos, cumpleaños y eventos de empresa.",
      },
      {
        titre: "CRM y automatización del marketing",
        desc: "Base de clientes y secuencias de marketing automatizadas. Su alcance concreto no se detalla públicamente.",
      },
      {
        titre: "Gamificación",
        desc: "Mecánicas de juego y de clasificación vinculadas a las sesiones, un eje poco trabajado por los demás proveedores del panel.",
      },
      {
        titre: "Gestión del personal",
        desc: "Planificación de los equipos y gestión de los permisos de acceso.",
      },
      {
        titre: "Facturación, stock y reporting",
        desc: "Facturación, cobro, gestión de stock e informes de explotación.",
      },
    ],
    tarifs: {
      publie: false,
      intro:
        "Ninguna información de precios pública, en ningún canal. Es el proveedor menos transparente de los seis analizados.",
      lignes: [
        { label: "Suscripción mensual", valeur: "No comunicado" },
        { label: "Gastos de puesta en marcha", valeur: "No comunicados" },
        {
          label: "Hardware de cronometraje y pantallas",
          valeur: "No comunicado",
        },
        {
          label: "Comisión sobre las reservas en línea",
          valeur: "No comunicada",
        },
      ],
      manquant: [
        "La totalidad de las tarifas",
        "La estructura de la oferta: ¿existen siquiera niveles?",
        "El coste del hardware de pista en las instalaciones de karting",
        "La duración del compromiso y las condiciones de salida",
      ],
    },
    constate: {
      intro:
        "El proveedor no documenta nada públicamente sobre la medición. Por eso hemos examinado una instalación real, que siguió activa tras una migración, lo que nos permite describir lo que BMI Leisure expone de verdad. Verificado en septiembre de 2026.",
      points: [
        "El embudo de reserva funciona en un subdominio del proveedor, distinto del dominio del parque. El recorrido de compra se desarrolla en dos etapas identificables: el carrito y después la confirmación del pedido.",
        "El contenedor de medición del parque puede instalarse en el embudo: el operador conserva así el control de sus propias herramientas.",
        "La capa de datos transmite el detalle esperado de una transacción: identificador de pedido, facturación, impuestos, gastos y divisa, con el detalle de los productos.",
        "BMI expone un indicador de consentimiento de cookies en su capa de datos. Es el único elemento de cumplimiento normativo que hemos podido constatar en la plataforma, y es aprovechable.",
        "El evento de compra lleva el nombre del establecimiento afectado. En un grupo multisede, esto obliga a crear una regla de activación por establecimiento en lugar de una sola.",
      ],
    },
    vigilance: [
      "La capa de datos se basa en una especificación que Google sustituyó en 2023. Sigue siendo aprovechable, pero ningún evento llega en el formato que esperan las herramientas de analítica actuales: hay que traducirlo todo. Es un sobrecoste de implementación permanente y una fuente de errores en cada cambio.",
      "Como el evento de compra lleva un sufijo por establecimiento, la configuración se multiplica con el número de sedes. Un grupo de cuatro parques requiere cuatro veces la misma configuración, que hay que mantener cuatro veces.",
      "Nada de esto está documentado públicamente. Un operador no puede saber antes de comprar qué podrá medir ni cuánto costará la implementación.",
      "Ninguna información de precios, en ningún canal. Es el proveedor menos transparente de los seis.",
      "Proveedor español: la disponibilidad de soporte en francés está por confirmar.",
    ],
    lacunes: [
      "Todas las tarifas",
      "Una opción de dominio de reserva con la imagen del parque",
      "Una documentación oficial de la capa de datos",
      "¿Está prevista la migración a la especificación actual?",
      "Disponibilidad de soporte en francés",
      "Referencias de clientes en Francia",
      "Condiciones de exportación de los datos en caso de baja",
    ],
    site: "https://bmileisure.com/",
    sources: [
      { label: "Web oficial de BMI Leisure", url: "https://bmileisure.com/" },
      {
        label: "BMI Leisure — funcionalidades",
        url: "https://bmileisure.com/features/",
      },
      {
        label: "BMI Leisure — karting",
        url: "https://bmileisure.com/industries/karting/",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────── */

  {
    slug: "yurplan",
    nom: "Yurplan",
    baseline:
      "Venta de entradas francesa para organizadores de eventos: festivales, ferias, fiestas, competiciones deportivas. Gratuita de entrada, remunerada por comisión.",
    description:
      "Yurplan: venta de entradas para eventos, gratis de entrada, 0,39 € + 1 % sin IVA por entrada de pago. Para quién es, funciones, licencias y una instalación.",
    pourQuiCourt:
      "Parques y recintos que venden eventos con fecha: fiestas, competiciones, festivales, cursillos.",
    editeur: { pays: "Francia" },
    chiffres: [
      { valeur: "46 000+", label: "organizadores" },
      { valeur: "0,39 € + 1 %", label: "sin IVA por entrada de pago" },
      { valeur: "0 €", label: "en las entradas gratuitas" },
    ],
    pourQui: {
      intro:
        "Yurplan no es un software de gestión de parques: es una plataforma de venta de entradas para eventos. Tiene sentido para un operador de ocio en cuanto vende fechas en lugar de franjas horarias (una fiesta, una competición, un cursillo, un festival), junto a su motor de reservas habitual o en su lugar.",
      profils: [
        "Organizadores de festivales, conciertos, espectáculos y fiestas",
        "Ferias para el gran público y profesionales, conferencias",
        "Eventos deportivos y competiciones",
        "Espacios culturales y parques que organizan eventos puntuales",
        "Clubes y asociaciones que quieren empezar sin suscripción",
      ],
      moinsAdapte: [
        "La venta de entradas diaria de un parque con franjas y aforos: Yurplan razona en eventos, no en planificación de actividades.",
        "Los operadores que buscan una caja y una gestión del recinto completas: restauración, abonos recurrentes, quioscos.",
      ],
    },
    fonctionnalites: [
      {
        titre: "Venta de entradas en línea personalizada",
        desc: "Tarifas con precio, cupos, formularios y fechas de venta propios; página de venta de entradas con la imagen del organizador; editor de entradas.",
      },
      {
        titre: "Web dedicada y widget",
        desc: "Cada evento tiene su propia web en una dirección de Yurplan. La venta de entradas también puede integrarse en la web del organizador en forma de widget.",
      },
      {
        titre: "Difusión y enlaces con seguimiento",
        desc: "Enlaces de seguimiento por canal, códigos promocionales e invitaciones, con las visitas, las entradas vendidas y la facturación de cada enlace directamente en Yurplan.",
      },
      {
        titre: "Control de accesos y taquilla",
        desc: "App de escaneo de entradas y software de venta in situ, incluidos desde la oferta gratuita. Hardware en alquiler: impresoras, lectores de códigos.",
      },
      {
        titre: "CRM y campañas",
        desc: "A partir de la licencia Boost: centralización de contactos, grupos filtrados, campañas de email automatizadas y encuestas de satisfacción.",
      },
      {
        titre: "Socios y expositores",
        desc: "Licencia Advanced: invitaciones y acreditaciones para socios, programa del evento, códigos de inscripción, moderación y app de escaneo para expositores.",
      },
      {
        titre: "Asientos numerados",
        desc: "Plano de sala en el momento de la reserva, como opción de pago por entrada.",
      },
      {
        titre: "Seguimiento publicitario",
        desc: "Apps de Google Tag Manager, Google Analytics y píxel de Meta que se activan por evento. La capa de datos está documentada (un evento checkout por etapa y un purchase en formato GA4), pero el contenedor de Tag Manager bloquea en ella el HTML y el JavaScript personalizados.",
      },
    ],
    tarifs: {
      publie: true,
      intro:
        "Tarifas oficiales publicadas por Yurplan. El modelo se basa en una comisión por entrada de pago, gastos bancarios incluidos, descontada de los ingresos del organizador, y en licencias anuales opcionales para los módulos de marketing. Según el simulador del proveedor, una entrada vendida a 50 € IVA incluido deja 48,93 € al organizador.",
      lignes: [
        { label: "Comisión por entrada de pago", valeur: "0,39 € + 1 % sin IVA" },
        { label: "Entrada gratuita", valeur: "Sin comisión" },
        { label: "Licencia Standard", valeur: "Gratuita, sin permanencia" },
        {
          label: "Licencia Boost",
          valeur:
            "Desde 10 € sin IVA al mes, facturado anualmente, para 100 entradas emitidas al año",
        },
        { label: "Licencia Advanced", valeur: "Desde 72 € sin IVA al mes" },
        { label: "Permanencia de las licencias", valeur: "12 meses, renovación tácita" },
        { label: "Asientos numerados", valeur: "+ 0,42 € sin IVA por entrada" },
        {
          label: "App de escaneo para expositores",
          valeur: "+ 50 € sin IVA por expositor, licencia Advanced",
        },
      ],
      manquant: [],
    },
    constate: {
      intro:
        "Conectamos el seguimiento publicitario de una venta de entradas en Yurplan en octubre de 2026, para un organizador que promociona sus eventos con Meta Ads. Esto es lo que muestra la instalación:",
      points: [
        "Yurplan carga el contenedor de Tag Manager del organizador en su venta de entradas y envía checkout en cada etapa, y después purchase con la referencia del pedido y un identificador único: lo necesario para enlazar navegador y envío desde servidor.",
        "El contenedor rechaza las etiquetas HTML y las variables JavaScript personalizadas. El píxel de Meta y los identificadores de evento pasan por las plantillas de la galería de Tag Manager, que sí se activan.",
        "El visitante acepta las cookies en la web del organizador y luego una segunda vez en la venta de entradas. Parte de los compradores no responde, lo que penaliza la atribución en el navegador.",
      ],
    },
    vigilance: [
      "Las herramientas de seguimiento se activan evento por evento. Una nueva edición creada sin reactivar Tag Manager no registra nada, mientras las campañas siguen en marcha.",
      "La venta de entradas está en una dirección de Yurplan: el seguimiento entre dominios es imprescindible para atribuir las ventas a las campañas.",
      "El evento purchase también se envía en un pedido con pago aplazado, antes de cualquier cobro.",
      "Cada entrada generada cuenta en el cupo anual de las licencias, incluidas las entradas gratuitas y las anuladas.",
    ],
    lacunes: [],
    site: "https://yurplan.com/",
    sources: [
      { label: "Web oficial de Yurplan", url: "https://yurplan.com/" },
      { label: "Yurplan — tarifas", url: "https://yurplan.com/tarifs" },
      {
        label: "Yurplan — licencias, permanencia y facturación",
        url: "https://aide-organisateur.yurplan.com/article/540-licence-yurplan-offres-engagement-facturation",
      },
      {
        label: "Yurplan — eventos de seguimiento enviados por la venta de entradas",
        url: "https://aide-organisateur.yurplan.com/article/578-evenements-de-suivi-envoyes-par-votre-billetterie",
      },
      {
        label: "Yurplan — seguir las ventas con Google Tag Manager",
        url: "https://aide-organisateur.yurplan.com/article/448-site-evenement-google-tag-manager",
      },
    ],
  },
];

export function getOutilEs(slug: string): Outil | undefined {
  return OUTILS_ES.find((o) => o.slug === slug);
}

/* ────────────────────────────────────────────────────────────── */

export const OUTILS_HUB_ES = {
  eyebrow: "Recursos — parques de ocio",
  title: "Herramientas y software de gestión para",
  titleHighlight: "parques de ocio",
  intro:
    "Venta de entradas, caja/TPV, reserva en línea, control de accesos: el software de gestión es la columna vertebral de un parque de ocio. Y también una de las decisiones más difíciles de deshacer una vez tomada.",
  intro2:
    "Acompañamos a una veintena de parques en Francia en su captación de clientes. Por eso trabajamos a diario con estas herramientas, tanto en la operativa como en la medición. Estas fichas reúnen lo que sabemos de cada una: para quién es, qué hace y cuánto cuesta.",
  methodo: {
    titre: "Nuestro método",
    lignes: [
      "Nos basamos en la documentación pública de los proveedores, en las instalaciones que operamos en producción y en nuestras propias verificaciones técnicas.",
      "No somos revendedores, afiliados ni socios de ninguno de estos proveedores. Ninguna de estas fichas está patrocinada.",
      "Lo que no hemos podido verificar se indica como tal en cada ficha, en lugar de rellenarlo con suposiciones. Pedimos a cada proveedor que complete estas zonas grises, y las fichas se irán actualizando a medida que lleguen las respuestas.",
    ],
  },
  suite: {
    titre: "Lo que viene",
    lignes: [
      "Una comparativa transversal de las seis soluciones, cuando hayamos recibido las respuestas de los proveedores.",
      "Los planes de etiquetado ya están publicados, herramienta por herramienta, para saber por fin de dónde vienen realmente tus reservas.",
    ],
  },
  taggage: {
    titre: "¿Ya tienes herramienta?",
    texte:
      "Elegir la herramienta es solo la mitad del trabajo. Además hay que saber qué permite medir y conectarla correctamente a tus campañas. Hemos escrito un plan de etiquetado detallado para cada uno de los motores que operamos.",
    bouton: "Descubrir nuestras guías de plan de etiquetado",
  },
  cta: {
    titre: "¿Dudas entre dos herramientas?",
    texte:
      "Operamos estas plataformas a diario para una veintena de parques. En treinta minutos podemos acotar la elección según tu actividad, tu volumen y tus objetivos de afluencia.",
    bouton: "Reservar mi auditoría",
  },
} as const;
