# Hosting & Embedding — Big Lever Institute Exercises

How exercises are hosted and how they render inside the Circle community.

## Repository

- **GitHub:** [`BigLeverVentures/bli-exercises`](https://github.com/BigLeverVentures/bli-exercises) (public)
- **Hosted at:** `https://exercises.bigleverinstitute.org/`
- **Served by:** GitHub Pages with a custom domain

Every exercise HTML file in the repo root is automatically published at `https://exercises.bigleverinstitute.org/<filename>.html` within about a minute of pushing to `main`.

## File template per exercise

Every exercise ships as **two paired files** at the repo root:

1. `exNN-<slug>.html` — the standalone interactive exercise page
2. `exNN-<slug>.oembed.json` — an oEmbed response that tells embedding consumers (like Circle) how to render the page as a rich iframe

### Required HTML `<head>` tags

```html
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
  "height": <measured pixel height of the exercise>,
  "html": "<iframe src=\"https://exercises.bigleverinstitute.org/exNN-<slug>.html\" width=\"100%\" height=\"<same height>\" frameborder=\"0\" allow=\"clipboard-write\" style=\"border:none;display:block;max-width:100%\" title=\"Exercise NN — <Title>\" loading=\"lazy\"></iframe>"
}
```

**Important:** Every URL in both files (og:url, oEmbed discovery link, provider_url, author_url, iframe src) MUST use `exercises.bigleverinstitute.org` — never `bigleverventures.github.io`. Iframely verifies the provider URL matches our claimed domain.

## Why this pipeline exists

Circle's Professional tier has **no custom HTML block**. Pasting raw iframe HTML renders as literal code, not as an embed. The only way to get inline interactive embeds in Circle is URL-based unfurling, which Circle delegates to a service called **Iframely**.

Iframely only returns rich iframe HTML to consumers (Circle) for **publisher-approved domains**. For unclaimed domains, Iframely returns metadata-only "link cards" — which Circle renders as a plain URL.

We got `bigleverinstitute.org` approved by Iframely as a publisher on **2026-04-23**. As a result, every page at `exercises.bigleverinstitute.org/*` with a valid self-hosted oEmbed file will render as an interactive iframe inside Circle automatically.

## Posting a new exercise

1. Copy Exercise 01 as a template: `ex01-resume-tailorer.html` and `ex01-resume-tailorer.oembed.json`
2. Rename to `exNN-<slug>.html` and `exNN-<slug>.oembed.json`
3. Update all URLs, titles, and descriptions
4. Measure the rendered page height in a browser and update `height` in the JSON + the iframe HTML
5. Commit and push to `main`
6. Wait ~1 minute for GitHub Pages to publish
7. Paste the new URL into Circle's `/embed` command — it renders as a full-height interactive iframe

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
