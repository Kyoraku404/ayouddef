"use client";

import React from "react";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { siteConfig, isPlaceholderWhatsApp } from "@/lib/config";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function ContactSection() {
  const isDev = process.env.NODE_ENV !== "production";
  const whatsAppPlaceholder = isPlaceholderWhatsApp(siteConfig.urls.whatsappNumber);
  const showInstagram = Boolean(siteConfig.urls.instagram) || isDev;

  return (
    <section id="contact" className="py-20 md:py-28 bg-cream relative border-t border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-terracotta font-semibold mb-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brown font-normal leading-tight">
            Connect with <span className="text-terracotta italic font-serif">Zaky</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
            Have questions before requesting a tour, or need travel guidance for your stay in Marrakesh? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Location */}
          <div className="p-6 rounded-2xl bg-sand-soft/60 border border-sand text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-cream text-terracotta flex items-center justify-center mb-4 shadow-2xs">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-brown">Location</h3>
            <p className="text-sm text-ink/80 mt-1">Marrakesh, Morocco</p>
            <span className="text-xs text-gold font-medium mt-2">Medina & Historic Quarters</span>
          </div>

          {/* WhatsApp Direct */}
          <div className="p-6 rounded-2xl bg-sand-soft/60 border border-sand text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-cream text-[#25D366] flex items-center justify-center mb-4 shadow-2xs">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-brown">WhatsApp</h3>
            <p className="text-sm text-ink/80 mt-1">Direct Chat with Zaky</p>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
            >
              <span>{whatsAppPlaceholder ? "Open WhatsApp (Configurable)" : "Chat on WhatsApp"}</span>
            </a>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-sand-soft/60 border border-sand text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-cream text-terracotta flex items-center justify-center mb-4 shadow-2xs">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-brown">Email</h3>
            <p className="text-sm text-ink/80 mt-1">Personal Inquiries</p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:underline"
            >
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>

        {/* Optional Instagram */}
        {showInstagram && (
          <div className="mt-8 text-center">
            <a
              href={siteConfig.urls.instagram || "#"}
              target={siteConfig.urls.instagram ? "_blank" : undefined}
              rel={siteConfig.urls.instagram ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sand-soft hover:bg-sand text-brown text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-terracotta" />
              <span>{siteConfig.urls.instagram ? "Follow on Instagram" : "Instagram (Configurable via ENV)"}</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
