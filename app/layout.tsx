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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.urls.site),
  title: "Marrakeshi Tour Guide by Zaky | Marrakesh Private Tours",
  description:
    "Discover Marrakesh with local guide Zaky. Enjoy authentic private tours, Medina experiences, souks, culture, history, and customized Marrakesh tours.",
  keywords: [
    "Marrakesh tour guide",
    "Marrakesh private tour",
    "Marrakesh local guide",
    "Marrakesh Medina tour",
    "Morocco tour guide",
    "private Marrakesh guide",
  ],
  authors: [{ name: "Zaky" }],
  creator: "Zaky",
  publisher: "Marrakeshi Tour Guide",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="bg-cream text-ink antialiased min-h-screen selection:bg-sand selection:text-brown">
        <PageAnalyticsTracker />
        <SiteImagesProvider>
          {children}
        </SiteImagesProvider>
      </body>
    </html>
  );
}
