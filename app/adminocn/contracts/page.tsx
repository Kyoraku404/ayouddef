"use client";

import React from "react";
import {
  FileText,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2,
  Calendar,
  Percent,
  Download,
  Printer,
  ExternalLink,
} from "lucide-react";

export default function OcnContractsPage() {
  const clauses = [
    {
      number: "Clause 1.0",
      title: "Website Asset Ownership & Intellectual Property",
      summary:
        "The digital assets, custom design, domain authority, and codebase comprising marrakeshitourguide.com are co-owned in the ratio of seventy percent (70%) by the Client (Mohamed Zaky Bentabaa) and thirty percent (30%) by OCN. Neither party may alienate the primary domain or proprietary source code without mutual signed ratification.",
    },
    {
      number: "Clause 2.0",
      title: "Revenue Participation & Calculation Framework",
      summary:
        "OCN is entitled to a ten percent (10%) share of Defined Net Revenue originating from the digital platform. Defined Net Revenue is calculated strictly as Gross Tour Realization minus authorized refunds and direct payment processing fees. Client retains ninety percent (90%) of all defined realizations.",
    },
    {
      number: "Clause 3.0",
      title: "WhatsApp Booking Funnel & Verification Protocol",
      summary:
        "Because reservations are coordinated via WhatsApp and direct guest communication, a click on a WhatsApp CTA or reservation inquiry does NOT constitute verified revenue. Financial recognition requires the progression: Visitor → WhatsApp Click → Lead → Confirmed Reservation → Completed Tour → Revenue Recorded. Only completed tours generate payable OCN royalty.",
    },
    {
      number: "Clause 4.0",
      title: "Settlement Schedules & Bi-Annual Cycles",
      summary:
        "Accounts are reconciled bi-annually: Cycle H1 (January 1 to June 30) and Cycle H2 (July 1 to December 31). Reconciliation statements and balance remittances are due within fifteen (15) calendar days of cycle closure. All remittances are recorded in the immutable OCN sovereign ledger.",
    },
    {
      number: "Clause 5.0",
      title: "Technical Infrastructure, Security & SLA",
      summary:
        "OCN covenants to maintain ninety-nine point nine percent (99.9%) uptime, provide enterprise-grade SSL certificates, maintain localized search engine optimization (SEO) targeting high-intent travelers to Marrakesh, and implement continuous security patch management.",
    },
    {
      number: "Clause 6.0",
      title: "Privacy Conscious Architecture & Sovereign Isolation",
      summary:
        "Telemetry and visitor analytics must adhere strictly to privacy best practices. No invasive GPS tracking, biometric markers, or unnecessary personally identifiable information may be stored. Data is strictly segregated by tenant identifier.",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Legal Governance & Sovereign Agreements
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Contractual Agreements
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ratified Digital Partnership: <strong className="text-white">Marrakeshi Tour Guide by Zaky</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-indigo-400" />
            Print Agreement
          </button>
        </div>
      </div>

      {/* Contract Header Certificate Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-4 h-4" />
              Contract Version v1.2 (Active & Binding)
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Master Partnership & Digital Revenue Participation Agreement
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Executed under the sovereign jurisdiction of Moroccan Commercial Law and OCN Governance Standards
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="text-slate-500">Effective:</span>
            <span className="text-emerald-400 font-bold">Jan 1, 2026</span>
          </div>
        </div>

        {/* Parties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold uppercase tracking-wider text-[10px]">
              <Building2 className="w-4 h-4" /> Party A: Digital Partner & Operator
            </div>
            <div className="text-base font-bold text-white">OCN (Open Cyber Network)</div>
            <div className="text-slate-400">Administration & Technical Infrastructure Provider</div>
            <div className="text-[11px] text-indigo-300 font-mono pt-1">
              Role: Technology Partner • 30% Asset Equity • 10% Revenue Share
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
              <UserCheck className="w-4 h-4" /> Party B: Official Tour Guide & Brand Owner
            </div>
            <div className="text-base font-bold text-white">Mohamed Zaky Bentabaa</div>
            <div className="text-slate-400">Trade Name: Marrakeshi Tour Guide by Zaky</div>
            <div className="text-[11px] text-emerald-400 font-mono pt-1">
              Role: Licensed Tour Guide • 70% Asset Equity • 90% Revenue Share
            </div>
          </div>
        </div>

        {/* Key Commercial Terms Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Website Ownership</span>
            <span className="text-sm font-bold text-white font-mono mt-0.5 block">70% Client / 30% OCN</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Revenue Participation</span>
            <span className="text-sm font-bold text-indigo-400 font-mono mt-0.5 block">10% OCN Defined Share</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Settlement Cadence</span>
            <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">Bi-Annual (H1 & H2)</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Brand Standards</span>
            <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">Strict &quot;Marrakesh&quot; spelling</span>
          </div>
        </div>
      </div>

      {/* Contract Clauses Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Ratified Articles & Operational Clauses
        </h3>

        <div className="space-y-3">
          {clauses.map((clause, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  {clause.number}
                </span>
                <h4 className="text-sm font-bold text-white">{clause.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {clause.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Signatures Footer */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div>
          <span className="text-slate-500 block mb-1">For and on behalf of OCN:</span>
          <div className="font-serif italic text-base text-indigo-300 pt-1">
            OCN Sovereign Administrator
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            Hash: 0x8F9C4A21E7B06... • Digitally Signed
          </div>
        </div>

        <div>
          <span className="text-slate-500 block mb-1">For and on behalf of Marrakeshi Tour Guide:</span>
          <div className="font-serif italic text-base text-slate-200 pt-1">
            Mohamed Zaky Bentabaa
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            Licensed Tour Guide • Marrakesh, Morocco
          </div>
        </div>
      </div>
    </div>
  );
}
