"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendAnalyticsEvent } from "@/lib/analytics-client";

export function PageAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track public client website routes, never internal admin panels
    if (pathname.startsWith("/admin") || pathname.startsWith("/adminocn")) {
      return;
    }

    sendAnalyticsEvent("PAGE_VIEW", pathname);
  }, [pathname]);

  return null;
}
