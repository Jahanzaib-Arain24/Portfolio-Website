# 🤝 Contributing to Muhammad Jahanzaib Portfolio

First off, thank you for considering contributing to **Muhammad Jahanzaib's Senior Frontend & Full-Stack Portfolio**! 

This repository showcases enterprise-grade Next.js 16 App Router engineering, React 19 architecture, a SQLite + Prisma ORM Admin CMS, and a luxury Obsidian & Amber Gold design system.

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful, professional, and welcoming environment for everyone. Please treat contributors and community members with courtesy and high engineering ethics.

---

## 🛠️ Development Workflow

1. **Fork the Repository**
   - Click the **Fork** button at the top right of the GitHub repository.

2. **Clone your Fork locally**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-website.git
   cd portfolio-website
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Initialize Local Database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   # Or run via start.bat on Windows
   ```

7. **Make Your Changes & Test**
   - Follow clean TypeScript, React 19 component practices, and strict ESLint rules.
   - Maintain the mobile-first responsive layout (tested across 360px to 4K displays).
   - Adhere to the luxury Obsidian (`#080808`) and Amber Gold (`#F59E0B` / `#D97706`) design system.
   - Run `npm run build` locally to verify 0 build errors.

8. **Commit Your Changes**
   Follow conventional commits:
   ```bash
   git add .
   git commit -m "feat(portfolio): add interactive case study metrics modal"
   ```

9. **Push to Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

10. **Submit a Pull Request**
    - Open a PR against the `master` branch with a clear description and screenshots of your changes.

---

## 📐 Coding Standards & Guidelines

- **TypeScript**: Strict typing with comprehensive interface models defined in `src/types/index.ts`. Never use `any`.
- **Component Architecture**: Keep UI components modular, reusable, and cleanly organized under `src/components/portfolio/`, `src/components/admin/`, and `src/components/ui/`.
- **Styling**: Modern Tailwind CSS 4 utility classes alongside clean inline gradients and CSS tokens in `globals.css`.
- **Database & CMS**: All dynamic data models are governed by Prisma Schema in `prisma/schema.prisma` with SQLite storage.
- **Accessibility (a11y)**: Maintain WCAG AA compliance with semantic HTML tags, keyboard navigation, and proper contrast ratios.
- **Assets**: Optimize images in WebP or PNG format before adding them to `public/`.

---

## 🐛 Reporting Bugs

If you encounter an issue or bug:
1. Open an issue on GitHub.
2. Provide a clear, descriptive title.
3. Detail the exact steps to reproduce the issue.
4. Include screenshots, browser version, and screen viewport details.

---

## 💡 Feature Suggestions

Have an idea to make this portfolio even sharper? Submit an issue detailing:
- The problem or opportunity you've identified.
- Your proposed solution or UI/UX behavior.
- Expected value for recruiters, clients, and visitors.

---

## 👤 Author & Support

Maintained by **Muhammad Jahanzaib** ([@Jahanzaib-Arain24](https://github.com/Jahanzaib-Arain24)).  
For inquiries, reach out via [arainjhanzaib@gmail.com](mailto:arainjhanzaib@gmail.com).
