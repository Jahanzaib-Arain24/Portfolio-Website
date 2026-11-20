import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding complete comprehensive portfolio content from Jahanzaib-20.netlify.app & portfolio-content.md...");

  // 1. Admin User
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "adminpassword123", 10);
  await prisma.user.upsert({
    where: { email: "arainjhanzaib@gmail.com" },
    update: { password: hashedPassword },
    create: {
      email: "arainjhanzaib@gmail.com",
      password: hashedPassword,
      name: "Muhammad Jahanzaib",
      role: "ADMIN",
    },
  });

  // 2. Profile with All Details from old site & new content
  await prisma.profile.upsert({
    where: { id: "default-profile" },
    update: {
      name: "Muhammad Jahanzaib Arain",
      title: "Frontend Engineer & Full Stack Web Developer",
      subtitle: "UI/UX Designer | Ex-SQA Zero-Defect Discipline",
      bio: "I am a Frontend Engineer and Full Stack Developer based in Karachi, Pakistan, holding a Software Engineering degree from the University of Sindh. With an ex-SQA zero-defect discipline, I ensure every interface I construct is robust, accessible, blazing-fast, and bug-free.\n\nOver the past years, I have architected and deployed high-performance systems including multi-lingual international news portals (VOS Media), enterprise job & task ATS platforms (TaskBuddy), high-converting agency applications (Vantix Digital), and institutional academic portals (UNIPASS & SAIU).\n\nCertified by Meta with the 9-course Front-End Developer Professional Specialization, I bridge the gap between creative UI/UX design, clean React / Next.js engineering, and rigorous automated quality assurance.",
      email: "arainjhanzaib@gmail.com",
      phone: "+92 312 3358542",
      location: "Karachi, Pakistan (Open to Remote Worldwide)",
      heroGreeting: "Hi There, I'm",
      heroBadge: "🟢 Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)",
      primaryCTA: "Explore Projects",
      secondaryCTA: "View Full Resume",
      resumeUrl: "/assets/jahanzaib-dev.pdf",
      avatarUrl: "/assets/about-me.png",
      heroCounters: JSON.stringify([
        { label: "Production Systems Shipped", value: "6+" },
        { label: "Automated QA Tests Passed", value: "785+" },
        { label: "WCAG 2.1 AA Compliant", value: "100%" },
        { label: "Delivery Acceleration", value: "30%" }
      ]),
    },
    create: {
      id: "default-profile",
      name: "Muhammad Jahanzaib Arain",
      title: "Frontend Engineer & Full Stack Web Developer",
      subtitle: "UI/UX Designer | Ex-SQA Zero-Defect Discipline",
      bio: "I am a Frontend Engineer and Full Stack Developer based in Karachi, Pakistan, holding a Software Engineering degree from the University of Sindh. With an ex-SQA zero-defect discipline, I ensure every interface I construct is robust, accessible, blazing-fast, and bug-free.\n\nOver the past years, I have architected and deployed high-performance systems including multi-lingual international news portals (VOS Media), enterprise job & task ATS platforms (TaskBuddy), high-converting agency applications (Vantix Digital), and institutional academic portals (UNIPASS & SAIU).\n\nCertified by Meta with the 9-course Front-End Developer Professional Specialization, I bridge the gap between creative UI/UX design, clean React / Next.js engineering, and rigorous automated quality assurance.",
      email: "arainjhanzaib@gmail.com",
      phone: "+92 312 3358542",
      location: "Karachi, Pakistan (Open to Remote Worldwide)",
      heroGreeting: "Hi There, I'm",
      heroBadge: "🟢 Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)",
      primaryCTA: "Explore Projects",
      secondaryCTA: "View Full Resume",
      resumeUrl: "/assets/jahanzaib-dev.pdf",
      avatarUrl: "/assets/about-me.png",
      heroCounters: JSON.stringify([
        { label: "Production Systems Shipped", value: "6+" },
        { label: "Automated QA Tests Passed", value: "785+" },
        { label: "WCAG 2.1 AA Compliant", value: "100%" },
        { label: "Delivery Acceleration", value: "30%" }
      ]),
    },
  });

  // 3. Social Links
  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      { profileId: "default-profile", platform: "LinkedIn", url: "https://www.linkedin.com/in/jahanzaib-arain/", icon: "Linkedin", order: 1 },
      { profileId: "default-profile", platform: "GitHub", url: "https://github.com/Jahanzaib-Arain24", icon: "Github", order: 2 },
      { profileId: "default-profile", platform: "Facebook", url: "https://www.facebook.com/Jahanzaib.Arain24", icon: "Facebook", order: 3 },
      { profileId: "default-profile", platform: "Instagram", url: "https://www.instagram.com/jahanzaib.arain24/", icon: "Instagram", order: 4 },
      { profileId: "default-profile", platform: "WhatsApp", url: "https://wa.me/923123358542", icon: "MessageCircle", order: 5 },
    ]
  });

  // 4. Skills (Complete from Old Site: HTML, CSS, JS, Bootstrap, Tailwind, React, Node, MySQL, Python, C++, Git, GitHub, Jira, WordPress, Shopify)
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  const skillCategoriesData = [
    {
      name: "Core Development",
      icon: "Code2",
      order: 1,
      skills: [
        { name: "React.js", proficiency: 95 },
        { name: "Next.js 16 (App Router)", proficiency: 92 },
        { name: "JavaScript (ES6+)", proficiency: 95 },
        { name: "TypeScript", proficiency: 90 },
        { name: "Node.js", proficiency: 85 },
        { name: "HTML5", proficiency: 98 },
        { name: "CSS3", proficiency: 95 },
        { name: "Tailwind CSS", proficiency: 95 },
        { name: "Bootstrap", proficiency: 92 },
      ]
    },
    {
      name: "Backend, DB & Languages",
      icon: "Database",
      order: 2,
      skills: [
        { name: "PHP 8.2 / 8.3", proficiency: 88 },
        { name: "MySQL", proficiency: 90 },
        { name: "Python", proficiency: 82 },
        { name: "C++", proficiency: 80 },
        { name: "RESTful APIs", proficiency: 92 },
        { name: "PDO Prepared Statements", proficiency: 90 },
      ]
    },
    {
      name: "CMS & E-Commerce",
      icon: "LayoutGrid",
      order: 3,
      skills: [
        { name: "WordPress", proficiency: 90 },
        { name: "Shopify", proficiency: 85 },
        { name: "E-Commerce Architecture", proficiency: 88 },
        { name: "Responsive Theme Design", proficiency: 95 },
      ]
    },
    {
      name: "SQA, QA Testing & Tooling",
      icon: "ShieldCheck",
      order: 4,
      skills: [
        { name: "Jira Defect Tracking", proficiency: 92 },
        { name: "Manual & Regression Testing", proficiency: 95 },
        { name: "Jest & React Testing Library", proficiency: 88 },
        { name: "Git & GitHub", proficiency: 95 },
        { name: "WCAG 2.1 AA Accessibility", proficiency: 94 },
        { name: "Netlify CI/CD", proficiency: 90 },
      ]
    }
  ];

  for (const cat of skillCategoriesData) {
    const createdCat = await prisma.skillCategory.create({
      data: {
        name: cat.name,
        icon: cat.icon,
        order: cat.order,
      }
    });

    await prisma.skill.createMany({
      data: cat.skills.map((s, idx) => ({
        name: s.name,
        categoryId: createdCat.id,
        proficiency: s.proficiency,
        order: idx + 1
      }))
    });
  }

  // 5. Work Experience (Includes Junior Web Developer @ DAT AI Systems from old site + OM Solutionz + Upwork + Net2Apps)
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        role: "Front-End Developer",
        company: "OM SOLUTIONZ PVT LTD",
        timeline: "Dec 2025 – Present",
        location: "Remote",
        focus: "UI Component Architecture, Performance & Sprint Acceleration",
        achievements: JSON.stringify([
          "Architected 10+ modular, reusable UI components using React.js, Tailwind CSS, and ES6+, cutting feature turnaround time by 30% via component-driven design.",
          "Accelerated feature delivery velocity to 3 production features per sprint within an Agile/Scrum team by leveraging modern component workflows.",
          "Collaborated with backend engineers on REST API integrations, eliminating layout shifts and post-release frontend regressions."
        ]),
        order: 1
      },
      {
        role: "Full-Stack Web Developer (Contract)",
        company: "Upwork (Freelance)",
        timeline: "Sep 2025 – Present",
        location: "Remote",
        focus: "International Client Delivery & Production Web Solutions",
        achievements: JSON.stringify([
          "Delivered 3+ full-stack client web applications with a 100% on-time milestone delivery rate, including the Vantix Digital agency platform.",
          "Configured automated continuous deployment pipelines on Netlify, reducing deployment cycles from hours to under 2 minutes.",
          "Interfaced directly with US and UK clients to define technical requirements, implementing transparent SLAs, conversion-focused landing funnels, and responsive UI."
        ]),
        order: 2
      },
      {
        role: "Junior SQA Engineer",
        company: "Net2Apps",
        timeline: "Mar 2025 – Aug 2025",
        location: "Hyderabad, Pakistan (On-site)",
        focus: "Software Testing Lifecycle (STLC), Bug Defect Isolation",
        achievements: JSON.stringify([
          "Executed 50+ test cases across functional, regression, smoke, and sanity cycles within Agile sprints, identifying and isolating 90% of defects prior to production rollout.",
          "Logged, prioritized, and tracked bugs to resolution using Jira, driving a 15% decrease in post-release defects and elevating overall release stability.",
          "Improved release quality by 15% fewer post-release defects documenting and tracking defects through to resolution using JIRA."
        ]),
        order: 3
      }
    ]
  });

  // 6. Featured Production Projects (All from portfolio-content.md & old site)
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Vantix Digital",
        tagline: "High-performance digital agency platform built for maximum lead generation",
        description: "Next-generation digital agency web platform engineered for optimal conversion, interactive tier calculators, and zero-defect performance.",
        techStack: JSON.stringify(["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Lucide Icons", "Netlify"]),
        type: "Agency Asset / Client Acquisition",
        highlights: JSON.stringify([
          "Engineered with Next.js App Router and self-hosted fonts, achieving sub-second First Contentful Paint (FCP) and zero Cumulative Layout Shift (CLS).",
          "Designed interactive 3-tier SLA service pricing modals and full-screen case study reading modals.",
          "Implemented dynamic lead routing funnels pre-filling user service selection and budget tiers directly into a 1-click WhatsApp inquiry.",
          "Centralized site data architecture (siteData.ts) serving as a single source of truth across all components."
        ]),
        liveUrl: "https://vantix-digital.netlify.app/",
        githubUrl: "https://github.com/Jahanzaib-Arain24/Vantix-Digital",
        imageUrl: "/assets/Vantix-Digital.png",
        featured: true,
        order: 1
      },
      {
        title: "TaskBuddy",
        tagline: "4-module task marketplace with integrated ATS pipeline and automated QA suite",
        description: "Enterprise task and service marketplace built with automated recruitment workflow and hardened under OWASP standards.",
        techStack: JSON.stringify(["PHP 8.2", "MySQL", "PDO Prepared", "Bootstrap", "Custom CSS", "PWA"]),
        type: "Full-Stack Enterprise & ATS Pipeline",
        highlights: JSON.stringify([
          "Built 4 separate user role modules: Public Discovery Hub, Task Seeker Portal, Task Lister ATS Hub, and Admin Control Center.",
          "Developed an automated ATS recruitment pipeline with status workflows (Pending → Under Review → Shortlisted → Selected → Rejected).",
          "Integrated dynamic 2-column print-ready PDF CV generator built directly from user profile credentials.",
          "Hardened under OWASP security standards (CSRF tokens, parameterized PDO queries, MIME-verified file uploads, XSS filters).",
          "Authored a custom QA test suite passing 785 automated test assertions."
        ]),
        liveUrl: "https://taskbuddy-portal.infinityfreeapp.com/",
        githubUrl: "https://github.com/Jahanzaib-Arain24/TaskBuddy-Web-Portal",
        imageUrl: "/assets/taskbuddy-web-portal.png",
        featured: true,
        order: 2
      },
      {
        title: "Voice of Spain (VOS Media)",
        tagline: "International news engine serving Spain's diaspora across 4 languages",
        description: "Multilingual high-concurrency international news publication platform with bidirectional LTR/RTL support.",
        techStack: JSON.stringify(["Next.js", "Multilingual i18n", "RTL Layout Engine", "High-Concurrency Caching"]),
        type: "Live International News Platform",
        highlights: JSON.stringify([
          "Shipped and maintain a 4-language news portal (English, Spanish, Hindi, Urdu) serving international readership.",
          "Solved complex bidirectional rendering within a single codebase: smooth seamless LTR for English/Spanish/Hindi and full RTL for Urdu.",
          "Engineered localized navigation, footers, legal policies, and GDPR-compliant cookie consent modules for each language edition.",
          "Tuned high-concurrency database queries and server caching for instant global delivery."
        ]),
        liveUrl: "https://www.vos.media/",
        githubUrl: null,
        imageUrl: "/assets/voice-of-spain.png",
        featured: true,
        order: 3
      },
      {
        title: "National University of Penal (UNIPASS)",
        tagline: "Academic institutional platform cataloging 60+ accredited programmes",
        description: "Institutional university web portal catering to 60+ academic degrees with security-hardened student admission pipelines.",
        techStack: JSON.stringify(["PHP 8.3", "HTML5", "CSS3 Custom Properties", "Google reCAPTCHA v2"]),
        type: "Institutional Academic Portal",
        highlights: JSON.stringify([
          "Deployed an institutional platform cataloging 60+ academic programmes across 5 degree tiers under Royal Charter patronage.",
          "Built bot-proof inquiry and admission submission pipelines with server-side Google reCAPTCHA v2.",
          "Designed modular PHP component builders ensuring absolute responsive design across 19+ root pages and 60 detail views."
        ]),
        liveUrl: "https://www.pass.university/",
        githubUrl: "https://github.com/Jahanzaib-Arain24/National-University-Of-Penal-Website",
        imageUrl: "/assets/the-national-university-of-penal.png",
        featured: false,
        order: 4
      },
      {
        title: "Saint Albert's International University (SAIU)",
        tagline: "Responsive academic campus portal with dynamic admissions & math CAPTCHA",
        description: "Modern campus portal engineered for student registrations and interactive academic exploration.",
        techStack: JSON.stringify(["PHP 8", "HTML5", "CSS3 Custom Properties", "Session CAPTCHA"]),
        type: "Live Academic Campus Platform",
        highlights: JSON.stringify([
          "Developed a full-fledged international university web portal handling dynamic online student admissions.",
          "Implemented server-side session-based math CAPTCHA verification to prevent automated form spamming.",
          "Engineered privacy-compliant student submission logging and responsive multi-device navigation."
        ]),
        liveUrl: "https://saiu.education/",
        githubUrl: "https://github.com/Jahanzaib-Arain24/Saint-Albert-s-International-University",
        imageUrl: "/assets/saint-albert-university.png",
        featured: false,
        order: 5
      },
      {
        title: "Little Lemon Restaurant Web App",
        tagline: "Modern responsive restaurant web application featuring dynamic table booking",
        description: "Meta Front-End Capstone project built with React, interactive table reservation forms, accessible UI, and unit test suites.",
        techStack: JSON.stringify(["React.js", "JavaScript (ES6)", "CSS3 Modules", "Jest", "RTL"]),
        type: "Food & Hospitality Web App",
        highlights: JSON.stringify([
          "Engineered accessible online table reservation system with real-time slot validation.",
          "Unit tested booking state transitions using Jest and React Testing Library.",
          "Designed mobile-first intuitive food ordering and menu browsing interfaces."
        ]),
        liveUrl: "https://jahanzaib-20.netlify.app/",
        githubUrl: "https://github.com/Jahanzaib-Arain24/Little-Lemon-Restaurant",
        imageUrl: "/assets/Little-Lemon.png",
        featured: false,
        order: 6
      }
    ]
  });

  // 7. Verified Certifications
  await prisma.certification.deleteMany();
  await prisma.certification.createMany({
    data: [
      {
        title: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta (Coursera)",
        details: "9-Course Specialization covering React.js, Advanced React, JavaScript, Version Control, and Front-End Capstone",
        verifyUrl: "https://www.coursera.org/account/accomplishments/professional-cert/IRVNEHQTY3FS",
        order: 1
      },
      {
        title: "React Basics & Advanced React",
        issuer: "Meta",
        details: "Component hierarchy, hooks, state machines, context API, and performance profiling",
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/P5RQKJZIM85H",
        order: 2
      },
      {
        title: "Programming with JavaScript",
        issuer: "Meta",
        details: "Data structures, modern ES6+ paradigms, DOM manipulation, and asynchronous programming",
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/CBQIUWPEZYCI",
        order: 3
      },
      {
        title: "Version Control with Git & GitHub",
        issuer: "Meta",
        details: "Branching strategies, collaborative workflows, PR reviews, and CI automation",
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/883U7DDE465Q",
        order: 4
      },
      {
        title: "Build a Full Website using WordPress",
        issuer: "Coursera Project Network",
        details: "CMS Architecture and deployment",
        verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WBBHQWMQ76MR",
        order: 5
      }
    ]
  });

  // 8. Complete Education (Including Matriculation from old website)
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        degree: "Bachelor of Science in Software Engineering (BSSE)",
        institution: "University of Sindh",
        location: "Jamshoro, Pakistan",
        duration: "Jan 2021 – Dec 2024",
        order: 1
      },
      {
        degree: "Intermediate (Pre-Engineering)",
        institution: "Shah Abdul Latif Degree College",
        location: "Mirpurkhas, Pakistan",
        duration: "Jan 2019 – Dec 2020",
        order: 2
      },
      {
        degree: "Matriculation (Science)",
        institution: "Shaheen Public High School",
        location: "Mirpurkhas, Pakistan",
        duration: "Jan 2017 – Dec 2018",
        order: 3
      }
    ]
  });

  console.log("Complete seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
