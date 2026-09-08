"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Clock,
  User,
  FileCode,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  DollarSign,
  CalendarCheck,
  History,
} from "lucide-react";
import { OcnAuditRecord, OcnAuditAction } from "@/lib/ocn-types";

export default function OcnAuditLogsPage() {
  const [logs, setLogs] = useState<OcnAuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionCategory, setActionCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ocn/audit-logs?limit=100");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    // category filter
    if (actionCategory === "AUTH" && !log.action.includes("LOGIN") && !log.action.includes("LOGOUT") && !log.action.includes("PASSWORD")) {
      return false;
    }
    if (actionCategory === "BOOKING" && !log.action.includes("BOOKING")) {
      return false;
    }
    if (actionCategory === "REVENUE" && !log.action.includes("REVENUE") && !log.action.includes("REFUND")) {
      return false;
    }
    if (actionCategory === "SETTLEMENT" && !log.action.includes("SETTLEMENT")) {
      return false;
    }

    // search query
    const q = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) ||
      log.entityType.toLowerCase().includes(q) ||
      (log.entityId && log.entityId.toLowerCase().includes(q)) ||
      log.performedBy.toLowerCase().includes(q)
    );
  });

  const getActionBadge = (action: OcnAuditAction) => {
    if (action.includes("CORRECTION")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
          <History className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("REVENUE")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
          <DollarSign className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("BOOKING")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono">
          <CalendarCheck className="w-3 h-3" />
          {action}
        </span>
      );
    }
    if (action.includes("LOGIN") || action.includes("AUTH") || action.includes("PASSWORD")) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full font-mono">
          <KeyRound className="w-3 h-3" />
          {action}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full font-mono">
        {action}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Immutable Chronological Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            System & Financial Audit Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-Evident Record of Every Administrative, Booking, and Revenue Mutation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLogs}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Immutability Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 space-y-1">
          <strong className="text-white block">OCN Ledger Immutability Protocol</strong>
          <p>
            Audit records are append-only. No deletion or back-in-place update queries are permitted. Financial corrections spawn new explicit correction events rather than overwriting historical financial states, providing full legal defensibility.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs overflow-x-auto w-full md:w-auto">
          {[
            { id: "ALL", label: "All Events" },
            { id: "AUTH", label: "Authentication" },
            { id: "BOOKING", label: "Bookings" },
            { id: "REVENUE", label: "Revenue & Ledger" },
            { id: "SETTLEMENT", label: "Settlements" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActionCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                actionCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action or entity ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
            Loading audit trails...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            No audit records matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-3 px-4">Log ID & Time</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">Target Entity ID</th>
                  <th className="py-3 px-4">Admin Actor</th>
                  <th className="py-3 px-4 text-right">Details Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLogs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr
                        className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                          isExpanded ? "bg-slate-800/50" : ""
                        }`}
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      >
                        <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                          <div>{log.id}</div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(log.createdAt).toLocaleString()}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {getActionBadge(log.action)}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                          {log.entityType}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-indigo-400 text-[11px]">
                          {log.entityId || "—"}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          <span className="inline-flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                            <User className="w-3 h-3 text-slate-400" />
                            {log.performedBy}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedLogId(isExpanded ? null : log.id);
                            }}
                            className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                          >
                            {isExpanded ? "Hide JSON" : "Inspect"}
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-slate-950/80 border-b border-slate-800">
                          <td colSpan={6} className="p-4">
                            <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                              <span>Structured Audit Payload (JSON):</span>
                              {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                            </div>
                            <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300 text-[11px] font-mono overflow-x-auto">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
