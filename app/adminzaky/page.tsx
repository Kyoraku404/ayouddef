"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SiteImageItem {
  id: string;
  slotKey: string;
  label: string;
  url: string;
  alt: string | null;
  caption: string | null;
  section: string;
  sortOrder: number;
}

interface ReservationItem {
  id: string;
  bookingRef: string;
  fullName: string;
  email: string;
  phone: string;
  tourSlug: string;
  tourName: string;
  date: string;
  guestsCount: number;
  totalPriceMad: number | null;
  status: string;
  createdAt: string;
  specialRequests?: string | null;
}

export default function ZakyAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"images" | "reservations">("images");
  const [images, setImages] = useState<SiteImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>("ALL");
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ url: string; alt: string; caption: string }>({
    url: "",
    alt: "",
    caption: "",
  });
  const [savingSlot, setSavingSlot] = useState(false);
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Reservations state
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [resStatusFilter, setResStatusFilter] = useState<string>("ALL");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const targetUploadSlotRef = useRef<string | null>(null);

  const notify = (msg: string, type: "success" | "error" = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Load images from database
  const loadImages = async () => {
    setLoadingImages(true);
    try {
      const res = await fetch("/api/adminzaky/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      } else {
        notify("Failed to load images from database", "error");
      }
    } catch {
      notify("Network error loading images", "error");
    } finally {
      setLoadingImages(false);
    }
  };

  // Load reservations from database
  const loadReservations = async () => {
    setLoadingReservations(true);
    try {
      const res = await fetch("/api/adminzaky/reservations");
      if (res.ok) {
        const data = await res.json();
        setReservations(data.reservations || []);
      }
    } catch {
      console.error("Error loading reservations");
    } finally {
      setLoadingReservations(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (activeTab === "reservations") {
      loadReservations();
    }
  }, [activeTab]);

  // Handle file upload
  const triggerFileUpload = (slotKey: string) => {
    targetUploadSlotRef.current = slotKey;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const slotKey = targetUploadSlotRef.current;
    if (!file || !slotKey) return;

    setUploadingSlot(slotKey);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slotKey", slotKey);

    try {
      const res = await fetch("/api/adminzaky/images/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      // Update state locally
      setImages((prev) =>
        prev.map((img) => (img.slotKey === slotKey ? { ...img, url: data.url } : img))
      );
      notify(`Photo for "${slotKey}" successfully uploaded and saved to database!`);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Upload error", "error");
    } finally {
      setUploadingSlot(null);
      targetUploadSlotRef.current = null;
    }
  };

  // Start editing slot details
  const startEdit = (img: SiteImageItem) => {
    setEditingSlot(img.slotKey);
    setEditForm({
      url: img.url,
      alt: img.alt || "",
      caption: img.caption || "",
    });
  };

  // Save edited slot details
  const handleSaveEdit = async (slotKey: string) => {
    setSavingSlot(true);
    try {
      const res = await fetch("/api/adminzaky/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotKey,
          url: editForm.url,
          alt: editForm.alt,
          caption: editForm.caption,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setImages((prev) =>
        prev.map((img) => (img.slotKey === slotKey ? { ...img, ...editForm } : img))
      );
      setEditingSlot(null);
      notify("Image details updated and saved to PostgreSQL!");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Update failed", "error");
    } finally {
      setSavingSlot(false);
    }
  };

  // Update reservation status
  const handleUpdateResStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/adminzaky/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        notify(`Reservation updated to ${newStatus}`);
      } else {
        notify("Failed to update reservation", "error");
      }
    } catch {
      notify("Network error updating reservation", "error");
    }
  };

  // Extract unique sections
  const sections = Array.from(new Set(images.map((i) => i.section)));
  const filteredImages =
    selectedSection === "ALL"
      ? images
      : images.filter((img) => img.section === selectedSection);

  const filteredReservations =
    resStatusFilter === "ALL"
      ? reservations
      : reservations.filter((r) => r.status === resStatusFilter);

  return (
    <div>
      {/* Hidden File Input for Image Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        style={{ display: "none" }}
      />

      {/* Floating Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            padding: "14px 20px",
            background: notification.type === "success" ? "#166534" : "#991b1b",
            color: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            fontSize: "14px",
            fontWeight: 600,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>{notification.type === "success" ? "✓" : "⚠"}</span>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header & Tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#f5eee4",
              margin: "0 0 6px 0",
              letterSpacing: "0.01em",
            }}
          >
            Welcome, Zaky
          </h1>
          <p style={{ fontSize: "14px", color: "#a89b8c", margin: 0 }}>
            Manage every image across your website and track customer inquiries directly connected to PostgreSQL.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "rgba(35, 29, 23, 0.7)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid rgba(212, 163, 89, 0.2)",
          }}
        >
          <button
            onClick={() => setActiveTab("images")}
            style={{
              padding: "10px 20px",
              background: activeTab === "images" ? "#d4a359" : "transparent",
              color: activeTab === "images" ? "#1a140d" : "#c5b8a6",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            🖼️ Website Images CMS ({images.length})
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            style={{
              padding: "10px 20px",
              background: activeTab === "reservations" ? "#d4a359" : "transparent",
              color: activeTab === "reservations" ? "#1a140d" : "#c5b8a6",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            📅 Inquiries & Bookings ({reservations.length})
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: WEBSITE IMAGES CMS ===================== */}
      {activeTab === "images" && (
        <div>
          {/* Section Filter Pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "16px",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setSelectedSection("ALL")}
              style={{
                padding: "8px 16px",
                background: selectedSection === "ALL" ? "rgba(212, 163, 89, 0.25)" : "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${selectedSection === "ALL" ? "#d4a359" : "rgba(255, 255, 255, 0.1)"}`,
                color: selectedSection === "ALL" ? "#f5eee4" : "#9e9182",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              All Sections ({images.length})
            </button>
            {sections.map((sec) => {
              const count = images.filter((i) => i.section === sec).length;
              return (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  style={{
                    padding: "8px 16px",
                    background: selectedSection === sec ? "rgba(212, 163, 89, 0.25)" : "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${selectedSection === sec ? "#d4a359" : "rgba(255, 255, 255, 0.1)"}`,
                    color: selectedSection === sec ? "#f5eee4" : "#9e9182",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sec} ({count})
                </button>
              );
            })}
          </div>

          {/* Image Grid */}
          {loadingImages ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#a89b8c" }}>
              Loading image slots from PostgreSQL...
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredImages.map((img) => {
                const isEditing = editingSlot === img.slotKey;
                const isUploading = uploadingSlot === img.slotKey;

                return (
                  <div
                    key={img.id}
                    style={{
                      background: "rgba(24, 20, 16, 0.8)",
                      border: "1px solid rgba(212, 163, 89, 0.2)",
                      borderRadius: "14px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                      transition: "border-color 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "#d4a359",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {img.section}
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "11px",
                          padding: "2px 6px",
                          background: "rgba(255, 255, 255, 0.06)",
                          borderRadius: "4px",
                          color: "#c2b4a3",
                        }}
                      >
                        {img.slotKey}
                      </span>
                    </div>

                    {/* Preview Image */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        background: "#0c0a08",
                      }}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || img.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        style={{
                          objectFit: img.slotKey.includes("logo") ? "contain" : "cover",
                          padding: img.slotKey.includes("logo") ? "20px" : "0",
                        }}
                        unoptimized={img.url.startsWith("/uploads")}
                      />
                      {isUploading && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#d4a359",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          Uploading & Saving...
                        </div>
                      )}
                    </div>

                    {/* Body Info */}
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#f5eee4",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {img.label}
                      </h3>

                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9a8c7b",
                          margin: "0 0 12px 0",
                          wordBreak: "break-all",
                        }}
                      >
                        {img.url}
                      </p>

                      {img.caption && (
                        <p
                          style={{
                            fontSize: "12px",
                            fontStyle: "italic",
                            color: "#c0b29f",
                            margin: "0 0 12px 0",
                            lineHeight: 1.4,
                          }}
                        >
                          &ldquo;{img.caption}&rdquo;
                        </p>
                      )}

                      {/* Inline Edit Form */}
                      {isEditing && (
                        <div
                          style={{
                            marginTop: "auto",
                            padding: "12px",
                            background: "rgba(0, 0, 0, 0.3)",
                            borderRadius: "8px",
                            border: "1px solid rgba(212, 163, 89, 0.2)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div>
                            <label style={{ fontSize: "11px", color: "#a89b8c", display: "block" }}>
                              Image URL / Path
                            </label>
                            <input
                              type="text"
                              value={editForm.url}
                              onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                background: "#110e0b",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: "11px", color: "#a89b8c", display: "block" }}>
                              Alt Description
                            </label>
                            <input
                              type="text"
                              value={editForm.alt}
                              onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                background: "#110e0b",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: "11px", color: "#a89b8c", display: "block" }}>
                              Caption (Optional)
                            </label>
                            <input
                              type="text"
                              value={editForm.caption}
                              onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                background: "#110e0b",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                            <button
                              onClick={() => handleSaveEdit(img.slotKey)}
                              disabled={savingSlot}
                              style={{
                                flex: 1,
                                padding: "6px 12px",
                                background: "#d4a359",
                                color: "#1a140d",
                                border: "none",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              {savingSlot ? "Saving..." : "Save Details"}
                            </button>
                            <button
                              onClick={() => setEditingSlot(null)}
                              style={{
                                padding: "6px 10px",
                                background: "rgba(255, 255, 255, 0.08)",
                                color: "#d8cebe",
                                border: "none",
                                borderRadius: "4px",
                                fontSize: "12px",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {!isEditing && (
                        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                          <button
                            onClick={() => triggerFileUpload(img.slotKey)}
                            disabled={isUploading}
                            style={{
                              flex: 1,
                              padding: "9px 12px",
                              background: "linear-gradient(135deg, #d4a359 0%, #a67c33 100%)",
                              color: "#1c140a",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            <span>⬆ Upload Photo</span>
                          </button>
                          <button
                            onClick={() => startEdit(img)}
                            style={{
                              padding: "9px 12px",
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              borderRadius: "6px",
                              color: "#d8cebe",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Edit Text
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB 2: INQUIRIES & BOOKINGS ===================== */}
      {activeTab === "reservations" && (
        <div>
          {/* Status Filter */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {["ALL", "PENDING", "ACCEPTED", "COMPLETED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setResStatusFilter(status)}
                style={{
                  padding: "8px 16px",
                  background: resStatusFilter === status ? "rgba(212, 163, 89, 0.25)" : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${resStatusFilter === status ? "#d4a359" : "rgba(255, 255, 255, 0.1)"}`,
                  color: resStatusFilter === status ? "#f5eee4" : "#9e9182",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {loadingReservations ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#a89b8c" }}>
              Loading bookings from PostgreSQL...
            </div>
          ) : filteredReservations.length === 0 ? (
            <div
              style={{
                background: "rgba(24, 20, 16, 0.6)",
                border: "1px dashed rgba(212, 163, 89, 0.3)",
                borderRadius: "12px",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>📬</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f5eee4", margin: "0 0 6px 0" }}>
                No Bookings in this status
              </h3>
              <p style={{ fontSize: "13px", color: "#a89b8c", margin: 0, maxWidth: "420px", marginInline: "auto" }}>
                When visitors book a tour on your public site, their inquiries appear here in real time.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(24, 20, 16, 0.8)",
                border: "1px solid rgba(212, 163, 89, 0.2)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "rgba(0, 0, 0, 0.3)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#a89b8c" }}>Ref</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#a89b8c" }}>Guest</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#a89b8c" }}>Tour</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#a89b8c" }}>Date & Guests</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", color: "#a89b8c" }}>Status</th>
                    <th style={{ padding: "12px 16px", textAlign: "right", color: "#a89b8c" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((r) => (
                    <tr
                      key={r.id}
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <td style={{ padding: "14px 16px", fontFamily: "monospace", color: "#d4a359" }}>
                        {r.bookingRef}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#f5eee4" }}>{r.fullName}</div>
                        <div style={{ fontSize: "12px", color: "#9a8c7b" }}>{r.email} • {r.phone}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#f5eee4" }}>
                        {r.tourName}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#c5b8a6" }}>
                        <div>{new Date(r.date).toLocaleDateString()}</div>
                        <div style={{ fontSize: "12px", color: "#9a8c7b" }}>{r.guestsCount} guests</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: 700,
                            background:
                              r.status === "ACCEPTED"
                                ? "rgba(34, 197, 94, 0.2)"
                                : r.status === "REJECTED"
                                ? "rgba(239, 68, 68, 0.2)"
                                : "rgba(234, 179, 8, 0.2)",
                            color:
                              r.status === "ACCEPTED"
                                ? "#86efac"
                                : r.status === "REJECTED"
                                ? "#fca5a5"
                                : "#fde047",
                          }}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          {r.status !== "ACCEPTED" && (
                            <button
                              onClick={() => handleUpdateResStatus(r.id, "ACCEPTED")}
                              style={{
                                padding: "4px 10px",
                                background: "rgba(34, 197, 94, 0.15)",
                                border: "1px solid rgba(34, 197, 94, 0.3)",
                                borderRadius: "4px",
                                color: "#86efac",
                                fontSize: "11px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Accept
                            </button>
                          )}
                          {r.status !== "REJECTED" && (
                            <button
                              onClick={() => handleUpdateResStatus(r.id, "REJECTED")}
                              style={{
                                padding: "4px 10px",
                                background: "rgba(239, 68, 68, 0.15)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                borderRadius: "4px",
                                color: "#fca5a5",
                                fontSize: "11px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
