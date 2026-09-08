import { siteConfig, isPlaceholderWhatsApp } from "./config";
import { ReservationInput } from "./validation";

export function generateWhatsAppMessage(reservation: ReservationInput): string {
  const lines = [
    "Hello Zaky,",
    "",
    "I would like to request a tour reservation.",
    "",
    `Name: ${reservation.fullName}`,
    `Email: ${reservation.email}`,
    `WhatsApp/Phone: ${reservation.phone}`,
    `Preferred date: ${reservation.date}`,
    `People: ${reservation.people}`,
    `Tour: ${reservation.tour}`,
  ];

  if (reservation.message && reservation.message.trim().length > 0) {
    lines.push(`Message: ${reservation.message.trim()}`);
  }

  return lines.join("\n");
}

export function getWhatsAppReservationUrl(reservation: ReservationInput): string {
  const number = siteConfig.urls.whatsappNumber.replace(/[^0-9]/g, "");
  const message = generateWhatsAppMessage(reservation);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(): string {
  const number = siteConfig.urls.whatsappNumber.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    "Hello Zaky, I am interested in booking a private tour in Marrakesh."
  );
  return `https://wa.me/${number}?text=${text}`;
}

export { isPlaceholderWhatsApp };
