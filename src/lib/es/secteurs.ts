import type { Secteur, Famille } from "@/lib/secteurs";

/* ─────────────────────────────────────────────────────────────
   Pages « marketing digital + secteur » — version espagnole.

   Même ordre, mêmes `slug` (clé française), mêmes `famille`, `avis`,
   `outils` et volumes que SECTEURS dans src/lib/secteurs.ts. Les
   `requetes[].mot` restent les mots-clés français : les volumes sont des
   données Google France, présentées comme telles (« en Francia »).

   Usages en espagnol :
   - H1 : « Marketing digital para {pour} »
   - eyebrow : « ¿Gestionas {un}? »
   - textes communs : « llenar {votre} », « la afluencia de {votre} »
   ───────────────────────────────────────────────────────────── */

/** Slugs espagnols des secteurs, définis une seule fois dans i18n.ts. */
export { SLUG_SECTEUR_ES as SLUG_ES } from "@/lib/i18n";

export const FAMILLES_ES: Record<Famille, string> = {
  indoor: "Ocio indoor",
  outdoor: "Ocio outdoor y lugares de visita",
  sejour: "Estancias y bienestar",
};

export const SECTEURS_ES: readonly Secteur[] = [
  /* ── Ocio indoor ────────────────────────────────────────── */
  {
    slug: "karting",
    avis: "onlykart",
    outils: ["apex-timing", "bmi-leisure"],
    famille: "indoor",
    nom: "Karting",
    pour: "los kartings",
    un: "un karting",
    votre: "tu karting",
    metaDescription:
      "Agencia de marketing digital para kartings: Google Ads, Meta Ads, SEO local y tracking para llenar tus tandas, cumpleaños y eventos de empresa.",
    subtitle:
      "Tandas para el público general, cumpleaños, despedidas de soltero, eventos de empresa: llenamos tus pistas con un método probado en otros kartings.",
    probleme: [
      "Un karting vive de varias clientelas que no buscan de la misma manera: el piloto del sábado, el padre que organiza un cumpleaños, la empresa que prepara su jornada de equipo.",
      "Entre el tiempo, las vacaciones escolares y los huecos del martes, la agenda rara vez se llena sola.",
      "Y cuando el módulo de reservas no está conectado a Google y Meta, es imposible saber qué anuncio ha vendido de verdad una tanda.",
    ],
    demande: {
      intro:
        "«Karting» se busca 135 000 veces al mes en Francia, casi siempre seguido de una ciudad. La batalla es local: ficha de Google, anuncios geolocalizados y una página por oferta.",
      requetes: [
        { mot: "karting", volume: 135000 },
        { mot: "karting enfant", volume: 5700 },
        { mot: "karting indoor", volume: 3100 },
        { mot: "prix karting", volume: 610 },
        { mot: "karting anniversaire", volume: 590 },
        { mot: "karting team building", volume: 70 },
      ],
    },
    publics: [
      {
        titre: "Los pilotos de ocio",
        texte:
          "El núcleo de la facturación. Los captamos en Google en el momento en que buscan y luego los hacemos volver con ofertas de fidelización y remarketing.",
      },
      {
        titre: "Los cumpleaños infantiles",
        texte:
          "Padres que comparan rápido. Una página clara (edad mínima, fórmula, precio) y anuncios de Meta bien segmentados marcan la diferencia.",
      },
      {
        titre: "Despedidas y grupos de amigos",
        texte:
          "Un ticket alto y una decisión colectiva. Vídeos cortos, ofertas en pack y respuesta rápida a las solicitudes de presupuesto.",
      },
      {
        titre: "Empresas y eventos corporativos",
        texte:
          "La palanca de los días laborables. Campañas de Google en las búsquedas de team building y formulario B2B medido como una conversión de verdad.",
      },
    ],
    saison:
      "El karting outdoor depende del tiempo; el indoor, de las vacaciones escolares y de los fines de semana de lluvia. Ajustamos los presupuestos semana a semana e impulsamos las ofertas para empresas cuando el público general baja.",
    faq: [
      {
        q: "¿Con qué software de reservas para karting trabajáis?",
        a: "Ya hemos implementado el seguimiento de reservas en Apex Timing, Qweekle y ROLLER, entre otros. El objetivo siempre es el mismo: que Google Ads y Meta vean cada reserva pagada, con su importe.",
      },
      {
        q: "¿Hace falta una página por oferta (cumpleaños, despedidas, empresas)?",
        a: "Sí. Cada público escribe palabras distintas y espera información distinta. Una página por oferta mejora a la vez el posicionamiento y la tasa de conversión de tus anuncios.",
      },
      {
        q: "¿Cómo llenar los huecos entre semana?",
        a: "Con las empresas, los campamentos urbanos y las ofertas happy hour. Creamos campañas dedicadas a los días flojos, con un presupuesto que solo se activa cuando tienes sitio.",
      },
    ],
  },
  {
    slug: "bowling",
    avis: "space",
    outils: ["bmi-leisure", "roller"],
    famille: "indoor",
    nom: "Bolera",
    pour: "las boleras",
    un: "una bolera",
    votre: "tu bolera",
    metaDescription:
      "Agencia de marketing digital para boleras: Google, Meta, SEO local y seguimiento de reservas para llenar tus pistas, tu bar y tus eventos de empresa.",
    subtitle:
      "Pistas, bar, restauración, eventos de empresa: traemos gente entre semana y el fin de semana, y medimos lo que te aporta cada euro de publicidad.",
    probleme: [
      "Una bolera no vende solo una partida: vende una noche, con el bar, la comida y a menudo otras actividades alrededor.",
      "Aun así, la mayoría de las boleras siguen comunicando como hace diez años, con una web escaparate y una página de Facebook.",
      "Resultado: pistas llenas el sábado por la noche, vacías el martes, y ninguna visibilidad sobre lo que atrae a los clientes.",
    ],
    demande: {
      intro:
        "135 000 búsquedas mensuales de «bowling» en Francia, y una demanda que asocia cada vez más la partida a una comida o una copa. Tu oferta completa tiene que aparecer desde la búsqueda.",
      requetes: [
        { mot: "bowling", volume: 135000 },
        { mot: "bowling restaurant", volume: 480 },
        { mot: "bowling prix", volume: 360 },
        { mot: "bowling enfant", volume: 320 },
        { mot: "anniversaire bowling", volume: 60 },
      ],
    },
    publics: [
      {
        titre: "Los planes con amigos",
        texte:
          "Deciden el mismo día. Ficha de Google impecable, reseñas recientes y anuncios locales el jueves y el viernes.",
      },
      {
        titre: "Las familias",
        texte:
          "Fines de semana y vacaciones: fórmulas infantiles claras y campañas de Meta ajustadas al calendario escolar.",
      },
      {
        titre: "Las empresas",
        texte:
          "Afterworks, eventos corporativos, cenas de Navidad. El ticket más alto, con un recorrido de presupuesto medido de principio a fin.",
      },
    ],
    saison:
      "La bolera aprovecha el otoño, el invierno y los días de lluvia. Anticipamos las celebraciones de fin de año desde septiembre con las empresas, y reactivamos al público general cuando cambia el tiempo.",
    faq: [
      {
        q: "¿Se puede promocionar el bar y la restauración a la vez?",
        a: "Sí, y a menudo es ahí donde está el margen. Construimos ofertas «partida + comida» y medimos el ticket medio, no solo el número de partidas.",
      },
      {
        q: "¿Cómo atraer clientes entre semana?",
        a: "Con campañas dedicadas a empresas, asociaciones y estudiantes, que solo se emiten los días en que tienes sitio.",
      },
      {
        q: "¿Las reseñas de Google tienen tanto impacto?",
        a: "Enorme: en una búsqueda «bolera + ciudad», la ficha de Google aparece antes que tu web. Ponemos en marcha una recogida de reseñas constante después de cada visita.",
      },
    ],
  },
  {
    slug: "escape-game",
    avis: "space",
    outils: ["qweekle", "playpro"],
    famille: "indoor",
    nom: "Escape room",
    pour: "los escape rooms",
    un: "un escape room",
    votre: "tu escape room",
    metaDescription:
      "Agencia de marketing digital para escape rooms: Google Ads, Meta Ads, SEO local y seguimiento de reservas para llenar tus salas entre semana y el fin de semana.",
    subtitle:
      "Grupos de amigos, cumpleaños, despedidas de soltera, team building: llenamos tus salas con campañas pensadas para un mercado donde la competencia está a dos calles.",
    probleme: [
      "El escape room es uno de los ocios más competidos: en una gran ciudad, tus clientes comparan diez locales en dos minutos.",
      "Las temáticas, las notas de Google y las fotos deciden mucho antes que tu web.",
      "Y una vez jugada la sala, el cliente solo vuelve si tienes un nuevo escenario que proponerle, en el momento adecuado.",
    ],
    demande: {
      intro:
        "135 000 búsquedas al mes de «escape game» en Francia. Las búsquedas de más valor son las más precisas: team building, cumpleaños, despedidas de soltera. Hay que trabajarlas una a una.",
      requetes: [
        { mot: "escape game", volume: 135000 },
        { mot: "escape game team building", volume: 590 },
        { mot: "escape game anniversaire", volume: 480 },
        { mot: "escape game réalité virtuelle", volume: 320 },
        { mot: "escape game evjf", volume: 260 },
      ],
    },
    publics: [
      {
        titre: "Los jugadores apasionados",
        texte:
          "Han hecho todas las salas de la ciudad. Los fidelizamos por email y redes sociales con cada nuevo escenario.",
      },
      {
        titre: "Grupos de amigos y despedidas",
        texte:
          "Buscan una experiencia que contar. Vídeos de tus decorados y reseñas visibles inclinan la decisión.",
      },
      {
        titre: "Las empresas",
        texte:
          "El team building llena tus salas entre semana. Campañas de Google dedicadas y página B2B con formulario de presupuesto medido.",
      },
    ],
    saison:
      "Pico en septiembre y en invierno, bajón en verano en la ciudad. Desplazamos el presupuesto hacia los turistas y los campamentos urbanos en julio y agosto, y hacia las empresas de septiembre a diciembre.",
    faq: [
      {
        q: "¿Cómo destacar frente a la competencia local?",
        a: "Con las temáticas, la prueba social y la rapidez de reserva. Trabajamos tu ficha de Google, tus visuales y un proceso de reserva sin fricciones, y luego pujamos por las búsquedas precisas que tu competencia descuida.",
      },
      {
        q: "¿Hay que comunicar cada nueva sala?",
        a: "Sí: el lanzamiento de un escenario es el mejor momento para reactivar a tus antiguos jugadores. Preparamos una secuencia de emails, contenidos cortos y una campaña de remarketing.",
      },
      {
        q: "¿El team building compensa la inversión publicitaria?",
        a: "A menudo sí: el clic cuesta más, pero un grupo de empresa vale varias reservas del público general y llena los huecos entre semana.",
      },
    ],
  },
  {
    slug: "trampoline-park",
    avis: "nikito",
    outils: ["roller", "qweekle"],
    famille: "indoor",
    nom: "Parque de trampolines",
    pour: "los parques de trampolines",
    un: "un parque de trampolines",
    votre: "tu parque de trampolines",
    metaDescription:
      "Agencia de marketing digital para parques de trampolines: Meta, Google, SEO local y seguimiento de reservas para llenar sesiones y cumpleaños todo el año.",
    subtitle:
      "Sesiones libres, cumpleaños, colegios y campamentos urbanos: convertimos la demanda de las familias de tu zona en reservas medidas.",
    probleme: [
      "Los parques de trampolines se han disparado en pocos años, y cada área urbana tiene ya varios.",
      "La clientela es sobre todo familiar: decide el padre o la madre, a menudo desde el móvil, entre otras dos actividades.",
      "Sin un tracking fiable, es imposible saber si tus cumpleaños vienen de Google, de Instagram o del boca a boca.",
    ],
    demande: {
      intro:
        "110 000 búsquedas al mes de «trampoline park» en Francia. Los padres también buscan de forma más amplia un «parque indoor» o un «ocio indoor»: hay que estar presente en ambas.",
      requetes: [
        { mot: "trampoline park", volume: 110000 },
        { mot: "parc indoor", volume: 1300 },
        { mot: "loisir indoor", volume: 390 },
        { mot: "centre de loisirs indoor", volume: 30 },
      ],
    },
    publics: [
      {
        titre: "Las familias",
        texte:
          "Tardes, fines de semana y vacaciones. Campañas de Meta geolocalizadas y ofertas claras por franja de edad.",
      },
      {
        titre: "Los cumpleaños",
        texte:
          "El producto más rentable. Una página dedicada, fotos de tus salas de fiesta y una reserva online sencilla.",
      },
      {
        titre: "Adolescentes y deportistas",
        texte:
          "Sesiones freestyle, noches especiales, dodgeball: vídeos cortos en Instagram y TikTok.",
      },
      {
        titre: "Grupos y colectivos",
        texte:
          "Colegios, campamentos urbanos, empresas: un formulario de presupuesto medido y recordatorios segmentados antes de cada periodo de vacaciones.",
      },
    ],
    saison:
      "Pico durante las vacaciones escolares y los fines de semana de lluvia, bajón con el buen tiempo. Preparamos las vacaciones con dos semanas de antelación y pasamos el presupuesto a los cumpleaños y los grupos cuando vuelve el sol.",
    faq: [
      {
        q: "¿Meta o Google para un parque de trampolines?",
        a: "Los dos, con papeles distintos: Google capta a quienes ya buscan y Meta despierta las ganas en los padres de tu zona. El reparto depende de tu competencia local.",
      },
      {
        q: "¿Cómo aumentar las reservas de cumpleaños?",
        a: "Con una página dedicada que responda a todas las preguntas (edad, duración, tarta, precio), una reserva online y campañas activas todo el año. Suele ser la primera palanca que activamos.",
      },
      {
        q: "¿Se pueden medir las ventas hechas en taquilla?",
        a: "En parte: seguimos las reservas online con precisión y estimamos el efecto de las campañas en la afluencia global comparando periodos.",
      },
    ],
  },
  {
    slug: "laser-game",
    avis: "space",
    outils: ["bmi-leisure", "qweekle"],
    famille: "indoor",
    nom: "Laser tag",
    pour: "los centros de laser tag",
    un: "un laser tag",
    votre: "tu laser tag",
    metaDescription:
      "Agencia de marketing digital para laser tag: Google Ads, Meta Ads, SEO local y tracking para llenar tus partidas, tus cumpleaños y tus eventos de empresa.",
    subtitle:
      "Cumpleaños, grupos de adolescentes, despedidas, eventos de empresa: hacemos de tu laser tag la primera opción de tu ciudad, y medimos cada reserva.",
    probleme: [
      "El laser tag es un clásico: todo el mundo lo conoce, lo que hace difícil diferenciarse.",
      "Tus clientes no buscan «el mejor laser tag», buscan «laser tag + mi ciudad» y eligen el primero que les inspira confianza.",
      "La visibilidad local y la reputación hacen, por tanto, la mayor parte del trabajo.",
    ],
    demande: {
      intro:
        "60 500 búsquedas al mes de «laser game» en Francia, y una cola larga casi inexistente: todo se juega en el nombre de la actividad seguido de la ciudad. El SEO local y la ficha de Google son prioritarios.",
      requetes: [
        { mot: "laser game", volume: 60500 },
        { mot: "laser game enfant", volume: 170 },
        { mot: "laser game anniversaire", volume: 10 },
        { mot: "laser game prix", volume: 10 },
      ],
    },
    publics: [
      {
        titre: "Los cumpleaños",
        texte:
          "Niños y adolescentes: una oferta legible y una reserva online, impulsadas por Meta entre los padres de tu zona.",
      },
      {
        titre: "Los grupos de jóvenes adultos",
        texte:
          "Noches de fiesta, despedidas, salidas de estudiantes: contenidos cortos, ofertas de grupo y presencia fuerte en Google Maps.",
      },
      {
        titre: "Las empresas",
        texte:
          "Team building y afterworks para llenar la semana, con un formulario de presupuesto medido.",
      },
    ],
    saison:
      "Actividad estable todo el año, con picos en vacaciones y en invierno. Concentramos el presupuesto en los periodos de mucha demanda y en las empresas entre semana.",
    faq: [
      {
        q: "¿Cómo salir en Google Maps?",
        a: "Con una ficha completa, fotos recientes, respuestas a las reseñas y un flujo constante de reseñas nuevas. Es el primer frente que abrimos para un laser tag.",
      },
      {
        q: "¿Un laser tag necesita publicidad de pago?",
        a: "En cuanto hay competencia en tu zona, sí. Empezamos con campañas locales de presupuesto pequeño y solo aumentamos si la rentabilidad acompaña.",
      },
      {
        q: "¿Se puede combinar el laser tag con otras actividades de tu centro?",
        a: "Sí, los packs multiactividad aumentan el ticket medio. Los destacamos para los cumpleaños y los grupos.",
      },
    ],
  },
  {
    slug: "jeux-aventure-indoor",
    avis: "space",
    outils: ["qweekle", "roller"],
    titre: "Marketing digital para juegos de aventura indoor",
    famille: "indoor",
    nom: "Juegos de aventura indoor",
    pour: "los juegos de aventura indoor",
    un: "un centro de juegos de aventura",
    votre: "tu centro",
    metaDescription:
      "Agencia de marketing digital para juegos de aventura indoor (retos en equipo, quiz, action games): Google Ads, Meta Ads, SEO local y seguimiento de reservas.",
    subtitle:
      "Retos en equipo, quiz gigantes, salas de acción: damos a conocer tu concepto y llenamos tus horarios, con amigos y con empresas.",
    probleme: [
      "Los nuevos conceptos de juegos en equipo enganchan rápido, pero primero hay que explicar qué se hace allí.",
      "Tus futuros clientes aún no saben que te están buscando: escriben «actividad con amigos» o el nombre de una marca conocida.",
      "El vídeo y la prueba social son, por tanto, imprescindibles para convertir la curiosidad en reserva.",
    ],
    demande: {
      intro:
        "Solo las grandes marcas del sector generan decenas de miles de búsquedas en Francia. La demanda existe; falta que te encuentre a ti.",
      requetes: [
        { mot: "prison island", volume: 49500 },
        { mot: "quiz room", volume: 27100 },
        { mot: "action game", volume: 3600 },
        { mot: "loisir indoor", volume: 390 },
      ],
    },
    publics: [
      {
        titre: "Grupos de amigos",
        texte:
          "Quieren una experiencia que compartir. Vídeos inmersivos en Instagram y TikTok despiertan las ganas.",
      },
      {
        titre: "Familias con adolescentes",
        texte:
          "Una actividad que pone a todos de acuerdo. Ofertas claras por edad y campañas de Meta el fin de semana.",
      },
      {
        titre: "Empresas",
        texte:
          "El formato de reto en equipo está hecho para el team building. Campañas de Google dedicadas y página B2B.",
      },
    ],
    saison:
      "Actividad sostenida de octubre a abril y durante las vacaciones, más tranquila con el buen tiempo. Reactivamos a las empresas y a los grupos cuando el público general se va al aire libre.",
    faq: [
      {
        q: "¿Cómo explicar un concepto nuevo en un anuncio?",
        a: "Con vídeo: quince segundos de jugadores en acción valen más que un texto largo. Producimos y probamos varios formatos para encontrar el que convierte.",
      },
      {
        q: "¿Ya conocéis este tipo de concepto?",
        a: "Sí, acompañamos a centros de juegos de aventura indoor y conocemos su software de reservas y sus picos de actividad.",
      },
      {
        q: "¿Hay que pujar por el nombre de la competencia?",
        a: "Se puede, pero con cuidado. Priorizamos las búsquedas genéricas y locales, más rentables a largo plazo.",
      },
    ],
  },
  {
    slug: "paintball",
    outils: ["playpro", "qweekle"],
    titre: "Marketing digital para el paintball",
    famille: "indoor",
    nom: "Paintball",
    pour: "los campos de paintball",
    un: "un campo de paintball",
    votre: "tu campo",
    metaDescription:
      "Agencia de marketing digital para campos de paintball y airsoft: campañas de Google y Meta, SEO local y seguimiento de reservas de grupos, despedidas y cumpleaños.",
    subtitle:
      "Despedidas de soltero, cumpleaños, grupos de amigos y empresas: llenamos tu campo con campañas hechas a medida para las reservas de grupo.",
    probleme: [
      "El paintball se reserva casi siempre en grupo, y a menudo con varias semanas de antelación.",
      "La decisión es colectiva: quien organiza tiene que convencer a los demás, y compara precios y fórmulas.",
      "Una oferta clara, fotos que den ganas y una respuesta rápida a las solicitudes lo cambian todo.",
    ],
    demande: {
      intro:
        "47 500 búsquedas al mes de «paintball» en Francia. Las variantes infantil y despedida de soltero muestran dos públicos muy distintos, a los que hay que hablar con mensajes diferentes.",
      requetes: [
        { mot: "paintball", volume: 47500 },
        { mot: "paintball enfant", volume: 590 },
        { mot: "paintball evg", volume: 50 },
        { mot: "paintball prix", volume: 20 },
      ],
    },
    publics: [
      {
        titre: "Despedidas y grupos de amigos",
        texte:
          "El público principal: fórmulas en pack, vídeos de ambiente y seguimiento rápido de las solicitudes de presupuesto.",
      },
      {
        titre: "Cumpleaños de niños y adolescentes",
        texte:
          "Con el paintball infantil, un público familiar que se capta con Meta y una página dedicada que tranquilice.",
      },
      {
        titre: "Empresas",
        texte:
          "Cohesión de equipo al aire libre: campañas de Google segmentadas y ofertas combinadas con otras actividades.",
      },
    ],
    saison:
      "Temporada alta de primavera a otoño para los campos exteriores, con un pico de despedidas de mayo a septiembre. Arrancamos las campañas de despedidas en febrero, cuando los amigos del novio empiezan a organizar.",
    faq: [
      {
        q: "¿Cuándo lanzar las campañas de despedidas?",
        a: "Dos o tres meses antes de la temporada: los organizadores comparan pronto. Abrimos las campañas a finales de invierno para llenar los fines de semana de mayo a septiembre.",
      },
      {
        q: "¿Cómo tranquilizar a los padres con el paintball infantil?",
        a: "Con una página que detalle el equipo, la supervisión y la edad mínima, y fotos reales. Las dudas sobre seguridad son el principal freno.",
      },
      {
        q: "¿Se puede combinar el paintball con otras actividades?",
        a: "Sí, los packs (paintball + karting, paintball + comida) aumentan el ticket y te diferencian. Los destacamos para los grupos.",
      },
    ],
  },
  {
    slug: "karaoke",
    avis: "space",
    outils: ["playpro"],
    famille: "indoor",
    nom: "Karaoke",
    pour: "los karaokes",
    un: "un karaoke",
    votre: "tu karaoke",
    metaDescription:
      "Agencia de marketing digital para karaokes y salas privadas: campañas de Google y Meta, SEO local y tracking de reservas para llenar tus salas cada noche.",
    subtitle:
      "Salas privadas, bar karaoke, cumpleaños y afterworks: llenamos tus salas de lunes a sábado, con campañas que se activan cuando tienes sitio.",
    probleme: [
      "El karaoke se decide a menudo el mismo día, entre amigos o entre compañeros de trabajo.",
      "Hay que ser visible en el momento justo, en Google Maps y en Instagram.",
      "Y los horarios de principio de semana se quedan vacíos si nadie les da una razón para venir.",
    ],
    demande: {
      intro:
        "40 500 búsquedas mensuales de «karaoké» en Francia, con un auge de los formatos privados. La demanda es muy local y muy ligada a las salidas nocturnas.",
      requetes: [
        { mot: "karaoké", volume: 40500 },
        { mot: "bar karaoké", volume: 370 },
        { mot: "karaoké box", volume: 180 },
      ],
    },
    publics: [
      {
        titre: "Las noches con amigos",
        texte:
          "Decisión rápida: ficha de Google cuidada, reseñas recientes y anuncios locales a final de semana.",
      },
      {
        titre: "Cumpleaños y despedidas de soltera",
        texte:
          "Grupos que reservan con antelación. Ofertas en pack bebidas + sala, y reserva online sencilla.",
      },
      {
        titre: "Los afterworks",
        texte:
          "La palanca de lunes a jueves: campañas dirigidas a empresas y ofertas de primera hora de la noche.",
      },
    ],
    saison:
      "Picos a final de año, en enero y en torno a los eventos (cumpleaños, despedidas de soltera en primavera). Anticipamos las celebraciones de empresa desde septiembre.",
    faq: [
      {
        q: "¿Cómo llenar las salas a principio de semana?",
        a: "Con ofertas dedicadas (happy hour, tarifas afterwork) que solo se impulsan en esos horarios, entre las empresas y los estudiantes de tu zona.",
      },
      {
        q: "¿Instagram o TikTok para un karaoke?",
        a: "Los dos funcionan bien: el karaoke genera contenido divertido de forma natural. Te ayudamos a captarlo y a convertirlo en publicidad.",
      },
      {
        q: "¿Se puede seguir la facturación del bar?",
        a: "Seguimos las reservas online y, cuando tu caja lo permite, cruzamos las ventas en el local con las campañas.",
      },
    ],
  },
  {
    slug: "mini-golf",
    avis: "space",
    outils: ["roller", "playpro"],
    famille: "indoor",
    nom: "Minigolf",
    pour: "los minigolfs",
    un: "un minigolf",
    votre: "tu minigolf",
    metaDescription:
      "Agencia de marketing digital para minigolfs indoor y outdoor: SEO local, campañas de Google y Meta y tracking para atraer a familias, turistas y grupos.",
    subtitle:
      "Familias, turistas, parejas y grupos: hacemos visible tu minigolf en el momento en que se busca un plan, y medimos lo que atrae a los jugadores.",
    probleme: [
      "El minigolf suele ser un plan de impulso, decidido en el sitio o la víspera.",
      "Los nuevos conceptos indoor (luz negra, temáticas, bar) han cambiado las reglas y atraen a un público adulto.",
      "Pero hay que darlo a conocer más allá de los habituales y de quienes pasan por delante.",
    ],
    demande: {
      intro:
        "22 400 búsquedas al mes de «mini golf» en Francia, y una demanda indoor que crece. Las búsquedas son locales: la ficha de Google y el SEO local van por delante de todo.",
      requetes: [
        { mot: "mini golf", volume: 22400 },
        { mot: "mini golf indoor", volume: 480 },
        { mot: "black light mini golf", volume: 10 },
      ],
    },
    publics: [
      {
        titre: "Las familias",
        texte:
          "Fines de semana y vacaciones: presencia en Google Maps, reseñas visibles y campañas de Meta locales.",
      },
      {
        titre: "Los turistas",
        texte:
          "En zona turística, buscan sobre el terreno: ficha de Google al día, horarios exactos y anuncios geolocalizados.",
      },
      {
        titre: "Parejas y grupos de adultos",
        texte:
          "El minigolf indoor temático se convierte en un plan de noche. Contenidos en Instagram y ofertas combinadas con el bar.",
      },
    ],
    saison:
      "Outdoor: temporada de abril a septiembre, impulsada por el turismo. Indoor: todo el año, con picos en invierno. Adaptamos el presupuesto al tipo de recorrido y al tiempo.",
    faq: [
      {
        q: "¿Un minigolf necesita web?",
        a: "Sí, aunque sea sencilla: sirve de base para el posicionamiento y la reserva. Pero la ficha de Google sigue siendo tu primer escaparate.",
      },
      {
        q: "¿Cómo llegar a los turistas?",
        a: "Con anuncios geolocalizados alrededor de las zonas de alojamiento y una ficha de Google traducida y al día. Segmentamos a las personas presentes en la zona, no solo a los residentes.",
      },
      {
        q: "¿El minigolf indoor se vende de otra manera?",
        a: "Sí: se vende un ambiente y una noche, no solo un recorrido. Lo visual y el vídeo cobran entonces toda su importancia.",
      },
    ],
  },
  {
    slug: "salle-arcade",
    avis: "space",
    outils: ["roller", "bmi-leisure"],
    famille: "indoor",
    nom: "Salón recreativo",
    pour: "los salones recreativos",
    un: "un salón recreativo",
    votre: "tu salón",
    metaDescription:
      "Agencia de marketing digital para salones recreativos y bares arcade: SEO local, campañas de Meta y Google y tracking para atraer a jugadores, familias y grupos.",
    subtitle:
      "Máquinas retro, juegos recientes, bar arcade: damos a conocer tu salón a los jugadores, las familias y los grupos de tu ciudad.",
    probleme: [
      "El salón recreativo vuelve con fuerza, a menudo asociado a un bar o a otras actividades.",
      "Pero la palabra «arcade» también se busca para videojuegos y máquinas en venta.",
      "Hace falta, por tanto, una segmentación precisa para pagar solo los clics de quienes quieren venir a jugar a tu local.",
    ],
    demande: {
      intro:
        "33 100 búsquedas de «arcade» y 8 100 de «salle d'arcade» cada mes en Francia. El término genérico es ambiguo: la precisión de la segmentación marca la rentabilidad.",
      requetes: [
        { mot: "arcade", volume: 33100 },
        { mot: "salle d'arcade", volume: 8100 },
      ],
    },
    publics: [
      {
        titre: "Los jugadores y nostálgicos",
        texte:
          "Apasionados a los que les gusta compartir. Contenidos en Instagram y TikTok, eventos y torneos.",
      },
      {
        titre: "Las familias",
        texte:
          "Un plan asequible el fin de semana. Fórmulas de tarjetas de juego y campañas de Meta locales.",
      },
      {
        titre: "Los grupos y afterworks",
        texte:
          "Bar arcade y reservas privadas: ofertas de grupo y campañas de Google segmentadas.",
      },
    ],
    saison:
      "Picos en invierno, los días de lluvia y durante las vacaciones. Programamos eventos (torneos, noches retro) para crear momentos fuertes fuera de las vacaciones.",
    faq: [
      {
        q: "¿Cómo evitar los clics inútiles en «arcade»?",
        a: "Excluyendo las búsquedas de compra y de videojuegos, y segmentando las intenciones locales. Limpiamos los términos de búsqueda cada semana.",
      },
      {
        q: "¿Merecen la pena los torneos y eventos?",
        a: "Sí, son excelentes pretextos de comunicación y fidelización. Los anunciamos por email, en redes y en publicidad local.",
      },
      {
        q: "¿Se pueden vender reservas privadas online?",
        a: "Sí, con un formulario o una reserva online medida como una conversión, para saber qué campañas generan esas solicitudes.",
      },
    ],
  },
  {
    slug: "lancer-de-hache",
    avis: "space",
    outils: ["playpro", "roller"],
    titre: "Marketing digital para el lanzamiento de hachas",
    famille: "indoor",
    nom: "Lanzamiento de hachas",
    pour: "las salas de lanzamiento de hachas",
    un: "una sala de lanzamiento de hachas",
    votre: "tu sala",
    metaDescription:
      "Agencia de marketing digital para salas de lanzamiento de hachas: Meta, Google, SEO local y tracking para llenar tus pistas con grupos y empresas.",
    subtitle:
      "Despedidas de soltero y soltera, cumpleaños, afterworks: hacemos del lanzamiento de hachas la actividad de la que habla tu ciudad, y llenamos tus pistas.",
    probleme: [
      "El lanzamiento de hachas es una actividad joven: muchos clientes aún no saben que existe cerca de casa.",
      "Hay que crear la demanda, no solo captarla.",
      "El vídeo, las redes sociales y las ofertas de grupo son tus mejores aliados.",
    ],
    demande: {
      intro:
        "4 400 búsquedas al mes de «lancer de hache» en Francia, y una demanda de «bar» que crece. Un mercado aún pequeño pero con poca competencia: ideal para ocupar el sitio pronto.",
      requetes: [
        { mot: "lancer de hache", volume: 4400 },
        { mot: "bar lancer de hache", volume: 480 },
        { mot: "lancer de hache prix", volume: 30 },
      ],
    },
    publics: [
      {
        titre: "Despedidas de soltero y soltera",
        texte:
          "Una actividad original que da que hablar. Vídeos cortos y ofertas en pack para los organizadores.",
      },
      {
        titre: "Grupos de amigos",
        texte:
          "Noches y cumpleaños: campañas de Meta locales y el bar en primer plano.",
      },
      {
        titre: "Empresas",
        texte:
          "Team building y afterworks para llenar la semana, con un formulario de presupuesto medido.",
      },
    ],
    saison:
      "Picos en primavera (despedidas), a final de año (cenas de empresa) y en invierno. Lanzamos las campañas de grupos dos meses antes de cada pico.",
    faq: [
      {
        q: "¿Cómo crear demanda para una actividad poco conocida?",
        a: "Con Meta, Instagram y TikTok: mostrar la actividad en vídeo suele bastar para despertar las ganas. Después Google toma el relevo en las búsquedas por nombre.",
      },
      {
        q: "¿Hay que destacar la seguridad?",
        a: "Sí, es el primer freno. Una sección clara sobre la supervisión y las normas tranquiliza y aumenta la tasa de reserva.",
      },
      {
        q: "¿El bar es un argumento de marketing?",
        a: "Sí: el «bar de hachas» se busca y se comparte. Lo integramos en tus ofertas de noche y de grupo.",
      },
    ],
  },
  {
    slug: "parc-indoor-enfants",
    avis: "nikito",
    outils: ["roller", "qweekle"],
    titre: "Marketing digital para parques infantiles indoor",
    famille: "indoor",
    nom: "Parque infantil indoor",
    pour: "los parques infantiles indoor",
    un: "un parque infantil indoor",
    votre: "tu parque",
    metaDescription:
      "Agencia de marketing digital para parques infantiles indoor y zonas de juego cubiertas: campañas de Meta y Google, cumpleaños, SEO local y tracking de reservas.",
    subtitle:
      "Tardes, fines de semana, vacaciones y cumpleaños: traemos a las familias de tu zona y medimos cada reserva.",
    probleme: [
      "Un parque infantil indoor vive al ritmo de las familias: tardes, fines de semana, vacaciones y días de lluvia.",
      "El padre o la madre busca una solución rápida, que dé confianza y esté cerca.",
      "Los cumpleaños suelen ser el producto más rentable, pero también el menos aprovechado online.",
    ],
    demande: {
      intro:
        "«Anniversaire enfant» (cumpleaños infantil) se busca 5 400 veces al mes en Francia, «parc indoor» 1 300 veces. Los padres buscan una solución, rara vez una marca: hay que estar presente en sus palabras.",
      requetes: [
        { mot: "anniversaire enfant", volume: 5400 },
        { mot: "parc indoor", volume: 1300 },
        { mot: "parc de jeux indoor", volume: 590 },
        { mot: "aire de jeux indoor", volume: 320 },
        { mot: "parc de loisirs enfants", volume: 110 },
      ],
    },
    publics: [
      {
        titre: "Los padres del día a día",
        texte:
          "Tardes y fines de semana: campañas de Meta geolocalizadas y ficha de Google impecable.",
      },
      {
        titre: "Los cumpleaños",
        texte:
          "Página dedicada, fotos de las salas, fórmulas claras y reserva online: ahí está el margen.",
      },
      {
        titre: "Guarderías, colegios y campamentos urbanos",
        texte:
          "Grupos regulares entre semana, que se captan con un formulario de presupuesto y recordatorios antes de cada periodo de vacaciones.",
      },
    ],
    saison:
      "Pico de octubre a marzo, durante las vacaciones escolares y los días de lluvia. Preparamos cada periodo de vacaciones con antelación y reactivamos los cumpleaños todo el año.",
    faq: [
      {
        q: "¿Cómo dar confianza a los padres online?",
        a: "Con fotos reales, información clara sobre higiene, supervisión y edades, y reseñas recientes. La confianza va antes que el precio.",
      },
      {
        q: "¿Hay que comunicar los cumpleaños todo el año?",
        a: "Sí: los padres reservan con cuatro a seis semanas de antelación. Una campaña de cumpleaños permanente suele ser nuestra primera palanca.",
      },
      {
        q: "¿Y en verano, cuando las familias están fuera?",
        a: "Apostamos por los campamentos urbanos, los días de calor extremo o de lluvia, y por las ofertas combinadas con tus otras actividades.",
      },
    ],
  },
  {
    slug: "realite-virtuelle",
    avis: "space",
    outils: ["playpro", "roller"],
    titre: "Marketing digital para salas de realidad virtual",
    famille: "indoor",
    nom: "Realidad virtual",
    pour: "las salas de realidad virtual",
    un: "una sala de realidad virtual",
    votre: "tu sala",
    metaDescription:
      "Agencia de marketing digital para salas de realidad virtual y escape rooms VR: campañas de Meta y Google, SEO local y tracking para llenar tus sesiones.",
    subtitle:
      "Escape rooms VR, arenas multijugador, simuladores: hacemos deseable la experiencia antes incluso de ponerse las gafas.",
    probleme: [
      "La realidad virtual es una experiencia difícil de describir: hay que mostrarla.",
      "Muchos clientes no saben que hay una sala VR cerca de casa.",
      "El marketing tiene que despertar las ganas y luego eliminar los frenos (edad, mareo, duración).",
    ],
    demande: {
      intro:
        "La demanda aún es modesta (unos cientos de búsquedas al mes en Francia) pero muy cualificada. Las redes sociales crean la demanda y Google la capta.",
      requetes: [
        { mot: "escape game réalité virtuelle", volume: 320 },
        { mot: "salle de réalité virtuelle", volume: 260 },
        { mot: "vr arena", volume: 210 },
      ],
    },
    publics: [
      {
        titre: "Jugadores y curiosos de la tecnología",
        texte:
          "Quieren probar lo último: contenidos en vídeo, novedades de juegos y ofertas de lanzamiento.",
      },
      {
        titre: "Grupos y cumpleaños",
        texte:
          "Adolescentes y jóvenes adultos: ofertas de grupo, reserva online y campañas de Meta.",
      },
      {
        titre: "Empresas",
        texte:
          "El team building VR es un argumento potente: campañas de Google dedicadas y página B2B.",
      },
    ],
    saison:
      "Todo el año, con picos en invierno y durante las vacaciones. Cada juego nuevo es la ocasión de una campaña de reactivación.",
    faq: [
      {
        q: "¿Cómo mostrar una experiencia VR en un anuncio?",
        a: "Grabando a los jugadores tanto como al juego: sus reacciones venden mejor que las imágenes generadas por ordenador. Probamos varios formatos de vídeo.",
      },
      {
        q: "¿La VR se posiciona como un escape room?",
        a: "Suele ser la puerta de entrada más eficaz, porque el escape room ya es conocido. Trabajamos los dos enfoques y nos quedamos con el que convierte.",
      },
      {
        q: "¿Qué frenos hay que eliminar?",
        a: "La edad mínima, la comodidad (mareos), el número de jugadores y la duración. Unas preguntas frecuentes claras en tu página de reserva aumentan la tasa de conversión.",
      },
    ],
  },

  /* ── Ocio outdoor y lugares de visita ──────────────────── */
  {
    slug: "zoo-parc-animalier",
    outils: ["qweekle", "roller"],
    titre: "Marketing digital para zoos y parques de animales",
    famille: "outdoor",
    nom: "Zoo y parque de animales",
    pour: "los zoos y parques de animales",
    un: "un zoo o un parque de animales",
    votre: "tu parque",
    metaDescription:
      "Agencia de marketing digital para zoos, parques de animales y acuarios: Google, Meta, SEO y venta de entradas online para aumentar la afluencia.",
    subtitle:
      "Familias, colegios, turistas, abonados: aumentamos la afluencia y la venta de entradas online de tu parque, temporada tras temporada.",
    probleme: [
      "Un zoo o un parque de animales atrae desde lejos: la decisión se toma a menudo la víspera, a veces semanas antes, al preparar las vacaciones.",
      "La venta de entradas online es una palanca enorme (anticipación, ticket medio, datos), todavía poco aprovechada.",
      "Y sin una medición precisa, es difícil saber si una campaña ha traído visitantes o solo clics.",
    ],
    demande: {
      intro:
        "«Zoo» y «aquarium» superan cada uno las 100 000 búsquedas al mes en Francia. La demanda es enorme y estacional: hay que ser visible mucho antes del día de la visita.",
      requetes: [
        { mot: "zoo", volume: 110000 },
        { mot: "aquarium", volume: 110000 },
        { mot: "parc animalier", volume: 22200 },
        { mot: "parc zoologique", volume: 8100 },
        { mot: "safari parc", volume: 480 },
      ],
    },
    publics: [
      {
        titre: "Las familias de la región",
        texte:
          "Fines de semana y festivos: campañas de Meta, eventos de temporada y pases anuales.",
      },
      {
        titre: "Los turistas",
        texte:
          "Preparan sus vacaciones: SEO, campañas de Google en las zonas de origen y venta de entradas online.",
      },
      {
        titre: "Los colegios y grupos",
        texte:
          "Salidas escolares y empresas: recordatorios antes de cada periodo de reservas, formulario de presupuesto medido.",
      },
    ],
    saison:
      "Fuerte estacionalidad, de la primavera al puente de Todos los Santos. Preparamos la temporada desde el invierno (pases anuales, regalos de Navidad) e impulsamos la venta online antes de cada puente y periodo de vacaciones.",
    faq: [
      {
        q: "¿Cómo aumentar la parte de entradas vendidas online?",
        a: "Con una venta de entradas rápida, ofertas exclusivas para la web y campañas que llevan directamente a la compra. Cada entrada online nos informa además del origen de los visitantes.",
      },
      {
        q: "¿Cómo llegar a los turistas?",
        a: "Segmentando las regiones de donde vienen tus visitantes y a los turistas presentes en tu zona, con mensajes distintos. El SEO toma el relevo en las búsquedas de ideas de planes.",
      },
      {
        q: "¿Los nacimientos y eventos son buenos temas?",
        a: "Excelentes: generan contenido compartido y cobertura local. Los convertimos en contenidos y en campañas de reactivación.",
      },
    ],
  },
  {
    slug: "parc-attractions",
    outils: ["qweekle", "roller"],
    famille: "outdoor",
    nom: "Parque de atracciones",
    pour: "los parques de atracciones",
    un: "un parque de atracciones",
    votre: "tu parque",
    metaDescription:
      "Agencia de marketing digital para parques de atracciones regionales: campañas de Google y Meta, SEO, venta de entradas online y tracking para llenar tu temporada.",
    subtitle:
      "Familias, grupos, abonados y turistas: llenamos tu temporada y hacemos crecer la venta de entradas online de tu parque.",
    probleme: [
      "Frente a los gigantes del sector, un parque regional tiene que luchar para existir en la mente de las familias.",
      "La temporada es corta: cada fin de semana perdido no se recupera.",
      "Hace falta una máquina de marketing lista desde la apertura y capaz de reaccionar al tiempo.",
    ],
    demande: {
      intro:
        "96 200 búsquedas al mes de «parc d'attraction» en Francia, pero también miles de padres que simplemente buscan un plan en familia. Es en esas búsquedas de ideas donde un parque regional gana visitantes.",
      requetes: [
        { mot: "parc d'attraction", volume: 96200 },
        { mot: "sortie en famille", volume: 2400 },
        { mot: "idée sortie", volume: 1100 },
        { mot: "parc de loisirs enfants", volume: 110 },
        { mot: "billet parc d'attraction", volume: 90 },
      ],
    },
    publics: [
      {
        titre: "Las familias de la región",
        texte:
          "El núcleo de la afluencia: campañas de Meta, pase de temporada y eventos (Halloween, Navidad).",
      },
      {
        titre: "Los turistas",
        texte:
          "SEO y campañas de Google en las zonas de alojamiento, acuerdos con campings y oficinas de turismo.",
      },
      {
        titre: "Los grupos",
        texte:
          "Empresas, colegios, campamentos urbanos: recordatorios antes de la temporada y formulario de presupuesto medido.",
      },
    ],
    saison:
      "Temporada de abril a octubre, con eventos que alargan la actividad. Preparamos la apertura desde el invierno y ajustamos los presupuestos al tiempo, fin de semana a fin de semana.",
    faq: [
      {
        q: "¿Cómo existir frente a los grandes parques?",
        a: "Con la cercanía, el precio y la experiencia: un parque regional se vende como el plan ideal a menos de una hora en coche. Segmentamos con precisión esa zona de influencia.",
      },
      {
        q: "¿Compensa invertir en eventos de temporada?",
        a: "Sí, alargan la temporada y crean momentos fuertes de comunicación. Construimos una campaña dedicada para cada uno.",
      },
      {
        q: "¿Se pueden pilotar las campañas según el tiempo?",
        a: "Sí: aumentamos la presión publicitaria cuando se anuncia buen tiempo y la reducimos si no, para no pagar clics que no van a venir.",
      },
    ],
  },
  {
    slug: "quad-buggy",
    outils: ["playpro"],
    titre: "Marketing digital para quads, buggies y segways",
    famille: "outdoor",
    nom: "Quad, buggy y segway",
    pour: "las rutas en quad, buggy y segway",
    un: "una actividad de quad o buggy",
    votre: "tu actividad",
    metaDescription:
      "Agencia de marketing digital para rutas en quad, buggy y segway: campañas de Google y Meta, SEO local y seguimiento de reservas para turistas, grupos y despedidas.",
    subtitle:
      "Rutas, paseos, iniciaciones: damos a conocer tu actividad a turistas, grupos y empresas, y seguimos cada reserva.",
    probleme: [
      "Las rutas motorizadas se venden sobre todo a turistas y grupos, que suelen reservar en el último momento.",
      "Las plataformas de actividades se llevan una comisión importante en cada venta.",
      "Desarrollar la reserva directa desde tu web es recuperar ese margen.",
    ],
    demande: {
      intro:
        "«Quad», «buggy» y «segway» superan cada uno las 40 000 búsquedas al mes en Francia, pero una parte corresponde a la compra de vehículos. Las búsquedas de alquiler y de paseo son las que llenan tu agenda.",
      requetes: [
        { mot: "quad", volume: 60500 },
        { mot: "buggy", volume: 40500 },
        { mot: "segway", volume: 40500 },
        { mot: "location quad", volume: 660 },
        { mot: "randonnée quad", volume: 200 },
        { mot: "balade segway", volume: 110 },
      ],
    },
    publics: [
      {
        titre: "Los turistas",
        texte:
          "Buscan sobre el terreno: ficha de Google, anuncios geolocalizados y reserva online rápida.",
      },
      {
        titre: "Despedidas y grupos de amigos",
        texte:
          "Emociones para compartir: vídeos, ofertas de grupo y seguimiento rápido de los presupuestos.",
      },
      {
        titre: "Empresas",
        texte:
          "Eventos corporativos e incentivos: campañas de Google segmentadas y acuerdos con espacios para eventos.",
      },
    ],
    saison:
      "Temporada alta de abril a octubre, impulsada por el turismo. Arrancamos las campañas de grupos desde el invierno y seguimos la afluencia turística de tu zona en temporada.",
    faq: [
      {
        q: "¿Cómo reducir la dependencia de las plataformas de reserva?",
        a: "Captando tú mismo las búsquedas locales con Google Ads y el SEO, y haciendo que reservar en tu web sea tan fácil como en una plataforma.",
      },
      {
        q: "¿Cómo evitar los clics de quienes quieren comprar un quad?",
        a: "Con una segmentación precisa de las búsquedas de paseo y alquiler, y excluyendo las de compra. Limpiamos los términos de búsqueda cada semana.",
      },
      {
        q: "¿El vídeo es imprescindible?",
        a: "Para una actividad de emociones fuertes, sí. Unas cuantas tomas con cámara a bordo suelen bastar para producir tus mejores anuncios.",
      },
    ],
  },
  {
    slug: "activites-nautiques",
    outils: ["playpro"],
    famille: "outdoor",
    nom: "Actividades náuticas",
    pour: "las actividades náuticas",
    un: "un centro de actividades náuticas",
    votre: "tu centro",
    metaDescription:
      "Agencia de marketing digital para actividades náuticas (kayak, paddle surf, moto de agua, wakeboard): campañas de Google y Meta, SEO local y tracking de reservas.",
    subtitle:
      "Kayak, paddle surf, moto de agua, wakeboard, cable ski: llenamos tu temporada con turistas, familias y grupos.",
    probleme: [
      "La temporada náutica es corta y depende mucho del tiempo.",
      "Los clientes suelen reservar el mismo día, desde su lugar de vacaciones.",
      "Hay que ser visible en el sitio adecuado, en el momento adecuado, y estar listo para cobrar online.",
    ],
    demande: {
      intro:
        "«Kayak» se busca más de 670 000 veces al mes en Francia, «paddle» 74 000 veces. Gran parte corresponde a la compra de material: el trabajo consiste en captar solo a quienes quieren practicar contigo.",
      requetes: [
        { mot: "kayak", volume: 673000 },
        { mot: "paddle", volume: 74000 },
        { mot: "jet ski", volume: 18100 },
        { mot: "wakeboard", volume: 14800 },
        { mot: "location kayak", volume: 1100 },
        { mot: "location jet ski", volume: 1100 },
      ],
    },
    publics: [
      {
        titre: "Los veraneantes",
        texte:
          "Buscan sobre el terreno: ficha de Google, anuncios geolocalizados y reserva desde el móvil en dos clics.",
      },
      {
        titre: "Las familias de la región",
        texte:
          "Fines de semana de verano: campañas de Meta y ofertas para familias.",
      },
      {
        titre: "Grupos y campamentos de verano",
        texte:
          "Colonias, empresas, despedidas: recordatorios antes de la temporada y formulario de presupuesto medido.",
      },
    ],
    saison:
      "De mayo a septiembre, con un pico en julio y agosto. Preparamos la temporada desde la primavera con los grupos y luego pilotamos los presupuestos día a día según el tiempo.",
    faq: [
      {
        q: "¿Cómo llegar a los veraneantes que ya están en la zona?",
        a: "Con anuncios geolocalizados alrededor de tu centro y de las zonas de alojamiento, y una ficha de Google completa. Segmentamos a las personas presentes, no solo a los residentes.",
      },
      {
        q: "¿Cómo evitar pagar clics de compradores de material?",
        a: "Segmentando las búsquedas de alquiler y de paseo, y excluyendo las de compra. En temporada, la limpieza de búsquedas es semanal.",
      },
      {
        q: "¿Hace falta web si ya estás en plataformas?",
        a: "Sí: cada reserva directa te ahorra una comisión. Tu web tiene que permitir reservar tan rápido como en una plataforma.",
      },
    ],
  },
  {
    slug: "parc-aquatique",
    outils: ["qweekle", "roller"],
    famille: "outdoor",
    nom: "Parque acuático",
    pour: "los parques acuáticos",
    un: "un parque acuático",
    votre: "tu parque",
    metaDescription:
      "Agencia de marketing digital para parques acuáticos: campañas de Google y Meta, SEO, venta de entradas online y tracking para llenar tu temporada.",
    subtitle:
      "Familias, turistas, grupos, abonados: llenamos tu parque acuático y disparamos la venta de entradas online.",
    probleme: [
      "Un parque acuático concentra su afluencia en unas pocas semanas de calor.",
      "Cada día de buen tiempo mal aprovechado se pierde.",
      "Y la competencia de los campings con piscina y de las piscinas municipales es dura.",
    ],
    demande: {
      intro:
        "33 100 búsquedas al mes de «parc aquatique» en Francia, 27 800 de «centre aquatique». Los campings con parque acuático también atraen miles de búsquedas: un acuerdo que aprovechar.",
      requetes: [
        { mot: "parc aquatique", volume: 33100 },
        { mot: "centre aquatique", volume: 27800 },
        { mot: "camping avec parc aquatique", volume: 5700 },
        { mot: "parc aquatique couvert", volume: 360 },
      ],
    },
    publics: [
      {
        titre: "Las familias",
        texte:
          "El núcleo de la afluencia: campañas de Meta los días de calor, ofertas para familias y pase de temporada.",
      },
      {
        titre: "Los veraneantes",
        texte:
          "Anuncios geolocalizados alrededor de los alojamientos y acuerdos con los campings.",
      },
      {
        titre: "Los grupos",
        texte:
          "Campamentos urbanos, colonias y empresas: recordatorios en primavera y formulario de presupuesto.",
      },
    ],
    saison:
      "Outdoor: de junio a septiembre, con presupuestos pilotados según las previsiones de temperatura. Cubierto: todo el año, con picos durante las vacaciones de invierno.",
    faq: [
      {
        q: "¿Se pueden activar las campañas según el tiempo?",
        a: "Sí: aumentamos la difusión cuando llega el calor y la cortamos los días de lluvia. El presupuesto sigue la probabilidad de visita.",
      },
      {
        q: "¿Cómo impulsar la venta de entradas online?",
        a: "Con tarifas web ventajosas, una venta de entradas rápida en el móvil y campañas que llevan directamente a la compra.",
      },
      {
        q: "¿Son útiles los acuerdos con los campings?",
        a: "Mucho: los veraneantes buscan qué hacer cerca de su alojamiento. Los segmentamos en la zona y a través de los socios.",
      },
    ],
  },
  {
    slug: "sports-aventure",
    outils: ["playpro"],
    titre: "Marketing digital para barranquismo, rafting y vía ferrata",
    famille: "outdoor",
    nom: "Deportes de aventura",
    pour: "las actividades de aguas bravas y de montaña",
    un: "una actividad de barranquismo, rafting o vía ferrata",
    votre: "tu actividad",
    metaDescription:
      "Agencia de marketing digital para barranquismo, rafting, vía ferrata e hidrospeed: campañas de Google y Meta, SEO local y seguimiento de reservas en temporada.",
    subtitle:
      "Barranquismo, rafting, vía ferrata, hidrospeed: llenamos tus salidas con veraneantes, grupos y empresas.",
    probleme: [
      "Las actividades de aventura se venden en una temporada corta, a veraneantes que comparan desde el móvil.",
      "Las plataformas y las oficinas de turismo captan parte de la demanda, con comisión.",
      "La reserva directa y la visibilidad local son las claves de la rentabilidad.",
    ],
    demande: {
      intro:
        "Vía ferrata, barranquismo y rafting superan cada uno las 18 000 búsquedas mensuales en Francia. La demanda viene sobre todo de veraneantes que preparan o viven su estancia.",
      requetes: [
        { mot: "via ferrata", volume: 27800 },
        { mot: "canyoning", volume: 19100 },
        { mot: "rafting", volume: 18100 },
        { mot: "hydrospeed", volume: 3600 },
      ],
    },
    publics: [
      {
        titre: "Los veraneantes",
        texte:
          "Antes y durante la estancia: SEO, ficha de Google y anuncios geolocalizados en tu valle.",
      },
      {
        titre: "Los grupos",
        texte:
          "Despedidas, colonias, clubes: ofertas de grupo y respuestas rápidas a las solicitudes.",
      },
      {
        titre: "Las empresas",
        texte:
          "Eventos corporativos en la montaña: campañas de Google segmentadas y acuerdos con los alojamientos.",
      },
    ],
    saison:
      "De mayo a septiembre, con un pico en julio y agosto. Preparamos los grupos en primavera y segmentamos a los veraneantes presentes en temporada.",
    faq: [
      {
        q: "¿Cómo captar a los veraneantes antes de su llegada?",
        a: "Con contenido SEO sobre tu destino y campañas de Google dirigidas a las búsquedas de actividades en tu región.",
      },
      {
        q: "¿Cómo prescindir de las plataformas?",
        a: "Sin abandonarlas: desarrollamos en paralelo la reserva directa, más rentable, y medimos el peso de cada canal.",
      },
      {
        q: "¿Hace falta una página por actividad?",
        a: "Sí: barranquismo, rafting y vía ferrata tienen públicos y búsquedas distintos. Una página por actividad mejora el posicionamiento y la conversión.",
      },
    ],
  },
  {
    slug: "patinoire",
    outils: ["qweekle", "roller"],
    famille: "outdoor",
    nom: "Pista de hielo",
    pour: "las pistas de hielo",
    un: "una pista de hielo",
    votre: "tu pista de hielo",
    metaDescription:
      "Agencia de marketing digital para pistas de hielo de ocio: campañas de Google y Meta, SEO local, noches temáticas y tracking para llenar tus sesiones públicas.",
    subtitle:
      "Sesiones públicas, noches temáticas, cumpleaños, grupos: hacemos de tu pista de hielo un plan imprescindible del invierno.",
    probleme: [
      "Una pista de hielo concentra su actividad en el invierno y las vacaciones.",
      "Las sesiones públicas se llenan mal entre semana, y las noches temáticas suelen tener poca visibilidad.",
      "Con un coste por clic de los más altos del ocio en Google, cada euro tiene que estar bien invertido.",
    ],
    demande: {
      intro:
        "27 100 búsquedas al mes de «patinoire» en Francia, con un coste por clic en torno a 2 €: uno de los más caros del ocio. El SEO local y la ficha de Google son, por tanto, especialmente rentables.",
      requetes: [{ mot: "patinoire", volume: 27100 }],
    },
    publics: [
      {
        titre: "Las familias",
        texte:
          "Fines de semana y vacaciones de invierno: campañas de Meta y horarios siempre al día en Google.",
      },
      {
        titre: "Adolescentes y jóvenes adultos",
        texte:
          "Noches temáticas y eventos: contenidos en Instagram y TikTok, venta de entradas online.",
      },
      {
        titre: "Grupos y cumpleaños",
        texte:
          "Colegios, empresas, cumpleaños: fórmulas claras y formulario de reserva medido.",
      },
    ],
    saison:
      "Pico de noviembre a marzo, con la Navidad y las vacaciones de invierno. Lanzamos las campañas desde el otoño y creamos momentos fuertes (noches, eventos) para suavizar la afluencia.",
    faq: [
      {
        q: "¿Cómo llenar las sesiones entre semana?",
        a: "Con ofertas dedicadas (estudiantes, grupos, empresas) y noches temáticas anunciadas en redes y en publicidad local.",
      },
      {
        q: "¿Por qué el SEO local es prioritario?",
        a: "Porque el clic de Google Ads es caro en «patinoire»: una ficha de Google y unas páginas bien posicionadas captan la demanda sin pagar cada visita.",
      },
      {
        q: "¿Una pista de hielo municipal puede trabajar con una agencia?",
        a: "Sí, según sus normas de contratación. Nos adaptamos a las exigencias de las entidades públicas y de las concesionarias.",
      },
    ],
  },
  {
    slug: "base-de-loisirs",
    outils: ["qweekle", "playpro"],
    titre: "Marketing digital para centros de ocio al aire libre",
    famille: "outdoor",
    nom: "Centro de ocio al aire libre",
    pour: "los centros de ocio al aire libre",
    un: "un centro de ocio al aire libre",
    votre: "tu centro",
    metaDescription:
      "Agencia de marketing digital para centros de ocio al aire libre y bases náuticas: campañas de Google y Meta, SEO y tracking para atraer a familias, grupos y veraneantes.",
    subtitle:
      "Baño, actividades náuticas, parque de aventura en los árboles, restauración: damos a conocer toda tu oferta y llenamos tu temporada.",
    probleme: [
      "Un centro de ocio al aire libre suele ofrecer una decena de actividades, gestionadas por equipos o proveedores distintos.",
      "El visitante, en cambio, solo busca un plan en familia para el fin de semana.",
      "Hace falta una comunicación clara, unificada y medible.",
    ],
    demande: {
      intro:
        "18 100 búsquedas al mes de «base de loisirs» en Francia, y miles de familias que buscan qué hacer el fin de semana. Tu centro tiene que responder a esas búsquedas de ideas.",
      requetes: [
        { mot: "base de loisirs", volume: 18100 },
        { mot: "que faire ce week end", volume: 5700 },
        { mot: "base nautique", volume: 4400 },
        { mot: "sortie en famille", volume: 2400 },
      ],
    },
    publics: [
      {
        titre: "Las familias de la región",
        texte:
          "Fines de semana de sol: campañas de Meta, programa de actividades e información práctica al día.",
      },
      {
        titre: "Los grupos",
        texte:
          "Campamentos urbanos, colonias, colegios, empresas: recordatorios en primavera y formulario de presupuesto.",
      },
      {
        titre: "Los veraneantes",
        texte:
          "SEO sobre tu destino y anuncios geolocalizados alrededor de los alojamientos.",
      },
    ],
    saison:
      "Concentrada de mayo a septiembre y muy dependiente del tiempo. Preparamos los grupos desde la primavera y pilotamos los presupuestos para el público general según las previsiones.",
    faq: [
      {
        q: "¿Cómo comunicar una oferta tan amplia?",
        a: "Estructurándola por público (familias, grupos, deportistas) en lugar de por actividad. Cada público tiene su página, sus mensajes y sus campañas.",
      },
      {
        q: "¿Los centros públicos pueden hacer publicidad?",
        a: "Sí. Trabajamos con concesionarias y entidades públicas respetando sus procedimientos de contratación.",
      },
      {
        q: "¿Cómo medir la afluencia generada?",
        a: "Seguimos las reservas online y las solicitudes de grupo, y comparamos la afluencia por periodo para estimar el efecto de las campañas.",
      },
    ],
  },
  {
    slug: "salle-escalade",
    outils: ["roller", "playpro"],
    famille: "outdoor",
    nom: "Rocódromo",
    pour: "los rocódromos",
    un: "un rocódromo",
    votre: "tu rocódromo",
    metaDescription:
      "Agencia de marketing digital para rocódromos y salas de búlder: campañas de Google y Meta, SEO local y tracking para captar principiantes, abonados y grupos.",
    subtitle:
      "Sesiones de iniciación, abonos, clases infantiles, empresas: captamos nuevos escaladores y llenamos tus horas valle.",
    probleme: [
      "La escalada en rocódromo atrae a un público cada vez más amplio, mucho más allá de los escaladores experimentados.",
      "La competencia entre rocódromos se intensifica en las grandes ciudades.",
      "El reto: convertir una sesión de iniciación en un abono.",
    ],
    demande: {
      intro:
        "60 500 búsquedas al mes de «escalade» en Francia, 10 800 de «salle d'escalade». Los principiantes y los padres (escalada infantil) son la principal fuente de crecimiento.",
      requetes: [
        { mot: "escalade", volume: 60500 },
        { mot: "salle d'escalade", volume: 10800 },
        { mot: "escalade enfant", volume: 1300 },
        { mot: "salle de bloc", volume: 810 },
      ],
    },
    publics: [
      {
        titre: "Los principiantes",
        texte:
          "Sesiones de iniciación y ofertas de prueba impulsadas en Google y Meta, y después recordatorios para el abono.",
      },
      {
        titre: "Los niños",
        texte:
          "Clases y cursillos en vacaciones: campañas dirigidas a padres en septiembre y antes de cada periodo de vacaciones.",
      },
      {
        titre: "Las empresas",
        texte:
          "Team building y franjas de mediodía: una palanca para las horas valle.",
      },
    ],
    saison:
      "Picos en septiembre y en enero (buenos propósitos), actividad más tranquila en verano. Concentramos la captación de abonados en esos dos periodos.",
    faq: [
      {
        q: "¿Cómo convertir una sesión de iniciación en un abono?",
        a: "Con una secuencia de emails y SMS después de la primera visita, y una oferta de conversión limitada en el tiempo. Medimos la tasa de paso al abono.",
      },
      {
        q: "¿La escalada entra dentro del ocio?",
        a: "Para la mayoría de tus nuevos clientes, sí: vienen a descubrir una actividad, no a competir. Es a ese público al que captamos.",
      },
      {
        q: "¿Cómo llenar las franjas de día?",
        a: "Con las empresas, los estudiantes y los colegios, y ofertas segmentadas que solo se emiten en esas franjas.",
      },
    ],
  },

  /* ── Estancias y bienestar ─────────────────────────────── */
  {
    slug: "camping",
    famille: "sejour",
    nom: "Camping",
    pour: "los campings",
    un: "un camping",
    votre: "tu camping",
    metaDescription:
      "Agencia de marketing digital para campings y alojamientos al aire libre: SEO, Google Ads, Meta Ads y tracking para aumentar las reservas directas.",
    subtitle:
      "Mobile homes, parcelas, estancias todo incluido: aumentamos tus reservas directas y reducimos tu dependencia de las plataformas.",
    probleme: [
      "Las plataformas de reserva captan una parte creciente de las estancias, con comisiones que recortan tu margen.",
      "Tus clientes preparan sus vacaciones con meses de antelación y comparan durante mucho tiempo.",
      "Una web rápida, bien posicionada y conectada a tus campañas es la condición para recuperar esas reservas directas.",
    ],
    demande: {
      intro:
        "«Camping» se busca más de un millón de veces al mes en Francia. Las búsquedas precisas (piscina, primera línea de mar, parque acuático) son las que convierten. Por parte de los profesionales, el SEO y la web son los temas más buscados del ocio.",
      requetes: [
        { mot: "camping", volume: 1220000 },
        { mot: "camping piscine", volume: 9900 },
        { mot: "camping bord de mer", volume: 9900 },
        { mot: "camping avec parc aquatique", volume: 5700 },
        { mot: "seo camping", volume: 110 },
        { mot: "création site internet camping", volume: 90 },
      ],
    },
    publics: [
      {
        titre: "Las familias de vacaciones",
        texte:
          "Reservan pronto: SEO sobre tus puntos fuertes (piscina, mar, animación) y campañas de Google desde enero.",
      },
      {
        titre: "Los antiguos clientes",
        texte:
          "Los más rentables: emailing de fidelización y ofertas de reserva anticipada.",
      },
      {
        titre: "Las escapadas cortas",
        texte:
          "Puentes y fines de semana: campañas de Meta geosegmentadas en las ciudades cercanas.",
      },
    ],
    saison:
      "Las reservas arrancan desde el otoño anterior, con un pico de enero a marzo. Preparamos la temporada siguiente desde finales del verano y reactivamos las últimas plazas libres en primavera.",
    faq: [
      {
        q: "¿Cómo aumentar las reservas directas?",
        a: "Con una web rápida, un motor de reservas sencillo, SEO sobre tus puntos fuertes y campañas con tu propia marca para no dejar que las plataformas capten a tus clientes.",
      },
      {
        q: "¿Cuándo lanzar las campañas?",
        a: "Desde el otoño para los antiguos clientes, y en enero para el público general: es entonces cuando se reserva lo esencial del verano.",
      },
      {
        q: "¿Creáis webs para campings?",
        a: "Sí, creamos y posicionamos webs pensadas para la reserva, conectadas a tu motor y a tus herramientas de medición.",
      },
    ],
  },
  {
    slug: "hebergement-insolite",
    titre: "Marketing digital para alojamientos singulares",
    famille: "sejour",
    nom: "Alojamiento singular",
    pour: "los alojamientos singulares",
    un: "un alojamiento singular",
    votre: "tu alojamiento",
    metaDescription:
      "Agencia de marketing digital para alojamientos singulares y glamping: cabañas, burbujas, lodges. SEO, Meta Ads, Google Ads y tracking de las reservas directas.",
    subtitle:
      "Cabañas en los árboles, burbujas, lodges, glamping: vendemos la experiencia antes que la noche y aumentamos tus reservas directas.",
    probleme: [
      "Un alojamiento singular vende una experiencia, a menudo regalada o reservada para una ocasión especial.",
      "Las plataformas y las cajas regalo se llevan una parte importante del margen.",
      "Tus fotos y tu relato son tus mejores bazas para vender directamente.",
    ],
    demande: {
      intro:
        "«Cabane dans les arbres» (cabaña en los árboles) se busca 40 500 veces al mes en Francia, «nuit insolite» 18 100 veces. Una demanda emocional, impulsada por lo visual: Instagram y Meta son especialmente eficaces.",
      requetes: [
        { mot: "cabane dans les arbres", volume: 40500 },
        { mot: "nuit insolite", volume: 18100 },
        { mot: "hébergement insolite", volume: 12100 },
        { mot: "glamping", volume: 9900 },
      ],
    },
    publics: [
      {
        titre: "Las parejas",
        texte:
          "Aniversarios, San Valentín, peticiones de mano: campañas de Meta y ofertas románticas.",
      },
      {
        titre: "Quienes hacen regalos",
        texte:
          "Bonos regalo online, con picos en Navidad y el Día de la Madre.",
      },
      {
        titre: "Las familias y amigos",
        texte:
          "Fines de semana y vacaciones: SEO sobre tu región y tus alojamientos.",
      },
    ],
    saison:
      "Reservas todo el año, con picos en San Valentín, en primavera y en verano, y bonos regalo a final de año. Construimos un calendario de campañas en torno a esas ocasiones.",
    faq: [
      {
        q: "¿Instagram es imprescindible?",
        a: "Para un alojamiento singular, es tu escaparate principal. Trabajamos tus contenidos, tus anuncios de Meta y las colaboraciones con creadores.",
      },
      {
        q: "¿Cómo vender bonos regalo directamente?",
        a: "Con una tienda de regalos sencilla en tu web y campañas ajustadas a las fechas señaladas. Cada bono vendido se mide como una conversión.",
      },
      {
        q: "¿Cómo reducir el peso de las plataformas?",
        a: "Haciendo tu reserva directa igual de sencilla y captando tú mismo las búsquedas de tu marca y tu región.",
      },
    ],
  },
  {
    slug: "tourisme",
    outils: ["qweekle", "yurplan"],
    famille: "sejour",
    nom: "Turismo",
    pour: "los actores del turismo",
    un: "una actividad turística",
    votre: "tu actividad",
    metaDescription:
      "Agencia de marketing digital para actores del turismo y actividades turísticas: SEO, Google Ads, Meta Ads, influencia y tracking para atraer a más visitantes.",
    subtitle:
      "Lugares de visita, actividades, visitas guiadas, destinos: traemos visitantes antes y durante su estancia, y medimos lo que funciona.",
    probleme: [
      "El visitante prepara su estancia online y luego busca qué hacer una vez allí.",
      "Tu actividad tiene que aparecer en esos dos momentos, en Google y en las redes sociales.",
      "Y sin medición, es imposible saber si tus visitantes vienen de tus campañas o por casualidad.",
    ],
    demande: {
      intro:
        "Las búsquedas de ideas de planes se cuentan por miles cada mes en Francia. Por parte de los profesionales, el turismo es uno de los pocos sectores del ocio donde se busca activamente una agencia (comunicación, SEO, web).",
      requetes: [
        { mot: "que faire ce week end", volume: 5700 },
        { mot: "sortie en famille", volume: 2400 },
        { mot: "idée sortie", volume: 1100 },
        { mot: "visite guidée", volume: 910 },
        { mot: "agence communication tourisme", volume: 110 },
        { mot: "agence seo tourisme", volume: 90 },
      ],
    },
    publics: [
      {
        titre: "Los visitantes que preparan su viaje",
        texte:
          "SEO sobre tu destino y campañas de Google en las regiones de origen.",
      },
      {
        titre: "Los visitantes que ya están allí",
        texte:
          "Ficha de Google, anuncios geolocalizados y reserva desde el móvil.",
      },
      {
        titre: "Los grupos",
        texte:
          "Operadores de autocares, colegios, empresas: formulario de presupuesto y recordatorios antes de la temporada.",
      },
    ],
    saison:
      "Estacionalidad propia de cada destino. Construimos un calendario de marketing alineado con tus periodos fuertes, con un trabajo de fondo en la temporada media.",
    faq: [
      {
        q: "¿Trabajáis con oficinas de turismo?",
        a: "Trabajamos sobre todo con explotadores de actividades y lugares de visita, y colaboramos con gusto con las oficinas de turismo de su destino.",
      },
      {
        q: "¿La influencia funciona para una actividad turística?",
        a: "Sí, sobre todo con creadores locales. Nuestra plataforma Allocreator permite encontrar a los que están cerca de tu establecimiento.",
      },
      {
        q: "¿Cómo llegar a los turistas extranjeros?",
        a: "Con páginas y campañas en su idioma, segmentadas por sus países y sus periodos de viaje.",
      },
    ],
  },
  {
    slug: "spa",
    famille: "sejour",
    nom: "Spa",
    pour: "los spas",
    un: "un spa",
    votre: "tu spa",
    metaDescription:
      "Agencia de marketing digital para spas, day spas y spas privados: SEO local, Google Ads, Meta Ads, bonos regalo y tracking de reservas.",
    subtitle:
      "Day spa, spa privado, tratamientos y masajes, bonos regalo: llenamos tu agenda y hacemos de tu spa la referencia de tu ciudad.",
    probleme: [
      "El spa es un mercado enorme y muy competido, entre hoteles, centros de estética y spas privados.",
      "Gran parte de la facturación pasa por los bonos regalo, con picos muy marcados.",
      "Y los horarios entre semana siguen siendo difíciles de llenar sin ofertas segmentadas.",
    ],
    demande: {
      intro:
        "«Spa» se busca 550 000 veces al mes en Francia, «massage» 301 000 veces. Los formatos privados y el regalo tiran de una demanda de alto valor.",
      requetes: [
        { mot: "spa", volume: 550000 },
        { mot: "massage", volume: 301000 },
        { mot: "sauna", volume: 60500 },
        { mot: "spa privatif", volume: 12100 },
        { mot: "day spa", volume: 1900 },
        { mot: "coffret spa", volume: 390 },
      ],
    },
    publics: [
      {
        titre: "Las parejas",
        texte:
          "Spa privado, tratamientos en pareja: campañas de Meta y ofertas para ocasiones especiales (San Valentín, aniversarios).",
      },
      {
        titre: "Quienes hacen regalos",
        texte:
          "Bonos regalo online, con campañas ajustadas a Navidad, el Día de la Madre y San Valentín.",
      },
      {
        titre: "Los clientes habituales",
        texte:
          "Abonos y curas: emailing, fidelización y relleno de los horarios entre semana.",
      },
    ],
    saison:
      "Picos en invierno, en Navidad, en San Valentín y en el Día de la Madre. Preparamos cada momento fuerte con antelación y aprovechamos los periodos flojos para fidelizar.",
    faq: [
      {
        q: "¿Cómo vender más bonos regalo?",
        a: "Con una tienda online sencilla, fotos cuidadas y campañas lanzadas dos o tres semanas antes de cada fecha señalada. Cada bono vendido se mide como una conversión.",
      },
      {
        q: "¿Cómo llenar los horarios entre semana?",
        a: "Con ofertas reservadas a esos horarios, difundidas entre los clientes locales y las empresas de tu zona.",
      },
      {
        q: "¿Un spa de hotel puede trabajar con vosotros?",
        a: "Sí: trabajamos la visibilidad del spa entre la clientela local, como complemento de la clientela del hotel.",
      },
    ],
  },
  {
    slug: "love-room",
    famille: "sejour",
    nom: "Love rooms",
    titre: "Marketing digital para love rooms y salas por horas",
    pour: "las love rooms y salas temáticas por horas",
    un: "una love room",
    votre: "tu love room",
    metaDescription:
      "Agencia de marketing digital para love rooms, suites privadas y salas temáticas por horas: SEO local, reserva online, WhatsApp automatizado y tracking.",
    subtitle:
      "Suites con jacuzzi, habitaciones temáticas, salas por horas: llenamos tus franjas entre semana, automatizamos las reservas y vendemos tus tarjetas regalo, con total discreción.",
    probleme: [
      "Una love room vende tiempo: cada franja vacía de un martes por la tarde se pierde para siempre.",
      "La mayoría de las reservas siguen llegando por teléfono o WhatsApp, con una señal que hay que comprobar a mano: horas de mensajes para el equipo, y clientes que se van porque no reciben respuesta al momento.",
      "Y la publicidad está limitada: Google y Meta restringen mucho los anuncios relacionados con la intimidad. El SEO local, la ficha de Google y el seguimiento de las reservas se vuelven decisivos.",
    ],
    demande: {
      intro:
        "«Habitaciones por horas» se busca 5400 veces al mes en España y «hotel por horas barcelona» unas 600, con picos de casi 3000 en primavera. Una demanda muy local, que se gana en Google Maps y con el SEO más que con publicidad.",
      requetes: [
        { mot: "habitaciones por horas", volume: 5400 },
        { mot: "hotel por horas barcelona", volume: 610 },
        { mot: "love room", volume: 480 },
        { mot: "love room barcelona", volume: 210 },
        { mot: "habitacion bdsm", volume: 210 },
        { mot: "habitaciones por horas barcelona", volume: 40 },
      ],
      source:
        "Volúmenes de búsqueda de Google en España, medidos con SE Ranking en noviembre de 2026.",
    },
    publics: [
      {
        titre: "Las parejas",
        texte:
          "Una tarde o una noche diferente: SEO local, ficha de Google cuidada y campañas alrededor de las fechas clave (San Valentín, aniversarios).",
      },
      {
        titre: "Quienes regalan",
        texte:
          "Tarjetas regalo vendidas online y enviadas en PDF, con campañas preparadas para Navidad y San Valentín.",
      },
      {
        titre: "Turistas y creativos",
        texte:
          "Visitantes que buscan en inglés, fotógrafos y videógrafos que alquilan un decorado por horas: páginas específicas y web multilingüe.",
      },
    ],
    saison:
      "Picos en San Valentín, los fines de semana y en vacaciones; huecos entre semana y durante el día. Llenamos esos huecos con tarifas específicas y recordatorios automáticos, y preparamos las fechas fuertes con antelación.",
    faq: [
      {
        q: "¿Se puede hacer publicidad de una love room?",
        a: "Sí, con cuidado: Google Ads y Meta regulan de forma estricta los contenidos relacionados con la intimidad. Creamos anuncios y visuales que cumplen sus normas (decoración, ambiente, regalo, discreción) y apostamos sobre todo por lo que no está limitado: SEO local, ficha de Google, reseñas y colaboraciones.",
      },
      {
        q: "¿Cómo se automatizan las reservas por WhatsApp?",
        a: "Con un asistente de WhatsApp conectado a tu agenda: responde al instante a las preguntas (tarifas, disponibilidad, acceso), propone las franjas libres, envía el enlace de pago de la señal y la confirmación. Tu equipo solo interviene en los casos especiales.",
      },
      {
        q: "¿Cómo se miden las reservas que llegan por WhatsApp o por teléfono?",
        a: "Registrando cada clic hacia WhatsApp y cada llamada desde la web, y enviando las reservas confirmadas a Google y Meta. Por fin sabes qué búsquedas y qué campañas llenan tus salas.",
      },
      {
        q: "¿Cómo se protege la discreción de tus clientes?",
        a: "Guía toda la comunicación: ningún dato sensible en las campañas, mensajes y confirmaciones sobrios, y audiencias publicitarias agregadas y anónimas.",
      },
    ],
  },
];

/**
 * FAQ « agence » en espagnol, placée avant la FAQ métier de chaque secteur.
 * Même structure que faqAgence dans src/lib/secteurs.ts.
 */
export function faqAgenceEs(s: Secteur): Array<{ q: string; a: string }> {
  return [
    {
      q: `¿Cómo funciona vuestro acompañamiento en marketing digital para ${s.pour}?`,
      a: `Activamos las palancas que generan reservas para ${s.votre}: SEO local, Google Ads, Meta Ads e influencia, con un seguimiento fiable de las ventas. Métodos ya probados en el sector del ocio, adaptados a tu situación.`,
    },
    {
      q: `¿Qué palancas de marketing activáis para ${s.votre}?`,
      a: "Estrategia, campañas de Google y Meta, SEO y web, tracking, reporting, contenidos, influencia y formación. Empezamos por las dos o tres palancas que más impacto tendrán.",
    },
    {
      q: `¿Qué presupuesto hay que prever para el marketing digital de ${s.votre}?`,
      a: "No hay un mínimo impuesto: el presupuesto publicitario depende de tu tamaño, tu estacionalidad y tus objetivos. Es independiente de nuestros honorarios.",
    },
    {
      q: "¿En cuánto tiempo puedo ver el retorno de la inversión?",
      a: "Las campañas de Google y Meta están en marcha en menos de 15 días, con un objetivo de +20 % de afluencia desde los primeros 45 días. El SEO tarda más, pero sus efectos duran.",
    },
    {
      q: "¿Hay permanencia?",
      a: "No, ningún compromiso: puedes dejarlo cuando quieras, sin dar explicaciones.",
    },
    {
      q: `¿Por qué elegir Banana Growth Agency para ${s.votre}?`,
      a: "Acompañamos a más de 20 negocios de ocio en Francia y conocemos sus retos: estacionalidad, horas valle, cumpleaños, grupos, software de reservas.",
    },
    {
      q: "¿Qué pasa durante la auditoría gratuita?",
      a: "En 30 minutos revisamos tu web, tu ficha de Google, tus campañas y tu seguimiento de reservas, y te llevas pistas concretas.",
    },
  ];
}

/** Secteurs groupés par famille, dans l'ordre du pied de page (version espagnole). */
export function secteursParFamilleEs() {
  return (Object.keys(FAMILLES_ES) as Famille[]).map((famille) => ({
    famille,
    label: FAMILLES_ES[famille],
    secteurs: SECTEURS_ES.filter((s) => s.famille === famille),
  }));
}

/** Secteur espagnol par slug français. */
export function getSecteurEs(slug: string): Secteur | undefined {
  return SECTEURS_ES.find((s) => s.slug === slug);
}
