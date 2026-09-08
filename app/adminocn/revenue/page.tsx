"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  RefreshCw,
  Search,
  Filter,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  FileEdit,
  History,
  Percent,
} from "lucide-react";
import { OcnRevenueRecord, OcnPeriod } from "@/lib/ocn-types";

interface RevenueSummary {
  totalGross: number;
  totalRefund: number;
  totalFees: number;
  totalDefined: number;
  totalOcnShare: number;
  totalClientShare: number;
}

export default function OcnRevenuePage() {
  const [revenueList, setRevenueList] = useState<OcnRevenueRecord[]>([]);
  const [summary, setSummary] = useState<RevenueSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [periodFilter, setPeriodFilter] = useState<OcnPeriod | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Correction Modal state
  const [selectedTx, setSelectedTx] = useState<OcnRevenueRecord | null>(null);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionReason, setCorrectionReason] = useState("");
  const [corrGross, setCorrGross] = useState("");
  const [corrRefund, setCorrRefund] = useState("0");
  const [corrFees, setCorrFees] = useState("0");

  // New Revenue Transaction Modal state
  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false);
  const [newService, setNewService] = useState("");
  const [newGross, setNewGross] = useState("");
  const [newRefund, setNewRefund] = useState("0");
  const [newFees, setNewFees] = useState("0");
  const [newPeriod, setNewPeriod] = useState<OcnPeriod>("2026-H2");

  const [submitting, setSubmitting] = useState(false);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ocn/revenue?period=${periodFilter}`);
      if (res.ok) {
        const data = await res.json();
        setRevenueList(data.revenue || []);
        setSummary(data.summary || null);
      }
    } catch (err) {
      console.error("Failed to load revenue:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [periodFilter]);

  const openCorrectionModal = (tx: OcnRevenueRecord) => {
    setSelectedTx(tx);
    setCorrectionReason("");
    setCorrGross(String(tx.grossAmount));
    setCorrRefund(String(tx.refundAmount));
    setCorrFees(String(tx.processingFees));
    setIsCorrectionModalOpen(true);
  };

  const handleCreateCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTx || !correctionReason || !corrGross) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/ocn/revenue", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalTransactionId: selectedTx.id,
          reason: correctionReason,
          correctedGross: parseFloat(corrGross),
          correctedRefund: parseFloat(corrRefund) || 0,
          correctedFees: parseFloat(corrFees) || 0,
        }),
      });

      if (res.ok) {
        setIsCorrectionModalOpen(false);
        fetchRevenue();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to record correction");
      }
    } catch {
      alert("Error processing correction");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/ocn/revenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: "client_zaky",
          websiteId: "marrakeshitourguide",
          clientName: "Marrakeshi Tour Guide by Zaky",
          serviceTitle: newService,
          grossAmount: parseFloat(newGross),
          refundAmount: parseFloat(newRefund) || 0,
          processingFees: parseFloat(newFees) || 0,
          period: newPeriod,
        }),
      });

      if (res.ok) {
        setIsNewTxModalOpen(false);
        setNewService("");
        setNewGross("");
        fetchRevenue();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create transaction");
      }
    } catch {
      alert("Error creating transaction");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRevenue = revenueList.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      r.serviceTitle.toLowerCase().includes(q) ||
      (r.bookingId && r.bookingId.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Server-Calculated Sovereign Accounting
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Revenue & Ledger Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Contract Participation: <strong className="text-white">10% OCN Defined Revenue Share</strong> • Client: Marrakeshi Tour Guide by Zaky
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewTxModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Record Transaction
          </button>
          <button
            onClick={fetchRevenue}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Funnel & Immutability Rules Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-slate-300">
            <strong className="text-white block">WhatsApp Verification Funnel</strong>
            Visitor → WhatsApp Click → Lead → Confirmed Reservation → Completed Tour → Revenue. Only verified completed tours are recognized in financial balance.
          </div>
        </div>
        <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
          <History className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-slate-300">
            <strong className="text-white block">Immutable Financial Corrections</strong>
            Original financial records are strictly never overwritten. Any adjustments spawn a new signed correction record linked back to the original entry.
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Gross Tracked</div>
            <div className="text-xl font-bold text-white font-mono">
              {summary.totalGross.toLocaleString()} MAD
            </div>
            <div className="text-[11px] text-slate-400 mt-1">100% Topline tours</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Refunds & Fees</div>
            <div className="text-xl font-bold text-amber-400 font-mono">
              {(summary.totalRefund + summary.totalFees).toLocaleString()} MAD
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Deducted before split</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Net Defined Revenue</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">
              {summary.totalDefined.toLocaleString()} MAD
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Subject to 10% share</div>
          </div>

          <div className="bg-slate-900/80 border border-indigo-500/30 bg-indigo-500/5 p-4 rounded-xl">
            <div className="text-xs text-indigo-300 font-semibold mb-1 flex items-center justify-between">
              <span>OCN 10% Share</span>
              <Percent className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-indigo-400 font-mono">
              {summary.totalOcnShare.toLocaleString()} MAD
            </div>
            <div className="text-[11px] text-indigo-300/80 mt-1">Strict server calc</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Client 90% Share</div>
            <div className="text-xl font-bold text-slate-200 font-mono">
              {summary.totalClientShare.toLocaleString()} MAD
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Mohamed Zaky share</div>
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          {(["ALL", "2026-H1", "2026-H2"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriodFilter(p)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                periodFilter === p
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {p === "ALL" ? "All Periods" : p}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by ID or tour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
            Loading financial ledger...
          </div>
        ) : filteredRevenue.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            No transactions found for the selected period.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-3 px-4">Tx ID</th>
                  <th className="py-3 px-4">Service & Tour</th>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4 text-right">Gross</th>
                  <th className="py-3 px-4 text-right">Refund / Fee</th>
                  <th className="py-3 px-4 text-right">Defined Net</th>
                  <th className="py-3 px-4 text-right text-indigo-400 font-bold">OCN 10%</th>
                  <th className="py-3 px-4 text-right">Client 90%</th>
                  <th className="py-3 px-4 text-center">Settlement</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRevenue.map((tx) => (
                  <tr
                    key={tx.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      tx.isCorrection ? "bg-amber-500/5" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                      <div>{tx.id}</div>
                      {tx.bookingId && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Ref: {tx.bookingId}
                        </div>
                      )}
                      {tx.isCorrection && (
                        <span className="inline-block mt-0.5 text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded">
                          CORRECTION
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-200">
                      <div className="font-medium">{tx.serviceTitle}</div>
                      {tx.correctionReason && (
                        <div className="text-[10px] text-amber-300/80 italic mt-0.5">
                          Reason: {tx.correctionReason} (Orig: {tx.originalTransactionId})
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {tx.period}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-white">
                      {tx.grossAmount.toLocaleString()} MAD
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                      {(tx.refundAmount + tx.processingFees) > 0 ? (
                        <span className="text-amber-400">
                          -{(tx.refundAmount + tx.processingFees).toLocaleString()} MAD
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">
                      {tx.definedRevenue.toLocaleString()} MAD
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-400 bg-indigo-500/5">
                      {tx.ocnShare.toLocaleString()} MAD
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {tx.clientShare.toLocaleString()} MAD
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          tx.settlementStatus === "PAID"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : tx.settlementStatus === "PARTIAL"
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {tx.settlementStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {!tx.isCorrection && (
                        <button
                          onClick={() => openCorrectionModal(tx)}
                          className="px-2 py-1 text-[11px] text-indigo-300 hover:text-indigo-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors"
                          title="Record immutable correction"
                        >
                          Correct
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RECORD FINANCIAL CORRECTION MODAL */}
      {isCorrectionModalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Record Financial Correction</h3>
                <p className="text-[11px] text-amber-400 font-mono">
                  Immutable record for {selectedTx.id}
                </p>
              </div>
              <button
                onClick={() => setIsCorrectionModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
              <div className="text-slate-400">
                Original Gross: <strong className="text-white">{selectedTx.grossAmount} MAD</strong>
              </div>
              <div className="text-slate-400">
                Original OCN Share (10%): <strong className="text-indigo-400">{selectedTx.ocnShare} MAD</strong>
              </div>
            </div>

            <form onSubmit={handleCreateCorrection} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Correction Reason (Audit Mandated) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Client negotiated 10% discount for repeat family tour"
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Corrected Gross Amount (MAD) *
                </label>
                <input
                  type="number"
                  required
                  value={corrGross}
                  onChange={(e) => setCorrGross(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Refund Amount
                  </label>
                  <input
                    type="number"
                    value={corrRefund}
                    onChange={(e) => setCorrRefund(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Processing Fees
                  </label>
                  <input
                    type="number"
                    value={corrFees}
                    onChange={(e) => setCorrFees(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                The server will calculate new OCN 10% share and client 90% share automatically, adding an immutable audit entry.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCorrectionModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {submitting ? "Processing..." : "Commit Correction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD NEW DIRECT TRANSACTION MODAL */}
      {isNewTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Record Verified Revenue</h3>
              <button
                onClick={() => setIsNewTxModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service / Tour *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marrakesh Medina, Souks & Heritage Experience"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gross (MAD) *</label>
                  <input
                    type="number"
                    required
                    placeholder="700"
                    value={newGross}
                    onChange={(e) => setNewGross(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Period</label>
                  <select
                    value={newPeriod}
                    onChange={(e) => setNewPeriod(e.target.value as OcnPeriod)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value="2026-H2">2026-H2</option>
                    <option value="2026-H1">2026-H1</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Refund Amount</label>
                  <input
                    type="number"
                    value={newRefund}
                    onChange={(e) => setNewRefund(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Processing Fees</label>
                  <input
                    type="number"
                    value={newFees}
                    onChange={(e) => setNewFees(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewTxModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {submitting ? "Recording..." : "Record Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
