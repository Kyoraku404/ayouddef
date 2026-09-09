"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ZakyLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/adminzaky/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/adminzaky");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1a1612 0%, #0d0b09 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#f3ede2"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(28, 24, 20, 0.85)",
        border: "1px solid rgba(212, 163, 89, 0.25)",
        borderRadius: "16px",
        padding: "40px 32px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 163, 89, 0.1)",
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            padding: "12px",
            background: "rgba(212, 163, 89, 0.1)",
            borderRadius: "50%",
            border: "1px solid rgba(212, 163, 89, 0.3)",
            marginBottom: "16px"
          }}>
            <Image
              src="/brand-mark.png"
              alt="Marrakeshi Tour Guide"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1 style={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#f7f1e7",
            margin: "0 0 8px 0"
          }}>
            Zaky Tour Management
          </h1>
          <p style={{ fontSize: "13px", color: "#a89b8c", margin: 0 }}>
            Website Image CMS & Client Portal
          </p>
        </div>

        {error && (
          <div style={{
            padding: "12px 14px",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            color: "#fca5a5",
            fontSize: "13px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#c2b4a3",
              marginBottom: "6px"
            }}>
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="zaky"
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "rgba(18, 15, 12, 0.8)",
                border: "1px solid rgba(212, 163, 89, 0.2)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#c2b4a3",
              marginBottom: "6px"
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "rgba(18, 15, 12, 0.8)",
                border: "1px solid rgba(212, 163, 89, 0.2)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "12px",
              background: loading ? "#7c5c2d" : "linear-gradient(135deg, #d4a359 0%, #a67c33 100%)",
              color: "#1c140a",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.03em",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.1s ease, box-shadow 0.2s ease",
              boxShadow: "0 4px 12px rgba(212, 163, 89, 0.3)"
            }}
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>
        </form>

        <div style={{
          marginTop: "28px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center"
        }}>
          <Link
            href="/"
            style={{
              fontSize: "12px",
              color: "#9a8b79",
              textDecoration: "none"
            }}
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
