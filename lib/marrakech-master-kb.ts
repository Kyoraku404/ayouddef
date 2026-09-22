/**
 * Marrakeshi Guide — Master Tourism Knowledge Base (chatbot retrieval corpus).
 *
 * Companion to lib/marrakech-knowledge.ts. Covers districts, day trips,
 * Essaouira, Oualidia, bargaining, Darija phrases, itineraries, accommodation,
 * shopping, navigation and culture — in English, French, Spanish and Arabic/Darija.
 *
 * RULE (live-info policy): answers here never invent prices, opening hours,
 * ticket availability, schedules, weather or regulations. They always point
 * the visitor to verify live/official sources.
 */

import type { KnowledgeTopic } from "./marrakech-knowledge";

const WHATSAPP_URL =
  "https://wa.me/212661176369?text=Hello%20Zaky%2C%20I%20am%20visiting%20Marrakech%20and%20would%20like%20to%20plan%20a%20tour.";

export const masterKnowledge: KnowledgeTopic[] = [
  // ==================== DISTRICTS ====================
  {
    id: "districts-gueliz",
    category: "logistics",
    keywords: [
      "gueliz", "gueliz area", "new city", "ville nouvelle", "hivernage", "palmeraie", "palm grove",
      "modern district", "quartier moderne", "quartier gueliz", "ou rester", "where to stay area",
      "donde alojarse", "zona moderna", "ciudad nueva", "hivernage hotels",
      "كليز", "كيليز", "المدينة الجديدة", "الحي العصري", "النخيل", "فين نسكن",
      "gueliz fin", "hotel gueliz", "riad or hotel",
    ],
    title: {
      en: "Gueliz, Hivernage & Palmeraie — Modern Marrakech",
      fr: "Guéliz, Hivernage & Palmeraie — Marrakech moderne",
      es: "Guéliz, Hivernage y Palmeraie — Marrakech moderno",
      ar: "كليز والحي العصري ونخيل مراكش",
    },
    answer: {
      en: `**Beyond the Medina — modern Marrakech:**

**Gueliz (Ville Nouvelle)**: wide streets, modern cafes and restaurants, shops and galleries, easier vehicle access. Good if you want contemporary city life next to historic sightseeing. Jardin Majorelle sits on this side of the city.

**Hivernage**: large hotels, broad avenues, easy transfers. Practical, but don't expect old-city atmosphere.

**Palmeraie**: palm-grove resort area outside the center — space and quiet, but transfers to the sights take real planning. Best as a resort split, not as a sightseeing base.

**Rule of thumb**: Medina = atmosphere and walking; Gueliz = modern convenience; Palmeraie = retreat.`,
      fr: `**En dehors de la Médina :**

**Guéliz (Ville Nouvelle)** : larges avenues, cafés et restaurants modernes, galeries, accès facile en voiture. Idéal pour combiner Marrakech historique et vie contemporaine. Le Jardin Majorelle se trouve de ce côté.

**Hivernage** : grands hôtels, avenues larges, transferts simples. Pratique, mais sans l'ambiance de la vieille ville.

**Palmeraie** : zone de resorts dans la palmeraie, au calme mais loin des visites — à prévoir en transferts. Mieux en séjour détente qu'en base de visites.

**Repère simple** : Médina = ambiance ; Guéliz = praticité moderne ; Palmeraie = retraite.`,
      es: `**Más allá de la Medina:**

**Guéliz (Ciudad Nueva)**: calles amplias, cafés y restaurantes modernos, galerías, fácil acceso en coche. El Jardín Majorelle está en este lado.

**Hivernage**: hoteles grandes y avenidas amplias. Práctico, sin el ambiente de la ciudad antigua.

**Palmeraie**: zona de resorts entre palmeras, tranquila pero lejos — planifica bien los traslados.

**Regla simple**: Medina = ambiente; Guéliz = comodidad moderna; Palmeraie = descanso.`,
      ar: `**مراكش خارج المدينة القديمة:**

**كليز (المدينة الجديدة)**: شوارع واسعة، مقاهي ومطاعم عصرية، وصول سهل بالسيارة. حديقة ماجوريل من هاد الجهة.

**الحي الشتوي (Hivernage)**: فنادق كبار وطرق واسعة — عملي ولكن بلا أجواء المدينة القديمة.

**النخيل (Palmeraie)**: منتجعات وسط النخيل، هادئة ولكن بعيدة — خاصك تنظم التنقل مزيان.

**القاعدة**: المدينة = الأجواء ؛ كليز = الراحة العصرية ؛ النخيل = الاستجمام.`,
    },
  },
  {
    id: "kasbah-mellah",
    category: "monument",
    keywords: [
      "kasbah", "mellah", "jewish quarter", "quartier juif", "southern medina",
      "medina du sud", "saadian", "tombeaux", "barrio judio", "kasbah mosque",
      "القصبة", "الملاح", "الحي اليهودي", "المقابر السعدية", "mellah market",
    ],
    title: {
      en: "Kasbah & Mellah — Southern Medina Heritage",
      fr: "Kasbah & Mellah — Patrimoine du sud de la Médina",
      es: "Kasbah y Mellah — Patrimonio del sur de la Medina",
      ar: "القصبة والملاح — تراث جنوب المدينة",
    },
    answer: {
      en: `**Southern Medina in one block:** group these together — they sit side by side.

**Bahia Palace**: preserved decorative palace — courtyards, zellige, carved wood. For architecture and design lovers.
**El Badi Palace**: a monumental Saadian *ruin* — open courts and history, not furnished interiors. The opposite experience from Bahia.
**Saadian Tombs**: compact royal necropolis, very decorated chambers — can queue, arrive with patience.
**Mellah**: the historic Jewish quarter between them — urban history, market streets, Jewish-Moroccan heritage. Walk it respectfully; it's a living neighborhood.

Allow a half day for this cluster, not a rushed hour. Hours and entry conditions change — verify live before going.`,
      fr: `**Le sud de la Médina en un seul bloc :** tout est côte à côte.

**Palais Bahia** : palais décoré et préservé — patios, zelliges, bois sculpté. Pour les amateurs d'architecture.
**Palais El Badi** : *ruine* monumentale saadienne — grandes cours et histoire, pas d'intérieurs meublés. L'inverse du Bahia.
**Tombeaux Saadiens** : nécropole royale compacte, salles très décorées — file possible, venez patient.
**Mellah** : l'ancien quartier juif entre les deux — histoire urbaine, rues de marché, patrimoine judéo-marocain. Quartier vivant : visitez avec respect.

Prévoyez une demi-journée pour cet ensemble. Horaires et conditions d'accès à vérifier avant de venir.`,
      es: `**El sur de la Medina en un bloque:**

**Palacio Bahía**: palacio decorado y conservado — patios, zellige, madera tallada.
**Palacio El Badi**: *ruina* monumental saadí — grandes patios e historia.
**Tumbas Saadíes**: necrópolis real compacta, salas muy decoradas — puede haber cola.
**Mellah**: el antiguo barrio judío — historia urbana y patrimonio judeo-marroquí. Barrio vivo: visita con respeto.

Reserva media jornada. Verifica horarios y accesos antes de ir.`,
      ar: `**جنوب المدينة في جولة وحدة:**

**قصر الباهية**: قصر مزخرف ومحفوظ — صحون، زليج، خشب منقوش.
**قصر البديع**: *أطلال* سعدية ضخمة — ساحات مفتوحة وتاريخ.
**القبور السعدية**: مقبرة ملكية صغيرة مزخرفة بزاف — قدر تكون الزحمة.
**الملاح**: الحي اليهودي القديم — تاريخ وتراث يهودي مغربي. حي ساكن فيه الناس: زورو باحترام.

خصص نصف نهار لهاد المجموعة. تحقق من الأوقات وشروط الدخول قبل ما تمشي.`,
    },
    relatedAction: {
      type: "tour",
      label: { en: "See Heritage Tour", fr: "Voir le Circuit Patrimoine", es: "Ver Tour Patrimonio" },
      link: "/tours/historical-marrakesh",
    },
  },
  {
    id: "jemaa-el-fna",
    category: "monument",
    keywords: [
      "jemaa el-fna", "jamaa el fna", "jamaa lafna", "djamaa", "djemaa", "the square",
      "place jemaa", "place principale", "plaza jemaa", "evening square", "night square",
      "جامع الفنا", "الساحة", "ساحة جامع الفنا", "jamaa lfna", "fin kayna jamaa",
    ],
    title: {
      en: "Jemaa el-Fna — The Square, Day & Night",
      fr: "Jemaa el-Fna — La Place, Jour & Nuit",
      es: "Jemaa el-Fna — La Plaza, Día y Noche",
      ar: "جامع الفنا — الساحة بالنهار وبالليل",
    },
    answer: {
      en: `**Jemaa el-Fna is Marrakech's living room** — and it changes completely with the hour.

**Daytime**: calmer, open square, fresh orange juice, gateway to the souks.
**Late afternoon → evening**: the transformation — food stalls, music, crowds, intensity. Many visitors love watching the change happen from a terrace, then going down.

**Practical notes**:
- Keep valuables secure in dense crowds.
- Ask before close-up photos of people/animals, and agree the price first.
- Crowd-avoiders: come earlier, leave before the peak.

Combine with: Koutoubia exterior, souks, a rooftop viewpoint.`,
      fr: `**Jemaa el-Fna, le salon de Marrakech** — la place change totalement selon l'heure.

**Journée** : calme, jus d'orange frais, porte d'entrée des souks.
**Fin d'après-midi → soir** : la transformation — gargotes, musique, foule, intensité. Beaucoup aiment observer depuis une terrasse avant de descendre.

**Conseils** : effets personnels en sécurité dans la foule ; demandez avant toute photo rapprochée et fixez le prix avant ; si vous évitez la foule, venez plus tôt.

À combiner : extérieur Koutoubia, souks, point de vue en rooftop.`,
      es: `**Jemaa el-Fna, el salón de Marrakech** — cambia totalmente según la hora.

**Día**: tranquila, zumos frescos, puerta a los zocos.
**Tarde → noche**: la transformación — puestos de comida, música, multitudes.

**Consejos**: cuida tus pertenencias; pregunta antes de fotos cercanas y acuerda el precio; si evitas multitudes, ven más temprano.`,
      ar: `**جامع الفنا هي صالة مراكش** — وكتبدل تماما حسب الوقت.

**بالنهار**: هادئة، عصير البرتقال، باب الأسواق.
**العشية → الليل**: التحول — ماكلة، موسيقى، زحمة وأجواء قوية.

**نصائح**: حافظ على حوايجك فالزحمة ؛ سول قبل ما تصور الناس عن قرب واتفق على الثمن ؛ إلا ما كتحملش الزحمة، جي بكري.`,
    },
  },
  {
    id: "koutoubia",
    category: "monument",
    keywords: [
      "koutoubia", "kutubiyya", "koutoubia mosque", "minaret", "mosquee koutoubia",
      "mezquita kutubia", "الكتبية", "جامع الكتبية", "الصومعة", "mosquee", "can i enter koutoubia",
    ],
    title: {
      en: "Koutoubia — Landmark & Orientation Point",
      fr: "Koutoubia — Repère & Point d'orientation",
      es: "Kutubía — Referencia y Orientación",
      ar: "الكتبية — المعلمة والنقطة المرجعية",
    },
    answer: {
      en: `**Koutoubia's minaret is Marrakech's compass** — visible from Jemaa el-Fna and much of the center. Use it to orient yourself.

**What it is**: 12th-century Almohad architecture, central to the city's identity — not just a photo stop.

**Important**: the mosque interior is generally reserved for worshippers. Enjoy the exterior, gardens and sunset-side walk unless current official rules say otherwise.

Combine with: Jemaa el-Fna, southern Medina start, Menara-side routes.`,
      fr: `**Le minaret de la Koutoubia, boussole de Marrakech** — visible depuis Jemaa el-Fna. Servez-vous en pour vous orienter.

**Ce que c'est** : architecture almohade du XIIe siècle, au cœur de l'identité urbaine — bien plus qu'un simple arrêt photo.

**Important** : l'intérieur est généralement réservé aux fidèles. Profitez de l'extérieur, des jardins et de la balade côté coucher de soleil, sauf règle officielle contraire.

À combiner : Jemaa el-Fna, départ Médina sud.`,
      es: `**El minarete de la Kutubía, brújula de Marrakech** — visible desde Jemaa el-Fna. Úsalo para orientarte.

**Importante**: el interior suele estar reservado a fieles. Disfruta del exterior y los jardines, salvo norma oficial en contrario.`,
      ar: `**صومعة الكتبية هي بوصلة مراكش** — كتبان من جامع الفنا. استعملها باش تعرف الاتجاه.

**مهم**: الداخل غالبا مخصص للمصلين. تمتع بالخارج والحدائق، إلا إذا كانت القواعد الرسمية كتسمح بغير ذلك.`,
    },
  },
  {
    id: "southern-palaces",
    category: "monument",
    keywords: [
      "bahia", "palais bahia", "el badi", "badi palace", "saadian tombs", "tombeaux saadiens",
      "palacio bahia", "tumbas saadies", "bahia vs badi", "which palace", "quel palais",
      "قصر الباهية", "قصر البديع", "القبور السعدية", "touts les palais",
    ],
    title: {
      en: "Bahia vs El Badi vs Saadian Tombs",
      fr: "Bahia vs El Badi vs Tombeaux Saadiens",
      es: "Bahía vs El Badi vs Tumbas Saadíes",
      ar: "الباهية مقابل البديع والقبور السعدية",
    },
    answer: {
      en: `**Don't treat them as interchangeable — they answer different desires:**

- **Bahia** → preserved beauty: decorated rooms, courtyards, craftsmanship. Go for design and interiors.
- **El Badi** → monumental ruin: vast courts, history you imagine. Go for scale and Saadian story.
- **Saadian Tombs** → intimate necropolis: small, dense decoration. Go for concentrated artistry (and patience in narrow spaces).

**If short on time**: pick Bahia for beauty, or Tombs for intensity. Doing all three properly = half a day in the southern Medina. Entry conditions change — verify live.`,
      fr: `**Ne les confondez pas — chacun répond à une envie différente :**

- **Bahia** → la beauté préservée : salles décorées, patios, artisanat. Pour le design.
- **El Badi** → la ruine monumentale : vastes cours, histoire à imaginer. Pour l'échelle et le récit saadien.
- **Tombeaux Saadiens** → nécropole intime : petite, décoration dense. Pour l'intensité (et patience dans les passages étroits).

**Si peu de temps** : Bahia pour la beauté, Tombeaux pour l'intensité. Les trois correctement = une demi-journée. Conditions d'entrée à vérifier.`,
      es: `**No los confundas:**

- **Bahía** → belleza conservada: salas decoradas, patios.
- **El Badi** → ruina monumental: grandes patios e historia.
- **Tumbas Saadíes** → necrópolis íntima y muy decorada.

**Con poco tiempo**: Bahía por belleza, Tumbas por intensidad. Los tres = media jornada.`,
      ar: `**ما تخلطهومش — كل واحد عندو طابعو:**

- **الباهية** → الجمال المحفوظ: قاعات مزخرفة وص—and صحون.
- **البديع** → أطلال ضخمة: ساحات واسعة وتاريخ.
- **القبور السعدية** → مقبرة صغيرة مزخرفة بكثافة.

**إلا كان الوقت قليل**: الباهية للجمال، القبور للكثافة. الثلاثة = نصف نهار.`,
    },
    relatedAction: {
      type: "tour",
      label: { en: "See Heritage Tour", fr: "Voir le Circuit Patrimoine", es: "Ver Tour Patrimonio" },
      link: "/tours/historical-marrakesh",
    },
  },
  {
    id: "menara-gardens",
    category: "monument",
    keywords: [
      "menara", "menara gardens", "jardins menara", "jardines menara", "atlas view",
      "vue atlas", "pavilion basin", "bassin menara", "sunset menara",
      "المنارة", "حدائق المنارة", "menara sunset",
    ],
    title: {
      en: "Menara Gardens — Open Landscape & Atlas Views",
      fr: "Jardins de la Ménara — Grand paysage & vues Atlas",
      es: "Jardines de la Menara — Paisaje y Vistas del Atlas",
      ar: "حدائق المنارة — المنظر المفتوح والأطلس",
    },
    answer: {
      en: `**Menara is not a flower garden** — it's a historic open landscape: huge basin, pavilion, olive groves, and (when haze allows) the Atlas on the horizon.

Go for: space, classic Marrakech scenery, walk, late-afternoon light. Not for dense botany — that's Majorelle.

Mountain visibility depends on weather and season; never count on a guaranteed view. Access arrangements can vary — verify live.`,
      fr: `**La Ménara n'est pas un jardin fleuri** — c'est un grand paysage historique : immense bassin, pavillon, oliveraie et (si la brume le permet) l'Atlas à l'horizon.

Pour : l'espace, le décor classique de Marrakech, la balade, la lumière de fin de journée. Pas pour la botanique dense — c'est Majorelle.

La visibilité des montagnes dépend de la météo ; accès variable — vérifiez avant.`,
      es: `**La Menara no es un jardín floral** — es un gran paisaje histórico: estanque, pabellón, olivos y (si lo permite la calima) el Atlas al fondo.

Ideal para pasear y la luz de la tarde. La visibilidad depende del clima.`,
      ar: `**المنارة ماشي حديقة ورود** — هي منظر تاريخي مفتوح: حوض كبير، جناح، زيتون، والأطلس في الأفق (إلا سمح الضباب).

مناسبة للمشي وضوء العشية. الرؤية حسب الطقس.`,
    },
  },
  {
    id: "mediation-gardens-secret",
    category: "monument",
    keywords: [
      "jardin secret", "le jardin secret", "secret garden", "jardin secreto", "dar el bacha",
      "dar bacha", "mouassine", "calm garden", "jardin calme", "quiet medina",
      "الحديقة السرية", "دار الباشا", "secret",
    ],
    title: {
      en: "Le Jardin Secret & Dar El Bacha — Calm Breaks",
      fr: "Jardin Secret & Dar El Bacha — Pauses au calme",
      es: "Jardín Secreto y Dar El Bacha — Pausas Tranquilas",
      ar: "الحديقة السرية ودار الباشا — استراحة هادئة",
    },
    answer: {
      en: `**Two resets inside busy days:**

**Le Jardin Secret** (Mouassine): restored garden-riad — Islamic garden design, water, shade. Perfect mid-souks pause.

**Dar El Bacha**: richly decorated palace-museum. Go for interiors and exhibitions — but never assume a specific exhibition is still on; programming changes.

Both pair with a Medina shopping day. Tickets/hours to verify live.`,
      fr: `**Deux respirations dans les journées chargées :**

**Le Jardin Secret** (Mouassine) : jardin-riad restauré — design islamique, eau, ombre. Pause idéale en pleine journée souks.

**Dar El Bacha** : palais-musée richement décoré. Pour les intérieurs et expositions — mais ne supposez jamais qu'une expo est toujours là.

Les deux se combinent avec une journée shopping. Billets/horaires à vérifier.`,
      es: `**Dos pausas tranquilas:**

**Le Jardin Secret**: jardín-riad restaurado, ideal a mitad del día de zocos.
**Dar El Bacha**: palacio-museo decorado; la programación cambia — verifica.

Ambos combinan con un día de compras.`,
      ar: `**جوج استراحات وسط النهار العامر:**

**الحديقة السرية**: رياض-حديقة مرمم — الظل والماء. وقفة مثالية وسط التسوق.
**دار الباشا**: قصر-متحف مزخرف ؛ البرمجة كتبدل — تحقق.

بجوج مناسبين مع نهار التسوق.`,
    },
  },
  // ==================== DAY TRIPS ====================
  {
    id: "ourika-valley",
    category: "logistics",
    keywords: [
      "ourika", "ourika valley", "vallee ourika", "valle ourika", "setti fatma", "setti-fatma",
      "waterfalls ourika", "cascades ourika", "cascadas ourika", "mountain day trip",
      "excursion montagne", "excursion ourika", "أوريكا", "وادي أوريكا", "ستي فاطمة", "الشلالات",
    ],
    title: {
      en: "Ourika Valley — Which Experience Do You Want?",
      fr: "Vallée de l'Ourika — Quelle expérience voulez-vous ?",
      es: "Valle de Ourika — ¿Qué Experiencia Buscas?",
      ar: "وادي أوريكا — شنو بغيتي بالضبط؟",
    },
    answer: {
      en: `**"Ourika" means 4 different days — pick yours:**

1. **Scenic drive + riverside lunch**: villages, valley views, relaxed meal. Easy.
2. **Village visit**: living communities — respect homes, farms and privacy.
3. **Setti Fatma waterfall walk**: uneven, sometimes slippery paths. Grip footwear, go with an appropriate local guide, match the route to your ability. Never sold as "effortless for everyone".
4. **Full hike**: weather, equipment and time needed.

Ourika can feel cooler than Marrakech, but check live weather — mountain conditions differ sharply. Operator availability varies; verify live.`,
      fr: `**« Ourika », ce sont 4 journées différentes — choisissez :**

1. **Route panoramique + déjeuner au bord de l'eau** : villages, vues, repas détendu. Facile.
2. **Visite de village** : communautés vivantes — respectez maisons et intimité.
3. **Marche des cascades de Setti Fatma** : sentiers irréguliers, parfois glissants. Chaussures adhérentes, guide local adapté, parcours selon votre niveau.
4. **Grande randonnée** : météo, équipement et temps requis.

L'Ourika peut sembler plus fraîche que Marrakech, mais vérifiez la météo en direct — la montagne diffère fortement.`,
      es: `**"Ourika" son 4 días distintos:**

1. **Ruta panorámica + almuerzo junto al río**: fácil.
2. **Visita de pueblos**: respeta hogares y privacidad.
3. **Caminata a las cascadas de Setti Fatma**: senderos irregulares; buen calzado y guía local.
4. **Senderismo serio**: requiere meteo, equipo y tiempo.

Puede hacer más fresco que Marrakech, pero verifica el clima en vivo.`,
      ar: `**"أوريكا" فيها 4 أنواع ديال النهار — اختار ديالك:**

1. **طريق بانورامية + غدا حدا الواد**: ساهلة.
2. **زيارة الدواوير**: ناس ساكنين — احترم الديور والخصوصية.
3. **مشية الشلالات ستي فاطمة**: الطريق واعرة منزلقة — صباط مزيان ومرشد محلي.
4. **مشية كبيرة**: خاص الطقس والمعدات والوقت.

أوريكا قدر تكون أبرد من مراكش، ولكن تحقق من الطقس المباشر.`,
    },
  },
  {
    id: "imlil-atlas",
    category: "logistics",
    keywords: [
      "imlil", "high atlas", "haut atlas", "alto atlas", "atlas mountains", "montagnes atlas",
      "montanas atlas", "trekking", "randonnee atlas", "senderismo atlas", "toubkal",
      "إمليل", "الأطلس الكبير", "جبال الأطلس", "imlil day trip",
    ],
    title: {
      en: "Imlil & High Atlas — Mountain Days, Done Right",
      fr: "Imlil & Haut Atlas — Journées montagne réussies",
      es: "Imlil y Alto Atlas — Días de Montaña",
      ar: "إمليل والأطلس الكبير — نهار الجبل",
    },
    answer: {
      en: `**Imlil is the High Atlas gateway** — village scenery, guided walks, lunch, viewpoints. A gentle day is very doable.

**But**: serious altitude objectives need planning, current conditions, proper support and equipment. Never attempt unprepared high trekking.

City ≠ mountain: snow, rain, cold and roads can differ totally from Marrakech on the same day. Check live mountain weather, and keep Atlas days separate from intensive city sightseeing.`,
      fr: `**Imlil, porte du Haut Atlas** — village, balades guidées, déjeuner, points de vue. Une journée douce est tout à fait faisable.

**Mais** : les objectifs d'altitude sérieux exigent préparation, conditions actuelles, encadrement et équipement. Jamais de trek improvisé en haute montagne.

Ville ≠ montagne : neige, pluie, froid et routes peuvent différer totalement de Marrakech le même jour. Vérifiez la météo montagne en direct.`,
      es: `**Imlil, puerta del Alto Atlas** — pueblo, paseos guiados, almuerzo, miradores. Un día suave es factible.

**Pero**: la alta montaña exige preparación y condiciones actuales. Nunca improvises.

Ciudad ≠ montaña: verifica el clima de montaña en vivo.`,
      ar: `**إمليل هي باب الأطلس الكبير** — الدوار، مشيات مع مرشد، غدا، مناظر. نهار خفيف ممكن.

**ولكن**: الجبل العالي خاصو التحضير والظروف الحالية والمعدات. ما تمشيش بلا استعداد.

المدينة ≠ الجبل: الثلج والبرد والطريق يقدرو يختلفو تماما على مراكش فنفس النهار.`,
    },
  },
  {
    id: "agafay-desert",
    category: "logistics",
    keywords: [
      "agafay", "agafai", "desert agafay", "desierto agafay", "desert near marrakech",
      "desert camp", "camp agafay", "coucher soleil desert", "sunset desert", "sahara day trip",
      "sahara from marrakech", "is agafay sahara", "أكفاي", "الصحراء", "صحراء أكفاي",
    ],
    title: {
      en: "Agafay — Arid Escape (Not the Sahara)",
      fr: "Agafay — Échappée aride (pas le Sahara)",
      es: "Agafay — Escape Árido (No es el Sáhara)",
      ar: "أكفاي — منظر صحراوي قريب (ماشي الصحراء الكبرى)",
    },
    answer: {
      en: `**Say it clearly: Agafay is NOT the Sahara.** It's a rocky, arid landscape close to Marrakech — sunset visits, camps, meals, panoramas.

Good for: a short escape, sunset, camp-style evening without long road days.
Not for: "Sahara experience" — true Sahara trips need far more travel time.

Operator quality, activities and prices vary enormously — verify live availability and what's actually included before booking anything.`,
      fr: `**À dire clairement : Agafay n'est PAS le Sahara.** C'est un paysage aride et rocailleux proche de Marrakech — couchers de soleil, camps, repas, panoramas.

Pour : une courte échappée, un soir type camp, sans longues routes.
Pas pour : « l'expérience Sahara » — le vrai Sahara exige bien plus de route.

Qualité des opérateurs et prix très variables — vérifiez en direct avant de réserver.`,
      es: `**Claro: Agafay NO es el Sáhara.** Es un paisaje árido y rocoso cerca de Marrakech — atardeceres, campamentos, panoramas.

Ideal para una escapada corta. El verdadero Sáhara exige mucho más viaje. Verifica disponibilidad en vivo.`,
      ar: `**بوضوح: أكفاي ماشي الصحراء الكبرى.** هي منطقة قاحلة صخرية قريبة من مراكش — الغروب، المخيمات، المناظر.

مناسبة لهروب قصير. الصحراء الحقيقية خاصها طريق طويلة بزاف. تحقق من التوفر المباشر قبل الحجز.`,
    },
  },
  {
    id: "ouzoud-falls",
    category: "logistics",
    keywords: [
      "ouzoud", "ouzoud waterfalls", "cascades ouzoud", "cascadas ouzoud", "ouzoud day trip",
      "excursion ouzoud", "شلالات أوزود", "أوزود",
    ],
    title: {
      en: "Ouzoud Waterfalls — Full-Day Commitment",
      fr: "Cascades d'Ouzoud — Journée entière",
      es: "Cascadas de Ouzoud — Día Completo",
      ar: "شلالات أوزود — نهار كامل",
    },
    answer: {
      en: `**Ouzoud is a much longer day than Ourika or Agafay.** Treat it as the single main activity of the day — don't stack major Marrakech sightseeing on top.

Expect: long road travel both ways, trails, viewpoints, seasonal waterflow and crowds.

Check live: road, weather, waterflow and trail conditions.`,
      fr: `**Ouzoud, bien plus long qu'Ourika ou Agafay.** Considérez-le comme LA seule activité du jour — n'ajoutez pas de visites majeures à Marrakech par-dessus.

Prévoyez : longue route aller-retour, sentiers, débit et foule selon saison.

À vérifier : route, météo, débit et sentiers.`,
      es: `**Ouzoud es mucho más largo que Ourika o Agafay.** Trátalo como la única actividad del día.

Verifica: carretera, clima, caudal y senderos.`,
      ar: `**أوزود أطول بكثير من أوريكا أو أكفاي.** اعتبرو النشاط الوحيد ديال النهار.

تحقق من: الطريق، الطقس، الصبيب وحالة المسالك.`,
    },
  },
  // ==================== COAST ====================
  {
    id: "essaouira-guide",
    category: "logistics",
    keywords: [
      "essaouira", "essauira", "mogador", "essaouira day trip", "excursion essaouira",
      "essaouira medina", "essaouira port", "essaouira beach", "essaouira ramparts",
      "skala", "day trip sea", "excursion mer", "playa essaouira",
      "الصويرة", "موكادور", "essaouira oujda",
      "nmchi l essaouira", "namchi l essaouira", "essaouira nhar", "essaouira worth",
      "bghit essaouira",
    ],
    title: {
      en: "Essaouira — Atlantic Fortified City",
      fr: "Essaouira — Cité atlantique fortifiée",
      es: "Essaouira — Ciudad Atlántica Fortificada",
      ar: "الصويرة — مدينة أطلسية عريقة",
    },
    answer: {
      en: `**Essaouira (ex-Mogador), UNESCO Medina on the Atlantic.** Compact, walkable, windy — the opposite rhythm from Marrakech.

**See**: fortified Medina (easier to navigate than Marrakech's), Skala ramparts for ocean views and history, working fishing port (active workplace — stay clear, ask before close photos), broad beach.
**Eat**: seafood capital — agree price/weight before ordering where sold by weight.
**How long**: day trip is possible but road-heavy; 1 night gives sunset + slow morning; 2 nights = real coastal break.

Marrakech = inland imperial energy. Essaouira = Atlantic air, port, slower pace. No direct Marrakech train — check current coach/road options.`,
      fr: `**Essaouira (ex-Mogador), Médina UNESCO sur l'Atlantique.** Compacte, praticable à pied, ventée — le rythme inverse de Marrakech.

**Voir** : Médina fortifiée (plus simple que celle de Marrakech), remparts de la Skala, port de pêche actif (zone de travail — restez à l'écart, demandez avant les photos rapprochées), grande plage.
**Manger** : capitale des fruits de mer — fixez prix/poids avant de commander.
**Combien de temps** : excursion possible mais routière ; 1 nuit = coucher de soleil + matinée tranquille ; 2 nuits = vraie pause côtière.

Pas de train direct depuis Marrakech — vérifiez cars/route actuels.`,
      es: `**Essaouira (ex-Mogador), Medina UNESCO en el Atlántico.** Compacta, ventosa — el ritmo opuesto a Marrakech.

**Ver**: Medina fortificada, murallas de la Skala, puerto pesquero activo, playa amplia.
**Comer**: capital del marisco — acuerda precio/peso antes.
**Duración**: excursión posible pero con carretera; 1 noche = atardecer + mañana tranquila.

Sin tren directo desde Marrakech.`,
      ar: `**الصويرة (موكادور)، مدينة يونسكو على الأطلسي.** صغيرة، سهلة المشي، فيها الريح — إيقاع معاكس لمراكش.

**شوف**: المدينة المحصنة، أسوار السقالة، الميناء الخدام (منطقة عمل — بعد وما تصورش العمال عن قرب بلا إذن)، الشاطئ.
**كول**: عاصمة الحوت — اتفق على الثمن/الوزن قبل.
**شحال**: نهار ممكن ولكن فيه الطريق بزاف ؛ ليلة = الغروب + صباح مهل ؛ جوج = عطلة ساحلية حقيقية.

ما كاينش القطار المباشر من مراكش.`,
    },
    relatedAction: {
      type: "tour",
      label: { en: "See Coastal Escape", fr: "Voir l'Escapade Côtière", es: "Ver Escapada Costera" },
      link: "/tours/marrakesh-oualidia-coastal-escape-5-days",
    },
  },
  {
    id: "oualidia-guide",
    category: "logistics",
    keywords: [
      "oualidia", "oualidia lagoon", "walidia", "el oualidia", "lagune oualidia",
      "laguna oualidia", "oysters", "huitres oualidia", "ostras", "oyster",
      "الوليدية", "واليدية", "بحيرة الوليدية", "المحار", "oualidia vs essaouira",
    ],
    title: {
      en: "Oualidia — Lagoon & Quiet Coast",
      fr: "Oualidia — Lagune & Côte tranquille",
      es: "Oualidia — Laguna y Costa Tranquila",
      ar: "الوليدية — البحيرة والساحل الهادئ",
    },
    answer: {
      en: `**Oualidia = lagoon, calm, seafood.** A small coastal retreat — not a sightseeing city.

**Lagoon**: views, boat outings when available, birds by season. Tides and weather rule — never count on a water activity without current confirmation.
**Oysters/seafood**: the local identity. Choose reputable venues; shellfish allergy? Say it explicitly. No medical guarantees on raw seafood.
**Trip style**: couples/families wanting quiet; road itineraries; nature over monuments. A Marrakech day trip is long and road-heavy — overnight makes it relaxed.

For history → Essaouira. For lagoon calm → Oualidia.`,
      fr: `**Oualidia = lagune, calme, fruits de mer.** Petite retraite côtière — pas une ville de visites.

**Lagune** : vues, sorties en barque selon dispo, oiseaux selon saison. Marées et météo décident — jamais d'activité aquatique garantie sans confirmation actuelle.
**Huîtres/fruits de mer** : l'identité locale. Adresses réputées ; allergie aux crustacés ? Dites-le clairement.
**Style** : couples/familles au calme, itinéraires routiers, nature plutôt que monuments. L'excursion depuis Marrakech est longue — la nuit sur place la rend détendue.

Histoire → Essaouira. Calme lagunaire → Oualidia.`,
      es: `**Oualidia = laguna, calma, marisco.** Pequeño refugio costero.

**Laguna**: vistas, paseos en barca según disponibilidad. Mareas y clima mandan.
**Ostras/marisco**: la identidad local. Alergia al marisco: dilo claramente.
**Estilo**: parejas/familias tranquilas. La excursión desde Marrakech es larga — mejor con noche.`,
      ar: `**الوليدية = البحيرة، الهدوء، الحوت.** منتجع ساحلي صغير — ماشي مدينة المعالم.

**البحيرة**: مناظر، جولات بالقارب حسب التوفر. المد والطقس كيحكمو.
**المحار/الحوت**: الهوية المحلية. حساسية المحار؟ قولها بوضوح.
**الستايل**: هدوء للعائلات والأزواج. الرحلة من مراكش طويلة — المبيت كيريحها.

التاريخ → الصويرة. هدوء البحيرة → الوليدية.`,
    },
    relatedAction: {
      type: "tour",
      label: { en: "See Coastal Escape", fr: "Voir l'Escapade Côtière", es: "Ver Escapada Costera" },
      link: "/tours/marrakesh-oualidia-coastal-escape-5-days",
    },
  },
  {
    id: "coast-compare",
    category: "logistics",
    keywords: [
      "essaouira or oualidia", "essaouira vs oualidia", "oualidia vs essaouira",
      "which coast", "quelle cote", "cual costa", "best beach", "meilleure plage",
      "sea trip", "excursion mer", " atlantic", "essaouira ou oualidia",
      "الصويرة ولا الوليدية", "أحسن البحر", "essaouira ou agadir",
    ],
    title: {
      en: "Essaouira or Oualidia — Which Coast?",
      fr: "Essaouira ou Oualidia — Quelle côte ?",
      es: "Essaouira u Oualidia — ¿Qué Costa?",
      ar: "الصويرة ولا الوليدية — شنو تختار؟",
    },
    answer: {
      en: `**Decide by priority, not by "better":**

- **History + port city life** → Essaouira (UNESCO Medina, ramparts, port, shops, wind).
- **Lagoon calm + seafood retreat** → Oualidia (smaller, quieter, oyster identity).
- **First coastal extension, short time** → Essaouira day trip (road-heavy but doable) or Oualidia overnight.
- **Beach swimming** → neither guaranteed; wind (Essaouira) and tides (Oualidia) decide — check current local conditions.

Tell me your priority (history, calm, food, beach) and days available — I'll match it.`,
      fr: `**Décidez par priorité, pas par « mieux » :**

- **Histoire + vie portuaire** → Essaouira (Médina UNESCO, remparts, port, vent).
- **Calme lagunaire + fruits de mer** → Oualidia (plus petit, plus calme).
- **Première extension côtière, peu de temps** → Essaouira en excursion (routière) ou Oualidia avec nuit.
- **Baignade** → jamais garantie ; vent et marées décident — vérifiez sur place.

Dites-moi votre priorité et vos jours — j'ajuste.`,
      es: `**Decide por prioridad:**

- **Historia + puerto** → Essaouira.
- **Calma + laguna + marisco** → Oualidia.
- **Poco tiempo** → Essaouira en excursión u Oualidia con noche.
- **Baño** → nunca garantizado; verifica condiciones locales.`,
      ar: `**اختار حسب الأولوية:**

- **التاريخ + المدينة والميناء** → الصويرة.
- **هدوء البحيرة + الحوت** → الوليدية.
- **وقت قليل** → الصويرة نهار ولا الوليدية بليلة.
- **العوم** → ماشي مضمون ؛ الريح والمد كيحكمو.

قول ليا الأولوية ديالك وشحال عندك ديال الوقت.`,
    },
  },
  // ==================== BARGAINING ====================
  {
    id: "bargaining-guide",
    category: "souk",
    keywords: [
      "bargain", "bargaining", "haggle", "negotiate", "negociation", "marchander",
      "regatear", "regateo", "final price", "dernier prix", "precio final",
      "bch7al", "bchhal", "ch7al akhir", "akhir taman", "tn9es", "mtaf9in",
      "fixed price", "prix fixe", "precio fijo", "walk away", "nkhlliha",
      "المساومة", "المفاوضة", "بشحال", "آخر ثمن", "الثمن الثابت", "غالي",
      "how much should i offer", "combien offrir", "cuanto ofrecer",
      "kifach ntfawed", "kifach ntfawd", "ntfawed", "ntfawd",
      "tfawed", "msawma", "moussawama", "kifach nchri", "kifach ntfaham",
    ],
    title: {
      en: "Bargaining in the Souks — Flow & Respect",
      fr: "Négocier dans les Souks — Méthode & Respect",
      es: "Regatear en los Zocos — Método y Respeto",
      ar: "المساومة في الأسواق — الطريقة والاحترام",
    },
    answer: {
      en: `**Bargaining is normal negotiation, not a fight.** And not everywhere: fixed-price shops, restaurants, pharmacies and tickets = no bargaining. Ask *"Wach taman fixe?"* (fixed price?) when unsure.

**The flow:**
1. Ask: *"Bch7al hada?"* (How much is this?)
2. React: *"Ghali chwiya"* (a little expensive).
3. Ask: *"T9der tn9es chwiya?"* (can you lower a little?)
4. Ask: *"Ch7al akhir taman?"* (final price?)
5. Offer: *"N3tik ___ dirham"* (I'll give you ___).
6. Too high? *"La, bzzaf 3liya"* — then *"La chokran, nkhlliha"* and walk away politely.

**Rules**: stay friendly, set your own max, never insult, don't renegotiate after agreeing (*"Wakha, mtaf9in"* = deal). Expensive items (rugs, jewelry): compare shops, ask material/handmade/receipt/returns in writing. No single "correct discount" exists.`,
      fr: `**Négocier est normal, pas un combat.** Et pas partout : prix fixes, restaurants, pharmacies, billets = pas de négociation. Demandez *« Wach taman fixe ? »* en cas de doute.

**La méthode :**
1. *« Bch7al hada ? »* (C'est combien ?)
2. *« Ghali chwiya »* (un peu cher).
3. *« T9der tn9es chwiya ? »* (possible de baisser ?)
4. *« Ch7al akhir taman ? »* (dernier prix ?)
5. *« N3tik ___ dirham »* (je vous donne ___).
6. Trop cher ? *« La, bzzaf 3liya »* puis *« La chokran, nkhlliha »* et partez poliment.

**Règles** : souriant, votre propre maximum, jamais d'insulte, jamais renégocier après accord (*« Wakha, mtaf9in »* = marché conclu). Objets chers : comparez, exigez matière/fait-main/facture/retours par écrit. Aucun « bon pourcentage » universel.`,
      es: `**Regatear es normal, no una pelea.** Tiendas de precio fijo, restaurantes y entradas = sin regateo. Pregunta *"Wach taman fixe?"* si dudas.

**El método:** *"Bch7al hada?"* (¿cuánto?) → *"Ghali chwiya"* (un poco caro) → *"Ch7al akhir taman?"* (¿precio final?) → *"N3tik ___ dirham"* → si no: *"La chokran, nkhlliha"* y vete amable.

**Reglas**: amable, tu propio máximo, sin insultos, sin renegociar tras acordar. Piezas caras: compara y pide detalles por escrito.`,
      ar: `**المساومة عادية، ماشي حرب.** وماشي في كل بلاصة: الثمن الثابت، المطاعم، الصيدليات = بلا مساومة. سول *"واش الثمن ثابت؟"* إلا شكيتي.

**الطريقة:**
1. *"بشحال هادا؟"*
2. *"غالي شوية."*
3. *"تقدر تنقص شوية؟"*
4. *"شحال آخر ثمن؟"*
5. *"نعطيك ___ درهم."*
6. غالي؟ *"لا، بزاف عليا"* ثم *"لا شكرا، نخليها"* ومشي باحترام.

**القواعد**: ابتسم، حدد السقف ديالك، ما تهينش، ما تعاودش التفاوض من بعد الاتفاق (*"واخا، متافقين"*). الحوايج الغالية: قارن وطلب التفاصيل مكتوبة. ما كاينش "تخفيض صحيح" واحد.`,
    },
    relatedAction: {
      type: "tour",
      label: { en: "See Souks Experience", fr: "Voir l'Expérience Souks", es: "Ver Experiencia Zocos" },
      link: "/tours/souks-local-markets",
    },
  },
  // ==================== DARIJA ====================
  {
    id: "darija-phrases",
    category: "culture",
    keywords: [
      "darija", "how do i say", "how to say", "comment dire", "como se dice",
      "phrase", "translate darija", "translate this", "traduire", "traduce",
      "taxi phrase", "restaurant phrase", "chokran", "3afak", "salam", "bghit nmchi",
      "fin kayn", "l7sab", "bla 7ar", "bch7al hada", "arabizi", "moroccan words",
      "كلمات", "ترجم", "كيفاش نقول", "بغيت نمشي", "الحساب", "شكرا", "عفاك", "السلام",
    ],
    title: {
      en: "Darija Toolkit — Say It Like a Local",
      fr: "Kit Darija — Parlez comme un local",
      es: "Kit Darija — Habla como un Local",
      ar: "عدة الدارجة — هضر بحال ولاد البلاد",
    },
    answer: {
      en: `**Essentials (Arabic + Latin):**

- Hello: السلام عليكم — *Salam 3likom*
- Thank you: شكرا — *Chokran* · Please: عفاك — *3afak*
- How much is this? بشحال هادا؟ — *Bch7al hada?*
- I want to go to…: بغيت نمشي لـ… — *Bghit nmchi l…*
- Where is…? فين كاين…؟ — *Fin kayn…?*
- The bill, please: الحساب عفاك — *L7sab 3afak*
- No spice: بلا حار عفاك — *Bla 7ar 3afak*
- Just looking: غير كنتفرج — *Ghir kantferrej*
- No thank you: لا شكرا — *La chokran*
- Use the meter: خدم الكونتور عفاك — *Khdem lcompteur 3afak*

Paste any driver/shop message here and I'll translate it — dates, times and numbers preserved.`,
      fr: `**L'essentiel (arabe + latin) :**

- Bonjour : السلام عليكم — *Salam 3likom*
- Merci : شكرا — *Chokran* · S'il vous plaît : عفاك — *3afak*
- C'est combien ? بشحال هادا؟ — *Bch7al hada ?*
- Je veux aller à… : بغيت نمشي لـ… — *Bghit nmchi l…*
- Où est… ? فين كاين…؟ — *Fin kayn… ?*
- L'addition : الحساب عفاك — *L7sab 3afak*
- Pas épicé : بلا حار عفاك — *Bla 7ar 3afak*
- Je regarde seulement : غير كنتفرج — *Ghir kantferrej*
- Mettez le compteur : خدم الكونتور عفاك — *Khdem lcompteur 3afak*

Collez ici tout message (chauffeur, boutique) et je le traduis.`,
      es: `**Lo esencial (árabe + latino):**

- Hola: السلام عليكم — *Salam 3likom*
- Gracias: شكرا — *Chokran* · Por favor: عفاك — *3afak*
- ¿Cuánto es? بشحال هادا؟ — *Bch7al hada?*
- Quiero ir a…: بغيت نمشي لـ… — *Bghit nmchi l…*
- ¿Dónde está…? فين كاين…؟ — *Fin kayn…?*
- La cuenta: الحساب عفاك — *L7sab 3afak*
- Sin picante: بلا حار عفاك — *Bla 7ar 3afak*
- Solo miro: غير كنتفرج — *Ghir kantferrej*

Pega aquí cualquier mensaje y lo traduzco.`,
      ar: `**الأساسيات:**

- السلام: السلام عليكم — *Salam 3likom*
- شكرا: شكرا — *Chokran* · عفاك: عفاك — *3afak*
- بشحال؟ بشحال هادا؟ — *Bch7al hada?*
- بغيت نمشي لـ… — *Bghit nmchi l…*
- فين كاين…؟ — *Fin kayn…?*
- الحساب عفاك — *L7sab 3afak*
- بلا حار عفاك — *Bla 7ar 3afak*
- غير كنتفرج — *Ghir kantferrej*
- خدم الكونتور عفاك — *Khdem lcompteur 3afak*

صيفط ليا أي رسالة (طاكسي، حانوت) ونترجمها ليك.`,
    },
  },
  // ==================== ITINERARIES ====================
  {
    id: "itineraries-days",
    category: "tours",
    keywords: [
      "one day", "two days", "three days", "1 day", "2 days", "3 days", "4 days",
      "itinerary", "itineraire", "itinerario", "plan my days", "que faire",
      "que hacer", "un jour", "deux jours", "trois jours", "first time",
      "premiere fois", "primera vez", "only have", "combien de jours",
      "برنامج", "نهار واحد", "يومين", "ثلاثة أيام", "أول مرة", "itinerary marrakech",
    ],
    title: {
      en: "Day Plans — 1, 2 or 3 Days in Marrakech",
      fr: "Programmes — 1, 2 ou 3 jours à Marrakech",
      es: "Planes — 1, 2 o 3 Días en Marrakech",
      ar: "برامج — نهار، يومين ولا ثلاثة في مراكش",
    },
    answer: {
      en: `**Geography first: south Medina together, north Medina together, Majorelle/Gueliz separate. Never all monuments in one day.**

**1 day**: Koutoubia exterior → ONE palace/madrasa (Bahia *or* Ben Youssef) → lunch + rest → souks → Jemaa el-Fna evening transformation.
**2 days**: Day 1 = southern Medina (Koutoubia, Bahia, Mellah, El Badi/Tombs) + evening square. Day 2 = northern Medina (Ben Youssef, souks, museum/house) + Majorelle *or* Jardin Secret.
**3 days**: Day 3 = Ourika/Atlas, Agafay countryside, or slow city (hammam, food, shopping).
**+ Coast**: 1–2 nights Essaouira (city+port) or Oualidia (lagoon calm) after 3–4 Marrakech nights.

Tell me your days, area and pace — I'll tighten it.`,
      fr: `**Géographie d'abord : Médina sud ensemble, Médina nord ensemble, Majorelle/Guéliz à part. Jamais tous les monuments en un jour.**

**1 jour** : extérieur Koutoubia → UN palais/médersa (Bahia *ou* Ben Youssef) → déjeuner + repos → souks → Jemaa el-Fna le soir.
**2 jours** : J1 = Médina sud (Koutoubia, Bahia, Mellah, El Badi/Tombeaux) + place le soir. J2 = Médina nord (Ben Youssef, souks, musée) + Majorelle *ou* Jardin Secret.
**3 jours** : J3 = Ourika/Atlas, campagne Agafay, ou ville lente (hammam, gastronomie, shopping).
**+ Côte** : 1–2 nuits Essaouira ou Oualidia après 3–4 nuits à Marrakech.

Donnez-moi vos jours, quartier et rythme — j'affine.`,
      es: `**Geografía primero: sur de la Medina junto, norte junto, Majorelle aparte.**

**1 día**: exterior Kutubía → UN palacio/madraza → almuerzo + descanso → zocos → Jemaa el-Fna de noche.
**2 días**: Día 1 = sur (Kutubía, Bahía, Mellah). Día 2 = norte (Ben Youssef, zocos) + Majorelle *o* Jardín Secreto.
**3 días**: Día 3 = Ourika/Atlas, Agafay o ciudad tranquila.
**+ Costa**: 1–2 noches en Essaouira u Oualidia.`,
      ar: `**الجغرافيا أولا: جنوب المدينة مجموع، شمالها مجموع، ماجوريل بوحدها.**

**نهار**: خارج الكتبية → قصر *واحد* (الباهية *ولا* بن يوسف) → غدا + راحة → الأسواق → جامع الفنا بالليل.
**يومين**: نهار 1 = الجنوب (الكتبية، الباهية، الملاح). نهار 2 = الشمال (بن يوسف، الأسواق) + ماجوريل *ولا* الحديقة السرية.
**ثلاثة**: نهار 3 = أوريكا/الأطلس، أكفاي، ولا مدينة مهلة.
**+ الساحل**: ليلة-جوج في الصويرة ولا الوليدية.

قول ليا الأيام والحي والإيقاع — نضبط ليك.`,
    },
    relatedAction: {
      type: "whatsapp",
      label: { en: "Plan with Zaky on WhatsApp", fr: "Planifier avec Zaky sur WhatsApp", es: "Planificar con Zaky por WhatsApp" },
      link: WHATSAPP_URL,
    },
  },
  // ==================== STAY ====================
  {
    id: "riad-hotel",
    category: "logistics",
    keywords: [
      "riad", "hotel", "where to stay", "ou rester", "donde alojarse", "riad vs hotel",
      "riad or hotel", "accommodation", "hebergement", "alojamiento", "best area stay",
      "quel quartier", "que barrio", "near jemaa", "pres jemaa", "first trip stay",
      "فندق", "رياض", "فين نسكن", "أحسن حي", "riad door taxi",
    ],
    title: {
      en: "Riad or Hotel — Where to Stay",
      fr: "Riad ou Hôtel — Où dormir",
      es: "Riad u Hotel — Dónde Dormir",
      ar: "رياض ولا فندق — فين تسكن",
    },
    answer: {
      en: `**No universal winner — match your style:**

**Riad** (Medina courtyard house): atmosphere, architecture, walking access. Trade-offs: car can't reach the door (drop-off + short walk), stairs, courtyard sound, trickier first arrival. Save your pin + a nearby gate, keep the riad's contact handy.

**Hotel** (Gueliz/Hivernage): easy vehicles, lifts, big facilities, predictable pickup.

**Areas**: near Jemaa el-Fna = central + lively (can be noisy); northern Medina = atmospheric lanes; Kasbah = southern monuments; Gueliz = modern ease; Palmeraie = resort quiet, far from sights.

Property quality matters more than the label "riad" or "hotel".`,
      fr: `**Pas de vainqueur universel :**

**Riad** (maison à patio, Médina) : ambiance, architecture, accès à pied. Contraintes : voiture impossible jusqu'à la porte (dépose + marche), escaliers, sons du patio, première arrivée délicate. Enregistrez votre pin + une porte proche, gardez le contact du riad.

**Hôtel** (Guéliz/Hivernage) : véhicules faciles, ascenseurs, services, prise en charge prévisible.

**Quartiers** : près Jemaa el-Fna = central + animé (bruyant possible) ; Médina nord = ruelles d'ambiance ; Kasbah = monuments sud ; Guéliz = praticité ; Palmeraie = calme, loin.

La qualité de l'établissement compte plus que l'étiquette.`,
      es: `**Sin ganador universal:**

**Riad** (casa-patio en la Medina): ambiente y arquitectura. Contrapartidas: el coche no llega a la puerta, escaleras, sonidos del patio. Guarda tu pin y el contacto del riad.

**Hotel** (Guéliz/Hivernage): acceso fácil, ascensores, servicios.

**Zonas**: cerca de Jemaa el-Fna = céntrico y animado; norte = callejuelas; Kasbah = monumentos del sur; Guéliz = comodidad.`,
      ar: `**ما كاينش فائز عام:**

**الرياض** (دار بالصحن فالمدينة): الأجواء والمعمار. المقابل: الطوموبيل ما كتوصلش للباب (النزول + مشية)، الدروج، الصوت. حفظ الموقع ديالك وباب قريب ورقم الرياض.

**الفندق** (كليز): وصول سهل، مصاعد، خدمات.

**الأحياء**: حدا جامع الفنا = مركزي وعامر ؛ الشمال = أزقة ؛ القصبة = معالم الجنوب ؛ كليز = الراحة.`,
    },
  },
  // ==================== SHOPPING ====================
  {
    id: "shopping-rugs",
    category: "souk",
    keywords: [
      "rug", "rugs", "carpet", "tapis", "alfombra", "leather", "cuir", "cuero",
      "argan", "argan oil", "huile argan", "ceramics", "ceramique", "buy rug",
      "acheter tapis", "comprar alfombra", "authentic rug", "tapis authentique",
      "الزربية", "الزرابي", "الجلد", "الأركان", "السيراميك", "shipping rug",
    ],
    title: {
      en: "Buying Rugs, Leather & Argan — Without Regrets",
      fr: "Acheter tapis, cuir & argan — Sans regrets",
      es: "Comprar Alfombras, Cuero y Argán",
      ar: "شراء الزرابي والجلد والأركان — بلا ندامة",
    },
    answer: {
      en: `**For anything expensive, slow down:**

**Rugs**: never accept age/tribe/handmade claims without evidence. Ask material, origin, receipt with written details, return and shipping terms (who pays customs?). Compare several shops; buy because you love the piece, not from pressure.
**Leather**: check stitching, lining, hardware, finish. Quality varies hugely.
**Argan/cosmetics**: culinary vs cosmetic differ; check labels and producer info — never trust medical/purity claims from appearance.
**Fragile goods**: ask packaging, airline rules, shipping risk.

Tea and time in a shop create zero obligation to buy. *"Ghir kantferrej"* (just looking) is always fine.`,
      fr: `**Pour tout achat cher, ralentissez :**

**Tapis** : n'acceptez jamais âge/tribu/fait-main sans preuve. Exigez matière, origine, facture détaillée écrite, retours et livraison (qui paie la douane ?). Comparez ; achetez par coup de cœur, pas sous pression.
**Cuir** : vérifiez coutures, doublure, finition. Qualité très variable.
**Argan/cosmétiques** : culinaire vs cosmétique diffèrent ; vérifiez étiquettes et producteur — jamais de promesses médicales sur apparence.
**Fragile** : emballage, règles aériennes, risque transport.

Thé et temps passé ne créent aucune obligation. *« Ghir kantferrej »* suffit toujours.`,
      es: `**Para compras caras, despacio:**

**Alfombras**: nunca aceptes antigüedad/tribu/origen sin pruebas. Pide material, factura detallada, devoluciones y envío por escrito. Compara tiendas.
**Cuero**: revisa costuras y acabados.
**Argán**: culinario vs cosmético difieren; verifica etiquetas.

El té en la tienda no obliga a comprar.`,
      ar: `**للحوايج الغالية، بشوية:**

**الزرابي**: ما تقبلش القدم/القبيلة/اليدوية بلا دليل. طلب المادة، الأصل، الفاتورة مكتوبة، الإرجاع والشحن (شكون يخلص الديوانة؟). قارن بين الحوانت.
**الجلد**: شوف الخياطة والتشطيب.
**الأركان**: ديال الماكلة ماشي هو ديال التجميل ؛ شوف الملصقات.

أتاي الوقت فالحانوت ما كيلزموكش تشري. *"غير كنتفرج"* كافية ديما.`,
    },
  },
  // ==================== NAVIGATION & SAFETY ====================
  {
    id: "medina-navigation",
    category: "safety",
    keywords: [
      "lost", "perdu", "perdido", "getting lost", "je suis perdu", "estoy perdido",
      "road closed", "route fermee", "rue fermee", "shortcut", "raccourci",
      "unwanted guide", "guide non voulu", "follow me", "suis moi", "gps wrong",
      "gps inaccurate", "meeting point", "point de rencontre", "night medina",
      "medina night", "safe night", "return late", "rentrer tard",
      "تلفت", "تائه", "الطريق مسدودة", "الطريق مغلقة", "مساعدة", "ضعت",
    ],
    title: {
      en: "Lost in the Medina? Calm Protocol",
      fr: "Perdu dans la Médina ? Protocole calme",
      es: "¿Perdido en la Medina? Protocolo",
      ar: "تلفاتي في المدينة؟ بروتوكول هادئ",
    },
    answer: {
      en: `**Don't panic — Medina lanes confuse everyone at first.**

1. Stop in a shop or cafe, check your map + accommodation pin.
2. Call/message your riad — they guide guests daily.
3. **"Road closed" from a stranger?** Don't auto-follow. Check signage, ask a shopkeeper or your riad. If someone insists on guiding you, clarify payment BEFORE accepting.
4. **Unwanted companion?** *"La chokran, 3aref tri9"* (no thanks, I know the way).
5. **At night**: stick to busier routes, ask your riad for the recommended late route, arrange pickup when unsure. Quiet alleys = confusing, not necessarily dangerous — normal big-city awareness suffices.

Prevention: save your pin + nearest gate/landmark before going out; fix a group meeting point at a major landmark, never a tiny souk shop.`,
      fr: `**Pas de panique — les ruelles déroutent tout le monde au début.**

1. Entrez dans une boutique/café, vérifiez carte + pin de votre hébergement.
2. Appelez votre riad — ils guident des clients chaque jour.
3. **« Route fermée » par un inconnu ?** Ne suivez pas. Vérifiez panneaux, demandez à un commerçant ou votre riad. Si quelqu'un insiste pour vous guider, clarifiez le paiement AVANT.
4. **Compagnie non voulue ?** *« La chokran, 3aref tri9 »* (non merci, je connais le chemin).
5. **Le soir** : restez sur les axes animés, demandez à votre riad l'itinéraire tardif conseillé, organisez une prise en charge si doute.

Prévention : pin + porte/repère proche avant de sortir ; point de rendez-vous à un repère majeur, jamais une petite boutique.`,
      es: `**Sin pánico — las callejuelas confunden a todos.**

1. Entra en una tienda/café, revisa tu mapa y pin.
2. Llama a tu riad.
3. **¿"Calle cerrada" de un desconocido?** No sigas. Verifica y pregunta. Aclara el pago ANTES de aceptar ayuda.
4. **¿Compañía no deseada?** *"La chokran, 3aref tri9"*.
5. **De noche**: rutas concurridas, pregunta a tu riad, organiza recogida si dudas.`,
      ar: `**بلا هلع — الأزقة كتلف الجميع فالأول.**

1. دخل لحانوت ولا قهوة، شوف الخريطة وموقع الرياض.
2. عيط للرياض ديالك — كيرشدو الضيوف كل نهار.
3. **"الطريق مسدودة" من غريب؟** ما تبعوش. تحقق واسول حانوتي ولا الرياض. إلا أصر يرشدك، وضح الثمن *قبل*.
4. **رفقة ما بغيتيهاش؟** *"لا شكرا، عارف الطريق."*
5. **بالليل**: الطرق العامرة، سول الرياض على الطريق المنصوحة، نظم التوصيل إلا شكيتي.

الوقاية: حفظ الموقع + أقرب باب قبل الخروج ؛ نقطة اللقاء عند معلمة كبيرة.`,
    },
  },
  // ==================== TRANSPORT ====================
  {
    id: "airport-rail",
    category: "logistics",
    keywords: [
      "airport", "aeroport", "aeropuerto", "menara airport", "arriving", "atterrissage",
      "train", "oncf", "gare", "train station", "estacion tren", "marrakech train",
      "train to essaouira", "train to casa", "bus station", "gare routiere",
      "coach to essaouira", "supratours", "ctm", "المطار", "القطار", "محطة القطار", "الكيران",
    ],
    title: {
      en: "Airport, Trains & Coaches — Verified Facts Only",
      fr: "Aéroport, Trains & Cars — Faits vérifiés uniquement",
      es: "Aeropuerto, Trenes y Buses — Solo Datos Verificados",
      ar: "المطار والقطارات والحافلات — معلومات مؤكدة فقط",
    },
    answer: {
      en: `**Arrival**: Marrakech-Menara airport. Confirm your transfer BEFORE landing when possible; deep-Medina riads end with a vehicle drop-off + short walk — get your riad's exact instructions and keep their contact handy. Never trust an old online taxi fare — confirm current tariff locally.

**Trains (ONCF)**: useful toward connected cities — always use live ONCF times, classes and prices.
**No train to Essaouira or Oualidia.** Don't let anyone sell you a "direct train" there — check current coach/private-transfer/road options instead.
**Coaches**: the normal solution for non-rail destinations; use live operator timetables, never cached schedules.`,
      fr: `**Arrivée** : aéroport Marrakech-Ménara. Confirmez votre transfert AVANT d'atterrir si possible ; les riads en pleine Médina finissent par une dépose + courte marche — obtenez les instructions exactes du riad et gardez son contact. Ne croyez jamais un vieux tarif en ligne — confirmez le tarif actuel sur place.

**Trains (ONCF)** : utiles vers les villes connectées — horaires, classes et prix toujours en direct ONCF.
**Pas de train pour Essaouira ni Oualidia.** Vérifiez cars/transfert privé/route actuels.
**Cars** : solution normale hors rail ; horaires opérateurs en direct uniquement.`,
      es: `**Llegada**: aeropuerto Marrakech-Menara. Confirma tu traslado ANTES de aterrizar; los riads en la Medina terminan con bajada + caminata — pide instrucciones exactas y guarda el contacto.

**Trenes (ONCF)**: útiles a ciudades conectadas — horarios y precios en vivo.
**Sin tren a Essaouira ni Oualidia.** Verifica buses/traslados actuales.`,
      ar: `**الوصول**: مطار مراكش المنارة. أكد التوصيل *قبل* الهبوط ؛ الرياضات فالمدينة كتسالي بالنزول + مشية — خد تعليمات الرياض بالضبط وحافظ على رقمه. ما تثيقش فأثمنة قديمة — أكد التعريفة الحالية.

**القطارات**: مفيدة للمدن المرتبطة — الأوقات والأثمنة مباشرة.
**ما كاينش القطار للصويرة ولا الوليدية.** تحقق من الكيران والنقل الحالي.`,
    },
  },
  // ==================== CULTURE ====================
  {
    id: "ramadan-culture",
    category: "culture",
    keywords: [
      "ramadan", "ramadan marrakech", "ramadan hours", "horaires ramadan",
      "ramadan schedule", "photography", "photo permission", "can i photograph",
      "prendre photo", "modest dress", "tenue", "mosquee access", "mosque enter",
      "religious", "religieux", "dress code mosque", "رمضان", "التصوير", "اللباس", "الاحترام",
    ],
    title: {
      en: "Ramadan, Photos & Respect — Culture Notes",
      fr: "Ramadan, Photos & Respect — Notes culturelles",
      es: "Ramadán, Fotos y Respeto — Notas Culturales",
      ar: "رمضان والصور والاحترام — ملاحظات ثقافية",
    },
    answer: {
      en: `**Morocco is Muslim-majority — small gestures matter.**

**Ramadan**: daily rhythms and business hours shift; evenings get especially lively. Exact dates and yearly schedules vary — always verify for your dates, never rely on old calendars.
**Photos**: ask before close portraits (artisans, performers, residents); respect no-photo signs; no intrusive shots during prayer or private moments; clarify paid-photo expectations first.
**Dress**: modest, comfortable clothing is the respectful default, especially in traditional/religious areas. Mosque interiors are often off-limits to non-Muslim visitors — check each site.
**Greeting**: a polite *"Salam 3likom"* opens many doors.`,
      fr: `**Le Maroc est majoritairement musulman — les petits gestes comptent.**

**Ramadan** : rythmes et horaires décalés ; soirées très animées. Dates et horaires annuels variables — vérifiez toujours pour vos dates.
**Photos** : demandez avant tout portrait rapproché ; respectez les interdictions ; pas de photos intrusives pendant la prière ; clarifiez les photos payantes d'abord.
**Tenue** : sobre et confortable par défaut, surtout lieux traditionnels/religieux. Intérieurs de mosquées souvent réservés aux fidèles — vérifiez par site.
**Bonjour** : un poli *« Salam 3likom »* ouvre bien des portes.`,
      es: `**Marruecos es de mayoría musulmana.**

**Ramadán**: ritmos y horarios cambian; verifica fechas y horarios de tu año.
**Fotos**: pregunta antes de retratos cercanos; respeta prohibiciones y la oración.
**Vestimenta**: sobria y cómoda por defecto. Interiores de mezquitas a menudo reservados.
**Saludo**: *"Salam 3likom"* abre muchas puertas.`,
      ar: `**المغرب بلد مسلم — التفاصيل الصغيرة مهمة.**

**رمضان**: الإيقاع والأوقات كتتبدل ؛ الأمسيات عامرة. التواريخ كتختلف — تحقق للتواريخ ديالك.
**الصور**: سول قبل صور الوجوه عن قرب ؛ احترم المنع ؛ بلا صور متطفلة وقت الصلاة ؛ وضح الثمن أولا.
**اللباس**: محتشم ومريح كقاعدة، خصوصا الأماكن التقليدية. دواخل المساجد غالبا للمصلين.
**التحية**: *"السلام عليكم"* كتحل بزاف ديال البيبان.`,
    },
  },
  // ==================== HISTORY ====================
  {
    id: "history-context",
    category: "culture",
    keywords: [
      "history marrakech", "histoire marrakech", "historia marrakech", "dynasty",
      "dynastie", "almoravid", "almohad", "saadian", "saadien", "alaouite",
      "almoravide", "almohade", "founded marrakech", "fondation marrakech",
      "riad meaning", "zellige", "tadelakt", "madrasa meaning", "fondouk",
      "تاريخ مراكش", "الدول", "المرابطون", "الموحدون", "السعديون", "الزليج", "الرياض",
    ],
    title: {
      en: "Marrakech in Layers — History & Words",
      fr: "Marrakech en couches — Histoire & mots",
      es: "Marrakech por Capas — Historia y Palabras",
      ar: "مراكش عبر الطبقات — التاريخ والكلمات",
    },
    answer: {
      en: `**The Medina is not one period — it's layers:**

Founded 11th century (Almoravids), then: **Almohads** (Koutoubia) → **Saadians** (El Badi, Tombs — golden age) → Alaouite development → modern city outside the walls.

**Words you'll meet**: *Riad* (courtyard house, now often a guesthouse) · *Dar* (house) · *Zellige* (cut-tile mosaic) · *Tadelakt* (polished lime plaster) · *Medersa* (historic school) · *Kasbah* (fortified/royal district) · *Mellah* (historic Jewish quarter) · *Souk* (market lanes) · *Bab* (gate) · *Fondouk* (old merchant inn).

Link each monument to its era and the stones start talking.`,
      fr: `**La Médina n'est pas une époque — ce sont des couches :**

Fondation XIe siècle (Almoravides), puis : **Almohades** (Koutoubia) → **Saadiens** (El Badi, Tombeaux — âge d'or) → développement alaouite → ville moderne hors les murs.

**Mots rencontrés** : *Riad* (maison à patio, souvent maison d'hôtes) · *Dar* (maison) · *Zellige* (mosaïque) · *Tadelakt* (enduit de chaux poli) · *Médersa* (école historique) · *Kasbah* (quartier fortifié/royal) · *Mellah* (ancien quartier juif) · *Souk* (ruelles marchandes) · *Bab* (porte) · *Fondouk* (ancien caravansérail).

Reliez chaque monument à son ère et les pierres parlent.`,
      es: `**La Medina no es una época — son capas:**

Siglo XI (almorávides): **almohades** (Kutubía) → **saadíes** (El Badi, Tumbas) → desarrollo alauí → ciudad moderna.

**Palabras**: *Riad* (casa-patio) · *Zellige* (mosaico) · *Madrasa* (escuela histórica) · *Kasbah* · *Mellah* (barrio judío) · *Souk* · *Bab* (puerta).`,
      ar: `**المدينة ماشي حقبة وحدة — هي طبقات:**

القرن 11 (المرابطون)، ثم: **الموحدون** (الكتبية) ← **السعديون** (البديع، القبور — العصر الذهبي) ← العلويون ← المدينة الحديثة.

**كلمات غادي تلاقيها**: *رياض* (دار بالصحن) · *زليج* · *تادلاكت* · *مدرسة* · *قصبة* · *ملاح* (الحي اليهودي) · *سوق* · *باب* · *فندق* (خان التجار قديما).

اربط كل معلمة بالعصر ديالها والحجارة غادي تهضر.`,
    },
  },
  // ==================== WEATHER / PACKING ====================
  {
    id: "weather-packing",
    category: "logistics",
    keywords: [
      "weather", "meteo", "clima", "temperature", "hot", "cold", "summer marrakech",
      "winter marrakech", "best month", "when to visit", "packing", "what to pack",
      "que mettre", "que llevar", "heat", "chaleur", "calor", "snow atlas",
      "neige atlas", "is marrakech cold", "does it rain",
      "الطقس", "الحرارة", "البرد", "أحسن وقت", "فصل", "شنو نلبس",
    ],
    title: {
      en: "Weather, Seasons & Packing — No Guesses",
      fr: "Météo, Saisons & Bagages — Sans devinettes",
      es: "Clima, Estaciones y Equipaje",
      ar: "الطقس والفصول والأمتعة — بلا تخمين",
    },
    answer: {
      en: `**Climate character**: hot summers, mild-to-cool winters, strong sun, sharp day/night gaps. I never answer "what will the weather be" from averages — check live weather before you pack or plan.

**Design by season**: heat → early starts, shaded midday (museum/riad rest), water, slow pace. Cool season → layers, warm evenings; Atlas trips can be FAR colder than the city (snow possible) — never assume mountain = city.

**Pack**: comfortable shoes, breathable clothes + light layer, sun hat, sunscreen, refillable bottle, modest layer/scarf for traditional contexts, secure day bag.`,
      fr: `**Caractère climatique** : étés chauds, hivers doux à frais, soleil fort, écarts jour/nuit marqués. Je ne réponds jamais « quelle météo » sur des moyennes — vérifiez la météo en direct avant valise et programme.

**Par saison** : chaleur → départs tôt, pause ombragée à midi (musée/riad), eau, rythme lent. Saison fraîche → couches, soirées fraîches ; l'Atlas peut être BIEN plus froid que la ville (neige possible).

**Valise** : chaussures confortables, vêtements respirants + couche légère, chapeau, crème solaire, gourde, tenue sobre pour contextes traditionnels, petit sac sécurisé.`,
      es: `**Clima**: veranos calurosos, inviernos suaves a frescos, sol fuerte. Nunca respondo "qué tiempo hará" con promedios — consulta el clima en vivo.

**Por temporada**: calor → salidas temprano, pausa sombreada al mediodía, agua, ritmo lento. Frío → capas; el Atlas puede ser MUCHO más frío (nieve posible).

**Maleta**: calzado cómodo, ropa transpirable, gorra, protector solar, cantimplora, capa modesta.`,
      ar: `**الطابع المناخي**: صيف سخون، شتاء معتدل إلى بارد، شمس قوية، فرق كبير بين النهار والليل. ما نجاوبش "كيفاش غادي يكون الطقس" بالمعدلات — شوف الطقس المباشر.

**حسب الفصل**: السخونية ← بداية بكري، راحة الظل فالقايلة، الماء، إيقاع مهل. البرد ← طبقات ؛ الأطلس قدر يكون أبرد *بزاف* من المدينة (الثلج ممكن).

**الباكاج**: صباط مريح، حوايج خفيفة + طبقة، قبعة، واقي الشمس، قرعة الماء، لباس محتشم.`,
    },
  },
];
