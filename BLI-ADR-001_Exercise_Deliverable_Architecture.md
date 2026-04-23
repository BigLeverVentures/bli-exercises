# BLI-ADR-001 — Exercise Deliverable Architecture

**Version:** 1.1
**Date locked:** 2026-04-23 (v1.0); amended 2026-04-23 (v1.1)
**Status:** Active. Governs all 25 BLI exercises (Layer 3 of the curriculum).
**Author:** Chris Myers (Director) in conversation with Claude
**Supersedes:** None
**Cross-refs:** BLI Curriculum Architecture; Design System (locked standards); Pedagogical principle — Deliverable-first design; `HOSTING.md` (in `BigLeverVentures/bli-exercises` repo — canonical implementation doc)

---

## 1. Context & problem

Every BLI exercise must (a) produce a tangible, real-world tool the learner keeps, (b) transfer a reusable Claude/LLM skill, and (c) deploy via Circle, which hosts no AI. Without a standard, each exercise risks re-inventing its delivery architecture, drifting design, and mis-placing AI work on the Circle side where it cannot run.

This ADR locks the pattern so Exercises 02–25 inherit it cleanly and future contributors follow one convention.

## 2. Decision — the bifurcation

| Side | Role | Contents |
| :-- | :-- | :-- |
| **Circle (passive orchestrator)** | Step sequencing, instruction prose, copy-to-clipboard prompt surfaces, context-aware "next" cards. | **No AI. No forms. No questionnaires. No artifact collection.** Optional: a single-field localStorage bookmark for "last step visited." |
| **Learner's LLM (active worker; Claude default)** | All generation, iteration, encapsulation, project creation, custom-instructions pasting. The exercise's persistent takeaway lives here afterward. | Claude Projects (or equivalent). Source docs uploaded here. Reusable Custom Instructions installed here. |

## 3. The pattern — Show + Tell + Give

Every exercise follows this 3-phase spine:

| Phase | Location | Purpose |
| :-- | :-- | :-- |
| **Show** | Circle instructs → Claude produces → learner sees | The system works on the learner's real material. Proof, not theory. |
| **Tell** | Circle (reveal prose) | Name the transferable architecture so the learner understands *why* it worked. |
| **Give** | Circle instructs → Claude encapsulates → learner installs | Claude writes the reusable Custom Instructions; learner installs in a Project named per exercise. The takeaway now lives in their LLM. |

### 3.1 The architecture being transferred (taught across all exercises)

**3-layer separation of concerns:**
- **Stable System** — Custom Instructions (rules, tone, format, process). Rarely changes.
- **Stable Context** — source docs in the Project (facts the LLM can cite). Changes when life/facts change.
- **Volatile Input** — the per-run input (JD, person's profile, meeting notes, etc.). Changes every run.

This is the mental model MC6 (Prompt Engineering Mastery) deepens. Each exercise is a concrete instance of it.

## 4. Permitted optional extensions

| Extension | When allowed | Purpose | Placement |
| :-- | :-- | :-- | :-- |
| **Extend** | When the exercise's domain is analogous to other repetitive-variable tasks the learner does. | Apply the 3-layer architecture to a *different* domain. One worked example + one generator prompt. | After Tell (Reveal), before "Where to go next." Must be marked optional. |

**Governance:** new extensions require an amendment to this ADR. Core phases are immutable. Extensions are additive.

Explicitly **not** permitted as a pattern element: mid-flow Inspect stages, artifact uploads, paste-back collection, learner questionnaires.

## 5. Standards inherited by every exercise

### 5.1 Circle content
- Step-by-step prose; one instruction per step.
- Copy-prompt surfaces rendered per design-system: **purple prompt block, plain-prose intro (not a callout box)**.
- Exercise author authors copy for every prompt the learner will paste. No "ad-lib" fields.
- Context-aware "Where to go next" card. No numerical next/previous chrome.

### 5.2 Claude-side standards
- Default project-hosting: Claude Projects (claude.ai).
- Each exercise specifies the Project's canonical name (e.g., "Resume Writer," "Outreach Tailor").
- Install step includes: create project → name → paste Custom Instructions → upload source docs → invoke.

### 5.3 LLM neutrality
- Claude is the default for parity with the rest of BLI curriculum.
- Other LLM equivalents (ChatGPT Custom GPTs / Projects; Gemini Gems) are welcomed. Prompts may need minor adjustment; alternate-LLM notes are permitted per exercise at the author's discretion.

### 5.4 Privacy posture
- Zero BLI collection of learner career material. Implied by "no artifact collection on Circle."
- All personal data stays on the learner's LLM side.

### 5.5 Technical — HTML hosting
- Self-contained `.html` per exercise. Inline CSS + vanilla JS. No build step.
- **Hosted on custom domain `exercises.bigleverinstitute.org`** (GitHub Pages backed; repo `BigLeverVentures/bli-exercises`, public).
- **Each exercise is a paired `.html` + `.oembed.json` at repo root.** Self-hosted oEmbed discovery via `<link rel="alternate">` in the HTML head.
- **Embedded in Circle via Iframely's publisher-approved oEmbed pipeline.** Domain `bigleverinstitute.org` received Iframely publisher approval 2026-04-23; all child paths inherit.
- **Canonical implementation doc:** `HOSTING.md` in the `bli-exercises` repo root. ADR-001 governs the *what and why*; HOSTING.md governs the *how* (naming convention, meta tags, oEmbed structure, deployment pipeline, verification checklist). Changes to hosting conventions are made in HOSTING.md; structural changes that affect the contract between ADR and HOSTING.md require a new ADR amendment.
- **Source of truth:** the GitHub repo. Cowork drafts; Claude Code codifies; the repo is the artifact. Non-canonical workspace copies are treated as drafts only.
- No external script/CDN dependencies. No analytics. No external auth. No outbound fetches from the page.
- Responsive down to ~360px (Circle lesson pane minimum).
- Optional: per-exercise localStorage state for learner-side bookmarking or preferences, at the author's discretion. No requirement; no other state permitted.

### 5.6 Design system application (inherited from locked standards)
- Background: cream `#F7F4EE`.
- Deliverable moments (install checklist, worked example, invoking prompt surfaces): gold accent.
- Prompt copy surfaces: purple.
- No dark backgrounds; no multicolored text; no callout boxes around prompt intros.

### 5.7 Versioning
- Copy-prompts are curriculum code. Each locked exercise names a date-stamped version.
- Quarterly review for drift against Claude Projects UI changes and against benchmark protocols.

## 6. What each exercise's spec must specify

1. Exercise ID and name.
2. Benchmark (if any) — a working protocol to work backward from (e.g., CBM Resume Writer Protocol for Ex01).
3. Per-exercise Project name.
4. Locked copy for every copy-prompt: Starter, Refine (if any), Encapsulation, Invoking, and Extend-Generator (if Extend used).
5. Reveal text (the Tell content).
6. Install checklist (the Give steps).
7. Prereqs checklist.
8. Worked example for Extend (if Extend used).
9. Known Claude-UI dependencies + review date.
10. Design-system application notes if any deviation.

## 7. Devil's Advocate — active risks and mitigations

| Risk | Mitigation |
| :-- | :-- |
| LLM UI drift breaks install steps | Quarterly review cadence; date-stamped exercises; `X.Y.Z` versioning. |
| Learner confusion about what lives where (Circle vs. LLM) | Every exercise opens with a one-sentence framing that names the bifurcation. |
| Extension proliferation over time | Governance in §4; new extensions require amendment to this ADR. |
| Learner Protocol quality variance | Encapsulation prompts must scaffold against the exercise's benchmark protocol, not freehand Claude output. |
| Privacy expectations drift | §5.4 prohibits artifact collection; any future change requires ADR amendment + learner-notification policy. |

## 8. Open items (non-blocking)

- "Where to go next" cards across the 25-exercise graph need population once the adjacent exercises are specified.
- Alternate-LLM install addenda (ChatGPT/Gemini) are optional v2 content; no exercise blocks on them.

---

## 9. Amendment log

### v1.1 — 2026-04-23

**Scope:** §5.5 Technical — HTML hosting.

**Rationale:** During Exercise 01 build-out, two architectural facts were locked that ADR v1.0 did not yet know: (1) a custom domain (`exercises.bigleverinstitute.org`) replaces the GitHub Pages default URL for brand coherence and future portability; (2) embedding into Circle requires Iframely publisher-approved oEmbed pass-through, not raw iframe HTML (which Circle's plan sanitizes). These two facts together changed the file-level contract — every exercise now ships as a paired `.html` + `.oembed.json` with self-hosted oEmbed discovery — which is too large a change to leave implicit.

**Change:** Rewrote §5.5 to (a) name the custom domain, (b) lock the paired-file convention, (c) name Iframely as the distribution layer, (d) establish `HOSTING.md` in the exercises repo as the canonical implementation doc, (e) lock the GitHub repo as source of truth, (f) loosen the localStorage line from a prescribed key to author discretion.

**Impact on existing exercises:** None — Exercise 01 was built under this convention. No migration required.

**Impact on future exercises:** Exercises 02–25 inherit the paired-file convention and publish under the same domain. HOSTING.md in the exercises repo is the operational reference.

---

**Locked.** Any change to this ADR must be recorded as an amendment with date, rationale, and impact on existing exercises.
