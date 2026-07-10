# Case study draft — Agentic design system

**Status:** numbers filled from agent audits (2026-07-10); drift gap closed same day  
**Branch:** `audit-agent-workflows` (local)  
**HTML page:** `case-agentic-design-system.html`

---

## Headline

I didn't only use AI to ship UI. I built a design system that an agent can **audit and keep honest** — tokens in code, variables in Figma, and workflows that produce a paper trail.

## Stack

HTML, CSS custom properties (`tokens.css` / `tokens.json`), Figma Variables, Figma MCP, agent-run audits (Grok / Claude-style coding agents).

## Real numbers (from the three workflows)

| Metric | Value | Source |
|--------|------:|--------|
| CSS tokens defined | **119** | `assets/tokens.css` |
| JSON leaf tokens | **146** | `tokens.json` (includes fluid min/max splits) |
| Figma variables exported | **126** | `figma-variables-export.json` |
| Consolidation — tokens droppable if merges accepted | **5** (119 → 114) | `consolidation-audit.md` |
| Dead tokens — directly dead | **3** | `dead-tokens.md` |
| Dead tokens — transitively dead | **0** | `dead-tokens.md` |
| Code ↔ Figma in sync | **118 of 118** | `drift-report.md` |
| Genuine value mismatches (after normalize) | **0** | `drift-report.md` |
| Code-only gap | **0** — `--color-placeholder-accent` found, added to Figma same day | `drift-report.md` |
| Agent workflows validated | **3** | consolidation · dead cleanup · drift |

### Drop list (consolidation, if accepted)

`--placeholder-warm-alt-1`, `--placeholder-warm-alt-2`, `--color-placeholder-1-alt`, `--color-placeholder-2-alt`, `--text-2xl`

### Direct-dead list (cleanup candidates)

`--a-08`, `--shadow-elevated-offset`, `--tracking-normal`

---

## Narrative (case body)

Built the site fast with AI. It shipped and looked right, but had no system underneath — the kind of drift that comes from generating each section in isolation. So I built the missing layer: tokens, a semantic layer for theming, and a set of agent-run audits to keep code and design honest.

**Consolidation** could drop **5** redundant tokens if accepted (119 → 114).  
**Cleanup** found **3** directly-dead and **0** transitively-dead tokens.  
**Drift audit** confirmed **118 of 118** tokens in sync between code and Figma — the one gap found (`--color-placeholder-accent`) was closed the same day, not left as a standing exception.

The agent is fast at the mechanical parts; deciding which values are the same thing wearing different names stayed a design decision.

---

## Workflow records (input → finding → outcome)

### 1 — Token consolidation

| | |
|--|--|
| **Input** | 119 CSS custom properties; production consumers in `style.css` + case HTML |
| **Finding** | Most identical values are intentional layering or cross-axis collisions. Real redundancy: warm-alt placeholder pair + optional 19px type step |
| **Outcome** | **5** tokens recommended to drop if merges accepted |

### 2 — Dead token cleanup

| | |
|--|--|
| **Input** | Every token name grepped against production CSS/JS/HTML; alias graph including dark theme |
| **Finding** | Dark neutrals looked dead until dark-theme aliases were included — classic false positive |
| **Outcome** | **3** direct-dead, **0** transitive-dead |

### 3 — Code ↔ design drift

| | |
|--|--|
| **Input** | `tokens.css` + Figma variables export (126 vars) from file DC — test |
| **Finding** | Naming differs (kebab vs slash); fluid type is clamp vs min/max pairs; shadow is Effect Style not Variable |
| **Outcome** | **118 of 118** in sync; **0** genuine mismatches after normalization; one gap found and closed same day |

---

## What not to claim

- Do **not** claim “5 tokens removed from production” until merges are applied — the audit recommends; design decides.
- Do **not** claim “3 tokens deleted” until cleanup is executed — listed as safe-to-remove candidates.
- Shadow offset living as Figma Effect Style is an **architectural exception**, not drift.

