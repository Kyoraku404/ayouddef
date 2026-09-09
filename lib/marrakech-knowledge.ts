/**
 * Marrakech Comprehensive Local Tourist Knowledge Engine
 * Crafted for Marrakeshi Tour Guide by OCN
 * Provides instant, zero-latency local intelligence for visitors.
 */

export interface KnowledgeTopic {
  id: string;
  category: "monument" | "food" | "souk" | "safety" | "logistics" | "tours" | "culture" | "chat";
  keywords: string[];
  title: {
    en: string;
    fr: string;
    es: string;
  };
  answer: {
    en: string;
    fr: string;
    es: string;
  };
  relatedAction?: {
    type: "tour" | "whatsapp" | "reservation";
    label: { en: string; fr: string; es: string };
    link: string;
  };
}

export const marrakechKnowledge: KnowledgeTopic[] = [
  // ==================== MONUMENTS & SIGHTS ====================
  {
    id: "top-sights",
    category: "monument",
    keywords: [
      "top sights", "what to see", "must visit", "must see", "attractions", "places to visit",
      "que voir", "monuments", "visiter", "incontournables", "monuments incontournables", "meilleurs endroits",
      "que ver", "lugares para visitar", "lugares imprescindibles", "imprescindibles", "atracciones", "principales sitios"
    ],
    title: {
      en: "Essential Marrakech Sights & Monuments",
      fr: "Les Incontournables de Marrakech",
      es: "Sitios y Monumentos Esenciales de Marrakech",
    },
    answer: {
      en: `Here are the absolute must-visit landmarks in Marrakech:

1. **Ben Youssef Madrasa**: 14th-century Islamic college with breathtaking carved cedar, zellige tilework, and stucco arches. Best visited early morning (9:00 AM) to avoid crowds.
2. **Jemaa el-Fna Square**: The beating heart of Marrakech — fresh orange juice by day, transforming at dusk into a mesmerizing theatre of food stalls, musicians, and storytellers.
3. **Bahia Palace**: A 19th-century masterpiece with 150 lavishly decorated rooms, tranquil courtyards, and fragrant orange blossom gardens.
4. **Majorelle Garden & YSL Museum**: Lush botanical haven curated by Jacques Majorelle and preserved by Yves Saint Laurent (⚠️ *Must book tickets online days in advance!*).
5. **Saadian Tombs**: Rediscovered royal mausoleums from the golden age of Sultan Ahmad al-Mansur with Italian Carrara marble columns.
6. **Koutoubia Mosque**: 12th-century Almohad minaret that towers over the city skyline (non-Muslims can view from the surrounding rose gardens).
7. **The Secret Garden (Le Jardin Secret)**: An exquisite, peaceful Islamic garden restored inside an authentic Medina riad.`,
      fr: `Voici les monuments et lieux incontournables de Marrakech :

1. **La Médersa Ben Youssef** : Splendide école coranique du XIVe siècle ornée de plâtres sculptés, de cèdre et de zelliges. À visiter dès 9h pour la tranquillité.
2. **La Place Jemaa el-Fna** : Cœur battant de la ville, animée de jus d'orange frais le jour et transformée en immense théâtre de rue et gargotes le soir.
3. **Le Palais Bahia** : Chef-d'œuvre du XIXe siècle avec 150 salles richement peintes et patios fleuris d'orangers.
4. **Le Jardin Majorelle & Musée YSL** : Oasis bleue créée par Jacques Majorelle et sauvée par Yves Saint Laurent (⚠️ *Réservation en ligne obligatoire à l'avance !*).
5. **Les Tombeaux Saadiens** : Mausolée royal du XVIe siècle en marbre de Carrare et stucs dentelés.
6. **La Mosquée Koutoubia** : Minaret almohade du XIIe siècle dominant la ville (admirer les jardins extérieurs).
7. **Le Jardin Secret** : Magnifique jardin islamique restauré au cœur du quartier Mouassine.`,
      es: `Aquí están los monumentos imprescindibles de Marrakech:

1. **Madraza de Ben Youssef**: Escuela coránica del siglo XIV con impresionantes yeserías, madera de cedro y mosaicos zellige. Mejor visitar a las 9:00 AM.
2. **Plaza Jemaa el-Fna**: El corazón vibrante de la ciudad, con zumos frescos de día y un espectáculo fascinante de música y comida al anochecer.
3. **Palacio Bahía**: Obra maestra del siglo XIX con 150 habitaciones decoradas y patios con naranjos.
4. **Jardín Majorelle y Museo YSL**: Oasis botánico azul de Jacques Majorelle e Yves Saint Laurent (⚠️ *¡Reserva online obligatoria con antelación!*).
5. **Tumbas Saadíes**: Mausoleo real del siglo XVI con columnas de mármol de Carrara.
6. **Mezquita Koutoubia**: Minarete almohade del siglo XII que domina el horizonte de la ciudad.
7. **El Jardín Secreto**: Un rincón de paz y arquitectura islámica en plena Medina.`,
    },
    relatedAction: {
      type: "tour",
      label: {
        en: "Explore Historical Heritage Tour",
        fr: "Voir le Circuit Patrimoine Historique",
        es: "Ver Tour Patrimonio Histórico",
      },
      link: "/tours/historical-marrakesh",
    },
  },
  {
    id: "ben-youssef",
    category: "monument",
    keywords: [
      "ben youssef", "medersa", "madrasa", "medersa ben youssef",
      "ecole coranique", "architecture islamique"
    ],
    title: {
      en: "Ben Youssef Madrasa Visitor Guide",
      fr: "Guide de la Médersa Ben Youssef",
      es: "Guía de la Madraza Ben Youssef",
    },
    answer: {
      en: `**Ben Youssef Madrasa** is one of the grandest monuments of Islamic architecture in North Africa.
- **Built**: Founded by the Marinids in the 14th century, rebuilt to royal grandeur by the Saadian Sultan Abdallah al-Ghalib in 1565.
- **Capacity**: Once housed up to 900 student dormitories across two upper galleries.
- **Highlights**: Hand-carved stucco calligraphy reciting Quranic verses, fragrant Atlas cedarwood ceilings, and polychrome zellige mosaic tiles.
- **Visiting Tip**: Open daily 9:00 AM - 6:00 PM. Admission is 50 MAD (~€5). Morning light in the central courtyard pool produces the best photos.`,
      fr: `**La Médersa Ben Youssef** est le plus grand chef-d'œuvre architectural islamique de Marrakech.
- **Histoire** : Fondée au XIVe siècle par les Mérinides, puis magnifiée en 1565 par le sultan saadien Abdallah al-Ghalib.
- **Capacité** : Accueillait autrefois jusqu'à 900 étudiants en théologie dans ses 130 cellules d'étudiants à l'étage.
- **À admirer** : Calligraphies de plâtre ciselé, plafonds en cèdre de l'Atlas et zelliges géométriques polychromes.
- **Conseil de visite** : Ouvert tous les jours de 9h à 18h. Billet : 50 MAD (~5 €). Venez dès l'ouverture pour admirer les reflets du bassin sans la foule.`,
      es: `**La Madraza de Ben Youssef** es el monumento islámico más espectacular de Marrakech.
- **Historia**: Fundada en el siglo XIV y ampliada en 1565 por el sultán saadí Abdallah al-Ghalib.
- **Capacidad**: Albergó hasta 900 estudiantes en 130 pequeñas habitaciones en su planta superior.
- **Lo más destacado**: Yeserías caligráficas talladas a mano, techos de cedro del Atlas y azulejos zellige.
- **Consejo**: Abierto todos los días de 9:00 a 18:00. Entrada: 50 MAD (~5 €). Las primeras horas de la mañana ofrecen la mejor luz fotográfica.`,
    },
  },
  {
    id: "majorelle-tickets",
    category: "monument",
    keywords: [
      "majorelle", "jardin majorelle", "ysl", "yves saint laurent", "jardin bleu",
      "majorelle tickets", "billets majorelle", "reserver majorelle", "entradas majorelle"
    ],
    title: {
      en: "Majorelle Garden & YSL Museum Advice",
      fr: "Conseils Visite Jardin Majorelle & YSL",
      es: "Consejos para el Jardín Majorelle y YSL",
    },
    answer: {
      en: `**Crucial Tip for Majorelle Garden & YSL Museum**:
- **Tickets CANNOT be bought on-site**. You MUST purchase your timed entry tickets online through their official portal (jardinmajorelle.com).
- **Book 2 to 5 days ahead**, as time slots frequently sell out, especially during high season (autumn, winter, spring).
- **Combined Ticket**: Opt for the combined pass (Garden + Pierre Bergé Berber Museum + Yves Saint Laurent Museum) for 300 MAD (~€30).
- **Location**: Located in the modern Guéliz / Ville Nouvelle area, a short 10-minute taxi ride from the Medina.`,
      fr: `**Conseil essentiel pour le Jardin Majorelle & Musée YSL** :
- **AUCUN billet n'est vendu sur place**. Vous DEVEZ impérativement réserver votre créneau horaire en ligne sur le site officiel (jardinmajorelle.com).
- **Réservez 2 à 5 jours à l'avance**, les créneaux s'épuisent très vite en haute saison.
- **Billet combiné** : Choisissez le pass combiné (Jardin + Musée Berbère + Musée YSL) pour 300 MAD (~30 €).
- **Accès** : Situé dans le quartier moderne de Guéliz, à 10 minutes en taxi de la Médina.`,
      es: `**Consejo vital para el Jardín Majorelle y Museo YSL**:
- **NO se venden entradas en taquilla**. Es OBLIGATORIO comprar las entradas con horario reservado por internet en jardinmajorelle.com.
- **Reserva con 2 a 5 días de anticipación**, las plazas se agotan muy rápido.
- **Entrada combinada**: Recomendamos el pase conjunto (Jardín + Museo Bereber + Museo YSL) por 300 MAD (~30 €).
- **Ubicación**: En el barrio de Guéliz, a solo 10 minutos en taxi desde la Medina.`,
    },
  },

  // ==================== FOOD & CULINARY ====================
  {
    id: "tanjia-marrakchia",
    category: "food",
    keywords: [
      "tanjia", "tangia", "marrakchia", "tanjia marrakchia", "what to eat",
      "specialite", "plat typique", "plat marrakech", "comida tipica", "que comer"
    ],
    title: {
      en: "Tanjia Marrakchia: Marrakech's Legendary Dish",
      fr: "La Tanjia Marrakchia : Le Plat Emblématique",
      es: "La Tanjia Marrakchia: El Plato Típico de Marrakech",
    },
    answer: {
      en: `**Tanjia Marrakchia** is the culinary soul of Marrakech — distinct from Tagine!
- **The Story**: Historically prepared by male artisans in the souks. Beef or lamb shank is marinated with cumin, coriander seeds, preserved lemons, garlic, saffron, and smen (aged butter).
- **The Magic Cooking Method**: Sealed inside a clay amphora urn, it is taken to the traditional public hammam (bathhouse), buried under warm furnace wood ashes (*Fernatchi*), and slow-braised for 6 to 8 hours until the meat melts off the bone.
- **Where to eat authentic Tanjia**:
  1. *Chez Lamine Hadj Mustapha* (near Jemaa el-Fna, where King Mohammed VI and master chefs dine).
  2. *Souk Semmarine Mechoui Alley* (watch whole roasted lambs pulled out of underground pits!).`,
      fr: `**La Tanjia Marrakchia** est le plat le plus emblématique de Marrakech — à ne pas confondre avec le tajine !
- **L'Histoire** : Plat préparé traditionnellement par les hommes artisans des souks. Jarret de bœuf ou d'agneau mariné avec cumin, ail, citron confit, safran et smen (beurre rance).
- **La Cuisson Secrète** : Fermée hermétiquement dans une poterie en terre cuite, elle est apportée au *Fernatchi* (le foyer qui chauffe l'eau du hammam de quartier) et cuite lentement sous la cendre chaude pendant 6 à 8 heures.
- **Où déguster une vraie Tanjia** :
  1. *Chez Lamine Hadj Mustapha* (rue Derb Semmarine, une institution fréquentée par les fins gourmets).
  2. *L'allée du Méchoui* près de Jemaa el-Fna (agneaux rôtis dans des fours souterrains).`,
      es: `**La Tanjia Marrakchia** es el plato estrella absoluto de Marrakech:
- **La Tradición**: Creado originalmente por los hombres artesanos de los zocos. Se marina carne de ternera o cordero con comino, limones encurtidos, ajo, azafrán y mantequilla clarificada (smen).
- **La Cocción Mágica**: Se sella en una vasija de barro y se entierra en las cenizas calientes del horno de un hammam tradicional durante 6 a 8 horas hasta que la carne queda tierna como mantequilla.
- **Dónde probarla auténtica**:
  1. *Chez Lamine Hadj Mustapha* (junto a Jemaa el-Fna).
  2. *El callejón del Mechoui* (cordero asado en pozos bajo tierra).`,
    },
    relatedAction: {
      type: "tour",
      label: {
        en: "Experience Medina Souks & Food Tour",
        fr: "Découvrir le Tour Souks & Saveurs",
        es: "Ver Tour de Zocos y Sabores",
      },
      link: "/tours/souks-local-markets",
    },
  },
  {
    id: "street-food-safety",
    category: "food",
    keywords: [
      "street food", "water", "safe to eat", "jemaa el fna food", "eau",
      "malade", "hygiene", "nourriture", "comida callejera", "agua del grifo"
    ],
    title: {
      en: "Marrakech Food Safety & Water Tips",
      fr: "Sécurité Alimentaire & Eau Potable",
      es: "Seguridad Alimentaria y Agua en Marrakech",
    },
    answer: {
      en: `**Essential Health & Dining Tips**:
- **Drinking Water**: Stick to bottled mineral water (such as *Sidi Ali* or *Ain Saiss*) and ensure the cap seal is intact. Avoid tap water in hotels or street stalls.
- **Street Food at Jemaa el-Fna**: Safe and delicious if you follow the local rule: **Eat where local families eat** with high turnover! Look for freshly fried msemen flatbreads, snails in spiced herbal broth (*babbouche*), and freshly pressed pomegranate or orange juice (ask for no added tap water/sugar).
- **Mint Tea (Atay)**: Boiled and 100% safe. Always served with genuine hospitality — accepting it is a gesture of Moroccan welcome!`,
      fr: `**Conseils d'hygiène et de dégustation** :
- **Eau potable** : Buvez toujours de l'eau minérale en bouteille capsulée (*Sidi Ali* ou *Aïn Saïss*). Évitez l'eau du robinet et les glaçons dans les petites gargotes.
- **Street Food à Jemaa el-Fna** : Sûre et succulente si vous suivez cette règle d'or : **Allez là où les familles marocaines font la queue** ! Les plats tournent vite et restent frais.
- **Thé à la menthe (Atay)** : L'eau est bouillie donc parfaitement saine. Le refuser peut être perçu comme un manque de politesse, acceptez-le toujours avec le sourire !`,
      es: `**Consejos de salud y gastronomía**:
- **Agua**: Bebe siempre agua mineral embotellada (*Sidi Ali* o *Ain Saiss*) con precinto intacto. Evita el agua del grifo y los cubitos de hielo en puestos callejeros.
- **Comida en Jemaa el-Fna**: Segura y deliciosa si sigues la regla local: **¡Come donde veas familias marroquíes!** La alta rotación garantiza frescura.
- **Té de menta (Atay)**: El agua hierve completamente, por lo que es 100% seguro y una muestra de hospitalidad ineludible.`,
    },
  },

  // ==================== SOUKS & HAGGLING ====================
  {
    id: "haggling-souks",
    category: "souk",
    keywords: [
      "bargaining", "haggling", "negotiate", "prices", "souks", "shopping",
      "negocier", "marchander", "prix souk", "achats", "marchandage",
      "regatear", "regateo", "compras", "precios zoco"
    ],
    title: {
      en: "How to Haggle Respectfully in the Souks",
      fr: "L'Art de Négocier dans les Souks",
      es: "Cómo Regatear en los Zocos",
    },
    answer: {
      en: `**The Golden Rules of Medina Bargaining**:
1. **It's a Game, Not a Conflict**: Bargaining in Morocco is a social conversation, often enjoyed over a glass of mint tea. Smile, stay courteous, and have fun!
2. **The 50% Rule**: As a starting benchmark, counter-offer around 40% to 50% of the vendor's first quoted price. You will usually settle around 60% to 70%.
3. **Decide Your Maximum First**: Before asking the price, know in your mind what the item is worth to *you*.
4. **The "Walk Away" Technique**: If the price feels too high, politely say *“Shukran”* (thank you) and begin walking away. If their absolute lowest price hasn't been reached, they will almost always call you back!
5. **Fixed Price Alternatives**: If you prefer browsing without bargaining, visit the state-run *Complexe Artisanal* on Boulevard Mohammed V to see official benchmark prices.`,
      fr: `**Les règles d'or pour négocier dans les souks** :
1. **C'est un jeu convivial, pas un combat** : La négociation fait partie intégrante de la culture marocaine. Gardez le sourire, plaisantez et acceptez le verre de thé !
2. **La règle des 50%** : Proposez généralement entre 40% et 50% du premier prix annoncé par le marchand. L'accord se fait souvent autour de 60% à 70%.
3. **Fixez votre budget avant** : Sachez combien vous êtes prêt à payer avant même de demander le prix.
4. **La technique du départ poli** : Si le prix ne vous convient pas, remerciez poliment (*“Choukrane”*) et commencez à partir. Si le vendeur a de la marge, il vous rappellera !
5. **Alternative sans négociation** : Visitez le *Complexe Artisanal* sur le Boulevard Mohammed V pour découvrir les prix de référence officiels de l'artisanat.`,
      es: `**Las reglas de oro para regatear en los zocos**:
1. **Es un juego social**: El regateo en Marruecos es una charla cordial, no una discusión. Sonríe y disfruta del momento con un té.
2. **La regla del 50%**: Como referencia, ofrece inicialmente entre el 40% y el 50% del primer precio que te pidan. Lo habitual es cerrar el trato en torno al 60%-70%.
3. **Ten claro tu límite**: Piensa cuánto pagarías tú con gusto antes de preguntar el precio.
4. **El truco de marcharse**: Si el precio sigue alto, di amablemente *“Shukran”* (gracias) y camina despacio. Si el comerciante puede bajar más, te llamará de vuelta.
5. **Precios fijos**: Puedes visitar el *Complexe Artisanal* en Guéliz para ver precios oficiales de referencia.`,
    },
    relatedAction: {
      type: "tour",
      label: {
        en: "Take an Authentic Souks Tour with Zaky",
        fr: "Faire le Tour des Souks avec Zaky",
        es: "Tour por los Zocos con Zaky",
      },
      link: "/tours/souks-local-markets",
    },
  },
  {
    id: "scams-avoid",
    category: "safety",
    keywords: [
      "scams", "tanneries", "closed today", "fake guide", "lost in medina",
      "arnaque", "arnaques", "eviter", "arnaques a eviter", "tannerie", "ferme aujourd'hui", "faux guide", "piege a touriste", "pieges",
      "estafas", "estafa", "curtiduria", "cerrado hoy", "falso guia", "seguridad"
    ],
    title: {
      en: "Common Medina Scams & How to Avoid Them",
      fr: "Arnaques Courantes dans la Médina & Conseils",
      es: "Estafas Comunes en la Medina y Cómo Evitarlas",
    },
    answer: {
      en: `Marrakech is generally very safe, but being aware of these 3 common tourist situations will keep your visit stress-free:

1. **"That monument is closed today"**:
   - *The Scenario*: Someone in the alley says Bahia Palace or Ben Youssef is "closed for prayer" or "closed today" and offers to lead you to a "special Berber market" or tanneries.
   - *Solution*: **Ignore them**. Keep walking directly to the entrance. Monuments are rarely closed without official posted notices.
2. **The Tannery Walk**:
   - *The Scenario*: You are offered directions, then led through winding alleys to the tanneries where an aggressive tip is demanded.
   - *Solution*: If lost, ask shopkeepers inside stores rather than people lingering on the street corners. Download an offline map like Google Maps or Maps.me.
3. **Henna & Snake Photos on Jemaa el-Fna**:
   - *The Scenario*: A performer puts a monkey on your shoulder or a woman starts drawing henna without agreeing on a price first.
   - *Solution*: Keep your hands closed and politely say *“La, Shukran”* (No, thank you) with firm body language. Always agree on a price *before* taking any photo.`,
      fr: `Marrakech est une ville très sûre, mais voici 3 pièges classiques à connaître :

1. **"C'est fermé aujourd'hui / Il y a prière"** :
   - *La situation* : Quelqu'un dans la ruelle prétend que le monument est fermé et vous propose de vous emmener voir "le marché berbère" ou les tanneries.
   - *Réflexe* : **Ignorez poliment et continuez**. Les monuments officiels sont ouverts en continu.
2. **Le piège des tanneries** :
   - *La situation* : On vous guide dans les ruelles isolées puis on exige 100 à 200 MAD pour une visite expéditive.
   - *Réflexe* : Si vous cherchez votre chemin, demandez aux commerçants installés dans leur boutique, jamais aux personnes qui vous abordent dans la rue.
3. **Henné et charmeurs de serpents à Jemaa el-Fna** :
   - *La situation* : Une dame attrape votre main pour peindre du henné ou on vous pose un singe sur l'épaule avant de demander une somme exorbitante.
   - *Réflexe* : Dites fermement *“La, Choukrane”* (Non merci). Fixez toujours le prix **avant** toute photo ou tatouage.`,
      es: `Marrakech es una ciudad segura, pero conviene conocer estas 3 situaciones típicas:

1. **"El monumento está cerrado hoy"**:
   - *Situación*: Alguien en la calle te dice que la Madraza o el Palacio están cerrados y se ofrece a llevarte al "mercado bereber" o a las curtidurías.
   - *Respuesta*: **Ignóralo y sigue tu camino**. Los monumentos casi nunca cierran sin aviso oficial.
2. **Las curtidurías sin guía**:
   - *Situación*: Alguien te guía por callejones oscuros y luego te exige una propina desorbitada.
   - *Respuesta*: Si te pierdes, pregunta a los tenderos dentro de sus tiendas, nunca a quienes se te acerquen en las esquinas.
3. **Fotos con animales o henna en Jemaa el-Fna**:
   - *Situación*: Te colocan un mono o serpiente en el hombro sin pedir permiso para cobrarte después.
   - *Respuesta*: Di firmemente *“La, Shukran”* (No, gracias). Acuerda siempre el precio **antes** de hacer cualquier foto.`,
    },
  },

  // ==================== CULTURE & ETIQUETTE ====================
  {
    id: "dress-code",
    category: "culture",
    keywords: [
      "dress code", "clothing", "what to wear", "wear", "women clothing", "modesty", "women", "men",
      "vetements", "comment s'habiller", "s'habiller", "habiller", "tenue", "femme", "respect", "coutumes",
      "ropa", "como vestir", "vestimenta", "mujeres ropa", "costumbres"
    ],
    title: {
      en: "Marrakech Dress Code & Etiquette",
      fr: "Code Vestimentaire & Règles de Savoir-Vivre",
      es: "Código de Vestimenta y Normas de Cortesía",
    },
    answer: {
      en: `**What to Wear in Marrakech**:
- **Medina & Historic Quarters**: Marrakech is welcoming and modern, but dressing modestly shows respect. Both men and women should ideally cover shoulders and knees when exploring the Medina and traditional neighborhoods.
- **Modern Guéliz, Resorts & Beach Clubs**: Casual Western resort wear, sundresses, and swimwear around hotel pools are completely standard and accepted.
- **Footwear**: Wear comfortable closed-toe walking shoes or cushioned sandals. The Medina streets have cobblestones, tiles, and uneven surfaces.
- **Sun Protection**: The Marrakech sun is intense year-round. Carry sunglasses, sunscreen, and a light linen scarf (*chèche*).`,
      fr: `**Comment s'habiller à Marrakech** :
- **Dans la Médina et quartiers historiques** : Privilégiez des tenues respectueuses (épaules et genoux couverts pour les hommes comme pour les femmes). Des vêtements amples en lin ou coton sont idéaux.
- **À Guéliz, Hivernage et hôtels** : Robes d'été, shorts et maillots au bord des piscines sont parfaitement habituels et acceptés.
- **Chaussures** : Indispensable : de bonnes baskets ou sandales confortables ! Les ruelles de la Médina sont pavées, parfois pentues ou pavées de dalles inégales.
- **Soleil** : Chapeau, lunettes de soleil et foulard léger pour vous protéger de la chaleur.`,
      es: `**Cómo vestir en Marrakech**:
- **En la Medina**: Ropa cómoda y respetuosa que cubra hombros y rodillas (tanto para hombres como para mujeres). Las telas de lino o algodón son las más frescas.
- **En Guéliz y Hoteles**: Vestidos veraniegos, bermudas y bañadores en piscinas son perfectamente habituales.
- **Calzado**: Calzado plano y cómodo para caminar por adoquines y calles irregulares.
- **Protección solar**: Gafas de sol, sombrero y crema solar en cualquier época del año.`,
    },
  },

  // ==================== LOGISTICS & TAXIS ====================
  {
    id: "taxis-transport",
    category: "logistics",
    keywords: [
      "taxi", "airport", "petit taxi", "transport", "aeroport", "prices",
      "compteur", "transfert aeroport", "prix taxi", "traslados aeropuerto"
    ],
    title: {
      en: "Marrakech Taxis & Airport Transfers",
      fr: "Taxis & Transferts Aéroport de Marrakech",
      es: "Taxis y Traslados del Aeropuerto en Marrakech",
    },
    answer: {
      en: `**How Taxis Work in Marrakech**:
- **Petit Taxis (Yellow/Beige cars)**:
  - Inside the city, drivers are legally required to turn on the meter (*le compteur*).
  - Daytime minimum fare is 7.50 MAD; typical city rides (Medina to Guéliz) cost 15 to 30 MAD (~€1.50 - €3).
  - At night (after 8:00 PM), there is a legal 50% surcharge.
  - If a driver refuses the meter, agree on a price *before* stepping inside (usually 20 to 30 MAD in town).
- **Airport to Medina**:
  - Official daytime fixed rate is ~70 to 100 MAD for a Petit Taxi, or 100 to 150 MAD for a Grand Taxi / luggage van.
  - Negotiate politely or arrange a pre-booked private transfer with your guide or riad for seamless arrival.`,
      fr: `**Guide des Taxis à Marrakech** :
- **Les Petits Taxis (voitures beiges)** :
  - En ville, ils doivent obligatoirement mettre le compteur (*le compteur*).
  - Tarif minimum de jour : 7,50 MAD. Un trajet classique (Médina vers Guéliz) coûte entre 15 et 30 MAD (~1,50 à 3 €).
  - De nuit (après 20h), une majoration légale de 50% s'applique.
  - Si le chauffeur refuse le compteur, négociez le prix **avant** de monter (20 à 30 MAD en ville).
- **Trajet Aéroport ➔ Médina** :
  - Tarif officiel de jour : environ 70 à 100 MAD en Petit Taxi, 100 à 150 MAD pour un Grand Taxi ou avec bagages volumineux.`,
      es: `**Guía de Taxis en Marrakech**:
- **Petits Taxis (coches beige)**:
  - Para desplazarse dentro de la ciudad. Por ley deben poner el taxímetro (*compteur*).
  - Tarifa mínima: 7,50 MAD. Un trayecto típico entre la Medina y Guéliz cuesta entre 15 y 30 MAD (~1,50€ - 3€).
  - Tarifa nocturna: recargo legal del 50% a partir de las 20:00 h.
  - Si no quieren poner el taxímetro, pacta el precio antes de subirte (20-30 MAD).
- **Aeropuerto a la Medina**:
  - Tarifa oficial de 70 a 100 MAD en Petit Taxi, o 100 a 150 MAD en Grand Taxi con maletas.`,
    },
  },
  {
    id: "currency-atms",
    category: "logistics",
    keywords: [
      "currency", "money", "mad", "euro", "exchange", "atm", "card",
      "argent", "monnaie", "change", "distributeur", "carte bancaire",
      "dinero", "moneda", "cambio", "cajero", "tarjeta"
    ],
    title: {
      en: "Currency, ATMs & Card Payments in Morocco",
      fr: "Monnaie, Distributeurs & Cartes Bancaires",
      es: "Moneda, Cajeros y Pagos con Tarjeta",
    },
    answer: {
      en: `**Money & Payments Guide**:
- **Official Currency**: Moroccan Dirham (MAD).
- **Exchange Rule of Thumb**: 10 MAD ≈ 1 EUR ($1 USD ≈ 10 MAD).
- **Cash is King in the Medina**: Souk stalls, street food, small cafes, and taxis *only* accept cash dirhams. Always keep 20, 50, and 100 MAD notes handy.
- **Cards (Visa / Mastercard)**: Widely accepted in modern riads, upscale restaurants, and boutiques in Guéliz.
- **ATMs (*Guichet Automatique*)**: Abundant around Jemaa el-Fna, Rue Bab Agnaou, and Guéliz (Attijariwafa Bank, Banque Populaire, BMCE). Withdraw MAD directly for favorable bank rates.`,
      fr: `**Monnaie & Paiements à Marrakech** :
- **Devise** : Le Dirham Marocain (MAD).
- **Repère de conversion simple** : 10 MAD ≈ 1 € (ou 100 MAD ≈ 10 €).
- **Le cash est roi dans la Médina** : Souks, taxis, street food et petits cafés ne prennent **que des espèces en dirhams**. Ayez toujours des petites coupures de 20, 50 et 100 MAD.
- **Cartes bancaires** : Acceptées sans problème dans les riads, restaurants gastronomiques et boutiques de Guéliz.
- **Distributeurs (DAB)** : Nombreux autour de Jemaa el-Fna et à Guéliz (Attijariwafa, Banque Populaire). Préférez retirer des dirhams directement sur place.`,
      es: `**Moneda y Pagos en Marrakech**:
- **Moneda oficial**: Dírham marroquí (MAD).
- **Conversión rápida**: 10 MAD ≈ 1 Euro (100 MAD ≈ 10 €).
- **El efectivo es imprescindible**: En los zocos, taxis y puestos callejeros solo se acepta efectivo en dírhams. Lleva siempre billetes pequeños de 20, 50 y 100 MAD.
- **Tarjetas de crédito**: Se aceptan en hoteles, riads modernos y restaurantes de moda.
- **Cajeros automáticos**: Hay muchos alrededor de Jemaa el-Fna y en Guéliz (Attijariwafa, BMCE).`,
    },
  },

  // ==================== ZAKY'S PRIVATE TOURS ====================
  {
    id: "zaky-tours",
    category: "tours",
    keywords: [
      "zaky", "private tour", "guide zaky", "pricing", "book tour", "tours",
      "visite guidee", "tarifs", "circuits", "reserver", "guide prive",
      "tours privados", "reservar tour", "precios tours"
    ],
    title: {
      en: "Zaky's 7 Signature Private Tours",
      fr: "Les 7 Expériences Privées avec Zaky",
      es: "Los 7 Tours Privados con Zaky",
    },
    answer: {
      en: `**Mohamed Zaky Bentabaa** is a second-generation licensed guide (License #2007) with a Master's degree in Tourism Management. Here are his 7 signature experiences:

1. **Medina, Souks & Heritage (3-4h)**: 700 MAD (~€70) per private group.
2. **Souks & Local Markets (3h)**: 700 MAD (~€70) — artisan discovery, no commission traps.
3. **Historical & Cultural Tour (3-4h)**: 700 MAD (~€70) — palaces & Saadian architecture.
4. **Marrakech By Night (3-4h)**: 1,000 MAD (~€100) — evening Medina, storytellers & rooftop tea.
5. **Private Signature 7-Day Experience**: 21,000 MAD (~€2,100) — full private itinerary.
6. **Marrakech & Oualidia Coastal 5-Day Escape**: 18,000 MAD (~€1,800) — sea & dunes.
7. **Customized Private Tour**: Tailored quote according to your specific desires.

All tours are **100% private**, flexible in pace, and coordinate directly with Zaky.`,
      fr: `**Mohamed Zaky Bentabaa** est guide officiel agréé d'État depuis 2007, titulaire d'un Master en Gestion Touristique. Voici ses 7 circuits signature :

1. **Médina, Souks & Patrimoine (3-4h)** : 700 MAD (~70 €) par groupe privé.
2. **Souks & Marchés d'Artisans (3h)** : 700 MAD (~70 €) — immersion authentique sans pièges.
3. **Histoire & Culture Impériale (3-4h)** : 700 MAD (~70 €) — palais Bahia et tombeaux.
4. **Marrakech By Night (3-4h)** : 1 000 MAD (~100 €) — magie nocturne de Jemaa el-Fna et rooftops.
5. **Expérience Signature 7 Jours** : 21 000 MAD (~2 100 €) — voyage complet d'immersion.
6. **Évasion Côtière Marrakech & Oualidia 5 Jours** : 18 000 MAD (~1 800 €) — océan et dunes.
7. **Circuit Privé Sur-Mesure** : Devis personnalisé selon vos souhaits.

Tous les circuits sont **100% privés**, sans intermédiaires, au rythme de votre groupe.`,
      es: `**Mohamed Zaky Bentabaa** es guía oficial con licencia estatal (desde 2007) y Máster en Turismo. Ofrece 7 experiencias privadas exclusivas:

1. **Medina, Zocos y Patrimonio (3-4h)**: 700 MAD (~70 €) por grupo privado.
2. **Zocos y Mercados Tradicionales (3h)**: 700 MAD (~70 €) — artesanía auténtica sin comisiones.
3. **Historia y Cultura Imperial (3-4h)**: 700 MAD (~70 €) — palacios y arquitectura saadí.
4. **Marrakech de Noche (3-4h)**: 1.000 MAD (~100 €) — la magia nocturna de Jemaa el-Fna.
5. **Experiencia Exclusiva 7 Días**: 21.000 MAD (~2.100 €) — inmersión total.
6. **Escapada Costera Marrakech y Oualidia 5 Días**: 18.000 MAD (~1.800 €).
7. **Tour Personalizado a Medida**: Presupuesto personalizado.

Tours **100% privados**, a tu propio ritmo y con atención directa de Zaky.`,
    },
    relatedAction: {
      type: "reservation",
      label: {
        en: "Request a Booking with Zaky",
        fr: "Demander une Réservation avec Zaky",
        es: "Solicitar Reserva con Zaky",
      },
      link: "/#reservation",
    },
  },

  // ==================== HAMMAM & WELLNESS ====================
  {
    id: "hammam-spa",
    category: "culture",
    keywords: [
      "hammam", "spa", "massage", "savon noir", "gommage", "bain maure", "kessa",
      "black soap", "scrub", "baño turco", "exfoliacion", "bien-etre", "wellness"
    ],
    title: {
      en: "Moroccan Hammam Ritual & Etiquette",
      fr: "Le Rituel du Hammam Marocain & Conseils",
      es: "El Ritual del Hammam Marroquí y Consejos",
    },
    answer: {
      en: `**The Traditional Moroccan Hammam Experience**:
- **The Ritual**: Warm steam opens pores, followed by an application of *Savon Noir* (olive oil eucalyptus black soap). An attendant vigorously scrubs dead skin with a textured *Kessa* glove (*gommage*), followed by a rhassoul clay mask and argan oil hydration.
- **Public Hammam vs. Luxury Tourist Spa**:
  - *Public neighborhood hammam* (e.g., Hammam Mouassine, 16th century): Separate hours or sections for men and women, costs ~15-20 MAD entry (+50-100 MAD for a scrubber *kiyas*). Bring your own flip flops, towel, and swimwear/underwear bottoms. Complete nudity is NOT customary; always keep underwear bottoms on.
  - *Luxury private tourist hammam/spa* (e.g., Les Bains de Marrakech, Heritage Spa): 300 to 700 MAD (~€30-€70). Fully private cabins, disposable briefs, towels, and relaxation tea provided.
- **Post-Hammam feeling**: You will feel completely rejuvenated, stress-free, with skin softer than ever!`,
      fr: `**L'Expérience du Hammam Traditionnel Marocain** :
- **Le Rituel** : Les vapeurs chaudes ouvrent les pores, puis la peau est enduite de *Savon Noir* à l'eucalyptus. Le préposé (*kiyas*) effectue un gommage vigoureux avec le gant de *Kessa*, éliminant toutes les peaux mortes, suivi d'un masque au rhassoul et d'une hydratation à l'huile d'argan pure.
- **Hammam Populaire vs Spa Touristique de Luxe** :
  - *Hammam de quartier populaire* (ex : Hammam Mouassine, fondé au XVIe siècle) : Horaires distincts hommes/femmes, entrée ~15-20 MAD (+50 à 100 MAD pour le gommage). Apportez vos sous-vêtements de rechange, serviette et claquettes. La nudité totale est proscrite, gardez toujours un bas de maillot ou slip.
  - *Spa privatif haut de gamme* (ex : Les Bains de Marrakech, Heritage Spa) : De 300 à 700 MAD (~30 à 70 €). Cabines privées pour couples/familles, sous-vêtements jetables et thé à la menthe inclus.
- **Sensation** : Vous ressortirez infiniment détendu et avec une peau d'une douceur absolue !`,
      es: `**La Experiencia del Hammam Tradicional Marroquí**:
- **El Ritual**: El vapor abre los poros, se unta la piel con *Jabón Negro* (a base de aceite de oliva y eucalipto) y se realiza una exfoliación profunda con el guante *Kessa*, retirando todas las células muertas. Culmina con mascarilla de arcilla rhassoul y aceite de argán.
- **Hammam Popular vs Spa de Lujo**:
  - *Hammam tradicional de barrio* (ej: Hammam Mouassine del siglo XVI): Horarios separados para hombres y mujeres, entrada ~15-20 MAD (+50-100 MAD para el frotador). La desnudez total NO está bien vista; lleva siempre ropa interior o bañador.
  - *Spa turístico privado* (ej: Les Bains de Marrakech): De 300 a 700 MAD (~30€ - 70€). Cabinas privadas, ropa interior desechable y ambiente relajante con té.
- **Sensación**: ¡Una piel increíblemente suave y una relajación total tras caminar por la Medina!`,
    },
  },

  // ==================== DAY TRIPS & EXCURSIONS ====================
  {
    id: "day-trips-excursions",
    category: "logistics",
    keywords: [
      "day trip", "excursion", "agafay", "desert", "atlas", "ourika", "essaouira",
      "ouzoud", "day trips from marrakech", "montagnes", "chameau", "quad", "dromadaires"
    ],
    title: {
      en: "Best Day Trips & Excursions from Marrakech",
      fr: "Les Meilleures Excursions d'une Journée",
      es: "Las Mejores Excursiones de un Día",
    },
    answer: {
      en: `**Top Excursions Beyond Marrakech**:
1. **Agafay Desert (45 min drive)**: Striking rocky stone desert with sweeping vistas of the snow-capped Atlas Mountains. Perfect for quad biking, sunset camel rides, and romantic dinners under nomadic tents under the starlit sky.
2. **Ourika Valley & High Atlas (1h drive)**: Refreshing mountain rivers, Berber stone villages, Setti Fatma mountain waterfalls, and authentic argan oil cooperatives.
3. **Essaouira Mogador (2.5h drive)**: UNESCO-protected coastal fortress city on the Atlantic, blue-and-white fishing port, fresh grilled fish stalls, and cool sea breezes.
4. **Ouzoud Waterfalls (2.5h drive)**: Magnificent 110-meter cascading waterfalls surrounded by lush olive trees and playful wild Barbary macaque monkeys.

*Private excursion bookings with licensed driver/guide guarantee departure flexibility and zero bus tourist traps.*`,
      fr: `**Les Plus Belles Excursions depuis Marrakech** :
1. **Désert d'Agafay (à 45 min)** : Désert minéral rocheux face aux sommets de l'Atlas. Idéal pour une balade à dos de dromadaire au coucher du soleil, un tour en quad et un dîner magique sous les étoiles sous une tente nomade.
2. **Vallée de l'Ourika & Haut Atlas (à 1h)** : Fraîcheur des cascades de Setti Fatma, villages berbères en pisé et coopératives artisanales d'huile d'argan.
3. **Essaouira Mogador (à 2h30)** : Remparts historiques face à l'Océan Atlantique, port de pêche animé, poissons grillés ultra-frais et ambiance bohème.
4. **Cascades d'Ouzoud (à 2h30)** : Chutes d'eau spectaculaires de 110 mètres de haut avec leurs singes magots sauvages en liberté.

*Une excursion privée avec chauffeur accrédité vous garantit flexibilité et authenticité, loin des bus touristiques de masse.*`,
      es: `**Las Mejores Excursiones desde Marrakech**:
1. **Desierto de Agafay (a 45 min)**: Desierto de piedras y colinas onduladas frente al Atlas. Perfecto para paseos en dromedario al atardecer, quads y cena bajo las estrellas en jaimas bereberes.
2. **Valle de Ourika y Alto Atlas (a 1h)**: Ríos frescos de montaña, cascadas de Setti Fatma, pueblos tradicionales de adobe y cooperativas de argán.
3. **Essaouira (a 2h30)**: Ciudad amurallada costera de la UNESCO frente al Atlántico, pescado fresco a la brasa en el puerto y brisa marina.
4. **Cascadas de Ouzoud (a 2h30)**: Impresionantes caídas de agua de 110 metros entre olivares con simpáticos monos de Berbería en libertad.`,
    },
  },

  // ==================== WEATHER & SEASONS ====================
  {
    id: "best-time-weather",
    category: "culture",
    keywords: [
      "weather", "best time to visit", "temperature", "climate", "seasons",
      "summer", "winter", "ramadan", "quand partir", "meteo", "periode", "meilleure periode", "periode meteo", "saisons",
      "clima", "mejor epoca", "temperatura", "calor", "chaleur"
    ],
    title: {
      en: "Best Time to Visit & Marrakech Weather",
      fr: "Quand Partir & Météo à Marrakech",
      es: "Mejor Época para Viajar y Clima en Marrakech",
    },
    answer: {
      en: `**When to Visit & Marrakech Climate**:
- **Ideal Seasons (Best Weather)**: **Spring (March to May)** and **Autumn (September to November)** offer warm, sunny days (22°C to 28°C / 72°F to 82°F) and pleasant balmy evenings.
- **Winter (December to February)**: Beautiful bright blue skies and pleasant 18°C-20°C afternoons. However, nighttime temperatures drop to 6°C-8°C (45°F), so pick a riad with heating or a fireplace. The snow-capped Atlas mountain view is breathtaking!
- **Summer (July & August)**: Very hot and dry, often topping 40°C to 45°C (104°F+). Plan sightseeing early (8:30 AM to 11:30 AM), relax by the pool midday, and enjoy the bustling night markets after sunset.
- **Visiting during Ramadan**: A wonderful, serene cultural experience! The Medina is peaceful by day and bursts into joyful celebration and feasts (*Ftour*) every evening at sunset.`,
      fr: `**Quand Venir & Climat à Marrakech** :
- **Périodes Idéales** : Le **Printemps (mars à mai)** et l'**Automne (septembre à novembre)** avec un ensoleillement radieux et des températures parfaites (22°C à 28°C).
- **L'Hiver (décembre à février)** : Ciel d'un bleu limpide et journées douces (18°C à 20°C). Les nuits sont fraîches (6°C à 8°C), prévoyez un riad avec chauffage ou cheminée. La vue sur les cimes enneigées de l'Atlas est féerique !
- **L'Été (juillet & août)** : Chaleur sèche et intense (souvent 40°C à 45°C). Visitez tôt le matin (8h30 - 11h30), restez à l'ombre ou à la piscine l'après-midi, et profitez de la douceur nocturne.
- **Visiter pendant le Ramadan** : Période très chaleureuse et paisible le jour, qui s'anime d'une ferveur festive magnifique dès la rupture du jeûne (*Ftour*) au coucher du soleil.`,
      es: `**Cuándo Viajar y Clima en Marrakech**:
- **Mejores Épocas**: **Primavera (marzo a mayo)** y **Otoño (septiembre a noviembre)** con sol y temperaturas deliciosas (22°C a 28°C).
- **Invierno (diciembre a febrero)**: Días soleados y agradables (18°C-20°C) con noches frescas (6°C-8°C). ¡Las vistas de las montañas nevadas del Atlas son espectaculares!
- **Verano (julio y agosto)**: Calor seco intenso (40°C-45°C). Recomendamos visitar los monumentos a primera hora de la mañana y descansar en la piscina al mediodía.
- **Durante el Ramadán**: Una experiencia cultural mágica y acogedora, con calles tranquilas de día y mucha vida festiva al anochecer con la ruptura del ayuno (*Ftour*).`,
    },
  },

  // ==================== TIPPING CULTURE ====================
  {
    id: "tipping-culture",
    category: "culture",
    keywords: [
      "tipping", "tip", "pourboire", "propina", "tips in morocco", "combien donner",
      "etiquette", "cuanto dar", "propinas marruecos", "pourboires"
    ],
    title: {
      en: "Tipping Culture & Etiquette in Marrakech",
      fr: "Le Pourboire à Marrakech : Usages & Montants",
      es: "Cultura de la Propina en Marrakech",
    },
    answer: {
      en: `**Tipping (*Pourboire*) Etiquette in Morocco**:
Tipping is a customary, respected way of rewarding good service:
- **Cafes & Tea Shops**: Leave 2 to 5 MAD change on the table or saucer.
- **Restaurants**: 5% to 10% of the bill in cash (credit card terminals rarely allow adding a tip).
- **Riad & Hotel Luggage Porters**: 10 to 20 MAD per bag.
- **Medina Handcart Handlers (*Koussa*)**: 20 to 30 MAD for transporting heavy bags through car-free alleys to your riad.
- **Public Restrooms Attendants**: 2 to 5 MAD.
- **Private Drivers & Guides**: 100 to 150 MAD per day for a driver; 150 to 250 MAD for an exceptional private tour guide.`,
      fr: `**Guide du Pourboire à Marrakech** :
Le pourboire est un geste d'usage et de courtoisie très apprécié au Maroc :
- **Cafés & Salons de thé** : Laissez la petite monnaie, soit 2 à 5 MAD.
- **Restaurants** : Entre 5% et 10% de l'addition en espèces (les terminaux de carte ne permettent généralement pas d'ajouter un pourboire).
- **Porteurs de bagages dans les riads** : 10 à 20 MAD par valise.
- **Chariot à bagages de la Médina (*Koussa*)** : 20 à 30 MAD pour amener vos bagages jusqu'au riad dans les ruelles piétonnes.
- **Toilettes publiques gardées** : 2 à 5 MAD.
- **Chauffeurs et guides privés** : 100 à 150 MAD par jour pour un chauffeur privé ; 150 à 250 MAD pour un guide privé qui vous a fait passer une journée inoubliable.`,
      es: `**Guía de Propinas en Marrakech**:
Dar propina es una costumbre habitual y muy valorada por el personal de servicio:
- **Cafeterías y Casas de Té**: Dejar 2 a 5 MAD de cambio.
- **Restaurantes**: Entre el 5% y el 10% de la cuenta en efectivo.
- **Maleteros en riads y hoteles**: 10 a 20 MAD por maleta.
- **Carritos de equipaje en la Medina**: 20 a 30 MAD por llevar las maletas hasta la puerta de tu riad.
- **Baños públicos vigilados**: 2 a 5 MAD.
- **Chóferes y Guías privados**: 100 a 150 MAD por día para un chófer; 150 a 250 MAD para un guía privado excelente.`,
    },
  },

  // ==================== CONVERSATION & BASIC CHAT ====================
  {
    id: "greetings",
    category: "chat",
    keywords: [
      "hi", "hello", "hey", "good morning", "good afternoon", "good evening",
      "marhaba", "salam", "salam alaykum", "salaam", "yo", "howdy", "hello zaky", "hi zaky",
      "bonjour", "salut", "bonsoir", "coucou", "allo", "salut zaky", "bonjour zaky",
      "hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "saludos", "hola zaky"
    ],
    title: {
      en: "Greetings & Welcome to Marrakech",
      fr: "Salutations & Bienvenue à Marrakech",
      es: "Saludos y Bienvenida a Marrakech",
    },
    answer: {
      en: `**Marhaba! (Welcome!)** 👋

Hello and welcome to Marrakech! I'm Zaky's Virtual Concierge.

I'm here to help you experience the best of the Red City:
- 🕌 **Must-See Monuments**: Ben Youssef Madrasa, Bahia Palace, Majorelle Garden, Saadian Tombs.
- 🍲 **Food & Hidden Flavors**: Authentic Tanjia Marrakchia, Mechoui alley, street food safety.
- 🛍️ **Souks & Bargaining**: The 50% haggling rule, navigating artisan quarters safely.
- 🚕 **Taxis & Airport**: Meter rules, airport transfers, currency tips (10 MAD ≈ 1 EUR).
- 🌿 **Hammams & Day Trips**: Traditional bathhouses, Agafay stone desert, Ourika Valley, Essaouira.
- ✨ **Zaky's Private Tours**: Tailored experiences with licensed guide Mohamed Zaky (License #2007).

What can I help you discover today?`,
      fr: `**Marhaba ! (Bienvenue !)** 👋

Bonjour et bienvenue à Marrakech ! Je suis le Concierge Virtuel de Zaky.

Je suis là pour vous aider à profiter au maximum de la Ville Ocre :
- 🕌 **Monuments incontournables** : Médersa Ben Youssef, Palais Bahia, Jardin Majorelle, Tombeaux Saadiens.
- 🍲 **Gastronomie & Saveurs** : La vraie Tanjia cuite au hammam, le Méchoui, street food sans risque.
- 🛍️ **Souks & Marchandage** : La règle des 50% pour négocier, conseils pour les artisans.
- 🚕 **Taxis & Pratique** : Compteur des petits taxis, transferts aéroport, devises (10 MAD ≈ 1 €).
- 🌿 **Hammams & Excursions** : Rituel du savon noir, désert d'Agafay, vallée de l'Ourika, Essaouira.
- ✨ **Visites Privées avec Zaky** : Circuits personnalisés avec notre guide officiel agréé (#2007).

Que souhaitez-vous savoir pour votre séjour ?`,
      es: `**¡Marhaba! (¡Bienvenido!)** 👋

¡Hola y bienvenido a Marrakech! Soy el Asistente Virtual de Zaky.

Estoy a tu servicio para que disfrutes de lo mejor de la Ciudad Roja:
- 🕌 **Monumentos clave**: Madraza Ben Youssef, Palacio Bahía, Jardín Majorelle, Tumbas Saadíes.
- 🍲 **Gastronomía**: La auténtica Tanjia Marrakchia al horno del hammam, callejón del Mechoui.
- 🛍️ **Zocos y Regateo**: La regla del 50%, cómo comprar artesanía con tranquilidad.
- 🚕 **Taxis y Traslados**: Taxímetro obligatorio, traslados desde el aeropuerto, cambio de moneda.
- 🌿 **Hammams y Excursiones**: Ritual del jabón negro, desierto de Agafay, Ourika, Essaouira.
- ✨ **Tours Privados con Zaky**: Rutas a medida con el guía oficial Mohamed Zaky (#2007).

¿Qué te gustaría descubrir o consultar hoy?`,
    },
  },
  {
    id: "how-are-you",
    category: "chat",
    keywords: [
      "how are you", "how are you doing", "how is it going", "how are things",
      "how do you do", "you good", "how r u",
      "comment vas tu", "comment allez vous", "comment ca va", "ca va", "tu vas bien", "vous allez bien",
      "como estas", "como te va", "que tal", "como andas", "todo bien"
    ],
    title: {
      en: "How Are You / Chat",
      fr: "Comment ça va / Échange",
      es: "¿Cómo estás? / Charla",
    },
    answer: {
      en: `I'm doing wonderfully, thank you for asking! 😊 The sun is shining bright over Marrakech, and the Medina is buzzing with energy. 

How is your trip planning going, and what would you like to explore today?`,
      fr: `Je vais très bien, merci beaucoup de demander ! 😊 Le soleil brille sur Marrakech et la Médina est pleine de vitalité.

Comment se passe votre séjour ou vos préparatifs, et que puis-je faire pour vous aider ?`,
      es: `¡Estoy genial, muchas gracias por preguntar! 😊 El sol brilla sobre Marrakech y la Medina está llena de alegría y color.

¿Cómo van tus planes de viaje y qué te gustaría conocer hoy?`,
    },
  },
  {
    id: "identity-who",
    category: "chat",
    keywords: [
      "who are you", "who is zaky", "tell me about yourself", "what are you",
      "about zaky", "who made you", "your name", "who is the guide",
      "qui es tu", "qui est zaky", "c'est qui zaky", "presente toi", "qui vous etes", "ton nom",
      "quien eres", "quien es zaky", "quién es zaky", "quién eres", "presentate", "sobre zaky", "tu nombre"
    ],
    title: {
      en: "About Guide Zaky & Virtual Concierge",
      fr: "À propos du Guide Zaky & Concierge Virtuel",
      es: "Sobre el Guía Zaky y el Asistente Virtual",
    },
    answer: {
      en: `**About Guide Zaky & Virtual Concierge**:
- **Mohamed Zaky Bentabaa** is a 2nd-generation licensed Moroccan national guide (License #2007), born and raised in the heart of the Marrakech Medina.
- He holds a **Master's degree in Tourism Management** and has over 15 years of experience guiding visitors through private, authentic historical, cultural, and souk immersions.
- **I am his dedicated AI Concierge**, built to provide you with verified local knowledge, answer travel questions, and connect you directly with Zaky for private tours.

Feel free to ask any question or chat with Zaky directly on WhatsApp (+212 6 61 17 63 69)!`,
      fr: `**À propos du Guide Zaky & de ce Concierge Virtuel** :
- **Mohamed Zaky Bentabaa** est guide officiel agréé par l'État marocain (Licence n°2007), issu d'une famille d'artisans et natif de la Médina de Marrakech.
- Titulaire d'un **Master en Gestion Touristique**, il partage depuis plus de 15 ans sa passion du patrimoine impérial, des souks secrets et de la gastronomie locale.
- **Je suis son Concierge Virtuel**, conçu pour vous guider en direct, vous éviter les pièges et vous faire découvrir Marrakech comme un initié.

Posez-moi vos questions ou contactez Zaky directement sur WhatsApp (+212 6 61 17 63 69) !`,
      es: `**Sobre el Guía Zaky y este Asistente Virtual**:
- **Mohamed Zaky Bentabaa** es guía oficial certificado por el Estado marroquí (Licencia #2007), nacido y criado en el corazón de la Medina de Marrakech.
- Con un **Máster en Gestión Turística** y más de 15 años de experiencia, organiza visitas privadas de patrimonio, historia, zocos y cultura bereber.
- **Yo soy su Asistente Virtual**, programado para responder tus dudas sobre Marrakech y ayudarte a disfrutar de un viaje perfecto.

¡Pregúntame lo que necesites o escribe directamente a Zaky por WhatsApp (+212 6 61 17 63 69)!`,
    },
    relatedAction: {
      type: "whatsapp",
      label: {
        en: "Message Zaky on WhatsApp",
        fr: "Discuter avec Zaky sur WhatsApp",
        es: "Chatear con Zaky por WhatsApp",
      },
      link: "https://wa.me/212661176369",
    },
  },
  {
    id: "gratitude",
    category: "chat",
    keywords: [
      "thank you", "thanks", "thx", "thank you so much", "appreciate it",
      "awesome thanks", "perfect thanks", "great thanks", "ty",
      "merci", "merci beaucoup", "choukrane", "merci zaky", "c'est parfait", "tres gentil",
      "gracias", "muchas gracias", "te lo agradezco", "genial gracias", "gracias zaky"
    ],
    title: {
      en: "Gratitude & Welcome",
      fr: "Remerciements & Bienvenue",
      es: "Agradecimiento y De Nada",
    },
    answer: {
      en: `You are most welcome! (*Bsahtek* / *Marhaba*!) 🌟

It is an absolute pleasure to help. If you need any more recommendations during your stay in Marrakech — whether about hidden food gems, taxi advice, or private tours with Zaky — I'm always right here.

Enjoy every magical moment in Morocco!`,
      fr: `Je vous en prie, c'est un grand plaisir ! (*Bsahtek* / *Marhaba* !) 🌟

Si vous avez d'autres questions pendant votre séjour — que ce soit pour une bonne table, une astuce transport ou une visite avec Zaky — je reste à votre entière disposition.

Passez un séjour merveilleux à Marrakech !`,
      es: `¡De nada, un auténtico placer! (*¡Bsahtek!*) 🌟

Si tienes más preguntas durante tu estancia — ya sea sobre rincones secretos, consejos de transporte o tours con Zaky — aquí estaré para ayudarte.

¡Que disfrutes al máximo de Marrakech!`,
    },
  },
  {
    id: "goodbye",
    category: "chat",
    keywords: [
      "bye", "goodbye", "see you", "have a good day", "have a nice day",
      "talk later", "cya", "bslama", "bye bye",
      "au revoir", "a bientot", "bonne journee", "a plus", "ciao", "bonne soiree", "salut bye",
      "adios", "chao", "hasta luego", "hasta pronto", "que tengas buen dia", "nos vemos", "chao chao"
    ],
    title: {
      en: "Goodbye & Safe Travels",
      fr: "Au revoir & Bon Voyage",
      es: "Hasta pronto y Buen Viaje",
    },
    answer: {
      en: `Goodbye and safe travels! (*Bslama!*) 👋

May your adventure in Marrakech be rich with warm hospitality, breathtaking architecture, and unforgettable memories. Come back and chat anytime!`,
      fr: `Au revoir et excellent voyage ! (*Bslama !*) 👋

Que votre découverte de Marrakech soit riche en émotions, en sourires et en souvenirs inoubliables. Revenez me parler quand vous voulez !`,
      es: `¡Hasta pronto y muy buen viaje! (*¡Bslama!*) 👋

Que tu aventura en Marrakech esté llena de hospitalidad, belleza y momentos inolvidables. ¡Vuelve a consultar cuando quieras!`,
    },
  },
  {
    id: "help-capabilities",
    category: "chat",
    keywords: [
      "help", "what can i ask", "what can you do", "options", "menu",
      "topics", "what do you know", "help me", "suggestions",
      "aide", "que puis je demander", "que sais tu faire", "aidez moi", "sujets", "de quoi tu parles", "menu options",
      "ayuda", "que puedo preguntar", "que sabes hacer", "opciones", "temas", "en que me ayudas"
    ],
    title: {
      en: "Chatbot Capabilities & Help Menu",
      fr: "Guide d'Utilisation & Menu d'Aide",
      es: "Guía de Ayuda y Temas Disponibles",
    },
    answer: {
      en: `Here are the top things you can ask me about:

1. 🕌 **Must-See Monuments**: "What are the top sights?", "Ben Youssef Madrasa hours", "Majorelle tickets".
2. 🍲 **Local Cuisine**: "Where to eat authentic Tanjia?", "Is street food safe?", "Moroccan mint tea".
3. 🛍️ **Souks & Bargaining**: "How to haggle in the souks?", "What is the 50% rule?", "Leather tanneries advice".
4. 🛡️ **Safety & Scams**: "What scams to avoid in the Medina?", "Handling snake charmers at Jemaa el-Fna".
5. 👗 **Dress Code**: "What to wear in the Medina?", "Modesty etiquette and comfortable shoes".
6. 🚕 **Logistics & Money**: "Taxi prices & meter rules", "Airport to Medina rates", "Currency & ATMs (MAD vs EUR)".
7. 🌿 **Hammams & Day Trips**: "Traditional hammam ritual", "Agafay Desert sunset", "Ourika Valley & Atlas".
8. ☀️ **Best Time & Tipping**: "When is the best season to visit?", "How much should I tip?".
9. ✨ **Zaky's Private Tours**: "Private tour prices", "Custom guided itineraries with Zaky".

Type any question, or click one of the quick buttons above!`,
      fr: `Voici ce que vous pouvez me demander à tout moment :

1. 🕌 **Monuments incontournables** : « Que voir à Marrakech ? », « Horaires Médersa Ben Youssef », « Billets Majorelle ».
2. 🍲 **Gastronomie** : « Où manger une vraie Tanjia ? », « La street food est-elle sûre ? », « Thé à la menthe ».
3. 🛍️ **Souks & Négociation** : « Comment négocier dans les souks ? », « Règle des 50% », « Tanneries sans arnaque ».
4. 🛡️ **Sécurité & Pièges** : « Quelles arnaques éviter dans la Médina ? », « Charmeurs de serpents ».
5. 👗 **Code vestimentaire** : « Comment s'habiller dans la Médina ? », « Chaussures et respect des coutumes ».
6. 🚕 **Taxis & Devises** : « Tarif taxi aéroport », « Compteur des petits taxis », « Monnaie et distributeurs ».
7. 🌿 **Hammams & Excursions** : « Rituel du hammam au savon noir », « Excursion désert d'Agafay ou Ourika ».
8. ☀️ **Météo & Pourboires** : « Meilleure période pour venir ? », « Quel pourboire donner ? ».
9. ✨ **Visites Privées Zaky** : « Tarifs des circuits privés », « Réserver une visite avec Zaky ».

Tapez simplement votre question ou cliquez sur l'un des boutons en haut !`,
      es: `Esto es todo lo que puedes preguntarme en cualquier momento:

1. 🕌 **Monumentos principales**: "¿Qué lugares visitar?", "Horarios Madraza Ben Youssef", "Entradas Majorelle".
2. 🍲 **Comida típica**: "¿Dónde comer auténtica Tanjia?", "¿Es segura la comida callejera?".
3. 🛍️ **Zocos y Regateo**: "¿Cómo regatear en los zocos?", "La regla del 50%", "Consejos sobre las curtidurías".
4. 🛡️ **Seguridad**: "¿Qué estafas evitar en la Medina?", "Fotos con animales en Jemaa el-Fna".
5. 👗 **Vestimenta**: "¿Qué ropa llevar en la Medina?", "Calzado cómodo y normas de respeto".
6. 🚕 **Taxis y Dinero**: "Precios de taxi y taxímetro", "Traslado desde el aeropuerto", "Cajeros y dírhams".
7. 🌿 **Hammams y Excursiones**: "Cómo funciona el hammam tradicional", "Desierto de Agafay", "Valle de Ourika".
8. ☀️ **Clima y Propinas**: "¿Cuál es la mejor época para viajar?", "¿Cuánto dar de propina?".
9. ✨ **Tours Privados con Zaky**: "Precios de los tours privados", "Reservar visita con guía oficial".

¡Escribe lo que quieras saber o haz clic en los accesos rápidos de arriba!`,
    },
  },
];

/**
 * Intelligent Query Matcher
 * Analyzes natural language input and scores knowledge topics based on semantic matches.
 */
const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "and", "or", "but", "if", "so", "how", "what", "where", "when", "why", "which", "much", "many",
  "le", "la", "les", "un", "une", "des", "du", "de", "d", "en", "dans", "sur", "pour", "par",
  "est", "sont", "et", "ou", "qui", "quoi", "ce", "cet", "cette", "ces", "il", "elle", "ils", "elles", "il y a",
  "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "en", "para", "por",
  "es", "son", "y", "o", "donde", "cuando", "se", "hay", "mas"
]);

/**
 * Intelligent Query Matcher
 * Analyzes natural language input and scores knowledge topics based on semantic matches.
 */
export function findBestMarrakechAnswer(
  query: string,
  lang: "en" | "fr" | "es"
): { topic: KnowledgeTopic; score: number } | null {
  if (!query || query.trim().length === 0) return null;

  // 1. Clean and normalize query
  const cleanRaw = query
    .toLowerCase()
    .replace(/['’]/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Clean alphanumeric string with spaces for tokenization
  const cleanAlpha = cleanRaw.replace(/[^a-z0-9\s]/g, " ").trim();
  const words = cleanAlpha.split(/\s+/).filter(Boolean);

  let bestMatch: { topic: KnowledgeTopic; score: number } | null = null;
  let highestScore = 0;

  for (const topic of marrakechKnowledge) {
    let score = 0;

    for (const kw of topic.keywords) {
      const normKw = kw.toLowerCase().replace(/['’]/g, " ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
      const kwWords = normKw.split(/\s+/).filter(Boolean);

      if (kwWords.length > 1) {
        // Multi-word phrase matching: exact consecutive appearance gets high weight
        if (cleanAlpha.includes(normKw)) {
          score += kwWords.length * 10;
        } else {
          // Check non-stop words matches
          const meaningfulKw = kwWords.filter((w) => !STOP_WORDS.has(w) && w.length >= 3);
          const matchedWords = meaningfulKw.filter(
            (kw) => words.includes(kw) || (kw.length >= 4 && words.some((w) => w.length >= 4 && (w.startsWith(kw) || kw.startsWith(w))))
          );
          if (matchedWords.length >= 2) {
            score += matchedWords.length * 5;
          }
        }
      } else if (kwWords.length === 1) {
        const singleWord = kwWords[0];
        // Ignore single stop words unless it's conversational intent like "hi" or "bye"
        if (STOP_WORDS.has(singleWord)) continue;

        // Whole-word exact match
        if (words.includes(singleWord)) {
          // Extra boost for short conversational words ("hi", "hey", "bye", "yo")
          score += singleWord.length <= 3 ? 8 : 6;
        } else if (singleWord.length >= 5) {
          // Check stem / prefix match (e.g. "arnaques" vs "arnaque", "habiller" vs "habille")
          for (const w of words) {
            if (!STOP_WORDS.has(w) && w.length >= 5 && (w.startsWith(singleWord) || singleWord.startsWith(w))) {
              score += 5;
              break;
            }
          }
        }
      }
    }

    // Title match
    const titleText = topic.title[lang]?.toLowerCase().replace(/['’]/g, " ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ") || "";
    if (titleText && cleanAlpha.includes(titleText)) {
      score += 15;
    } else if (titleText) {
      const titleWords = titleText.split(/\s+/).filter((w) => !STOP_WORDS.has(w) && w.length >= 4);
      for (const tw of titleWords) {
        if (words.includes(tw) || words.some((w) => w.length >= 4 && (w.startsWith(tw) || tw.startsWith(w)))) {
          score += 4;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = { topic, score };
    }
  }

  // Minimum threshold score
  if (highestScore >= 5 && bestMatch) {
    return bestMatch;
  }

  return null;
}

