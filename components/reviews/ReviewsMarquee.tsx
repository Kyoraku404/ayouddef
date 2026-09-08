"use client";

import React from "react";

const reviews = [
  {
    name: "Nadia H.",
    place: "TripAdvisor",
    quote:
      "Zaky took us to trusted artisans in the souks, taught us how to negotiate the right way, and pointed us to our favorite meal in Marrakesh. He went above and beyond all day.",
    initial: "N",
  },
  {
    name: "Owen",
    place: "Ireland · Google",
    quote:
      "Zaky is the guide we'd recommend to anyone visiting Marrakesh. He looked after us like family and taught us so much about his country.",
    initial: "O",
  },
  {
    name: "Google review",
    place: "Marrakshiguide",
    quote:
      "After 20 years of travel and guides on five continents, Zaky ranks among the very best we've had — gentle, intuitive, and knows every alleyway of the Medina like the back of his hand.",
    initial: "G",
  },
  {
    name: "Google review",
    place: "Marrakshiguide",
    quote:
      "A gem of a guide and a gem of a person. He personalized every minute of our day, and he was right about everything he suggested.",
    initial: "G",
  },
  {
    name: "Google review",
    place: "Marrakshiguide",
    quote:
      "Reached out ahead of time with what we wanted to see, and Zaky planned every detail of our Medina visit perfectly. Couldn't imagine Marrakesh without him.",
    initial: "G",
  },
  {
    name: "Google review",
    place: "Marrakshiguide",
    quote:
      "Zaky knows exactly where to go and explains everything patiently for first-timers. He's also got a great eye for photos and is happy to help capture the trip.",
    initial: "G",
  },
];

export function ReviewsMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeCards = [...reviews, ...reviews];

  return (
    <section id="reviews" className="reviews-wrap">
      <div className="marquee-mask">
        <div className="marquee-track" id="marqueeTrack">
          {marqueeCards.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="stars">★★★★★</div>
              <p className="quote">&ldquo;{r.quote}&rdquo;</p>
              <div className="who">
                <span className="initial">{r.initial}</span>
                <div>
                  <div className="name">{r.name}</div>
                  <div className="place">{r.place}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="review-note container-custom">
        ★ 5.0 on Google (41 reviews) · real guest reviews from Zaky&apos;s Google Business and TripAdvisor listings
      </p>
    </section>
  );
}
