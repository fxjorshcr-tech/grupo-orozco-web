import type { Locale } from "./i18n";
import type {
  AgenciaId,
  AreaId,
  IndicadorId,
  MetricaId,
  NavId,
  OficinaId,
  PilarId,
  TipoPropiedadId,
  VentajaId,
} from "./content";

/**
 * Todo el texto visible del sitio, en cada idioma.
 * Para editar una frase basta con cambiarla aquí; no hay copia en los
 * componentes.
 */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
  };
  a11y: {
    saltarContenido: string;
    inicio: string;
    abrirMenu: string;
    cerrarMenu: string;
    cambiarIdioma: string;
  };
  nav: Record<NavId, string>;
  hero: {
    eyebrow: string;
    lema: string;
    apoyo: string;
    ctaParques: string;
    ctaGrupo: string;
  };
  nosotros: {
    eyebrow: string;
    titulo: [string, string];
    parrafos: [string, string];
    pilares: Record<PilarId, { titulo: string; desc: string }>;
  };
  integral: {
    eyebrow: string;
    titulo: [string, string];
    descripcion: string;
    ejeEyebrow: string;
    ejeTitulo: string;
    ejeTexto: string;
    areas: Record<AreaId, { area: string; desc: string }>;
    cierre: string;
  };
  capital: {
    eyebrow: string;
    titulo: [string, string];
    texto: string;
  };
  parques: {
    eyebrow: string;
    titulo: string;
    descripcion: string;
    visitar: string;
    proximaApertura: string;
    indicadores: Record<IndicadorId, string>;
  };
  agencias: {
    eyebrow: string;
    titulo: string;
    descripcion: string;
    items: Record<AgenciaId, string>;
  };
  servicios: {
    eyebrow: string;
    titulo: string;
    descripcion: string;
    transporte: { eyebrow: string; texto: string };
    tecnologia: { eyebrow: string; texto: string };
    construccion: { eyebrow: string; texto: string };
  };
  orostudios: {
    eyebrow: string;
    texto: string;
    metricas: Record<MetricaId, string>;
    cta: string;
    oficinas: {
      badge: string;
      titulo: string;
      descripcion: string;
      beneficios: [string, string];
      descripciones: Record<OficinaId, string>;
    };
    proximas: {
      eyebrow: string;
      titulo: string;
      descripcion: string;
      badge: string;
    };
  };
  bienesRaices: {
    eyebrow: string;
    titulo: [string, string];
    lema: string;
    texto: string;
    ventajasTitulo: string;
    ventajas: Record<VentajaId, { titulo: string; desc: string }>;
    tiposTitulo: string;
    tipos: Record<TipoPropiedadId, string>;
    cobertura: string;
    cta: string;
    ctaWhatsapp: string;
    director: string;
    empresaGrupo: string;
  };
  contacto: {
    eyebrow: string;
    titulo: [string, string];
    texto: string;
    ctaCorreo: string;
    ctaWhatsapp: string;
  };
  footer: {
    descripcion: string;
    parques: string;
    agencias: string;
    servicios: string;
    bienesRaices: string;
    poas: string;
    derechos: string;
  };
};

const es: Dictionary = {
  meta: {
    title: "Grupo Oroz — Operación y administración de parques de aventura en Costa Rica",
    description:
      "Grupo de capital costarricense dedicado a operar y administrar parques de aventura. Turismo, fotografía, transporte, tecnología, construcción y bienes raíces, todo bajo un mismo grupo.",
    ogTitle: "Grupo Oroz — Parques de aventura en Costa Rica",
  },
  a11y: {
    saltarContenido: "Saltar al contenido",
    inicio: "Grupo Oroz — inicio",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    cambiarIdioma: "Cambiar idioma",
  },
  nav: {
    grupo: "Grupo",
    parques: "Parques",
    agencias: "Agencias",
    servicios: "Servicios",
    orostudios: "OrostudiosCR",
    bienesraices: "Bienes raíces",
    contacto: "Contacto",
  },
  hero: {
    eyebrow: "Costa Rica · desde 2004",
    lema: "Operamos y administramos parques de aventura en Costa Rica.",
    apoyo:
      "Nos ocupamos de todo lo que hay detrás: la seguridad, el mantenimiento, la gente y cada visitante que llega.",
    ctaParques: "Ver nuestros parques",
    ctaGrupo: "Conocer el grupo",
  },
  nosotros: {
    eyebrow: "Quiénes somos",
    titulo: ["Sabemos lo que cuesta mantener ", "un parque en pie"],
    parrafos: [
      "Un parque de aventura no se sostiene solo con abrir las puertas. Detrás hay líneas que revisar, equipo que mantener, gente que capacitar y cientos de visitantes que atender bien cada día.",
      "Llevamos más de 20 años en eso. Lo conocemos desde adentro porque operamos nuestros propios parques, y esa experiencia es la que ponemos a trabajar en cada proyecto del grupo.",
    ],
    pilares: {
      operacion: {
        titulo: "Operación diaria",
        desc: "Gestión completa de la operación, el personal y los horarios de cada parque.",
      },
      seguridad: {
        titulo: "Seguridad certificada",
        desc: "Estándares ACCT, inspección de líneas y protocolos revisados de forma constante.",
      },
      mantenimiento: {
        titulo: "Mantenimiento",
        desc: "Revisión y mantenimiento continuo de cables, plataformas y equipo de protección.",
      },
      experiencia: {
        titulo: "Experiencia del visitante",
        desc: "Atención cuidada de principio a fin, desde la reserva hasta el último tour.",
      },
    },
  },
  integral: {
    eyebrow: "Trabajo integral",
    titulo: ["Todo lo que un parque necesita, ", "bajo un mismo techo"],
    descripcion:
      "Operamos parques de aventura, pero también nos encargamos de lo que gira alrededor de ellos: la fotografía, el transporte, las reservas y hasta la construcción de los parques nuevos. Al tenerlo todo dentro del grupo, no dependemos de nadie más.",
    ejeEyebrow: "El centro de todo",
    ejeTitulo: "Los parques",
    ejeTexto:
      "Nuestros canopy y parques de aventura. Todo lo demás existe para que funcionen bien y para que el visitante se lleve una gran experiencia.",
    areas: {
      fotografia: {
        area: "Fotografía y video",
        desc: "Fotografía y graba a los visitantes, y produce el contenido de cada parque.",
      },
      transporte: {
        area: "Transporte",
        desc: "Lleva a los turistas hasta la entrada de cada parque, desde cualquier punto del país.",
      },
      tecnologia: {
        area: "Tecnología",
        desc: "Manejan las reservas, los pagos y todo el día a día digital de la operación.",
      },
      construccion: {
        area: "Construcción",
        desc: "Diseña y levanta los parques nuevos, línea por línea.",
      },
    },
    cierre: "La ventaja de trabajar así es simple: la calidad la cuidamos nosotros, de principio a fin.",
  },
  capital: {
    eyebrow: "Hecho en Costa Rica",
    titulo: ["Capital ", "100% costarricense"],
    texto:
      "Grupo Oroz es una empresa de capital costarricense, con raíces locales y equipos formados en el país. Generamos empleo en las comunidades donde operamos y reinvertimos en el turismo de Costa Rica. Lo que construimos, lo construimos aquí.",
  },
  parques: {
    eyebrow: "Administración de parques",
    titulo: "Parques de aventura",
    descripcion:
      "Los parques que operamos y administramos directamente en Costa Rica, cada uno con estándares de seguridad ACCT y mantenimiento constante.",
    visitar: "Visitar sitio web",
    proximaApertura: "Próxima apertura",
    indicadores: {
      experiencia: "Años de experiencia",
      parques: "Parques administrados",
      acct: "Certificación internacional",
      mantenimiento: "Mantenimiento continuo",
    },
  },
  agencias: {
    eyebrow: "Turismo y viajes",
    titulo: "Agencias de viajes",
    descripcion:
      "Nuestras agencias arman los recorridos y conectan a los viajeros con cada destino de Costa Rica.",
    items: {
      crdoing: "Tours a la medida de cada viajero",
      crparadise: "Paquetes y experiencias por todo el país",
      gtt: "Tours guiados con acompañamiento local",
    },
  },
  servicios: {
    eyebrow: "Ecosistema empresarial",
    titulo: "Más servicios",
    descripcion:
      "Las empresas de transporte, tecnología y construcción que sostienen la operación del grupo.",
    transporte: {
      eyebrow: "Transporte",
      texto:
        "Transporte turístico para trasladar a los visitantes hacia cada parque y destino del país.",
    },
    tecnologia: {
      eyebrow: "Tecnología",
      texto:
        "Plataformas de reservas, pagos y gestión que mantienen la operación funcionando cada día.",
    },
    construccion: {
      eyebrow: "Construcción",
      texto:
        "Diseño, construcción y certificación de canopy, desde la primera línea hasta la apertura del parque.",
    },
  },
  orostudios: {
    eyebrow: "Contenido fotográfico",
    texto:
      "Es la rama del grupo dedicada a fotografía y video en parques de aventura. En más de 20 años ha trabajado con más de 18 parques en Costa Rica, capturando la experiencia de cada visitante y generando el contenido de cada marca.",
    metricas: {
      leads: "Nuevos leads",
      ganancia: "Ganancia anual",
      seguidores: "Seguidores",
    },
    cta: "Conocer OrostudiosCR",
    oficinas: {
      badge: "En operación",
      titulo: "Nuestras oficinas",
      descripcion:
        "Oficinas fotográficas de OrostudiosCR instaladas dentro de los parques, atendidas por nuestro propio equipo.",
      beneficios: ["Recuerdos de calidad", "Servicio confiable"],
      descripciones: {
        ama: "La naturaleza y la aventura se fusionan en cada toma. Revive tu recorrido por los cañones y cascadas con fotografías profesionales.",
        ecoglide:
          "Capturamos la emoción pura del canopy entre el verde intenso del Volcán Arenal.",
        skyline:
          "Altura, velocidad y paisajes impresionantes. Nuestro equipo captura cada salto y cada sonrisa.",
        blackstallion:
          "Cabalgatas y aventura entre las playas y el bosque seco de Guanacaste, con servicio fotográfico en sitio.",
        attica:
          "Canopy sobre el bosque de La Fortuna. Oficina equipada para entregar tus fotos el mismo día.",
      },
    },
    proximas: {
      eyebrow: "Próximamente",
      titulo: "Próximas aperturas",
      descripcion:
        "Parques donde ya estamos preparando la instalación de nuestra oficina fotográfica.",
      badge: "Próximamente",
    },
  },
  bienesRaices: {
    eyebrow: "Bienes raíces",
    titulo: ["Su aliado de confianza en ", "bienes raíces"],
    lema: "Lotes, casas y propiedades al mejor precio, en todo Costa Rica.",
    texto:
      "Oroz Real Estate son los asesores inmobiliarios del grupo. Ayudan a familias e inversionistas a encontrar la propiedad ideal y acompañan cada compra de principio a fin: desde la primera visita hasta la firma ante notario y la inscripción en el Registro Nacional. Como abogados, revisamos escritura, gravámenes, planos y permisos antes de cerrar. Todo transparente.",
    ventajasTitulo: "Por qué comprar con nosotros",
    ventajas: {
      juridica: {
        titulo: "Seguridad jurídica",
        desc: "Estudio registral completo de cada propiedad. Su inversión queda inscrita y protegida por ley.",
      },
      extranjeros: {
        titulo: "Extranjeros con plenos derechos",
        desc: "En Costa Rica un extranjero puede comprar con los mismos derechos que un costarricense, sin residencia.",
      },
      plusvalia: {
        titulo: "Plusvalía en crecimiento",
        desc: "El valor de la tierra crece de forma sostenida, sobre todo en zonas turísticas y de desarrollo.",
      },
      acompanamiento: {
        titulo: "Acompañamiento personal",
        desc: "Coordinamos las visitas, resolvemos sus dudas y firmamos el traspaso ante notario.",
      },
    },
    tiposTitulo: "Qué ofrecemos",
    tipos: {
      casas: "Casas",
      lotes: "Lotes",
      fincas: "Fincas",
    },
    cobertura: "En las siete provincias de Costa Rica",
    cta: "Ver propiedades disponibles",
    ctaWhatsapp: "Hablar con Gabriel",
    director: "Director",
    empresaGrupo: "Una empresa de Grupo Oroz",
  },
  contacto: {
    eyebrow: "Hablemos",
    titulo: ["¿Tiene un parque que necesita ", "buena mano"],
    texto:
      "Operación, seguridad, mantenimiento, fotografía o construcción. Cuéntenos qué necesita y le respondemos con una propuesta concreta.",
    ctaCorreo: "Escribir un correo",
    ctaWhatsapp: "Escribir por WhatsApp",
  },
  footer: {
    descripcion:
      "Grupo de capital costarricense dedicado a operar y administrar parques de aventura en Costa Rica.",
    parques: "Parques",
    agencias: "Agencias",
    servicios: "Servicios",
    bienesRaices: "Bienes raíces",
    poas: "Poás Adventure Park (2026)",
    derechos: "Todos los derechos reservados.",
  },
};

const en: Dictionary = {
  meta: {
    title: "Grupo Oroz — Adventure park operation and management in Costa Rica",
    description:
      "A Costa Rican-owned group that operates and manages adventure parks. Tourism, photography, transport, technology, construction and real estate, all under one roof.",
    ogTitle: "Grupo Oroz — Adventure parks in Costa Rica",
  },
  a11y: {
    saltarContenido: "Skip to content",
    inicio: "Grupo Oroz — home",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    cambiarIdioma: "Change language",
  },
  nav: {
    grupo: "Group",
    parques: "Parks",
    agencias: "Agencies",
    servicios: "Services",
    orostudios: "OrostudiosCR",
    bienesraices: "Real estate",
    contacto: "Contact",
  },
  hero: {
    eyebrow: "Costa Rica · since 2004",
    lema: "We operate and manage adventure parks in Costa Rica.",
    apoyo:
      "We take care of everything behind the scenes: safety, maintenance, the crew, and every visitor who walks in.",
    ctaParques: "See our parks",
    ctaGrupo: "About the group",
  },
  nosotros: {
    eyebrow: "Who we are",
    titulo: ["We know what it takes to keep ", "a park running"],
    parrafos: [
      "An adventure park doesn't hold up just by opening its doors. Behind it there are lines to inspect, equipment to service, people to train, and hundreds of visitors to look after properly every day.",
      "We've been doing this for over 20 years. We know it from the inside because we run our own parks, and that experience is what we bring to every project in the group.",
    ],
    pilares: {
      operacion: {
        titulo: "Day-to-day operation",
        desc: "Full management of each park's operation, staff and schedules.",
      },
      seguridad: {
        titulo: "Certified safety",
        desc: "ACCT standards, line inspections and protocols reviewed on an ongoing basis.",
      },
      mantenimiento: {
        titulo: "Maintenance",
        desc: "Continuous inspection and servicing of cables, platforms and protective gear.",
      },
      experiencia: {
        titulo: "Visitor experience",
        desc: "Careful attention from start to finish, from booking to the last tour of the day.",
      },
    },
  },
  integral: {
    eyebrow: "End-to-end work",
    titulo: ["Everything a park needs, ", "under one roof"],
    descripcion:
      "We operate adventure parks, but we also handle everything around them: photography, transport, bookings and even building the new parks. Keeping it all inside the group means we don't depend on anyone else.",
    ejeEyebrow: "At the center of it all",
    ejeTitulo: "The parks",
    ejeTexto:
      "Our canopy tours and adventure parks. Everything else exists so they run well and so visitors leave with a great experience.",
    areas: {
      fotografia: {
        area: "Photography and video",
        desc: "Photographs and films visitors, and produces the content for each park.",
      },
      transporte: {
        area: "Transport",
        desc: "Takes travelers to the entrance of every park, from anywhere in the country.",
      },
      tecnologia: {
        area: "Technology",
        desc: "Runs bookings, payments and the day-to-day digital side of the operation.",
      },
      construccion: {
        area: "Construction",
        desc: "Designs and builds the new parks, line by line.",
      },
    },
    cierre:
      "The advantage of working this way is simple: quality stays in our hands, from start to finish.",
  },
  capital: {
    eyebrow: "Made in Costa Rica",
    titulo: ["", "100% Costa Rican owned"],
    texto:
      "Grupo Oroz is a Costa Rican-owned company, with local roots and teams trained in the country. We create jobs in the communities where we operate and reinvest in Costa Rican tourism. What we build, we build here.",
  },
  parques: {
    eyebrow: "Park management",
    titulo: "Adventure parks",
    descripcion:
      "The parks we operate and manage directly in Costa Rica, each one with ACCT safety standards and constant maintenance.",
    visitar: "Visit website",
    proximaApertura: "Opening soon",
    indicadores: {
      experiencia: "Years of experience",
      parques: "Parks managed",
      acct: "International certification",
      mantenimiento: "Continuous maintenance",
    },
  },
  agencias: {
    eyebrow: "Tourism and travel",
    titulo: "Travel agencies",
    descripcion:
      "Our agencies put the itineraries together and connect travelers with every destination in Costa Rica.",
    items: {
      crdoing: "Tours tailored to each traveler",
      crparadise: "Packages and experiences across the country",
      gtt: "Guided tours with local hosts",
    },
  },
  servicios: {
    eyebrow: "Business ecosystem",
    titulo: "More services",
    descripcion:
      "The transport, technology and construction companies that keep the group's operation running.",
    transporte: {
      eyebrow: "Transport",
      texto:
        "Tourist transport to take visitors to every park and destination in the country.",
    },
    tecnologia: {
      eyebrow: "Technology",
      texto:
        "Booking, payment and management platforms that keep the operation running every day.",
    },
    construccion: {
      eyebrow: "Construction",
      texto:
        "Canopy design, construction and certification, from the first line to opening day.",
    },
  },
  orostudios: {
    eyebrow: "Photography content",
    texto:
      "This is the group's photography and video arm for adventure parks. Over more than 20 years it has worked with over 18 parks in Costa Rica, capturing each visitor's experience and producing the content for every brand.",
    metricas: {
      leads: "New leads",
      ganancia: "Annual growth",
      seguidores: "Followers",
    },
    cta: "Discover OrostudiosCR",
    oficinas: {
      badge: "Now open",
      titulo: "Our offices",
      descripcion:
        "OrostudiosCR photography offices set up inside the parks and staffed by our own team.",
      beneficios: ["Quality keepsakes", "Reliable service"],
      descripciones: {
        ama: "Nature and adventure come together in every shot. Relive your run through the canyons and waterfalls with professional photographs.",
        ecoglide:
          "We capture the pure thrill of the canopy against the deep green of the Arenal Volcano.",
        skyline:
          "Height, speed and stunning scenery. Our team captures every launch and every smile.",
        blackstallion:
          "Horseback riding and adventure between the beaches and dry forest of Guanacaste, with on-site photography.",
        attica:
          "Canopy over the forest of La Fortuna. An office equipped to hand you your photos the same day.",
      },
    },
    proximas: {
      eyebrow: "Coming soon",
      titulo: "Opening soon",
      descripcion:
        "Parks where we're already getting our photography office ready.",
      badge: "Coming soon",
    },
  },
  bienesRaices: {
    eyebrow: "Real estate",
    titulo: ["Your trusted ally in ", "Costa Rican real estate"],
    lema: "Lots, houses and properties at the best price, anywhere in Costa Rica.",
    texto:
      "Oroz Real Estate are the group's real estate advisors. They help families and investors find the right property and stay with them through the whole purchase: from the first visit to signing before a notary and recording the title in the National Registry. As lawyers, we review the deed, liens, survey plans and permits before closing. Fully transparent.",
    ventajasTitulo: "Why buy with us",
    ventajas: {
      juridica: {
        titulo: "Legal certainty",
        desc: "A full title search on every property. Your investment is recorded and protected by law.",
      },
      extranjeros: {
        titulo: "Full rights for foreigners",
        desc: "In Costa Rica a foreigner can buy with the same rights as a citizen, no residency required.",
      },
      plusvalia: {
        titulo: "Growing land value",
        desc: "Land values rise steadily, especially in tourist and developing areas.",
      },
      acompanamiento: {
        titulo: "Personal guidance",
        desc: "We arrange the visits, answer your questions and sign the transfer before a notary.",
      },
    },
    tiposTitulo: "What we offer",
    tipos: {
      casas: "Houses",
      lotes: "Lots",
      fincas: "Farms & acreage",
    },
    cobertura: "Across all seven provinces of Costa Rica",
    cta: "Browse available properties",
    ctaWhatsapp: "Talk to Gabriel",
    director: "Director",
    empresaGrupo: "A Grupo Oroz company",
  },
  contacto: {
    eyebrow: "Let's talk",
    titulo: ["Have a park that needs ", "a steady hand"],
    texto:
      "Operation, safety, maintenance, photography or construction. Tell us what you need and we'll come back with a concrete proposal.",
    ctaCorreo: "Send an email",
    ctaWhatsapp: "Message on WhatsApp",
  },
  footer: {
    descripcion:
      "A Costa Rican-owned group that operates and manages adventure parks in Costa Rica.",
    parques: "Parks",
    agencias: "Agencies",
    servicios: "Services",
    bienesRaices: "Real estate",
    poas: "Poás Adventure Park (2026)",
    derechos: "All rights reserved.",
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}
