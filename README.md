# Himanshu Chachra — Portfolio

A personal developer portfolio built with **React + Vite**, deployed on **GitHub Pages**.

🌐 **Live:** [himansh95.github.io/portfolio](https://himansh95.github.io/portfolio/)

---

## ✨ Features

- **Hero** — Animated introduction with social links
- **About** — Bio, location, and contact info
- **Skills** — Tech stack with proficiency indicators
- **Experience** — Timeline of work history driven by JSON data
- **Projects** — Cards for static projects + live GitHub repo feed (deduped)
- **Certifications** — Credential showcase with images
- **Stats** — Animated counters
- **Testimonials** — Swiper-powered testimonial carousel
- **Call to Action** — Links to contact, resume view, and CV download
- **Contact** — EmailJS-powered contact form
- **Resume Page** — Embedded PDF viewer with download option

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Bootstrap 5, custom CSS, Boxicons, Remix Icons |
| Animations | AOS (Animate on Scroll) |
| Carousel | Swiper.js |
| Lightbox | GLightbox |
| Email | EmailJS |
| Deployment | GitHub Pages via `gh-pages` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/        # Header, Footer
│   ├── pages/         # ResumePage
│   ├── sections/      # Hero, About, Skills, Experience, Projects, ...
│   └── ui/            # Reusable UI components
├── data/              # JSON data files (projects, experience, skills, ...)
├── hooks/             # Custom React hooks
└── utils/             # Utility functions
public/
└── assets/img/        # Images, resume PDF, certificates
```

---

## ⚙️ Configuration

All site content is driven by JSON files in `src/data/`:

| File | Contents |
|---|---|
| `personal.json` | Name, bio, contact, social links |
| `experience.json` | Work history |
| `projects.json` | Featured projects (merged with GitHub repos) |
| `skills.json` | Tech skills and proficiency |
| `certifications.json` | Certifications with images |
| `stats.json` | Animated counter values |
| `testimonials.json` | Testimonials |

### GitHub Token (optional)

To increase the GitHub API rate limit from 60 to 5000 requests/hour, create a `.env` file in the project root:

```env
VITE_GITHUB_TOKEN=your_token_here
```

> Create a token at [github.com/settings/tokens](https://github.com/settings/tokens) — no scopes needed for public repos.

---

## 📦 Deployment

```bash
npm run deploy
```

This builds the project and pushes the `dist/` folder to the `gh-pages` branch automatically.

> Make sure `base` in `vite.config.js` matches your repo name: `base: '/portfolio/'`

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.
