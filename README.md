# Marrakeshi Tour Guide by Zaky 🇲🇦

A production-ready, full-stack website and reservation management system for **Marrakeshi Tour Guide** by **Zaky** (Mohamed Zaky Bentabaa), a licensed, second-generation tour guide in Marrakesh, Morocco since 2007.

Built with **Next.js 15+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **PostgreSQL**, **Framer Motion**, **Lucide Icons**, and secure HTTP-only cookie authentication.

---

## Table of Contents

1. [Features & Design System](#features--design-system)
2. [Tech Stack](#tech-stack)
3. [Installation](#1-installation)
4. [Environment Variables](#2-environment-variables)
5. [Database Setup & Prisma Migration](#3-database-setup--prisma-migration)
6. [Database Seeding](#4-database-seeding)
7. [Development Server](#5-development-server)
8. [Production Build](#6-production-build)
9. [Deployment Guide](#7-deployment-guide)
10. [Configuration Workflows](#8-configuration-workflows)
    - [How to Replace WhatsApp Number](#how-to-replace-whatsapp-number)
    - [How to Add Instagram](#how-to-add-instagram)
    - [How to Add Hero Image](#how-to-add-hero-image)
    - [How to Configure Email (SMTP)](#how-to-configure-email-smtp)
    - [How to Add Real Guide Photograph](#how-to-add-real-guide-photograph)
11. [How to Manage Reservations in Admin Portal](#9-how-to-manage-reservations)
12. [SEO & JSON-LD Structured Data](#10-seo--structured-data)
13. [Security Architecture](#11-security-architecture)

---

## Features & Design System

- **Warm Moroccan Aesthetic**: Authentic color palette:
  - Terracotta (`#C1552D`)
  - Terracotta Dark (`#9A4220`)
  - Sand (`#EBDCB9`) & Sand Soft (`#F3E9D2`)
  - Brown (`#2B1E15`) & Ink (`#241A12`)
  - Gold (`#C79A47`) & Cream (`#FBF6EC`)
- **Typography**: Fraunces (Headings) + Work Sans (Body) via Google Fonts.
- **Handcrafted Stained-Glass Logo**: Custom Moorish arched-window emblem in transparent background nested in a rounded brown chip.
- **Dynamic Sticky Navbar**: Transparent over hero, transitions smoothly to solid cream with shadow on scroll. Full-screen mobile overlay drawer with keyboard escape navigation.
- **Genuine Reviews Marquee**: Displays verified TripAdvisor and Google reviews with the verified trust line: `★ 5.0 on Google (41 reviews)`. Pauses on hover, smooth horizontal infinite animation.
- **About Zaky Section**: First-person bio highlighting Zaky's career since 2007, second-generation heritage, Master's in Tourism Management, Moroccan arch photo frame with exact `50% 46%` crop focus, animated stats, and language pills (Arabic, French, English).
- **7 Tour Cards**: Reusable cards with Moroccan-inspired icons, custom descriptions, and dual booking paths ("Get Your Guide" and "Reservation").
- **Reservation Engine**: Zod validation (client and server), PostgreSQL database storage, admin notification email, customer confirmation disclaimer, and WhatsApp prefilled message continuation.
- **Protected Admin Dashboard**: `/admin` with HTTP-only cookie authentication, bcrypt password hashing, metrics cards, table with search, status filters (`All`, `Pending`, `Confirmed`, `Cancelled`, `Completed`), sorting, and detail modal.
- **SEO & Accessibility**: Complete Open Graph, Twitter/X cards, `robots.txt`, `sitemap.xml`, semantic HTML, WCAG focus states, and `TouristInformationCenter` JSON-LD structured data.
- **Branded 404 Page**: Playful "Lost in the Medina?" error page.

---

## 1. Installation

Clone or extract the repository, then install project dependencies:

```bash
npm install
```

---

## 2. Environment Variables

Copy the `.env.example` template to `.env`:

```bash
cp .env.example .env
```

Key environment variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/marrakeshi_tours?schema=public` |
| `AUTH_SECRET` | Secret key for signing JWT admin cookies | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email address | `admin@marrakeshitourguide.com` |
| `ADMIN_PASSWORD` | Admin login password | `YourSecurePassword123!` |
| `EMAIL_FROM` | Sender address for emails | `Zaky Tour Guide <no-reply@marrakeshitourguide.com>` |
| `SMTP_HOST` | SMTP server hostname | `smtp.resend.com` or `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `apikey` |
| `SMTP_PASSWORD` | SMTP password / API token | `your-smtp-token` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | E.164 phone number without `+` | `212600000000` (Replace with real number) |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile link | `https://instagram.com/zaky_marrakesh_tours` |
| `NEXT_PUBLIC_GETYOURGUIDE_URL`| Official GetYourGuide profile link | Leave blank to route to internal reservation form |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for SEO/metadata | `https://marrakeshitourguide.com` |
| `HERO_IMAGE` | Optional wide landscape hero photo | `/images/hero-landscape.jpg` (or leave empty for zellige pattern) |

---

## 3. Database Setup & Prisma Migration

1. Ensure your PostgreSQL server is running.
2. Push the Prisma schema to your PostgreSQL database:

```bash
npm run db:push
```

Or generate standard migration files:

```bash
npx prisma migrate dev --name init
```

*Note: In local development without a running PostgreSQL instance, the app includes a graceful local fallback store so you can still preview and test the complete reservation and admin workflows.*

---

## 4. Database Seeding

Run the seed script to create the initial admin account and populate the 7 tour experiences:

```bash
npm run db:seed
```

The seed script verifies that `ADMIN_PASSWORD` is strong and securely hashes it with `bcrypt` (12 rounds).

---

## 5. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
To access the admin dashboard, visit [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 6. Production Build

Validate TypeScript, linting, and compile the optimized production bundle:

```bash
npm run build
npm run start
```

---

## 7. Deployment Guide

### Vercel / Netlify / Node Server

1. **Push code** to your Git repository (GitHub / GitLab).
2. **Import project** in Vercel or your hosting platform of choice.
3. **Configure Environment Variables** in the hosting dashboard (set `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, etc.).
4. **Build Command**: `prisma generate && next build`
5. **Run Seeding**: Run `npx prisma db push && npx prisma db seed` on your database or via build step.

---

## 8. Configuration Workflows

### How to Replace WhatsApp Number
1. Open your `.env` file or hosting environment variables.
2. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` with Zaky's real WhatsApp number in international format without `+` or spaces (e.g. `212612345678` for Morocco).
3. The website, contact section, footer, and reservation confirmation button will automatically use the new number without modifying any code.

### How to Add Instagram
1. In `.env`, set `NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/your_profile"`.
2. The Instagram links and icons in the Contact section and Footer will automatically become active.

### How to Add Hero Image
1. Place your wide landscape photograph in `public/images/hero.jpg`.
2. In `.env`, set `HERO_IMAGE="/images/hero.jpg"`.
3. The Hero section will automatically display the photograph with an authentic Moroccan overlay. Leaving it blank keeps the handcrafted geometric zellige backdrop.

### How to Configure Email (SMTP)
1. Provide valid SMTP credentials in `.env`:
   ```env
   SMTP_HOST="smtp.mailgun.org"
   SMTP_PORT="587"
   SMTP_USER="postmaster@yourdomain.com"
   SMTP_PASSWORD="your-password"
   EMAIL_FROM="Zaky Tour Guide <bookings@marrakeshitourguide.com>"
   ADMIN_EMAIL="zaky@marrakeshitourguide.com"
   ```
2. When a guest submits a reservation, an admin notification email is immediately sent to `ADMIN_EMAIL`, and a customer acknowledgement email is sent to the guest informing them their request is pending Zaky's confirmation.

### How to Add Real Guide Photograph
1. Save Zaky's photo (with guests in the courtyard with fountain and rose petals) as `public/images/zaky-riad.jpg`.
2. The About section is already pre-configured with the exact `50% 46%` crop positioning (`objectPosition: "50% 46%"`) inside the Moroccan arch frame.

---

## 9. How to Manage Reservations

1. Go to `/admin` or click **Admin Portal** in the footer.
2. If unauthenticated, you will be redirected to `/admin/login`.
3. Log in with your configured admin email and password (default dev: `admin@marrakeshitourguide.com` / `ZakyAdmin2026!`).
4. On the dashboard:
   - **Metrics Bar**: View counts for Total Requests, Pending, Confirmed, Completed, and Cancelled.
   - **Search**: Type to search by guest name, email, phone, or tour name.
   - **Filter**: Filter by status (`ALL`, `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
   - **Sort**: Toggle between Newest first and Oldest first.
   - **Inspect (Eye icon)**: Open full reservation details, read guest notes, or click direct WhatsApp/Email links to communicate with the guest.
   - **Status Actions**: One-click status updates (Confirm, Complete, Cancel).
   - **Delete (Trash icon)**: Permanently delete test or spam inquiries.

---

## 10. SEO & Structured Data

- **Semantic Tags**: Accessible hierarchy with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Title Tag**: `Marrakeshi Tour Guide by Zaky | Marrakesh Private Tours`
- **Meta Description**: Curated description emphasizing authentic private tours and cultural experiences.
- **Sitemap & Robots**: Generated dynamically at `/sitemap.xml` and `/robots.txt`.
- **JSON-LD Schema**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    "name": "Marrakeshi Tour Guide",
    "description": "Local private tour guide experiences in Marrakesh, Morocco",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marrakesh",
      "addressCountry": "MA"
    }
  }
  ```

---

## 11. Security Architecture

- **Rate Limiting**: Built-in sliding-window rate limiter on `/api/reservations` preventing spam abuse.
- **Server-Side Validation**: Zod schemas validate all inputs server-side before database operations.
- **HTTP-Only Session Cookies**: Admin session token stored in strict HTTP-only, secure cookies with JWT verification (`jose`).
- **Password Hashing**: Strong `bcrypt` salt rounds (12).
- **Spam Honeypots**: Hidden form fields to intercept automated bots.
- **SQL Injection Immune**: All queries parameterized via Prisma ORM.
- **External Links**: Protected with `rel="noopener noreferrer"`.
- **Secrets Isolation**: No database passwords, SMTP credentials, or auth secrets exposed to client-side bundles.

---

© 2026 Marrakeshi Tour Guide. All rights reserved.
