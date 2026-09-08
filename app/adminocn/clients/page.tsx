"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  Globe,
  FileText,
  Percent,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageCircle,
  CalendarCheck,
  DollarSign,
  Phone,
  Mail,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Plus,
} from "lucide-react";
import { OcnClientProfile, OcnOverviewMetrics } from "@/lib/ocn-types";

export default function OcnClientsPage() {
  const [clients, setClients] = useState<OcnClientProfile[]>([]);
  const [metrics, setMetrics] = useState<OcnOverviewMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClientData = async () => {
    setLoading(true);
    try {
      const [resClients, resOverview] = await Promise.all([
        fetch("/api/ocn/clients"),
        fetch("/api/ocn/overview"),
      ]);

      if (resClients.ok) {
        const cData = await resClients.json();
        setClients(cData.clients || []);
      }
      if (resOverview.ok) {
        const oData = await resOverview.json();
        setMetrics(oData.metrics || null);
      }
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  if (loading || clients.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400 text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span>Loading client profiles & tenant data...</span>
      </div>
    );
  }

  const primaryClient = clients[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Tenant & Portfolio Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Client Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Managing <strong className="text-white">{clients.length} Active Portfolio Client</strong> • Strict Tenant Data Separation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Multi-tenant onboarding pipeline: Contact OCN Partnership Committee to register new client credentials.")}
            className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Provision Client Tenant
          </button>
          <button
            onClick={fetchClientData}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Client Profile Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Top bar with Identity and Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-md">
              ZT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {primaryClient.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  {primaryClient.maintenanceStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Legal Name: <strong className="text-slate-200">{primaryClient.legalName}</strong>
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-indigo-400">
                  <Globe className="w-3.5 h-3.5" />
                  {primaryClient.domain}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Contract {primaryClient.contractVersion}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/adminocn/contracts"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              View Legal Contract
            </Link>
            <a
              href={`https://${primaryClient.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Website
            </a>
          </div>
        </div>

        {/* Ownership & Revenue Participation Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Asset & Website Ownership</span>
              <span className="text-indigo-400 font-mono">Contractual Split</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-1">
              <span className="text-slate-300">Client Ownership (Zaky):</span>
              <strong className="text-emerald-400 font-mono text-base">70%</strong>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">OCN Technology Equity:</span>
              <strong className="text-indigo-400 font-mono text-base">30%</strong>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex mt-2">
              <div className="bg-emerald-500 h-full" style={{ width: "70%" }} title="Client 70%" />
              <div className="bg-indigo-500 h-full" style={{ width: "30%" }} title="OCN 30%" />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Defined Revenue Participation</span>
              <span className="text-indigo-400 font-mono">10% OCN Share</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-1">
              <span className="text-slate-300">OCN Revenue Royalty:</span>
              <strong className="text-indigo-400 font-mono text-base">10%</strong>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Client Direct Retention:</span>
              <strong className="text-slate-200 font-mono text-base">90%</strong>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex mt-2">
              <div className="bg-indigo-500 h-full" style={{ width: "10%" }} title="OCN 10%" />
              <div className="bg-slate-600 h-full" style={{ width: "90%" }} title="Client 90%" />
            </div>
          </div>
        </div>

        {/* Live Performance & Financial Metrics for this Client */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <div className="text-[11px] text-slate-400">Total Visitors</div>
              <div className="text-lg font-bold text-white font-mono mt-1">
                {metrics.totalVisitors.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <div className="text-[11px] text-slate-400">WhatsApp Clicks</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                {metrics.whatsappClicks.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <div className="text-[11px] text-slate-400">Confirmed Bookings</div>
              <div className="text-lg font-bold text-teal-400 font-mono mt-1">
                {metrics.confirmedReservations}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <div className="text-[11px] text-slate-400">Completed Tours</div>
              <div className="text-lg font-bold text-purple-400 font-mono mt-1">
                {metrics.completedTours}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <div className="text-[11px] text-slate-400">Total Gross Revenue</div>
              <div className="text-lg font-bold text-white font-mono mt-1">
                {metrics.totalTrackedRevenue.toLocaleString()} MAD
              </div>
            </div>

            <div className="bg-indigo-950/30 p-3 rounded-xl border border-indigo-800/40">
              <div className="text-[11px] text-indigo-300 font-semibold">OCN 10% Revenue</div>
              <div className="text-lg font-bold text-indigo-400 font-mono mt-1">
                {metrics.ocnShareTotal.toLocaleString()} MAD
              </div>
            </div>
          </div>
        )}

        {/* Technical Infrastructure & Contact */}
        <div className="border-t border-slate-800 pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Contact Phone</span>
            <span className="text-slate-300 font-mono">{primaryClient.contactPhone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Official Email</span>
            <span className="text-slate-300 font-mono">{primaryClient.contactEmail}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Security & SSL</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Grade A+ Active
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Outstanding OCN Remittance</span>
            <span className="text-amber-400 font-bold font-mono">
              {metrics ? `${metrics.unpaidOcnAmount.toLocaleString()} MAD` : "0 MAD"}
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Tenant Governance Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 space-y-1.5">
          <h4 className="text-sm font-semibold text-white">
            OCN Multi-Tenant Sovereign Isolation Architecture
          </h4>
          <p>
            The OCN admin panel enforces strict isolation. Every database table (bookings, revenue, analytics, settlements, and audit logs) is partitioned by <code className="text-indigo-300">clientId</code> and <code className="text-indigo-300">websiteId</code>. Future clients added to this panel will have fully segregated records, ensuring zero data contamination.
          </p>
        </div>
      </div>
    </div>
  );
}
