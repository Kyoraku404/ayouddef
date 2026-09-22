import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { PageAnalyticsTracker } from "@/components/common/PageAnalyticsTracker";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Marrakeshi Tour Guide — Official Web Application
 * Made by Zaky
 * All Rights Reserved
 */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2B1E15",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://marrakeshi-guide.vercel.app"),
  title: {
    default: "Marrakeshi Tour Guide by Zaky | Authentic Private Marrakech Tours & Medina Experiences",
    template: "%s | Marrakeshi Tour Guide by Zaky",
  },
  description:
    "Discover authentic Marrakech with second-generation tour guide Zaky. Private Medina walking tours, hidden souks, cultural landmarks, Moroccan food tastings, and tailor-made Atlas Mountains day trips.",
  generator: "Zaky",
  applicationName: "Marrakeshi Tour Guide",
  keywords: [
    "Marrakech travel guide",
    "Things to do in Marrakech",
    "Best places to visit in Marrakech",
    "Marrakech tours",
    "Marrakech private tours",
    "Marrakech day trips",
    "Marrakech itinerary",
    "Marrakech tour guide",
    "Marrakech Medina tour",
    "Official tour guide Marrakech",
    "Private Marrakech guide",
    "Morocco cultural tours",
    "Atlas Mountains day trip from Marrakech",
  ],
  authors: [{ name: "Zaky" }],
  creator: "Zaky",
  publisher: "Zaky",
  other: {
    "developer": "Made by Zaky",
    "agency": "Zaky",
    "client": "Zaky",
  },
  alternates: {
    canonical: "https://marrakeshi-guide.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marrakeshi-guide.vercel.app",
    siteName: "Marrakeshi Tour Guide by Zaky",
    title: "Marrakeshi Tour Guide by Zaky | Authentic Private Marrakech Tours & Medina Experiences",
    description:
      "Discover authentic Marrakech with second-generation tour guide Zaky. Private Medina walking tours, hidden souks, cultural landmarks, and tailor-made day trips.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 800,
        alt: "Zaky - Official Tour Guide in Marrakesh Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakeshi Tour Guide by Zaky | Authentic Private Marrakech Tours",
    description:
      "Discover authentic Marrakech with second-generation tour guide Zaky. Private Medina walking tours, hidden souks, cultural landmarks, and tailor-made day trips.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  verification: {
    google: [
      "UEP20hXlrxJOu6qwxWcRkAnBC39h0BeHZb3YXQaEY_A",
      "NGR4pd5w_7QJ9XBNKPoL8nVBwd5hnCufMocDFJWTAcw",
    ],
  },
};

import { SiteImagesProvider } from "@/components/common/SiteImagesProvider";
import { CurrencyProvider } from "@/components/common/CurrencyProvider";
import { LanguageProvider } from "@/components/common/LanguageProvider";
import { MarrakechChatbot } from "@/components/chatbot/MarrakechChatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="bg-cream text-ink antialiased min-h-screen selection:bg-sand selection:text-brown">
        <PageAnalyticsTracker />
        <LanguageProvider>
          <CurrencyProvider>
            <SiteImagesProvider>
              {children}
              <MarrakechChatbot />
            </SiteImagesProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
