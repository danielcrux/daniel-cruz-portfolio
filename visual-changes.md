# Visual changes from the tokens.css refactor

Tracks every place where adopting a token produced (or could produce) a
rendered difference from the pre-refactor site. Two kinds of entries:

- **Já decidido (aplicado)** — changes already resolved conservatively and
  documented in `migration-map.md`, approved via the `tokens-preview.html`
  review. Applied in this refactor; listed here for traceability, not
  waiting on a decision.
- **Pendente de decisão** — new discoveries made *during* the actual
  refactor (not anticipated in `migration-map.md`) where adopting a token
  would change something. **Not applied.** Left as their original hardcoded
  value until you decide.

---

## Já decidido (aplicado)

| # | O que mudou | Antes | Depois | Onde | Referência |
|---|---|---|---|---|---|
| 1 | Verde da tag "Solution" | `#43bd68` | `#33b25a` (`--color-success`) | `.compare-tag.solution` (case-pro2col.html) | migration-map.md §1.4 |

---

## Pendente de decisão

### 1. Hero-glow — cor sempre clara, mesmo no dark mode

**Onde:** `.hero-glow` em `assets/style.css` (glow radial atrás do título do hero).
**Hoje:** `rgba(255,77,31,.08)` hardcoded — é literalmente `--accent-light` em
rgba, mas **não muda de tom no dark mode** porque nunca foi escrito com
`var()`.
**Se eu tokenizasse:** `background: radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 60%)` (ou equivalente) faria o glow acompanhar `--color-accent`, que no dark mode é `#ff6a3d` em vez de `#ff4d1f`.
**Por que não apliquei:** é uma mudança real de matiz no dark mode, ainda que sutil (glow desfocado a 8% de opacidade). Deixei o valor exatamente como estava.
**Decisão pendente:** quer que o glow acompanhe o accent do tema (ligeiramente mais alaranjado/quente no dark mode), ou prefere manter sempre a cor do accent light, como é hoje?

---

*(Seções de tipografia, espaçamento e motion serão adicionadas conforme o refactor avança.)*
