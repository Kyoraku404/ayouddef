"use client";

import React from "react";
import { TourCard } from "./TourCard";
import { toursData } from "@/lib/tours-data";

interface ToursSectionProps {
  onSelectTour?: (tourTitle: string) => void;
}

export function ToursSection({ onSelectTour }: ToursSectionProps) {
  return (
    <section className="tours" id="tours">
      <div className="container-custom">
        <div className="sec-head center">
          <span className="eyebrow">Experiences</span>
          <h2>Marrakesh, the way it&apos;s meant to be seen</h2>
          <p>
            Seven signature experiences, each one built around what makes Marrakesh unforgettable — and always adaptable to what you want to see.
          </p>
        </div>

        <div className="tours-grid" id="toursGrid">
          {toursData.map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelectTour={onSelectTour} />
          ))}
        </div>
      </div>
    </section>
  );
}
