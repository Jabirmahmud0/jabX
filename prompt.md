# jabx.pro.bd — Ultimate Build Prompt v3.0 FINAL
> **Owner:** Jabir Mahmud — jabx_fx  
> **Version:** 3.0 — Weapon-Grade Production Spec  
> **Stack:** Next.js 16.2 · Tailwind · Framer Motion · R3F · React 19.2  
> **Goal:** Top-ranking, high-conversion, technically dominant portfolio — globally

---

# SECTION 0 — EXECUTION RULES (NON-NEGOTIABLE)

### Hard Constraints
- DO NOT skip any section or feature
- DO NOT leave placeholders — content scaffold is in Section 18
- If something cannot be implemented → explain why + provide fallback
- Zero console errors in production build
- Zero broken interactions on mobile or desktop

### Acceptance Criteria

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | ≥ 92 | Lighthouse CI |
| Lighthouse Accessibility | ≥ 92 | Lighthouse CI |
| Lighthouse SEO | ≥ 97 | Lighthouse CI |
| Lighthouse Best Practices | ≥ 95 | Lighthouse CI |
| CLS | < 0.05 | CrUX / PageSpeed |
| LCP | < 2.0s | CrUX / PageSpeed |
| INP | < 200ms | CrUX / PageSpeed |
| TTFB | < 600ms | CrUX / PageSpeed |
| Mobile FPS | ≥ 50 | Chrome DevTools |
| First Load JS | ≤ 250KB | next build output |
| Time to Interactive | < 3.5s on 4G | WebPageTest |

---

# SECTION 1 — TECH STACK (LOCKED)

```
Next.js 16.2         — Framework (App Router, SSG)
React 19.2           — UI layer (View Transitions, Activity)
TypeScript           — DISABLED (JSX only as per original spec)
Tailwind CSS v4      — Utility styling
Framer Motion v11    — Animation engine
React Three Fiber    — 3D layer
@react-three/drei    — R3F helpers
@react-three/postprocessing — Bloom, vignette
Lenis v2             — Smooth scroll
React Icons v5       — Icon set
EmailJS              — Contact form backend (no server needed)
next-sitemap         — Auto sitemap + robots.txt generation
```

### Install Command
```bash
npx create-next-app@latest jabx-portfolio \
  --js --tailwind --app --no-src-dir --no-turbopack
cd jabx-portfolio
npm install framer-motion @react-three/fiber @react-three/drei \
  @react-three/postprocessing three lenis react-icons \
  @emailjs/browser next-sitemap
```

> Note: Next.js 16.2 uses Turbopack by default for `next dev`.
> Use `next dev --turbopack` explicitly or omit flag (it's default now).

### Next.js 16.2 Config
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,         // stable in Next.js 16 — auto memoization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    ppr: false,                // Cache Components OFF for portfolio (not needed)
  },
};

module.exports = nextConfig;
```

### Banned Libraries
- GSAP (Framer Motion covers everything)
- Swiper.js (build carousel natively)
- AOS (Framer Motion replaces)
- Bootstrap / MUI / Chakra (Tailwind only)
- next-seo (App Router metadata API replaces it natively)

---

# SECTION 2 — RENDERING STRATEGY (SEO-CRITICAL)

This is the most important architectural decision for ranking.

| Page / Route | Strategy | Reason |
|---|---|---|
| `/` (portfolio homepage) | **SSG** — Static | Max speed, max SEO |
| `/api/contact` | Route Handler | EmailJS proxy (optional) |
| `sitemap.xml` | Auto via `app/sitemap.js` | Dynamic generation |
| `robots.txt` | Auto via `app/robots.js` | No static file needed |
| `opengraph-image` | Auto via `app/opengraph-image.js` | Dynamic OG image |

**Rule:** All public-facing pages = statically generated. Zero SSR on the portfolio.
This means Googlebot gets full HTML on first byte — no JavaScript required to read your content.

---

# SECTION 3 — FOLDER STRUCTURE (STRICT)

```
/
├── app/
│   ├── layout.js              ← Root layout + global metadata
│   ├── page.js                ← Homepage (SSG)
│   ├── sitemap.js             ← Auto sitemap generation
│   ├── robots.js              ← Auto robots.txt
│   ├── opengraph-image.js     ← Dynamic OG image
│   └── not-found.js           ← Custom 404
├── components/
│   ├── ui/
│   │   ├── LiquidCursor.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── NoiseOverlay.jsx
│   │   ├── GlassCard.jsx
│   │   └── ThemeToggle.jsx
│   ├── sections/
│   │   ├── Hero.jsx           ← 'use client'
│   │   ├── About.jsx          ← 'use client'
│   │   ├── Services.jsx       ← 'use client'
│   │   ├── Portfolio.jsx      ← 'use client'
│   │   └── Contact.jsx        ← 'use client'
│   ├── layout/
│   │   ├── Navbar.jsx         ← 'use client'
│   │   ├── Footer.jsx
│   │   └── PageLoader.jsx     ← 'use client'
│   └── shared/
│       ├── SectionLabel.jsx
│       ├── SectionErrorBoundary.jsx
│       ├── SkeletonCard.jsx
│       └── StructuredData.jsx ← JSON-LD injector
├── three/
│   ├── HeroScene.jsx          ← 'use client'
│   └── ParticleField.jsx      ← 'use client'
├── hooks/
│   ├── useMagnetic.js
│   ├── useDeviceCapability.js
│   ├── useInView.js
│   └── useAnalytics.js        ← GA4 event tracker
├── context/
│   └── ThemeContext.jsx
├── lib/
│   ├── motion.js              ← Animation tokens (centralized)
│   └── lenis.js               ← Scroll config
├── constants/
│   ├── portfolio.js
│   ├── services.js
│   ├── nav.js
│   └── seo.js                 ← All SEO strings in one place
├── public/
│   ├── assets/
│   │   ├── images/            ← WebP only, max 200KB each
│   │   └── icons/
│   ├── og-image.jpg           ← 1200×630px OG image
│   ├── favicon.ico
│   ├── icon.png               ← 512×512 app icon
│   └── apple-icon.png         ← 180×180 Apple touch icon
└── styles/
    └── globals.css            ← CSS variables + reset
```

> **Rule:** All interactive components require `'use client'` directive.
> Server Components = layout.js, page.js, Footer.jsx (static content only).
> Never mix server/client in the same file.

---

# SECTION 4 — DESIGN SYSTEM (COMPLETE)

## Color Tokens
```css
/* styles/globals.css */
:root {
  /* Dark Mode (default) */
  --bg-primary: #050505;
  --bg-secondary: #0D0D0D;
  --bg-card: #111111;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #555555;
  --accent-cyan: #00F5D4;
  --accent-violet: #7B61FF;
  --accent-gradient: linear-gradient(135deg, #00F5D4, #7B61FF);
  --border-subtle: rgba(255,255,255,0.06);
  --border-glow: rgba(0,245,212,0.3);
  --glass-bg: rgba(255,255,255,0.03);
  --glass-border: rgba(255,255,255,0.08);
  --noise-opacity: 0.035;
}

[data-theme="light"] {
  --bg-primary: #F8F8F8;
  --bg-secondary: #FFFFFF;
  --bg-card: #EFEFEF;
  --text-primary: #080808;
  --text-secondary: #444444;
  --text-muted: #888888;
  --accent-cyan: #00C4AA;
  --accent-violet: #6A4FE8;
  --border-subtle: rgba(0,0,0,0.06);
  --glass-bg: rgba(0,0,0,0.03);
  --glass-border: rgba(0,0,0,0.08);
  --noise-opacity: 0.02;
}
```

## Typography Tokens
```css
/* Load in app/layout.js via next/font/google */
--font-display: 'Syne', sans-serif;
--font-body: 'Outfit', sans-serif;

--text-hero:    clamp(3.5rem, 8vw, 7rem);
--text-h1:      clamp(2.5rem, 5vw, 4.5rem);
--text-h2:      clamp(1.8rem, 3.5vw, 3rem);
--text-h3:      clamp(1.2rem, 2vw, 1.8rem);
--text-body:    clamp(0.95rem, 1.5vw, 1.1rem);
--text-caption: 0.8rem;

--weight-black:   900;
--weight-bold:    700;
--weight-medium:  500;
--weight-regular: 400;
```

## Font Loading (Next.js 16 — next/font)
```js
// app/layout.js
import { Syne, Outfit } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});
```
> Using `next/font` zero-shifts fonts (eliminates CLS from font loading).
> `display: 'swap'` ensures text visible while font loads (Lighthouse requirement).

---

# SECTION 5 — ANIMATION TOKEN SYSTEM

```js
// lib/motion.js — Single source of truth. Import everywhere. Never hardcode values.

export const EASING = {
  smooth:  [0.43, 0.13, 0.23, 0.96],
  spring:  { type: 'spring', stiffness: 300, damping: 30 },
  snappy:  [0.77, 0, 0.175, 1],
  gentle:  [0.25, 0.46, 0.45, 0.94],
  bounce:  { type: 'spring', stiffness: 400, damping: 20, mass: 0.8 },
};

export const DURATION = {
  instant:  0.15,
  fast:     0.3,
  normal:   0.5,
  slow:     0.8,
  cinematic:1.2,
};

export const STAGGER = {
  tight:  0.05,
  normal: 0.1,
  loose:  0.18,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * STAGGER.normal, duration: DURATION.slow, ease: EASING.smooth },
  }),
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASING.gentle } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.normal, ease: EASING.snappy } },
};

export const letterReveal = {
  hidden:  { opacity: 0, y: 60, rotateX: -20 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.04, duration: DURATION.slow, ease: EASING.smooth },
  }),
};

export const cardHover = {
  rest:  { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -6, transition: EASING.spring },
};

export const lineReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: (i = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { delay: i * 0.15, duration: 0.9, ease: EASING.snappy },
  }),
};
```

---

# SECTION 6 — SEO SYSTEM (COMPLETE — GLOBAL RANK TARGET)

## SEO Constants File
```js
// constants/seo.js — All SEO strings in one place. Edit here, reflects everywhere.

export const SEO = {
  siteName: 'jabx_fx',
  siteUrl:  'https://jabx.pro.bd',
  author:   'Jabir Mahmud',

  title:       'Jabir Mahmud — Creative Developer | UI/UX · AI Tools · jabx_fx',
  titleTemplate: '%s | jabx_fx',
  description: 'Jabir Mahmud is a creative developer building high-performance React apps, AI-powered tools, and conversion-focused design systems. Available globally.',

  ogImage:  'https://jabx.pro.bd/og-image.jpg',  // 1200×630px
  locale:   'en_US',

  keywords: [
    // Primary — high intent, global
    'freelance React developer',
    'hire frontend developer',
    'UI UX designer for hire',
    'AI tools developer',
    'creative developer portfolio',
    // Secondary — authority
    'design system developer',
    'React Three Fiber developer',
    'Framer Motion developer',
    'Next.js developer',
    // Long tail — high conversion, low competition
    'freelance React developer for startups',
    'AI powered web app developer',
    'high performance landing page developer',
    'interactive portfolio developer',
    // Brand
    'jabx_fx',
    'jabir mahmud developer',
    'jabx pro bd',
  ],

  twitterHandle: '@jabx_fx',
  linkedIn:      'https://linkedin.com/in/jabxfx',
  github:        'https://github.com/jabxfx',
};
```

## Root Layout Metadata (Next.js 16 App Router)
```js
// app/layout.js
import { SEO } from '@/constants/seo';

export const metadata = {
  metadataBase: new URL(SEO.siteUrl),

  title: {
    default:  SEO.title,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords:    SEO.keywords,
  authors:     [{ name: SEO.author, url: SEO.siteUrl }],
  creator:     SEO.author,
  publisher:   SEO.siteName,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title:       SEO.title,
    description: SEO.description,
    url:         SEO.siteUrl,
    siteName:    SEO.siteName,
    locale:      SEO.locale,
    type:        'website',
    images: [{
      url:    SEO.ogImage,
      width:  1200,
      height: 630,
      alt:    'Jabir Mahmud — Creative Developer — jabx_fx',
    }],
  },

  twitter: {
    card:        'summary_large_image',
    title:       SEO.title,
    description: SEO.description,
    creator:     SEO.twitterHandle,
    images:      [SEO.ogImage],
  },

  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':      -1,
    },
  },

  icons: {
    icon:  [
      { url: '/favicon.ico',  sizes: '32x32' },
      { url: '/icon.png',     sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },

  manifest: '/manifest.json',

  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_ID',  // replace after registering
  },
};
```

## Sitemap — Auto Generated
```js
// app/sitemap.js
import { SEO } from '@/constants/seo';

export default function sitemap() {
  return [
    {
      url:             SEO.siteUrl,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        1.0,
    },
  ];
}
```

## Robots.txt — Auto Generated
```js
// app/robots.js
import { SEO } from '@/constants/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:    '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
    host:    SEO.siteUrl,
  };
}
```

## Dynamic OG Image
```js
// app/opengraph-image.js
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt     = 'Jabir Mahmud — Creative Developer — jabx_fx';
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        background: '#050505', width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}>
        <p style={{ color: '#00F5D4', fontSize: 24, margin: 0 }}>jabx_fx</p>
        <h1 style={{ color: '#fff', fontSize: 72, margin: '16px 0', lineHeight: 1.1 }}>
          Build interfaces<br />people don't skip.
        </h1>
        <p style={{ color: '#A0A0A0', fontSize: 28 }}>
          Design · Dev · AI — jabx.pro.bd
        </p>
      </div>
    ),
    size
  );
}
```
> OG image is generated at build time on the edge. Social crawlers (WhatsApp, LinkedIn, Twitter)
> get a real image — no JavaScript required. This alone fixes broken link previews.

## JSON-LD Structured Data
```jsx
// components/shared/StructuredData.jsx
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id":   "https://jabx.pro.bd/#person",
        "name":  "Jabir Mahmud",
        "url":   "https://jabx.pro.bd",
        "image": "https://jabx.pro.bd/assets/images/jabir.webp",
        "jobTitle": "Creative Developer",
        "description": "UI/UX designer, frontend developer, and AI tools builder from Bangladesh. Available globally.",
        "knowsAbout": ["React", "Next.js", "UI/UX Design", "AI Tools", "Three.js", "Framer Motion"],
        "address": { "@type": "PostalAddress", "addressCountry": "BD" },
        "sameAs": [
          "https://github.com/jabxfx",
          "https://linkedin.com/in/jabxfx",
          "https://twitter.com/jabx_fx"
        ]
      },
      {
        "@type": "WebSite",
        "@id":   "https://jabx.pro.bd/#website",
        "url":   "https://jabx.pro.bd",
        "name":  "jabx_fx — Jabir Mahmud",
        "description": "Creative developer portfolio — UI/UX, AI Tools, React development.",
        "publisher": { "@id": "https://jabx.pro.bd/#person" },
        "potentialAction": {
          "@type":       "SearchAction",
          "target":      "https://jabx.pro.bd/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "name":        "jabx_fx",
        "url":         "https://jabx.pro.bd",
        "description": "Freelance creative development — UI/UX design, React development, AI tools.",
        "provider": { "@id": "https://jabx.pro.bd/#person" },
        "areaServed":  "Worldwide",
        "serviceType": ["UI/UX Design", "Frontend Development", "AI Tool Development"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```
> Insert `<StructuredData />` in `app/layout.js` inside `<body>`.
> Google's Rich Results Test must validate this without errors.

## Heading Hierarchy (ENFORCED)
```
page.js (homepage):
  <h1> — ONE ONLY — "Build interfaces people don't skip."  [Hero]
  <h2> — "I don't just build things..." [About]
  <h2> — "Services built for results..." [Services]
  <h2> — "Projects that moved the needle." [Portfolio]
  <h2> — "Let's build something worth shipping." [Contact]
  <h3> — individual service/project titles
```
> Only one H1 per page. H2s mark major sections. H3s mark cards.
> Framer Motion animations must NOT reorder DOM elements.

## Alt Text Rules
```
Every <Image> must have descriptive alt text:
✓ alt="Jabir Mahmud — UI/UX designer and creative developer"
✓ alt="NovaMind AI Dashboard — React and Python project by jabx_fx"
✓ alt="Flux Design System — 200 component Figma design system"
✗ alt="project"
✗ alt="image"
✗ alt=""  (only for decorative images, which should use role="presentation")
```

## Keyword Placement Map
| Section | Target Keywords |
|---|---|
| Page title + meta | Primary brand + role keywords |
| Hero H1 | Natural language — no keyword stuffing |
| About body | "creative developer", "React", "AI tools", "Bangladesh" |
| Services titles | Service category keywords (e.g. "UI/UX Design Systems") |
| Portfolio alt texts | Project name + technologies |
| Footer | Brand name + tagline |
| JSON-LD | All target services + skills |

---

# SECTION 7 — GLOBAL UX LAYER

## Custom Liquid Cursor
```
Component: components/ui/LiquidCursor.jsx  ('use client')
Outer ring: 40px, follows mouse at 0.12 lerp
Inner dot:  6px, snaps instantly
On interactive hover: outer ring → 80px + accent color blend
On click: scale pulse 0.8 → 1.2 → 1.0
Hide: touch devices (pointer: coarse media query)
```

## Magnetic Buttons
```
Hook: hooks/useMagnetic.js
Activation radius: 80px
Max displacement:  20px (X and Y)
Method: transform: translate() — no layout shift
Apply to: all CTAs, nav items, social icons
```

## Noise Grain Overlay
```
Fixed pseudo-element on body
SVG turbulence filter
Opacity: var(--noise-opacity) — 0.035 dark, 0.02 light
CSS @keyframes position shift every 0.15s
Disabled on prefers-reduced-motion
```

## Smooth Scroll
```js
// lib/lenis.js
const lenis = new Lenis({
  duration:       1.4,
  easing:         (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction:      'vertical',
  smooth:         true,
  smoothTouch:    false,
  touchMultiplier: 2,
});
```

## Page Entry Loader
```
Component: components/layout/PageLoader.jsx
Sequence:
  1. Black screen
  2. jabx_fx SVG wordmark path-draws in (0.8s)
  3. Hold (0.3s)
  4. Fade dissolve (0.5s)
  5. Hero elements stagger in (0.4s)
Condition: sessionStorage.getItem('jabx_visited') — only plays once per session
Progress: thin bottom bar fills left→right tracking window.onload
```

## Theme Toggle
```
Persists to localStorage
Transition: background 0.4s, color 0.4s
data-theme attribute on <html>
Context: context/ThemeContext.jsx
```

---

# SECTION 8 — NAVIGATION

```
Logo (jabx_fx wordmark) | [Work] [Services] [About] [Contact] | [Hire Me →]
```

- Default: transparent, no backdrop
- Scroll > 60px: `backdrop-filter: blur(20px)` + border bottom 1px subtle
- Active section: IntersectionObserver highlights current nav item
- Mobile: right-edge drawer, AnimatePresence slide in
- Hamburger → animated X morph
- `role="navigation"` + `aria-label="Main navigation"`

---

# SECTION 9 — HERO SECTION

**ID:** `#hero` | **Goal:** Signal dominance in 4 seconds

## Layout
```
[Eyebrow: "● Available for projects · 2025"]
[H1: "Build interfaces"]
[H1 accent: "people don't skip."]
[Subhead: "I craft design systems, develop production apps,]
[ and build AI tools that convert."]
[CTA row: [View My Work →]  [Let's Talk]]
[Scroll indicator: animated down arrow + "scroll"]
[3D scene — full bleed behind all]
```

## 3D Scene (Desktop — capability: high)
- File: `three/HeroScene.jsx` — `'use client'`
- Type: Particle field — 2,000 points
- Colors: `#00F5D4` (40%) + `#7B61FF` (60%), opacity 0.7
- Mouse parallax: camera pans subtly on mousemove
- Postprocessing: Bloom (intensity 0.4, radius 0.8) + vignette
- Dynamic import: `next/dynamic` with `{ ssr: false }`

## Mobile Fallback (capability: medium/low)
- CSS animated mesh gradient — 4 stop radial
- Pure CSS `@keyframes` — zero JavaScript
- Colors: `#00F5D4` + `#7B61FF` opacity blobs

## Text Animations
- H1 chars → `letterReveal` variant, 0.04s stagger
- Subhead → `fadeUp` with 0.6s delay
- CTA row → `fadeIn` with 0.9s delay
- Eyebrow → `scaleIn` at 0.2s

## CTA Definitions
| Button | Label | Action | Style |
|---|---|---|---|
| Primary | `View My Work →` | Smooth scroll to `#portfolio` | Solid accent bg |
| Secondary | `Let's Talk` | Smooth scroll to `#contact` | Ghost outline |

## Tracking
```js
onClick={() => trackEvent('hero_cta_click', { button: 'view_work' })}
onClick={() => trackEvent('hero_cta_click', { button: 'lets_talk' })}
```

---

# SECTION 10 — ABOUT SECTION

**ID:** `#about` | **Goal:** Trust + identity without losing edge

## Copy (FINAL)

**H2:** "I don't just build things. I build things that work."

**Para 1:** "I'm Jabir — a creative developer who operates at the intersection of design, engineering, and AI. I build interfaces that are fast, intentional, and built to convert."

**Para 2:** "From production React apps to AI-powered tools and pixel-perfect UI systems — I treat every project as a product problem. My edge is the full stack: design thinking + development execution + AI integration."

## Stats Row
| Value | Label |
|---|---|
| 30+ | Projects Shipped |
| 98% | Client Satisfaction |
| 2× | Avg. Conversion Boost |

## Skill Cloud Tags
```
React  Next.js  Three.js  Figma  Framer  Python
TailwindCSS  Node.js  AI/ML Tools  UI Systems
Prompt Engineering  REST APIs  R3F
```

## Interactions
- H2 lines → `lineReveal` clip-path animation on scroll
- Photo → 8deg 3D tilt on hover, perspective 1000px
- Photo decorative corner brackets in SVG (accent color)
- Stats → counter animation from 0 on viewport enter (requestIdleCallback)

---

# SECTION 11 — SERVICES SECTION

**ID:** `#services` | **Goal:** Price-anchor + scope signal

## Header
- Label: "— What I Do"
- H2: "Services built for results, not portfolios."
- Sub: "Every engagement is outcome-focused. Here's how I can move the needle."

## Services Data
```js
// constants/services.js
export const SERVICES = [
  {
    id: 1,
    icon: 'RiPenNibLine',
    title: 'UI/UX Design Systems',
    description: 'From wireframe to polished design system. Figma-first, developer-handoff-ready. Designed for conversion, not aesthetics alone.',
    deliverables: ['Design System', 'Figma File', 'Component Library'],
    price: 'Starting at $299',
    tag: 'Most Popular',
  },
  {
    id: 2,
    icon: 'RiCodeSSlashLine',
    title: 'Frontend Development',
    description: 'React + Next.js + Tailwind. Pixel-perfect implementation with 90+ Lighthouse scores. Animation-rich, performant, production-deployed.',
    deliverables: ['Next.js App', 'Deployed Build', 'Source Code'],
    price: 'Starting at $499',
    tag: null,
  },
  {
    id: 3,
    icon: 'RiBrainLine',
    title: 'AI Tool Development',
    description: 'Custom AI-powered apps — chatbots, content tools, automation dashboards. Built with LLM APIs and wrapped in clean interfaces.',
    deliverables: ['Working AI App', 'API Integration', 'UI Interface'],
    price: 'Starting at $799',
    tag: 'High Demand',
  },
  {
    id: 4,
    icon: 'RiRocketLine',
    title: 'Full Product Build',
    description: 'End-to-end product execution. Design + Dev + AI. From idea to deployed, client-ready product. Best for serious founders.',
    deliverables: ['Full Product', 'Design + Code + Deploy'],
    price: 'Starting at $1,499',
    tag: 'Best Value',
  },
];
```

## Card Behavior
- Glassmorphism: `backdrop-filter: blur(12px)`, `background: var(--glass-bg)`
- Border cursor-glow: JS mousemove → `--mouse-x` + `--mouse-y` CSS vars → radial gradient border
- Hover: scale 1.03 + box-shadow deepens
- Scroll stagger: 0.12s delay per card
- Mobile: reduce blur to `blur(6px)`, snap carousel, dot indicators
- Tracking: `onClick={() => trackEvent('service_card_click', { service: title })}`

---

# SECTION 12 — PORTFOLIO SECTION

**ID:** `#portfolio` | **Goal:** Show proof — real metrics, real impact

## Header
- Label: "— Selected Work"
- H2: "Projects that moved the needle."
- Filter tabs: All · Design · Development · AI Tools

## Filter System
- Framer Motion `layout` prop on grid → auto-animates card reflow
- `AnimatePresence` for card exit/enter
- Active tab: accent underline + color shift
- `role="tablist"` + `role="tab"` + `aria-selected` for accessibility

## Portfolio Data
```js
// constants/portfolio.js
export const PROJECTS = [
  {
    id: 1,
    title: 'NovaMind AI Dashboard',
    category: 'AI Tools',
    description: 'Real-time AI analytics dashboard with LLM integration and live data visualization.',
    techStack: ['React', 'Python', 'OpenAI API', 'Tailwind'],
    image: '/assets/images/novamind.webp',
    imageAlt: 'NovaMind AI Dashboard — React and OpenAI powered analytics by jabx_fx',
    liveLink: '#',
    caseLink: '#',
    metrics: { label: '+68% user retention', highlight: true },
    featured: true,
    size: 'large',
  },
  {
    id: 2,
    title: 'Flux Design System',
    category: 'Design',
    description: 'Enterprise-grade Figma design system with 200+ components and token sets.',
    techStack: ['Figma', 'Token Studio', 'Storybook'],
    image: '/assets/images/flux.webp',
    imageAlt: 'Flux Design System — 200+ component Figma library by jabx_fx',
    liveLink: '#',
    caseLink: '#',
    metrics: { label: '200+ Components', highlight: false },
    featured: false,
    size: 'tall',
  },
  {
    id: 3,
    title: 'Launchpad SaaS Landing',
    category: 'Development',
    description: 'High-conversion SaaS landing page. A/B tested. 40% improvement in demo signups.',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind'],
    image: '/assets/images/launchpad.webp',
    imageAlt: 'Launchpad SaaS Landing Page — +40% demo signup conversion by jabx_fx',
    liveLink: '#',
    caseLink: '#',
    metrics: { label: '+40% demo signups', highlight: true },
    featured: false,
    size: 'normal',
  },
  {
    id: 4,
    title: 'Promptly — AI Writing Tool',
    category: 'AI Tools',
    description: 'Browser-based AI writing assistant with custom prompt chains and export system.',
    techStack: ['React', 'Claude API', 'Node.js'],
    image: '/assets/images/promptly.webp',
    imageAlt: 'Promptly AI Writing Tool — custom prompt chain app by jabx_fx',
    liveLink: '#',
    caseLink: '#',
    metrics: { label: '1,200+ active users', highlight: true },
    featured: false,
    size: 'normal',
  },
  {
    id: 5,
    title: 'Arc Portfolio Framework',
    category: 'Design',
    description: 'Reusable portfolio framework for creative developers. Used by 30+ freelancers.',
    techStack: ['Figma', 'React', 'Tailwind'],
    image: '/assets/images/arc.webp',
    imageAlt: 'Arc Portfolio Framework — used by 30+ developers, designed by jabx_fx',
    liveLink: '#',
    caseLink: '#',
    metrics: { label: '30+ deployments', highlight: false },
    featured: false,
    size: 'normal',
  },
  {
    id: 6,
    title: 'Kova E-commerce UI',
    category: 'Development',
    description: 'Fashion e-commerce UI with editorial grid layout, cart system, and checkout flow.',
    techStack: ['Next.js', 'Tailwind', 'Framer Motion'],
    image: '/assets/images/kova.webp',
    imageAlt: 'Kova E-commerce UI — fashion editorial layout built with Next.js by jabx_fx',
    liveLink: '#',
    caseLink: '#',
    metrics: { label: '+110% session time', highlight: false },
    featured: false,
    size: 'normal',
  },
];
```

## Card Interactions
- Rest: grayscale 0.8, scale 1.0
- Hover: full color + scale 1.04 + 3D tilt 8deg (perspective 1200px)
- Overlay: project title + metrics badge + "View Project →"
- Mobile: tap-to-reveal overlay, second tap opens link
- Tracking: `trackEvent('portfolio_click', { project: title })`

---

# SECTION 13 — CONTACT SECTION

**ID:** `#contact` | **Goal:** Get the inquiry — zero friction

## Copy
- H2: "Let's build something worth shipping."
- Sub: "Have a project in mind? I respond within 24 hours."

## Trust Signals
- ✓ Response within 24 hours
- ✓ Free 30-min discovery call
- ✓ No agency markup — direct with Jabir

## Form Fields
```
Full Name *        — text, required, floating label
Email Address *    — email, required, pattern validation
Project Type       — select: UI/UX · Frontend · AI Tool · Full Build · Other
Budget Range       — select: <$300 · $300–$800 · $800–$2k · $2k+
Message *          — textarea, required, minLength 20, floating label
[honeypot]         — display:none, name="website", must be empty on submit
Submit             — "Send Message →"
```

## Form Behavior
- Floating labels: transform up on focus/hasValue
- Focus: bottom border animates left → right in accent color
- Error: inline red message + 0.3s shake keyframe
- Loading: spinner + "Sending..." text
- Success: form fades → "✓ Message sent! I'll respond within 24h."
- Failure: "Couldn't send — try emailing jaabirmahmud01@gmail.com directly"
- Cooldown: 10s disable after submit (prevents spam double-submit)

## Form Security
```js
// Honeypot anti-spam
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// On submit — reject if honeypot filled
if (formData.website !== '') return; // bot detected, silent reject

// Rate limit — frontend cooldown
const [cooldown, setCooldown] = useState(false);
// After submit: setCooldown(true) → setTimeout 10000 → setCooldown(false)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Message sanitize — strip HTML tags
const sanitize = (str) => str.replace(/<[^>]*>/g, '');
```

## EmailJS Integration
```js
import emailjs from '@emailjs/browser';

emailjs.sendForm(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  formRef.current,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
);
```
> Keys stored in `.env.local` — never committed to Git.

## Direct Contact Block
```
Email:    jaabirmahmud01@gmail.com
Location: Bangladesh — Available Globally
Socials:  GitHub · LinkedIn · Twitter/X · Behance
```

## Testimonials (2 minimum — Social Proof)
```js
export const TESTIMONIALS = [
  {
    quote: "Jabir delivered a design system that our entire team adopted in week one. Precision work.",
    author: "Client Name",
    role:   "Founder, SaaS Product",
    avatar: "/assets/images/testimonial-1.webp",
  },
  {
    quote: "The AI tool Jabir built reduced our content workflow time by 60%. Highly recommend.",
    author: "Client Name",
    role:   "Marketing Lead",
    avatar: "/assets/images/testimonial-2.webp",
  },
];
```

---

# SECTION 14 — ANALYTICS & TRACKING

## Setup
```bash
npm install @next/third-parties
```

```js
// app/layout.js
import { GoogleAnalytics } from '@next/third-parties/google';

// In <body>:
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```
> `@next/third-parties` is the official Next.js-optimized GA4 loader.
> It defers loading to not impact LCP — critical for Lighthouse score.

## Analytics Hook
```js
// hooks/useAnalytics.js
export function useAnalytics() {
  const trackEvent = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
  };
  return { trackEvent };
}
```

## Required Events (ALL CTAs must fire these)
| Event Name | Trigger | Params |
|---|---|---|
| `hero_cta_click` | Hero CTA buttons | `{ button: 'view_work' \| 'lets_talk' }` |
| `service_card_click` | Service card click | `{ service: title }` |
| `portfolio_click` | Portfolio card click | `{ project: title, category }` |
| `contact_form_submit` | Form submit (success) | `{ method: 'emailjs' }` |
| `contact_form_error` | Form submit (fail) | `{ error: message }` |
| `scroll_depth` | 25%, 50%, 75%, 100% | `{ depth: percentage }` |
| `theme_toggle` | Theme switch | `{ theme: 'dark' \| 'light' }` |

## Scroll Depth Tracking
```js
// Track scroll depth milestones
const milestones = [25, 50, 75, 100];
const tracked = new Set();

const handleScroll = () => {
  const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  milestones.forEach(m => {
    if (pct >= m && !tracked.has(m)) {
      tracked.add(m);
      trackEvent('scroll_depth', { depth: m });
    }
  });
};
```

## Optional: Microsoft Clarity
```html
<!-- Add in app/layout.js for session recording + heatmaps -->
<!-- Replace GA_CLARITY_ID with actual ID from clarity.microsoft.com -->
```

---

# SECTION 15 — PERFORMANCE SYSTEM

## Device Capability Detection
```js
// hooks/useDeviceCapability.js
export function useDeviceCapability() {
  const [capability, setCapability] = useState('high');

  useEffect(() => {
    const isMobile       = window.innerWidth < 768;
    const isSlowCPU      = navigator.hardwareConcurrency <= 4;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasLowMemory   = navigator.deviceMemory && navigator.deviceMemory <= 4;

    if (prefersReduced || (isMobile && (isSlowCPU || hasLowMemory))) {
      setCapability('low');
    } else if (isMobile) {
      setCapability('medium');
    } else {
      setCapability('high');
    }
  }, []);

  return capability;
}
```

## Render Rules by Capability
| Feature | High | Medium | Low |
|---|---|---|---|
| Particle count | 2,000 | 600 | 0 (CSS fallback) |
| Bloom postprocessing | ON | OFF | OFF |
| Lenis smooth scroll | ON | ON | OFF |
| Noise grain | ON | ON | OFF |
| 3D tilt on cards | ON | ON | OFF |
| Marquee | ON | ON | OFF |
| CSS mesh gradient | OFF | OFF | ON |

## Image Optimization
```jsx
import Image from 'next/image';

// All images use next/image — never raw <img>
<Image
  src="/assets/images/project.webp"
  alt="descriptive alt text here"
  width={800}
  height={600}
  loading="lazy"           // below fold
  priority={false}
  placeholder="blur"       // base64 blur-up placeholder
  blurDataURL="data:..."   // generate with: npx plaiceholder
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Hero image — above fold: priority={true}, loading="eager"
```

## 3D Asset Loading
```jsx
// Dynamic import for R3F — prevents SSR issues
const HeroScene = dynamic(() => import('@/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-fallback" />, // CSS gradient fallback
});
```

## Animation Budget
- Max 1 heavy animation per viewport simultaneously
- `requestIdleCallback` for: noise grain init, non-critical scroll effects
- `will-change: transform` only on actively animating elements — remove after
- FPS floor: 45fps — disable particles if FPS drops below threshold

## Perceived Performance Tricks
- Skeleton cards visible in < 100ms (render immediately, fill on load)
- Hero text animates before 3D scene fully loads (text has no dependency on R3F)
- Non-critical sections animate in 300–500ms after LCP completes
- Above-fold resources preloaded: fonts (next/font auto), hero image (priority)

---

# SECTION 16 — ACCESSIBILITY SPEC

- Every interactive element: `outline: 2px solid var(--accent-cyan)` on focus-visible
- Skip-to-content link: first DOM element, visually hidden, shows on focus
- ARIA: `role="navigation"`, `role="main"`, `role="contentinfo"` (footer)
- Portfolio filters: `role="tablist"` + `role="tab"` + `aria-selected`
- Mobile nav drawer: `aria-modal="true"` + focus trap on open
- All icon-only buttons: `aria-label` required
- Form: `<label htmlFor>` linked to every `<input id>`
- Color contrast: ≥ 4.5:1 body text, ≥ 3:1 large text — verify with axe DevTools
- `prefers-reduced-motion` respected for all non-essential animations
- `prefers-color-scheme` respected as default before user overrides

---

# SECTION 17 — FORM SECURITY

```js
// Complete security checklist on contact form submit:

const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Honeypot check
  if (formData.honeypot !== '') return;

  // 2. Cooldown check
  if (cooldown) return;

  // 3. Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setErrors({ email: 'Please enter a valid email address.' });
    return;
  }

  // 4. Message minimum length
  if (formData.message.trim().length < 20) {
    setErrors({ message: 'Please write at least 20 characters.' });
    return;
  }

  // 5. Sanitize
  const clean = {
    name:    formData.name.replace(/<[^>]*>/g, '').trim(),
    email:   formData.email.trim().toLowerCase(),
    message: formData.message.replace(/<[^>]*>/g, '').trim(),
  };

  // 6. Submit
  setLoading(true);
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, clean, PUBLIC_KEY);
    setSuccess(true);
    trackEvent('contact_form_submit', { method: 'emailjs' });
    setCooldown(true);
    setTimeout(() => setCooldown(false), 10000);
  } catch (err) {
    setError(true);
    trackEvent('contact_form_error', { error: err.message });
  } finally {
    setLoading(false);
  }
};
```

---

# SECTION 18 — DEPLOYMENT & CI/CD

## Platform: Vercel (required)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Environment Variables (.env.local — never commit)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

## Vercel Config (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options",    "value": "nosniff" },
        { "key": "X-Frame-Options",           "value": "DENY" },
        { "key": "X-XSS-Protection",          "value": "1; mode=block" },
        { "key": "Referrer-Policy",           "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",        "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Lighthouse CI Gate
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: 'https://jabx.pro.bd'
          budgetPath: './budget.json'
          uploadArtifacts: true

# budget.json
[
  {
    "path": "/*",
    "assertions": {
      "categories:performance":    ["error", { "minScore": 0.85 }],
      "categories:accessibility":  ["error", { "minScore": 0.90 }],
      "categories:seo":            ["error", { "minScore": 0.95 }],
      "categories:best-practices": ["error", { "minScore": 0.90 }]
    }
  }
]
```
> Build fails automatically if any score drops below threshold. No manual checking.

## Pre-Deploy Checklist
```
□ next build passes with zero warnings
□ Bundle analyzer run: npx @next/bundle-analyzer
□ All .env variables set in Vercel dashboard
□ Google Search Console: domain verified + sitemap submitted
□ Google Analytics: test events firing in GA4 DebugView
□ OG image: test at opengraph.xyz
□ Structured data: validate at search.google.com/test/rich-results
□ Lighthouse CI: all scores pass gate
□ Form: test submit + verify email received
□ 404 page: test /nonexistent-route
□ Mobile: test on real device (not just Chrome DevTools)
□ Accessibility: run axe DevTools, fix all critical issues
```

---

# SECTION 19 — PSYCHOLOGICAL CONVERSION TRIGGERS

## Scarcity (Hero eyebrow)
```
"● Available for select projects · 2025"
```
> Green pulse dot. Never "HIRE ME NOW." Implies demand without pressure.

## Authority (Above fold — stat bar below Hero)
```
30+ Projects  |  98% Satisfaction  |  2× Avg. Conversion  |  5★ on Fiverr
```

## Social Proof (Contact section)
- 2 testimonials minimum — real quotes, real roles
- If no testimonials yet: use project metrics as social proof instead

## Reciprocity (Services section footer note)
```
"Not sure what you need? → Free 30-min audit. No pitch, no strings."
[Book Free Call →]
```

## Commitment (CTA micro-copy)
```
Below primary CTA: "No contracts. No retainers. Just results."
```

---

# SECTION 20 — ASSET PIPELINE

## Image Rules
- Format: WebP primary, AVIF for supporting browsers (Next.js handles this automatically)
- Max size: 200KB per image (run `npx imagemin` before adding)
- Aspect ratios: define explicitly to prevent CLS
- `next/image` used for ALL images — zero raw `<img>` tags

## 3D Asset Rules
- GLTF models: Draco-compress with `npx gltfjsx`
- Max model size: 500KB compressed
- Load via `useGLTF` from `@react-three/drei` with Suspense fallback

## Font Rules
- Load ONLY via `next/font/google`  — zero `@import` in CSS
- Subset: `['latin']` only (reduces size ~70%)
- Weights: only what's used (no `weight: '100 900'` variable fonts unless needed)

## SVG Rules
- Icons: React Icons only (tree-shakable)
- Decorative SVGs: inline in JSX (no external fetch)
- Complex SVGs: optimize with SVGOMG before adding

---

# SECTION 21 — ERROR HANDLING

| Scenario | Handling |
|---|---|
| 3D scene load fails | CSS mesh gradient fallback, silent |
| Image load fails | next/image built-in skeleton, no broken icon |
| Form submit fails | Inline error + direct email fallback shown |
| Route 404 | `app/not-found.js` — "Lost in the void. [Go home →]" |
| JS error in section | `<SectionErrorBoundary>` — section silent-fails, page intact |
| Network offline | Static page still renders (SSG — no network needed after load) |

---

# SECTION 22 — CODE QUALITY RULES

- Max 200 lines per file — split if exceeded
- Component names: PascalCase
- Hook names: camelCase prefixed with `use`
- Constants: UPPER_SNAKE_CASE for values, camelCase for objects
- No magic numbers — all values from token files
- No `console.log` in production (use `// dev:` comment prefix)
- Props destructured at function signature
- No prop drilling > 2 levels — use context or composition
- Every section wrapped in `<SectionErrorBoundary>`
- `'use client'` only where strictly required — keep server components where possible
- React Compiler is ON — do NOT add manual `useMemo`/`useCallback` unnecessarily

---

# SECTION 23 — BRAND VOICE

## Tone Rules
- Direct, not cold
- Confident, not arrogant
- Outcome language always ("what it does for you")
- Technical depth without jargon wall

## Banned Phrases
- "Passionate developer" ❌
- "I love creating..." ❌
- "Results-driven professional" ❌
- "Detail-oriented" ❌

## Required Phrases
- "I build things that work." ✓
- "Shipped 30+ projects. Zero templates." ✓
- "Design is a conversion tool." ✓
- "Fast, intentional, built to last." ✓

## CTA Copy Rules
- Action-first: "View My Work →" not "Click Here"
- Motion word: "→" suffix on primary CTAs
- Urgency without pressure: "Available for select projects"

---

# SECTION 24 — FINAL PRE-LAUNCH CHECKLIST

```
SEO
□ sitemap.xml accessible at /sitemap.xml
□ robots.txt accessible at /robots.txt
□ OG image renders at /opengraph-image
□ JSON-LD validates in Rich Results Test
□ Google Search Console: sitemap submitted
□ All images have descriptive alt text
□ One H1 per page — verified

Performance
□ Lighthouse ≥ 92 (Performance, Accessibility)
□ Lighthouse SEO ≥ 97
□ No CLS > 0.05
□ LCP < 2.0s
□ Bundle < 250KB first load

Analytics
□ GA4 property created, ID in .env
□ All 7 events firing in DebugView
□ Scroll depth tracking active

Security
□ .env.local NOT committed
□ Honeypot field present in contact form
□ Security headers live (X-Frame-Options, etc.)
□ EmailJS keys restricted to jabx.pro.bd domain

Functionality
□ Contact form: submit → email received
□ 3D fallback renders on mobile
□ Theme toggle persists on refresh
□ Page loader only plays once per session
□ All CTAs scroll to correct sections
□ Portfolio filter animates correctly
□ Nav highlights active section

Accessibility
□ axe DevTools: zero critical errors
□ Keyboard navigation: full site navigable
□ Screen reader: tested with NVDA or VoiceOver
□ Focus rings visible on all interactive elements
```

---

# SECTION 25 — FINAL DIRECTIVE

This is Jabir Mahmud's permanent digital presence.

Every technical decision serves one of three questions:
1. Does this build **trust**?
2. Does this signal **skill**?
3. Does this reduce **friction** to contact?

If the answer is no to any — cut it, simplify it, replace it.

The bar: a potential client should see this site and think:
*"I need to work with whoever built this."*

Not because of effects.

Because of **precision that can't be faked.**

---

*jabx_fx v3.0 FINAL — System-driven. SEO-enforced. Conversion-focused. Globally ranked.*
*Next.js 16.2 · React 19.2 · Turbopack · React Compiler · App Router SSG*