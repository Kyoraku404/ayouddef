export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string | Date;
  people: number;
  tour: string;
  message?: string | null;
  status: ReservationStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TourItineraryStop {
  stopNumber: number;
  name: string;
  duration: string;
  description: string;
  lat: number;
  lng: number;
}

export interface TourGalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string[];
  cls: string;
  icon: "gate" | "basket" | "palace" | "tea" | "monument" | "compass" | "road";
  duration: string;
  groupType: string;
  languages: string;
  price?: string;
  priceNote?: string;
  highlights: string[];
  itinerary: TourItineraryStop[];
  gallery: TourGalleryImage[];
  included: string[];
  notIncluded: string[];
  mapCenter: {
    lat: number;
    lng: number;
    zoom: number;
  };
  getYourGuideUrl?: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  location?: string;
  source: "TripAdvisor" | "Google";
  rating: number;
  date?: string;
  text: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role?: string;
}
