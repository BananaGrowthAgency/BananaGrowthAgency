/* ─────────────────────────────────────────────────────────────
   Página de inicio — versión española (/es).
   Mismas formas que HERO, PROBLEM, DIFFERENTIATION… en src/lib/site.ts.
   ───────────────────────────────────────────────────────────── */

export const HERO_ES = {
  title: "La agencia de Growth Marketing",
  titleHighlight: "que vitamina tu crecimiento",
  cta: "Reservar una cita",
  subtitle:
    "Creamos estrategias de marketing multicanal a medida que garantizan el ROI de nuestros clientes.",
} as const;

export const HERO_STATS_ES = [
  { value: "10 años", label: "de experiencia en growth" },
  { value: "+490%", label: "de facturación generada" },
  { value: "560%", label: "de ROAS máximo" },
] as const;

export const PROBLEM_ES = {
  title: "¿Tu crecimiento se ha estancado?",
  intro:
    "No basta con gastar dinero en Meta o Google para crecer.",
  lines: [
    "Hoy las tendencias cambian rápido. Y tus competidores también.",
    "Cada semana sin una estrategia clara es una oportunidad que aprovechan ellos en tu lugar.",
    "Crear sinergia entre tus canales de adquisición y sus algoritmos es fundamental para tu éxito.",
  ],
  punch: "Y en Banana Growth Agency, es lo que mejor sabemos hacer.",
  outro:
    "Creamos estrategias de marketing multicanal a medida que garantizan el ROI de nuestros clientes.",
} as const;

export const DIFFERENTIATION_ES = {
  title: "¿En qué nos diferenciamos?",
  lines: [
    "Desde hace 10 años, diseñamos, implementamos y analizamos cada estrategia que desplegamos.",
    "Dominamos las dinámicas actuales de comunicación, los retos técnicos y la orquestación de canales para sacarles el máximo rendimiento.",
    "Al hacernos cargo de todos los temas de adquisición, garantizamos resultados concretos.",
  ],
  highlights: [
    "Es simple: nos encargamos de todo.",
    "Nuestro único objetivo: hacerte ganar dinero.",
  ],
  closing:
    "Hablemos. En 30 minutos identificaremos juntos tus principales palancas de optimización.",
} as const;

export const SERVICES_ES = [
  {
    title: "Estrategia",
    desc: "Te proponemos una hoja de ruta según tus objetivos.",
    icon: "target",
  },
  {
    title: "Data",
    desc: "Implementamos trackers que alimentan los algoritmos.",
    icon: "analytics",
  },
  {
    title: "SEO",
    desc: "Creamos webs y estrategias SEO que a Google le encantan.",
    icon: "web",
  },
  {
    title: "Visuales y Vídeos",
    desc: "Elaboramos contenidos creativos de alto rendimiento.",
    icon: "video",
  },
  {
    title: "Paid Marketing",
    desc: "Optimizamos tus cuentas publicitarias de SEA y Social Ads.",
    icon: "rocket",
  },
  {
    title: "CRM y Emailing",
    desc: "Optimizamos todo tu CRM y tu generación de leads.",
    icon: "email",
  },
  {
    title: "Copywriting",
    desc: "Escribimos textos que generan facturación.",
    icon: "content",
  },
  {
    title: "Performance",
    desc: "Analizamos y maximizamos tus márgenes.",
    icon: "growth",
  },
  {
    title: "CRO",
    desc: "Optimizamos tu tasa de conversión y aumentamos tus ventas.",
    icon: "roi",
  },
] as const;

export const PROCESS_ES = [
  {
    step: "1",
    desc: "Reservas una cita con nuestro equipo.",
  },
  {
    step: "2",
    desc: "Hablamos de tus objetivos, tu modelo de negocio y tu estrategia de adquisición actual.",
  },
  {
    step: "3",
    desc: "Te presentamos una propuesta de acompañamiento a medida que se desarrollará durante 30 días.",
  },
  {
    step: "4",
    desc: "Trabajamos a tope durante 30 días para estructurar una estrategia de adquisición a medida y escalable.",
  },
] as const;

export const USE_CASES_ES = [
  {
    channel: "Meta Ads",
    context: "E-commerce que quiere escalar",
    headline: "x15 en la facturación mensual en 6 meses",
    detail: "De 10 000 € a 150 000 €/mes con Meta Ads",
    image: "meta-leads",
  },
  {
    channel: "Google Ads",
    context: "Negocio con alta intención de compra",
    headline: "x20 en la facturación mensual en 12 meses",
    detail: "De 7 000 € a 170 000 €/mes de facturación",
    image: "google-ads",
  },
  {
    channel: "SEO",
    context: "E-commerce muy estacional",
    headline: "De 100 a 900 clics/día en 12 meses",
    detail: "Tráfico orgánico multiplicado por 9",
    image: "seo-search-console",
  },
  {
    channel: "Adquisición 360°",
    context: "E-commerce B2C en Shopify",
    headline: "+490% de facturación de un año a otro",
    detail: "Estrategia de adquisición completa desplegada",
    image: "shopify-490",
  },
  {
    channel: "Meta Ads",
    context: "E-commerce que quiere maximizar su margen",
    headline: "ROAS del 560%",
    detail:
      "20 000 € de facturación adicional al mes con 3 650 € de inversión",
    image: "meta-roas",
  },
  {
    channel: "Lead Gen B2B",
    context: "Generación de leads (folleto informativo)",
    headline: "~75 leads/mes a menos de 5 €/lead",
    detail:
      "Leads cualificados: nombre, apellido, email, teléfono, empresa, cargo",
    image: "meta-scale",
  },
  {
    channel: "SEO",
    context: "E-commerce que quiere aumentar su tráfico orgánico",
    headline: "De 60 a 500 clics/día en 6 meses",
    detail: "Tráfico orgánico multiplicado por 8",
    image: "seo-clicks",
  },
] as const;

export const TESTIMONIALS_ES = [
  {
    quote:
      "Serios, profesionales, proactivos, disponibles… todo lo que se puede soñar cuando buscas un acompañamiento.",
    author: "Hugo Perpere",
    role: "Fundador y CEO, Nikito",
    photo: "home-hugo-perpere",
    logo: "nikito",
    company: "Nikito",
  },
  {
    quote:
      "Muy buena experiencia, buena pedagogía y un buen empuje de growth. ¡Los recomiendo!",
    author: "Hugo Manoukian",
    role: "Inversor y cofundador, Maison Serena",
    photo: "home-hugo-manoukian",
    logo: "maison-serena",
    company: "Maison Serena",
  },
  {
    quote:
      "Ultraprofesionales y resolutivos, supieron analizar y corregir errores relacionados con el e-commerce. Aumentaron los ingresos sin perder de vista nuestro margen. Son unos auténticos « game changers » en la vida de una empresa.",
    author: "Laure Lagarde",
    role: "Fundadora y CEO, Emily's Pillow",
    photo: "home-laure-lagarde",
    logo: "emilys",
    company: "Emily's Pillow",
  },
  {
    quote:
      "En solo dos meses, observamos un aumento significativo del tráfico, del ticket medio y de las ventas, todo ello con un seguimiento riguroso de la rentabilidad.",
    author: "Marie Esquellisse",
    role: "Cofundadora, Cercle",
    photo: "home-marie-esquellisse",
    logo: "cercle",
    company: "Cercle",
  },
  {
    quote:
      "Fueron muy rápidos en entender y analizar nuestras necesidades. Propusieron soluciones eficaces con una muy buena relación calidad-precio. Es muy raro encontrar buenos profesionales del marketing con una visión global y digital.",
    author: "Laurent Houitte",
    role: "Fundador y CEO, Kite & Connect",
    photo: "home-laurent-houitte",
    logo: "kute-connect",
    company: "Kite & Connect",
  },
  {
    quote:
      "Lo que los distingue es su capacidad para combinar un análisis minucioso de los datos con una comprensión instintiva del mercado y de las tendencias. ¡Los recomiendo al 100 %!",
    author: "Emeline Siron",
    role: "Fundadora y CEO, Evermind",
    photo: "home-emeline-siron",
    logo: "evermind",
    company: "Evermind",
  },
] as const;

export const FINAL_CTA_ES = {
  title: "¿Listo para vitaminar tu crecimiento?",
  subtitle: "Reserva tu auditoría gratuita.",
  cta: "Reservar una cita",
} as const;

export const CONTACT_ES = {
  title: "¿Alguna pregunta?",
  subtitle: "Nuestro equipo está a tu disposición.",
} as const;
