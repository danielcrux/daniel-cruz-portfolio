# Code ↔ design drift report

**Date:** 2026-07-10 (audit run) · **updated 2026-07-10** — gap closed same day  
**Branch:** `audit-agent-workflows` (local only — not pushed)  
**Code sources:** `assets/tokens.css`, `tokens.json`  
**Figma source:** `~/Downloads/figma-variables-export.json` (126 variables at audit time, 127 after the fix below)  
**Figma file:** [DC — test](https://www.figma.com/design/YBFqjkfuZSdRLuPjnv5dUC/DC---test?node-id=48-18982) (`YBFqjkfuZSdRLuPjnv5dUC`)

## Same-day fix

The audit below originally found one code-only token: `--color-placeholder-accent`, present in `assets/tokens.css` with no Figma counterpart. Rather than leave it as a standing gap, `--color-placeholder-accent` was added to the Figma file as a **Semantic** variable, aliased to `base/white`, matching in both **Light** and **Dark** modes — exactly how it already behaved in code (no dark-theme override). The loop closes same-day, not just gets described:

### **118 of 118 tokens in sync**

## Input → finding → outcome

| Stage | Detail |
|-------|--------|
| **Input** | CSS: 119 custom properties (118 evaluated against Figma; `--shadow-elevated-offset` is an architectural exception, see below). Figma export: 126 variables across collections `Primitives` (Value mode) and `Semantic` (Light/Dark). |
| **Finding** | Naming differs (`--color-bg` vs `bg`, `--text-sm` vs `font/size/static/sm`) but maps cleanly. Fluid type is `clamp()` in CSS vs **min/max FLOAT pairs** in Figma. Composite shadow is an **Effect Style**, not a variable. One code-only token found: `--color-placeholder-accent`. |
| **Outcome** | **118 of 118** code tokens in sync with Figma after normalization and the same-day fix. Genuine mismatches: **0**. Code-only: **0**. Figma-only: **0**. |

## Normalization rules applied (not drift)

- CSS units (`16px`, `-0.02em`, `300ms`) ↔ Figma unitless numbers
- CSS font stacks ↔ Figma primary family only (`General Sans`, `SF Mono`)
- CSS `cubic-bezier(.16,1,.3,1)` ↔ Figma easing string
- CSS `--kebab` / Figma `slash/paths` / semantic short names (`bg`, `text`)
- Figma float noise (`0.079999…` → `0.08`)
- Fluid: one CSS token ↔ two Figma variables (`*-min`, `*-max`)

## Headline number

### **118 of 118 tokens in sync**

| Metric | Count |
|--------|------:|
| Code tokens evaluated | 118 |
| Exact matches (normalized) | 118 |
| Genuine mismatches | 0 |
| Tokens only in code | 0 (was 1 — closed same day) |
| Tokens only in Figma | 0 |
| Figma variables in export | 126 at audit time → 127 after the fix |
| Architectural exceptions | 1 |

## Genuine mismatches

_None — all paired tokens match after normalization._

### Normalized matches that looked like mismatches at first glance

These hit the workflow’s “not drift” rules and are counted as **exact matches**:

| Code token | Code form | Figma form | Rule |
|------------|-----------|------------|------|
| `--font-body` | full fallback stack | `General Sans` | primary family only |
| `--font-mono` | full fallback stack | `SF Mono` | primary family only |
| `--color-header-bg` | `rgba(255,255,255, var(--a-70))` | `#ffffffb3` | same white @ 70% — encoding only |
| `--color-shadow` | `rgba(15,15,15, var(--a-10))` | `#0f0f0f1a` | same ink @ 10% — encoding only |

## Tokens only in code

_None — `--color-placeholder-accent` was the one gap; closed same day (see above)._

| Code token | Resolved value | Figma resolution |
|------------|----------------|------------------------|
| `--color-placeholder-accent` | `#ffffff` | Added as Semantic variable, aliased to `base/white` — matches in Light and Dark |

## Tokens only in Figma

_None — every Figma variable maps to a code token (including fluid min/max splits)._

## Architectural exceptions (not drift)

| Item | Notes |
|------|-------|
| `--shadow-elevated-offset` = `0 18px 40px` | Composite shadow offset/blur — lives as Effect Style (shadow/elevated, shadow/elevated-dark) in Figma, not a Variable. Not counted as drift. |
| Fluid type (`--font-fluid-*`) | CSS `clamp()` cannot be a single Figma variable; export uses min/max FLOAT pairs — treated as match when both endpoints agree. |
| Semantic Light/Dark modes | Figma Semantic collection modes mirror `html[data-theme]`; comparison used Light + resolved aliases for value checks. |
| Composite overlays (`--color-header-bg`, `--color-shadow`) | CSS uses `rgba(..., var(--a-*))`; Figma stores pre-flattened 8-digit hex — compared on resolved RGB/alpha intent. |

## Sample of matches (representative)

| Code | Figma | Value |
|------|-------|-------|
| `--neutral-light-50` | `color/neutral/light/50` | #ffffff ≈ #ffffff |
| `--neutral-light-100` | `color/neutral/light/100` | #f3f2ee ≈ #f3f2ee |
| `--neutral-light-200` | `color/neutral/light/200` | #e8e7e2 ≈ #e8e7e2 |
| `--neutral-light-500` | `color/neutral/light/500` | #8a8a86 ≈ #8a8a86 |
| `--neutral-light-700` | `color/neutral/light/700` | #4a4a48 ≈ #4a4a48 |
| `--neutral-light-900` | `color/neutral/light/900` | #0f0f0f ≈ #0f0f0f |
| `--neutral-dark-50` | `color/neutral/dark/50` | #f5f4f2 ≈ #f5f4f2 |
| `--neutral-dark-300` | `color/neutral/dark/300` | #c7c6c2 ≈ #c7c6c2 |
| `--neutral-dark-500` | `color/neutral/dark/500` | #8f8f8c ≈ #8f8f8c |
| `--neutral-dark-700` | `color/neutral/dark/700` | #2b2b2c ≈ #2b2b2c |
| `--neutral-dark-800` | `color/neutral/dark/800` | #1b1b1d ≈ #1b1b1d |
| `--neutral-dark-900` | `color/neutral/dark/900` | #111113 ≈ #111113 |
| `--black` | `color/base/black` | #000000 ≈ #000000 |
| `--white` | `color/base/white` | #ffffff ≈ #ffffff |
| `--accent-light` | `color/brand/accent/light` | #ff4d1f ≈ #ff4d1f |
| `--accent-dark` | `color/brand/accent/dark` | #ff6a3d ≈ #ff6a3d |
| `--success` | `color/brand/success` | #33b25a ≈ #33b25a |
| `--success-ink` | `color/brand/success-ink` | #04310f ≈ #04310f |
| `--warning` | `color/brand/warning` | #f5c443 ≈ #f5c443 |
| `--warning-ink` | `color/brand/warning-ink` | #3d3000 ≈ #3d3000 |
| `--placeholder-warm-1` | `color/placeholder/warm-1` | #e4e1d8 ≈ #e4e1d8 |
| `--placeholder-warm-2` | `color/placeholder/warm-2` | #c9c4b3 ≈ #c9c4b3 |
| `--placeholder-warm-alt-1` | `color/placeholder/warm-alt-1` | #e3ded1 ≈ #e3ded1 |
| `--placeholder-warm-alt-2` | `color/placeholder/warm-alt-2` | #c7c0ac ≈ #c7c0ac |
| `--placeholder-cool-1` | `color/placeholder/cool-1` | #dfe3e0 ≈ #dfe3e0 |
| `--color-placeholder-accent` | `color/semantic/placeholder-accent` | #ffffff ≈ #ffffff (added same day, Light + Dark) |
| … | _87 more matches_ | |

## Decision log

- In sync: **118/118** code tokens
- Mismatches requiring human review: **0**
- Code-only gaps: **0** — the one found (`--color-placeholder-accent`) was added to Figma the same day, not left as a standing exception
- Figma-only extras: **0**
