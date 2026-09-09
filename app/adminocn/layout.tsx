"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  CalendarCheck,
  DollarSign,
  Landmark,
  Users,
  FileText,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Building2,
  Sun,
  Moon,
  ImageIcon,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function OcnAdminLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentUser, setCurrentUser] = useState<string>("ocnadmin");

  const isLoginPage = pathname === "/adminocn/login";

  useEffect(() => {
    if (isLoginPage) return;
    // Check session user
    fetch("/api/ocn/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user?.username) {
          setCurrentUser(data.user.username);
        }
      })
      .catch(() => {});
  }, [isLoginPage]);

  // Skip layout shell for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/ocn/auth/logout", { method: "POST" });
    } finally {
      router.push("/adminocn/login");
    }
  };

  const navItems = [
    { label: "Overview", href: "/adminocn", icon: LayoutDashboard },
    { label: "Website Analytics", href: "/adminocn/analytics", icon: BarChart3 },
    { label: "Global Site Images", href: "/adminocn/images", icon: ImageIcon },
    { label: "Bookings", href: "/adminocn/bookings", icon: CalendarCheck },
    { label: "Revenue Tracking", href: "/adminocn/revenue", icon: DollarSign },
    { label: "Financial & Settlements", href: "/adminocn/settlements", icon: Landmark },
    { label: "Clients", href: "/adminocn/clients", icon: Users },
    { label: "Contracts", href: "/adminocn/contracts", icon: FileText },
    { label: "Audit Logs", href: "/adminocn/audit-logs", icon: ShieldAlert },
    { label: "Settings", href: "/adminocn/settings", icon: Settings },
  ];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} flex flex-col font-sans transition-colors duration-200`}>
      {/* Top Banner Warning for Strict OCN Separation */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-indigo-300 text-[11px] font-mono py-1 px-4 border-b border-indigo-900/50 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider uppercase">OCN Sovereign Control Environment</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">Strict multi-tenant segregation active</span>
        </div>
        <div className="text-[10px] text-indigo-400/80">
          OCN Participation: 10% Defined Revenue
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 ${
            theme === "dark" ? "bg-slate-900/95 border-slate-800" : "bg-white border-slate-200"
          } border-r flex flex-col transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-5 border-b border-inherit flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-base tracking-tight leading-tight flex items-center gap-1.5">
                  <span>OCN Control</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-mono font-normal border border-indigo-500/20">
                    SaaS
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Executive Console</div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800/50 text-slate-400 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Client Tenant Selector */}
          <div className="p-4 border-b border-inherit">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Active Client Workspace
            </label>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-100 border-slate-200 text-slate-800"
            }`}>
              <div className="flex items-center gap-2 truncate">
                <Building2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <div className="truncate">
                  <div className="text-xs font-semibold truncate leading-tight">
                    Marrakeshi Tour Guide by Zaky
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    marrakeshitourguide.com
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1 font-mono">
              <span>Ownership: 70% Client / 30% OCN</span>
              <span className="text-emerald-400 font-semibold">Share: 10%</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-900/30"
                      : theme === "dark"
                      ? "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Footer */}
          <div className="p-4 border-t border-inherit space-y-3">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-slate-100/80 border-slate-200"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                  {currentUser.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight">{currentUser}</div>
                  <div className="text-[10px] text-emerald-400">Master Admin</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Log out of OCN"
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header Bar */}
          <header className={`h-16 px-4 sm:px-8 border-b ${
            theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white/90 border-slate-200"
          } backdrop-blur-md flex items-center justify-between sticky top-0 z-30`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg border border-inherit hover:bg-slate-800/40 lg:hidden text-slate-400"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-sm font-semibold tracking-tight capitalize">
                  {pathname === "/adminocn" ? "Executive Overview" : pathname.replace("/adminocn/", "").replace("-", " ")}
                </h2>
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Client: <strong className="text-indigo-400">Marrakeshi Tour Guide by Zaky</strong> • Contract #OCN-2026-01
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-xl border ${
                  theme === "dark" ? "bg-slate-800 border-slate-700 text-amber-300" : "bg-slate-100 border-slate-300 text-slate-700"
                } transition-all`}
                title="Toggle Dark/Light Mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Status Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>10% Share Live</span>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
