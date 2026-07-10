# Agent workflows — case study record

**Date:** 2026-07-10  
**Repo:** `portfolio`  
**Branch:** `audit-agent-workflows` (not pushed)  
**Figma:** DC — test (`YBFqjkfuZSdRLuPjnv5dUC`), variables export from Downloads

## Narrative

> Built the site fast with AI. It shipped and looked right, but had no system underneath — the kind of drift that comes from generating each section in isolation. So I built the missing layer: tokens, a component library, and a set of agent-run audits to keep code and design honest. Consolidation could drop **5** redundant tokens if accepted. Cleanup found **3** directly-dead and **0** transitively-dead tokens. The drift audit found **117 of 118** tokens in sync between code and Figma, with one code-only token (`--color-placeholder-accent`) — closed the same day by adding it to Figma, bringing the system to **118 of 118**. The agent is fast at the mechanical parts; deciding which values are the same thing wearing different names stayed a design decision.

## Files

| Workflow | Output | Headline |
|----------|--------|----------|
| 1 — Token consolidation | [`consolidation-audit.md`](./consolidation-audit.md) | Drop **5** if merges accepted (119 → 114) |
| 2 — Dead token cleanup | [`dead-tokens.md`](./dead-tokens.md) | **3** direct-dead, **0** transitive-dead |
| 3 — Code↔design drift | [`drift-report.md`](./drift-report.md) | **117 of 118** found → **118 of 118** same day |

## Raw input / finding / outcome (verbatim per workflow)

See each report’s opening table. No production CSS/HTML was modified; reports only.

