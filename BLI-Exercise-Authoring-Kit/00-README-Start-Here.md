# BLI Exercise Authoring Kit — Start Here

Welcome. This kit gives you everything you need to author a Big Lever Institute exercise inside a Claude Project, then hand it back to Chris (or another site admin) for publication.

## What you're producing

A **paired set of two files** for each exercise you author:

- `exNN-<slug>.html` — the standalone interactive exercise page
- `exNN-<slug>.oembed.json` — the embed metadata that lets Circle render it as an iframe

You hand both files back. An admin runs the publishing pipeline. You don't push to GitHub, run scripts, or touch Circle's embed cache.

## How the system works (one paragraph)

Authors draft inside Claude Cowork Projects. Drafts are codified into HTML in the same project. Two files (HTML + oEmbed JSON) are delivered to a site admin. The admin pushes them to the public repo (`BigLeverVentures/bli-exercises`), which auto-publishes to `https://exercises.bigleverinstitute.org/`. Circle then embeds the live URL as an iframe. **The repo is the source of truth — your Cowork drafts are working copies only.**

## Read these in order

| # | File | What it is |
| :-- | :-- | :-- |
| 1 | `00-README-Start-Here.md` | This file. |
| 2 | `01-Authoring-Guide.md` | The full authoring workflow — pattern, contract, conventions. **Most important file.** |
| 3 | `02-Pre-Handoff-Checklist.md` | Run this before delivering files back. |
| 4 | `reference/BLI-ADR-001_Exercise_Deliverable_Architecture.md` | The architectural contract every exercise inherits. Read once, refer back. |
| 5 | `reference/HOSTING.md` | The operational playbook. **Authors only need §File template and §Required `<head>` tags + §oEmbed JSON template.** Skip §Height measurement, §Cache invalidation, §Posting, §Verifying, §Infrastructure — those are admin-only. |
| 6 | `reference/ex01-resume-tailorer.html` + `.oembed.json` | Original benchmark (pre-v2.0 pattern: CI generated at end). Useful for design-system reference; step structure differs from current standard. |
| 7 | `reference/ex09-learning-accelerator.html` + `.oembed.json` | Second early reference (pre-v2.0). Slated for retrofit to v2.0. |
| 8 | `reference/ex12-pmf-sharpener.html` + `.oembed.json` | Third early reference (pre-v2.0). Slated for retrofit to v2.0. |
| 9 | `reference/ex07-industry-researcher.html` + `.oembed.json` | **First v2.0-conforming exercise. This is the current pattern reference — start here for new exercises.** |
| 10 | `template/template-exNN-skeleton.html` + `.oembed.json` | Fillable starter. **Currently aligned to v2.0** (CI install at Step 2, single-chat default). Copy, rename, edit. |

## Set up your Claude Project (5 minutes)

1. Go to [claude.ai](https://claude.ai).
2. In the **left sidebar**, click **Projects**, then **New Project**.
3. Name your Project something like `BLI Exercise — exNN <Working Title>` (e.g., `BLI Exercise — ex02 Outreach Tailor`).
4. Open the Project's file library and **upload every file in this kit** as Project knowledge. Folder structure is fine; flat is fine. Claude can read them all.
5. Click **New Chat** inside the Project. All your authoring conversations live in this Project.

## What's locked vs. what's yours

| Locked (don't change) | Yours to author |
| :-- | :-- |
| File pair contract (paired `.html` + `.oembed.json`) | Exercise topic, learner outcome |
| Filename pattern (`exNN-<slug>`) | Step structure within Show + Tell + Give |
| Required `<head>` tags (canonical, OG, Twitter, oEmbed link) | All copy and prose |
| oEmbed JSON shape (you leave `height` as a placeholder) | Copy-prompts (paste-ready blocks for learners) |
| Design system (cream background, gold deliverables, purple prompt blocks, 760px max-width) | Worked examples and Extend domain |
| Show + Tell + Give pattern + optional Extend | Pre-handoff metadata (version, date) |
| URL convention (`exercises.bigleverinstitute.org`, never `bigleverventures.github.io`) | |
| No external scripts, no CDN, no analytics, no auth | |
| Footer format: `© Big Lever Institute · Exercise NN · vX.Y · YYYY-MM-DD · Governed by BLI-ADR-001` | |

## What admins do after you hand off

So you understand the downstream — and why getting your part right matters:

1. Admin places your two files at the repo root (`exNN-<slug>.html` + `exNN-<slug>.oembed.json`).
2. Admin runs `npm run measure` — a headless browser measures the rendered height and patches it into the oEmbed JSON.
3. Admin commits and pushes; GitHub Pages publishes within ~1 minute.
4. Admin pastes the URL into Circle's `/embed` command.
5. If you got the head tags or oEmbed JSON shape wrong, the pipeline breaks and admin has to bounce the files back to you.

## Where to ask for help

Inside your Cowork Project chat. The kit and the three reference exercises are all loaded — Claude can answer most "how does ex01 handle X?" questions directly. For anything that requires changing a locked rule, ping Chris.

---

*Kit version: v2.0 · 2026-05-07 · Governed by BLI-ADR-001 v2.0*

## What changed in v2.0 (2026-05-07)

ADR-001 was amended to v2.0 with substantive changes that this kit now reflects:

- **CI install at Step 2, not generated at the end.** Each exercise ships a pre-compiled Custom Instructions block (BLI Coach Base + Track Coach + Per-Exercise Coach Role) that the learner pastes into Project Custom Instructions before running any prompts. Reproducibility for cohorts of hundreds-to-thousands requires consistent personality, baked into the CI rather than re-asserted per prompt.
- **One Project per exercise.** Exercises do not share Projects, even within the same track.
- **Single-chat default.** Multi-chat structures (e.g., Ex12's Sharpener + Research Scratchpad) now require per-exercise justification. New exercises run in a single chat by default.
- **Three-layer CI authoring model.** BLI Coach Base (universal) + Track Coach (NVP / PM / Vibe) + Per-Exercise Coach Role compile into one user-facing block. Authors maintain the layered components; learners see one block.
- **No false-rigor tools.** Memo + verdict + named alternatives, not interactive sliders or scoring widgets that imply quantitative precision the inputs don't support.

Existing references (Ex01, Ex09, Ex12) were built under v1.x and are slated for retrofit. Ex07 is the first v2.0-conforming reference — use it as the pattern model when building Ex14, Ex15, and beyond.
