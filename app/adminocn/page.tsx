"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Globe,
  Eye,
  MousePointer,
  MessageCircle,
  Clock,
  CheckCircle2,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  RefreshCw,
  Percent,
} from "lucide-react";
import { OcnOverviewMetrics } from "@/lib/ocn-types";

interface FunnelStep {
  stage: string;
  count: number;
  rate: string;
  isCurrency?: boolean;
}

export default function OcnOverviewPage() {
  const [metrics, setMetrics] = useState<OcnOverviewMetrics | null>(null);
  const [funnel, setFunnel] = useState<FunnelStep[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentRevenue, setRecentRevenue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ocn/overview");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
        setFunnel(data.funnel || []);
        setRecentBookings(data.recentBookings || []);
        setRecentRevenue(data.recentRevenue || []);
      }
    } catch (err) {
      console.error("Failed to load overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400 text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        <span>Loading OCN Executive Metrics...</span>
      </div>
    );
  }

  const kpis = [
    { label: "Total Clients", val: metrics.totalClients, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Active Websites", val: metrics.totalWebsites, icon: Globe, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { label: "Total Visitors", val: metrics.totalVisitors.toLocaleString(), icon: Eye, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Total Page Views", val: metrics.totalPageviews.toLocaleString(), icon: Eye, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Total Site Clicks", val: metrics.totalClicks.toLocaleString(), icon: MousePointer, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "WhatsApp Clicks", val: metrics.whatsappClicks.toLocaleString(), icon: MessageCircle, color: "text-[#25D366]", bg: "bg-[#25D366]/10", border: "border-[#25D366]/20" },
    { label: "Reservation Leads", val: metrics.totalLeads, icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { label: "Confirmed Bookings", val: metrics.confirmedReservations, icon: CheckCircle2, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
    { label: "Completed Tours", val: metrics.completedTours, icon: CalendarCheck, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Tracked Revenue", val: `${metrics.totalTrackedRevenue.toLocaleString()} MAD`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "OCN 10% Share", val: `${metrics.ocnShareTotal.toLocaleString()} MAD`, icon: Percent, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { label: "Unpaid OCN Balance", val: `${metrics.unpaidOcnAmount.toLocaleString()} MAD`, icon: AlertCircle, color: metrics.unpaidOcnAmount > 0 ? "text-amber-400" : "text-slate-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Multi-Tenant Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Executive Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Governing <strong className="text-slate-200">Marrakeshi Tour Guide by Zaky</strong> • 70% Client / 30% OCN Ownership • 10% Revenue Share
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchOverview}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all text-slate-300 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>

          <Link
            href="/adminocn/settlements"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-900/30 flex items-center gap-1.5"
          >
            <span>View Financials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 12 Key Performance Indicator Cards Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            1. Core Business Indicators
          </h2>
          <span className="text-xs text-slate-500">12 Tracked Metrics</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400 truncate pr-2">
                    {kpi.label}
                  </span>
                  <div className={`p-2 rounded-xl ${kpi.bg} border ${kpi.border} ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold tracking-tight text-white truncate">
                  {kpi.val}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6-Stage Booking & Revenue Funnel Visualization */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Revenue Verification Logic
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              WhatsApp Conversion & Revenue Funnel
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              WhatsApp clicks do NOT automatically record revenue. Only verified, completed tours generate defined revenue.
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            OCN Cut: 10%
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {funnel.map((step, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between"
            >
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                Step {idx + 1}
              </div>
              <div className="text-xs font-semibold text-slate-300 leading-snug mb-3">
                {step.stage}
              </div>
              <div className="text-lg font-bold text-white">
                {step.isCurrency ? `${step.count.toLocaleString()} MAD` : step.count.toLocaleString()}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-emerald-400 font-mono flex items-center justify-between">
                <span>Conv.</span>
                <span className="font-bold">{step.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2-Column Split: Recent Bookings & Verified Revenue Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-indigo-400" />
                <span>Recent Bookings</span>
              </h3>
              <Link
                href="/adminocn/bookings"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 max-w-[240px] truncate">
                    <div className="font-semibold text-white truncate">{b.customerName}</div>
                    <div className="text-slate-400 truncate text-[11px]">{b.serviceTitle}</div>
                    <div className="text-slate-500 text-[10px] font-mono">Date: {b.bookingDate} • {b.partySize} guests</div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase ${
                        b.status === "COMPLETED"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : b.status === "ACCEPTED"
                          ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Lead: {b.whatsappLeadStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Revenue Ledger */}
        <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Verified Revenue & 10% OCN Share</span>
              </h3>
              <Link
                href="/adminocn/revenue"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              >
                <span>Full Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentRevenue.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 max-w-[220px] truncate">
                    <div className="font-semibold text-white truncate">{r.serviceTitle}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Period: {r.period}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Gross: {r.grossAmount.toLocaleString()} MAD
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      +{(r.ocnShare || 0).toLocaleString()} MAD
                    </div>
                    <div className="text-[10px] text-indigo-300 font-mono font-semibold">
                      OCN 10% Share
                    </div>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold uppercase ${
                        r.settlementStatus === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {r.settlementStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
