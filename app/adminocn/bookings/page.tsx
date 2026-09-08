"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageCircle,
  User,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { OcnBookingRecord, OcnBookingStatus, OcnWhatsAppLeadStatus } from "@/lib/ocn-types";

export default function OcnBookingsPage() {
  const [bookings, setBookings] = useState<OcnBookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OcnBookingStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<OcnBookingRecord | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form states for status update
  const [editStatus, setEditStatus] = useState<OcnBookingStatus>("PENDING");
  const [editLeadStatus, setEditLeadStatus] = useState<OcnWhatsAppLeadStatus>("CLICKED");
  const [editRevenue, setEditRevenue] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // Form state for creating new booking
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newServiceTitle, setNewServiceTitle] = useState("Marrakesh Medina, Souks & Heritage Experience");
  const [newBookingDate, setNewBookingDate] = useState("");
  const [newPartySize, setNewPartySize] = useState(2);
  const [newRevenueAmount, setNewRevenueAmount] = useState("700");
  const [newStatus, setNewStatus] = useState<OcnBookingStatus>("PENDING");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ocn/bookings?status=${statusFilter}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const openUpdateModal = (b: OcnBookingRecord) => {
    setSelectedBooking(b);
    setEditStatus(b.status);
    setEditLeadStatus(b.whatsappLeadStatus);
    setEditRevenue(b.revenueAmount ? String(b.revenueAmount) : "");
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/ocn/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedBooking.id,
          status: editStatus,
          whatsappLeadStatus: editLeadStatus,
          revenueAmount: editRevenue ? parseFloat(editRevenue) : undefined,
        }),
      });

      if (res.ok) {
        setIsUpdateModalOpen(false);
        fetchBookings();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update booking");
      }
    } catch (err) {
      alert("Error updating booking status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/ocn/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: "client_zaky",
          websiteId: "marrakeshitourguide",
          customerName: newCustomerName,
          customerEmail: newCustomerEmail,
          customerPhone: newCustomerPhone,
          serviceTitle: newServiceTitle,
          bookingDate: newBookingDate,
          partySize: newPartySize,
          status: newStatus,
          whatsappLeadStatus: "CONVERTED",
          revenueAmount: newRevenueAmount ? parseFloat(newRevenueAmount) : 0,
        }),
      });

      if (res.ok) {
        setIsNewModalOpen(false);
        // reset
        setNewCustomerName("");
        setNewCustomerEmail("");
        setNewCustomerPhone("");
        fetchBookings();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create booking");
      }
    } catch (err) {
      alert("Error creating booking");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.customerName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.serviceTitle.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: OcnBookingStatus) => {
    switch (status) {
      case "COMPLETED":
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case "ACCEPTED":
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> Accepted</span>;
      case "PENDING":
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" /> Pending</span>;
      case "CANCELLED":
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" /> Cancelled</span>;
      case "REJECTED":
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  const getLeadBadge = (lead: OcnWhatsAppLeadStatus) => {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2 py-0.5 rounded-sm">
        <MessageCircle className="w-2.5 h-2.5" />
        {lead}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Reservation Verification Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Bookings & Reservations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Client: <strong className="text-slate-200">Marrakeshi Tour Guide by Zaky</strong> • Funnel Step 4 & 5 Verification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Record Booking
          </button>
          <button
            onClick={fetchBookings}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Funnel Notice Alert */}
      <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-4 text-xs text-indigo-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">WhatsApp Lead & Revenue Funnel Compliance</strong>
          A WhatsApp click alone does <span className="underline font-semibold">not</span> record revenue. Only reservations confirmed and marked as <strong className="text-white">COMPLETED</strong> will flow into the OCN 10% financial ledger.
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center overflow-x-auto w-full md:w-auto bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          {(["ALL", "PENDING", "ACCEPTED", "COMPLETED", "CANCELLED", "REJECTED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by customer or tour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Table of Bookings */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
            Loading reservations...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            No bookings found matching the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-3 px-4">Reservation ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Tour / Service</th>
                  <th className="py-3 px-4">Tour Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">WhatsApp Lead</th>
                  <th className="py-3 px-4 text-right">Gross Revenue</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                      {b.id}
                      <div className="text-[10px] text-slate-500">{new Date(b.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{b.customerName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        {b.customerPhone && <span>{b.customerPhone}</span>}
                        {b.partySize && <span>({b.partySize} guests)</span>}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-[220px] truncate">
                      {b.serviceTitle}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                      {b.bookingDate}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(b.status)}
                    </td>
                    <td className="py-3.5 px-4">
                      {getLeadBadge(b.whatsappLeadStatus)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-white">
                      {b.revenueAmount ? `${b.revenueAmount.toLocaleString()} MAD` : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openUpdateModal(b)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-indigo-200 border border-slate-700 rounded-md transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* UPDATE STATUS MODAL */}
      {isUpdateModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Manage Reservation {selectedBooking.id}
              </h3>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div>Customer: <strong className="text-white">{selectedBooking.customerName}</strong></div>
              <div>Service: <strong className="text-white">{selectedBooking.serviceTitle}</strong></div>
              <div>Date: <strong className="text-white">{selectedBooking.bookingDate}</strong></div>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Reservation Lifecycle Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as OcnBookingStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="PENDING">PENDING (Awaiting confirmation)</option>
                  <option value="ACCEPTED">ACCEPTED (Confirmed with guest)</option>
                  <option value="COMPLETED">COMPLETED (Tour finished - Revenue recorded)</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp Funnel Stage
                </label>
                <select
                  value={editLeadStatus}
                  onChange={(e) => setEditLeadStatus(e.target.value as OcnWhatsAppLeadStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="CLICKED">CLICKED (User clicked WhatsApp icon)</option>
                  <option value="INITIATED">INITIATED (Greeting sent)</option>
                  <option value="CHATTING">CHATTING (Discussing dates & group size)</option>
                  <option value="QUOTE_SENT">QUOTE_SENT (Pricing provided)</option>
                  <option value="CONVERTED">CONVERTED (Booking agreed)</option>
                  <option value="ABANDONED">ABANDONED (No response / dropped)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Revenue Amount (MAD)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 700"
                  value={editRevenue}
                  onChange={(e) => setEditRevenue(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  When marked COMPLETED, this amount automatically posts to the OCN 10% revenue ledger.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Status & Audit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE BOOKING MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Record Verified Booking</h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Charlotte Dubois"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Phone</label>
                  <input
                    type="text"
                    placeholder="+33 6 12 34 56 78"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Email</label>
                  <input
                    type="email"
                    placeholder="guest@domain.com"
                    value={newCustomerEmail}
                    onChange={(e) => setNewCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tour / Experience *</label>
                <select
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Marrakesh Medina, Souks & Heritage Experience">Marrakesh Medina, Souks & Heritage Experience</option>
                  <option value="Marrakesh Souks & Local Markets Experience">Marrakesh Souks & Local Markets Experience</option>
                  <option value="Marrakesh Historical & Cultural Heritage Tour">Marrakesh Historical & Cultural Heritage Tour</option>
                  <option value="Authentic Marrakesh Street Food Tour">Authentic Marrakesh Street Food Tour</option>
                  <option value="Marrakesh By Night Tour">Marrakesh By Night Tour</option>
                  <option value="Day Trip: Atlas Mountains & Berber Villages">Day Trip: Atlas Mountains & Berber Villages</option>
                  <option value="Day Trip: Ourika Valley & Waterfalls">Day Trip: Ourika Valley & Waterfalls</option>
                  <option value="Day Trip: Essaouira Coastal Experience">Day Trip: Essaouira Coastal Experience</option>
                  <option value="Marrakesh Private Signature Experience (7 Days)">Marrakesh Private Signature Experience (7 Days)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newBookingDate}
                    onChange={(e) => setNewBookingDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newPartySize}
                    onChange={(e) => setNewPartySize(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gross (MAD)</label>
                  <input
                    type="number"
                    value={newRevenueAmount}
                    onChange={(e) => setNewRevenueAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OcnBookingStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="COMPLETED">COMPLETED (Enters revenue ledger)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Record Verified Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
