/**
 * Contenido de la página principal de los planes de etiquetado (versión en español).
 *
 * Se sitúa por encima de las guías por herramienta y se dirige al lector
 * antes de que sepa cuál es su problema: constata una diferencia entre sus
 * conversiones y su caja, pero todavía no sabe que la causa es el embudo
 * de reserva.
 */

export const TAGGAGE_HUB_ES = {
  eyebrow: "Recursos — parques de ocio",
  title: "Plan de etiquetado para",
  titleHighlight: "parque de ocio",
  chapo:
    "Tu Google Ads muestra cuarenta reservas y tu caja cuenta doce. Casi nunca es la publicidad la que miente: es la medición la que se rompe en algún punto entre tu web y tu motor de reservas.",
  intro:
    "Un parque de ocio tiene una particularidad que pocos negocios comparten: el pago no se hace en su web. Se hace en el embudo de su software de reservas, a menudo alojado en un dominio que no le pertenece. Para un navegador son dos sitios distintos, y el rastro del visitante se pierde ahí si nadie los ha conectado.",
  intro2:
    "Estas guías parten de esa realidad. Están escritas a partir de contenedores de medición realmente desplegados en embudos en producción, uno por motor de reservas.",

  symptomes: {
    titre: "¿Reconoces alguno de estos síntomas?",
    liste: [
      "Tus conversiones de Google Ads superan con creces el número de reservas cobradas.",
      "El nombre de tu motor de reservas aparece como fuente de tráfico en tus estadísticas.",
      "Meta anuncia un coste por reserva demasiado bueno para ser verdad.",
      "La facturación de tus herramientas de analítica nunca cuadra con tu caja.",
      "Tus audiencias de remarketing se vacían sin motivo aparente.",
      "No sabes decir qué parte de tus reservas viene de Google y cuál de las redes sociales.",
    ],
    conclusion:
      "Todos tienen la misma familia de causas, y tienen solución. La guía de tu motor las repasa una por una.",
  },

  causes: {
    titre: "Las cuatro causas, sea cual sea el motor",
    liste: [
      {
        titre: "El cambio de dominio sin conectar",
        desc: "Es la primera causa, con diferencia. El visitante pasa de la web del parque al embudo de reserva, alojado en otro sitio. Sin una conexión explícita, la sesión vuelve a empezar de cero: la venta se atribuye al motor de reservas en lugar de a la campaña que la generó. Nada avisa del error: las conversiones se siguen contando, solo que en el lugar equivocado.",
      },
      {
        titre: "El ID de pedido mal colocado",
        desc: "Google Ads lo usa para no contar dos veces la misma compra. Si se rellena por error en el añadido al carrito o en el paso de pago, fusiona las tres conversiones en una sola. El síntoma es contraintuitivo: menos conversiones que ventas reales.",
      },
      {
        titre: "Los pasos intermedios sin importe",
        desc: "Un añadido al carrito enviado sin valor impide a los algoritmos distinguir una entrada de quince euros de una reserva privada de mil. En un parque donde las compras son poco numerosas, es privar a la optimización de su mejor señal intermedia.",
      },
      {
        titre: "El consentimiento mostrado pero no conectado",
        desc: "No basta con que se muestre un banner de cookies. Mientras las etiquetas no estén condicionadas a la elección del visitante, se activan haga clic donde haga clic. Y desde 2024, Google condiciona el remarketing y las audiencias personalizadas a la transmisión de ese consentimiento: sin él, las funciones se degradan en silencio.",
      },
    ],
  },

  comparatif: {
    titre: "Lo que cada motor permite de verdad",
    intro:
      "No todos los motores rinden igual en medición, y la diferencia es mayor de lo que se cree. Esto es lo que muestran las documentaciones oficiales y las instalaciones que gestionamos. Qweekle se compara aquí en su versión 3: su versión 2, todavía muy desplegada, queda claramente por detrás.",
    colonnes: ["Qweekle V3", "Apex Timing", "ROLLER", "BMI Leisure"],
    lignes: [
      {
        critere: "Nomenclatura de eventos",
        valeurs: ["Conforme", "Conforme", "Conforme", "Obsoleta"],
      },
      {
        critere: "Documentación pública del etiquetado",
        valeurs: ["Sí, detallada", "Sí", "Sí", "Ninguna"],
      },
      {
        critere: "Listo para usar",
        valeurs: [
          "4 módulos GTM para importar",
          "Campos de identificadores",
          "Integraciones nativas",
          "Nada",
        ],
      },
      {
        critere: "Consent Mode incluido",
        valeurs: ["Sí", "Función específica", "Por confirmar", "Indicador en bruto"],
      },
      {
        critere: "Dato de usuario con hash incluido",
        valeurs: ["Sí", "No", "No", "No"],
      },
      {
        critere: "Embudo en el dominio del parque",
        valeurs: ["No", "No", "Opcional", "No"],
      },
      {
        critere: "Multisitio sin configuración duplicada",
        valeurs: ["Sí", "No", "Sí", "No"],
      },
      {
        critere: "Esfuerzo de implementación",
        valeurs: ["Bajo", "Bajo", "Bajo", "Alto"],
      },
    ],
  },

  cta: {
    titre: "¿Prefieres que nos encarguemos nosotros?",
    texte:
      "Gestionamos estas plataformas a diario para una veintena de parques en Francia. Auditamos tu instalación, te decimos qué se pierde, dónde y cuánto cuesta, y después lo corregimos.",
    bouton: "Reservar mi auditoría",
  },
} as const;
