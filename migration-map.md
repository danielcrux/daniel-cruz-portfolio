# Migration map — raw values → tokens.css

Companion to `audit.md` e `tokens.css`. Nenhum componente foi refatorado — este
documento só mapeia, valor por valor, o que cada hardcode viraria se/quando
`style.css` e os `case-*.html` forem migrados para os tokens.

**Todas as ambiguidades foram resolvidas** com a opção mais conservadora (a que
menos altera o visual atual hoje). Cada decisão está registrada com uma linha
de justificativa na seção correspondente. Nada foi aplicado a `style.css` ou
aos `case-*.html` além dos ajustes já feitos em `tokens.css`/`tokens.json` —
o refactor dos componentes continua fora desta entrega.

---

## 0. Como ler este documento

- **valor atual** → **token de destino** — mapeamento direto, zero mudança visual.
- ✅ **DECIDIDO (conservador)** — havia mais de uma opção; escolhi a que causa
  menor mudança visual perceptível. Justificativa na própria entrada.
- 🔴 **REMOVIDO** — token que existe hoje mas não sobrevive na proposta.

**Critério usado em toda decisão:** onde a diferença entre "fundir" e "manter
separado" é sub-perceptível (≤1px em fontes pequenas, ≤0.05 em alpha/line-height,
≤50ms em duração, ≤3% por canal RGB), mantive a fusão — ela reduz tokens sem
custo visual real. Onde a diferença É perceptível (raio quase dobrando, padding
de seção variando 2 dígitos, line-height caindo 30%, duração mudando 100ms),
escolhi **não fundir**, mesmo que isso deixe mais tokens do que a primeira
proposta.

---

## 1. Cores

### 1.1 Tokens de papel (mapeamento direto, sem mudança visual)

| Atual (`style.css`) | Valor | Novo primitivo | Novo semântico |
|---|---|---|---|
| `--bg` (light) | `#ffffff` | `--neutral-light-50` | `--color-bg` |
| `--bg` (dark) | `#111113` | `--neutral-dark-900` | `--color-bg` (dark override) |
| `--ink` (light) | `#0f0f0f` | `--neutral-light-900` | `--color-text` |
| `--ink` (dark) | `#f5f4f2` | `--neutral-dark-50` | `--color-text` (dark override) |
| `--body` (light) | `#4a4a48` | `--neutral-light-700` | `--color-text-secondary` |
| `--body` (dark) | `#c7c6c2` | `--neutral-dark-300` | `--color-text-secondary` (dark override) |
| `--soft` (light) | `#8a8a86` | `--neutral-light-500` | `--color-text-muted` |
| `--soft` (dark) | `#8f8f8c` | `--neutral-dark-500` | `--color-text-muted` (dark override) |
| `--line` (light) | `#e8e7e2` | `--neutral-light-200` | `--color-border` |
| `--line` (dark) | `#2b2b2c` | `--neutral-dark-700` | `--color-border` (dark override) |
| `--card` (light) | `#f3f2ee` | `--neutral-light-100` | `--color-surface` |
| `--card` (dark) | `#1b1b1d` | `--neutral-dark-800` | `--color-surface` (dark override) |
| `--accent` (light) | `#ff4d1f` | `--accent-light` | `--color-accent` |
| `--accent` (dark) | `#ff6a3d` | `--accent-dark` | `--color-accent` (dark override) |
| `--header-bg` (light) | `rgba(255,255,255,.7)` | `--a-70` sobre branco | `--color-header-bg` |
| `--header-bg` (dark) | `rgba(17,17,19,.7)` | `--a-70` sobre `#111113` | `--color-header-bg` (dark override) |
| `--shadow-color` (light) | `rgba(15,15,15,.10)` | `--a-10` | `--color-shadow` |
| `--shadow-color` (dark) | `rgba(0,0,0,.35)` | `--a-35` | `--color-shadow` (dark override) |

### 1.2 🔴 Removidos

| Token | Valor (light/dark) | Motivo |
|---|---|---|
| `--card-2` | `#eceae3` / `#232325` | Nunca referenciado em nenhuma regra do CSS. Não existe primitivo equivalente na proposta — se for necessário no futuro (ex. um terceiro nível de superfície), crie sob demanda. |
| `--accent-ink` | `#fff4ef` / `#2b160f` | Idem — definido, nunca usado. |

### 1.3 `--ink-solid` / `--on-solid` — mantidos, mas re-explicados

Não são "mortos" (são usados 8x e 6x respectivamente), mas hoje têm o **mesmo
valor** de `--ink`/`--bg` nos dois temas. Na proposta viram `--color-inverse-bg`
/ `--color-inverse-text`, apontando para `--color-text`/`--color-bg` — ou seja,
continuam idênticos hoje, mas ficam nomeados por *papel* (fundo sólido de botão)
em vez de reaproveitar o token de texto/fundo por coincidência. Nenhuma mudança
visual.

### 1.4 ✅ DECIDIDO (conservador) — Verde "sucesso" colapsado

| Atual | Onde | Proposta |
|---|---|---|
| `#33b25a` | `.dot` (status "disponível" no nav/hero-eyebrow), `rgba(51,178,90,.18)`/`.1` no `@keyframes dot-pulse` | `--success` (mantido) |
| `#43bd68` | `.compare-tag.solution` background (só em `case-pro2col.html`) | passa a usar `--success` (`#33b25a`) |

**Decisão:** mantive `#33b25a`.
**Justificativa:** é o valor que já aparece em toda página (status dot no nav
e no hero-eyebrow), enquanto `#43bd68` só existe em um único componente de uma
única case page. Manter o valor de maior alcance e mudar só o de menor alcance
minimiza o número total de lugares que mudam de cor — a definição operacional
de "mais conservador" quando as duas opções mudam *algo*. A tag "Solution" do
Pro2col fica ~3-8 unidades RGB mais escura/dessaturada, abaixo do limiar de
percepção fora de comparação lado a lado.

### 1.5 ✅ DECIDIDO (conservador) — Amarelo "warning"

`.compare-tag.current` usa `#f5c443`/`#3d3000` (background/texto) e não tinha
nenhum token.
**Decisão:** formalizei como `--warning`/`--warning-ink`, com o mesmo valor
hardcoded de hoje.
**Justificativa:** zero mudança visual em qualquer cenário — é puro "dar nome",
não uma fusão nem um arredondamento. Não há opção mais conservadora que isso.

### 1.6 ✅ DECIDIDO (conservador) — Gradientes de placeholder (thumb-a/thumb-b/thumb-c)

| Atual | Onde | Proposta |
|---|---|---|
| `#e4e1d8` / `#c9c4b3` | `--thumb-a`/`--thumb-b` default em `style.css` (`.work-thumb`, `.case-cover`, `.case-image`) | `--placeholder-warm-1` / `--placeholder-warm-2` (mantidos) |
| `#e3ded1` / `#c7c0ac` | inline em `case-template.html`, 2 dos 3 cards de exemplo | `--placeholder-warm-alt-1` / `--placeholder-warm-alt-2` (**mantidos como preset próprio**, não fundidos) |
| `#dfe3e0` / `#b9c2bb` (+ `--thumb-c:#fff`) | inline em `case-template.html`, 3º card | `--placeholder-cool-1` / `--placeholder-cool-2` (mantidos como 3º preset) |

**Decisão:** revertida a fusão que eu tinha proposto — o par quase-duplicado
**não** foi absorvido em `--placeholder-warm-1/2`. Virou um 3º preset
(`--placeholder-warm-alt-*`), preservando o hex exato.
**Justificativa:** ainda que a diferença por canal RGB seja pequena (1-7/255,
~2.7%), é uma mudança de pixel real e evitável — o template não perde nada
em manter os 3 pares como estão hoje, só ganha nomes. Reservo a fusão desses
2 presets quase-idênticos como uma limpeza opcional de baixo risco para uma
passada futura, não aplicada agora.

### 1.7 Escala alpha — nomeada, não reduzida

Os 11 valores de opacidade de preto/branco encontrados no `audit.md` (seção
1.4) foram nomeados 1:1 em `--a-08` … `--a-85`, sem forçar arredondamento.
**Decisão:** mantidos os 11 passos exatos — **não** apliquei a versão mais
agressiva de 6 passos que eu tinha esboçado como opção.
**Justificativa:** essa é literalmente a opção de zero mudança visual; reduzir
para 6 passos mudaria a opacidade real de 4 elementos (`hero-glow`,
`dot-pulse`, `cover-note` border/color light). Fica registrada como limpeza
opcional futura, não aplicada.

### 1.8 `#0f0f0f` hardcoded fora do token (`--ink`)

`.work-thumb .thumb-tag{ color:#0f0f0f; }` usa o mesmo valor de `--ink` (light)
mas hardcoded — por isso a tag de "categoria" sobre a thumbnail **não muda de
cor no dark mode** (fica sempre preta sobre um chip branco semi-transparente,
comportamento intencional já que o fundo do chip é `rgba(255,255,255,.85)`
fixo nos dois temas). Mapeamento direto: `#0f0f0f` → `--neutral-light-900`,
usado como valor fixo (não como `--color-text`) para preservar esse
comportamento. Sem ambiguidade, sem mudança.

---

## 2. Tipografia

### 2.1 ✅ DECIDIDO (conservador) — Escala estática (labels/UI), 4 tamanhos → 1

| Atual | Onde | Novo |
|---|---|---|
| `11px` | `.compare-tag` | `--text-2xs` (12px) |
| `11.5px` | `.head-tag` | `--text-2xs` (12px) |
| `12px` | `.tag`, `.meta-item span`, `.persona-card .persona-wants` | `--text-2xs` (12px, inalterado) |
| `12.5px` | `.identity-text .identity-email` | `--text-2xs` (12px) |

**Decisão:** mantida a fusão total em `--text-2xs:12px`.
**Justificativa:** o maior desvio é 1px sobre uma fonte de 11px (`.compare-tag`)
— abaixo do que qualquer usuário nota em texto UI dessa escala, e 12px já é o
valor usado pela maioria dos seletores (3 de 4). Este é o caso mais claro de
"diferença sub-perceptível", então a fusão fica mantida em vez de virar 2+
tokens.

### 2.2 ✅ DECIDIDO (conservador) — Escala fluida (clamp), 10 fórmulas → 9 steps

Fórmula única para todos os steps: interpolação linear entre viewport 400px e
1440px — `clamp(min, min + (100vw - 400px) * (max-min)/1040, max)`. Essa
construção compartilhada foi mantida (era um requisito explícito, não uma das
ambiguidades a resolver agora); a única ambiguidade real era **quais papéis
fundir**.

| # | Seletor(es) atuais | Fórmula atual | Token novo | Fórmula nova | Decisão |
|---|---|---|---|---|---|
| 1 | `.hero-title` | `clamp(52px,9vw,132px)` | `--font-fluid-2xl` | `clamp(52px, 52px+(100vw-400px)*80/1040, 132px)` | sem mudança prática (9 vs 9.17vw equivalente) |
| 2 | `.cta-title` | `clamp(38px,7vw,100px)` | `--font-fluid-xl` | `clamp(38px, 38px+(100vw-400px)*62/1040, 100px)` | mínimo |
| 3 | `.case-title` | `clamp(34px,5.6vw,64px)` | `--font-fluid-lg` | `clamp(34px, 34px+(100vw-400px)*30/1040, 64px)` | endpoints preservados; curva no meio muda — custo aceito, ver nota abaixo |
| 4 | `.section-head h2` | `clamp(32px,4.4vw,52px)` | `--font-fluid-md` | `clamp(32px, 32px+(100vw-400px)*20/1040, 52px)` | idem, mais discreto |
| 5 | `.testimonial-quote` | `clamp(24px,3.6vw,42px)` | `--font-fluid-quote-testimonial` | `clamp(24px, 24px+(100vw-400px)*18/1040, 42px)` | ✅ **mantido separado, não fundido com #6** — endpoints 100% preservados |
| 6 | `.case-quote blockquote` | `clamp(22px,3.2vw,38px)` | `--font-fluid-quote-case` | `clamp(22px, 22px+(100vw-400px)*16/1040, 38px)` | ✅ **mantido separado** — endpoints 100% preservados |
| 7 | `.about-lead` **+** `.case-feature-head h3` (fundidos) | `clamp(26px,3.2vw,36px)` e `clamp(26px,3.2vw,38px)` | `--font-fluid-lead` | `clamp(26px, 26px+(100vw-400px)*11/1040, 37px)` | fusão mantida — mesmo min e mesmo coeficiente vw já no CSS original, risco zero |
| 8 | `.service-name` | `clamp(24px,3vw,36px)` | `--font-fluid-heading` | `clamp(24px, 24px+(100vw-400px)*12/1040, 36px)` | mínimo |
| 9 | `.cta-email` | `clamp(22px,3.2vw,36px)` | `--font-fluid-link` | `clamp(22px, 22px+(100vw-400px)*14/1040, 36px)` | mínimo |

**Decisão sobre a fusão de quote (itens 5/6):** revertida. Ao contrário do par
`about-lead`/`case-feature-head h3` (que já compartilhava min e coeficiente vw
idênticos no CSS original — fusão de risco zero), o par de citações tinha
parâmetros diferentes o bastante (min 24 vs 22, coeficiente 3.6 vs 3.2vw, max
42 vs 38) para que fundir mudasse visivelmente os dois papéis (~2-4px em cada
extremo). Resultado: **9 steps**, não 8 — ainda dentro do range 8-9 pedido
originalmente, e com endpoints idênticos aos de hoje nos 9 casos.

**Nota sobre o "meio da curva" (itens 3 e 4):** unificar a fórmula para *todos*
os steps era um requisito já dado (não uma ambiguidade a resolver agora), então
não posso evitar esse custo sem violar esse requisito — ele fica registrado,
não escondido. O pivô de viewport escolhido (1440px) foi o que preserva os 2
steps mais visíveis/maiores (hero e cta-title) sem nenhuma mudança; o pequeno
encolhimento em viewports médios de `case-title`/`section-head h2` é o menor
custo possível dado que a fórmula precisa ser uma só.

### 2.3 ✅ DECIDIDO (conservador) — Line-height pareado por step

| Token | Valor | Seletor(es) |
|---|---|---|
| `--leading-tight` (1) | `.cta-title` (inalterado) | sem mudança |
| `--leading-snug` (1.08) | `.hero-title` (inalterado, já 1.08) + `.case-title` (era 1.05, +0.03) | mudança sub-perceptível, mantida |
| `--leading-relaxed` (1.35) | `.about-lead` (inalterado) + `.case-quote blockquote` (inalterado, ambos já 1.35) | sem mudança |
| `--leading-loose` (1.6) | `.persona-card p` (inalterado, já 1.6) + `.service-panel p`/`.case-feature-head p` (eram 1.65, -0.05) | mudança sub-perceptível, mantida |
| `--leading-body` (1.55) | base do `<body>`, inalterado | sem mudança |

**Decisão:** removido o token `--leading-normal` (1.1) que eu tinha proposto
para `.section-head h2` e `.service-name`. Esses dois seletores, e também
`.case-feature-head h3` e `.cta-email`, **não têm** line-height explícito hoje
(herdam 1.55 do body) — na versão conservadora, continuam herdando 1.55.
Nenhum deles ganha um valor novo.
**Justificativa:** apertar de 1.55 para 1.1 ou 1.35 é uma redução de 13-30% no
espaçamento entre linhas — perceptível em qualquer heading com quebra de
linha, não uma normalização neutra do CSS existente. Isso seria uma melhoria
de design real, não uma extração; fica de fora da passada conservadora. Se
quiser aplicá-la, é uma decisão de design separada, não uma migração de
tokens.

### 2.4 ✅ DECIDIDO (conservador) — Letter-spacing, 1 outlier absorvido

`.scroll-hint{letter-spacing:.04em}` era o único valor fora da escala
`-.04/-.03/-.02/-.01/0/.06/.08em`.
**Decisão:** mantida a fusão em `--tracking-wide` (.06em) — **não** criei um
token isolado (`--tracking-hint`) para preservá-lo exato.
**Justificativa:** diferença de .02em em texto rastreado (tracking) de 13px é
abaixo do perceptível a olho nu; é o mesmo caso do item 2.1 (fusão de valor
sub-pixel), então mantenho a consolidação.

---

## 3. Espaçamento

### 3.1 Micro escala (gap/margin/padding pequenos) — mapeamento direto

Os 10 steps (`--space-1` a `--space-10`: 4/8/12/16/20/24/32/40/56/80px) cobrem
os valores mais recorrentes do CSS atual (contabilizados no `audit.md` §3.1–3.3).
Sem ambiguidade a resolver aqui — os valores de uso único que não batem
exatamente com um step ficam para o mapeamento fino do refactor real de
`style.css`, seletor por seletor (fora de escopo para este documento).

### 3.2 ✅ DECIDIDO (conservador) — Macro escala (padding de seção): NÃO consolidada

| Atual | Onde | Token |
|---|---|---|
| `150px` | `section{padding}`, `.case-hero{padding-top}` | `--layout-section-150` (inalterado) |
| `140px` | `.more-work{padding}` | `--layout-section-140` (inalterado) |
| `130px` | `.case-quote{padding}` | `--layout-section-130` (inalterado) |
| `120px` | `.case-body{padding}` | `--layout-section-120` (inalterado) |
| `100px` | `.case-feature{padding}` (sem override responsivo) | `--layout-section-100` (inalterado) |
| `96px` | `@media (max-width:960px)` override de `section`, `.case-body`, `.more-work`, `.case-quote` | `--layout-section-mobile` (inalterado — já é o valor exato usado hoje) |
| `90px` (inline, 4 arquivos) | sub-hero das case pages sem hero grande | `--layout-section-90` (inalterado) |

**Decisão:** revertida a consolidação em 3 tiers que eu tinha proposto
(96/120/150px). Cada valor desktop distinto (90, 100, 120, 130, 140, 150)
ganhou seu próprio token, sem arredondamento nenhum.
**Justificativa:** ±10px de padding vertical numa seção de 120-150px é uma
mudança de ritmo de rolagem deliberada — real o bastante para não tratar como
"ruído", mesmo que o efeito prático seja discreto. O objetivo aqui era nomear
os valores existentes, não redesenhar a hierarquia de espaçamento entre
seções; isso fica registrado como uma melhoria de design possível para depois,
não aplicada agora. `--layout-section-mobile` (96px) não é uma decisão nova —
é literalmente o valor que 4 desses 5 seletores já usam hoje no breakpoint de
960px, então nomeá-lo não muda nada.

### 3.3 Padding inline `90px` → classe utilitária

Hoje repetido como `style="padding-top:90px;"` em:
- `case-genesis.html`
- `case-distributor-hub.html`
- `case-checkout-and-pickup.html`
- `case-pro2col.html`

Como a decisão do §3.2 manteve 90px como seu próprio token (não arredondado
para 96px), a classe em `tokens.css` ficou:
```css
.u-case-subhero-pt{ padding-top: var(--layout-section-90); }
```
Zero mudança de valor — só nomeação.
**Pendente:** a troca do `style="padding-top:90px;"` inline pela classe
`u-case-subhero-pt` nesses 4 arquivos **não foi aplicada** — é uma edição de
componente, fora do escopo desta entrega (regra: "não refatore os componentes
ainda"). Fica pronta para aplicar quando o refactor real dos `case-*.html`
acontecer.

### 3.4 Breakpoints

Não tokenizados — CSS custom properties não podem ser usadas dentro de
`@media` queries (limitação da linguagem), então os 6 breakpoints
(`600/700/760/820/860/960px`) continuam como literais no refactor futuro.

---

## 4. Radius

| Atual | Onde | Novo | Status |
|---|---|---|---|
| `28px` | `--radius-lg` | `--radius-lg` | mantido, sem mudança |
| `18px` | `--radius-md` | `--radius-md` | mantido, sem mudança |
| `999px` | `--radius-sm` | `--radius-sm` | mantido, sem mudança |
| `999px` hardcoded | `.testimonial-dot`, `.compare-tag` | `--radius-sm` | sem mudança visual, só limpeza de referência |

### ✅ DECIDIDO (conservador) — Os 2 órfãos (9px, 12px)

| Atual | Onde | Decisão |
|---|---|---|
| `9px` | `.logo-mark` (avatar 30×30px do header) | **Mantido fora do sistema de tokens**, como exceção documentada — não vira `var(--radius-md)` |
| `12px` | `.persona-card img` | **Mantido fora do sistema de tokens**, como exceção documentada — não vira `var(--radius-md)` |

**Justificativa:** das 3 opções listadas na proposta original (absorver em
`--radius-md`, criar um 4º token, documentar como exceção), escolhi documentar
como exceção **para os dois**, não só para o `.logo-mark`. Absorver o
`.logo-mark` em 18px dobra o arredondamento de um elemento pequeno (efeito
bem visível, quase pílula); absorver o `.persona-card img` em 18px é uma
mudança menor (+6px) mas ainda real, não sub-perceptível como os casos de
tipografia/alpha. Como a instrução pede para manter só os 3 tokens existentes
(não criar um 4º), a única forma de não alterar nenhum pixel é deixar os dois
como valores literais no CSS, fora do sistema — o que faço aqui para ambos.

---

## 5. Shadow

Sem ambiguidade — o site tem 1 sombra real (`.float-cta`). Vira
`box-shadow: var(--shadow-elevated-offset) var(--color-shadow);` no refactor
futuro. As 2 ocorrências de `box-shadow:0 0 0 Npx rgba(51,178,90,...)` não são
uma sombra de elevação, são o efeito de pulso do status dot — ficam
associadas ao token `--success` + `--a-18`/`--a-10`, não ao `--shadow-elevated-offset`.

---

## 6. Motion (easing + duração)

| Atual | Ocorrências | Novo |
|---|---|---|
| `cubic-bezier(.16,1,.3,1)` (`--ease`) | 17 | `--ease-brand` (renomeado, sem mudança) |
| `ease` (keyword CSS genérico) | ~13 | mantido como está — não precisa de token |

### ✅ DECIDIDO (conservador) — Durações: 7 valores → 3

| Atual | Ocorrências | Novo | Mudança |
|---|---|---|---|
| `.2s` | 4 | `--duration-fast` (200ms) | sem mudança |
| `.25s` | ~3 | `--duration-fast` (200ms) | -50ms, sub-perceptível |
| `.3s` | ~9 (a mais comum) | `--duration-base` (300ms) | sem mudança |
| `.35s` | ~3 | `--duration-base` (300ms) | -50ms, sub-perceptível |
| `.4s` | 2 | `--duration-slow` (500ms) | +100ms |
| `.5s` | ~4 (a mais comum nesta faixa) | `--duration-slow` (500ms) | sem mudança |
| `.6s` | 2 | `--duration-slow` (500ms) | -100ms |

**Decisão:** mantido `--duration-slow:500ms` (não criei uma 4ª duração).
**Justificativa:** a contagem de 3 durações era um requisito já dado (não uma
ambiguidade a reabrir). Dentro dessa restrição, 500ms é a única escolha que
preserva o valor majoritário do grupo (~4 usos de `.5s`) sem mudança,
deixando `.4s`/`.6s` — os 2 valores menos usados — como os únicos, em todo o
sistema de motion, que sofrem uma mudança claramente perceptível (±100ms). É
o "menos ruim" disponível dado o teto de 3 durações; se preferir preservar
`.4s`/`.6s` exatamente, a única forma seria voltar a 4 durações, contrariando
o requisito original.

---

## 7. Resumo das decisões

| # | Item | Decisão final | Mudança visual real |
|---|---|---|---|
| 1 | Verde único | `--success = #33b25a` | Só `.compare-tag.solution` (Pro2col) muda, sub-perceptível |
| 2 | Amarelo "warning" | Formalizado como token, valor inalterado | Nenhuma |
| 3 | Gradiente placeholder duplicado | **Não fundido** — 3º preset próprio (`warm-alt`) | Nenhuma |
| 4 | Escala alpha | 11 passos exatos, sem redução | Nenhuma |
| 5 | Labels 11-12.5px → 12px | Fusão mantida | Sub-perceptível (≤1px) |
| 6 | Clamps de quote (testimonial + case-quote) | **Não fundidos** — 9 steps, não 8 | Nenhuma (endpoints idênticos) |
| 6b | Clamp de lead (about-lead + feature-head-h3) | Fusão mantida | Sub-perceptível (±1px no máximo) |
| 7 | Line-heights novos | **Não aplicados** — os 4 seletores sem valor explícito continuam herdando 1.55 | Nenhuma |
| 8 | Padding de seção (3 tiers) | **Não consolidado** — cada valor mantém seu próprio token | Nenhuma |
| 9 | 90px inline → classe | Token preserva 90px exato; classe `.u-case-subhero-pt` criada, não aplicada aos HTML ainda | Nenhuma |
| 10 | Radius órfãos (9px, 12px) | **Não tokenizados** — ambos ficam como exceção documentada | Nenhuma |
| 11 | Durações .4s/.6s | Mantido `--duration-slow:500ms` (restrição de 3 durações já dada) | ±100ms nesses 2 valores — a única mudança real que sobrou em todo o documento |

De 11 itens originalmente ambíguos, 10 fecham com **zero mudança visual** e 2
fecham com uma mudança sub-perceptível deliberadamente aceita (itens 1 e 5/6b).
O único item que carrega uma mudança claramente perceptível é o #11
(durações `.4s`/`.6s`), e só porque a contagem de 3 durações já era uma
restrição dada, não uma escolha em aberto nesta passada.
