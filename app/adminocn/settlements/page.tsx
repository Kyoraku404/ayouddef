"use client";

import React, { useState, useEffect } from "react";
import {
  Landmark,
  DollarSign,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  CreditCard,
  RefreshCw,
  Calendar,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { OcnSettlementRecord } from "@/lib/ocn-types";

export default function OcnSettlementsPage() {
  const [settlements, setSettlements] = useState<OcnSettlementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSettlement, setSelectedSettlement] = useState<OcnSettlementRecord | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchSettlements = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ocn/settlements");
      if (res.ok) {
        const data = await res.json();
        setSettlements(data.settlements || []);
      }
    } catch (err) {
      console.error("Failed to load settlements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, []);

  const openPaymentModal = (s: OcnSettlementRecord) => {
    setSelectedSettlement(s);
    setPaymentAmount(String(s.balanceDue));
    setPaymentRef(`WIRE-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`);
    setIsPaymentModalOpen(true);
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSettlement || !paymentAmount) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/ocn/settlements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSettlement.id,
          paymentAmount: parseFloat(paymentAmount),
          reference: paymentRef,
        }),
      });

      if (res.ok) {
        setIsPaymentModalOpen(false);
        fetchSettlements();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to record payment");
      }
    } catch {
      alert("Error recording settlement payment");
    } finally {
      setSubmitting(false);
    }
  };

  const totalOcnEarned = settlements.reduce((sum, s) => sum + s.ocnShare, 0);
  const totalAmountPaid = settlements.reduce((sum, s) => sum + s.amountPaid, 0);
  const totalBalanceDue = settlements.reduce((sum, s) => sum + s.balanceDue, 0);

  const h1 = settlements.find((s) => s.period === "2026-H1");
  const h2 = settlements.find((s) => s.period === "2026-H2");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Bi-Annual Contract Reconciliation
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Financial Dashboard & Settlements
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Governing Account: <strong className="text-white">Marrakeshi Tour Guide by Zaky</strong> • 10% Defined Revenue Participation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/ocn/settlements?format=csv"
            download
            className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            Export CSV
          </a>
          <button
            onClick={fetchSettlements}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total OCN 10% Accrued</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {totalOcnEarned.toLocaleString()} MAD
          </div>
          <div className="text-xs text-slate-400 mt-1">Lifetime earned share</div>
        </div>

        <div className="bg-slate-900/80 border border-emerald-500/20 bg-emerald-500/5 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-emerald-300">Total Settled & Received</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {totalAmountPaid.toLocaleString()} MAD
          </div>
          <div className="text-xs text-emerald-400/80 mt-1">Deposited into OCN treasury</div>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/20 bg-amber-500/5 p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium text-amber-300">Outstanding Balance Due</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">
            {totalBalanceDue.toLocaleString()} MAD
          </div>
          <div className="text-xs text-amber-400/80 mt-1">Pending client wire remittance</div>
        </div>
      </div>

      {/* H1 & H2 Period Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 2026-H1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Cycle: Jan 1 – Jun 30, 2026
              </span>
              <h3 className="text-lg font-bold text-white">Period 2026-H1</h3>
            </div>
            {h1 && (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  h1.status === "PAID"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {h1.status}
              </span>
            )}
          </div>

          {h1 ? (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">H1 Gross Revenue</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {h1.grossRevenue.toLocaleString()} MAD
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">H1 OCN Share (10%)</div>
                <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">
                  {h1.ocnShare.toLocaleString()} MAD
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">Amount Paid</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {h1.amountPaid.toLocaleString()} MAD
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">Balance Due</div>
                <div className="text-base font-bold text-slate-200 font-mono mt-0.5">
                  {h1.balanceDue.toLocaleString()} MAD
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">No data for 2026-H1</div>
          )}

          {h1 && h1.paymentReference && (
            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-1">
              <span>Settlement Ref: {h1.paymentReference}</span>
              <span>{h1.settledAt ? new Date(h1.settledAt).toLocaleDateString() : ""}</span>
            </div>
          )}
        </div>

        {/* 2026-H2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Cycle: Jul 1 – Dec 31, 2026 (Active)
              </span>
              <h3 className="text-lg font-bold text-white">Period 2026-H2</h3>
            </div>
            {h2 && (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  h2.status === "PAID"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : h2.status === "PARTIAL"
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {h2.status}
              </span>
            )}
          </div>

          {h2 ? (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">H2 Gross Revenue</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {h2.grossRevenue.toLocaleString()} MAD
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">H2 OCN Share (10%)</div>
                <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">
                  {h2.ocnShare.toLocaleString()} MAD
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">Amount Paid</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {h2.amountPaid.toLocaleString()} MAD
                </div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg">
                <div className="text-slate-400">Balance Due</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
                  {h2.balanceDue.toLocaleString()} MAD
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">No data for 2026-H2</div>
          )}

          {h2 && h2.balanceDue > 0 && (
            <div className="pt-2">
              <button
                onClick={() => openPaymentModal(h2)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Record Settlement Wire Remittance
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Historical Settlements Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Settlement Ledger History
            </h3>
            <p className="text-xs text-slate-400">Formal contractual reconciliation events</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Currency: Moroccan Dirham (MAD)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Client ID</th>
                <th className="py-3 px-4 text-right">Gross Volume</th>
                <th className="py-3 px-4 text-right text-indigo-400 font-bold">OCN 10% Due</th>
                <th className="py-3 px-4 text-right text-emerald-400">Paid</th>
                <th className="py-3 px-4 text-right text-amber-400">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white text-[11px]">
                    {s.period}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {s.clientId}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-200">
                    {s.grossRevenue.toLocaleString()} MAD
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-400 bg-indigo-500/5">
                    {s.ocnShare.toLocaleString()} MAD
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-400">
                    {s.amountPaid.toLocaleString()} MAD
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-amber-400">
                    {s.balanceDue.toLocaleString()} MAD
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        s.status === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : s.status === "PARTIAL"
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    {s.paymentReference || "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {s.balanceDue > 0 ? (
                      <button
                        onClick={() => openPaymentModal(s)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors"
                      >
                        Settle
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500">Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD SETTLEMENT PAYMENT MODAL */}
      {isPaymentModalOpen && selectedSettlement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Record Settlement Remittance
              </h3>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
              <div className="text-slate-400">
                Period: <strong className="text-white">{selectedSettlement.period}</strong>
              </div>
              <div className="text-slate-400">
                Total OCN 10% Share: <strong className="text-indigo-400">{selectedSettlement.ocnShare} MAD</strong>
              </div>
              <div className="text-slate-400">
                Already Paid: <strong className="text-emerald-400">{selectedSettlement.amountPaid} MAD</strong>
              </div>
              <div className="text-slate-400">
                Outstanding Balance: <strong className="text-amber-400">{selectedSettlement.balanceDue} MAD</strong>
              </div>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Payment Amount (MAD) *
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bank Reference / Wire Number *
                </label>
                <input
                  type="text"
                  required
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {submitting ? "Recording..." : "Confirm Remittance & Audit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
