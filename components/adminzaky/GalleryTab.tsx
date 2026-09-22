"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryPhoto {
  id: string;
  slotKey: string;
  label: string;
  url: string;
  alt: string | null;
  caption: string | null;
  section: string;
  sortOrder: number;
}

interface GalleryTabProps {
  notify: (msg: string, type?: "success" | "error") => void;
}

export function GalleryTab({ notify }: GalleryTabProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/adminzaky/images?section=Gallery");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.images || []);
      } else {
        notify("Failed to load gallery from database", "error");
      }
    } catch {
      notify("Network error loading gallery", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setPendingFiles(files);
  };

  const handleBulkUpload = async () => {
    if (pendingFiles.length === 0) {
      notify("Select at least one photo first", "error");
      return;
    }
    setUploading(true);
    let added = 0;
    try {
      const existingCount = photos.length;
      for (let i = 0; i < pendingFiles.length; i++) {
        const file = pendingFiles[i];
        const slotKey = `gallery_${Date.now()}_${i}_${file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[^a-zA-Z0-9]/g, "_")
          .toLowerCase()
          .slice(0, 24)}`;

        // 1. Upload binary
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("slotKey", slotKey);
        const uploadRes = await fetch("/api/adminzaky/images/upload", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || `Upload failed: ${file.name}`);
        const finalUrl: string = uploadJson.url;

        // 2. Create Gallery record
        const createRes = await fetch("/api/adminzaky/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slotKey,
            label: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || `Gallery photo ${existingCount + added + 1}`,
            section: "Gallery",
            url: finalUrl,
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            caption: "",
            sortOrder: existingCount + added + 1,
          }),
        });
        const createJson = await createRes.json();
        if (!createRes.ok) throw new Error(createJson.error || "Failed to save gallery photo");
        setPhotos((prev) => [...prev, createJson.image]);
        added++;
      }
      setPendingFiles([]);
      if (fileRef.current) fileRef.current.value = "";
      notify(`${added} gallery photo${added > 1 ? "s" : ""} added! Visible on the website instantly.`);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Bulk upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photo: GalleryPhoto) => {
    if (!confirm(`Delete "${photo.label}" from the website gallery?`)) return;
    setDeletingId(photo.id);
    try {
      const res = await fetch(`/api/adminzaky/images?slotKey=${encodeURIComponent(photo.slotKey)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      notify(`"${photo.label}" removed from gallery.`);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(43, 30, 21, 0.6) 0%, rgba(26, 20, 13, 0.8) 100%)",
          border: "1px solid rgba(212, 163, 89, 0.2)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(212, 163, 89, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0,
            }}
          >
            📸
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#f5eee4" }}>
              Website Photo Gallery — {photos.length} photos online (target 40+)
            </h4>
            <p style={{ margin: 0, fontSize: "12.5px", color: "#a89b8c", lineHeight: 1.4 }}>
              Upload photos here and they appear instantly in the &ldquo;Galerie&rdquo; section of the
              website. Delete any photo to remove it from the site.
            </p>
          </div>
        </div>
        <button
          onClick={loadGallery}
          disabled={loading}
          style={{
            padding: "10px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "10px",
            color: "#d8cebe",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Bulk upload bar */}
      <div
        style={{
          background: "rgba(24, 20, 16, 0.8)",
          border: "1px dashed rgba(212, 163, 89, 0.35)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="file"
          ref={fileRef}
          onChange={handleFilesSelected}
          accept="image/png,image/jpeg,image/webp,image/jpg"
          multiple
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{
            padding: "10px 18px",
            background: "rgba(212, 163, 89, 0.15)",
            border: "1px solid rgba(212, 163, 89, 0.35)",
            borderRadius: "8px",
            color: "#ffd79a",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          📁 Select Photos (multiple)
        </button>
        {pendingFiles.length > 0 && (
          <span style={{ fontSize: "13px", color: "#f5eee4", fontWeight: 600 }}>
            {pendingFiles.length} file{pendingFiles.length > 1 ? "s" : ""} ready:{" "}
            <span style={{ color: "#a89b8c", fontWeight: 400 }}>
              {pendingFiles.slice(0, 3).map((f) => f.name).join(", ")}
              {pendingFiles.length > 3 ? ` +${pendingFiles.length - 3} more` : ""}
            </span>
          </span>
        )}
        <button
          type="button"
          onClick={handleBulkUpload}
          disabled={uploading || pendingFiles.length === 0}
          style={{
            padding: "10px 22px",
            background:
              pendingFiles.length > 0
                ? "linear-gradient(135deg, #d4a359 0%, #b38237 100%)"
                : "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: "8px",
            color: pendingFiles.length > 0 ? "#1a140d" : "#73675a",
            fontSize: "13px",
            fontWeight: 700,
            cursor: pendingFiles.length > 0 ? "pointer" : "not-allowed",
          }}
        >
          {uploading ? "Uploading…" : `⬆ Add ${pendingFiles.length || ""} to Gallery`}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#d4a359" }}>
          Loading gallery from database…
        </div>
      ) : photos.length === 0 ? (
        <div
          style={{
            background: "rgba(24, 20, 16, 0.6)",
            border: "1px dashed rgba(212, 163, 89, 0.3)",
            borderRadius: "14px",
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>📸</div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f5eee4", margin: "0 0 6px 0" }}>
            Gallery is empty — upload your first 40 photos
          </h3>
          <p style={{ fontSize: "13px", color: "#a89b8c", margin: "0 0 16px 0" }}>
            Until you upload, visitors see 40 default Marrakech photos. Add your own above to replace them.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "14px",
          }}
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              style={{
                background: "rgba(24, 20, 16, 0.8)",
                border: "1px solid rgba(212, 163, 89, 0.2)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "150px", background: "#0c0a08" }}>
                <Image
                  src={photo.url}
                  alt={photo.alt || photo.label}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                  unoptimized={photo.url.startsWith("/uploads") || photo.url.startsWith("http")}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "6px",
                    background: "rgba(0,0,0,0.7)",
                    color: "#ffd79a",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  #{idx + 1}
                </span>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#f5eee4",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={photo.label}
                >
                  {photo.label}
                </div>
                <button
                  onClick={() => handleDelete(photo)}
                  disabled={deletingId === photo.id}
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "6px",
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    borderRadius: "6px",
                    color: "#fca5a5",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {deletingId === photo.id ? "Deleting…" : "🗑 Remove from site"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
