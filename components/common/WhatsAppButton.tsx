"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics-client";

interface WhatsAppButtonProps {
  href: string;
  source: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  href,
  source,
  className = "w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-xs transition-all",
  style,
  children,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={(e) => trackWhatsAppClick(source, href, e)}
    >
      <MessageCircle className="w-4 h-4" />
      <span>{children || "Ask Zaky on WhatsApp"}</span>
    </a>
  );
}
