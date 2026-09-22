"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TourIcon } from "../tours/TourCard";

export interface ItineraryStopItem {
  stopNumber: number;
  name: string;
  duration: string;
  description: string;
  lat: number;
  lng: number;
}

export interface TourPackageItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  price: string;
  priceNote: string | null;
  duration: string | null;
  groupType: string | null;
  languages: string | null;
  badge: string | null;
  description: string | null;
  // Independent content fields: card text (Tours page ONLY) vs full text (detail page ONLY).
  cardDescription: string | null;
  fullDescription: string | null;
  // Card visual: icon + gradient theme, editable per tour.
  icon: string | null;
  cls: string | null;
  // Card cover photo (main Tours page). Null = icon/gradient visual.
  cardImage: string | null;
  highlights: string | null;
  included: string | null;
  notIncluded: string | null;
  itinerary: string | null;
  mapCenter: string | null;
  active: boolean;
  sortOrder: number;
}

export const TOUR_ICON_OPTIONS = [
  { id: "gate", label: "Gate / Medina" },
  { id: "basket", label: "Basket / Souks" },
  { id: "palace", label: "Palace / Heritage" },
  { id: "tea", label: "Tea / Night" },
  { id: "monument", label: "Monument / Signature" },
  { id: "compass", label: "Compass / Custom" },
  { id: "road", label: "Road / Escape" },
];

export const TOUR_THEME_OPTIONS = [
  { id: "t1", label: "Terracotta" },
  { id: "t2", label: "Gold" },
  { id: "t3", label: "Dark Brown" },
  { id: "t4", label: "Auburn" },
  { id: "t5", label: "Sand Gold" },
  { id: "t6", label: "Coffee" },
  { id: "t7", label: "Amber" },
];

export interface LandmarkPreset {
  id: string;
  name: string;
  duration: string;
  description: string;
  lat: number;
  lng: number;
}

export const MARRAKECH_LANDMARK_PRESETS: LandmarkPreset[] = [
  {
    id: "jemaa-el-fna",
    name: "Place Jemaa el-Fna",
    duration: "45 mins",
    description: "Cœur historique battant de la Médina, acrobates, charmeurs de serpents et stands d'épices.",
    lat: 31.6258,
    lng: -7.9891,
  },
  {
    id: "ben-youssef",
    name: "Médersa Ben Youssef",
    duration: "45 mins",
    description: "Joyau de l'architecture hispano-mauresque du XIVe siècle, cèdre sculpté et zelliges impériaux.",
    lat: 31.6318,
    lng: -7.9863,
  },
  {
    id: "bahia-palace",
    name: "Palais de la Bahia",
    duration: "50 mins",
    description: "Chef-d'œuvre du XIXe siècle avec ses 150 pièces décorées, plafonds peints et patios d'orangers.",
    lat: 31.6217,
    lng: -7.9822,
  },
  {
    id: "saadian-tombs",
    name: "Tombeaux Saadiens",
    duration: "40 mins",
    description: "Mausolée royal du XVIe siècle en marbre de Carrare et stucs dentelés dans la Kasbah.",
    lat: 31.6174,
    lng: -7.9892,
  },
  {
    id: "koutoubia-mosque",
    name: "Mosquée Koutoubia & Jardins",
    duration: "30 mins",
    description: "Minaret almohade emblématique du XIIe siècle dominant l'horizon de Marrakech.",
    lat: 31.6238,
    lng: -7.9936,
  },
  {
    id: "jardin-majorelle",
    name: "Jardin Majorelle & Musée YSL",
    duration: "60 mins",
    description: "Oasis botanique bleu outremer créée par Jacques Majorelle et restaurée par Yves Saint Laurent.",
    lat: 31.6417,
    lng: -7.9891,
  },
  {
    id: "le-jardin-secret",
    name: "Le Jardin Secret (Mouassine)",
    duration: "40 mins",
    description: "Jardin islamique d'exception avec son riad d'époque et son système traditionnel de khettaras.",
    lat: 31.6300,
    lng: -7.9880,
  },
  {
    id: "bab-agnaou",
    name: "Porte Historique Bab Agnaou",
    duration: "20 mins",
    description: "Imposante porte almohade du XIIe siècle menant au quartier royal de la Kasbah.",
    lat: 31.6178,
    lng: -7.9906,
  },
  {
    id: "souk-semmarine",
    name: "Souk Semmarine & Marché Artisanal",
    duration: "60 mins",
    description: "Immersion dans les ruelles d'artisans : maroquinerie, dinanderie, babouches et poteries.",
    lat: 31.6275,
    lng: -7.9885,
  },
  {
    id: "rahba-kedima",
    name: "Place des Épices (Rahba Kedima)",
    duration: "30 mins",
    description: "Place animée dédiée aux herboristes, paniers tressés, épices rares et tapis berbères.",
    lat: 31.6288,
    lng: -7.9868,
  },
  {
    id: "badi-palace",
    name: "Palais El Badi",
    duration: "45 mins",
    description: "Ruines grandioses du palais saadien aux cigognes majestueuses et vastes bassins.",
    lat: 31.6186,
    lng: -7.9858,
  },
  {
    id: "mellah-jewish",
    name: "Le Mellah (Ancien Quartier Juif)",
    duration: "40 mins",
    description: "Histoire du judaïsme marocain, synagogue Lazama et architecture aux balcons ouverts.",
    lat: 31.6208,
    lng: -7.9830,
  },
  {
    id: "dar-si-said",
    name: "Musée National du Tissage Dar Si Said",
    duration: "35 mins",
    description: "Somptueux palais riad dédié à l'art du tapis marocain et à la boiserie peinte.",
    lat: 31.6225,
    lng: -7.9839,
  },
  {
    id: "menara-gardens",
    name: "Jardins de la Ménara",
    duration: "45 mins",
    description: "Vaste oliveraie du XIIe siècle avec son bassin monumental reflétant les cimes de l'Atlas.",
    lat: 31.6133,
    lng: -8.0215,
  },
  {
    id: "tanneries-marrakech",
    name: "Tanneries Traditionnelles de Bab Debbagh",
    duration: "30 mins",
    description: "Ateliers ancestraux de tannage du cuir à l'air libre selon des méthodes médiévales.",
    lat: 31.6322,
    lng: -7.9780,
  },
  {
    id: "agafay-desert",
    name: "Désert d'Agafay (Camp & Dunes)",
    duration: "120 mins",
    description: "Désert de pierres blanches ondulées, dromadaires au coucher de soleil et tente nomade.",
    lat: 31.4870,
    lng: -8.1880,
  },
];

interface TourPacksTabProps {
  notify: (msg: string, type?: "success" | "error") => void;
}

export function TourPacksTab({ notify }: TourPacksTabProps) {
  const [tours, setTours] = useState<TourPackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTour, setEditingTour] = useState<TourPackageItem | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Modal tab selector
  const [modalTab, setModalTab] = useState<"pricing" | "description" | "included" | "map">("pricing");

  // Map editor interactive states
  const [selectedPreset, setSelectedPreset] = useState("");
  const [searchLocationText, setSearchLocationText] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [activePreviewStopIndex, setActivePreviewStopIndex] = useState<number | null>(0);
  const [previewMapType, setPreviewMapType] = useState<"k" | "h" | "m">("k");

  // Modal edit form — cardDescription and fullDescription are INDEPENDENT:
  // one is never derived from or written into the other.
  const [modalForm, setModalForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    priceNote: "",
    duration: "",
    groupType: "",
    badge: "",
    active: true,
    cardDescription: "",
    fullDescription: "",
    icon: "compass",
    cls: "t1",
    cardImage: "",
    includedText: "",
    notIncludedText: "",
    itineraryStops: [] as ItineraryStopItem[],
    mapLat: 31.6295,
    mapLng: -7.988,
    mapZoom: 15,
  });

  // Create vs edit mode + delete confirm
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TourPackageItem | null>(null);
  const [isDeletingTour, setIsDeletingTour] = useState(false);

  // Cover photo upload
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverFileRef = React.useRef<HTMLInputElement | null>(null);

  const loadTours = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/adminzaky/tours");
      if (res.ok) {
        const data = await res.json();
        setTours(data.tours || []);
      } else {
        notify("Failed to load tour packages from database", "error");
      }
    } catch {
      notify("Network error loading tour packages", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  // Quick price save directly from card
  const handleQuickSave = async (tour: TourPackageItem, newPrice: string, newNote: string) => {
    setSavingId(tour.id);
    try {
      const res = await fetch("/api/adminzaky/tours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: tour.id,
          price: newPrice,
          priceNote: newNote,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setTours((prev) =>
        prev.map((t) => (t.id === tour.id ? { ...t, price: newPrice, priceNote: newNote } : t))
      );
      notify(`Price for "${tour.title}" updated to ${newPrice}!`);
    } catch (err: any) {
      notify(err.message || "Failed to update price", "error");
    } finally {
      setSavingId(null);
    }
  };

  // Toggle active status
  const handleToggleActive = async (tour: TourPackageItem) => {
    const newActive = !tour.active;
    try {
      const res = await fetch("/api/adminzaky/tours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: tour.id,
          active: newActive,
        }),
      });

      if (!res.ok) throw new Error("Status update failed");

      setTours((prev) =>
        prev.map((t) => (t.id === tour.id ? { ...t, active: newActive } : t))
      );
      notify(`"${tour.title}" is now ${newActive ? "Live (Active)" : "Hidden (Inactive)"}!`);
    } catch {
      notify("Failed to toggle tour status", "error");
    }
  };

  // Open full edit modal
  const openEditModal = (tour: TourPackageItem, initialTab?: "pricing" | "description" | "included" | "map") => {
    setEditingTour(tour);
    setIsCreating(false);
    setModalTab(initialTab || "pricing");
    setActivePreviewStopIndex(0);
    setSelectedPreset("");
    setSearchLocationText("");

    // Parse included and notIncluded
    let incList: string[] = [];
    if (tour.included) {
      try {
        const parsed = JSON.parse(tour.included);
        incList = Array.isArray(parsed) ? parsed : [];
      } catch {
        incList = tour.included.split("\n").map((s) => s.trim()).filter(Boolean);
      }
    }

    let notIncList: string[] = [];
    if (tour.notIncluded) {
      try {
        const parsed = JSON.parse(tour.notIncluded);
        notIncList = Array.isArray(parsed) ? parsed : [];
      } catch {
        notIncList = tour.notIncluded.split("\n").map((s) => s.trim()).filter(Boolean);
      }
    }

    // Parse itinerary stops
    let stops: ItineraryStopItem[] = [];
    if (tour.itinerary) {
      try {
        stops = JSON.parse(tour.itinerary);
      } catch {
        stops = [];
      }
    }

    // Parse mapCenter
    let mapCenter = { lat: 31.6295, lng: -7.988, zoom: 15 };
    if (tour.mapCenter) {
      try {
        mapCenter = JSON.parse(tour.mapCenter);
      } catch {}
    }

    // Prefill each text from its OWN column (fallbacks only for legacy rows).
    // Card text never feeds the full text and vice versa.
    const legacyFirstPara = (tour.description || "").split(/\n\n+/)[0]?.trim() || "";
    setModalForm({
      title: tour.title,
      subtitle: tour.subtitle || "",
      price: tour.price,
      priceNote: tour.priceNote || "",
      duration: tour.duration || "",
      groupType: tour.groupType || "",
      badge: tour.badge || "",
      active: tour.active,
      cardDescription: tour.cardDescription ?? legacyFirstPara,
      fullDescription: tour.fullDescription ?? tour.description ?? "",
      icon: tour.icon || "compass",
      cls: tour.cls || "t1",
      cardImage: tour.cardImage || "",
      includedText: incList.join("\n"),
      notIncludedText: notIncList.join("\n"),
      itineraryStops: stops,
      mapLat: mapCenter.lat || 31.6295,
      mapLng: mapCenter.lng || -7.988,
      mapZoom: mapCenter.zoom || 15,
    });
  };

  // Open blank modal to CREATE a new tour
  const openCreateModal = () => {
    setEditingTour({
      id: "",
      slug: "new-tour",
      title: "",
      subtitle: null,
      price: "",
      priceNote: null,
      duration: null,
      groupType: null,
      languages: null,
      badge: null,
      description: null,
      cardDescription: null,
      fullDescription: null,
      icon: "compass",
      cls: "t1",
      cardImage: null,
      highlights: null,
      included: null,
      notIncluded: null,
      itinerary: null,
      mapCenter: null,
      active: true,
      sortOrder: tours.length,
    });
    setIsCreating(true);
    setModalTab("pricing");
    setActivePreviewStopIndex(null);
    setSelectedPreset("");
    setSearchLocationText("");
    setModalForm({
      title: "",
      subtitle: "",
      price: "",
      priceNote: "",
      duration: "",
      groupType: "",
      badge: "",
      active: true,
      cardDescription: "",
      fullDescription: "",
      icon: "compass",
      cls: "t1",
      cardImage: "",
      includedText: "",
      notIncludedText: "",
      itineraryStops: [],
      mapLat: 31.6295,
      mapLng: -7.988,
      mapZoom: 15,
    });
  };

  // Upload a cover photo file -> store URL in the form (no SiteImage record)
  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/adminzaky/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setModalForm((prev) => ({ ...prev, cardImage: data.url }));
      notify("Cover photo uploaded! Save the tour to publish it.");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploadingCover(false);
      if (coverFileRef.current) coverFileRef.current.value = "";
    }
  };

  // Itinerary Stops Helpers
  const addItineraryStop = () => {
    const nextNum = modalForm.itineraryStops.length + 1;
    const newStop: ItineraryStopItem = {
      stopNumber: nextNum,
      name: `Arrêt ${nextNum}`,
      duration: "45 mins",
      description: "Visite guidée et découverte de ce monument historique.",
      lat: modalForm.mapLat || 31.6295,
      lng: modalForm.mapLng || -7.988,
    };
    const updated = [...modalForm.itineraryStops, newStop];
    setModalForm({
      ...modalForm,
      itineraryStops: updated,
    });
    setActivePreviewStopIndex(updated.length - 1);
  };

  const handleAddPreset = () => {
    if (!selectedPreset) return;
    const preset = MARRAKECH_LANDMARK_PRESETS.find((p) => p.id === selectedPreset);
    if (!preset) return;
    const nextNum = modalForm.itineraryStops.length + 1;
    const newStop: ItineraryStopItem = {
      stopNumber: nextNum,
      name: preset.name,
      duration: preset.duration,
      description: preset.description,
      lat: preset.lat,
      lng: preset.lng,
    };
    const updated = [...modalForm.itineraryStops, newStop];
    setModalForm({
      ...modalForm,
      itineraryStops: updated,
    });
    setActivePreviewStopIndex(updated.length - 1);
    setSelectedPreset("");
    notify(`Arrêt "${preset.name}" ajouté avec ses coordonnées GPS !`);
  };

  const handleGeocodeSearch = async () => {
    const q = searchLocationText.trim();
    if (!q) return;
    setIsGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ", Marrakech, Maroc")}&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const nextNum = modalForm.itineraryStops.length + 1;
        const newStop: ItineraryStopItem = {
          stopNumber: nextNum,
          name: q,
          duration: "45 mins",
          description: `Visite guidée de ${q} avec guide officiel.`,
          lat,
          lng,
        };
        const updated = [...modalForm.itineraryStops, newStop];
        setModalForm({
          ...modalForm,
          itineraryStops: updated,
        });
        setActivePreviewStopIndex(updated.length - 1);
        setSearchLocationText("");
        notify(`Lieu localisé et ajouté : "${q}" (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      } else {
        notify("Lieu introuvable à Marrakech. Veuillez préciser le nom.", "error");
      }
    } catch {
      notify("Erreur lors de la recherche de coordonnées GPS", "error");
    } finally {
      setIsGeocoding(false);
    }
  };

  const moveStopUp = (index: number) => {
    if (index <= 0) return;
    const list = [...modalForm.itineraryStops];
    const temp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = temp;
    const renumbered = list.map((s, idx) => ({ ...s, stopNumber: idx + 1 }));
    setModalForm({ ...modalForm, itineraryStops: renumbered });
    setActivePreviewStopIndex(index - 1);
  };

  const moveStopDown = (index: number) => {
    if (index >= modalForm.itineraryStops.length - 1) return;
    const list = [...modalForm.itineraryStops];
    const temp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = temp;
    const renumbered = list.map((s, idx) => ({ ...s, stopNumber: idx + 1 }));
    setModalForm({ ...modalForm, itineraryStops: renumbered });
    setActivePreviewStopIndex(index + 1);
  };

  const setStopAsMapCenter = (index: number) => {
    const stop = modalForm.itineraryStops[index];
    if (!stop) return;
    setModalForm({
      ...modalForm,
      mapLat: stop.lat,
      mapLng: stop.lng,
    });
    notify(`Le centre de la carte est maintenant fixé sur "${stop.name}" !`);
  };

  const updateItineraryStop = (index: number, field: keyof ItineraryStopItem, value: any) => {
    const updated = [...modalForm.itineraryStops];
    updated[index] = { ...updated[index], [field]: value };
    setModalForm({ ...modalForm, itineraryStops: updated });
  };

  const removeItineraryStop = (index: number) => {
    const updated = modalForm.itineraryStops
      .filter((_, i) => i !== index)
      .map((stop, idx) => ({ ...stop, stopNumber: idx + 1 }));
    setModalForm({ ...modalForm, itineraryStops: updated });
    if (activePreviewStopIndex !== null && activePreviewStopIndex >= updated.length) {
      setActivePreviewStopIndex(updated.length > 0 ? Math.max(0, updated.length - 1) : null);
    }
  };

  // Commit full edit (PUT) or create (POST). Card + Full texts are sent as
  // SEPARATE fields and stored in separate columns — never mixed.
  const handleSaveModal = async () => {
    if (!editingTour) return;
    if (!modalForm.title.trim()) {
      notify("Tour title is required", "error");
      return;
    }
    if (isCreating && !modalForm.price.trim()) {
      notify("Price is required (e.g. 700 MAD)", "error");
      return;
    }
    setSavingId(isCreating ? "new" : editingTour.id);

    // Prepare arrays
    const incArray = modalForm.includedText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const notIncArray = modalForm.notIncludedText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const mapCenterObj = {
      lat: Number(modalForm.mapLat) || 31.6295,
      lng: Number(modalForm.mapLng) || -7.988,
      zoom: Number(modalForm.mapZoom) || 15,
    };

    const payload = {
      ...(isCreating ? {} : { id: editingTour.id }),
      title: modalForm.title,
      subtitle: modalForm.subtitle,
      price: modalForm.price,
      priceNote: modalForm.priceNote,
      duration: modalForm.duration,
      groupType: modalForm.groupType,
      badge: modalForm.badge,
      active: modalForm.active,
      cardDescription: modalForm.cardDescription,
      fullDescription: modalForm.fullDescription,
      icon: modalForm.icon,
      cls: modalForm.cls,
      cardImage: modalForm.cardImage,
      included: JSON.stringify(incArray),
      notIncluded: JSON.stringify(notIncArray),
      itinerary: JSON.stringify(modalForm.itineraryStops),
      mapCenter: JSON.stringify(mapCenterObj),
    };

    try {
      const res = await fetch("/api/adminzaky/tours", {
        method: isCreating ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (isCreating ? "Create failed" : "Update failed"));

      if (isCreating && data.tour) {
        setTours((prev) => [...prev, data.tour]);
        notify(`New tour "${modalForm.title}" created with its own card + full texts!`);
      } else {
        setTours((prev) =>
          prev.map((t) =>
            t.id === editingTour.id
              ? {
                  ...t,
                  ...payload,
                }
              : t
          )
        );
        notify(`Tour package "${modalForm.title}" saved — card & full texts stored separately!`);
      }
      setEditingTour(null);
      setIsCreating(false);
    } catch (err: any) {
      notify(err.message || "Failed to save tour package", "error");
    } finally {
      setSavingId(null);
    }
  };

  // Delete a tour package
  const handleDeleteTour = async () => {
    if (!deleteTarget) return;
    setIsDeletingTour(true);
    try {
      const res = await fetch(
        `/api/adminzaky/tours?id=${encodeURIComponent(deleteTarget.id)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setTours((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      if (editingTour?.id === deleteTarget.id) {
        setEditingTour(null);
        setIsCreating(false);
      }
      setDeleteTarget(null);
      notify(`Tour "${deleteTarget.title}" deleted.`);
    } catch (err: any) {
      notify(err.message || "Failed to delete tour", "error");
    } finally {
      setIsDeletingTour(false);
    }
  };

  const filteredTours = tours.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      (t.subtitle && t.subtitle.toLowerCase().includes(q)) ||
      t.price.toLowerCase().includes(q)
    );
  });

  const activeCount = tours.filter((t) => t.active).length;

  return (
    <div>
      {/* Top Header & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "260px", maxWidth: "480px" }}>
          <input
            type="text"
            placeholder="Search tours by name, price, badge, slug..."
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

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              padding: "8px 14px",
              background: "rgba(212, 163, 89, 0.12)",
              border: "1px solid rgba(212, 163, 89, 0.25)",
              borderRadius: "10px",
              color: "#f5eee4",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#d4a359", fontWeight: 700 }}>{activeCount}</span> / {tours.length} Packs Active
          </div>

          <button
            onClick={() => loadTours()}
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
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>

          <button
            onClick={openCreateModal}
            style={{
              padding: "10px 18px",
              background: "linear-gradient(135deg, #d4a359 0%, #b38237 100%)",
              border: "none",
              borderRadius: "10px",
              color: "#1a140d",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 15px rgba(212, 163, 89, 0.3)",
            }}
          >
            <span style={{ fontSize: "15px" }}>+</span>
            <span>New Tour</span>
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(43, 30, 21, 0.6) 0%, rgba(26, 20, 13, 0.8) 100%)",
          border: "1px solid rgba(212, 163, 89, 0.2)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
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
          🗺️
        </div>
        <div>
          <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#f5eee4" }}>
            Éditeur Complet de Circuits, Tarifs, Textes & Carte Itinéraire
          </h4>
          <p style={{ margin: 0, fontSize: "12.5px", color: "#a89b8c", lineHeight: 1.4 }}>
            Chaque circuit possède <strong style={{ color: "#ffd79a" }}>2 textes indépendants</strong> : la <strong style={{ color: "#ffd79a" }}>Card Description</strong> (carte, page Tours) et la <strong style={{ color: "#ffd79a" }}>Full Tour Description</strong> (page détaillée après &quot;Discover More&quot;). Modifier l&apos;un ne touche jamais l&apos;autre. Prix, badge, icône, inclus et carte GPS restent synchronisés avec PostgreSQL Neon.
          </p>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#d4a359" }}>
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>⏳</div>
          <div style={{ fontSize: "15px", fontWeight: 600 }}>Loading tour packages from Neon database...</div>
        </div>
      ) : filteredTours.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
            background: "rgba(24, 20, 16, 0.4)",
            borderRadius: "12px",
            border: "1px dashed rgba(212, 163, 89, 0.2)",
            color: "#a89b8c",
          }}
        >
          No tour packages matching &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        /* Tours Grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredTours.map((tour) => (
            <TourCardItem
              key={tour.id}
              tour={tour}
              saving={savingId === tour.id}
              onQuickSave={handleQuickSave}
              onToggleActive={handleToggleActive}
              onOpenEdit={openEditModal}
              onDelete={(t) => setDeleteTarget(t)}
            />
          ))}
        </div>
      )}

      {/* Comprehensive Full Edit Modal */}
      {editingTour && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "#1c1611",
              border: "1px solid rgba(212, 163, 89, 0.35)",
              borderRadius: "18px",
              padding: "24px 28px",
              maxWidth: modalTab === "map" ? "1180px" : "760px",
              width: "100%",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7)",
              maxHeight: "92vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              transition: "max-width 0.25s ease",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                borderBottom: "1px solid rgba(212, 163, 89, 0.15)",
                paddingBottom: "14px",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#f5eee4" }}>
                  {isCreating ? "Nouveau Circuit" : `Modifier Circuit : ${editingTour.title}`}
                </h3>
                <span style={{ fontSize: "11.5px", color: "#d4a359", fontFamily: "monospace" }}>
                  {isCreating
                    ? "slug généré automatiquement depuis le titre"
                    : `slug: /${editingTour.slug}`}
                </span>
              </div>
              <button
                onClick={() => {
                  setEditingTour(null);
                  setIsCreating(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a89b8c",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                background: "rgba(26, 20, 15, 0.8)",
                padding: "4px",
                borderRadius: "10px",
                marginBottom: "20px",
                border: "1px solid rgba(212, 163, 89, 0.2)",
                overflowX: "auto",
              }}
            >
              <button
                type="button"
                onClick={() => setModalTab("pricing")}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: modalTab === "pricing" ? "#d4a359" : "transparent",
                  color: modalTab === "pricing" ? "#1a140d" : "#c5b8a6",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                🏷️ Tarifs & Infos
              </button>

              <button
                type="button"
                onClick={() => setModalTab("description")}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: modalTab === "description" ? "#d4a359" : "transparent",
                  color: modalTab === "description" ? "#1a140d" : "#c5b8a6",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                📝 Card & Page Texts
              </button>

              <button
                type="button"
                onClick={() => setModalTab("included")}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: modalTab === "included" ? "#d4a359" : "transparent",
                  color: modalTab === "included" ? "#1a140d" : "#c5b8a6",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                ✅ Inclus & Non Inclus
              </button>

              <button
                type="button"
                onClick={() => setModalTab("map")}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: modalTab === "map" ? "#d4a359" : "transparent",
                  color: modalTab === "map" ? "#1a140d" : "#c5b8a6",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                🗺️ Carte & Itinéraire ({modalForm.itineraryStops.length})
              </button>
            </div>

            {/* Modal Body depending on Tab */}
            <div style={{ flex: 1 }}>
              {/* SUBTAB 1: PRICING & GENERAL */}
              {modalTab === "pricing" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                      Titre du Circuit
                    </label>
                    <input
                      type="text"
                      value={modalForm.title}
                      onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        background: "#14100c",
                        border: "1px solid rgba(212, 163, 89, 0.25)",
                        borderRadius: "8px",
                        color: "#f5eee4",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                      Sous-titre / Accroche
                    </label>
                    <input
                      type="text"
                      value={modalForm.subtitle}
                      onChange={(e) => setModalForm({ ...modalForm, subtitle: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        background: "#14100c",
                        border: "1px solid rgba(212, 163, 89, 0.25)",
                        borderRadius: "8px",
                        color: "#f5eee4",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Prix Affiché (MAD / €)
                      </label>
                      <input
                        type="text"
                        placeholder="ex: 700 MAD"
                        value={modalForm.price}
                        onChange={(e) => setModalForm({ ...modalForm, price: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid #d4a359",
                          borderRadius: "8px",
                          color: "#ffd79a",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Précision Tarifaire (Price Note)
                      </label>
                      <input
                        type="text"
                        placeholder="ex: 700 MAD par groupe jusqu'à 10 personnes"
                        value={modalForm.priceNote}
                        onChange={(e) => setModalForm({ ...modalForm, priceNote: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Durée Estimée
                      </label>
                      <input
                        type="text"
                        placeholder="ex: 3–4 hours"
                        value={modalForm.duration}
                        onChange={(e) => setModalForm({ ...modalForm, duration: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "13px",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Taille Groupe / Type
                      </label>
                      <input
                        type="text"
                        placeholder="ex: 1–10 guests | Private Tour"
                        value={modalForm.groupType}
                        onChange={(e) => setModalForm({ ...modalForm, groupType: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px", alignItems: "center" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Badge Promotionnel
                      </label>
                      <select
                        value={modalForm.badge}
                        onChange={(e) => setModalForm({ ...modalForm, badge: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "13px",
                        }}
                      >
                        <option value="">Aucun badge</option>
                        <option value="Most Popular">Most Popular (Le plus réservé)</option>
                        <option value="Best Seller">Best Seller (Coup de cœur)</option>
                        <option value="Signature">Signature (Exclusivité Zaky)</option>
                        <option value="Tailor Made">Tailor Made (Sur mesure)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Statut sur le site
                      </label>
                      <button
                        type="button"
                        onClick={() => setModalForm({ ...modalForm, active: !modalForm.active })}
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: modalForm.active ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                          border: `1px solid ${modalForm.active ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                          color: modalForm.active ? "#86efac" : "#fca5a5",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {modalForm.active ? "● Actif (En Ligne)" : "○ Inactif (Masqué)"}
                      </button>
                    </div>
                  </div>

                  {/* Card visual: icon + color theme (per tour, independent) */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Icône de la Carte (Image)
                      </label>
                      <select
                        value={modalForm.icon}
                        onChange={(e) => setModalForm({ ...modalForm, icon: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "13px",
                        }}
                      >
                        {TOUR_ICON_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#d8cebe", marginBottom: "6px" }}>
                        Couleur de la Carte (Thème)
                      </label>
                      <select
                        value={modalForm.cls}
                        onChange={(e) => setModalForm({ ...modalForm, cls: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "#14100c",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "13px",
                        }}
                      >
                        {TOUR_THEME_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.id} — {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Live card visual preview (same icon + theme as the website card) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      background: "#14100c",
                      border: "1px solid rgba(212, 163, 89, 0.2)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                    }}
                  >
                    <div
                      className={`tour-photo ${modalForm.cls}`}
                      style={{ width: "64px", height: "52px", borderRadius: "10px", flexShrink: 0 }}
                    >
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ width: "60%", height: "60%" }}
                      >
                        <TourIcon type={modalForm.icon as "gate" | "basket" | "palace" | "tea" | "monument" | "compass" | "road"} />
                      </svg>
                    </div>
                    <span style={{ fontSize: "12px", color: "#a89b8c", lineHeight: 1.5 }}>
                      Aperçu en direct de l&apos;icône et de la couleur affichées sur la carte du site. Le design des cartes reste inchangé — seule l&apos;icône et la couleur sont personnalisables.
                    </span>
                  </div>

                  {/* Cover photo for the main Tours card */}
                  <div
                    style={{
                      background: "#14100c",
                      border: "1px solid rgba(212, 163, 89, 0.2)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <label style={{ fontSize: "12px", fontWeight: 700, color: "#d8cebe" }}>
                        🖼️ Photo de couverture (carte, page Tours)
                      </label>
                      {modalForm.cardImage ? (
                        <button
                          type="button"
                          onClick={() => setModalForm({ ...modalForm, cardImage: "" })}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(239, 68, 68, 0.12)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: "6px",
                            color: "#fca5a5",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✕ Retirer (retour à l&apos;icône)
                        </button>
                      ) : null}
                    </div>
                    <p style={{ margin: 0, fontSize: "11.5px", color: "#a89b8c", lineHeight: 1.5 }}>
                      Quand une photo est définie, elle remplace l&apos;icône sur la carte. Sans photo, la carte garde son design icône + couleur.
                    </p>

                    {modalForm.cardImage ? (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "150px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          background: "#000",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={modalForm.cardImage}
                          alt="Cover preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ) : null}

                    <input
                      type="file"
                      ref={coverFileRef}
                      onChange={handleCoverFileUpload}
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => coverFileRef.current?.click()}
                        disabled={uploadingCover}
                        style={{
                          padding: "9px 16px",
                          background: "rgba(212, 163, 89, 0.15)",
                          border: "1px solid rgba(212, 163, 89, 0.35)",
                          borderRadius: "8px",
                          color: "#ffd79a",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: uploadingCover ? "wait" : "pointer",
                        }}
                      >
                        {uploadingCover ? "Envoi en cours..." : "⬆ Uploader une photo"}
                      </button>
                      <input
                        type="text"
                        value={modalForm.cardImage}
                        onChange={(e) => setModalForm({ ...modalForm, cardImage: e.target.value })}
                        placeholder="/images/ma-photo.jpg ou https://..."
                        style={{
                          flex: 1,
                          minWidth: "200px",
                          padding: "9px 12px",
                          background: "#0e0c0a",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "8px",
                          color: "#f5eee4",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: CARD + FULL DESCRIPTIONS (independent) */}
              {modalTab === "description" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div
                    style={{
                      background: "rgba(212, 163, 89, 0.08)",
                      border: "1px solid rgba(212, 163, 89, 0.25)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "12px",
                      color: "#e8ded2",
                      lineHeight: 1.5,
                    }}
                  >
                    🗂️ <strong>2 textes 100% indépendants.</strong> La <strong>Card Description</strong> s&apos;affiche <strong>uniquement</strong> sur la carte (page Tours). La <strong>Full Tour Description</strong> s&apos;affiche <strong>uniquement</strong> sur la page détaillée (après &quot;Discover More&quot;). Modifier l&apos;un ne modifie jamais l&apos;autre.
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 700, color: "#d8cebe" }}>
                        🃏 Card Description <span style={{ fontWeight: 400, color: "#a89b8c" }}>— carte, page Tours (court)</span>
                      </label>
                      <span style={{ fontSize: "11px", color: modalForm.cardDescription.length > 280 ? "#fca5a5" : "#8e8071" }}>
                        {modalForm.cardDescription.length} caractères
                      </span>
                    </div>
                    <p style={{ margin: "0 0 8px 0", fontSize: "11.5px", color: "#a89b8c" }}>
                      Texte concis affiché dans la carte du circuit. Idéal : 150–250 caractères.
                    </p>
                    <textarea
                      rows={4}
                      value={modalForm.cardDescription}
                      onChange={(e) => setModalForm({ ...modalForm, cardDescription: e.target.value })}
                      placeholder="Short teaser shown on the tour card, e.g. Discover the heart of Marrakesh on a private walking tour..."
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "#14100c",
                        border: "1px solid rgba(212, 163, 89, 0.25)",
                        borderRadius: "8px",
                        color: "#f5eee4",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: 700, color: "#d8cebe" }}>
                        📖 Full Tour Description <span style={{ fontWeight: 400, color: "#a89b8c" }}>— page détaillée (Experience Overview)</span>
                      </label>
                      <span style={{ fontSize: "11px", color: "#8e8071" }}>
                        {modalForm.fullDescription.split(/\n\n+/).filter((p) => p.trim()).length} paragraphe(s)
                      </span>
                    </div>
                    <p style={{ margin: "0 0 8px 0", fontSize: "11.5px", color: "#a89b8c" }}>
                      Récit détaillé affiché dans la section &quot;Experience Overview&quot; de la page du circuit. Séparez vos paragraphes par une ligne vide.
                    </p>
                    <textarea
                      rows={10}
                      value={modalForm.fullDescription}
                      onChange={(e) => setModalForm({ ...modalForm, fullDescription: e.target.value })}
                      placeholder="Décrivez en détail l'expérience, l'histoire et les moments forts de ce circuit..."
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "#14100c",
                        border: "1px solid rgba(212, 163, 89, 0.25)",
                        borderRadius: "8px",
                        color: "#f5eee4",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* SUBTAB 3: INCLUDED / NOT INCLUDED */}
              {modalTab === "included" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>
                      <label style={{ fontSize: "13px", fontWeight: 700, color: "#d8cebe" }}>
                        Ce qui est Inclus (What&apos;s Included)
                      </label>
                    </div>
                    <p style={{ margin: "0 0 8px 0", fontSize: "11.5px", color: "#a89b8c" }}>
                      Entrez un élément par ligne (ex: &quot;Guide officiel agréé&quot;, &quot;Visite à pied personnalisée&quot;, etc.)
                    </p>
                    <textarea
                      rows={6}
                      value={modalForm.includedText}
                      onChange={(e) => setModalForm({ ...modalForm, includedText: e.target.value })}
                      placeholder="Guide officiel agréé&#10;Visite personnalisée à pied&#10;Anecdotes locales & histoire&#10;Conseils et recommandations personnalisées"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        background: "#14100c",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        borderRadius: "8px",
                        color: "#f5eee4",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ color: "#f87171", fontWeight: 700 }}>✕</span>
                      <label style={{ fontSize: "13px", fontWeight: 700, color: "#d8cebe" }}>
                        Ce qui n&apos;est pas Inclus (What&apos;s Not Included)
                      </label>
                    </div>
                    <p style={{ margin: "0 0 8px 0", fontSize: "11.5px", color: "#a89b8c" }}>
                      Entrez un élément par ligne (ex: &quot;Billets d&apos;entrée aux monuments&quot;, &quot;Repas & boissons&quot;)
                    </p>
                    <textarea
                      rows={5}
                      value={modalForm.notIncludedText}
                      onChange={(e) => setModalForm({ ...modalForm, notIncludedText: e.target.value })}
                      placeholder="Billets d'entrée aux monuments&#10;Repas et boissons non spécifiés&#10;Achats personnels & pourboires"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        background: "#14100c",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "8px",
                        color: "#f5eee4",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* SUBTAB 4: MAP & ITINERARY */}
              {modalTab === "map" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Visual Notification / Guidance */}
                  <div
                    style={{
                      background: "rgba(212, 163, 89, 0.08)",
                      border: "1px solid rgba(212, 163, 89, 0.25)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "18px" }}>🗺️</span>
                      <span style={{ fontSize: "12.5px", color: "#e8ded2", lineHeight: 1.4 }}>
                        Éditez les <strong>arrêts</strong>, <strong>coordonnées GPS</strong> et le{" "}
                        <strong>point central</strong> du circuit. Aperçu satellite interactif en direct à droite.
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          background: "rgba(212, 163, 89, 0.2)",
                          borderRadius: "6px",
                          color: "#ffd79a",
                          fontWeight: 700,
                        }}
                      >
                        {modalForm.itineraryStops.length} arrêt{modalForm.itineraryStops.length > 1 ? "s" : ""}
                      </span>
                      {modalForm.itineraryStops.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setStopAsMapCenter(0)}
                          style={{
                            padding: "4px 9px",
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "6px",
                            color: "#d8cebe",
                            fontSize: "11px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                          title="Aligner le centre de la carte sur le 1er arrêt"
                        >
                          🎯 Centrer sur arrêt #1
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 2-Column Split: Left Editor, Right Live Satellite Map */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.1fr 0.9fr",
                      gap: "20px",
                      alignItems: "start",
                    }}
                  >
                    {/* LEFT COLUMN: Toolbars, Coordinates & Stops List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {/* Presets & Geocoding Bar */}
                      <div
                        style={{
                          background: "rgba(20, 16, 12, 0.85)",
                          border: "1px solid rgba(212, 163, 89, 0.25)",
                          borderRadius: "10px",
                          padding: "12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {/* Landmark Preset Selector */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#ffd79a",
                              marginBottom: "5px",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                            }}
                          >
                            🌟 Ajouter un monument célèbre (16 présélections)
                          </label>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <select
                              value={selectedPreset}
                              onChange={(e) => setSelectedPreset(e.target.value)}
                              style={{
                                flex: 1,
                                padding: "7px 10px",
                                background: "#14100c",
                                border: "1px solid rgba(212, 163, 89, 0.35)",
                                borderRadius: "6px",
                                color: "#f5eee4",
                                fontSize: "12px",
                                outline: "none",
                              }}
                            >
                              <option value="">Sélectionner un monument de Marrakech...</option>
                              {MARRAKECH_LANDMARK_PRESETS.map((preset) => (
                                <option key={preset.id} value={preset.id}>
                                  {preset.name} ({preset.duration})
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={handleAddPreset}
                              disabled={!selectedPreset}
                              style={{
                                padding: "7px 14px",
                                background: selectedPreset
                                  ? "linear-gradient(135deg, #d4a359 0%, #b38237 100%)"
                                  : "rgba(255, 255, 255, 0.08)",
                                border: "none",
                                borderRadius: "6px",
                                color: selectedPreset ? "#1a140d" : "#73675a",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: selectedPreset ? "pointer" : "not-allowed",
                                whiteSpace: "nowrap",
                              }}
                            >
                              + Ajouter
                            </button>
                          </div>
                        </div>

                        {/* OpenStreetMap Nominatim Live Geocoding Search */}
                        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "8px" }}>
                          <label
                            style={{
                              display: "block",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#c5b8a6",
                              marginBottom: "5px",
                            }}
                          >
                            🔍 Ou rechercher un lieu / rue à Marrakech (OSM Nominatim)
                          </label>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <input
                              type="text"
                              value={searchLocationText}
                              onChange={(e) => setSearchLocationText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleGeocodeSearch();
                                }
                              }}
                              placeholder="Ex: Bab Agnaou, Rahba Kedima, Dar Si Said..."
                              style={{
                                flex: 1,
                                padding: "7px 10px",
                                background: "#14100c",
                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                borderRadius: "6px",
                                color: "#f5eee4",
                                fontSize: "12px",
                                outline: "none",
                              }}
                            />
                            <button
                              type="button"
                              onClick={handleGeocodeSearch}
                              disabled={isGeocoding || !searchLocationText.trim()}
                              style={{
                                padding: "7px 14px",
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: "6px",
                                color: "#ffd79a",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: isGeocoding || !searchLocationText.trim() ? "not-allowed" : "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {isGeocoding ? "Recherche..." : "GPS 📍"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Map Center & Zoom Coordinates */}
                      <div
                        style={{
                          background: "rgba(20, 16, 12, 0.8)",
                          border: "1px solid rgba(212, 163, 89, 0.2)",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "10px",
                        }}
                      >
                        <div>
                          <label style={{ display: "block", fontSize: "10.5px", color: "#a89b8c", marginBottom: "3px" }}>
                            Centre : Latitude
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={modalForm.mapLat}
                            onChange={(e) => setModalForm({ ...modalForm, mapLat: parseFloat(e.target.value) || 0 })}
                            style={{
                              width: "100%",
                              padding: "5px 8px",
                              background: "#14100c",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              borderRadius: "6px",
                              color: "#f5eee4",
                              fontSize: "11.5px",
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "10.5px", color: "#a89b8c", marginBottom: "3px" }}>
                            Centre : Longitude
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={modalForm.mapLng}
                            onChange={(e) => setModalForm({ ...modalForm, mapLng: parseFloat(e.target.value) || 0 })}
                            style={{
                              width: "100%",
                              padding: "5px 8px",
                              background: "#14100c",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              borderRadius: "6px",
                              color: "#f5eee4",
                              fontSize: "11.5px",
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "10.5px", color: "#a89b8c", marginBottom: "3px" }}>
                            Zoom (ex: 15)
                          </label>
                          <input
                            type="number"
                            value={modalForm.mapZoom}
                            onChange={(e) => setModalForm({ ...modalForm, mapZoom: parseInt(e.target.value, 10) || 15 })}
                            style={{
                              width: "100%",
                              padding: "5px 8px",
                              background: "#14100c",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              borderRadius: "6px",
                              color: "#f5eee4",
                              fontSize: "11.5px",
                            }}
                          />
                        </div>
                      </div>

                      {/* Stops Header & Manual Add */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#d8cebe" }}>
                            Étapes & Arrêts du Circuit
                          </span>
                          <span style={{ fontSize: "11px", color: "#8e8071" }}>
                            ({modalForm.itineraryStops.length})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={addItineraryStop}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(212, 163, 89, 0.15)",
                            border: "1px solid rgba(212, 163, 89, 0.3)",
                            borderRadius: "6px",
                            color: "#ffd79a",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span>+</span>
                          <span>Arrêt Manuel</span>
                        </button>
                      </div>

                      {/* Stops List */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          maxHeight: "440px",
                          overflowY: "auto",
                          paddingRight: "4px",
                        }}
                      >
                        {modalForm.itineraryStops.length === 0 ? (
                          <div
                            style={{
                              padding: "24px",
                              textAlign: "center",
                              background: "rgba(20, 16, 12, 0.5)",
                              border: "1px dashed rgba(212, 163, 89, 0.25)",
                              borderRadius: "10px",
                              color: "#8e8071",
                              fontSize: "12.5px",
                            }}
                          >
                            Aucun arrêt défini pour ce circuit.
                            <div style={{ marginTop: "6px", color: "#ffd79a", fontSize: "11.5px" }}>
                              Sélectionnez un monument ci-dessus ou ajoutez un arrêt manuellement !
                            </div>
                          </div>
                        ) : (
                          modalForm.itineraryStops.map((stop, idx) => {
                            const isFocusedOnMap = activePreviewStopIndex === idx;
                            return (
                              <div
                                key={idx}
                                style={{
                                  background: isFocusedOnMap ? "rgba(36, 28, 20, 0.95)" : "rgba(20, 16, 12, 0.9)",
                                  border: `1px solid ${isFocusedOnMap ? "rgba(212, 163, 89, 0.6)" : "rgba(212, 163, 89, 0.2)"}`,
                                  borderRadius: "10px",
                                  padding: "12px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  boxShadow: isFocusedOnMap ? "0 0 14px rgba(212, 163, 89, 0.15)" : "none",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                {/* Top Row: Index Badge, Name, Duration, Actions */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}>
                                    <span
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        background: isFocusedOnMap ? "#ffd79a" : "#d4a359",
                                        color: "#1a140d",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "11px",
                                        fontWeight: 800,
                                        flexShrink: 0,
                                      }}
                                    >
                                      {stop.stopNumber || idx + 1}
                                    </span>
                                    <input
                                      type="text"
                                      value={stop.name}
                                      onChange={(e) => updateItineraryStop(idx, "name", e.target.value)}
                                      placeholder="Nom du lieu (ex: Palais Bahia)"
                                      style={{
                                        flex: 1,
                                        padding: "6px 8px",
                                        background: "#14100c",
                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                        borderRadius: "6px",
                                        color: "#f5eee4",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                      }}
                                    />
                                  </div>

                                  <input
                                    type="text"
                                    value={stop.duration}
                                    onChange={(e) => updateItineraryStop(idx, "duration", e.target.value)}
                                    placeholder="Durée (ex: 45 mins)"
                                    style={{
                                      width: "85px",
                                      padding: "6px 8px",
                                      background: "#14100c",
                                      border: "1px solid rgba(255, 255, 255, 0.12)",
                                      borderRadius: "6px",
                                      color: "#ffd79a",
                                      fontSize: "11.5px",
                                    }}
                                  />

                                  {/* Quick Order Buttons & Actions */}
                                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                    <button
                                      type="button"
                                      onClick={() => moveStopUp(idx)}
                                      disabled={idx === 0}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: idx === 0 ? "#4a4035" : "#c5b8a6",
                                        fontSize: "13px",
                                        cursor: idx === 0 ? "default" : "pointer",
                                        padding: "4px",
                                      }}
                                      title="Monter cet arrêt"
                                    >
                                      ▲
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => moveStopDown(idx)}
                                      disabled={idx === modalForm.itineraryStops.length - 1}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: idx === modalForm.itineraryStops.length - 1 ? "#4a4035" : "#c5b8a6",
                                        fontSize: "13px",
                                        cursor: idx === modalForm.itineraryStops.length - 1 ? "default" : "pointer",
                                        padding: "4px",
                                      }}
                                      title="Descendre cet arrêt"
                                    >
                                      ▼
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setActivePreviewStopIndex(idx)}
                                      style={{
                                        background: isFocusedOnMap ? "rgba(212, 163, 89, 0.3)" : "none",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: "13px",
                                        cursor: "pointer",
                                        padding: "4px",
                                      }}
                                      title="Voir cet arrêt sur la carte satellite à droite"
                                    >
                                      👁️
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setStopAsMapCenter(idx)}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "13px",
                                        cursor: "pointer",
                                        padding: "4px",
                                      }}
                                      title="Définir comme centre du circuit"
                                    >
                                      🎯
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => removeItineraryStop(idx)}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: "#f87171",
                                        fontSize: "13px",
                                        cursor: "pointer",
                                        padding: "4px",
                                      }}
                                      title="Supprimer cet arrêt"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>

                                {/* Description Input */}
                                <input
                                  type="text"
                                  value={stop.description}
                                  onChange={(e) => updateItineraryStop(idx, "description", e.target.value)}
                                  placeholder="Description de l'étape et points forts..."
                                  style={{
                                    width: "100%",
                                    padding: "6px 8px",
                                    background: "#14100c",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "6px",
                                    color: "#c5b8a6",
                                    fontSize: "11.5px",
                                  }}
                                />

                                {/* Lat / Lng inputs */}
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
                                    <span style={{ fontSize: "10px", color: "#8e8071" }}>Lat:</span>
                                    <input
                                      type="number"
                                      step="any"
                                      value={stop.lat}
                                      onChange={(e) => updateItineraryStop(idx, "lat", parseFloat(e.target.value) || 0)}
                                      style={{
                                        width: "100%",
                                        padding: "4px 6px",
                                        background: "#14100c",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "4px",
                                        color: "#f5eee4",
                                        fontSize: "11px",
                                      }}
                                    />
                                  </div>

                                  <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
                                    <span style={{ fontSize: "10px", color: "#8e8071" }}>Lng:</span>
                                    <input
                                      type="number"
                                      step="any"
                                      value={stop.lng}
                                      onChange={(e) => updateItineraryStop(idx, "lng", parseFloat(e.target.value) || 0)}
                                      style={{
                                        width: "100%",
                                        padding: "4px 6px",
                                        background: "#14100c",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "4px",
                                        color: "#f5eee4",
                                        fontSize: "11px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Live Interactive Satellite Map Viewer */}
                    <div
                      style={{
                        position: "sticky",
                        top: "0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        background: "rgba(20, 16, 12, 0.95)",
                        border: "1px solid rgba(212, 163, 89, 0.3)",
                        borderRadius: "12px",
                        padding: "14px",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {/* Satellite Viewer Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "14px" }}>🛰️</span>
                            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffd79a" }}>
                              Aperçu Satellite en Direct
                            </span>
                          </div>
                          <div style={{ fontSize: "11px", color: "#a89b8c", marginTop: "2px" }}>
                            {activePreviewStopIndex !== null && modalForm.itineraryStops[activePreviewStopIndex] ? (
                              <span>
                                Focus: <strong>Étape {activePreviewStopIndex + 1}</strong> &ndash;{" "}
                                {modalForm.itineraryStops[activePreviewStopIndex].name}
                              </span>
                            ) : (
                              <span>Focus: <strong>Centre général du circuit</strong></span>
                            )}
                          </div>
                        </div>

                        {/* Map Style Selector: Satellite / Hybrid / Streets */}
                        <div
                          style={{
                            display: "flex",
                            background: "rgba(0, 0, 0, 0.4)",
                            padding: "2px",
                            borderRadius: "6px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setPreviewMapType("k")}
                            style={{
                              padding: "4px 8px",
                              background: previewMapType === "k" ? "rgba(212, 163, 89, 0.35)" : "transparent",
                              border: "none",
                              borderRadius: "4px",
                              color: previewMapType === "k" ? "#ffd79a" : "#8e8071",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Satellite
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMapType("h")}
                            style={{
                              padding: "4px 8px",
                              background: previewMapType === "h" ? "rgba(212, 163, 89, 0.35)" : "transparent",
                              border: "none",
                              borderRadius: "4px",
                              color: previewMapType === "h" ? "#ffd79a" : "#8e8071",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Hybride
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMapType("m")}
                            style={{
                              padding: "4px 8px",
                              background: previewMapType === "m" ? "rgba(212, 163, 89, 0.35)" : "transparent",
                              border: "none",
                              borderRadius: "4px",
                              color: previewMapType === "m" ? "#ffd79a" : "#8e8071",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Plan
                          </button>
                        </div>
                      </div>

                      {/* Map Embed Frame */}
                      {(() => {
                        const targetStop =
                          activePreviewStopIndex !== null && modalForm.itineraryStops[activePreviewStopIndex]
                            ? modalForm.itineraryStops[activePreviewStopIndex]
                            : null;
                        const displayLat = targetStop ? targetStop.lat : modalForm.mapLat || 31.6295;
                        const displayLng = targetStop ? targetStop.lng : modalForm.mapLng || -7.988;
                        const mapZoom = targetStop ? 16 : modalForm.mapZoom || 15;
                        const mapSrc = `https://maps.google.com/maps?q=${displayLat},${displayLng}&z=${mapZoom}&t=${previewMapType}&output=embed`;

                        return (
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div
                              style={{
                                width: "100%",
                                height: "350px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid rgba(212, 163, 89, 0.3)",
                                background: "#0c0a08",
                                position: "relative",
                              }}
                            >
                              <iframe
                                title="Aperçu Carte Satellite"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={mapSrc}
                                allowFullScreen
                                loading="lazy"
                              />
                            </div>

                            {/* Controls Below Map */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                              <button
                                type="button"
                                onClick={() => setActivePreviewStopIndex(null)}
                                style={{
                                  padding: "5px 10px",
                                  background: activePreviewStopIndex === null ? "rgba(212, 163, 89, 0.25)" : "rgba(255, 255, 255, 0.06)",
                                  border: "1px solid rgba(212, 163, 89, 0.3)",
                                  borderRadius: "6px",
                                  color: activePreviewStopIndex === null ? "#ffd79a" : "#c5b8a6",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                🎯 Vue Centre Global
                              </button>

                              <a
                                href={`https://www.google.com/maps?q=${displayLat},${displayLng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  padding: "5px 10px",
                                  background: "transparent",
                                  border: "1px solid rgba(255, 255, 255, 0.15)",
                                  borderRadius: "6px",
                                  color: "#ffd79a",
                                  fontSize: "11px",
                                  textDecoration: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <span>Google Maps</span>
                                <span>↗</span>
                              </a>
                            </div>

                            {/* Route Flow Quick Navigation Chips */}
                            {modalForm.itineraryStops.length > 0 && (
                              <div style={{ marginTop: "4px" }}>
                                <div style={{ fontSize: "10.5px", color: "#8e8071", marginBottom: "4px" }}>
                                  Sélection rapide de l&apos;étape :
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "4px",
                                    flexWrap: "wrap",
                                    maxHeight: "80px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {modalForm.itineraryStops.map((s, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={() => setActivePreviewStopIndex(i)}
                                      style={{
                                        padding: "3px 8px",
                                        background:
                                          activePreviewStopIndex === i
                                            ? "rgba(212, 163, 89, 0.35)"
                                            : "rgba(255, 255, 255, 0.05)",
                                        border: `1px solid ${
                                          activePreviewStopIndex === i
                                            ? "rgba(212, 163, 89, 0.6)"
                                            : "rgba(255, 255, 255, 0.1)"
                                        }`,
                                        borderRadius: "4px",
                                        color: activePreviewStopIndex === i ? "#ffd79a" : "#a89b8c",
                                        fontSize: "10.5px",
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {i + 1}. {s.name || `Étape ${i + 1}`}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(212, 163, 89, 0.15)",
              }}
            >
              <div style={{ fontSize: "11.5px", color: "#8e8071" }}>
                {isCreating
                  ? "Crée le circuit avec textes card + page indépendants"
                  : "Enregistre textes card + page (séparés), inclusions & carte dans Neon DB"}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTour(null);
                    setIsCreating(false);
                  }}
                  style={{
                    padding: "10px 18px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: "#d8cebe",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={handleSaveModal}
                  disabled={savingId === (isCreating ? "new" : editingTour.id)}
                  style={{
                    padding: "10px 22px",
                    background: "linear-gradient(135deg, #d4a359 0%, #b38237 100%)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#1a140d",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(212, 163, 89, 0.3)",
                  }}
                >
                  {savingId === (isCreating ? "new" : editingTour.id)
                    ? "Sauvegarde en cours..."
                    : isCreating
                      ? "Créer le Circuit"
                      : "Enregistrer dans Neon"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete tour confirmation */}
      {deleteTarget && (
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
            if (e.target === e.currentTarget) setDeleteTarget(null);
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
              Supprimer ce circuit ?
            </h3>
            <p style={{ fontSize: "13px", color: "#a89b8c", margin: "0 0 6px 0", lineHeight: 1.5 }}>
              <strong style={{ color: "#f5eee4" }}>{deleteTarget.title}</strong>
              <br />
              <code style={{ color: "#fca5a5" }}>/{deleteTarget.slug}</code> sera retiré du site et de la base de données.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={handleDeleteTour}
                disabled={isDeletingTour}
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
                {isDeletingTour ? "Suppression..." : "Oui, Supprimer"}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
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
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Tour Card Component with inline quick price edit
function TourCardItem({
  tour,
  saving,
  onQuickSave,
  onToggleActive,
  onOpenEdit,
  onDelete,
}: {
  tour: TourPackageItem;
  saving: boolean;
  onQuickSave: (tour: TourPackageItem, newPrice: string, newNote: string) => void;
  onToggleActive: (tour: TourPackageItem) => void;
  onOpenEdit: (tour: TourPackageItem, initialTab?: "pricing" | "description" | "included" | "map") => void;
  onDelete: (tour: TourPackageItem) => void;
}) {
  const [quickPrice, setQuickPrice] = useState(tour.price);
  const [quickNote, setQuickNote] = useState(tour.priceNote || "");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setQuickPrice(tour.price);
    setQuickNote(tour.priceNote || "");
    setIsDirty(false);
  }, [tour.price, tour.priceNote]);

  const handlePriceChange = (val: string) => {
    setQuickPrice(val);
    setIsDirty(val !== tour.price || quickNote !== (tour.priceNote || ""));
  };

  const handleNoteChange = (val: string) => {
    setQuickNote(val);
    setIsDirty(quickPrice !== tour.price || val !== (tour.priceNote || ""));
  };

  // Check itinerary count
  let stopsCount = 0;
  if (tour.itinerary) {
    try {
      const parsed = JSON.parse(tour.itinerary);
      if (Array.isArray(parsed)) stopsCount = parsed.length;
    } catch {}
  }

  return (
    <div
      style={{
        background: "rgba(30, 24, 18, 0.75)",
        border: `1px solid ${tour.active ? "rgba(212, 163, 89, 0.25)" : "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        opacity: tour.active ? 1 : 0.75,
        transition: "all 0.2s ease",
      }}
    >
      {/* Top Details & Badges */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
              <span
                style={{
                  fontSize: "10.5px",
                  fontFamily: "monospace",
                  padding: "2px 7px",
                  borderRadius: "6px",
                  background: "rgba(212, 163, 89, 0.15)",
                  color: "#d4a359",
                  fontWeight: 600,
                }}
              >
                /{tour.slug}
              </span>

              {tour.badge && (
                <span
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    background: "#c25e38",
                    color: "#f5eee4",
                    fontWeight: 700,
                  }}
                >
                  {tour.badge}
                </span>
              )}
            </div>

            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#f5eee4", lineHeight: 1.3 }}>
              {tour.title}
            </h3>
          </div>

          {/* Active Switch */}
          <button
            onClick={() => onToggleActive(tour)}
            title={tour.active ? "Cliquez pour masquer ce pack" : "Cliquez pour activer ce pack"}
            style={{
              padding: "4px 8px",
              background: tour.active ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.06)",
              border: `1px solid ${tour.active ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 255, 255, 0.12)"}`,
              color: tour.active ? "#86efac" : "#a89b8c",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tour.active ? "● En Ligne" : "○ Masqué"}
          </button>
        </div>

        {tour.subtitle && (
          <p style={{ fontSize: "12.5px", color: "#a89b8c", margin: "4px 0 12px 0", lineHeight: 1.4 }}>
            {tour.subtitle}
          </p>
        )}

        {/* Duration, Group & Map Stops Pill */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", fontSize: "11.5px", color: "#c5b8a6" }}>
          {tour.duration && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              ⏱️ {tour.duration}
            </span>
          )}
          {tour.groupType && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              👥 {tour.groupType}
            </span>
          )}
          {stopsCount > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#ffd79a" }}>
              📍 {stopsCount} arrêts
            </span>
          )}
          {tour.cardImage ? (
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#86efac" }}>
              🖼️ Photo définie
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#8e8071" }}>
              ○ Icône {tour.icon || "compass"} / {tour.cls || "t1"}
            </span>
          )}
        </div>
      </div>

      {/* Quick Price Editor Box */}
      <div
        style={{
          background: "rgba(20, 16, 12, 0.9)",
          border: "1px solid rgba(212, 163, 89, 0.2)",
          borderRadius: "10px",
          padding: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#d4a359", fontWeight: 700 }}>
            Prix du Pack (Live)
          </label>
          <span style={{ fontSize: "10.5px", color: "#8e8071" }}>Sauvegarde Neon direct</span>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            value={quickPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            placeholder="Prix (ex: 700 MAD)"
            style={{
              flex: 1,
              padding: "8px 10px",
              background: "#120e0a",
              border: isDirty ? "1px solid #d4a359" : "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "7px",
              color: "#ffd79a",
              fontWeight: 700,
              fontSize: "14px",
              outline: "none",
            }}
          />

          {isDirty && (
            <button
              onClick={() => onQuickSave(tour, quickPrice, quickNote)}
              disabled={saving}
              style={{
                padding: "8px 14px",
                background: "linear-gradient(135deg, #d4a359 0%, #b38237 100%)",
                border: "none",
                borderRadius: "7px",
                color: "#1a140d",
                fontWeight: 700,
                fontSize: "12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 10px rgba(212, 163, 89, 0.3)",
              }}
            >
              {saving ? "..." : "✓ Valider"}
            </button>
          )}
        </div>

        <input
          type="text"
          value={quickNote}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Note de prix (ex: 700 MAD par groupe privé)"
          style={{
            width: "100%",
            padding: "6px 8px",
            background: "#120e0a",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            color: "#c5b8a6",
            fontSize: "11px",
            outline: "none",
          }}
        />
      </div>

      {/* Independent-texts status */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <span
          title={tour.cardDescription || "—"}
          style={{
            fontSize: "10.5px",
            padding: "3px 9px",
            borderRadius: "10px",
            background: tour.cardDescription ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)",
            border: `1px solid ${tour.cardDescription ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
            color: tour.cardDescription ? "#86efac" : "#fca5a5",
            fontWeight: 600,
          }}
        >
          🃏 Card: {tour.cardDescription ? `${tour.cardDescription.slice(0, 42)}${tour.cardDescription.length > 42 ? "…" : ""}` : "manquant"}
        </span>
        <span
          title={`${(tour.fullDescription || "").split(/\n\n+/).filter((p) => p.trim()).length} paragraphe(s)`}
          style={{
            fontSize: "10.5px",
            padding: "3px 9px",
            borderRadius: "10px",
            background: tour.fullDescription ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)",
            border: `1px solid ${tour.fullDescription ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
            color: tour.fullDescription ? "#86efac" : "#fca5a5",
            fontWeight: 600,
          }}
        >
          📖 Page: {(tour.fullDescription || "").split(/\n\n+/).filter((p) => p.trim()).length} paragraphe(s)
        </span>
      </div>

      {/* Footer Buttons */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => onOpenEdit(tour, "pricing")}
          style={{
            flex: 1,
            minWidth: "115px",
            padding: "9px 12px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "8px",
            color: "#e2d7c9",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <span>✏️</span>
          <span>Modifier Infos</span>
        </button>

        <button
          onClick={() => onOpenEdit(tour, "description")}
          style={{
            padding: "9px 12px",
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "8px",
            color: "#86efac",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
          title="Éditer la Card Description et la Full Tour Description (indépendantes)"
        >
          <span>📝</span>
          <span>Textes</span>
        </button>

        <button
          onClick={() => onOpenEdit(tour, "map")}
          style={{
            padding: "9px 12px",
            background: "rgba(212, 163, 89, 0.15)",
            border: "1px solid rgba(212, 163, 89, 0.35)",
            borderRadius: "8px",
            color: "#ffd79a",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
          title="Éditer la carte satellite, les arrêts GPS et l'itinéraire"
        >
          <span>🗺️</span>
          <span>Carte</span>
        </button>

        <Link
          href={`/tours/${tour.slug}`}
          target="_blank"
          style={{
            padding: "9px 12px",
            background: "transparent",
            border: "1px solid rgba(212, 163, 89, 0.25)",
            borderRadius: "8px",
            color: "#d4a359",
            fontSize: "12px",
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>Page</span>
          <span>↗</span>
        </Link>

        <button
          onClick={() => onDelete(tour)}
          title="Supprimer ce circuit"
          style={{
            padding: "9px 10px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            borderRadius: "8px",
            color: "#fca5a5",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
