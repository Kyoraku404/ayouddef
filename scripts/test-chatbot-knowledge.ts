import { findBestMarrakechAnswer, marrakechKnowledge } from "../lib/marrakech-knowledge";

function runTests() {
  console.log("=== Testing Marrakech Local Chatbot Knowledge Engine ===");
  console.log(`Loaded ${marrakechKnowledge.length} knowledge topics.\n`);

  const testQueries = [
    // English queries
    { q: "What are the top sights to visit?", lang: "en" as const },
    { q: "Tell me about Ben Youssef Madrasa hours and tickets", lang: "en" as const },
    { q: "Where can I eat authentic Tanjia Marrakchia?", lang: "en" as const },
    { q: "How do I negotiate and haggle in the souks?", lang: "en" as const },
    { q: "Are street foods and tap water safe?", lang: "en" as const },
    { q: "What scams should I avoid in the Medina?", lang: "en" as const },
    { q: "How much are taxis from airport to Medina?", lang: "en" as const },
    { q: "What should women and men wear in Marrakech?", lang: "en" as const },
    { q: "What are Zaky's private tour prices?", lang: "en" as const },
    { q: "How does the traditional Moroccan hammam work?", lang: "en" as const },
    { q: "What are the best day trips and excursions to Agafay or Ourika?", lang: "en" as const },
    { q: "What is the best time of year to visit Marrakech weather wise?", lang: "en" as const },
    { q: "How much should I tip drivers and restaurants?", lang: "en" as const },
    // Conversational queries EN
    { q: "hi", lang: "en" as const },
    { q: "hello!", lang: "en" as const },
    { q: "hey there", lang: "en" as const },
    { q: "how are you?", lang: "en" as const },
    { q: "who are you", lang: "en" as const },
    { q: "who is zaky", lang: "en" as const },
    { q: "thank you so much", lang: "en" as const },
    { q: "bye bye", lang: "en" as const },
    { q: "help", lang: "en" as const },

    // French queries
    { q: "Quels sont les monuments incontournables ?", lang: "fr" as const },
    { q: "Comment réserver le Jardin Majorelle ?", lang: "fr" as const },
    { q: "C'est quoi la Tanjia de Marrakech ?", lang: "fr" as const },
    { q: "Comment marchander dans les souks ?", lang: "fr" as const },
    { q: "Quelles sont les arnaques à éviter dans la Médina ?", lang: "fr" as const },
    { q: "Combien coûte le taxi à Marrakech ?", lang: "fr" as const },
    { q: "Comment s'habiller pour respecter les coutumes ?", lang: "fr" as const },
    { q: "Quels sont les tarifs des visites privées avec Zaky ?", lang: "fr" as const },
    { q: "Comment se passe un hammam traditionnel au savon noir ?", lang: "fr" as const },
    { q: "Quelles excursions faire dans le désert d'Agafay ou Ourika ?", lang: "fr" as const },
    { q: "Quelle est la meilleure période et météo pour visiter Marrakech ?", lang: "fr" as const },
    { q: "Quel est le montant du pourboire habituel au Maroc ?", lang: "fr" as const },
    // Conversational queries FR
    { q: "bonjour", lang: "fr" as const },
    { q: "salut zaky", lang: "fr" as const },
    { q: "comment ca va ?", lang: "fr" as const },
    { q: "qui es tu ?", lang: "fr" as const },
    { q: "c'est qui zaky ?", lang: "fr" as const },
    { q: "merci beaucoup", lang: "fr" as const },
    { q: "au revoir", lang: "fr" as const },
    { q: "aidez moi svp", lang: "fr" as const },

    // Spanish queries
    { q: "¿Qué lugares imprescindibles hay para ver?", lang: "es" as const },
    { q: "¿Cómo se debe regatear en los zocos?", lang: "es" as const },
    { q: "¿Qué es la Tanjia Marrakchia y dónde comerla?", lang: "es" as const },
    { q: "¿Qué ropa se recomienda vestir en la Medina?", lang: "es" as const },
    { q: "¿Cuáles son los precios de los tours de Zaky?", lang: "es" as const },
    { q: "¿Cómo es la experiencia de un hammam marroquí tradicional?", lang: "es" as const },
    { q: "¿Qué excursiones de un día hacer a Agafay o Essaouira?", lang: "es" as const },
    { q: "¿Cuándo es la mejor época y clima para ir a Marrakech?", lang: "es" as const },
    { q: "¿Cuánto se suele dejar de propina en Marruecos?", lang: "es" as const },
    // Conversational queries ES
    { q: "hola", lang: "es" as const },
    { q: "buenas tardes", lang: "es" as const },
    { q: "¿cómo estás?", lang: "es" as const },
    { q: "¿quién eres?", lang: "es" as const },
    { q: "¿quién es zaky?", lang: "es" as const },
    { q: "muchas gracias", lang: "es" as const },
    { q: "adiós", lang: "es" as const },
    { q: "ayuda", lang: "es" as const },
  ];

  let passed = 0;
  for (const { q, lang } of testQueries) {
    const match = findBestMarrakechAnswer(q, lang);
    if (match) {
      passed++;
      console.log(`[PASS] (${lang.toUpperCase()}) "${q}"`);
      console.log(`       -> Matched topic: "${match.topic.id}" (Score: ${match.score})`);
      console.log(`       -> Title: ${match.topic.title[lang]}`);
    } else {
      console.log(`[FAIL] (${lang.toUpperCase()}) "${q}" -> No match found!`);
    }
  }

  console.log(`\nResults: ${passed} / ${testQueries.length} passed.`);
  if (passed === testQueries.length) {
    console.log("🎉 ALL KNOWLEDGE ENGINE TESTS PASSED PERFECTLY!");
  } else {
    process.exit(1);
  }
}

runTests();
