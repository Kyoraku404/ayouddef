"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Compass,
  Utensils,
  ShoppingBag,
  Car,
  HelpCircle,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Mountain,
  Sun,
} from "lucide-react";
import { useLanguage } from "@/components/common/LanguageProvider";
import { useCurrency } from "@/components/common/CurrencyProvider";
import { marrakechKnowledge, findBestMarrakechAnswer, KnowledgeTopic } from "@/lib/marrakech-knowledge";
import { trackWhatsAppClick } from "@/lib/analytics-client";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  topic?: KnowledgeTopic;
  timestamp: string;
}

export function MarrakechChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();

  // Welcome greetings based on current language
  const welcomeText = {
    en: "Marhaba! Welcome to Marrakech. I'm Zaky's Virtual Concierge. How can I help you discover the Medina, authentic food, hidden sights, or private tours today?",
    fr: "Marhaba ! Bienvenue à Marrakech. Je suis le Concierge Virtuel de Zaky. Comment puis-je vous aider pour vos visites, la gastronomie, les souks ou nos circuits privés ?",
    es: "¡Marhaba! Bienvenido a Marrakech. Soy el Asistente Virtual de Zaky. ¿En qué puedo ayudarte hoy para descubrir la Medina, gastronomía, zocos o tours privados?",
  };

  const bubbleTeaser = {
    en: "Visiting Marrakech? Ask me anything about the city & tours! ✨",
    fr: "Vous visitez Marrakech ? Posez vos questions sur la ville & les visites ! ✨",
    es: "¿Visitas Marrakech? ¡Pregúntame sobre la ciudad y los tours! ✨",
  };

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-msg",
          sender: "bot",
          text: welcomeText[language] || welcomeText.fr,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [language]);

  // Trigger floating speech bubble teaser after 3.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const quickPrompts = [
    {
      id: "top-sights",
      label: { en: "Must-See Sights", fr: "Monuments Incontournables", es: "Sitios Imprescindibles" },
      icon: Compass,
      query: { en: "What are the top sights to visit in Marrakech?", fr: "Quels sont les incontournables à voir ?", es: "¿Qué lugares imprescindibles visitar?" },
    },
    {
      id: "tanjia-marrakchia",
      label: { en: "Tanjia & Food", fr: "Tanjia & Gastronomie", es: "Tanjia y Gastronomía" },
      icon: Utensils,
      query: { en: "Tell me about authentic Tanjia Marrakchia and food safety", fr: "Parle-moi de la Tanjia et où bien manger", es: "Háblame de la Tanjia y dónde comer auténtico" },
    },
    {
      id: "haggling-souks",
      label: { en: "Souk Haggling", fr: "Négocier dans les Souks", es: "Regatear en los Zocos" },
      icon: ShoppingBag,
      query: { en: "How should I haggle and bargain in the souks?", fr: "Comment négocier dans les souks de Marrakech ?", es: "¿Cómo se debe regatear en los zocos?" },
    },
    {
      id: "taxis-transport",
      label: { en: "Taxis & Airport", fr: "Taxis & Aéroport", es: "Taxis y Aeropuerto" },
      icon: Car,
      query: { en: "What are taxi prices and airport transfer tips?", fr: "Quels sont les tarifs des taxis et transferts aéroport ?", es: "¿Cuáles son los precios de los taxis y traslados?" },
    },
    {
      id: "hammam-spa",
      label: { en: "Hammam & Spa", fr: "Hammam & Spa", es: "Hammam y Spa" },
      icon: Sun,
      query: { en: "How does the traditional Moroccan hammam work?", fr: "Comment se déroule le rituel du hammam traditionnel ?", es: "¿Cómo funciona el ritual del hammam marroquí?" },
    },
    {
      id: "day-trips-excursions",
      label: { en: "Day Trips & Agafay", fr: "Excursions & Désert", es: "Excursiones y Desierto" },
      icon: Mountain,
      query: { en: "What are the best day trips and excursions from Marrakech?", fr: "Quelles sont les meilleures excursions d'une journée ?", es: "¿Cuáles son las mejores excursiones desde Marrakech?" },
    },
    {
      id: "zaky-tours",
      label: { en: "Zaky's Private Tours", fr: "Visites Privées Zaky", es: "Tours Privados de Zaky" },
      icon: Sparkles,
      query: { en: "What private tour packages does Zaky offer?", fr: "Quels sont les circuits privés proposés par Zaky ?", es: "¿Qué tours privados ofrece Zaky?" },
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const match = findBestMarrakechAnswer(text, language);

      let botResponseText = "";
      let matchedTopic: KnowledgeTopic | undefined = undefined;

      if (match) {
        matchedTopic = match.topic;
        botResponseText = match.topic.answer[language] || match.topic.answer.en;
      } else {
        // Fallback intelligent response with WhatsApp coordination and suggestions
        botResponseText =
          language === "fr"
            ? `C'est une excellente question sur Marrakech ! Pour vous donner une réponse sur-mesure, vous pouvez aussi contacter **Zaky directement sur WhatsApp** (+212 6 61 17 63 69).\n\nVous pouvez également me poser des questions sur les **monuments incontournables**, la **vraie Tanjia**, comment **négocier dans les souks**, les **tarifs de taxi & aéroport**, le **code vestimentaire**, ou nos **visites privées** !`
            : language === "es"
            ? `¡Es una excelente pregunta sobre Marrakech! Para una recomendación personalizada para tu viaje, puedes escribirle directamente a **Zaky por WhatsApp** (+212 6 61 17 63 69).\n\nTambién puedes preguntarme sobre los **monumentos imprescindibles**, la **comida típica (Tanjia)**, cómo **regatear en los zocos**, **precios de taxi**, o nuestros **tours privados**.`
            : `That's a great question about Marrakech! For personalized advice, you can chat with **licensed guide Zaky directly on WhatsApp** (+212 6 61 17 63 69).\n\nYou can also ask me about **must-see sights**, authentic **Tanjia food**, **souk bargaining tips**, **taxi & airport prices**, **dress code**, or **Zaky's private tours**!`;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponseText,
        topic: matchedTopic,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-msg-reset",
        sender: "bot",
        text: welcomeText[language] || welcomeText.fr,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const whatsappDirectUrl = "https://wa.me/212661176369?text=Hello%20Zaky%2C%20I%20am%20visiting%20Marrakech%20and%20would%20like%20to%20ask%20you%20some%20questions%20about%20your%20tours.";

  return (
    <>
      {/* Floating Launcher Button with Subtle Ripple */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
        {/* Floating Greeting Speech Bubble */}
        {!isOpen && showGreeting && (
          <div className="relative hidden sm:flex items-center gap-2.5 bg-cream text-brown px-4 py-2.5 rounded-2xl shadow-xl border border-sand/80 text-xs font-medium max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300">
            <span className="text-base">👋</span>
            <p className="leading-snug">{bubbleTeaser[language]}</p>
            <button
              onClick={() => setShowGreeting(false)}
              className="text-brown/40 hover:text-brown ml-1 cursor-pointer"
              aria-label="Dismiss greeting"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute -right-2 bottom-3.5 w-3 h-3 bg-cream border-r border-b border-sand/80 rotate-[-45deg]" />
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowGreeting(false);
          }}
          className={`relative group flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-brown text-cream hover:bg-ink scale-95"
              : "bg-gradient-to-r from-terracotta to-terracotta-dark text-white hover:scale-105 active:scale-95"
          }`}
          aria-label={isOpen ? "Close Marrakech Concierge" : "Open Marrakech Concierge"}
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Close</span>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold tracking-wide uppercase leading-tight">Marrakech Guide</span>
                <span className="text-[10px] text-cream/80 font-normal leading-tight">Ask Zaky AI</span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-24 z-50 w-auto sm:w-[420px] max-h-[85vh] h-[600px] flex flex-col bg-cream rounded-3xl shadow-2xl border border-sand/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header Bar */}
          <div className="p-4 bg-gradient-to-r from-brown via-brown-soft to-brown text-cream flex items-center justify-between border-b border-sand/20">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full border-2 border-gold/60 overflow-hidden bg-sand-soft flex-shrink-0">
                <Image
                  src="/images/zaky-riad.jpg"
                  alt="Zaky Marrakesh Guide"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-semibold text-cream leading-snug flex items-center gap-1.5">
                  <span>Zaky Virtual Concierge</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" title="Online" />
                </h3>
                <p className="text-[11px] text-sand-soft/80 flex items-center gap-1">
                  <span>Licensed Guide #2007 • Marrakech</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-full text-sand-soft/70 hover:text-cream hover:bg-white/10 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-sand-soft/70 hover:text-cream hover:bg-white/10 transition-colors"
                title="Minimize"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Category Chips */}
          <div className="p-2.5 bg-sand-soft/60 border-b border-sand flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp) => {
              const Icon = qp.icon;
              return (
                <button
                  key={qp.id}
                  type="button"
                  onClick={() => handleSendMessage(qp.query[language] || qp.query.en)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cream border border-sand text-brown hover:bg-terracotta hover:text-white hover:border-terracotta transition-all whitespace-nowrap cursor-pointer flex-shrink-0 shadow-xs"
                >
                  <Icon className="w-3 h-3 text-terracotta group-hover:text-white" />
                  <span>{qp.label[language] || qp.label.en}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-cream via-sand-soft/30 to-cream">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-terracotta text-white rounded-tr-xs"
                      : "bg-white text-ink border border-sand/70 rounded-tl-xs"
                  }`}
                >
                  {/* Message formatted with markdown-style line breaks and bold */}
                  <div className="whitespace-pre-line space-y-2">
                    {msg.text.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Optional Action Button embedded in Bot response */}
                  {msg.topic?.relatedAction && (
                    <div className="mt-3 pt-2.5 border-t border-sand/40">
                      <Link
                        href={msg.topic.relatedAction.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-soft hover:bg-sand text-brown font-semibold text-xs transition-colors"
                      >
                        <span>{msg.topic.relatedAction.label[language] || msg.topic.relatedAction.label.en}</span>
                        <ExternalLink className="w-3 h-3 text-terracotta" />
                      </Link>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-ink/40 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-sand/70 w-20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-terracotta animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-terracotta animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-terracotta animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Direct WhatsApp Assistance Bar */}
          <div className="px-3.5 py-2 bg-sand-soft/80 border-t border-sand flex items-center justify-between text-[11px]">
            <span className="text-brown/70 font-medium">Need personal coordination?</span>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppClick("chatbot_direct_footer", whatsappDirectUrl, e)}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 transition-colors"
            >
              <span>WhatsApp Zaky</span>
              <span>→</span>
            </a>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-cream border-t border-sand flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                language === "fr"
                  ? "Posez votre question sur Marrakech..."
                  : language === "es"
                  ? "Pregunta sobre Marrakech..."
                  : "Ask anything about Marrakech..."
              }
              className="flex-grow px-3.5 py-2.5 rounded-full bg-sand-soft text-xs sm:text-sm text-ink border border-sand focus:outline-none focus:border-terracotta transition-colors placeholder:text-ink/40"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 rounded-full bg-terracotta text-white hover:bg-terracotta-dark disabled:opacity-40 transition-all cursor-pointer flex-shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
