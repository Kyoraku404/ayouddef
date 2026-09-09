"use client";

import React, { useState, useEffect } from "react";
import { TourCard } from "./TourCard";
import { toursData } from "@/lib/tours-data";
import { Tour } from "@/lib/types";
import { useLanguage } from "@/components/common/LanguageProvider";

interface ToursSectionProps {
  onSelectTour?: (tourTitle: string) => void;
}

export function ToursSection({ onSelectTour }: ToursSectionProps) {
  const [tours, setTours] = useState<Tour[]>(toursData);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.tours) && data.tours.length > 0) {
          setTours(data.tours);
        }
      })
      .catch(() => {
        // keep default
      });
  }, []);

  return (
    <section className="tours" id="tours">
      <div className="container-custom">
        <div className="sec-head center">
          <span className="eyebrow">{t.tours.eyebrow}</span>
          <h2>{t.tours.title}</h2>
          <p>{t.tours.subtitle}</p>
        </div>

        <div className="tours-grid" id="toursGrid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelectTour={onSelectTour} />
          ))}
        </div>
      </div>
    </section>
  );
}

