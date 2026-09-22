export const siteConfig = {
  name: "Marrakeshi Tour Guide",
  brand: "Zaky",
  legalName: "Mohamed Zaky Bentabaa",
  city: "Marrakesh",
  country: "Morocco",
  tagline: "Discover Marrakesh with a Local Guide",
  subheadline: "Authentic experiences, unforgettable memories, and the real Marrakesh with Zaky.",
  establishedYear: 2007,
  education: "Master's degree in Tourism Management",
  positioning: "Official second-generation Marrakesh tour guide",
  languages: ["Arabic", "French", "English"],
  stats: {
    googleRating: "5.0",
    googleReviewCount: 41,
    tourExperiencesCount: 7,
  },
  urls: {
    site:
      process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
        ? process.env.NEXT_PUBLIC_SITE_URL
        : "https://marrakeshi-guide.vercel.app",
    getYourGuide: process.env.NEXT_PUBLIC_GETYOURGUIDE_URL || "",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
  contact: {
    email: process.env.CONTACT_EMAIL || "contact@marrakeshitourguide.com",
    adminEmail: process.env.ADMIN_EMAIL || "admin@marrakeshitourguide.com",
  },
  agency: {
    name: "Zaky",
    role: "Official Marrakesh Tour Guide",
    client: "Mohamed Zaky Bentabaa (Zaky)",
    website: "https://marrakeshi-guide.vercel.app/",
  },
  heroImage: process.env.HERO_IMAGE || "",
};

export const isPlaceholderWhatsApp = (num: string) => {
  return !num || num === "212600000000" || num.includes("000000");
};
