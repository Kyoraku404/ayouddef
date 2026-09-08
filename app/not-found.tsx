import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden">
      {/* Background Moroccan Tiles */}
      <div className="absolute inset-0 bg-moroccan-tiles opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sand/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-3xl bg-brown text-cream shadow-lg">
            <Logo size="lg" showText={false} />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-soft border border-sand text-xs font-semibold text-terracotta mb-4">
          <Compass className="w-3.5 h-3.5 animate-spin text-terracotta" style={{ animationDuration: "12s" }} />
          <span>Error 404</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown">
          Lost in the <span className="text-terracotta italic font-serif">Medina</span>?
        </h1>

        <p className="mt-4 text-sm sm:text-base text-ink/75 leading-relaxed">
          The alley you took seems to lead to a secret doorway that doesn&apos;t exist. Let&apos;s guide you back to familiar sights.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-cream font-semibold uppercase tracking-wider text-xs shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Medina</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
