import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  UserCheck,
  Lock,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Official Contract & Sovereign Ratification | OCN & Zaky",
  description:
    "Official confidential commercial partnership agreement and legal ratification between OCN and Mohamed Zaky Bentabaa.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

const PROTO_CONTRACT_URL =
  "https://mail.proton.me/u/1/inbox/WvH_uA_zSRh7V9FMzkxR5MALvu3XP4WBSNkge5sfREP2MfDe26iOXsMs8HH0BPlxMCc1-KUsnmYVWPecGl8nuQ==#category=primary";

export default function OfficialContractPage() {
  const clauses = [
    {
      number: "Article 1.0",
      title: "Co-Propriété des Actifs Numériques & Propriété Intellectuelle",
      summary:
        "Les actifs numériques, le design personnalisé, la notoriété de marque et le code source de marrakeshitourguide.com sont co-détenus à hauteur de soixante-dix pour cent (70%) par le Client (Mohamed Zaky Bentabaa) et trente pour cent (30%) par OCN. Aucune des deux parties ne peut céder le nom de domaine ou le code sans accord écrit mutuel.",
    },
    {
      number: "Article 2.0",
      title: "Participation aux Revenus & Modalités de Calcul",
      summary:
        "OCN bénéficie d'une participation de dix pour cent (10%) sur les Revenus Nets Définis générés via la plateforme numérique. Le Revenu Net Défini correspond au montant des visites guidées réalisées, déduction faite des éventuels remboursements directs. Le Client conserve quatre-vingt-dix pour cent (90%) des réalisations nettes.",
    },
    {
      number: "Article 3.0",
      title: "Tunnel de Réservation WhatsApp & Protocole de Validation",
      summary:
        "Les demandes de réservation étant initiées via WhatsApp et communication directe, un simple clic sur un bouton WhatsApp ne constitue pas un revenu validé. La reconnaissance financière suit le cycle : Visiteur → Clic WhatsApp → Lead → Réservation Confirmée → Tour Réalisé → Revenu Enregistré.",
    },
    {
      number: "Article 4.0",
      title: "Calendrier de Réconciliation & Règlements Semestriels",
      summary:
        "Les comptes font l'objet d'une réconciliation semestrielle : Période H1 (1er janvier au 30 juin) et Période H2 (1er juillet au 31 décembre). Les relevés de compte et reversements sont effectués dans un délai de 15 jours calendaires suivant la fin de chaque cycle.",
    },
    {
      number: "Article 5.0",
      title: "Infrastructure Technique, Sécurité & SLA 99.9%",
      summary:
        "OCN garantit une haute disponibilité de 99,9%, la maintenance des certificats SSL/TLS d'entreprise, le référencement naturel local (SEO) pour la ville de Marrakech, et l'application régulière des correctifs de sécurité et de performances.",
    },
    {
      number: "Article 6.0",
      title: "Confidentialité & Protection des Données Personnelles",
      summary:
        "La télémétrie et les statistiques de fréquentation respectent rigoureusement la vie privée des visiteurs. Aucune géolocalisation invasive ni traçage biométrique n'est stocké. Les données restent strictement isolées et sécurisées.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0c0a08 0%, #16120d 50%, #0d0a08 100%)",
        color: "#f5eee4",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "40px 20px 80px 20px",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        {/* Top Navigation Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#d4a359",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 14px",
              background: "rgba(212, 163, 89, 0.1)",
              border: "1px solid rgba(212, 163, 89, 0.25)",
              borderRadius: "8px",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#a89b8c",
                fontFamily: "monospace",
                padding: "6px 12px",
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
              }}
            >
              <span>ID:</span>
              <strong style={{ color: "#ffd79a" }}>OCN-ZAKY-2026-v1.2</strong>
            </span>
          </div>
        </div>

        {/* PROTON ENCRYPTED RECORD ALERT BANNER */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(109, 40, 217, 0.18) 0%, rgba(212, 163, 89, 0.15) 100%)",
            border: "1px solid rgba(167, 139, 250, 0.4)",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "32px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", flex: 1, minWidth: "280px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(109, 40, 217, 0.3)",
                border: "1px solid rgba(167, 139, 250, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#c4b5fd",
              }}
            >
              <Lock style={{ width: "22px", height: "22px" }} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "10.5px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#c4b5fd",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Archive Chiffrée de Bout-en-Bout &bull; ProtonMail Vault
              </div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                Preuve d&apos;Échange & Accord Officiel Chiffré
              </h2>
              <p style={{ fontSize: "12.5px", color: "#d8cebe", margin: "4px 0 0 0", lineHeight: 1.4 }}>
                La version certifiée et les échanges contractuels originaux sont conservés de manière chiffrée sur la
                boîte Proton sécurisée d&apos;OCN.
              </p>
            </div>
          </div>

          <a
            href={PROTO_CONTRACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              background: "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
              border: "1px solid rgba(196, 181, 253, 0.4)",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(109, 40, 217, 0.4)",
              whiteSpace: "nowrap",
            }}
          >
            <span>Accéder à l&apos;E-mail Proton Chiffré</span>
            <ExternalLink style={{ width: "14px", height: "14px" }} />
          </a>
        </div>

        {/* Main Contract Container */}
        <div
          style={{
            background: "rgba(22, 18, 14, 0.85)",
            border: "1px solid rgba(212, 163, 89, 0.3)",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Document Header */}
          <div
            style={{
              borderBottom: "1px solid rgba(212, 163, 89, 0.2)",
              paddingBottom: "24px",
              marginBottom: "28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  background: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid rgba(34, 197, 94, 0.35)",
                  color: "#86efac",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                <ShieldCheck style={{ width: "14px", height: "14px" }} />
                <span>CONTRAT EN VIGUEUR &bull; RATIFIÉ LE 01/01/2026</span>
              </div>

              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#f5eee4",
                  margin: "0 0 6px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                Accord Cadre de Partenariat & Participation aux Revenus
              </h1>
              <p style={{ fontSize: "13px", color: "#a89b8c", margin: 0, lineHeight: 1.4 }}>
                Contrat commercial bilatéral entre l&apos;opérateur technique <strong>OCN (Open Cyber Network)</strong>{" "}
                et le guide officiel de Marrakech <strong>Mohamed Zaky Bentabaa</strong>.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                background: "rgba(0, 0, 0, 0.5)",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#8e8071", fontSize: "11px" }}>Date d&apos;entrée en vigueur :</span>
              <strong style={{ color: "#ffd79a" }}>1er Janvier 2026</strong>
              <span style={{ color: "#8e8071", fontSize: "11px", marginTop: "4px" }}>Juridiction :</span>
              <span style={{ color: "#e8ded2", fontSize: "11.5px" }}>Droit Commercial & Numérique</span>
            </div>
          </div>

          {/* Contracting Parties Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {/* Party A */}
            <div
              style={{
                background: "rgba(16, 12, 9, 0.9)",
                border: "1px solid rgba(167, 139, 250, 0.25)",
                borderRadius: "12px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#c4b5fd",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                <Building2 style={{ width: "14px", height: "14px" }} />
                <span>Partie A : Opérateur Digital</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                OCN (Open Cyber Network)
              </div>
              <div style={{ fontSize: "12px", color: "#a89b8c", lineHeight: 1.4 }}>
                Administration, Développement Web, Référencement & Hébergement Cloud Haute Performance
              </div>
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "10px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "11.5px",
                  fontFamily: "monospace",
                  color: "#ffd79a",
                }}
              >
                30% Propriété d&apos;Actif &bull; 10% Quote-Part Revenu
              </div>
            </div>

            {/* Party B */}
            <div
              style={{
                background: "rgba(16, 12, 9, 0.9)",
                border: "1px solid rgba(212, 163, 89, 0.3)",
                borderRadius: "12px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#ffd79a",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                <UserCheck style={{ width: "14px", height: "14px" }} />
                <span>Partie B : Guide Officiel & Porteur de Marque</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                Mohamed Zaky Bentabaa
              </div>
              <div style={{ fontSize: "12px", color: "#a89b8c", lineHeight: 1.4 }}>
                Guide Touristique Agréé par le Ministère &ndash; Marrakech, Maroc. Marque : Marrakeshi Tour Guide
              </div>
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "10px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "11.5px",
                  fontFamily: "monospace",
                  color: "#86efac",
                }}
              >
                70% Propriété d&apos;Actif &bull; 90% Quote-Part Revenu
              </div>
            </div>
          </div>

          {/* Key Summary Badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "12px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 163, 89, 0.15)",
              }}
            >
              <span style={{ fontSize: "10.5px", color: "#8e8071", textTransform: "uppercase", display: "block" }}>
                Répartition des Actifs
              </span>
              <strong style={{ fontSize: "15px", color: "#f5eee4", marginTop: "4px", display: "block" }}>
                70% Zaky / 30% OCN
              </strong>
            </div>

            <div
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 163, 89, 0.15)",
              }}
            >
              <span style={{ fontSize: "10.5px", color: "#8e8071", textTransform: "uppercase", display: "block" }}>
                Quote-Part OCN
              </span>
              <strong style={{ fontSize: "15px", color: "#ffd79a", marginTop: "4px", display: "block" }}>
                10% du Réalisé Net
              </strong>
            </div>

            <div
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 163, 89, 0.15)",
              }}
            >
              <span style={{ fontSize: "10.5px", color: "#8e8071", textTransform: "uppercase", display: "block" }}>
                Cadence de Règlement
              </span>
              <strong style={{ fontSize: "15px", color: "#86efac", marginTop: "4px", display: "block" }}>
                Semestriel (H1 & H2)
              </strong>
            </div>

            <div
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid rgba(212, 163, 89, 0.15)",
              }}
            >
              <span style={{ fontSize: "10.5px", color: "#8e8071", textTransform: "uppercase", display: "block" }}>
                Statut Légal
              </span>
              <strong style={{ fontSize: "15px", color: "#c4b5fd", marginTop: "4px", display: "block" }}>
                Ratifié & Actif
              </strong>
            </div>
          </div>

          {/* Articles & Clauses */}
          <div style={{ marginBottom: "36px" }}>
            <h2
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#ffd79a",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Clauses & Articles Contractuels Ratifiés
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {clauses.map((clause, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(16, 12, 9, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "16px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span
                      style={{
                        fontSize: "10.5px",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: "rgba(212, 163, 89, 0.15)",
                        color: "#ffd79a",
                      }}
                    >
                      {clause.number}
                    </span>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#f5eee4", margin: 0 }}>{clause.title}</h3>
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#c5b8a6", lineHeight: 1.5, margin: 0 }}>
                    {clause.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures Card */}
          <div
            style={{
              background: "rgba(12, 9, 7, 0.8)",
              border: "1px solid rgba(212, 163, 89, 0.2)",
              borderRadius: "12px",
              padding: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", color: "#8e8071", display: "block", marginBottom: "4px" }}>
                Pour et au nom d&apos;OCN :
              </span>
              <div style={{ fontStyle: "italic", fontSize: "16px", color: "#c4b5fd", fontFamily: "serif" }}>
                OCN Sovereign Administrator
              </div>
              <div style={{ fontSize: "10px", color: "#6a5c4f", fontFamily: "monospace", marginTop: "4px" }}>
                Hash: 0x8F9C4A21E7B06... &bull; Empreinte Chiffrée Proton
              </div>
            </div>

            <div>
              <span style={{ fontSize: "11px", color: "#8e8071", display: "block", marginBottom: "4px" }}>
                Pour et au nom de Marrakeshi Tour Guide :
              </span>
              <div style={{ fontStyle: "italic", fontSize: "16px", color: "#ffd79a", fontFamily: "serif" }}>
                Mohamed Zaky Bentabaa
              </div>
              <div style={{ fontSize: "10px", color: "#6a5c4f", fontFamily: "monospace", marginTop: "4px" }}>
                Guide Officiel Agréé &bull; Marrakech, Maroc
              </div>
            </div>
          </div>
        </div>

        {/* Footer info & Direct Proton Link */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "11.5px",
            color: "#8e8071",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div>
            Document officiel hébergé de manière confidentielle &bull; Référence Proton :{" "}
            <a
              href={PROTO_CONTRACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c4b5fd", textDecoration: "underline" }}
            >
              WvH_uA_zSRh7V9FMzkxR5MALvu3XP4...
            </a>
          </div>
          <div>&copy; 2026 OCN & Mohamed Zaky Bentabaa. Tous droits réservés.</div>
        </div>
      </div>
    </div>
  );
}
