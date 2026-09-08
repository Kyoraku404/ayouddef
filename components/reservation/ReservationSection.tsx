"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { getWhatsAppReservationUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics-client";

const tourOptions = [
  "Marrakesh Medina, Souks & Heritage Experience",
  "Marrakesh Souks & Local Markets Experience",
  "Marrakesh Historical & Cultural Heritage Tour",
  "Marrakesh By Night, Medina & Nightlife Experience",
  "Marrakesh Private Signature Experience — 7 Days",
  "Marrakesh & Oualidia Private Coastal Escape — 5 Days",
  "Customized Private Tours",
  "General Inquiry / Custom Itinerary",
];

interface ReservationSectionProps {
  selectedTour?: string;
}

export function ReservationSection({ selectedTour }: ReservationSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    people: 2,
    tour: selectedTour || tourOptions[0],
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync selectedTour prop if updated
  React.useEffect(() => {
    if (selectedTour) {
      setFormData((prev) => ({ ...prev, tour: selectedTour }));
    }
  }, [selectedTour]);

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

      setSubmitted(true);
      setLoading(false);
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
          <span className="eyebrow">Reservation</span>
          <h2>Plan your Marrakesh day with Zaky</h2>
          <p>
            Tell Zaky what you&apos;d like to see and when — he&apos;ll confirm your tour personally, usually within a few hours.
          </p>

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
          {submitted ? (
            <div className="form-card text-center">
              <div className="w-16 h-16 rounded-full bg-sand-soft text-terracotta border border-sand flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>
                Request Sent Successfully!
              </h3>

              <p style={{ color: "var(--brown-soft)", fontSize: "0.98rem", marginBottom: "20px" }}>
                Thank you, <strong>{formData.fullName}</strong>. Zaky has received your inquiry for the <strong>{formData.tour}</strong>.
              </p>

              {/* Required confirmation notice */}
              <div
                style={{
                  background: "var(--sand-soft)",
                  border: "1px solid var(--sand)",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  textAlign: "left",
                  fontSize: "0.86rem",
                  color: "var(--brown)",
                  marginBottom: "24px",
                }}
              >
                <strong style={{ color: "var(--terracotta-dark)", display: "block", marginBottom: "4px" }}>
                  Notice of Confirmation:
                </strong>
                Please note that your reservation is an inquiry request and is <strong>not confirmed</strong> until Zaky confirms availability and verifies timing with you directly.
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={getWhatsAppReservationUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: "#25D366" }}
                  onClick={(e) => trackWhatsAppClick("reservation_success_continue", getWhatsAppReservationUrl(formData), e)}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue on WhatsApp</span>
                </a>

                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      date: "",
                      people: 2,
                      tour: tourOptions[0],
                      message: "",
                    });
                  }}
                >
                  Send Another Request
                </button>
              </div>
            </div>
          ) : (
            <form className="form-card" id="resForm" onSubmit={handleSubmit} noValidate>
              <div className="form-row two">
                <div className="field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row two">
                <div className="field">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+1 555 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="date">Preferred Date</label>
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
                  <label htmlFor="people">Number of People</label>
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
                  <label htmlFor="tour">Select a Tour</label>
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
                <label htmlFor="message">Message or Special Interests</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell Zaky what you'd like to see, dietary requests, schedule constraints, etc."
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
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Reservation Request</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
