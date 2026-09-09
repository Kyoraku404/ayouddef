"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  ImageIcon,
  Search,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  Upload,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Database,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

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

export default function OcnImagesPage() {
  const [images, setImages] = useState<SiteImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Add modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
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
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addPreview, setAddPreview] = useState<string | null>(null);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);

  // Edit modal state
  const [editingItem, setEditingItem] = useState<SiteImageItem | null>(null);
  const [editForm, setEditForm] = useState({
    label: "",
    section: "",
    url: "",
    alt: "",
    caption: "",
    sortOrder: 0,
  });
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<SiteImageItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Copy toast state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const addFileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/adminzaky/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      } else {
        showToast("Failed to load images from database", "error");
      }
    } catch {
      showToast("Network error fetching images", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Copy slot key
  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Add file select
  const handleAddFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAddFile(file);
    setAddPreview(URL.createObjectURL(file));

    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();

    setAddForm((prev) => ({
      ...prev,
      slotKey: prev.slotKey || `ocn_${cleanBase}`,
      label: prev.label || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      alt: prev.alt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));
  };

  // Create new image
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.slotKey.trim()) {
      showToast("Slot key is required", "error");
      return;
    }
    if (!addForm.label.trim()) {
      showToast("Display label is required", "error");
      return;
    }

    setIsSubmittingAdd(true);
    let finalUrl = addForm.url.trim();

    try {
      if (addFile) {
        const uploadData = new FormData();
        uploadData.append("file", addFile);
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
        throw new Error("Please provide a photo upload or URL");
      }

      const finalSection =
        addForm.section === "__CUSTOM__"
          ? addForm.customSection.trim() || "General & Fallbacks"
          : addForm.section;

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
      if (!res.ok) throw new Error(data.error || "Failed to add image");

      setImages((prev) => [data.image, ...prev]);
      setIsAddOpen(false);
      setAddFile(null);
      setAddPreview(null);
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
      showToast(`Slot "${data.image.slotKey}" created in PostgreSQL!`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Creation failed", "error");
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  // Open edit modal
  const openEdit = (img: SiteImageItem) => {
    setEditingItem(img);
    setEditForm({
      label: img.label,
      section: img.section,
      url: img.url,
      alt: img.alt || "",
      caption: img.caption || "",
      sortOrder: img.sortOrder || 0,
    });
  };

  // Upload replacement in edit modal
  const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      showToast("Photo uploaded. Save details to commit.");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Upload error", "error");
    }
  };

  // Commit edit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmittingEdit(true);
    try {
      const res = await fetch("/api/adminzaky/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          slotKey: editingItem.slotKey,
          label: editForm.label,
          section: editForm.section,
          url: editForm.url,
          alt: editForm.alt,
          caption: editForm.caption,
          sortOrder: editForm.sortOrder,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setImages((prev) =>
        prev.map((img) => (img.id === editingItem.id ? data.image : img))
      );
      setEditingItem(null);
      showToast(`Slot "${editingItem.slotKey}" updated in PostgreSQL!`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Update failed", "error");
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Delete image
  const handleDeleteSubmit = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);

    try {
      const res = await fetch(
        `/api/adminzaky/images?slotKey=${encodeURIComponent(deletingItem.slotKey)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setImages((prev) => prev.filter((img) => img.id !== deletingItem.id));
      setDeletingItem(null);
      showToast(`Slot "${deletingItem.slotKey}" deleted from database.`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const sections = useMemo(() => {
    return Array.from(new Set(images.map((i) => i.section))).filter(Boolean);
  }, [images]);

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

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold border ${
            toast.type === "success"
              ? "bg-emerald-950/90 text-emerald-200 border-emerald-800/80"
              : "bg-rose-950/90 text-rose-200 border-rose-800/80"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ImageIcon className="w-7 h-7 text-indigo-400" />
              Global Site Images & Media CMS
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-mono">
              <Database className="w-3 h-3 text-indigo-400" />
              PostgreSQL SiteImage
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Centrally add, update, replace, and audit brand visuals and tour photos across all tenant web properties.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchImages}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Global Image
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-xs border border-slate-800/80 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Total Visual Slots</span>
          <span className="text-2xl font-bold font-mono text-white mt-1 block">{images.length}</span>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-xs border border-slate-800/80 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Sections Configured</span>
          <span className="text-2xl font-bold font-mono text-indigo-400 mt-1 block">{sections.length}</span>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-xs border border-slate-800/80 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Custom Uploads</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
            {images.filter((i) => i.url.startsWith("/uploads")).length}
          </span>
        </div>
      </div>

      {/* Search & Section Filter */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by label, slotKey, section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-xs text-slate-400 font-mono self-start sm:self-auto">
            Showing {filteredImages.length} of {images.length} assets
          </span>
        </div>

        {/* Section filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSection("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedSection === "ALL"
                ? "bg-indigo-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Sections ({images.length})
          </button>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedSection === sec
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {sec} ({images.filter((i) => i.section === sec).length})
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-mono text-sm">
          Loading site assets from PostgreSQL...
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-12 text-center">
          <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No images match your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try another filter or add a new global image slot.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 rounded-xl overflow-hidden flex flex-col transition-all shadow-lg"
            >
              {/* Header */}
              <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                  {img.section}
                </span>
                <button
                  onClick={() => handleCopy(img.slotKey)}
                  title="Click to copy slotKey"
                  className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 transition-colors"
                >
                  {copiedKey === img.slotKey ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>{img.slotKey}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preview Thumbnail */}
              <div className="relative w-full h-48 bg-slate-950">
                <Image
                  src={img.url}
                  alt={img.alt || img.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className={img.slotKey.includes("logo") ? "object-contain p-6" : "object-cover"}
                  unoptimized={img.url.startsWith("/uploads")}
                />
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-white line-clamp-1">{img.label}</h3>
                  <p className="text-xs font-mono text-slate-400 truncate">{img.url}</p>
                  {img.alt && (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      <span className="text-slate-500 font-medium">Alt:</span> {img.alt}
                    </p>
                  )}
                  {img.caption && (
                    <p className="text-xs italic text-slate-400/90 line-clamp-2">
                      &ldquo;{img.caption}&rdquo;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openEdit(img)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => setDeletingItem(img)}
                    className="p-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-transparent hover:border-rose-800/60 transition-colors"
                    title="Delete image slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD MODAL ================= */}
      {isAddOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddOpen(false);
          }}
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Add Global Image to Database
              </h2>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Slot Key (Unique ID) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. hero_sunset_quad or brand_partner_logo"
                  value={addForm.slotKey}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      slotKey: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "_"),
                    })
                  }
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Display Label / Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Over Jemaa el-Fnaa"
                  value={addForm.label}
                  onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Section Category
                </label>
                <select
                  value={addForm.section}
                  onChange={(e) => setAddForm({ ...addForm, section: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
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
                  <option value="__CUSTOM__">➕ Enter Custom Section...</option>
                </select>

                {addForm.section === "__CUSTOM__" && (
                  <input
                    type="text"
                    placeholder="Enter custom section name..."
                    value={addForm.customSection}
                    onChange={(e) => setAddForm({ ...addForm, customSection: e.target.value })}
                    className="w-full mt-2 bg-slate-950 border border-indigo-700/60 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Image Source *
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <button
                    type="button"
                    onClick={() => addFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/80"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Photo File
                  </button>
                  <span className="text-xs text-slate-500">or enter image path / URL below</span>
                </div>

                <input
                  type="file"
                  ref={addFileInputRef}
                  onChange={handleAddFileSelect}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  className="hidden"
                />

                <input
                  type="text"
                  placeholder="/images/souks.jpg or /uploads/... or https://..."
                  value={addForm.url}
                  onChange={(e) => setAddForm({ ...addForm, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />

                {(addPreview || addForm.url) && (
                  <div className="mt-2 relative h-32 rounded-lg overflow-hidden border border-slate-800 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={addPreview || addForm.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  placeholder="Descriptive image summary"
                  value={addForm.alt}
                  onChange={(e) => setAddForm({ ...addForm, alt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Optional caption for front-end visual cards"
                  value={addForm.caption}
                  onChange={(e) => setAddForm({ ...addForm, caption: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmittingAdd}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  {isSubmittingAdd ? "Saving to Database..." : "Save to PostgreSQL"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingItem && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingItem(null);
          }}
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-indigo-400" />
                  Edit Global Image
                </h2>
                <span className="text-xs font-mono text-indigo-300">Slot: {editingItem.slotKey}</span>
              </div>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <input
              type="file"
              ref={editFileInputRef}
              onChange={handleEditFileUpload}
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
            />

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Display Label / Title
                </label>
                <input
                  type="text"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Section Category
                </label>
                <input
                  type="text"
                  value={editForm.section}
                  onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    Image URL / Path
                  </label>
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    <Upload className="w-3 h-3" />
                    Upload Replacement
                  </button>
                </div>
                <input
                  type="text"
                  value={editForm.url}
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                />
                {editForm.url && (
                  <div className="mt-2 relative h-32 rounded-lg overflow-hidden border border-slate-800 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editForm.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={editForm.alt}
                  onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={editForm.caption}
                  onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  {isSubmittingEdit ? "Updating..." : "Save Changes to Database"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deletingItem && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeletingItem(null);
          }}
        >
          <div className="bg-slate-900 border border-rose-900/60 rounded-2xl w-full max-w-md p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Image Slot?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete <code className="text-rose-300">{deletingItem.slotKey}</code> from the database?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteSubmit}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete from DB"}
              </button>
              <button
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
