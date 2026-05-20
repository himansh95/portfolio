# 🧑‍💻 Developer Portfolio — Technical Design Document

## 1. Project Overview

A personal developer portfolio website built with **React + Vite**, styled to closely mirror the **"Gp" BootstrapMade template** found in `archive/template/`. The site will be hosted on **GitHub Pages** and will use a **data-driven architecture** where all dynamic content (skills, projects, testimonials, etc.) lives in JSON files under a dedicated `data/` folder.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **React 18 + Vite** | Fast builds, modern DX |
| Styling | **CSS Modules + custom CSS** | Mirrors the template's style.css approach; no extra framework needed |
| Animations | **AOS (Animate on Scroll)** | Same library used in the template |
| Slider / Carousel | **Swiper.js** | Same library used in the template (clients & testimonials) |
| Lightbox | **GLightbox** | Same library used in the template (portfolio images) |
| Count-up animations | **react-countup** | Replaces `purecounter` from the template |
| Icons | **Bootstrap Icons + Boxicons + Remixicon** | Same icon sets as the template |
| Routing | **React Router v6 (HashRouter)** | Required for GitHub Pages SPA support |
| Deployment | **gh-pages npm package** | One-command deploy to GitHub Pages |

---

## 3. Project Structure

```
portfolio/
├── public/
│   ├── favicon.ico                   # from archive/old-img/favicon.ico
│   └── assets/
│       └── img/
│           ├── me.jpg                # Profile photo
│           ├── hero-bg.jpg           # Hero section background
│           ├── testimonials-bg.jpg   # Testimonials section background
│           ├── footer-bg.jpg         # Footer background
│           ├── companies/            # Company logos (Salesforce, Oracle, etc.)
│           │   ├── salesforce.svg
│           │   └── oracle.png
│           ├── portfolio/            # Project / certificate images
│           │   ├── digital-prodigy-cert.jpg
│           │   ├── oca-cert.jpg
│           │   ├── os-cert.jpg
│           │   └── sfcc-cert.jpeg
│           ├── testimonials/         # Reviewer photos
│           │   ├── peter-mcelroy.jpg
│           │   └── stacey-humphrey.jpg
│           └── resume/
│               └── Himanshu_Resume.pdf
│
├── src/
│   ├── main.jsx                      # App entry point
│   ├── App.jsx                       # Root component with HashRouter
│   ├── index.css                     # Global styles (ported from template style.css)
│   │
│   ├── data/                         # ★ All dynamic content lives here as JSON
│   │   ├── personal.json             # Name, tagline, bio, location, email, social links
│   │   ├── skills.json               # Technical skills grouped by category with icon names
│   │   ├── experience.json           # Work history (company, role, dates, bullets)
│   │   ├── projects.json             # Portfolio projects (title, category, image, links)
│   │   ├── certifications.json       # Certifications (name, issuer, image, date)
│   │   ├── testimonials.json         # Recommendations (name, role, company, photo, text)
│   │   ├── companies.json            # Companies/clients logos for the slider
│   │   └── stats.json                # Count-up statistics (years exp, projects, certs, etc.)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx            # Fixed top navbar with smooth scroll & mobile toggle
│   │   │   └── Footer.jsx            # Footer with social links & copyright
│   │   │
│   │   ├── pages/
│   │   │   └── ResumePage.jsx        # Full-page PDF resume viewer with Download button
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.jsx              # Full-screen hero with name, title, CTA buttons & icon boxes
│   │   │   ├── About.jsx             # Photo + bio + key highlights list
│   │   │   ├── Companies.jsx         # Swiper logo slider (former clients section)
│   │   │   ├── Skills.jsx            # Skills grid with icons grouped by category
│   │   │   ├── Experience.jsx        # Work experience cards (replaces Services)
│   │   │   ├── CallToAction.jsx      # "Download Resume / Hire Me" CTA banner
│   │   │   ├── Projects.jsx          # Filterable portfolio grid with GLightbox
│   │   │   ├── Stats.jsx             # Animated count-up stats (replaces Counts)
│   │   │   ├── Testimonials.jsx      # Swiper testimonials slider
│   │   │   ├── Certifications.jsx    # Certification cards (replaces Team)
│   │   │   └── Contact.jsx           # Contact info + EmailJS contact form
│   │   │
│   │   └── ui/
│   │       ├── SectionTitle.jsx      # Reusable section heading (title + subtitle)
│   │       ├── BackToTop.jsx         # Floating back-to-top button
│   │       └── Preloader.jsx         # Page preloader overlay
│   │
│   └── hooks/
│       └── useActiveSection.js       # Tracks active nav link based on scroll position
│
├── TECHNICAL_DESIGN.md               # This file
├── index.html                        # Vite HTML entry
├── vite.config.js                    # Vite config (base path for GitHub Pages)
└── package.json
```

---

## 4. Data Folder — JSON Schema

### `personal.json`
```json
{
  "name": "Himanshu Chachra",
  "tagline": "Full Stack Developer & Salesforce Architect",
  "bio": "...",
  "location": "...",
  "email": "...",
  "resumeUrl": "/assets/img/resume/Himanshu_Resume.pdf",
  "social": {
    "linkedin": "https://linkedin.com/in/...",
    "github": "https://github.com/himansh95",
    "twitter": ""
  }
}
```

### `skills.json`
```json
[
  {
    "category": "Frontend",
    "icon": "bx bx-code-alt",
    "items": ["React", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
  },
  {
    "category": "Backend",
    "icon": "bx bx-server",
    "items": ["Node.js", "Java", "REST APIs"]
  },
  {
    "category": "Salesforce",
    "icon": "bx bxl-salesforce",
    "items": ["Apex", "LWC", "Flows", "SOQL", "Commerce Cloud (SFCC)"]
  },
  {
    "category": "DevOps & Tools",
    "icon": "bx bx-wrench",
    "items": ["Git", "GitHub Actions", "JIRA", "VS Code"]
  }
]
```

### `experience.json`
```json
[
  {
    "id": 1,
    "company": "Salesforce",
    "logo": "/assets/img/companies/salesforce.svg",
    "role": "Senior Developer",
    "startDate": "2020-01",
    "endDate": null,
    "location": "Remote",
    "bullets": [
      "Led development of...",
      "Architected solutions for..."
    ]
  }
]
```

### `projects.json`
```json
[
  {
    "id": 1,
    "title": "Project Name",
    "category": "web",
    "filterClass": "filter-web",
    "image": "/assets/img/portfolio/project-1.jpg",
    "description": "Short description",
    "liveUrl": "https://...",
    "repoUrl": "https://github.com/..."
  }
]
```

### `certifications.json`
```json
[
  {
    "id": 1,
    "name": "Salesforce Commerce Cloud Developer",
    "issuer": "Salesforce",
    "image": "/assets/img/portfolio/sfcc-cert.jpeg",
    "date": "2021-05",
    "credentialUrl": ""
  }
]
```

### `testimonials.json`
```json
[
  {
    "id": 1,
    "name": "Peter McElroy",
    "role": "Engineering Manager",
    "company": "Salesforce",
    "photo": "/assets/img/testimonials/peter-mcelroy.jpg",
    "text": "..."
  }
]
```

### `companies.json`
```json
[
  { "name": "Salesforce", "logo": "/assets/img/companies/salesforce.svg" },
  { "name": "Oracle", "logo": "/assets/img/companies/oracle.png" }
]
```

### `stats.json`
```json
[
  { "icon": "bi bi-clock", "end": 8, "label": "Years of Experience", "duration": 2 },
  { "icon": "bi bi-journal-richtext", "end": 30, "label": "Projects Completed", "duration": 2 },
  { "icon": "bi bi-award", "end": 4, "label": "Certifications", "duration": 2 },
  { "icon": "bi bi-emoji-smile", "end": 20, "label": "Happy Clients", "duration": 2 }
]
```

---

## 5. Page Sections (Single Page Application)

The app renders a single page at `/#/` with all sections stacked vertically, matching the template layout. Sections in order:

| # | Section | Template Equivalent | Data Source |
|---|---|---|---|
| 1 | **Header** | Header | `personal.json` |
| 2 | **Hero** | Hero | `personal.json` + `skills.json` (top categories) |
| 3 | **About** | About | `personal.json` |
| 4 | **Companies** | Clients (Swiper) | `companies.json` |
| 5 | **Skills** | Features | `skills.json` |
| 6 | **Experience** | Services | `experience.json` |
| 7 | **Call To Action** | CTA | `personal.json` (resume link) |
| 8 | **Projects** | Portfolio (filtered grid) | `projects.json` |
| 9 | **Stats** | Counts (count-up) | `stats.json` |
| 10 | **Testimonials** | Testimonials (Swiper) | `testimonials.json` |
| 11 | **Certifications** | Team | `certifications.json` |
| 12 | **Contact** | Contact | `personal.json` |
| 13 | **Footer** | Footer | `personal.json` |

---

## 6. Routing Strategy

Using **`HashRouter`** from React Router v6, since GitHub Pages does not support server-side routing for SPAs.

```
/#/          → Main single-page portfolio
/#/resume    → Full-page resume viewer (renders the PDF in-browser)
/#/project/1 → (Optional) Project detail page
```

### Resume Route (`/#/resume`)
- Renders a dedicated `ResumePage.jsx` component.
- Displays the PDF (`/assets/img/resume/Himanshu_Resume.pdf`) using an `<iframe>` or `<embed>` tag for inline viewing.
- Includes a **Download** button that triggers a direct PDF download.
- A **Back to Portfolio** button / nav link returns the user to `/#/`.
- The resume PDF file lives at `public/assets/img/resume/Himanshu_Resume.pdf` (migrated from `archive/old-img/resume/Himanshu_Resume.pdf`).

---

## 7. GitHub Pages Deployment

### `vite.config.js` — set `base` to repo name:
```js
export default {
  base: '/portfolio/',  // must match GitHub repo name
}
```

### `package.json` scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Deploy command:
```bash
npm run deploy
```
This builds the app and pushes the `dist/` folder to the `gh-pages` branch automatically.

---

## 8. Styling Approach

- The template's `assets/css/style.css` will be **ported and adapted** into `src/index.css` as global styles.
- CSS custom properties (variables) will be used for the color theme:
  ```css
  :root {
    --primary-color: #47b2e4;
    --dark-color: #37517e;
    --text-color: #444444;
  }
  ```
- Each component can have its own **co-located CSS file** (e.g. `Hero.css`) for section-specific overrides.
- Responsive breakpoints follow Bootstrap's grid conventions (already in the template).

---

## 9. External Libraries to Install

```bash
npm install react-router-dom swiper aos glightbox react-countup react-intersection-observer @emailjs/browser
```

| Package | Purpose |
|---|---|
| `react-router-dom` | HashRouter for GitHub Pages |
| `swiper` | Clients & Testimonials carousels |
| `aos` | Animate on Scroll |
| `glightbox` | Portfolio image lightbox |
| `react-countup` | Animated stat counters |
| `react-intersection-observer` | Trigger countup when section is visible |
| `@emailjs/browser` | Contact form without a backend |

---

## 10. Image Assets Migration Plan

All images from `archive/old-img/` will be copied to `public/assets/img/`:

| Source (`archive/old-img/`) | Destination (`public/assets/img/`) |
|---|---|
| `me.jpg` | `me.jpg` |
| `hero-bg.jpg` | `hero-bg.jpg` |
| `testimonials-bg.jpg` | `testimonials-bg.jpg` |
| `footer-bg.jpg` | `footer-bg.jpg` |
| `logo-salesforce-gray.svg` | `companies/salesforce-gray.svg` |
| `logo-salesforce-white.svg` | `companies/salesforce-white.svg` |
| `oracle.png` | `companies/oracle.png` |
| `portfolio/*.jpg` | `portfolio/` |
| `testimonials/peter-mcelroy.jpg` | `testimonials/peter-mcelroy.jpg` |
| `testimonials/stacey-humphrey.jpg` | `testimonials/stacey-humphrey.jpg` |
| `resume/Himanshu_Resume.pdf` | `resume/Himanshu_Resume.pdf` |
| `favicon.ico` | `../favicon.ico` (root of `public/`) |

---

## 11. Development Phases

### Phase 1 — Project Setup
- [ ] Initialize Vite + React project
- [ ] Install all dependencies
- [ ] Port template CSS to `src/index.css`
- [ ] Copy images to `public/assets/img/`
- [ ] Create all JSON data files with placeholder/real data
- [ ] Configure `vite.config.js` for GitHub Pages

### Phase 2 — Layout Components
- [ ] `Header.jsx` — Fixed navbar with mobile toggle and active section highlight; includes "Resume" nav link pointing to `/#/resume`
- [ ] `Footer.jsx` — Social links, copyright
- [ ] `BackToTop.jsx`, `Preloader.jsx`
- [ ] `ResumePage.jsx` — PDF viewer with Download + Back to Portfolio buttons
- [ ] `App.jsx` — Compose all sections + define routes (`/` and `/resume`)

### Phase 3 — Content Sections
- [ ] `Hero.jsx`
- [ ] `About.jsx`
- [ ] `Companies.jsx` (Swiper)
- [ ] `Skills.jsx`
- [ ] `Experience.jsx`
- [ ] `CallToAction.jsx`
- [ ] `Projects.jsx` (filtered grid + GLightbox)
- [ ] `Stats.jsx` (react-countup)
- [ ] `Testimonials.jsx` (Swiper)
- [ ] `Certifications.jsx`
- [ ] `Contact.jsx` (EmailJS)

### Phase 4 — Polish & Deploy
- [ ] Cross-browser & responsive testing
- [ ] SEO meta tags (og:image, description, title)
- [ ] Performance audit (Lighthouse)
- [ ] Deploy to GitHub Pages via `npm run deploy`

---

## 12. Key Decisions & Notes

1. **No Redux / Context** needed — all data is static JSON loaded directly into components.
2. **No backend** — Contact form uses [EmailJS](https://www.emailjs.com/) (free tier) to send emails without a server.
3. **AOS initialization** happens once in `App.jsx` via `useEffect`.
4. **Swiper & GLightbox** are initialized inside component `useEffect` hooks with cleanup on unmount.
5. **`HashRouter`** means the URL will look like `https://himansh95.github.io/portfolio/#/` — this is expected and works perfectly on GitHub Pages.
6. The **template's Team section** is repurposed as a **Certifications** grid — a more relevant section for a developer portfolio.
7. The **template's Services section** is repurposed as an **Experience** section showing work history.
8. The **template's Features section** is repurposed as a **Skills** section.
