"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { getWhatsAppReservationUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, sendAnalyticsEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/components/common/LanguageProvider";

const FALLBACK_TOUR_OPTIONS = [
  "Marrakesh Medina, Souks & Heritage Experience",
  "Marrakesh Souks & Local Markets Experience",
  "Marrakesh Historical & Cultural Heritage Tour",
  "Marrakesh By Night, Medina & Nightlife Experience",
  "Marrakesh Private Signature Experience — 7 Days",
  "Marrakesh & Oualidia Private Coastal Escape — 5 Days",
  "Customized Private Tours",
  "General Inquiry / Custom Itinerary",
];

interface LiveTourOption {
  slug: string;
  title: string;
  price?: string;
}

function resolveTourTitle(value: string | undefined, live: LiveTourOption[]): string | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  if (!v) return null;
  // Match by slug first, then by exact/partial title.
  const bySlug = live.find((t) => t.slug.toLowerCase() === v);
  if (bySlug) return bySlug.title;
  const byTitle = live.find((t) => t.title.toLowerCase() === v);
  if (byTitle) return byTitle.title;
  const partial = live.find(
    (t) => t.title.toLowerCase().includes(v) || v.includes(t.title.toLowerCase())
  );
  if (partial) return partial.title;
  const fallback = FALLBACK_TOUR_OPTIONS.find((t) => t.toLowerCase() === v);
  if (fallback) return fallback;
  // Accept raw value when it looks like a real title (e.g. deep link before tours load).
  if (value.trim().length >= 4) return value.trim();
  return null;
}

interface ReservationSectionProps {
  selectedTour?: string;
}

export function ReservationSection({ selectedTour }: ReservationSectionProps) {
  const { t } = useLanguage();
  const [liveTours, setLiveTours] = useState<LiveTourOption[]>([]);
  const [toursLoaded, setToursLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    people: 2,
    tour: selectedTour || FALLBACK_TOUR_OPTIONS[0],
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load live pack titles/prices so admin price edits are reflected here.
  React.useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.tours)) {
          setToursLoaded(true);
          setLiveTours(
            data.tours.map((tour: { slug: string; title: string; price?: string }) => ({
              slug: tour.slug,
              title: tour.title,
              price: tour.price,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const tourOptions =
    toursLoaded
      ? [...liveTours.map((tour) => tour.title), "General Inquiry / Custom Itinerary"]
      : FALLBACK_TOUR_OPTIONS;

  // Sync selectedTour prop (slug or title) if updated.
  React.useEffect(() => {
    if (selectedTour) {
      const resolved = resolveTourTitle(selectedTour, liveTours) || selectedTour;
      setFormData((prev) => (prev.tour === resolved ? prev : { ...prev, tour: resolved }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTour, liveTours.length]);

  // Deep-link support: /?tour=<slug-or-title>#reservation preselects the pack.
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tourParam = params.get("tour");
      if (tourParam) {
        const resolved =
          resolveTourTitle(decodeURIComponent(tourParam), liveTours) ||
          decodeURIComponent(tourParam);
        setFormData((prev) => (prev.tour === resolved ? prev : { ...prev, tour: resolved }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveTours.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "people" ? parseInt(value, 10) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "An error occurred. Please try again or message via WhatsApp.");
        setLoading(false);
        return;
      }

      void sendAnalyticsEvent("WHATSAPP_CLICK", window.location.pathname, { source: "reservation_submit" });
      window.location.assign(getWhatsAppReservationUrl(formData));
    } catch {
      setErrorMsg("Network error. Please try again or reach out on WhatsApp.");
      setLoading(false);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container-custom res-grid">
        {/* Left Column: Info & Contact List */}
        <div className="res-info">
          <span className="eyebrow">{t.reservation.eyebrow}</span>
          <h2>{t.reservation.title}</h2>
          <p>{t.reservation.subtitle}</p>

          <div className="contact-list" id="contact">
            <a
              href="https://wa.me/212661176369"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => trackWhatsAppClick("reservation_contact_list", "https://wa.me/212661176369", e)}
            >
              <span className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20l1.4-4A8 8 0 1 1 9 19.5L4 20z" />
                  <path d="M9 10c0 3 2 5 5 5" />
                </svg>
              </span>
              <span>WhatsApp: +212 6 61 17 63 69</span>
            </a>

            <a href="mailto:hello@marrakeshitourguide.com">
              <span className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span>hello@marrakeshitourguide.com</span>
            </a>

            <a href="#">
              <span className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              </span>
              <span>Medina, Marrakesh, Morocco</span>
            </a>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div>
            <form className="form-card" id="resForm" onSubmit={handleSubmit} noValidate>
              <div className="form-row two">
                <div className="field">
                  <label htmlFor="fullName">{t.reservation.nameLabel}</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder={t.reservation.namePlaceholder}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">{t.reservation.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder={t.reservation.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row two">
                <div className="field">
                  <label htmlFor="phone">{t.reservation.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder={t.reservation.phonePlaceholder}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="date">{t.reservation.dateLabel}</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row two">
                <div className="field">
                  <label htmlFor="people">{t.reservation.guestsLabel}</label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                  >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3–4 people</option>
                    <option value="5">5–8 people</option>
                    <option value="9">9+ group</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="tour">{t.reservation.tourLabel}</label>
                  <select
                    id="tour"
                    name="tour"
                    value={formData.tour}
                    onChange={handleChange}
                  >
                    {tourOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">{t.reservation.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t.reservation.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {errorMsg && (
                <div style={{ color: "var(--terracotta-dark)", fontSize: "0.88rem", marginBottom: "12px", fontWeight: 500 }}>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", marginTop: "8px" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.reservation.submitting}</span>
                  </>
                ) : (
                  <span>{t.reservation.submitBtn}</span>
                )}
              </button>
            </form>
        </div>
      </div>
    </section>
  );
}
