# Praveen Rajkumar D — Portfolio

A mobile-first portfolio built with React, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger and Lenis. Editable profile and skill content is in `src/data/site.js`, the experience-years constant is in `src/data/config.js`, and project content is in `src/data/projects.js`.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Vite writes the optimized site to `dist/`.

## Edit the content

- Change `EXPERIENCE_YEARS` in `src/data/config.js` to update the experience statement and counter.
- Edit the profile, roles, skills, marquee words and service cards in `src/data/site.js`.
- Add, remove or update projects in `src/data/projects.js`. Each project has `title`, `category`, `description`, `tech`, `highlights`, `cover` and `screenshots` fields. Set `previewMode` to `desktop` for a browser frame or `phone` only when the source image is a plain app screenshot. The default screenshot frame preserves the complete uploaded image.
- The web skills list is an editable starting point. Keep only the skills that reflect your experience.

## Add project screenshots

Put each image in `public/images/projects/<project-slug>/` and use the matching paths in `src/data/projects.js`:

```text
public/images/projects/cliqbuy/1.webp
public/images/projects/cliqbuy/2.webp
public/images/projects/cliqbuy/3.webp
```

Use portrait screenshots around 1080 × 2340 pixels for app projects and landscape screenshots for desktop websites. WebP is recommended, ideally under 300 KB each. Images load lazily, preserve their full aspect ratio and reserve preview space to avoid layout shifts. Missing or failed screenshots show a branded placeholder. See `public/images/projects/README.txt`.

The supplied Android, Tickclick, desktop website and responsive website screenshots are already in their project folders.

The “Let’s talk,” “Contact me” and “Start a project” buttons open an email draft to the address in `src/data/site.js`. Social links are available in the hero and footer.

## Deploy

### Vercel

Import the project. Set the build command to `npm run build` and the output directory to `dist`.

### Netlify

Import the project. Set the build command to `npm run build` and the publish directory to `dist`. `public/_redirects` provides the SPA fallback for the custom not-found page.

## Before launch

- Replace `[PLACEHOLDER: ...]` website technology labels with your confirmed stack.
- Replace `[PLACEHOLDER: your-domain]` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
- Add a 1200 × 630 `public/og-image.png` for social previews.
- Confirm the web skills list.
