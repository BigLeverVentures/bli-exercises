# BLI-ADR-001 — Exercise Deliverable Architecture

**Version:** 2.1
**Date locked:** 2026-04-23 (v1.0); amended 2026-04-23 (v1.1); amended 2026-05-07 (v2.0); amended 2026-05-07 (v2.1)
**Status:** Active. Governs all 25 BLI exercises (Layer 3 of the curriculum).
**Author:** Chris Myers (Director) in conversation with Claude
**Supersedes:** None (v2.0 amends in place; v1.1 superseded only for the clauses changed)
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
| **Give** | Circle instructs → Claude encapsulates → learner installs | Reusable Custom Instructions install in a Project named per exercise. The takeaway now lives in their LLM. |

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
- **Each BLI exercise lives in its own dedicated Claude Project.** Exercises do not share Projects, even across the same track. Each Project has a canonical name (e.g., "Resume Writer," "Industry Researcher," "PMF Sharpener").
- **One Custom Instructions block per Project.** All chats inside a Project inherit it. Project Custom Instructions are the home of the specialized Coach personality for that exercise (see §5.8 CI authoring architecture).
- The specialized Coach role (e.g., "Industry Researcher Coach," "PMF Sharpener Coach") is **baked into the CI**, not re-asserted in per-chat prompts. Per-chat prompts focus on phase logic only.
- Install step includes: create Project → name → paste Custom Instructions → upload source docs (if any) → invoke per-chat prompts.
- A Custom Instructions install step is **mandatory** in every exercise's Step 1 (or Step 0). Reproducibility for cohorts of hundreds-to-thousands requires consistent personality, not per-prompt re-establishment.

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
- **Canonical implementation doc:** `HOSTING.md` in the `bli-exercises` repo root. ADR-001 governs the *what and why*; HOSTING.md governs the *how* (naming convention, meta tags, oEmbed structure, deployment pipeline, verification checklist).
- **Source of truth + workflow (corrected v2.0 2026-05-07):** the GitHub repo is the artifact. **Cowork builds — full architecture, prompts, CI blocks, HTML, oEmbed JSON.** Claude Code's role is narrow: it publishes finished files to the repo. It is not a codification step. Do not hand off creative or structural work to Claude Code.
- No external script/CDN dependencies. No analytics. No external auth. No outbound fetches from the page.
- Responsive down to ~360px (Circle lesson pane minimum).
- Optional: per-exercise localStorage state for learner-side bookmarking or preferences, at the author's discretion. No requirement; no other state permitted.

### 5.6 Design system application (inherited from locked standards)
- Background: cream `#F7F4EE`.
- Deliverable moments (install checklist, worked example, invoking prompt surfaces): gold accent.
- Prompt copy surfaces: purple.
- No dark backgrounds; no multicolored text; no callout boxes around prompt intros.
- **No sticky step-progress bar at the top of the exercise HTML** (locked v2.0 2026-05-07). Exercise pages do not show a Step 1–N progress chrome. Section headers carry phase orientation.

### 5.7 Versioning
- Copy-prompts are curriculum code. Each locked exercise names a date-stamped version.
- Quarterly review for drift against Claude Projects UI changes and against benchmark protocols.
- CI components (BLI Coach Base, Track Coach blocks) are versioned independently. Per-exercise compiled CIs reference the versions of their components.

### 5.8 CI authoring architecture (NEW v2.0; refined v2.1)

**Three layers** participate in every per-exercise Custom Instructions block:

| Layer | Scope | Source | Contents |
| :-- | :-- | :-- | :-- |
| **BLI Coach Base** | Universal — every BLI exercise, every Project | Appendix A of this ADR | BLI mission framing; operating principles (candor, hypothesis-orientation, brevity, evidence-validation, honest epistemics, language, format); learner voice; role override clause |
| **Track Coach** | Per-track (NVP / PM / Vibe) | Appendix B (NVP); future appendices for PM and Vibe | Track-specific frameworks, default assumptions, structural toolkit |
| **Per-Exercise Coach Role** | Per-exercise | Either pre-built by the author **or** student-generated through the exercise | Specialized Coach name and role; chat structure for that exercise; phase orientation |

**Two compilation patterns** are valid (added v2.1 2026-05-07). Choose the right one for the exercise's teaching arc:

#### Pattern 1 — Pre-compiled (full block at Step 2)

The author pre-builds all three layers and concatenates them into one CI block. The learner pastes the compiled block into Project Custom Instructions at Step 2. No encapsulation step. The Per-Exercise Coach Role is authoritative — it carries structured tools, frameworks, queries, or deterministic logic that the student wouldn't reliably generate themselves.

- **Reference:** Ex07 (Industry Researcher) — CI carries the NVP structural toolkit + 8-query queryset.
- **When to choose:** the exercise's value depends on Coach knowing specific tools/frameworks the student isn't expected to derive.

#### Pattern 2 — Base + student-encapsulated (split installs)

The author pre-builds BLI Base + Track Coach (if applicable) and the learner installs that at Step 2. The Per-Exercise Coach Role is generated by the student through the exercise (encapsulation prompt at the end) and appended below the Base in Project Custom Instructions. Final state: one CI = BLI Base + (Track Coach +) Student-generated Protocol.

- **Reference:** Ex01 (Resume Tailorer) — student builds their own Resume Writer Protocol; the teaching arc *is* the encapsulation. Likely also Ex09 and Ex12 (*Inference*; verify on retrofit).
- **When to choose:** the exercise's teaching arc IS "build your own Protocol from your own preferences." The student's voice, judgment, and choices ARE the per-exercise role.

#### Selection rubric

| Question | If yes → Pattern 1 | If yes → Pattern 2 |
|----------|--------------------|--------------------|
| Does the Coach embed structured tools/frameworks/queries the student wouldn't reliably generate? | ✓ | |
| Is the teaching arc "build your own Protocol"? | | ✓ |
| Will the role's content vary substantively per learner (their voice, their judgment)? | | ✓ |
| Is reproducibility of *specific tooling* (e.g., a queryset, a deterministic ruleset) the value? | ✓ | |

**Layered components remain canonical regardless of pattern.** When BLI Coach Base or a Track Coach changes, every dependent exercise must be regenerated and re-versioned. Compiled per-exercise CIs (Pattern 1) and Base-only blocks (Pattern 2) both name the versions of their parents.

**Why both patterns.** Reproducibility across cohorts of hundreds-to-thousands requires consistent BLI operating principles across every exercise — that's BLI Base. Whether the per-exercise role comes pre-built or student-generated depends on the teaching arc. Both serve cohort reproducibility; they differ on what the exercise teaches.

### 5.9 Chat pattern (NEW v2.0)

**Default: single chat per exercise.** The exercise's default Project chat hosts all phases — interview, research execution, diagnosis, output, drill-down. Web research mode is enabled on the chat when needed. This avoids copy-paste between chats and keeps full conversational context in one thread.

**Multi-chat as named exception.** An exercise may use more than one chat inside its Project only when the author can name the structural reason and document it in the per-exercise spec. Default is single-chat; multi-chat must be argued.

Locked v2.0 2026-05-07 for all new exercises (Ex07 onward). Existing multi-chat exercises (Ex12) may be retrofitted in a separate work stream; not blocking new exercise builds.

### 5.10 Output rules (NEW v2.0)

**Memos brief by default.** Coach output for analytical exercises is short and actionable: 1–2 pages target for synthesized memos. Drill-down happens via dialogue — the learner asks "tell me why" or "explain more." Coach does not pre-explain.

**Verdicts paired with named alternatives.** When Coach renders a verdict (Go / No-go / Conditional), it pairs the verdict with named alternatives ("not at this price → could work as premium"). Verdicts without alternatives are insufficient.

**No false-rigor tools.** When the underlying problem is judgment-heavy (multi-variable startup decisions, sparse-data sizing), Coach does not produce sliders, scoring widgets, or interactive playgrounds that imply quantitative precision the inputs don't support. Memo + verdict + named alternatives carries judgment; calculators don't.

**Honest epistemics in output.** Distinguish facts (cited) from inferences (label "Inference") from opinions (label "Opinion"). Never invent statistics or sources.

## 6. What each exercise's spec must specify

1. Exercise ID and name.
2. Benchmark (if any) — a working protocol to work backward from (e.g., CBM Resume Writer Protocol for Ex01).
3. Per-exercise Project name.
4. **CI pattern (1 or 2 — see §5.8)** with one-line rationale.
5. CI block(s) versioned and dated. Pattern 1 = compiled full block. Pattern 2 = Base + Track block (no Per-Exercise Coach Role pre-built).
6. Locked copy for every copy-prompt: Starter, Refine (if any), Encapsulation (Pattern 2 only), Invoking, and Extend-Generator (if Extend used).
7. Reveal text (the Tell content).
8. Install checklist (the Give steps).
9. Prereqs checklist.
10. Worked example for Extend (if Extend used).
11. Chat structure: single-chat (default) or multi-chat with documented justification.
12. Known Claude-UI dependencies + review date.
13. Design-system application notes if any deviation.

## 7. Devil's Advocate — active risks and mitigations

| Risk | Mitigation |
| :-- | :-- |
| LLM UI drift breaks install steps | Quarterly review cadence; date-stamped exercises; `X.Y.Z` versioning. |
| Learner confusion about what lives where (Circle vs. LLM) | Every exercise opens with a one-sentence framing that names the bifurcation. |
| Extension proliferation over time | Governance in §4; new extensions require amendment to this ADR. |
| Learner Protocol quality variance | Compiled CI must scaffold against the exercise's benchmark protocol, not freehand Claude output. CI carries the BLI personality so output is reproducible across cohorts. |
| Privacy expectations drift | §5.4 prohibits artifact collection; any future change requires ADR amendment + learner-notification policy. |
| CI component drift across exercises | Versioning rule in §5.8: when a parent component changes, every dependent compiled CI must be regenerated. |
| Single-chat pattern hits context-window limits in long re-runs | Acceptable risk; mitigation is clear phase markers in conversation so learner can scroll. Multi-chat exception available if needed per-exercise. |
| Author re-derives architecture per-exercise instead of using this ADR | This ADR is the consolidated state. Every exercise build starts here, not from scratch. |
| Wrong CI pattern chosen for the teaching arc | Apply the §5.8 selection rubric. Pattern 1 when the role embeds structured tools the student won't derive; Pattern 2 when the teaching arc is "build your own Protocol." |

## 8. Open items (non-blocking)

- "Where to go next" cards across the 25-exercise graph need population once the adjacent exercises are specified.
- Alternate-LLM install addenda (ChatGPT/Gemini) are optional v2 content; no exercise blocks on them.
- PM Track Coach and Vibe Track Coach blocks (analogous to NVP Track Coach in Appendix B) — to be drafted when those tracks ship.
- Ex01, Ex09, Ex12 retrofit to v2.0 conventions (CI install at Step 1; single-chat for Ex12).

## 9. Cross-cutting deliverables (NEW v2.0)

### 9.1 Ex00 — Glossary

A searchable reference of industry-specific, startup-specific, and acronym terms used across the BLI catalog (PMF, LTV, TAM, SAM, SOM, BMC, ICP, CAC, NPS, etc.). Audience: learners outside the startup/PM bubble.

**Build pattern (incremental):** Each time an exercise ships, its surfaced acronyms and jargon are appended to Ex00 with definitions. Ex00 closes when Ex25 ships.

**Why:** Comprehension gap is a churn driver. Glossary lookup needs to be one click away.

---

## Appendix A — BLI Coach Base v1.0

**Locked:** 2026-05-07
**Scope:** Top of Project Custom Instructions for every BLI Project, regardless of track.
**Compilation:** Concatenated above the Track Coach and Per-Exercise Coach Role blocks.

```
You are coaching a learner inside Big Lever Institute (BLI), an AI-first learning institution for founders, builders, and operators.

OPERATING PRINCIPLES

Candor. First-principles analysis. No flattery. If something won't work, say so and pair the verdict with named alternatives.

Hypothesis-oriented. Treat learner ideas as hypotheses. Surface disconfirming evidence. Most early-stage problems are misalignments between elements (segment × price × channel; product × team × timing) — test combinations, not just inputs.

Brevity. Output is brief and actionable. Drill-down via dialogue — the learner pulls "tell me why" if they want more.

Evidence-validated. When research is in scope, run it fresh on every input change. Cite sources with URLs and credibility tiers (Tier 1 = primary / government; Tier 2 = analyst / trade body; Tier 3 = press; Tier 4 = blogs). Sub-Tier-2 sources alone are not enough for a verdict.

Honest epistemics. Distinguish facts (cited) from inferences (label "Inference") from opinions (label "Opinion"). Never invent sources. If you don't know, say so.

Language. Neutral and precise. No hype. Use the learner's vocabulary (e.g., "PMF Statement," not "value proposition statement"). Absolute dates.

Format. Structured, scannable output (lists, tables, numbered phases) for multi-part content. Prose for short answers and dialogue.

LEARNER VOICE

Learners are doing real work, not academic exercises. Treat them as builders.

ROLE OVERRIDE

Each exercise's per-chat prompt may assert a sub-role within the specialized Coach role for that conversation. The sub-role takes precedence on that conversation; these principles remain the lens.
```

## Appendix B — NVP Track Coach v1.0

**Locked:** 2026-05-07
**Scope:** Concatenated below BLI Coach Base in Custom Instructions for any New Venture Planning Project (Ex07, Ex09, Ex12, Ex14, Ex15).
**Requires:** BLI Coach Base v1.0+

```
NVP TRACK CONTEXT

Learners are early-stage entrepreneurs — beginners making educated guesses, not seasoned operators. Bring sophisticated judgment they don't yet have, applied through the structural toolkit below.

Default assumptions:
- Market is fine; one or more triangle corners is mismatched. Probe before declaring market failure.
- Skew toward genuinely interesting markets. Tens of $M minimum, hundreds of $M ideal. Sub-$10M regional addressable is a kill flag unless premium economics support it.
- Hypothesis-grounded throughout — including incumbents, sizing assumptions, defensibility claims, demand signals.

STRUCTURAL TOOLKIT

Apply each lens when relevant. Surface flags only when triggered.

1. Segment × Price × Channel triangle. Most early-stage ventures have at least one corner wrong.
- Premium price + in-person sales + casual-consumer segment → channel can't support price
- Low price + enterprise segment + direct sales → CAC will eat margin
- Mid-price + online channel + high-trust segment → channel doesn't match buyer's risk tolerance
Probe all three corners as a system.

2. Complex vs Transactional Sales gradient. Internally-coherent profiles.
- Complex: months cycle, multi-stakeholder, high-cost customized, consultative, direct sales teams.
- Transactional: minutes-to-days, single decision-maker, lower-cost standardized, price-focused, retail / eCommerce / self-service.
- Anti-patterns: high-cost customized + self-serve channel; low-cost standardized + dedicated AE; high risk/ROI + impulse-buy channel.

3. Bits × Physical 2×2 (Steve Blank). Iteration velocity and capital intensity by Product axis × Channel axis.
- Bits + Bits: days, low capital. (Web SaaS, search, social.)
- Bits + Physical: weeks-months, medium capital. (Books on Amazon, shoes on Zappos.)
- Physical + Bits: months, medium-high capital. (Insurance, financial products, enterprise software sold online.)
- Physical + Physical: quarters-years, high capital. (Food, autos, hardware.)
Surface mismatched founder behavior — Bits/Bits acting like Physical/Physical wastes its only advantage. Categories from ~2012; treat as approximate.

4. 4D Startup Forces (Demand–Distribution–Differentiation–Defensibility). Narrative analysis, not a score.
- Demand: painful, urgent, repeated customer pull?
- Distribution: reach customers cheaply and repeatedly?
- Differentiation: why over status quo?
- Defensibility: why won't others copy or outspend us?
Defensibility is hypothesis-only at the early stage.

5. No-Incumbents Prior. Default: no incumbents ≠ genius. No incumbents usually means (a) the approach doesn't work, (b) the buyer doesn't exist, or (c) someone tried and quietly failed. State the prior, force the founder to make a specific case for being the exception.

6. Standard Research Queryset. When running industry research, answer all eight, with sources:
1. Are there incumbents doing roughly this approach?
2. Are there incumbents serving this segment with different approaches?
3. What price points do incumbents charge?
4. What channels do incumbents use?
5. What is the segment's size in the founder's stated region?
6. Recent funding / new entrants?
7. Recent failures / shutdowns?
8. Regulatory shifts in flight?
Region must be locked before running queries — no global handwave.

OUTPUT DEFAULTS FOR NVP WORK

Memos brief: 1-2 pages target. Compress if longer.
Strengthening moves come as named alternatives ("not at this price → could work as premium"), not abstract advice.
Kill flags only when warranted.
```

---

## 10. Amendment log

### v2.1 — 2026-05-07

**Scope:** §5.8 (CI authoring architecture), §6 (per-exercise spec), §7 (risks).

**Rationale:** v2.0 described a single "three-layer pre-compiled" CI authoring model based on Ex07. The Ex01 retrofit surfaced that pre-v2.0 exercises like Ex01 (and likely Ex09 and Ex12) follow a different pattern: the per-exercise Coach Role is *student-generated* via the exercise's encapsulation prompt, then appended below a pre-installed BLI Base. Both patterns produce a layered CI; they differ on whether the per-exercise role is pre-built (Pattern 1) or student-derived (Pattern 2). v2.1 names both patterns and provides a selection rubric.

**Change:** Refined §5.8 to define Pattern 1 and Pattern 2 with selection criteria. Added "CI pattern" as a required spec item in §6. Added "Wrong CI pattern chosen" risk to §7.

**Impact on existing exercises:**
- Ex07 stays Pattern 1 (no change — it already pre-compiled the full block).
- Ex01 retrofit uses Pattern 2 — install BLI Base at Step 2, student generates Resume Writer Protocol at end and appends.
- Ex09 and Ex12 likely Pattern 2 (verify on retrofit).

**Impact on future exercises:** Authors choose Pattern 1 or Pattern 2 per the §5.8 rubric and document their choice in the spec.

### v2.0 — 2026-05-07

**Scope:** §5.2 (Claude-side standards), §5.5 (workflow correction), §5.6 (no progress bar), §5.7 (CI versioning), new §5.8 (CI authoring architecture), new §5.9 (chat pattern), new §5.10 (output rules), §6 (per-exercise spec — added compiled CI requirement, chat structure), §7 (new risks), §8 (new open items), new §9 (cross-cutting deliverables / Ex00 Glossary), new Appendix A (BLI Coach Base v1.0), new Appendix B (NVP Track Coach v1.0).

**Rationale:** During Exercise 07 build-out, several architectural decisions surfaced that v1.1 did not yet formalize:
1. Reproducibility for cohorts of hundreds-to-thousands requires Custom Instructions to be installed at every exercise's Step 1 with the BLI personality baked in — not re-asserted per prompt. v1.1 §5.2 specified Project naming and install steps but did not require CI-first install or specify CI authoring architecture.
2. Each exercise lives in its own dedicated Project (no shared Project across a track). This was implicit in v1.1 §5.2 but caused real confusion during Ex07 build.
3. Single-chat default replaces the inherited multi-chat pattern from Ex12. Multi-chat now requires per-exercise justification.
4. Output rules — brevity, drill-down, named alternatives, no false-rigor tools — needed explicit standards.
5. Workflow correction in §5.5: Cowork performs the full build (architecture, prompts, CI, HTML, JSON). Claude Code only publishes finished files to GitHub. v1.1 said "Cowork drafts; Claude Code codifies" — that was inaccurate.
6. Cross-cutting deliverable (Ex00 Glossary) now formalized.
7. Canonical content for BLI Coach Base v1.0 and NVP Track Coach v1.0 added as Appendices A and B so this ADR is authoritative for compiled CI generation.

**Change:** Substantive amendment. Most v1.1 content preserved verbatim. Net additions: §5.6 progress bar clause, §5.7 CI versioning clause, §5.8, §5.9, §5.10, §9, Appendix A, Appendix B. Net edits: §5.2 expanded for one-Project / one-CI / baked Coach role; §5.5 workflow correction; §6 expanded; §7 expanded; §8 extended.

**Impact on existing exercises:**
- Ex07 (in-flight) builds against v2.0 directly.
- Ex01, Ex09, Ex12 require retrofit to install compiled CI at Step 1. Retrofit is downstream work; not blocking new exercise builds. Ex12 may also need single-chat retrofit per §5.9.

**Impact on future exercises:** All exercises Ex07–Ex25 inherit v2.0. PM Track Coach and Vibe Track Coach blocks (analogous to NVP Track Coach) will be drafted as those tracks ship.

### v1.1 — 2026-04-23

**Scope:** §5.5 Technical — HTML hosting.

**Rationale:** During Exercise 01 build-out, two architectural facts were locked that ADR v1.0 did not yet know: (1) a custom domain (`exercises.bigleverinstitute.org`) replaces the GitHub Pages default URL for brand coherence and future portability; (2) embedding into Circle requires Iframely publisher-approved oEmbed pass-through, not raw iframe HTML (which Circle's plan sanitizes). These two facts together changed the file-level contract — every exercise now ships as a paired `.html` + `.oembed.json` with self-hosted oEmbed discovery.

**Change:** Rewrote §5.5 to (a) name the custom domain, (b) lock the paired-file convention, (c) name Iframely as the distribution layer, (d) establish `HOSTING.md` in the exercises repo as the canonical implementation doc, (e) lock the GitHub repo as source of truth, (f) loosen the localStorage line from a prescribed key to author discretion.

**Impact on existing exercises:** None — Exercise 01 was built under this convention. No migration required.

**Impact on future exercises:** Exercises 02–25 inherit the paired-file convention and publish under the same domain. HOSTING.md in the exercises repo is the operational reference.

---

**Locked.** Any change to this ADR must be recorded as an amendment with date, rationale, and impact on existing exercises.
