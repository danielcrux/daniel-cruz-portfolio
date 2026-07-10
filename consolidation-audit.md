# Token consolidation audit

**Date:** 2026-07-10  
**Branch:** `audit-agent-workflows` (local only — not pushed)  
**Scope:** `assets/tokens.css` + `tokens.json` vs production consumers (`assets/style.css`, `assets/main.js`, `index.html`, `case-*.html`)  
**Mode:** analysis only — no code changes

## Input → finding → outcome

| Stage | Detail |
|-------|--------|
| **Input** | 119 unique CSS custom properties in `assets/tokens.css`; 146 leaf entries in `tokens.json`; production stylesheet already consuming the token architecture (not a pure dead-file proposal). |
| **Finding** | Most identical resolved values are **intentional layering** (primitive → semantic), **cross-axis collisions** (e.g. `12px` as both `--space-3` and `--text-2xs`), or **dual semantic roles** (`--color-inverse-*`). Real redundancy is concentrated in the **warm-alt placeholder pair** and an optional **19px type step**. |
| **Outcome** | If every **recommended** merge is accepted: **drop 5 tokens** (119 → 114). Layered primitive/semantic pairs are **not** counted as droppable. |

## Method

1. Parse every `--token` definition (including dark-theme overrides).
2. Resolve `var()` chains to a light-mode concrete value.
3. Group exact matches; compute ΔE for near-identical hex colors; flag ±1px type/spacing neighbors.
4. Score usage via `var(--token)` counts in production files + reverse alias graph from `tokens.css`.
5. **Do not** recommend merging across axes (space vs type vs radius) or collapsing the primitive/semantic split.

## Headline number

### **5 tokens could be dropped** if every recommended merge were accepted

- Before: **119** CSS tokens
- After (recommended): **114**
- Drop list: `--color-placeholder-1-alt`, `--color-placeholder-2-alt`, `--placeholder-warm-alt-1`, `--placeholder-warm-alt-2`, `--text-2xl`

## Consolidation table

| Proposed canonical | Tokens to merge into it | Resolved values | Usages | Recommendation |
|--------------------|-------------------------|-----------------|--------|----------------|
| `--placeholder-warm-1` | `--placeholder-warm-alt-1` | #e4e1d8 / #e3ded1 (ΔE≈2.43) | --placeholder-warm-1: prod=0 alias→['--color-placeholder-1'] | --placeholder-warm-alt-1: prod=0 alias→['--color-placeholder-1-alt'] | MERGE: alt pair is within ΔE=2.43 of primary warm preset. Collapse alt into primary (and drop --color-placeholder-*-alt if accepted). Conservative map previously kept alt for pixel-exact template cards — confirm with design. |
| `--placeholder-warm-2` | `--placeholder-warm-alt-2` | #c9c4b3 / #c7c0ac (ΔE≈2.27) | --placeholder-warm-2: prod=0 alias→['--color-placeholder-2'] | --placeholder-warm-alt-2: prod=0 alias→['--color-placeholder-2-alt'] | MERGE: alt pair is within ΔE=2.27 of primary warm preset. Collapse alt into primary (and drop --color-placeholder-*-alt if accepted). Conservative map previously kept alt for pixel-exact template cards — confirm with design. |
| `--color-placeholder-1` | `--color-placeholder-1-alt` | #e4e1d8 / #e3ded1 | --color-placeholder-1: prod=3 | --color-placeholder-1-alt: prod=2 | MERGE if primitive warm-alt merges accepted; otherwise KEEP as semantic twin of alt ramp. |
| `--color-placeholder-2` | `--color-placeholder-2-alt` | #c9c4b3 / #c7c0ac | --color-placeholder-2: prod=3 | --color-placeholder-2-alt: prod=2 | MERGE if primitive warm-alt merges accepted; otherwise KEEP as semantic twin of alt ramp. |
| `--text-3xl` | `--text-2xl` | 19px / 20px (1px) | --text-2xl: prod=1 | --text-3xl: prod=2 | OPTIONAL MERGE: 19px is an awkward half-step. Prefer --text-3xl (20px) or --text-xl (18px). Low usage on 2xl. |
| (none — keep both) | `--layout-section-90`, `--layout-section-mobile` | 90px / 96px | 90: prod=4 | mobile: prod=1 | DO NOT MERGE. 90px desktop subhero vs 96px mobile section rhythm are deliberate breakpoints, not redundancy. |

## Semantic same-value flags (not automatic merges)

| Tokens | Resolved (light) | Recommendation |
|--------|------------------|----------------|
| ['--color-inverse-bg → --color-text', '--color-inverse-text → --color-bg', '--color-placeholder-accent → --white/--color-bg'] | inverse-bg=#0f0f0f, text=#0f0f0f; inverse-text=#ffffff, bg=#ffffff; placeholder-accent=#ffffff | FLAG only — NOT a merge. File comments document dual roles (button surface vs reading text). KEEP separate semantic names; they coincide in both themes today. |

Also same-value in light mode by construction (primitive ↔ semantic) — **keep**:

| Semantic | Primitive | Value |
|----------|-----------|-------|
| `--color-bg` | `--neutral-light-50` | `#ffffff` |
| `--color-surface` | `--neutral-light-100` | `#f3f2ee` |
| `--color-border` | `--neutral-light-200` | `#e8e7e2` |
| `--color-text` | `--neutral-light-900` | `#0f0f0f` |
| `--color-text-secondary` | `--neutral-light-700` | `#4a4a48` |
| `--color-text-muted` | `--neutral-light-500` | `#8a8a86` |
| `--color-accent` | `--accent-light` | `#ff4d1f` |
| `--color-success` | `--success` | `#33b25a` |
| `--color-warning` | `--warning` | `#f5c443` |

## Cross-axis collisions (do not merge)

| Value | Tokens | Why keep both |
|-------|--------|---------------|
| `12px` | `--space-3`, `--text-2xs` | Spacing step vs type step |
| `16px` | `--space-4`, `--text-base` | Spacing vs body size |
| `18px` | `--radius-md`, `--text-xl` | Radius vs type |
| `20px` | `--space-5`, `--text-3xl` | Spacing vs type |

## Near-color notes (ΔE < 5) — review, mostly intentional ramps

| Pair | Values | ΔE | Note |
|------|--------|-----|------|
| warm-1 vs warm-alt-1 | `#e4e1d8` / `#e3ded1` | ~2.4 | **Merge candidate** (see table) |
| warm-2 vs warm-alt-2 | `#c9c4b3` / `#c7c0ac` | ~2.3 | **Merge candidate** |
| light-500 vs dark-500 | `#8a8a86` / `#8f8f8c` | ~2.0 | Separate theme ramps — keep |
| light-900 vs dark-900 | `#0f0f0f` / `#111113` | ~1.5 | Separate theme ramps — keep |
| border vs cool-1 | `#e8e7e2` / `#dfe3e0` | ~2.7 | Different roles — keep |

## Decision log (for case study)

- Agent finds mechanical redundancy; **which names share a meaning** stays a design call.
- Conservative prior art in `migration-map.md` already declined merging warm-alt for template fidelity — this audit re-surfaces that choice with usage counts.

