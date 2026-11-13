# Portfolio Content Architecture — Muhammad Jahanzaib
> High-performance, production-ready copy & data architecture for developer portfolio rebuild.

---

## 1. Meta / SEO & Head Tags
- **Page Title:** Muhammad Jahanzaib | Frontend Engineer & React / Next.js Developer
- **Meta Description:** Frontend Engineer with an ex-SQA zero-defect mindset. Specializing in Next.js 16 (App Router), React 19, TypeScript, WCAG 2.1 AA accessibility, and sub-second web performance.
- **Keywords:** Frontend Engineer, React Developer, Next.js Developer, TypeScript, SQA Engineer, Web Performance, Karachi, Remote Developer
- **OpenGraph Title:** Muhammad Jahanzaib — Frontend Engineer
- **OpenGraph Description:** Building accessible, high-performance web systems with zero layout shift and automated testing discipline.
- **Canonical URL:** https://jahanzaib-20.netlify.app/
- **Favicon / Brand Tagline:** MJ | Building Zero-Defect Web Interfaces

---

## 2. Navigation Bar (Header)
- **Brand Logo:** `MJ.` / `<Jahanzaib />`
- **Nav Links:**
  1. `About` (`#about`)
  2. `Skills` (`#skills`)
  3. `Projects` (`#projects`)
  4. `Experience` (`#experience`)
  5. `Certifications` (`#certifications`)
  6. `Contact` (`#contact`)
- **Nav Actions (CTAs):**
  - **Resume Button:** Direct link to `/assets/Jahanzaib-Resume.pdf` (Target: `_blank`)
  - **Let's Talk Button:** Smooth scroll to `#contact` or direct WhatsApp trigger.

---

## 3. Hero Section
- **Badge / Status Pill:** 🟢 Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)
- **Greeting:** Hi, I'm
- **Name:** Muhammad Jahanzaib
- **Primary Title / Headline:** Frontend Engineer | React.js & Next.js Developer | Ex-SQA Mindset
- **Sub-headline / Bio Hook:**
  > I engineer accessible, high-performance web applications with zero cumulative layout shift. Combining modern React architecture with automated QA testing discipline, I build production-grade web systems designed to convert and built to last.
- **Primary CTA:** Explore Projects (`#projects`)
- **Secondary CTA:** View Full Resume (`/assets/Jahanzaib-Resume.pdf`)
- **Quick Metric Badges (Hero Counters):**
  - **5+** Production Systems Shipped
  - **785+** Automated QA Tests Passed
  - **100%** WCAG 2.1 AA Accessibility Compliant
  - **30%** Faster Feature Delivery Velocity

---

## 4. About Me Section
- **Section Heading:** Behind the Code
- **Subheading:** Bridging Software Quality Assurance & Core Frontend Engineering
- **Narrative Content:**
  > I am a Frontend Engineer based in Pakistan with a Software Engineering degree from the University of Sindh. My background in Software Quality Assurance (SQA) fundamentally shapes how I write code: I don't just build interfaces that look polished—I engineer them to be resilient, fully accessible, and completely bug-free before they ever reach production.
  >
  > Over the past few years, I have architected and deployed production web systems ranging from an international 4-language news platform with complex bidirectional (LTR/RTL) rendering to enterprise task marketplaces and high-converting agency platforms.
  >
  > Certified by **Meta** with the 9-course Front-End Developer Professional Specialization, I specialize in **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and modern design systems. My focus is always on Core Web Vitals, sub-second load times, and clean, modular codebases.

---

## 5. Technical Skills Matrix
Organized into 4 distinct, interactive cards/tabs:

### A. Frontend Engineering
- **Core Technologies:** React.js, Next.js 16 (App Router), TypeScript, JavaScript (ES6+)
- **Styling & Design Systems:** Tailwind CSS, Bootstrap, CSS3 Modules, CSS Custom Properties / Design Tokens
- **Performance & Standards:** Core Web Vitals (Zero CLS, Sub-second FCP), Technical SEO, Semantic HTML5, Responsive UI Architecture

### B. Testing, QA & Accessibility
- **Automated Testing:** Jest Unit Testing, React Testing Library
- **Accessibility Standards:** WCAG 2.1 AA Compliance, ARIA Roles & Landmarks, Keyboard Navigation
- **QA Lifecycle:** Manual Testing, Functional & Regression Testing, Smoke & Sanity Testing, Test Case Design
- **Tracking & Methodologies:** Defect Tracking (Jira), SDLC & STLC, Agile / Scrum Framework

### C. Backend & Security
- **Server-Side & Data:** PHP 8.2 / 8.3, MySQL, Relational Database Modeling
- **Security Engineering:** PDO Prepared Statements, OWASP Hardening (SQL Injection, CSRF Tokens, XSS Sanitization)
- **API & State:** RESTful API Architecture, Session Security, Server-Side Validation, Dynamic Form Pipelines

### D. Tooling, Cloud & Workflows
- **Version Control & CI/CD:** Git, GitHub, Automated Netlify Deployments
- **Development Tools:** VS Code, Postman, Figma, Claude Code, Cursor
- **Modern Paradigms:** Component-Driven Architecture, AI-Assisted Engineering Workflows

---

## 6. Featured Production Projects

### Project 01: Vantix Digital — Agency Web Application
- **Tagline:** High-performance digital agency platform built for maximum lead generation
- **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Netlify
- **Type:** Agency Asset / Client Acquisition Platform
- **Key Architecture Highlights:**
  - Engineered with Next.js App Router and self-hosted fonts, achieving sub-second First Contentful Paint (FCP) and zero Cumulative Layout Shift (CLS).
  - Designed interactive 3-tier SLA service pricing modals and full-screen case study reading modals.
  - Implemented dynamic lead routing funnels pre-filling user service selection and budget tiers directly into a 1-click WhatsApp inquiry.
  - Centralized site data architecture (`siteData.ts`) serving as a single source of truth across all components.
- **Live Demo Link:** https://vantix-digital.netlify.app/
- **GitHub Repository:** https://github.com/Jahanzaib-Arain24/Vantix-Digital

---

### Project 02: TaskBuddy — Online Task & Service Marketplace
- **Tagline:** 4-module task marketplace with integrated ATS pipeline and automated QA suite
- **Tech Stack:** PHP 8.2, MySQL, PDO Prepared Statements, Bootstrap, Custom CSS Tokens, PWA
- **Type:** Full-Stack Enterprise Platform & ATS Pipeline
- **Key Architecture Highlights:**
  - Built 4 separate user role modules: Public Discovery Hub, Task Seeker Portal, Task Lister ATS Hub, and Admin Control Center.
  - Developed an automated ATS recruitment pipeline with status workflows (*Pending* → *Under Review* → *Shortlisted* → *Selected* → *Rejected*).
  - Integrated dynamic 2-column print-ready PDF CV generator built directly from user profile credentials.
  - Hardened under OWASP security standards (CSRF tokens, parameterized PDO queries, MIME-verified file uploads, XSS filters).
  - Authored a custom QA test suite passing **785 automated test assertions**.
- **Live Demo Link:** https://taskbuddy-portal.infinityfreeapp.com/
- **GitHub Repository:** https://github.com/Jahanzaib-Arain24/TaskBuddy-Web-Portal

---

### Project 03: Voice of Spain (VOS Media) — Multilingual News Portal
- **Tagline:** International news engine serving Spain's diaspora across 4 languages
- **Tech Stack:** Next.js, Multilingual i18n, RTL Layout Engine, High-Concurrency Caching
- **Type:** Live International News Platform
- **Key Architecture Highlights:**
  - Shipped and maintain a 4-language news portal (English, Spanish, Hindi, Urdu) serving international readership.
  - Solved complex bidirectional rendering within a single codebase: smooth seamless LTR for English/Spanish/Hindi and full RTL for Urdu.
  - Engineered localized navigation, footers, legal policies, and GDPR-compliant cookie consent modules for each language edition.
  - Tuned high-concurrency database queries and server caching for instant global delivery.
- **Live Portal Link:** https://www.vos.media/

---

### Project 04: UNIPASS — Security Sciences University Web Portal
- **Tagline:** Academic institutional platform cataloging 60+ accredited programmes
- **Tech Stack:** PHP 8.3, HTML5, CSS3 Custom Properties, Google reCAPTCHA v2
- **Type:** Institutional Academic Portal
- **Key Architecture Highlights:**
  - Deployed an institutional platform cataloging 60+ academic programmes across 5 degree tiers under Royal Charter patronage.
  - Built bot-proof inquiry and admission submission pipelines with server-side Google reCAPTCHA v2.
  - Designed modular PHP component builders ensuring absolute responsive design across 19+ root pages and 60 detail views.
- **Live Portal Link:** https://www.pass.university/
- **GitHub Repository:** https://github.com/Jahanzaib-Arain24/National-University-Of-Penal-Website

---

### Project 05: Saint Albert's International University (SAIU)
- **Tagline:** Responsive academic campus portal with dynamic admissions & math CAPTCHA
- **Tech Stack:** PHP 8, HTML5, CSS3 Custom Properties, Session CAPTCHA
- **Type:** Live Academic Campus Platform
- **Key Architecture Highlights:**
  - Developed a full-fledged international university web portal handling dynamic online student admissions.
  - Implemented server-side session-based math CAPTCHA verification to prevent automated form spamming.
  - Engineered privacy-compliant student submission logging and responsive multi-device navigation.
- **Live Portal Link:** https://saiu.education/
- **GitHub Repository:** https://github.com/Jahanzaib-Arain24/Saint-Albert-s-International-University

---

### Project 06: Personal Brand Portfolio (Live Testbed)
- **Tagline:** High-converting personal portfolio showcasing frontend capabilities
- **Tech Stack:** React.js, Tailwind CSS, Netlify CI/CD
- **Type:** Developer Showcase
- **Key Architecture Highlights:**
  - Smooth micro-interactions, responsive viewport layouts, and dark obsidian aesthetic.
  - Integrated contact desk and automated Netlify deployment workflows.
- **Live Demo Link:** https://jahanzaib-20.netlify.app/
- **GitHub Repository:** https://github.com/Jahanzaib-Arain24

---

## 7. Work Experience Timeline

### Role 1: Front-End Developer
- **Organization:** OM SOLUTIONZ PVT LTD
- **Timeline:** Dec 2025 – Present | Remote
- **Focus:** UI Component Architecture, Performance & Sprint Acceleration
- **Bullet Achievements:**
  - Architected 10+ modular, reusable UI components using React.js, Tailwind CSS, and ES6+, cutting feature turnaround time by 30% via component-driven design.
  - Accelerated feature delivery velocity to 3 production features per sprint within an Agile/Scrum team by leveraging AI-assisted development workflows.
  - Collaborated with backend engineers on REST API integrations, eliminating layout shifts and post-release frontend regressions.

---

### Role 2: Full-Stack Web Developer (Contract)
- **Organization:** Upwork (Freelance)
- **Timeline:** Sep 2025 – Present | Remote
- **Focus:** International Client Delivery & Production Web Solutions
- **Bullet Achievements:**
  - Delivered 3+ full-stack client web applications with a 100% on-time milestone delivery rate, including the Vantix Digital agency platform.
  - Configured automated continuous deployment pipelines on Netlify, reducing deployment cycles from hours to under 2 minutes.
  - Interfaced directly with US and UK clients to define technical requirements, implementing transparent SLAs, conversion-focused landing funnels, and responsive UI.

---

### Role 3: Junior SQA Engineer
- **Organization:** Net2Apps
- **Timeline:** Mar 2025 – Aug 2025 | Hyderabad, Pakistan (On-site)
- **Focus:** Software Testing Lifecycle (STLC), Bug Defect Isolation
- **Bullet Achievements:**
  - Executed 50+ test cases across functional, regression, smoke, and sanity cycles within Agile sprints, identifying and isolating 90% of defects prior to production rollout.
  - Logged, prioritized, and tracked bugs to resolution using Jira, driving a 15% decrease in post-release defects and elevating overall release stability.

---

## 8. Licenses & Certifications
- **Meta Front-End Developer Professional Certificate**
  - *Issuer:* Meta (Coursera)
  - *Details:* 9-Course Specialization covering React.js, Advanced React, JavaScript, Version Control, and Front-End Capstone
  - *Verification URL:* https://coursera.org/verify/professional-cert/1RVNEHDTY3FS
- **React Basics & Advanced React**
  - *Issuer:* Meta
  - *Details:* Component hierarchy, hooks, state machines, context API, and performance profiling
  - *Verification URL:* https://www.coursera.org/account/accomplishments/verify/P5RQKJZIM85H
- **Programming with JavaScript**
  - *Issuer:* Meta
  - *Details:* Data structures, modern ES6+ paradigms, DOM manipulation, and asynchronous programming
  - *Verification URL:* https://www.coursera.org/account/accomplishments/verify/CBQIUWPEZYCI
- **Version Control with Git & GitHub**
  - *Issuer:* Meta
  - *Details:* Branching strategies, collaborative workflows, PR reviews, and CI automation
  - *Verification URL:* https://www.coursera.org/account/accomplishments/verify/883U7DDE465Q
- **Build a Full Website using WordPress**
  - *Issuer:* Coursera Project Network
  - *Verification URL:* https://www.coursera.org/account/accomplishments/verify/WBBHQWMQ76MR

---

## 9. Education
- **Bachelor of Science in Software Engineering (BSSE)**
  - *Institution:* University of Sindh, Jamshoro, Pakistan
  - *Duration:* Jan 2021 – Dec 2024
- **Intermediate (Pre-Engineering)**
  - *Institution:* Shah Abdul Latif Degree College, Mirpurkhas, Pakistan
  - *Duration:* Jan 2019 – Dec 2020

---

## 10. Contact & Footer Section
- **Heading:** Let's Build Something Exceptional
- **Subheading:** Have an upcoming project, open engineering role, or contract inquiry? Let's talk.
- **Direct Contacts:**
  - **Email:** [arainjhanzaib@gmail.com](mailto:arainjhanzaib@gmail.com)
  - **Phone / WhatsApp:** [+92-312-3358542](https://wa.me/923123358542)
  - **Location:** Karachi, Pakistan (Open to Remote Worldwide)
- **Social & Profile Links:**
  - **LinkedIn:** [linkedin.com/in/jahanzaib-arain](https://www.linkedin.com/in/jahanzaib-arain/)
  - **GitHub:** [github.com/Jahanzaib-Arain24](https://github.com/Jahanzaib-Arain24)
  - **Portfolio:** [jahanzaib-20.netlify.app](https://jahanzaib-20.netlify.app/)
  - **Resume Direct Link:** `/assets/Jahanzaib-Resume.pdf`
- **Copyright Text:**
  - `© 2026 Muhammad Jahanzaib. Engineered with Next.js & Tailwind CSS. All rights reserved.`
