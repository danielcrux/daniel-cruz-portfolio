# Dead token cleanup

**Date:** 2026-07-10  
**Branch:** `audit-agent-workflows` (local only — not pushed)  
**Mode:** analysis only — no deletions

## Input → finding → outcome

| Stage | Detail |
|-------|--------|
| **Input** | 119 tokens defined in `assets/tokens.css` (mirrored in `tokens.json`). Production consumers: `assets/style.css`, `assets/main.js`, site HTML. Definition files and `tokens-preview.html` excluded from “live” reference counts. |
| **Finding** | The token system is largely wired: most primitives with zero direct `var()` calls are still **alive via semantic aliases** (including dark-theme overrides). Only a small set has **no production reference and no alias inbound**. |
| **Outcome** | **3 directly-dead**, **0 transitively-dead**. Safe-to-remove candidates listed below — confirm shadow/effect handling before deleting `--shadow-elevated-offset`. |

## Method

1. Parse every token name from `assets/tokens.css`.
2. Grep production CSS/JS/HTML for `var(--name)` (plus `u-case-subhero-pt` → `--layout-section-90`).
3. Build reverse alias graph from **all** definitions, including `html[data-theme="dark"]` overrides (critical: light-only parse would false-flag every `--neutral-dark-*` as dead).
4. **Direct-dead:** zero production refs and zero inbound aliases.
5. **Transitively-dead:** only referenced by other tokens that are themselves unused end-to-end.

## Headline counts

| Class | Count |
|-------|------:|
| Defined (CSS unique names) | 119 |
| Directly referenced in production | 93 |
| Alive only via alias chain | 23 |
| **Directly-dead** | **3** |
| **Transitively-dead** | **0** |

## Dead token table

| Token name | Defined in | Production refs | Alias inbound | Class | Safe to remove? |
|------------|------------|----------------:|---------------|-------|-----------------|
| `--a-08` | `assets/tokens.css` (+ `tokens.json`) | 0 | — | **direct-dead** | **Yes, with caveats** — value `.08`. Appears in `tokens-preview.html` only as documentation. |
| `--shadow-elevated-offset` | `assets/tokens.css` (+ `tokens.json`) | 0 | — | **direct-dead** | **Yes, with caveats** — value `0 18px 40px`. Appears in `tokens-preview.html` only as documentation. |
| `--tracking-normal` | `assets/tokens.css` (+ `tokens.json`) | 0 | — | **direct-dead** | **Yes, with caveats** — value `0`. Appears in `tokens-preview.html` only as documentation. |

### Caveats on the direct-dead set

| Token | Why it might still earn a keep |
|-------|--------------------------------|
| `--shadow-elevated-offset` | Composite `0 18px 40px` intended for `box-shadow` with `--color-shadow`. If production inlines the offset, the token is dead **in code** but still the documented system value; Figma models this as **Effect Styles** (`shadow/elevated`), not a variable. |
| `--a-08` | Reserved alpha step from the audit scale; unused overlay today. Keep if you want a complete opacity ladder; remove if you only ship used steps. |
| `--tracking-normal` | Explicit `0` tracking. Components may rely on browser default instead. Keep for completeness of the tracking scale; remove if you only want non-zero steps. |

## Not dead — alias-only primitives (common false positive)

These have **0** direct production `var()` calls but are referenced by semantic tokens that **are** used (including dark mode). **Do not delete.**

| Token | Aliased by |
|-------|------------|
| `--a-35` | `--color-shadow` |
| `--a-70` | `--color-header-bg` |
| `--accent-dark` | `--color-accent` |
| `--accent-light` | `--color-accent` |
| `--neutral-dark-300` | `--color-text-secondary` |
| `--neutral-dark-50` | `--color-text` |
| `--neutral-dark-500` | `--color-text-muted` |
| `--neutral-dark-700` | `--color-border` |
| `--neutral-dark-800` | `--color-surface` |
| `--neutral-dark-900` | `--color-bg` |
| `--neutral-light-100` | `--color-surface` |
| `--neutral-light-200` | `--color-border` |
| `--neutral-light-50` | `--color-bg` |
| `--neutral-light-500` | `--color-text-muted` |
| `--neutral-light-700` | `--color-text-secondary` |
| `--placeholder-warm-1` | `--color-placeholder-1` |
| `--placeholder-warm-2` | `--color-placeholder-2` |
| `--placeholder-warm-alt-1` | `--color-placeholder-1-alt` |
| `--placeholder-warm-alt-2` | `--color-placeholder-2-alt` |
| `--success` | `--color-success` |
| `--success-ink` | `--color-success-ink` |
| `--warning` | `--color-warning` |
| `--warning-ink` | `--color-warning-ink` |

## Decision log

- Directly-dead: **3**
- Transitively-dead: **0**
- No code deleted in this pass.

