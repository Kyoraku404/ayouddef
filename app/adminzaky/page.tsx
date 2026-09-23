"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TourPacksTab } from "@/components/adminzaky/TourPacksTab";
import { GuideBioTab } from "@/components/adminzaky/GuideBioTab";
import { GalleryTab } from "@/components/adminzaky/GalleryTab";

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
  const [activeTab, setActiveTab] = useState<"packs" | "bio" | "images" | "gallery" | "reservations">("packs");
  const [tourCount, setTourCount] = useState<number>(7);
  const [images, setImages] = useState<SiteImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  // Edit state
  const [editingItem, setEditingItem] = useState<SiteImageItem | null>(null);
  const [editForm, setEditForm] = useState({
    label: "",
    section: "",
    customSection: "",
    url: "",
    alt: "",
    caption: "",
    sortOrder: 0,
  });
  const [savingSlot, setSavingSlot] = useState(false);

  // Add new image state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    slotKey: "",
    label: "",
    section: "General & Fallbacks",
    customSection: "",
    url: "",
    alt: "",
    caption: "",
    sortOrder: 0,
  });
  const [addFormFile, setAddFormFile] = useState<File | null>(null);
  const [addFormPreview, setAddFormPreview] = useState<string | null>(null);
  const [isCreatingImage, setIsCreatingImage] = useState(false);

  // Delete confirm state
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<SiteImageItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Copy indicator
  const [copiedSlot, setCopiedSlot] = useState<string | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Reservations state
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [resStatusFilter, setResStatusFilter] = useState<string>("ALL");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);
  const addFileInputRef = useRef<HTMLInputElement | null>(null);
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
    loadReservations();
    fetch("/api/adminzaky/tours")
      .then((r) => r.json())
      .then((d) => {
        if (d.tours) setTourCount(d.tours.length);
      })
      .catch(() => {});
  }, []);

  const handleTabChange = (tab: "packs" | "bio" | "images" | "gallery" | "reservations") => {
    setActiveTab(tab);
    if (tab === "images" && images.length === 0) {
      loadImages();
    }
    if (tab === "reservations" && reservations.length === 0) {
      loadReservations();
    }
  };

  // Handle direct file upload for existing card
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

  // Handle file upload inside the Edit modal
  const handleEditModalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slotKey", editingItem.slotKey);

    try {
      const res = await fetch("/api/adminzaky/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setEditForm((prev) => ({ ...prev, url: data.url }));
      notify("New file uploaded! Click Save to commit details.");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Upload failed", "error");
    }
  };

  // Handle file select inside Add modal
  const handleAddModalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAddFormFile(file);
    const previewUrl = URL.createObjectURL(file);
    setAddFormPreview(previewUrl);

    // Default label and slotKey suggestions if empty
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();

    setAddForm((prev) => ({
      ...prev,
      slotKey: prev.slotKey || `custom_${cleanBase}`,
      label: prev.label || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      alt: prev.alt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));
  };

  // Open Edit modal
  const openEditModal = (img: SiteImageItem) => {
    setEditingItem(img);
    setEditForm({
      label: img.label,
      section: img.section,
      customSection: "",
      url: img.url,
      alt: img.alt || "",
      caption: img.caption || "",
      sortOrder: img.sortOrder || 0,
    });
  };

  // Save edited image to database
  const handleSaveEdit = async () => {
    if (!editingItem) return;
    setSavingSlot(true);

    const finalSection =
      editForm.section === "__CUSTOM__"
        ? editForm.customSection.trim() || "General & Fallbacks"
        : editForm.section;

    try {
      const res = await fetch("/api/adminzaky/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          slotKey: editingItem.slotKey,
          label: editForm.label,
          section: finalSection,
          url: editForm.url,
          alt: editForm.alt,
          caption: editForm.caption,
          sortOrder: editForm.sortOrder,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setImages((prev) =>
        prev.map((img) =>
          img.id === editingItem.id
            ? {
                ...img,
                label: editForm.label,
                section: finalSection,
                url: editForm.url,
                alt: editForm.alt || null,
                caption: editForm.caption || null,
                sortOrder: editForm.sortOrder,
              }
            : img
        )
      );

      setEditingItem(null);
      notify(`"${editingItem.slotKey}" updated and saved to PostgreSQL!`);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Update failed", "error");
    } finally {
      setSavingSlot(false);
    }
  };

  // Create new image in database
  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.slotKey.trim()) {
      notify("Slot Key is required (e.g. hero_sunset_photo)", "error");
      return;
    }
    if (!addForm.label.trim()) {
      notify("Display Label is required", "error");
      return;
    }

    setIsCreatingImage(true);
    let finalUrl = addForm.url.trim();

    try {
      // 1. If a local file was chosen, upload it first
      if (addFormFile) {
        const uploadData = new FormData();
        uploadData.append("file", addFormFile);
        uploadData.append("slotKey", addForm.slotKey.trim());

        const uploadRes = await fetch("/api/adminzaky/images/upload", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || "File upload failed");
        finalUrl = uploadJson.url;
      }

      if (!finalUrl) {
        throw new Error("Please upload an image file or provide an image URL / path");
      }

      const finalSection =
        addForm.section === "__CUSTOM__"
          ? addForm.customSection.trim() || "General & Fallbacks"
          : addForm.section;

      // 2. Insert record into PostgreSQL via API
      const res = await fetch("/api/adminzaky/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotKey: addForm.slotKey,
          label: addForm.label,
          section: finalSection,
          url: finalUrl,
          alt: addForm.alt,
          caption: addForm.caption,
          sortOrder: Number(addForm.sortOrder) || 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create image");

      setImages((prev) => [data.image, ...prev]);
      setIsAddModalOpen(false);
      setAddForm({
        slotKey: "",
        label: "",
        section: "General & Fallbacks",
        customSection: "",
        url: "",
        alt: "",
        caption: "",
        sortOrder: 0,
      });
      setAddFormFile(null);
      setAddFormPreview(null);
      notify(`New image slot "${data.image.slotKey}" successfully added to database!`);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Error creating image", "error");
    } finally {
      setIsCreatingImage(false);
    }
  };

  // Delete image from database
  const handleDeleteImage = async () => {
    if (!deleteConfirmItem) return;
    setIsDeleting(true);

    try {
      const res = await fetch(
        `/api/adminzaky/images?slotKey=${encodeURIComponent(deleteConfirmItem.slotKey)}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setImages((prev) => prev.filter((img) => img.id !== deleteConfirmItem.id));
      setDeleteConfirmItem(null);
      notify(`Image slot "${deleteConfirmItem.slotKey}" deleted from database.`);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Copy slot key to clipboard
  const handleCopySlot = (slotKey: string) => {
    navigator.clipboard.writeText(slotKey);
    setCopiedSlot(slotKey);
    setTimeout(() => setCopiedSlot(null), 2000);
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
  const sections = useMemo(() => {
    return Array.from(new Set(images.map((i) => i.section))).filter(Boolean);
  }, [images]);

  // Filtered images by section + search query
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesSection = selectedSection === "ALL" || img.section === selectedSection;
      if (!matchesSection) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        img.label.toLowerCase().includes(q) ||
        img.slotKey.toLowerCase().includes(q) ||
        (img.alt && img.alt.toLowerCase().includes(q)) ||
        img.section.toLowerCase().includes(q)
      );
    });
  }, [images, selectedSection, searchQuery]);

  const filteredReservations = useMemo(() => {
    return resStatusFilter === "ALL"
      ? reservations
      : reservations.filter((r) => r.status === resStatusFilter);
  }, [reservations, resStatusFilter]);

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "8px" }}>
      {/* Hidden File Input for direct card replacement */}
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
            animation: "fadeIn 0.2s ease-out",
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#f5eee4",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Marrakeshi Admin & Content Hub
            </h1>
            <span
              style={{
                padding: "3px 8px",
                background: "rgba(34, 197, 94, 0.15)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#86efac",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              PostgreSQL Connected
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#a89b8c", margin: 0 }}>
            Pilotez vos tarifs de circuits, votre biographie, vos images globales et vos réservations en direct.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "rgba(35, 29, 23, 0.7)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid rgba(212, 163, 89, 0.2)",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => handleTabChange("packs")}
            style={{
              padding: "10px 18px",
              background: activeTab === "packs" ? "#d4a359" : "transparent",
              color: activeTab === "packs" ? "#1a140d" : "#c5b8a6",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            🏷️ Prix des Packs ({tourCount})
          </button>
          <button
            onClick={() => handleTabChange("bio")}
            style={{
              padding: "10px 18px",
              background: activeTab === "bio" ? "#d4a359" : "transparent",
              color: activeTab === "bio" ? "#1a140d" : "#c5b8a6",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            📜 Bio & Histoire
          </button>
          <button
            onClick={() => handleTabChange("images")}
            style={{
              padding: "10px 18px",
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
            🖼️ Photos du Site ({images.length})
          </button>
          <button
            onClick={() => handleTabChange("gallery")}
            style={{
              padding: "10px 18px",
              background: activeTab === "gallery" ? "#d4a359" : "transparent",
              color: activeTab === "gallery" ? "#1a140d" : "#c5b8a6",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            📸 Galerie Site
          </button>
          <button
            onClick={() => handleTabChange("reservations")}
            style={{
              padding: "10px 18px",
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
            📅 Réservations ({reservations.length})
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Metric Tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div style={{ background: "rgba(35, 29, 23, 0.75)", border: "1px solid rgba(212, 163, 89, 0.25)", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a89b8c", fontWeight: 700 }}>Circuits & Packs</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#f5eee4", marginTop: "4px" }}>{tourCount} Packs</div>
          <div style={{ fontSize: "11px", color: "#86efac", marginTop: "3px" }}>● Tarifs éditables en direct</div>
        </div>

        <div style={{ background: "rgba(35, 29, 23, 0.75)", border: "1px solid rgba(212, 163, 89, 0.25)", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a89b8c", fontWeight: 700 }}>Avis & Réputation</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#ffd79a", marginTop: "4px" }}>5.0★ Google</div>
          <div style={{ fontSize: "11px", color: "#d4a359", marginTop: "3px" }}>41 avis vérifiés • 19 ans d&apos;exp.</div>
        </div>

        <div style={{ background: "rgba(35, 29, 23, 0.75)", border: "1px solid rgba(212, 163, 89, 0.25)", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a89b8c", fontWeight: 700 }}>Photos Globales</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#f5eee4", marginTop: "4px" }}>{images.length} Emplacements</div>
          <div style={{ fontSize: "11px", color: "#86efac", marginTop: "3px" }}>● Supabase PostgreSQL & CDN</div>
        </div>

        <div style={{ background: "rgba(35, 29, 23, 0.75)", border: "1px solid rgba(212, 163, 89, 0.25)", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a89b8c", fontWeight: 700 }}>Demandes Reçues</div>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#f5eee4", marginTop: "4px" }}>{reservations.length} Inquiries</div>
          <div style={{ fontSize: "11px", color: "#86efac", marginTop: "3px" }}>● Contact direct WhatsApp & Email</div>
        </div>
      </div>

      {/* ===================== TAB: TOUR PACKS & PRICES ===================== */}
      {activeTab === "packs" && <TourPacksTab notify={notify} />}

      {/* ===================== TAB: GUIDE BIO & PROFILE ===================== */}
      {activeTab === "bio" && <GuideBioTab notify={notify} />}

      {/* ===================== TAB: WEBSITE PHOTO GALLERY ===================== */}
      {activeTab === "gallery" && <GalleryTab notify={notify} />}

      {/* ===================== TAB: WEBSITE IMAGES CMS ===================== */}
      {activeTab === "images" && (
        <div>
          {/* Action Bar: Search + Add Image Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", flex: 1, minWidth: "260px", maxWidth: "480px" }}>
              <input
                type="text"
                placeholder="Search images by label, slotKey, section, alt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 36px",
                  background: "rgba(24, 20, 16, 0.8)",
                  border: "1px solid rgba(212, 163, 89, 0.25)",
                  borderRadius: "10px",
                  color: "#f5eee4",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#a89b8c",
                  fontSize: "14px",
                }}
              >
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#a89b8c",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                onClick={() => loadImages()}
                disabled={loadingImages}
                style={{
                  padding: "10px 16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  color: "#d8cebe",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>🔄</span>
                <span>Refresh DB</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                style={{
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #d4a359 0%, #b38237 100%)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#1a140d",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 15px rgba(212, 163, 89, 0.3)",
                }}
              >
                <span style={{ fontSize: "16px" }}>+</span>
                <span>Add Global Image</span>
              </button>
            </div>
          </div>

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
              Loading image slots from PostgreSQL database...
            </div>
          ) : filteredImages.length === 0 ? (
            <div
              style={{
                background: "rgba(24, 20, 16, 0.6)",
                border: "1px dashed rgba(212, 163, 89, 0.3)",
                borderRadius: "14px",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🖼️</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f5eee4", margin: "0 0 6px 0" }}>
                No images found matching criteria
              </h3>
              <p style={{ fontSize: "13px", color: "#a89b8c", margin: "0 0 16px 0" }}>
                Try adjusting your search query or section filter, or add a new global image slot.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                style={{
                  padding: "8px 16px",
                  background: "#d4a359",
                  color: "#1a140d",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                + Add New Image
              </button>
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
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(0, 0, 0, 0.2)",
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
                      <button
                        onClick={() => handleCopySlot(img.slotKey)}
                        title="Click to copy slotKey"
                        style={{
                          fontFamily: "monospace",
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: "rgba(255, 255, 255, 0.08)",
                          borderRadius: "4px",
                          color: copiedSlot === img.slotKey ? "#86efac" : "#c2b4a3",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {copiedSlot === img.slotKey ? "✓ Copied!" : img.slotKey}
                      </button>
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
                            background: "rgba(0, 0, 0, 0.75)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#d4a359",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          Uploading & Updating Database...
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
                          margin: "0 0 6px 0",
                        }}
                      >
                        {img.label}
                      </h3>

                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9a8c7b",
                          margin: "0 0 8px 0",
                          wordBreak: "break-all",
                          fontFamily: "monospace",
                        }}
                      >
                        {img.url}
                      </p>

                      {img.alt && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#c0b29f",
                            margin: "0 0 6px 0",
                            lineHeight: 1.4,
                          }}
                        >
                          <strong style={{ color: "#a89b8c" }}>Alt:</strong> {img.alt}
                        </p>
                      )}

                      {img.caption && (
                        <p
                          style={{
                            fontSize: "12px",
                            fontStyle: "italic",
                            color: "#a89b8c",
                            margin: "0 0 12px 0",
                            lineHeight: 1.4,
                          }}
                        >
                          &ldquo;{img.caption}&rdquo;
                        </p>
                      )}

                      {/* Card Action Buttons */}
                      <div style={{ display: "flex", gap: "8px", marginTop: "auto", paddingTop: "12px" }}>
                        <button
                          onClick={() => triggerFileUpload(img.slotKey)}
                          disabled={isUploading}
                          style={{
                            flex: 1,
                            padding: "8px 10px",
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
                          onClick={() => openEditModal(img)}
                          style={{
                            padding: "8px 12px",
                            background: "rgba(255, 255, 255, 0.06)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "6px",
                            color: "#d8cebe",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmItem(img)}
                          title="Delete from database"
                          style={{
                            padding: "8px 10px",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                            borderRadius: "6px",
                            color: "#fca5a5",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================== MODAL 1: ADD GLOBAL IMAGE ===================== */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "540px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#1a1612",
              border: "1px solid rgba(212, 163, 89, 0.4)",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              color: "#f5eee4",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px" }}>🖼️</span>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#f5eee4" }}>
                    Add Global Image to Database
                  </h2>
                  <span style={{ fontSize: "12px", color: "#a89b8c" }}>
                    Saves directly to PostgreSQL SiteImage table
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a89b8c",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateImage} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Slot Key */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Slot Key (Unique ID) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. hero_summer_sunset or tour_desert_quad"
                  value={addForm.slotKey}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      slotKey: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "_"),
                    })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    boxSizing: "border-box",
                  }}
                />
                <span style={{ fontSize: "11px", color: "#8a7d6e" }}>
                  Code components access this image via <code>getImage(&quot;{addForm.slotKey || "your_key"}&quot;)</code>
                </span>
              </div>

              {/* Label */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Display Label / Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Over Jemaa el-Fnaa"
                  value={addForm.label}
                  onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Section */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Section Category
                </label>
                <select
                  value={addForm.section}
                  onChange={(e) => setAddForm({ ...addForm, section: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                    marginBottom: addForm.section === "__CUSTOM__" ? "8px" : "0",
                  }}
                >
                  <option value="General & Fallbacks">General & Fallbacks</option>
                  <option value="Hero Section">Hero Section</option>
                  <option value="About Section">About Section</option>
                  <option value="Brand & Navigation">Brand & Navigation</option>
                  <option value="Tour: Medina, Souks & Heritage">Tour: Medina, Souks & Heritage</option>
                  <option value="Tour: Bahia Palace & Royal Monuments">Tour: Bahia Palace & Royal Monuments</option>
                  <option value="Tour: Hidden Souks, Artisans & Craftsmanship">Tour: Hidden Souks, Artisans & Craftsmanship</option>
                  <option value="Tour: Marrakesh Food & Street Flavors">Tour: Marrakesh Food & Street Flavors</option>
                  <option value="Tour: Day Trip Atlas Mountains & Ourika">Tour: Day Trip Atlas Mountains & Ourika</option>
                  <option value="Tour: Essaouira Coastal Private Day Tour">Tour: Essaouira Coastal Private Day Tour</option>
                  <option value="Tour: Customized Private Tour">Tour: Customized Private Tour</option>
                  {sections
                    .filter(
                      (s) =>
                        ![
                          "General & Fallbacks",
                          "Hero Section",
                          "About Section",
                          "Brand & Navigation",
                          "Tour: Medina, Souks & Heritage",
                          "Tour: Bahia Palace & Royal Monuments",
                          "Tour: Hidden Souks, Artisans & Craftsmanship",
                          "Tour: Marrakesh Food & Street Flavors",
                          "Tour: Day Trip Atlas Mountains & Ourika",
                          "Tour: Essaouira Coastal Private Day Tour",
                          "Tour: Customized Private Tour",
                        ].includes(s)
                    )
                    .map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  <option value="__CUSTOM__">➕ Enter New Custom Section...</option>
                </select>

                {addForm.section === "__CUSTOM__" && (
                  <input
                    type="text"
                    placeholder="Type custom section name (e.g. Summer Specials, Testimonials)..."
                    value={addForm.customSection}
                    onChange={(e) => setAddForm({ ...addForm, customSection: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      background: "#0e0c0a",
                      border: "1px solid rgba(212, 163, 89, 0.4)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>

              {/* Photo Choice: Upload or URL */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Image Source *
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                  <button
                    type="button"
                    onClick={() => addFileInputRef.current?.click()}
                    style={{
                      padding: "8px 14px",
                      background: "rgba(212, 163, 89, 0.15)",
                      border: "1px solid rgba(212, 163, 89, 0.35)",
                      borderRadius: "8px",
                      color: "#d4a359",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    📁 Upload File from Computer
                  </button>
                  <span style={{ fontSize: "12px", color: "#8a7d6e" }}>or enter URL / path below</span>
                </div>

                <input
                  type="file"
                  ref={addFileInputRef}
                  onChange={handleAddModalFileSelect}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  style={{ display: "none" }}
                />

                <input
                  type="text"
                  placeholder="/images/hero.jpg or /uploads/... or https://..."
                  value={addForm.url}
                  onChange={(e) => setAddForm({ ...addForm, url: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />

                {/* Preview if file or url */}
                {(addFormPreview || addForm.url) && (
                  <div
                    style={{
                      marginTop: "10px",
                      position: "relative",
                      height: "140px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#000",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={addFormPreview || addForm.url}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "6px",
                        left: "6px",
                        background: "rgba(0,0,0,0.7)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        color: "#fff",
                      }}
                    >
                      {addFormFile ? `File: ${addFormFile.name}` : "URL Preview"}
                    </div>
                  </div>
                )}
              </div>

              {/* Alt description */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Alt Description (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  placeholder="Detailed description for search engines and screen readers"
                  value={addForm.alt}
                  onChange={(e) => setAddForm({ ...addForm, alt: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Caption */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Optional caption displayed under the visual"
                  value={addForm.caption}
                  onChange={(e) => setAddForm({ ...addForm, caption: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Sort order */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Sort Order
                </label>
                <input
                  type="number"
                  value={addForm.sortOrder}
                  onChange={(e) => setAddForm({ ...addForm, sortOrder: parseInt(e.target.value, 10) || 0 })}
                  style={{
                    width: "120px",
                    padding: "8px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="submit"
                  disabled={isCreatingImage}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "linear-gradient(135deg, #d4a359 0%, #a67c33 100%)",
                    color: "#1c140a",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isCreatingImage ? "Saving to Database..." : "✓ Add to Database"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: "12px 20px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#d8cebe",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL 2: EDIT IMAGE ===================== */}
      {editingItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingItem(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "540px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#1a1612",
              border: "1px solid rgba(212, 163, 89, 0.4)",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              color: "#f5eee4",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#f5eee4" }}>
                  Edit Global Image
                </h2>
                <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#d4a359", marginTop: "2px" }}>
                  Slot: {editingItem.slotKey}
                </div>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a89b8c",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Hidden file input for edit modal */}
            <input
              type="file"
              ref={editFileInputRef}
              onChange={handleEditModalFileUpload}
              accept="image/png,image/jpeg,image/webp,image/jpg"
              style={{ display: "none" }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Display Label */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Display Label / Title
                </label>
                <input
                  type="text"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Section Category */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Section
                </label>
                <input
                  type="text"
                  value={editForm.section}
                  onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Image URL with quick replace button */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#d4a359" }}>
                    Image URL / Path
                  </label>
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    style={{
                      background: "rgba(212, 163, 89, 0.15)",
                      border: "1px solid rgba(212, 163, 89, 0.3)",
                      borderRadius: "4px",
                      color: "#d4a359",
                      fontSize: "11px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    ⬆ Upload New Photo
                  </button>
                </div>
                <input
                  type="text"
                  value={editForm.url}
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />

                {/* Preview */}
                {editForm.url && (
                  <div
                    style={{
                      marginTop: "8px",
                      height: "120px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      background: "#000",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      position: "relative",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editForm.url}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              {/* Alt */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Alt Description
                </label>
                <input
                  type="text"
                  value={editForm.alt}
                  onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Caption */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={editForm.caption}
                  onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Sort Order */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#d4a359", marginBottom: "4px" }}>
                  Sort Order
                </label>
                <input
                  type="number"
                  value={editForm.sortOrder}
                  onChange={(e) => setEditForm({ ...editForm, sortOrder: parseInt(e.target.value, 10) || 0 })}
                  style={{
                    width: "100px",
                    padding: "8px 12px",
                    background: "#0e0c0a",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                />
              </div>

              {/* Save / Cancel */}
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={savingSlot}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "linear-gradient(135deg, #d4a359 0%, #a67c33 100%)",
                    color: "#1c140a",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {savingSlot ? "Saving to PostgreSQL..." : "✓ Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{
                    padding: "12px 20px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#d8cebe",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL 3: DELETE CONFIRMATION ===================== */}
      {deleteConfirmItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteConfirmItem(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "440px",
              background: "#1c1410",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "14px",
              padding: "28px",
              textAlign: "center",
              color: "#f5eee4",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑️</div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0" }}>
              Delete Image Slot?
            </h3>
            <p style={{ fontSize: "13px", color: "#a89b8c", margin: "0 0 16px 0", lineHeight: 1.5 }}>
              Are you sure you want to delete slot <code style={{ color: "#fca5a5" }}>{deleteConfirmItem.slotKey}</code> ({deleteConfirmItem.label}) from the database?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleDeleteImage}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete from DB"}
              </button>
              <button
                onClick={() => setDeleteConfirmItem(null)}
                style={{
                  padding: "10px 18px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
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
