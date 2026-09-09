"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "MAD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (priceStr?: string | null) => string;
  convertMadToEur: (madAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion convention: 10 MAD ≈ 1 EUR
const MAD_PER_EUR = 10;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("MAD");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zaky_currency") as Currency | null;
      if (saved === "MAD" || saved === "EUR") {
        setCurrencyState(saved);
      }
    } catch {}
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("zaky_currency", c);
    } catch {}
  };

  const toggleCurrency = () => {
    const next = currency === "MAD" ? "EUR" : "MAD";
    setCurrency(next);
  };

  const convertMadToEur = (madAmount: number): number => {
    return Math.round(madAmount / MAD_PER_EUR);
  };

  const formatPrice = (priceStr?: string | null): string => {
    if (!priceStr) return "";

    // If it's a custom quote
    if (priceStr.toLowerCase().includes("quote") || priceStr.toLowerCase().includes("devis")) {
      return priceStr;
    }

    if (currency === "MAD") {
      // If already in MAD, return it, or format cleanly
      if (priceStr.toUpperCase().includes("MAD")) {
        return priceStr;
      }
      return `${priceStr} MAD`;
    }

    // Currency is EUR
    // Extract numerical digits, e.g. "700 MAD" -> 700, "1,000 MAD" -> 1000
    const rawNumberMatch = priceStr.replace(/,/g, "").match(/\d+/);
    if (!rawNumberMatch) {
      return priceStr;
    }

    const madVal = parseInt(rawNumberMatch[0], 10);
    if (isNaN(madVal)) return priceStr;

    const eurVal = Math.round(madVal / MAD_PER_EUR);
    const formattedEur = eurVal.toLocaleString("en-US");

    return `€${formattedEur}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        convertMadToEur,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
