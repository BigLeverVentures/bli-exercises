# Pre-Handoff Checklist

Run through this before delivering your two files to Chris. If any item fails, fix it before handoff. A failed item means the publishing pipeline will bounce it back.

## A. Filename & pair

- [ ] Both files exist: `exNN-<slug>.html` and `exNN-<slug>.oembed.json`
- [ ] `NN` is zero-padded (e.g., `ex02`, not `ex2`)
- [ ] `<slug>` is short, lowercase, kebab-case (e.g., `resume-tailorer`, `pmf-sharpener`)
- [ ] The two filenames share the same stem before the extension

## B. HTML `<head>` tags

Open the HTML file. Confirm every line below exists with values for *your* exercise.

- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] `<title>Exercise NN — <Title> | Big Lever Institute</title>`
- [ ] `<link rel="canonical" href="https://exercises.bigleverinstitute.org/exNN-<slug>.html">`
- [ ] `<meta name="description" content="<short description>">`
- [ ] All four Open Graph tags present (`og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`)
- [ ] All three Twitter Card tags present (`twitter:card`, `twitter:title`, `twitter:description`)
- [ ] oEmbed discovery: `<link rel="alternate" type="application/json+oembed" href="https://exercises.bigleverinstitute.org/exNN-<slug>.oembed.json" title="Exercise NN — <Title>">`
- [ ] **Every URL uses `exercises.bigleverinstitute.org`** — search for `bigleverventures.github.io` and confirm zero hits

## C. oEmbed JSON

- [ ] Valid JSON (paste into a JSON validator if unsure)
- [ ] `provider_name` is `"Big Lever Institute"`
- [ ] `provider_url` is `"https://exercises.bigleverinstitute.org/"`
- [ ] `title` matches the HTML `<title>` (without ` | Big Lever Institute`)
- [ ] `width` is `1080`
- [ ] `height` is `0` or a clear placeholder (do **not** guess a number)
- [ ] The `html` field contains the iframe with `src="https://exercises.bigleverinstitute.org/exNN-<slug>.html"`
- [ ] The iframe's `height` attribute matches the top-level `height` placeholder
- [ ] `allow="clipboard-write"` is present in the iframe (so the copy buttons work)

## D. Footer

- [ ] Footer exists, format: `© Big Lever Institute · Exercise NN · vX.Y · YYYY-MM-DD · Governed by BLI-ADR-001`
- [ ] Date is absolute (`2026-05-06`), not relative (`today`)
- [ ] Version is current

## E. Structure & design system

- [ ] `<style>` block matches the canonical CSS from `template-exNN-skeleton.html` (no edits unless cleared with Chris)
- [ ] No external CSS, no `<link rel="stylesheet">` to a CDN, no Google Fonts
- [ ] No external `<script src="...">` — only the inline copy-button script at the bottom
- [ ] Background renders cream (`#F7F4EE`), not white or dark
- [ ] All purple prompt blocks use `<div class="prompt">` structure with a `<div class="prompt-label">`, a `<pre id="pX">`, and a `<button class="copy-btn" data-copy="pX">`
- [ ] All gold deliverable cards use `<div class="gold-card">` with a `<div class="gold-label">`
- [ ] **No sticky step-progress bar at the top of the page** (this is explicitly forbidden)

## F. Pattern compliance (Show + Tell + Give — v2.0/v2.1)

- [ ] Step 0 covers prereqs, time estimate, account requirements
- [ ] **CI pattern declared in the spec (Pattern 1 or Pattern 2 per ADR §5.8).**
- [ ] **CI install step (Step 1 or Step 2) — gold-card with install checklist + purple `<pre>` block.**
  - **Pattern 1:** the block contains the **full compiled CI** (BLI Coach Base + Track Coach + Per-Exercise Coach Role). No encapsulation step later.
  - **Pattern 2:** the block contains **BLI Base + Track Coach only** (no Per-Exercise Coach Role). Encapsulation step at end + append-to-CI install required.
- [ ] **Single chat by default.** If the exercise uses more than one chat, the spec doc includes a documented justification (per ADR §5.9).
- [ ] At least one Show step (Circle instructs → Claude produces → learner sees)
- [ ] At least one Tell step with the three-layer reveal (Stable System / Stable Context / Volatile Input) — each `<div class="layer">` block present
- [ ] **Pattern 1:** a "what you keep" / Give-reveal step (gold card or prose) that names the persistent Coach and how to re-run with new inputs.
- [ ] **Pattern 2:** an encapsulation prompt + an install-append step (gold card directing the learner to append the generated Protocol below the BLI Base in Project Custom Instructions).
- [ ] (Optional) Extend phase has both a worked example (gold card) and a generator prompt
- [ ] Final step is a "Where to go next" card (`<div class="next-card">`)

## G. Content rules

- [ ] Every prompt the learner pastes is fully authored — no ad-lib fields without explicit placeholders like `[PASTE JD HERE]`
- [ ] No mid-flow form, questionnaire, or paste-back collection on the Circle side
- [ ] No artifact upload UI on the Circle side
- [ ] Each `<pre id>` is unique and matches its copy button's `data-copy`
- [ ] Each prompt block is preceded by a plain-prose intro paragraph (not a callout box)

## H. Copy-button JS

- [ ] The copy-button script at the bottom matches the canonical version (clipboard API + iframe-safe fallback)
- [ ] Open the HTML in a browser, click each Copy button, confirm it shows "Copied ✓"

## I. Render check

- [ ] Open the HTML in a browser at desktop width — page reads cleanly, copy buttons work, no broken styling
- [ ] Resize to ~360px — content is still readable, no horizontal scroll, prompt blocks don't overflow
- [ ] No console errors (open DevTools, check the Console tab)
- [ ] No `404`s in the Network tab (no missing external resources)

## J. Final spot-checks

- [ ] Topic and benchmark are named explicitly in your spec doc (in the Project)
- [ ] Project name the learner is told to create is consistent throughout the file (e.g., "Resume Writer" appears the same way everywhere)
- [ ] No leftover `[TODO]`, `[TBD: fill in]`, or other author-side placeholders inside the published copy (the only acceptable `[TBD]` is in the next-card adjacent-exercise pointer)
- [ ] Search the file for `Lorem`, `placeholder`, `xxx` — none should remain unless intentional

## Handoff

When all of A through J pass:

1. Place both files in a clearly named delivery folder (e.g., `handoff-exNN-<slug>/`).
2. Include a one-line note to Chris: exercise number, title, version, date, and any notes about deviations or open questions.
3. Send it to Chris via your usual channel.

Chris will run `npm run measure` to fix the height, push to the repo, and embed in Circle. If anything bounces back, the failure point is almost always in A, B, or C — start there.

---

*Checklist v2.1 · 2026-05-07 · Governed by BLI-ADR-001 v2.1*
