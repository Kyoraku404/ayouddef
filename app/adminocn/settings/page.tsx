"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  ShieldCheck,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  Server,
  Database,
  RefreshCw,
} from "lucide-react";

export default function OcnSettingsPage() {
  const [currentUser, setCurrentUser] = useState("ocnadmin");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/ocn/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user?.username) {
          setCurrentUser(data.user.username);
        }
      })
      .catch(() => {});
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ocn/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Password updated successfully. Changes are now active." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
          OCN Infrastructure & Security
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
          System Settings & Credentials
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage Administrator Access, Authentication Tokens, and Sovereign Security Safeguards
        </p>
      </div>

      {/* Password Change Form Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Administrator Credentials</h2>
            <p className="text-xs text-slate-400">
              Active account: <strong className="text-slate-200 font-mono">{currentUser}</strong> (OCN Sovereign Admin)
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            {loading ? "Updating..." : "Update Administrator Password"}
          </button>
        </form>
      </div>

      {/* Security Baseline Audit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Security & Authentication Baseline
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Password Storage:</span>
              <span className="font-mono text-emerald-400 font-semibold">Bcrypt (Cost 12) Hash</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Authentication Token:</span>
              <span className="font-mono text-emerald-400 font-semibold">HTTP-Only SameSite Cookie</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Brute-Force Lockout:</span>
              <span className="font-mono text-indigo-400 font-semibold">5 Attempts / 15m Lock</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Session Expiration:</span>
              <span className="font-mono text-slate-200 font-semibold">8 Hours Inactivity</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Client Separation:</span>
              <span className="font-mono text-emerald-400 font-semibold">Strict Tenant Scoping</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
            <Server className="w-4 h-4 text-indigo-400" />
            Platform & Architecture Status
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Framework:</span>
              <span className="font-mono text-white">Next.js App Router</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Language:</span>
              <span className="font-mono text-white">TypeScript Strict Mode</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Storage Engine:</span>
              <span className="font-mono text-indigo-400">PostgreSQL / Prisma Parity</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Client Domain:</span>
              <span className="font-mono text-emerald-400">marrakeshitourguide.com</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Client Legal Name:</span>
              <span className="font-mono text-slate-200">Mohamed Zaky Bentabaa</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
