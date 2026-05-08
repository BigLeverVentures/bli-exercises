# Hosting & Embedding — Big Lever Institute Exercises

How exercises are hosted and how they render inside the Circle community.

> **Governance:** this doc is the operational playbook. For the architectural contract (what exercises are, why they're structured this way, what must stay locked) see [BLI-ADR-001](./BLI-ADR-001_Exercise_Deliverable_Architecture.md). Structural changes that alter the contract between hosting and architecture require an ADR amendment.

## Repository

- **GitHub:** [`BigLeverVentures/bli-exercises`](https://github.com/BigLeverVentures/bli-exercises) (public)
- **Hosted at:** `https://exercises.bigleverinstitute.org/`
- **Served by:** GitHub Pages with a custom domain

Every exercise HTML file in the repo root is automatically published at `https://exercises.bigleverinstitute.org/<filename>.html` within about a minute of pushing to `main`.

The repo is the **single source of truth** for exercise content. Any draft or scratch copy that lives in a Claude Cowork workspace or elsewhere is not canonical and must not be edited after publishing — delete it or clearly mark it `-DRAFT` once the repo version is live. Two copies diverge silently; one copy cannot.

## File template per exercise

Every exercise ships as **two paired files** at the repo root:

1. `exNN-<slug>.html` — the standalone interactive exercise page
2. `exNN-<slug>.oembed.json` — an oEmbed response that tells embedding consumers (like Circle) how to render the page as a rich iframe

### Required HTML `<head>` tags

```html
<!-- Canonical URL (authoritative source for this page) -->
<link rel="canonical" href="https://exercises.bigleverinstitute.org/exNN-<slug>.html">

<!-- Open Graph (for link previews in any consumer) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Exercise NN — <Title>">
<meta property="og:description" content="<short description>">
<meta property="og:url" content="https://exercises.bigleverinstitute.org/exNN-<slug>.html">
<meta property="og:site_name" content="Big Lever Institute">

<!-- Twitter Card (fallback preview) -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Exercise NN — <Title>">
<meta name="twitter:description" content="<short description>">

<!-- CRITICAL: oEmbed discovery pointer -->
<link rel="alternate"
      type="application/json+oembed"
      href="https://exercises.bigleverinstitute.org/exNN-<slug>.oembed.json"
      title="Exercise NN — <Title>">
```

### oEmbed JSON template

```json
{
  "version": "1.0",
  "type": "rich",
  "provider_name": "Big Lever Institute",
  "provider_url": "https://exercises.bigleverinstitute.org/",
  "title": "Exercise NN — <Title>",
  "author_name": "Big Lever Institute",
  "author_url": "https://exercises.bigleverinstitute.org/",
  "width": 1080,
  "height": <filled in by npm run measure>,
  "html": "<iframe src=\"https://exercises.bigleverinstitute.org/exNN-<slug>.html\" width=\"100%\" height=\"<same height>\" frameborder=\"0\" allow=\"clipboard-write\" style=\"border:none;display:block;max-width:100%\" title=\"Exercise NN — <Title>\" loading=\"lazy\"></iframe>"
}
```

**Every URL in both files MUST use `exercises.bigleverinstitute.org` — never `bigleverventures.github.io`.** Iframely verifies the provider URL matches our claimed domain before approving rich embeds.

## Height measurement — automated

Manual height guessing is unreliable (we initially set Exercise 01 to 5200px; the real rendered height at 720px viewport is 7474px — a 30% clip). Every exercise's `height` is measured by a headless browser and written into its companion JSON by:

```
npm run measure
```

This script (`scripts/measure.mjs`) walks every `exNN-*.html` at the repo root, launches Chromium at a 720px-wide viewport (narrower than our content's 760px `max-width`, so it's a conservative upper bound), waits for fonts and network idle, reads `document.documentElement.scrollHeight`, adds a 40px buffer, and patches both the top-level `height` field and the iframe's `height="..."` attribute inside the JSON's `html` string.

Run `npm run measure` any time you edit exercise copy, before committing. The diff on the `.oembed.json` files shows exactly which heights changed.

First-time setup on a new clone:

```
npm install
npx playwright install chromium
```

## Post-edit cache invalidation

Three cache layers sit between a commit and what learners see. When you push a correction, walk this checklist:

1. **GitHub Pages** — serves with `Cache-Control: max-age=600`. Self-heals within 10 minutes. Non-issue for anything but time-critical fixes.
2. **Iframely** — caches our metadata indefinitely until you tell them otherwise.
   - Go to the Iframely dashboard → **Cache refresh** (left nav)
   - Paste the exercise URL and submit
   - Re-check via the Debug page; the "Last fetched" timestamp should reset
3. **Circle** — caches the embed rendering per-URL. Two options:
   - **Minor fixes (typos, small copy edits):** leave the existing embed in place; Circle will pick up the refreshed Iframely response within hours.
   - **Material corrections (wrong instructions, broken prompts):** delete the embed in Circle and re-add it with a cache-busting query string, e.g. `https://exercises.bigleverinstitute.org/ex01-resume-tailorer.html?v=2`. Different URL → fresh fetch, no cached stale response.

## Posting a new exercise

1. Copy Exercise 01 as a template: `ex01-resume-tailorer.html` and `ex01-resume-tailorer.oembed.json`
2. Rename to `exNN-<slug>.html` and `exNN-<slug>.oembed.json`
3. Update the HTML title, canonical URL, Open Graph tags, Twitter Card tags, and oEmbed discovery link
4. Update the JSON's `title`, `html` iframe `src` and `title` attribute — leave `height` as a placeholder
5. Run `npm run measure` — the script fills in the correct height in both places
6. Commit and push to `main`
7. Wait ~1 minute for GitHub Pages to publish
8. Paste the new URL into Circle's `/embed` command — it renders as a full-height interactive iframe

## Verifying before publishing

- **DNS resolves:** `dig +short exercises.bigleverinstitute.org` returns `bigleverventures.github.io.` plus four GitHub Pages IPs (185.199.108-111.153)
- **HTTPS serves:** `curl -sI https://exercises.bigleverinstitute.org/exNN-<slug>.html` returns `200 OK`
- **oEmbed is discoverable and parsed:** visit <https://iframely.com/embed-code.html>, paste the URL, check the "oEmbed" tab — the JSON fields should appear with a populated `html` field
- **Circle renders the iframe:** paste the URL into Circle's `/embed` command in a test post

## Infrastructure notes

- **DNS:** GoDaddy. Record: `CNAME exercises → bigleverventures.github.io`, TTL 1 hour.
- **Repo `CNAME` file:** contains one line, `exercises.bigleverinstitute.org`. Required for GitHub Pages custom domain.
- **HTTPS:** enforced via GitHub Pages settings. Certificate auto-renewed.
- **Sister subdomain:** `programs.bigleverinstitute.org` is the Circle community (cohort courses). Exercises are the self-paced counterpart.
