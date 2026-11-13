# 🏛️ Muhammad Jahanzaib Portfolio — Technical Architecture & Project Specification

An in-depth engineering blueprint and system architecture documentation for **Muhammad Jahanzaib's Senior Frontend & Full-Stack Portfolio Platform**.

---

## 📑 Table of Contents
- [1. Executive Summary](#1-executive-summary)
- [2. Technology Stack & Frameworks](#2-technology-stack--frameworks)
- [3. High-Level System Architecture](#3-high-level-system-architecture)
- [4. Component Hierarchy & Module Matrix](#4-component-hierarchy--module-matrix)
- [5. Database Schema & Prisma ORM Design](#5-database-schema--prisma-orm-design)
- [6. Design System & Obsidian Gold Token Specification](#6-design-system--obsidian-gold-token-specification)
- [7. Responsive Mobile-First Engineering](#7-responsive-mobile-first-engineering)
- [8. Admin CMS & Dynamic Management Engine](#8-admin-cms--dynamic-management-engine)
- [9. Performance, SEO & WCAG Accessibility](#9-performance-seo--wcag-accessibility)

---

## 1. Executive Summary

This web application represents a state-of-the-art developer portfolio and content management system engineered for **Muhammad Jahanzaib**, a Senior Frontend & Full-Stack Web Engineer. Built on **Next.js 16 (App Router)** and **React 19**, it pairs high-impact visual design with enterprise-grade system resilience.

### Key Engineering Targets:
- **Lighthouse Performance Score**: `98 - 100 / 100` across Desktop and Mobile
- **First Contentful Paint (FCP)**: `< 0.7s`
- **Cumulative Layout Shift (CLS)**: `0.00`
- **Accessibility Standard**: Full WCAG 2.1 AA Compliance
- **Zero-Hydration Penalty**: React 19 Concurrent Rendering with Server Components

---

## 2. Technology Stack & Frameworks

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4 (App Router) | Server-side rendering, streaming layouts, Route Handlers, Edge optimization |
| **UI Library** | React 19.3 | Concurrent rendering, modern hooks, zero unnecessary re-renders |
| **Language** | TypeScript 5.x | Strict type safety across UI props, database models, and API boundaries |
| **Styling** | Tailwind CSS 4.3 + CSS Variables | Utility-first compilation, `@theme` variables, zero runtime CSS overhead |
| **Database & ORM** | Prisma ORM 6.19 + SQLite | Type-safe queries, automatic migration management, zero external DB dependencies |
| **Animation Engine** | Framer Motion + CSS Keyframes | Kinetic micro-interactions, spring physics, hardware-accelerated transitions |
| **Icons** | Lucide React | Tree-shakeable SVG iconography minimizing client bundle size |
| **Communication** | Nodemailer | Asynchronous SMTP lead forwarding with dynamic notifications |

---

## 3. High-Level System Architecture

```
                                ┌────────────────────────┐
                                │     Client Browser     │
                                └───────────┬────────────┘
                                            │ (HTTP / HTTPS)
                                            ▼
                                ┌────────────────────────┐
                                │ Next.js 16 App Router  │
                                └───────────┬────────────┘
                                            │
        ┌───────────────────────────────────┼───────────────────────────────────┐
        │                                   │                                   │
        ▼                                   ▼                                   ▼
┌──────────────────┐              ┌──────────────────┐              ┌──────────────────┐
│  Client Sections │              │  API Endpoints   │              │ Admin CMS Suite  │
│  - Navbar & Hero │              │  - /api/contact  │              │  - /admin/*      │
│  - 2x2 Skills    │              │  - /api/projects │              │  - /login        │
│  - Case Studies  │              │  - /api/skills   │              │  - JWT Protected │
│  - Contact Desk  │              │  - /api/profile  │              │  - SQLite Engine │
└────────┬─────────┘              └────────┬─────────┘              └────────┬─────────┘
         │                                 │                                 │
         └─────────────────────────────────┼─────────────────────────────────┘
                                           │
                                           ▼
                               ┌────────────────────────┐
                               │  Prisma ORM & SQLite   │
                               │  (dev.db / Schema)     │
                               └────────────────────────┘
```

---

## 4. Component Hierarchy & Module Matrix

```text
src/
├── app/
│   ├── layout.tsx                     # Root shell: SEO metadata, fonts, luxury favicon & layout
│   ├── page.tsx                       # High-performance single page application assembler
│   ├── globals.css                    # Obsidian palettes, gold accents, radial glows & matrix styles
│   ├── login/page.tsx                 # Protected administrative login with bcrypt verification
│   ├── admin/                         # Enterprise CMS Management Studio
│   │   ├── page.tsx                   # Central dashboard overview & key statistics
│   │   ├── projects/page.tsx          # Real-time project CRUD manager
│   │   ├── skills/page.tsx            # Technical stack & proficiency controller
│   │   ├── experience/page.tsx        # Career milestone & timeline manager
│   │   ├── certifications/page.tsx    # Professional certification gallery controller
│   │   ├── education/page.tsx         # Academic credential manager
│   │   ├── messages/page.tsx          # Direct client inbox & inquiry manager
│   │   └── profile/page.tsx           # Bio, resume PDF, and contact metadata manager
│   └── api/                           # Secure REST Route Handlers
│       ├── auth/                      # Session & authentication handler
│       ├── contact/                   # Message dispatcher & database archiver
│       ├── projects/                  # Dynamic project API
│       ├── skills/                    # Dynamic skills API
│       ├── experience/                # Experience milestones API
│       ├── certifications/            # Certifications API
│       ├── education/                 # Education API
│       ├── profile/                   # Developer profile API
│       └── upload/                    # High-res asset uploader
├── components/
│   ├── portfolio/
│   │   ├── Navbar.tsx                 # Glassmorphic header with active section spy & mobile drawer
│   │   ├── HeroSection.tsx            # High-impact introduction, single-line typography & primary CTAs
│   │   ├── TypingRoles.tsx            # Kinetic role cycler ("Full Stack Web Developer", etc.)
│   │   ├── AboutSection.tsx           # Professional bio, experience highlights & core engineering pillars
│   │   ├── SkillsSection.tsx          # 2x2 responsive category matrix & proficiency indicators
│   │   ├── ProjectsSection.tsx        # Production project cards & sticky mobile case study modal
│   │   ├── ExperienceSection.tsx      # Chronological engineering career timeline
│   │   ├── CertificationsEducationSection.tsx # Dual tabbed credentials & degree showcase
│   │   ├── ContactSection.tsx         # Interactive contact desk with instant feedback
│   │   └── Footer.tsx                 # Obsidian footer, social vectors & live copyright
│   ├── admin/
│   │   └── FileUploader.tsx           # Image & asset uploader component
│   └── ui/
│       ├── AnimatedSection.tsx        # Framer-motion viewport scroll trigger wrapper
│       └── Icons.tsx                  # Vector icon mapping and fallback handlers
└── lib/
    ├── prisma.ts                      # Singleton Prisma Client connection
    ├── mailer.ts                      # SMTP email forwarding engine
    ├── animations.ts                  # Reusable physics-based motion variants
    └── utils.ts                       # Class merging (`clsx` + `tailwind-merge`)
```

---

## 5. Database Schema & Prisma ORM Design

The project uses a structured relational SQLite schema configured through Prisma ORM (`prisma/schema.prisma`):

- **`User`**: Admin credentials with bcrypt password hashing and session tokens.
- **`Profile`**: Developer name, title, bio, email, phone, location, social links, and resume asset paths.
- **`Skill`**: Technical skills with category tags (`Frontend`, `Backend`, `Testing`, `DevOps`) and proficiency scores.
- **`Project`**: Featured showcases with title, slug, summary, architecture description, tech stack, screenshots, live URLs, and GitHub repos.
- **`Experience`**: Career positions with company name, role, dates, achievements, and technology tags.
- **`Education`**: Degrees, institutions, graduation dates, and academic milestones.
- **`Certification`**: Industry credentials, issuing bodies, credential IDs, and verification URLs.
- **`ContactMessage`**: Client leads with sender name, email, subject, message body, status, and timestamps.

---

## 6. Design System & Obsidian Gold Token Specification

The aesthetic is built on an **Obsidian Dark & Amber Gold** luxury engineering palette:

- **Primary Background**: `#080808` (Deep True Obsidian)
- **Secondary Surface**: `#121212` (Card and Container Base)
- **Glassmorphic Surface**: `rgba(26, 26, 26, 0.7)` with `backdrop-filter: blur(16px)`
- **Border Luxury**: `rgba(217, 119, 6, 0.2)` (Subtle Amber Stroke)
- **Primary Accent**: `#F59E0B` (Amber 500) & `#D97706` (Amber 600)
- **Muted Typography**: `#9CA3AF` (Gray 400)
- **High-Contrast Text**: `#FFFFFF` & `#F9FAFB`

---

## 7. Responsive Mobile-First Engineering

The application implements a custom responsive architecture ensuring 100% fluidity across all screen sizes:
- **Mobile First Approach**: Built from `360px` up, avoiding horizontal viewport overflow via `min(550px, 90vw)` glow containment.
- **2x2 Category Matrix**: The Skills section adapts on small screens into a neat 2-column by 2-row luxury card grid.
- **iOS/Android Bottom Sheet Modal**: Project case study viewer transforms on mobile devices into a native bottom sheet modal (`h-[92vh]`) with sticky action headers and bottom CTAs.
- **Single-Line Name & Title**: Fluid typography ensures "Muhammad Jahanzaib" and role titles remain elegant without mid-word wrapping.

---

## 8. Admin CMS & Dynamic Management Engine

The portfolio includes an integrated administrative back-office accessed via `/admin`:
- **Secure Authentication**: Protected via encrypted sessions and JWT cookies.
- **Real-Time Data Mutators**: Add, update, or remove projects, skills, and credentials with instant production reflection.
- **Client Lead Inbox**: Review and archive client inquiries directly within the application dashboard.

---

## 9. Performance, SEO & WCAG Accessibility

- **Core Web Vitals**: Zero CLS via explicit aspect ratios and preloaded typography.
- **SEO Ready**: Complete OpenGraph, Twitter card, canonical URL, and JSON-LD schema definitions.
- **WCAG AA Compliance**: High-contrast ratios on all text elements, visible focus states, and aria labels for screen readers.

