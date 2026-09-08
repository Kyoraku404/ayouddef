"use client";

import React, { useState } from "react";
import { Navigation, Clock, ExternalLink, Layers, Globe } from "lucide-react";
import { TourItineraryStop } from "@/lib/types";

interface TourMapProps {
  stops: TourItineraryStop[];
  mapCenter: {
    lat: number;
    lng: number;
    zoom: number;
  };
  tourTitle: string;
}

export function TourMap({ stops, mapCenter, tourTitle }: TourMapProps) {
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  // Default map type is Satellite as requested by user
  const [mapType, setMapType] = useState<"satellite" | "hybrid" | "streets">("satellite");

  const activeStop = stops && stops.length > 0 ? stops[activeStopIndex] : null;

  const mapLat = activeStop ? activeStop.lat : mapCenter.lat;
  const mapLng = activeStop ? activeStop.lng : mapCenter.lng;
  const zoom = mapCenter.zoom || 16;

  // Google Maps embed URL with satellite / hybrid / street parameter:
  // t=k for Satellite, t=h for Hybrid (satellite + labels), t=m for standard map
  const typeCode = mapType === "satellite" ? "k" : mapType === "hybrid" ? "h" : "m";
  const embedUrl = `https://maps.google.com/maps?q=${mapLat},${mapLng}&t=${typeCode}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  const googleMapsUrl = activeStop
    ? `https://www.google.com/maps/search/?api=1&query=${activeStop.lat},${activeStop.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lng}`;

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-cream border border-sand shadow-md overflow-hidden">
      {/* Map Header */}
      <div className="p-6 sm:p-8 bg-sand-soft/50 border-b border-sand flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow text-xs uppercase tracking-widest text-terracotta">
            Satellite Route & Itinerary
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl text-brown font-semibold">
            {tourTitle} Map Stops
          </h3>
          <p className="text-xs sm:text-sm text-ink/75 mt-1">
            Viewing real-world satellite imagery of the route. Click any stop below to zoom in on its aerial view.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Map Type Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-sand/60 border border-sand text-xs font-semibold">
            <button
              onClick={() => setMapType("satellite")}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                mapType === "satellite"
                  ? "bg-terracotta text-cream shadow-xs"
                  : "text-brown hover:text-terracotta"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Satellite</span>
            </button>

            <button
              onClick={() => setMapType("hybrid")}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                mapType === "hybrid"
                  ? "bg-terracotta text-cream shadow-xs"
                  : "text-brown hover:text-terracotta"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Hybrid</span>
            </button>

            <button
              onClick={() => setMapType("streets")}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                mapType === "streets"
                  ? "bg-terracotta text-cream shadow-xs"
                  : "text-brown hover:text-terracotta"
              }`}
            >
              <span>Streets</span>
            </button>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brown hover:bg-ink !text-cream text-xs font-semibold whitespace-nowrap shadow-xs transition-all border border-sand/30"
          >
            <Navigation className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="!text-cream">Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 !text-cream/70 flex-shrink-0" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left / Top: Interactive Satellite Map Iframe Container (lg:col-span-7) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-ink border-b lg:border-b-0 lg:border-r border-sand">
          <iframe
            key={`${mapLat}-${mapLng}-${mapType}`}
            title={`Satellite Map for ${tourTitle}`}
            src={embedUrl}
            className="w-full h-full min-h-[380px] sm:min-h-[460px] border-0"
            loading="lazy"
            allowFullScreen
          />

          {/* Active Stop Badge Overlay on top of Map */}
          {activeStop && (
            <div className="absolute bottom-4 left-4 right-4 bg-brown/95 text-cream backdrop-blur-md p-4 rounded-xl border border-sand/30 shadow-lg flex items-center justify-between gap-3 pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta text-cream font-heading font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                  {activeStop.stopNumber}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-cream leading-tight">
                    {activeStop.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-sand/80 mt-0.5">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>Duration: {activeStop.duration}</span>
                  </div>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-sand/15 hover:bg-sand/30 text-gold transition-colors flex-shrink-0"
                title="Get Directions"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Right / Bottom: Interactive Itinerary Stops List (lg:col-span-5) */}
        <div className="lg:col-span-5 p-4 sm:p-6 max-h-[520px] overflow-y-auto space-y-3 bg-cream/60">
          <div className="text-xs uppercase tracking-wider font-semibold text-brown/60 mb-2 px-1 flex items-center justify-between">
            <span>Tour Itinerary Stops ({stops.length})</span>
            <span className="text-[11px] text-terracotta font-medium">Click to inspect</span>
          </div>

          {stops.map((stop, idx) => {
            const isActive = idx === activeStopIndex;
            return (
              <button
                key={stop.stopNumber}
                onClick={() => setActiveStopIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                  isActive
                    ? "bg-sand-soft border-terracotta ring-1 ring-terracotta shadow-xs"
                    : "bg-cream border-sand/70 hover:bg-sand-soft/50 hover:border-sand"
                }`}
              >
                {/* Number Badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs flex-shrink-0 mt-0.5 ${
                    isActive
                      ? "bg-terracotta text-cream"
                      : "bg-sand text-brown"
                  }`}
                >
                  {stop.stopNumber}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h5
                      className={`font-heading text-sm font-semibold leading-tight ${
                        isActive ? "text-terracotta-dark" : "text-brown"
                      }`}
                    >
                      {stop.name}
                    </h5>
                    <span className="text-[11px] font-medium text-ink/60 whitespace-nowrap">
                      {stop.duration}
                    </span>
                  </div>
                  <p className="text-xs text-ink/75 mt-1.5 leading-relaxed line-clamp-2">
                    {stop.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
