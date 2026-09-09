export type Language = "en" | "fr" | "es";

export interface Translations {
  nav: {
    home: string;
    about: string;
    tours: string;
    reviews: string;
    reservation: string;
    contact: string;
    cta: string;
    brandTitle: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    bookTour: string;
    exploreTours: string;
    ratingBadge: string;
    guarantee: string;
  };
  about: {
    eyebrow: string;
    title: string;
    googleRating: string;
    verifiedReviews: string;
    signatureTours: string;
    signoff: string;
  };
  tours: {
    eyebrow: string;
    title: string;
    subtitle: string;
    privateTour: string;
    discoverMore: string;
    mostPopular: string;
    bestSeller: string;
    signature: string;
    tailorMade: string;
  };
  tourDetail: {
    backHome: string;
    breadcrumb: string;
    overview: string;
    highlights: string;
    routeMap: string;
    included: string;
    notIncluded: string;
    bookThisTour: string;
    bookSub: string;
    instantWhatsApp: string;
    flexibleDates: string;
    perPrivateGroup: string;
    licensedGuideNote: string;
  };
  reservation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    dateLabel: string;
    guestsLabel: string;
    tourLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successMsg: string;
    whatsAppDirect: string;
    reassurance: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    ratingText: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    experiences: string;
    contactDirect: string;
    rights: string;
    secondGenGuide: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About Zaky",
      tours: "Tours",
      reviews: "Reviews",
      reservation: "Reservation",
      contact: "Contact",
      cta: "Discover More",
      brandTitle: "Marrakeshi Tour Guide",
    },
    hero: {
      badge: "Official Licensed Tour Guide in Marrakesh",
      title: "Discover the Soul of Marrakesh with",
      titleAccent: "Licensed Guide Zaky",
      subtitle:
        "Second-generation private tour guide born and raised in the Medina. Experience authentic hidden courtyards, artisan souks, and cultural landmarks through personalized walking tours tailored exclusively for you.",
      bookTour: "Book a Private Tour",
      exploreTours: "Explore 7 Experiences",
      ratingBadge: "5.0 ★ Top Rated on Google (41 reviews)",
      guarantee: "100% Private • Flexible Pace • No Tourist Traps",
    },
    about: {
      eyebrow: "Meet your guide",
      title: "Zaky",
      googleRating: "Google rating",
      verifiedReviews: "Verified Google reviews",
      signatureTours: "Signature tour experiences",
      signoff: "Welcome to Marrakesh — let me show you my Morocco.",
    },
    tours: {
      eyebrow: "Experiences",
      title: "Marrakesh, the way it's meant to be seen",
      subtitle:
        "Seven signature experiences, each one built around what makes Marrakesh unforgettable — and always adaptable to what you want to see.",
      privateTour: "Private Tour",
      discoverMore: "Discover More",
      mostPopular: "Most Popular",
      bestSeller: "Best Seller",
      signature: "Signature",
      tailorMade: "Tailor Made",
    },
    tourDetail: {
      backHome: "Home",
      breadcrumb: "Private Marrakesh Experience",
      overview: "Experience Overview",
      highlights: "Tour Highlights",
      routeMap: "Route Map & Itinerary",
      included: "What's Included",
      notIncluded: "What's Not Included",
      bookThisTour: "Book This Private Tour",
      bookSub: "Reserve directly with Zaky. Quick response within hours via WhatsApp or Email.",
      instantWhatsApp: "Chat with Zaky on WhatsApp",
      flexibleDates: "Flexible cancellation & custom timing",
      perPrivateGroup: "per private group",
      licensedGuideNote: "Official Ministry of Tourism Licensed Guide",
    },
    reservation: {
      eyebrow: "Plan Your Visit",
      title: "Request Your Private Tour",
      subtitle:
        "Select your preferred dates and experience. Zaky will review his schedule and confirm availability promptly.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Sarah Jenkins",
      emailLabel: "Email Address",
      emailPlaceholder: "e.g. sarah@example.com",
      phoneLabel: "Phone / WhatsApp",
      phonePlaceholder: "e.g. +1 555 123 4567",
      dateLabel: "Preferred Tour Date",
      guestsLabel: "Number of Guests",
      tourLabel: "Select Tour Experience",
      messageLabel: "Message or Special Interests",
      messagePlaceholder: "Tell Zaky about your schedule, mobility preferences, dietary wishes, or particular interests...",
      submitBtn: "Submit Private Tour Request",
      submitting: "Submitting Request...",
      successTitle: "Tour Request Received!",
      successMsg: "Thank you! Zaky has received your inquiry and will connect with you shortly via WhatsApp or Email.",
      whatsAppDirect: "Message Zaky on WhatsApp now",
      reassurance: "No payment required now • Free rescheduling • Direct guide contact",
    },
    reviews: {
      eyebrow: "Guest Experiences",
      title: "Loved by travelers from around the globe",
      ratingText: "41 Verified 5-Star Reviews on Google",
    },
    footer: {
      tagline: "Authentic private tours in Marrakesh led by licensed second-generation guide Mohamed Zaky Bentabaa.",
      navigation: "Navigation",
      experiences: "Experiences",
      contactDirect: "Direct Contact",
      rights: "All rights reserved.",
      secondGenGuide: "Licensed Marrakesh Tour Guide since 2007",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      about: "À propos de Zaky",
      tours: "Circuits & Packs",
      reviews: "Avis Clients",
      reservation: "Réservation",
      contact: "Contact",
      cta: "Découvrir",
      brandTitle: "Marrakeshi Tour Guide",
    },
    hero: {
      badge: "Guide Touristique Officiel Agréé à Marrakech",
      title: "Découvrez l'Âme de Marrakech avec",
      titleAccent: "Votre Guide Agréé Zaky",
      subtitle:
        "Guide privé de 2ème génération né et ayant grandi dans la Médina. Visitez les riads secrets, les souks authentiques et les joyaux culturels à travers des visites à pied sur mesure.",
      bookTour: "Réserver une Visite Privée",
      exploreTours: "Découvrir les 7 Circuits",
      ratingBadge: "5.0 ★ Noté 5 étoiles sur Google (41 avis)",
      guarantee: "100% Privé • Rythme Personnalisé • Sans Pièges à Touristes",
    },
    about: {
      eyebrow: "Rencontrez votre guide",
      title: "Zaky",
      googleRating: "Note Google",
      verifiedReviews: "Avis Google vérifiés",
      signatureTours: "Circuits signatures",
      signoff: "Bienvenue à Marrakech — laissez-moi vous faire découvrir mon Maroc.",
    },
    tours: {
      eyebrow: "Nos Circuits & Expériences",
      title: "Marrakech, telle qu'elle doit être vécue",
      subtitle:
        "Sept expériences signatures conçues autour des merveilles de Marrakech — toujours adaptées à vos envies et à votre rythme.",
      privateTour: "Visite Privée",
      discoverMore: "Découvrir ce Circuit",
      mostPopular: "Le Plus Demandé",
      bestSeller: "Coup de Cœur",
      signature: "Signature",
      tailorMade: "Sur Mesure",
    },
    tourDetail: {
      backHome: "Accueil",
      breadcrumb: "Expérience Privée à Marrakech",
      overview: "Aperçu de l'Expérience",
      highlights: "Points Forts du Circuit",
      routeMap: "Carte & Itinéraire de la Visite",
      included: "Ce qui est Inclus",
      notIncluded: "Ce qui n'est pas Inclus",
      bookThisTour: "Réserver ce Circuit Privé",
      bookSub: "Réservez directement avec Zaky. Réponse rapide dans les heures qui suivent par WhatsApp ou Email.",
      instantWhatsApp: "Discuter avec Zaky sur WhatsApp",
      flexibleDates: "Annulation flexible & horaires sur mesure",
      perPrivateGroup: "par groupe privé",
      licensedGuideNote: "Guide Officiel Agréé par le Ministère du Tourisme",
    },
    reservation: {
      eyebrow: "Planifiez Votre Séjour",
      title: "Demandez Votre Visite Privée",
      subtitle:
        "Indiquez vos dates souhaitées et votre circuit. Zaky vérifiera son planning et vous répondra très rapidement.",
      nameLabel: "Nom Complet",
      namePlaceholder: "ex: Thomas Dupont",
      emailLabel: "Adresse Email",
      emailPlaceholder: "ex: thomas@example.com",
      phoneLabel: "Téléphone / WhatsApp",
      phonePlaceholder: "ex: +33 6 12 34 56 78",
      dateLabel: "Date Souhaitée de Visite",
      guestsLabel: "Nombre de Participants",
      tourLabel: "Sélectionnez Votre Circuit",
      messageLabel: "Message ou Souhaits Particuliers",
      messagePlaceholder: "Précisez à Zaky vos préférences, votre rythme de marche, vos centres d'intérêt...",
      submitBtn: "Envoyer Ma Demande de Réservation",
      submitting: "Envoi en cours...",
      successTitle: "Demande de Visite Reçue !",
      successMsg: "Merci ! Zaky a bien reçu votre demande et vous contactera rapidement par WhatsApp ou Email pour finaliser la réservation.",
      whatsAppDirect: "Écrire directement à Zaky sur WhatsApp",
      reassurance: "Aucun paiement immédiat • Report gratuit • Contact direct avec le guide",
    },
    reviews: {
      eyebrow: "Témoignages & Avis",
      title: "Recommandé par des voyageurs du monde entier",
      ratingText: "41 Avis Vérifiés 5 Étoiles sur Google",
    },
    footer: {
      tagline: "Visites guidées privées et authentiques à Marrakech avec Mohamed Zaky Bentabaa, guide officiel agréé depuis 2007.",
      navigation: "Navigation",
      experiences: "Circuits",
      contactDirect: "Contact Direct",
      rights: "Tous droits réservés.",
      secondGenGuide: "Guide Officiel de Marrakech depuis 2007",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre Zaky",
      tours: "Tours y Paquetes",
      reviews: "Opiniones",
      reservation: "Reservas",
      contact: "Contacto",
      cta: "Descubrir",
      brandTitle: "Marrakeshi Tour Guide",
    },
    hero: {
      badge: "Guía Turístico Oficial Acreditado en Marrakech",
      title: "Descubra el Alma de Marrakech con el",
      titleAccent: "Guía Oficial Zaky",
      subtitle:
        "Guía privado de segunda generación nacido y criado en la Medina. Disfrute de auténticos patios ocultos, zocos artesanales y monumentos culturales con recorridos a pie a su medida.",
      bookTour: "Reservar Tour Privado",
      exploreTours: "Ver 7 Experiencias",
      ratingBadge: "5.0 ★ Calificación 5 estrellas en Google (41 opiniones)",
      guarantee: "100% Privado • A su propio ritmo • Sin trampas para turistas",
    },
    about: {
      eyebrow: "Conozca a su guía",
      title: "Zaky",
      googleRating: "Valoración Google",
      verifiedReviews: "Opiniones verificadas",
      signatureTours: "Tours exclusivos",
      signoff: "Bienvenidos a Marrakech — permítanme mostrarles mi Marruecos.",
    },
    tours: {
      eyebrow: "Nuestros Tours y Experiencias",
      title: "Marrakech, como realmente debe vivirse",
      subtitle:
        "Siete experiencias emblemáticas creadas para vivir lo mejor de Marrakech — siempre adaptadas a sus gustos e intereses personales.",
      privateTour: "Tour Privado",
      discoverMore: "Descubrir este Tour",
      mostPopular: "Más Popular",
      bestSeller: "El Más Vendido",
      signature: "Exclusivo",
      tailorMade: "A Medida",
    },
    tourDetail: {
      backHome: "Inicio",
      breadcrumb: "Experiencia Privada en Marrakech",
      overview: "Descripción del Tour",
      highlights: "Lo Más Destacado",
      routeMap: "Mapa de Ruta e Itinerario",
      included: "Qué Está Incluido",
      notIncluded: "Qué No Está Incluido",
      bookThisTour: "Reservar este Tour Privado",
      bookSub: "Reserve directamente con Zaky. Respuesta rápida en pocas horas por WhatsApp o Correo electrónico.",
      instantWhatsApp: "Chatear con Zaky por WhatsApp",
      flexibleDates: "Cancelación flexible y horarios personalizados",
      perPrivateGroup: "por grupo privado",
      licensedGuideNote: "Guía Oficial Acreditado por el Ministerio de Turismo",
    },
    reservation: {
      eyebrow: "Planifique su Viaje",
      title: "Solicite su Tour Privado",
      subtitle:
        "Seleccione sus fechas preferidas y experiencia. Zaky revisará su agenda y le confirmará disponibilidad rápidamente.",
      nameLabel: "Nombre Completo",
      namePlaceholder: "ej: Carlos Martínez",
      emailLabel: "Correo Electrónico",
      emailPlaceholder: "ej: carlos@example.com",
      phoneLabel: "Teléfono / WhatsApp",
      phonePlaceholder: "ej: +34 612 345 678",
      dateLabel: "Fecha Deseada del Tour",
      guestsLabel: "Número de Personas",
      tourLabel: "Seleccione el Tour Deseado",
      messageLabel: "Mensaje o Intereses Especiales",
      messagePlaceholder: "Comente a Zaky sus preferencias, ritmo de caminata, gustos culturales o requerimientos especiales...",
      submitBtn: "Enviar Solicitud de Reserva",
      submitting: "Enviando Solicitud...",
      successTitle: "¡Solicitud Recibida!",
      successMsg: "¡Muchas gracias! Zaky ha recibido su solicitud y se pondrá en contacto pronto por WhatsApp o correo para confirmar los detalles.",
      whatsAppDirect: "Escribir directamente a Zaky por WhatsApp",
      reassurance: "Sin pago por adelantado • Cambio de fecha gratuito • Contacto directo con el guía",
    },
    reviews: {
      eyebrow: "Experiencias de Viajeros",
      title: "Recomendado por viajeros de todo el mundo",
      ratingText: "41 Reseñas Verificadas de 5 Estrellas en Google",
    },
    footer: {
      tagline: "Tours privados y auténticos en Marrakech de la mano de Mohamed Zaky Bentabaa, guía oficial acreditado desde 2007.",
      navigation: "Navegación",
      experiences: "Experiencias",
      contactDirect: "Contacto Directo",
      rights: "Todos los derechos reservados.",
      secondGenGuide: "Guía Oficial de Marrakech desde 2007",
    },
  },
};
