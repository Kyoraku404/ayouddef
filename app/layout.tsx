import type { Metadata } from "next";
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
 * Made by OCN
 * All Rights Reserved
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.urls.site),
  title: "Marrakeshi Tour Guide by Zaky | Marrakesh Private Tours",
  description:
    "Discover Marrakesh with local guide Zaky. Enjoy authentic private tours, Medina experiences, souks, culture, history, and customized Marrakesh tours.",
  generator: "OCN",
  applicationName: "Marrakeshi Tour Guide",
  keywords: [
    "Marrakesh tour guide",
    "Marrakesh private tour",
    "Marrakesh local guide",
    "Marrakesh Medina tour",
    "Morocco tour guide",
    "private Marrakesh guide",
  ],
  authors: [{ name: "OCN", url: "https://ocndev.vercel.app/" }, { name: "Zaky" }],
  creator: "OCN",
  publisher: "OCN",
  other: {
    "developer": "Made by OCN",
    "agency": "OCN",
    "client": "Zaky",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.urls.site,
    siteName: "Marrakeshi Tour Guide",
    title: "Marrakeshi Tour Guide by Zaky | Marrakesh Private Tours",
    description:
      "Discover Marrakesh with local guide Zaky. Enjoy authentic private tours, Medina experiences, souks, culture, history, and customized Marrakesh tours.",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Marrakeshi Tour Guide Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakeshi Tour Guide by Zaky | Marrakesh Private Tours",
    description:
      "Discover Marrakesh with local guide Zaky. Enjoy authentic private tours, Medina experiences, souks, culture, history, and customized Marrakesh tours.",
    images: ["/logo.svg"],
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
