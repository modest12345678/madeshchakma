# Madesh Chakma — Personal Portfolio

A static one-page portfolio for **Madesh Chakma** — agricultural engineer, founder and COO of
[Crops Doctor](https://cropsdoctor.com), building AI, computer-vision and geospatial tools for
precision agriculture.

No build step, no dependencies, no framework: plain HTML, one CSS file, one small vanilla
JavaScript file.

---

## Running it locally

Any static server works — open the folder over `http://`, not `file://`:

```bash
# from this directory
python -m http.server 8000
```

Then open <http://localhost:8000>. (`npx serve`, VS Code Live Server, `php -S localhost:8000` …
are all fine too.)

---

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole site. There is no CMS and no data file — edit the markup directly. |
| `assets/css/style.css` | Design tokens, layout, sections, responsive rules, print styles. |
| `assets/js/script.js` | Progressive enhancement: mobile menu, scroll state, active nav, work filter, reveal animation. |
| `assets/images/` | Portrait, project art, press art, favicon. |
| `CV_Complete.docx` | The file the two "Résumé / Download résumé" buttons point at. |
| `.nojekyll` | Stops GitHub Pages running the folder through Jekyll. |

---

## Page structure

Each section is a `<section class="section" id="…">` inside `<main>`, and the sticky header links
to those ids.

| Section | id | What's in it |
|---|---|---|
| Hero | `top` | eyebrow, headline, two CTAs, LinkedIn / Email / CropsDoctorAI links, portrait + "Currently" card |
| About | `about` | two intro paragraphs, a `dl.fact-list`, and the four `.capability-card` tiles |
| Selected work | `work` | `.filter-bar` + `.work-grid` — one featured `.work-card--featured` and four standard cards |
| Experience & research | `experience` | `.timeline` ordered list |
| Credentials | `credentials` | `.cert-grid` (4 certifications) then `.press-grid` (4 press mentions) |
| Contact | `contact` | dark panel: heading, CTA buttons, `.contact-list` definition list |
| Footer | — | copyright line (`[data-year]`) and footer nav |

`<head>` also carries the SEO block: title, description, Open Graph / Twitter tags, and a
JSON-LD `Person` schema.

---

## Design tokens

Everything visual is driven by custom properties at the top of `assets/css/style.css` — change a
value there rather than hunting for hard-coded colours:

- **Surfaces:** `--bg`, `--bg-soft`, `--dark-bg` (the dark contact block)
- **Text:** `--ink`, `--ink-soft`, `--muted`, `--dark-text`, `--dark-muted`
- **Brand:** `--brand` / `--brand-dark` (deep green), `--brand-soft`, `--dark-accent`
- **Type:** `--display` (Space Grotesk) and `--mono` (DM Mono), loaded from Google Fonts
- **Rhythm:** `--container`, `--gutter`, `--section-y`, `--header-h`
- **Shape:** `--radius`, `--radius-sm`, `--radius-pill`, `--shadow-sm`, `--shadow-lg`

Breakpoints: **1080px** (header collapses to the mobile menu, hero/about/contact go single
column, the featured work card stacks, capability tiles go 2×2) and **720px** (all card grids
become one column).

---

## Three conventions the JavaScript relies on

`assets/js/script.js` is written to survive missing markup — every lookup is guarded — but these
pairings do have to stay in sync:

1. **Nav link → section id.** A header link only highlights if its `href="#…"` matches a
   `<section id="…">` inside `<main>`. Adding a section means adding both.
2. **Filter button → card category.** Each `data-filter="…"` value must equal the
   `data-category="…"` on the cards it should show. Current values: `all`, `agri`, `web`.
3. **Reveal targets.** The scroll-reveal list is the selector at the top of the reveal block in
   `script.js` (`.section-head`, `.capability-card`, `.work-card`, `.timeline-item`,
   `.cert-item`, `.press-item`). New card types need adding there to animate — but nothing breaks
   if they are not, and the effect is skipped entirely for
   `prefers-reduced-motion: reduce` or browsers without `IntersectionObserver`.

## Accessibility notes

Already handled: a skip link, `:focus-visible` rings (including inside the dark section), a
hamburger with `aria-expanded` / `aria-controls`, `aria-pressed` on the filter buttons,
`aria-current` on the active nav link, `aria-hidden` on decorative SVG, landmark elements, a
visible `Menu` label rather than an icon alone, and a full `@media print` stylesheet. Body copy is
17px with contrast-checked muted greys, and images below the fold are `loading="lazy"`.

---

## Logo credits

The logomarks shown in the Credentials section belong to their respective owners and are
displayed for identification / nominative use only:

| Card | File | Source |
|---|---|---|
| Certifications | `assets/images/logo-nasa.svg` | Wikimedia Commons (public-domain U.S. government work) |
| | `assets/images/logo-fao.svg` | Wikimedia Commons |
| | `assets/images/logo-hstu.png` | hstu.ac.bd (`img/hstu_correct_logo.png`) |
| | `assets/images/logo-nbict.png` | nbict.org site icon |
| Press | `assets/images/logo-tbs.svg` | tbsnews.net site theme |
| | `assets/images/logo-pratidin.png` | bd-pratidin.com (via Wayback Machine; site is Cloudflare-gated) |
| | `assets/images/logo-bvnews24.png` | bvnews24.com social/masthead asset |
| | `assets/images/logo-nayadiganta.png` | dailynayadiganta.com (`assets/img/logo.png`) |
| Projects | `assets/images/project-cropsdoctor.png` | cropsdoctor.com PWA icon |
| | `assets/images/project-substorebd.png` | substorebd.com site logo |
| | `assets/images/project-alomoy.png` | alomoychakma.com site icon |

Trademarks belong to their owners. Swap any logo for an on-brand asset if a publisher requests it.

---

## TODO before this goes live

1. **Set the real URLs in `<head>`.** `og:image` and `og:url` are relative or missing — Open
   Graph needs absolute URLs. Also add a `<link rel="canonical">` once the domain is known.
2. **Add the press article URLs.** Only the Bangladesh Pratidin card links to the actual article;
   the other three (`TBS Graduates`, `BVNews24`, `Daily Nayadiganta`) currently link to the
   LinkedIn profile because the published URLs were not available. Swap each `href` as the link
   is collected — nothing else needs to change.
3. **(Optional) Upgrade the project cards to product screenshots.** The work cards now show the real
   logos (Crops Doctor, SubStoreBD, Alomoy Chakma - see "Logo credits" below). For a richer look you can
   swap the logo bands for real product screenshots: Crops Doctor screenshots exist in that project repo
   (`client/public/`: `disease-detector.png`, `fertilizer-calculator.png`, `soil-satellite.png`);
   SubStoreBD and alomoychakma.com need fresh captures. If you add screenshots, drop the logo-band
   styling or crop to `16 / 10` (featured `16 / 9`) with `object-fit: cover`.
4. **Swap `CV_Complete.docx` for a PDF** if you want a résumé that opens in the browser, then
   update all three links (header `Résumé` button, hero `Download résumé`, footer `Résumé`).
5. **Delete the unused template leftovers** (~4 MB). Nothing references these any more:

   ```
   assets/images/avatar-1.png … avatar-4.png
   assets/images/blog-1.jpg … blog-6.jpg
   assets/images/project-1.jpg … project-9.png      (photo placeholders)
   assets/images/logo-1-color.png … logo-6-color.png
   assets/images/icon-agri.svg, icon-app.svg, icon-design.svg,
   assets/images/icon-dev.svg, icon-photo.svg, icon-quote.svg
   assets/images/logo.svg, my-avatar.svg
   website-demo-image/
   index.txt
   ```

   ```powershell
   Remove-Item assets/images/avatar-[1-4].png, assets/images/blog-[1-6].jpg, `
     assets/images/project-[1-9].jpg, assets/images/project-[1-9].png, `
     assets/images/logo-[1-6]-color.png, assets/images/icon-*.svg, `
     assets/images/logo.svg, assets/images/my-avatar.svg
   Remove-Item -Recurse website-demo-image
   Remove-Item index.txt
   Remove-Item assets/images/press-*.svg, assets/images/project-cd-*.svg, assets/images/project-substorebd.svg, assets/images/project-alomoychakma.svg, assets/images/my-avatar.png
   ```

   Keep `logo.ico` (favicon), `avatar-photo.png` (the "Currently" card avatar),
   `madesh-portrait.png`, the `logo-*` issuer/outlet logos, and the `project-*` logos (Crops Doctor, SubStoreBD, Alomoy).
   Now unused after the swaps (safe to delete): `my-avatar.png` (replaced by `avatar-photo.png`),
   `my-avatar.svg`, and the authored `press-*.svg` placeholders (replaced by real press logos).
   `my picture.png` in the repo root is the untouched original of
   `assets/images/madesh-portrait.png` — keep or delete as you prefer.

---

## Deploying

The site is live on **Vercel**, which serves the repo root as-is: no build command, no output
directory, no framework preset.

| Remote | Repository | Purpose |
|---|---|---|
| `origin` | [modest12345678/madeshchakma](https://github.com/modest12345678/madeshchakma) | This site — pushes here trigger a Vercel deploy |
| `upstream` | [codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) | Original template, kept for reference only |

`vercel.json` adds the production headers: HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, plus long-lived caching for `assets/images/` and
short-lived caching for `assets/css/` and `assets/js/`.

To ship a change:

```bash
git add -A
git commit -m "Describe the change"
git push
```

Daily deploy previews come from any non-production branch; `master` is the production branch.

`.nojekyll` is included so GitHub Pages also works if you ever switch — for Pages, set
Settings → Pages → deploy from branch `master`, folder `/`. Netlify and Cloudflare Pages work too
(root directory, no build command).

### Updating the production URL

`https://madeshchakma.vercel.app` appears as an absolute URL in three places. If you attach a
custom domain, or Vercel assigns a different project name, replace it in:

- `index.html` — `og:url`, `og:image`, `og:image:alt`, `twitter:image`, `<link rel="canonical">`,
  and the JSON-LD `Person.url`
- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — `<loc>`

---

## Credits

Originally built on the [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)
template by **[codewithsadee](https://github.com/codewithsadee)**, used under the MIT License.
The markup and stylesheet have since been rewritten from scratch; the original license is
retained verbatim in [`LICENSE`](./LICENSE).

## License

MIT — see [`LICENSE`](./LICENSE).