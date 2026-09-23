"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface GuideBioData {
  name: string;
  fullName: string;
  eyebrow: string;
  title: string;
  bioP1: string;
  bioP2: string;
  bioP3: string;
  bioP4: string;
  signoff: string;
  rating: string;
  reviewsCount: string;
  experienceYears: string;
  signatureTours: string;
  languages: string;
  badgeText: string;
}

interface GuideBioTabProps {
  notify: (msg: string, type?: "success" | "error") => void;
}

const defaultBio: GuideBioData = {
  name: "Zaky",
  fullName: "Mohamed Zaky Bentabaa",
  eyebrow: "Meet your guide",
  title: "About Me",
  bioP1:
    "I’m Zaky, a second-generation official tour guide born and raised in Marrakech.",
  bioP2:
    "With a Master’s degree in Tourism Management and nearly two decades of experience, I offer a personal and authentic way to discover Marrakech and Morocco.",
  bioP3:
    "For me, guiding is not simply about showing places. It’s about sharing the stories, culture, hidden details and everyday life that make Marrakech truly special.",
  bioP4:
    "Over the years, I’ve had the privilege of guiding guests from all over the world, including internationally known personalities. But whether you are a first-time visitor or a returning guest, my approach remains the same: personal, discreet and tailored to you.",
  signoff: "Marrakech, curated by Zaky",
  rating: "5.0★",
  reviewsCount: "41",
  experienceYears: "19",
  signatureTours: "7",
  languages: "Arabic, French, English",
  badgeText: "41 verified Google reviews",
};

export function GuideBioTab({ notify }: GuideBioTabProps) {
  const [form, setForm] = useState<GuideBioData>(defaultBio);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadBio = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/adminzaky/bio");
      if (res.ok) {
        const data = await res.json();
        if (data.bio) {
          setForm({
            name: data.bio.name || defaultBio.name,
            fullName: data.bio.fullName || defaultBio.fullName,
            eyebrow: data.bio.eyebrow || defaultBio.eyebrow,
            title: data.bio.title || defaultBio.title,
            bioP1: data.bio.bioP1 || defaultBio.bioP1,
            bioP2: data.bio.bioP2 || defaultBio.bioP2,
            bioP3: data.bio.bioP3 || defaultBio.bioP3,
            bioP4: data.bio.bioP4 || defaultBio.bioP4,
            signoff: data.bio.signoff || defaultBio.signoff,
            rating: data.bio.rating || defaultBio.rating,
            reviewsCount: data.bio.reviewsCount || defaultBio.reviewsCount,
            experienceYears: data.bio.experienceYears || defaultBio.experienceYears,
            signatureTours: data.bio.signatureTours || defaultBio.signatureTours,
            languages: data.bio.languages || defaultBio.languages,
            badgeText: data.bio.badgeText || defaultBio.badgeText,
          });
        }
      } else {
        notify("Failed to load bio from database", "error");
      }
    } catch {
      notify("Network error loading bio", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBio();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/adminzaky/bio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      notify("Guide bio updated successfully in Supabase PostgreSQL!");
    } catch (err: any) {
      notify(err.message || "Failed to save bio", "error");
    } finally {
      setSaving(false);
    }
  };

  const languagePills = (form.languages || "Arabic, French, English")
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#d4a359" }}>
        <div style={{ fontSize: "28px", marginBottom: "12px" }}>⏳</div>
        <div style={{ fontSize: "15px", fontWeight: 600 }}>Loading Guide Bio from Supabase database...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(43, 30, 21, 0.6) 0%, rgba(26, 20, 13, 0.8) 100%)",
          border: "1px solid rgba(212, 163, 89, 0.2)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "rgba(212, 163, 89, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          📜
        </div>
        <div>
          <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#f5eee4" }}>
            Éditeur de Bio & Profil du Guide (About Zaky)
          </h4>
          <p style={{ margin: 0, fontSize: "12.5px", color: "#a89b8c", lineHeight: 1.4 }}>
            Personnalisez votre biographie, votre parcours de guide agréé, vos personnalités guidées, ainsi que vos statistiques affichées sur le site.
          </p>
        </div>
      </div>

      {/* 2-Column Form & Live Preview Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "28px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Form */}
        <form
          onSubmit={handleSave}
          style={{
            background: "rgba(30, 24, 18, 0.75)",
            border: "1px solid rgba(212, 163, 89, 0.25)",
            borderRadius: "14px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212, 163, 89, 0.15)", paddingBottom: "12px" }}>
            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#f5eee4" }}>
              Informations & Histoire du Guide
            </h3>
            <span style={{ fontSize: "11px", color: "#86efac", fontWeight: 600 }}>● Supabase Synced</span>
          </div>

          {/* Name & Title Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                Nom Affiché (Titre)
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="ex: Zaky"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: "#14100c",
                  border: "1px solid rgba(212, 163, 89, 0.25)",
                  borderRadius: "8px",
                  color: "#f5eee4",
                  fontSize: "13px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                Nom Complet Légal
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="ex: Mohamed Zaky Bentabaa"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: "#14100c",
                  border: "1px solid rgba(212, 163, 89, 0.25)",
                  borderRadius: "8px",
                  color: "#f5eee4",
                  fontSize: "13px",
                }}
              />
            </div>
          </div>

          {/* Eyebrow & Title */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                Sur-titre (Eyebrow)
              </label>
              <input
                type="text"
                value={form.eyebrow}
                onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
                placeholder="ex: Meet your guide"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: "#14100c",
                  border: "1px solid rgba(212, 163, 89, 0.25)",
                  borderRadius: "8px",
                  color: "#f5eee4",
                  fontSize: "13px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                Titre Professionnel
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="ex: About Me"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  background: "#14100c",
                  border: "1px solid rgba(212, 163, 89, 0.25)",
                  borderRadius: "8px",
                  color: "#f5eee4",
                  fontSize: "13px",
                }}
              />
            </div>
          </div>

          {/* Paragraph 1 */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
              Paragraphe 1 (Début de carrière & Guide de 2ème génération)
            </label>
            <textarea
              rows={3}
              value={form.bioP1}
              onChange={(e) => setForm({ ...form, bioP1: e.target.value })}
              style={{
                width: "100%",
                padding: "9px 12px",
                background: "#14100c",
                border: "1px solid rgba(212, 163, 89, 0.25)",
                borderRadius: "8px",
                color: "#f5eee4",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Paragraph 2 */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
              Paragraphe 2 (Diplômes, Master & Langues parlées)
            </label>
            <textarea
              rows={3}
              value={form.bioP2}
              onChange={(e) => setForm({ ...form, bioP2: e.target.value })}
              style={{
                width: "100%",
                padding: "9px 12px",
                background: "#14100c",
                border: "1px solid rgba(212, 163, 89, 0.25)",
                borderRadius: "8px",
                color: "#f5eee4",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Paragraph 3 */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
              Paragraphe 3 (Personnalités, VIPs & Célébrités guidées)
            </label>
            <textarea
              rows={3}
              value={form.bioP3}
              onChange={(e) => setForm({ ...form, bioP3: e.target.value })}
              style={{
                width: "100%",
                padding: "9px 12px",
                background: "#14100c",
                border: "1px solid rgba(212, 163, 89, 0.25)",
                borderRadius: "8px",
                color: "#f5eee4",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Paragraph 4 */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
              Paragraphe 4 (Philosophie du guidage & Connexion humaine)
            </label>
            <textarea
              rows={3}
              value={form.bioP4}
              onChange={(e) => setForm({ ...form, bioP4: e.target.value })}
              style={{
                width: "100%",
                padding: "9px 12px",
                background: "#14100c",
                border: "1px solid rgba(212, 163, 89, 0.25)",
                borderRadius: "8px",
                color: "#f5eee4",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Signoff */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
              Phrase de Conclusion (Sign-off)
            </label>
            <input
              type="text"
              value={form.signoff}
              onChange={(e) => setForm({ ...form, signoff: e.target.value })}
              style={{
                width: "100%",
                padding: "9px 12px",
                background: "#14100c",
                border: "1px solid rgba(212, 163, 89, 0.25)",
                borderRadius: "8px",
                color: "#ffd79a",
                fontWeight: 600,
                fontSize: "13px",
              }}
            />
          </div>

          {/* Stats Row */}
          <div style={{ borderTop: "1px solid rgba(212, 163, 89, 0.15)", paddingTop: "14px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: 700, color: "#d4a359", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Statistiques & Badges Affichés
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#a89b8c", marginBottom: "4px" }}>
                  Note Google
                </label>
                <input
                  type="text"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  placeholder="5.0★"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: "#14100c",
                    border: "1px solid rgba(212, 163, 89, 0.25)",
                    borderRadius: "6px",
                    color: "#ffd79a",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#a89b8c", marginBottom: "4px" }}>
                  Avis Vérifiés
                </label>
                <input
                  type="text"
                  value={form.reviewsCount}
                  onChange={(e) => setForm({ ...form, reviewsCount: e.target.value })}
                  placeholder="41"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: "#14100c",
                    border: "1px solid rgba(212, 163, 89, 0.25)",
                    borderRadius: "6px",
                    color: "#f5eee4",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#a89b8c", marginBottom: "4px" }}>
                  Circuits Signatures
                </label>
                <input
                  type="text"
                  value={form.signatureTours}
                  onChange={(e) => setForm({ ...form, signatureTours: e.target.value })}
                  placeholder="7"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: "#14100c",
                    border: "1px solid rgba(212, 163, 89, 0.25)",
                    borderRadius: "6px",
                    color: "#f5eee4",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>

            {/* Languages & Badge text */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#a89b8c", marginBottom: "4px" }}>
                  Langues Parlées (séparées par virgules)
                </label>
                <input
                  type="text"
                  value={form.languages}
                  onChange={(e) => setForm({ ...form, languages: e.target.value })}
                  placeholder="Arabic, French, English"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: "#14100c",
                    border: "1px solid rgba(212, 163, 89, 0.25)",
                    borderRadius: "6px",
                    color: "#f5eee4",
                    fontSize: "12px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#a89b8c", marginBottom: "4px" }}>
                  Badge Portrait Photo
                </label>
                <input
                  type="text"
                  value={form.badgeText}
                  onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
                  placeholder="41 verified Google reviews"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: "#14100c",
                    border: "1px solid rgba(212, 163, 89, 0.25)",
                    borderRadius: "6px",
                    color: "#f5eee4",
                    fontSize: "12px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: "8px",
              padding: "13px",
              background: "linear-gradient(135deg, #d4a359 0%, #b38237 100%)",
              border: "none",
              borderRadius: "10px",
              color: "#1a140d",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 18px rgba(212, 163, 89, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>💾</span>
            <span>{saving ? "Enregistrement en cours..." : "Enregistrer la Bio dans Supabase"}</span>
          </button>
        </form>

        {/* Right Column: Live Visual Preview Card */}
        <div
          style={{
            position: "sticky",
            top: "20px",
            background: "#fbf6ec",
            borderRadius: "16px",
            border: "1px solid rgba(212, 163, 89, 0.3)",
            padding: "24px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
            color: "#2b1e15",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(212, 163, 89, 0.25)", paddingBottom: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#c25e38" }}>
              Aperçu en Direct sur le Site
            </span>
            <span style={{ fontSize: "10px", background: "rgba(194, 94, 56, 0.12)", color: "#c25e38", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>
              Live Preview
            </span>
          </div>

          {/* Preview Arch & Badge */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "18px" }}>
            <div
              style={{
                width: "90px",
                height: "120px",
                borderRadius: "50px 50px 10px 10px",
                position: "relative",
                overflow: "hidden",
                border: "2px solid #d4a359",
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/zaky-riad.jpg"
                alt="Zaky"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#c25e38", fontWeight: 700 }}>
                {form.eyebrow || "Meet your guide"}
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "2px 0 4px 0", color: "#2b1e15" }}>
                {form.name || "Zaky"}
              </h2>
              <div style={{ fontSize: "11.5px", color: "#7a6755", fontWeight: 600 }}>
                {form.title}
              </div>
              <div style={{ marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "6px", background: "#f1e4d0", padding: "3px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, color: "#8a5717" }}>
                <span>★ {form.rating}</span>
                <span>•</span>
                <span>{form.badgeText || `${form.reviewsCount} reviews`}</span>
              </div>
            </div>
          </div>

          {/* Bio Paragraphs */}
          <div style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#423225", display: "flex", flexDirection: "column", gap: "10px" }}>
            {form.bioP1 && <p style={{ margin: 0 }}>{form.bioP1}</p>}
            {form.bioP2 && <p style={{ margin: 0 }}>{form.bioP2}</p>}
            {form.bioP3 && <p style={{ margin: 0, fontStyle: "italic", borderLeft: "2px solid #d4a359", paddingLeft: "10px" }}>{form.bioP3}</p>}
            {form.bioP4 && <p style={{ margin: 0 }}>{form.bioP4}</p>}
            {form.signoff && (
              <p style={{ margin: "4px 0 0 0", fontWeight: 700, color: "#c25e38" }}>
                {form.signoff}
              </p>
            )}
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px",
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(212, 163, 89, 0.25)",
              textAlign: "center",
            }}
          >
            <div style={{ background: "#f1e4d0", padding: "8px", borderRadius: "8px" }}>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#2b1e15" }}>{form.rating}</div>
              <div style={{ fontSize: "9.5px", color: "#7a6755", textTransform: "uppercase" }}>Google rating</div>
            </div>
            <div style={{ background: "#f1e4d0", padding: "8px", borderRadius: "8px" }}>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#2b1e15" }}>{form.reviewsCount}</div>
              <div style={{ fontSize: "9.5px", color: "#7a6755", textTransform: "uppercase" }}>Verified reviews</div>
            </div>
            <div style={{ background: "#f1e4d0", padding: "8px", borderRadius: "8px" }}>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#2b1e15" }}>{form.signatureTours}</div>
              <div style={{ fontSize: "9.5px", color: "#7a6755", textTransform: "uppercase" }}>Signature tours</div>
            </div>
          </div>

          {/* Language Pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "12px" }}>
            {languagePills.map((lang) => (
              <span
                key={lang}
                style={{
                  fontSize: "10.5px",
                  padding: "3px 9px",
                  borderRadius: "12px",
                  background: "#e4d3bd",
                  color: "#2b1e15",
                  fontWeight: 600,
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
