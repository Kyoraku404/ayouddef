"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ZakyAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // Unconditional hook calls before ANY return
  const isLoginPage = pathname === "/adminzaky/login";

  useEffect(() => {
    // Keep session healthy or check if need redirect
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/adminzaky/logout", { method: "POST" });
      router.push("/adminzaky/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0d0a",
      color: "#f4eee4",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Top Bar */}
      <header style={{
        background: "rgba(22, 18, 14, 0.95)",
        borderBottom: "1px solid rgba(212, 163, 89, 0.2)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 12px",
              background: "rgba(212, 163, 89, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 163, 89, 0.25)"
            }}>
              <Image
                src="/brand-mark.png"
                alt="Brand Mark"
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
              <div>
                <span style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#d4a359",
                  letterSpacing: "0.03em"
                }}>
                  ZAKY PORTAL
                </span>
                <span style={{
                  display: "block",
                  fontSize: "10px",
                  color: "#a89b8c",
                  marginTop: "-2px"
                }}>
                  Website CMS & Inquiries
                </span>
              </div>
            </div>

            <span style={{
              padding: "4px 8px",
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "6px",
              color: "#86efac",
              fontSize: "11px",
              fontWeight: 600
            }}>
              ● Database Connected
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                color: "#d8cebe",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "background 0.2s ease"
              }}
            >
              <span>View Public Website</span>
              <span style={{ fontSize: "11px" }}>↗</span>
            </a>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              style={{
                padding: "8px 14px",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                borderRadius: "6px",
                color: "#fca5a5",
                fontSize: "13px",
                fontWeight: 600,
                cursor: loggingOut ? "not-allowed" : "pointer"
              }}
            >
              {loggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  );
}
