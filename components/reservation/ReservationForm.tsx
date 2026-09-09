"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  User,
  MessageSquare,
  Compass,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { toursData } from "@/lib/tours-data";
import { ReservationInput } from "@/lib/validation";
import { getWhatsAppReservationUrl, isPlaceholderWhatsApp } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

interface ReservationFormProps {
  selectedTour?: string;
}

export function ReservationForm({ selectedTour }: ReservationFormProps) {
  const [tourList, setTourList] = useState(toursData);
  const [formData, setFormData] = useState<ReservationInput>({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    people: 2,
    tour: selectedTour || toursData[0].title,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.tours) && data.tours.length > 0) {
          setTourList(data.tours);
        }
      })
      .catch(() => {});
  }, []);

  // Synchronize when parent passes updated selectedTour
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
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSubmissionError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        } else {
          setSubmissionError(data.error || "An error occurred while submitting your request.");
        }
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      setSubmissionError(
        "Network error. Please check your connection or contact Zaky directly via WhatsApp."
      );
      setLoading(false);
    }
  };

  if (submitted) {
    const whatsAppUrl = getWhatsAppReservationUrl(formData);
    const isPlaceholder = isPlaceholderWhatsApp(siteConfig.urls.whatsappNumber);

    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-cream border-2 border-gold/40 shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl text-brown font-semibold">
          Reservation Request Received!
        </h3>

        <p className="mt-3 text-sm sm:text-base text-ink/80 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="font-semibold text-brown">{formData.fullName}</strong>. Zaky has received your inquiry for the <span className="font-medium text-terracotta">{formData.tour}</span> on <span className="font-medium text-brown">{formData.date}</span> for {formData.people} {formData.people === 1 ? "guest" : "guests"}.
        </p>

        {/* Disclaimer as explicitly requested in requirements */}
        <div className="mt-6 p-4 rounded-xl bg-sand-soft border border-sand text-xs sm:text-sm text-brown text-left max-w-lg mx-auto leading-relaxed">
          <p className="font-semibold text-terracotta-dark flex items-center gap-1.5 mb-1">
            <span>Notice of Confirmation:</span>
          </p>
          <p>
            Please note that your reservation is an inquiry request and is <strong>not confirmed</strong> until Zaky confirms availability and verifies timing with you directly.
          </p>
        </div>

        {/* WhatsApp Continuation CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Continue on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                date: "",
                people: 2,
                tour: toursData[0].title,
                message: "",
              });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-sand-soft hover:bg-sand text-brown font-semibold text-sm transition-colors"
          >
            Submit Another Request
          </button>
        </div>

        {isPlaceholder && (
          <p className="mt-4 text-[11px] text-brown/50 italic">
            (Developer note: WhatsApp number is currently using default configuration placeholder)
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-10 rounded-2xl bg-cream border border-sand shadow-lg"
      noValidate
    >
      {submissionError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>{submissionError}</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
            Full Name <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown/40">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border text-ink text-sm transition-colors focus:bg-white focus:outline-none ${
                errors.fullName ? "border-red-400 focus:border-red-500" : "border-sand focus:border-terracotta"
              }`}
            />
          </div>
          {errors.fullName && <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
            Email Address <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown/40">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sarah@example.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border text-ink text-sm transition-colors focus:bg-white focus:outline-none ${
                errors.email ? "border-red-400 focus:border-red-500" : "border-sand focus:border-terracotta"
              }`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
            WhatsApp / Phone <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown/40">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border text-ink text-sm transition-colors focus:bg-white focus:outline-none ${
                errors.phone ? "border-red-400 focus:border-red-500" : "border-sand focus:border-terracotta"
              }`}
            />
          </div>
          {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="date" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
            Preferred Date <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown/40">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border text-ink text-sm transition-colors focus:bg-white focus:outline-none ${
                errors.date ? "border-red-400 focus:border-red-500" : "border-sand focus:border-terracotta"
              }`}
            />
          </div>
          {errors.date && <p className="mt-1.5 text-xs text-red-600">{errors.date}</p>}
        </div>

        {/* Number of People */}
        <div>
          <label htmlFor="people" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
            Number of People <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown/40">
              <Users className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="people"
              name="people"
              required
              min={1}
              max={50}
              value={formData.people}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border text-ink text-sm transition-colors focus:bg-white focus:outline-none ${
                errors.people ? "border-red-400 focus:border-red-500" : "border-sand focus:border-terracotta"
              }`}
            />
          </div>
          {errors.people && <p className="mt-1.5 text-xs text-red-600">{errors.people}</p>}
        </div>

        {/* Tour Selection */}
        <div>
          <label htmlFor="tour" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
            Selected Tour <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brown/40">
              <Compass className="w-4 h-4" />
            </div>
            <select
              id="tour"
              name="tour"
              required
              value={formData.tour}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border text-ink text-sm transition-colors focus:bg-white focus:outline-none ${
                errors.tour ? "border-red-400 focus:border-red-500" : "border-sand focus:border-terracotta"
              }`}
            >
              {tourList.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title} {t.price ? `(${t.price})` : ""}
                </option>
              ))}
            </select>
          </div>
          {errors.tour && <p className="mt-1.5 text-xs text-red-600">{errors.tour}</p>}
        </div>
      </div>

      {/* Message / Special Requests */}
      <div className="mt-6">
        <label htmlFor="message" className="block text-xs font-semibold text-brown uppercase tracking-wider mb-2">
          Message or Special Interests <span className="text-brown/50 lowercase font-normal">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-3.5 pointer-events-none text-brown/40">
            <MessageSquare className="w-4 h-4" />
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message || ""}
            onChange={handleChange}
            placeholder="Tell Zaky about your schedule, mobility preferences, dietary wishes, or particular interests..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-sand-soft/50 border border-sand text-ink text-sm transition-colors focus:bg-white focus:border-terracotta focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-brown/70 order-2 sm:order-1">
          🔒 Requests are encrypted and sent directly to Zaky.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-dark disabled:opacity-60 text-cream font-semibold uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 order-1 sm:order-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Request...</span>
            </>
          ) : (
            <span>Request Reservation</span>
          )}
        </button>
      </div>
    </form>
  );
}
