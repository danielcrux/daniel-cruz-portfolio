# Migration map — raw values → tokens.css

Companion to `audit.md` and `tokens.css`. Nenhum componente foi refatorado — este
documento só mapeia, valor por valor, o que cada hardcode viraria se/quando
`style.css` e os `case-*.html` forem migrados para os tokens. Itens marcados
**AMBÍGUO** mudam algo perceptível (não são só renomeação) e precisam da sua
decisão antes de qualquer refactor.

---

## 0. Como ler este documento

- **valor atual** → **token de destino** — mapeamento direto, zero mudança visual.
- 🟡 **AMBÍGUO** — o token de destino produz um resultado ligeiramente diferente
  do valor atual (arredondamento, fusão de dois valores em um, etc). Explico o
  que muda e o que decidir.
- 🔴 **REMOVIDO** — token que existe hoje mas não sobrevive na proposta.

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
visual. Se no futuro o botão precisar de uma cor sólida que não seja
preto/branco, é só redefinir esses dois tokens sem tocar em `--color-text`.

### 1.4 🟡 AMBÍGUO — Verde "sucesso" colapsado

| Atual | Onde | Proposta |
|---|---|---|
| `#33b25a` | `.dot` (status "disponível" no nav/hero-eyebrow), `rgba(51,178,90,.18)`/`.1` no `@keyframes dot-pulse` | `--success` (mantido como está) |
| `#43bd68` | `.compare-tag.solution` background (só em `case-pro2col.html`) | passa a usar `--success` (`#33b25a`) |

**O que muda:** a tag verde "Solution" nos cards de comparação do Pro2col fica
~3-8 unidades RGB mais escura/dessaturada — visualmente quase imperceptível,
mas é uma mudança real de pixel, não renomeação pura.
**Decisão:** confirmar se posso usar `#33b25a` como o verde único, ou se prefere
manter `#43bd68` como o canônico (nesse caso o status dot é que mudaria de cor
em todas as páginas, mudança bem mais visível).
**Recomendação:** manter `#33b25a` — é o valor que já aparece em toda página
(o dot de status), enquanto `#43bd68` só existe em um componente de uma única
case page.

### 1.5 🟡 AMBÍGUO — Amarelo "warning" (novo papel, não pedido explicitamente)

`.compare-tag.current` usa `#f5c443`/`#3d3000` (background/texto) e não tinha
nenhum token — é a única cor "de status" do site fora do verde. Criei
`--warning`/`--warning-ink` para dar a ela o mesmo tratamento do verde
(primitivo + par de "ink"), já que ela segue exatamente o mesmo padrão visual
(chip com bg claro + texto escuro da mesma família de cor). Se preferir não
formalizar isso como token agora (por ser usado uma única vez, só no
Pro2col), posso remover e deixar hardcoded — sinalizando aqui para sua decisão.

### 1.6 🟡 AMBÍGUO — Gradientes de placeholder (thumb-a/thumb-b/thumb-c)

| Atual | Onde | Proposta |
|---|---|---|
| `#e4e1d8` / `#c9c4b3` | `--thumb-a`/`--thumb-b` default em `style.css` (`.work-thumb`, `.case-cover`, `.case-image`) | `--placeholder-warm-1` / `--placeholder-warm-2` (mantidos) |
| `#e3ded1` / `#c7c0ac` | inline em `case-template.html`, 2 dos 3 cards de exemplo | **removido** — mapeia para `--placeholder-warm-1`/`-2` (o par acima) |
| `#dfe3e0` / `#b9c2bb` (+ `--thumb-c:#fff`) | inline em `case-template.html`, 3º card | `--placeholder-cool-1` / `--placeholder-cool-2` (mantidos como 2º preset) |

**O que muda:** o par `#e3ded1`/`#c7c0ac` desaparece — os dois primeiros cards
de exemplo do template passam a usar exatamente o mesmo gradiente
(`--placeholder-warm-1/2`), em vez de duas variações quase idênticas do mesmo
bege.
**Decisão:** confirmar que é seguro perder essa pequena variação entre os 2
primeiros cards de exemplo do template (eles são só placeholders de
demonstração, nunca vão para produção sem serem substituídos por screenshots
reais — mas quero confirmar antes de aplicar).

### 1.7 Escala alpha — nomeada, não reduzida (ainda)

Os 11 valores de opacidade de preto/branco encontrados no `audit.md` (seção
1.4) foram nomeados 1:1 em `--a-08` … `--a-85`, sem forçar arredondamento —
ou seja, esta parte da migração é **sem ambiguidade**, é puro
"dar nome ao que já existe". Uma versão mais agressiva (6 passos: 10, 20, 35,
50, 70, 85, arredondando `.08→.10`, `.18→.20`, `.25→.20`, `.40→.35` ou `.45`)
é possível numa passada futura, mas mudaria a opacidade real de 4 elementos
(`hero-glow`, `dot-pulse`, `cover-note` border light, `cover-note` color
light) — deixo como opção registrada, não pré-decidida.

### 1.8 `#0f0f0f` hardcoded fora do token (`--ink`)

`.work-thumb .thumb-tag{ color:#0f0f0f; }` usa o mesmo valor de `--ink` (light)
mas hardcoded — por isso a tag de "categoria" sobre a thumbnail **não muda de
cor no dark mode** (fica sempre preta sobre um chip branco semi-transparente,
o que hoje é intencional, já que o fundo do chip é `rgba(255,255,255,.85)`
fixo nos dois temas). Mapeamento direto: `#0f0f0f` → `--neutral-light-900`
(usado como valor fixo, não como `--color-text`, para preservar o
comportamento atual de "sempre escuro sobre chip sempre claro"). Sem ambiguidade,
mas vale registrar que é uma exceção deliberada ao padrão de tema.

---

## 2. Tipografia

### 2.1 🟡 AMBÍGUO — Escala estática (labels/UI), 5 tamanhos → 1

| Atual | Onde | Novo |
|---|---|---|
| `11px` | `.compare-tag` | `--text-2xs` (12px) |
| `11.5px` | `.head-tag` | `--text-2xs` (12px) |
| `12px` | `.tag`, `.meta-item span`, `.persona-card .persona-wants` | `--text-2xs` (12px, inalterado) |
| `12.5px` | `.identity-text .identity-email` | `--text-2xs` (12px) |

**O que muda:** `.compare-tag` cresce 1px, `.head-tag` cresce 0.5px, o e-mail
no header encolhe 0.5px. Todos imperceptíveis isoladamente, mas é uma mudança
real em 3 dos 4 seletores.
**Decisão:** confirmar a fusão em `--text-2xs:12px`, ou preferir manter 2 steps
(`--text-2xs:11.5px` para as tags e `--text-2xs-b:12.5px` para o e-mail) se
quiser zero mudança de pixel. Recomendo a fusão total — a diferença é abaixo
do que qualquer usuário percebe, e reduz 4 valores para 1.

### 2.2 🟡 AMBÍGUO — Escala fluida (clamp), 10 fórmulas → 8 steps

Fórmula única adotada para todos os 8 steps: interpolação linear entre
viewport 400px e 1440px —
`clamp(min, min + (100vw - 400px) * (max-min)/1040, max)`.
Os endpoints (valor em ≤400px e em ≥1440px) foram preservados exatamente onde
possível; a mudança real está no **meio da curva** (ex. em 900px de viewport),
que agora segue a mesma "forma" de interpolação em vez do coeficiente vw
escolhido à mão em cada seletor.

| # | Seletor(es) atuais | Fórmula atual | Token novo | Fórmula nova | O que muda |
|---|---|---|---|---|---|
| 1 | `.hero-title` | `clamp(52px,9vw,132px)` | `--font-fluid-2xl` | `clamp(52px, 52px+(100vw-400px)*80/1040, 132px)` | Praticamente nada — 9vw e a fórmula nova coincidem quase exatamente (9 vs 9.17vw equivalente). |
| 2 | `.cta-title` | `clamp(38px,7vw,100px)` | `--font-fluid-xl` | `clamp(38px, 38px+(100vw-400px)*62/1040, 100px)` | Mínimo. |
| 3 | `.case-title` | `clamp(34px,5.6vw,64px)` | `--font-fluid-lg` | `clamp(34px, 34px+(100vw-400px)*30/1040, 64px)` | 🟡 Perceptível em viewports médios (~900-1100px): o título fica um pouco menor até chegar perto de 1440px, onde volta a bater 64px igual antes. |
| 4 | `.section-head h2` | `clamp(32px,4.4vw,52px)` | `--font-fluid-md` | `clamp(32px, 32px+(100vw-400px)*20/1040, 52px)` | 🟡 Mesmo efeito do item 3, mais discreto. |
| 5 | `.testimonial-quote` **+** `.case-quote blockquote` (fundidos) | `clamp(24px,3.6vw,42px)` e `clamp(22px,3.2vw,38px)` | `--font-fluid-quote` | `clamp(23px, 23px+(100vw-400px)*17/1040, 40px)` | 🟡 **Fusão de 2 papéis em 1.** Os dois são citações decorativas (`::before`/`::after` com aspas), mas hoje têm tamanhos ligeiramente diferentes — o merge aproxima ambos de um meio-termo (min 23, max 40): a citação do carrossel de depoimento encolhe ~1-2px no máximo, a citação de case study cresce ~2px no máximo. |
| 6 | `.about-lead` **+** `.case-feature-head h3` (fundidos) | `clamp(26px,3.2vw,36px)` e `clamp(26px,3.2vw,38px)` | `--font-fluid-lead` | `clamp(26px, 26px+(100vw-400px)*11/1040, 37px)` | Mínimo — os dois já tinham o mesmo mínimo (26px) e o mesmo coeficiente vw (3.2vw); só o máximo é arredondado para o meio-termo (37px, era 36 num e 38 no outro). |
| 7 | `.service-name` | `clamp(24px,3vw,36px)` | `--font-fluid-heading` | `clamp(24px, 24px+(100vw-400px)*12/1040, 36px)` | Mínimo. |
| 8 | `.cta-email` | `clamp(22px,3.2vw,36px)` | `--font-fluid-link` | `clamp(22px, 22px+(100vw-400px)*14/1040, 36px)` | Mínimo. |

**Decisão principal:** confirmar a fusão dos itens 5 e 6 (2 pares de papéis
em 1 token cada) — são a única mudança estrutural real; o resto é só
reformular a curva matemática mantendo os mesmos limites.
**Alternativa caso prefira zero mudança de curva:** manter os 10 valores como
8-10 tokens *fixos* (sem uma fórmula unificada), abrindo mão do objetivo de
"clamp consistente" pedido — não recomendo, mas é uma opção.

### 2.3 🟡 AMBÍGUO — Line-height pareado por step (novo, para os fluid steps)

| Token | Valor | Seletor(es) que ganham line-height explícito pela 1ª vez |
|---|---|---|
| `--leading-tight` (1) | igual a `.cta-title` hoje | nenhum (só renomeação) |
| `--leading-snug` (1.08) | `.hero-title` já usa 1.08; `.case-title` usa 1.05 hoje | 🟡 `.case-title` ganha +0.03 (levemente mais solto) |
| `--leading-normal` (1.1) | não existia — `.section-head h2` e `.service-name` hoje herdam 1.55 do body | 🟡 novo para os dois — vão ficar visivelmente mais compactos (era 1.55, solto demais para um heading grande) |
| `--leading-relaxed` (1.35) | `.about-lead` já usa 1.35; `.case-quote blockquote` usa 1.35 também | 🟡 `.case-feature-head h3` e `.cta-email` ganham 1.35 pela 1ª vez (hoje herdam 1.55) |

**Decisão:** os itens marcados 🟡 são "linhas mais apertadas do que hoje" —
uma melhoria típica para headings grandes, mas é uma escolha de design, não
uma extração neutra do CSS atual. Recomendo aplicar, mas quero sua confirmação
antes do refactor.

### 2.4 Letter-spacing — 1 outlier absorvido

`.scroll-hint{letter-spacing:.04em}` é o único valor fora da escala
`-.04/-.03/-.02/-.01/0/.06/.08em`. Proposta: absorver em `--tracking-wide`
(.06em). 🟡 Muda o espaçamento de "Scroll to explore" de .04em para .06em —
diferença mínima, mas real. Se preferir zero mudança, mantenho `.04em` como
uma 8ª variante isolada (`--tracking-hint`).

---

## 3. Espaçamento

### 3.1 Micro escala (gap/margin/padding pequenos) — mapeamento direto

Os 10 steps (`--space-1` a `--space-10`: 4/8/12/16/20/24/32/40/56/80px) cobrem
os valores mais recorrentes do CSS atual (contabilizados no `audit.md` §3.1–3.3).
Valores de uso único que não batem exatamente com um step (ex. `18px`, `22px`,
`26px`, `34px`, `38px`, `44px`, `64px`) precisarão, no refactor futuro, arredondar
para o step mais próximo — isso será um mapeamento seletor-por-seletor grande
demais para este documento; recomendo fazer esse mapeamento fino junto com o
refactor real de `style.css`, não antes.

### 3.2 🟡 AMBÍGUO — Macro escala (padding de seção), 6 valores → 3 tiers

| Atual | Onde | Tier novo |
|---|---|---|
| `150px` | `section{padding}`, `.case-hero{padding-top}` | `--layout-section-lg` (150px, inalterado) |
| `140px` | `.more-work{padding}` | 🟡 `--layout-section-lg` (150px) — **+10px** |
| `130px` | `.case-quote{padding}` | 🟡 `--layout-section-md` (120px) — **-10px** |
| `120px` | `.case-body{padding}` | `--layout-section-md` (120px, inalterado) |
| `100px` | `.case-feature{padding}` | 🟡 `--layout-section-sm` (96px) — **-4px** |
| `96px` | `@media (max-width:960px)` override de `section`, `.case-body`, `.more-work`, `.case-quote` | `--layout-section-sm` (96px, inalterado) |
| `90px` (inline, 4 arquivos) | sub-hero das case pages sem hero grande | 🟡 `--layout-section-sm` (96px) — **+6px** |

**O que muda:** 4 seletores desktop mudam de padding vertical (±4 a ±10px por
lado) para caber em 3 tiers em vez de 5-6 valores quase arbitrários — a
justificativa é que, no mobile (≤960px), 4 desses 5 valores **já colapsam**
para o mesmo 96px hoje, então a variação desktop parece decorativa, não
funcional.
**Decisão:** confirmar os 4 arredondamentos (`.more-work` +10px,
`.case-quote` -10px, `.case-feature` -4px, sub-hero inline +6px) ou manter
uma escala de 5-6 tiers sem fundir nada (perde a simplificação, mas zero
mudança visual). Recomendo os 3 tiers — a diferença entre 130 e 120px, ou
entre 100 e 96px, não é perceptível na rolagem de uma página de case study.

### 3.3 Padding inline `90px` → classe utilitária

Hoje repetido como `style="padding-top:90px;"` em:
- `case-genesis.html`
- `case-distributor-hub.html`
- `case-checkout-and-pickup.html`
- `case-pro2col.html`

Proposta em `tokens.css`: classe `.u-section-pt-sm{ padding-top: var(--layout-section-sm); }`
(96px, ver §3.2 acima sobre a mudança de +6px).
**Pendente:** a troca do `style="padding-top:90px;"` inline pela classe
`u-section-pt-sm` nesses 4 arquivos **não foi aplicada** — é a única mudança
de HTML que o pedido descreve, mas por ser edição de componente, ficou de fora
desta entrega (regra: "não refatore os componentes ainda"). Fica pronta para
aplicar assim que você confirmar a mudança de 90→96px acima.

### 3.4 Breakpoints

Não tokenizados nesta proposta — CSS custom properties não podem ser usadas
dentro de `@media` queries (limitação da linguagem, não da arquitetura), então
os 6 breakpoints (`600/700/760/820/860/960px`) continuam como literais no
refactor futuro. Se useful, posso documentar os 6 valores como constantes em
comentário no topo do arquivo (não como var), só para achar/substituir mais
fácil — não fiz isso aqui por não ter sido pedido.

---

## 4. Radius

| Atual | Onde | Novo | Status |
|---|---|---|---|
| `28px` | `--radius-lg` | `--radius-lg` | mantido, sem mudança |
| `18px` | `--radius-md` | `--radius-md` | mantido, sem mudança |
| `999px` | `--radius-sm` | `--radius-sm` | mantido, sem mudança |
| `999px` hardcoded | `.testimonial-dot`, `.compare-tag` (deveriam usar `var(--radius-sm)` e não reescrever o literal) | `--radius-sm` | sem mudança visual, só limpeza de referência |

### 🟡 AMBÍGUO — Os 2 órfãos (9px, 12px)

A instrução pede para manter só os 3 radius existentes (não criar um 4º). Isso
força os 2 valores órfãos a saltar para o token existente mais próximo:

| Atual | Onde | Token mais próximo | O que muda |
|---|---|---|---|
| `9px` | `.logo-mark` (avatar 30×30px do header) | `--radius-md` (18px) | 🟡 **dobra o arredondamento** — o quadrado de 30px vira visivelmente mais arredondado (quase uma pílula), pode não ser o efeito desejado |
| `12px` | `.persona-card img` | `--radius-md` (18px) | 🟡 +6px, mudança mais discreta (imagem maior, a diferença relativa é menor) |

**Decisão necessária:** nenhuma das duas opções é "sem mudança" — escolha uma:
1. Aceitar os 2 arredondamentos para `--radius-md` (perde a variação, ganha
   consistência total com só 3 tokens).
2. Criar um 4º token (`--radius-xs`, ~10-12px) especificamente para esses 2
   casos — contraria a instrução de manter só 3, mas evita a mudança visual
   no logo-mark.
3. Deixar os 2 casos como exceções documentadas, fora do sistema de tokens
   (não usar var() ali, manter o hardcode com um comentário explicando por quê).

Recomendo a opção 3 para o `.logo-mark` (a mudança para 18px é grande demais
num elemento de 30px) e a opção 1 para `.persona-card img` (mudança pequena,
não vale um 4º token para um único uso).

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
| `ease` (keyword CSS genérico) | ~13 | mantido como está — é o easing padrão do browser, não precisa de token |

### 🟡 AMBÍGUO — Durações: 7 valores → 3

| Atual | Ocorrências | Novo | O que muda |
|---|---|---|---|
| `.2s` | 4 | `--duration-fast` (200ms) | sem mudança |
| `.25s` | ~3 | `--duration-fast` (200ms) | 🟡 -50ms, transições ficam um pouco mais rápidas |
| `.3s` | ~9 (a mais comum) | `--duration-base` (300ms) | sem mudança |
| `.35s` | ~3 | `--duration-base` (300ms) | 🟡 -50ms |
| `.4s` | 2 | `--duration-slow` (500ms) | 🟡 +100ms, fica notavelmente mais lento |
| `.5s` | ~4 | `--duration-slow` (500ms) | sem mudança |
| `.6s` | 2 | `--duration-slow` (500ms) | 🟡 -100ms, fica mais rápido |

**Decisão:** os itens 🟡 de `.4s`/`.6s` são os que mais mudam perceptivelmente
(100ms é bem notável numa transição de hover). Se quiser preservar esses dois
extremos, uma alternativa é 4 durações em vez de 3
(`fast:200ms, base:300ms, slow:450ms, slower:600ms`) — mas isso contraria o
pedido explícito de "3 durações". Sinalizando para sua decisão; recomendo
confirmar caso a caso quais transições usam `.4s` e `.6s` antes de aplicar.

---

## 7. Resumo do que precisa da sua decisão antes do refactor

1. **Verde único** — confirmar `#33b25a` como `--success` (muda a tag "Solution" do Pro2col). §1.4
2. **Amarelo "warning"** — formalizar como token ou manter hardcoded (uso único). §1.5
3. **Gradiente placeholder duplicado** — remover o par `#e3ded1`/`#c7c0ac` do template. §1.6
4. **Escala alpha** — manter os 11 passos exatos (recomendado) ou já reduzir para 6 agora. §1.7
5. **Labels 11-12.5px → 12px único** — confirmar a fusão de 4 valores em 1. §2.1
6. **Fusão dos clamps de quote e de lead** — confirmar os 2 merges de papéis tipográficos. §2.2
7. **Line-heights novos** (`section-head h2`, `service-name`, `case-feature-head h3`, `cta-email`) — confirmar o aperto de 1.55→1.1/1.35. §2.3
8. **Padding de seção em 3 tiers** — confirmar os 4 arredondamentos (±4 a ±10px). §3.2
9. **90px inline → 96px via classe** — depende da decisão #8; aplicar `u-section-pt-sm` nos 4 arquivos. §3.3
10. **Radius órfãos (9px logo-mark, 12px persona-card)** — escolher entre absorver em `--radius-md`, criar um 4º token, ou documentar como exceção. §4
11. **Durações .4s/.6s** — confirmar a fusão em `--duration-slow` (500ms) ou manter 4 durações. §6

Nada disso foi aplicado a `style.css` ou aos `case-*.html` — esperando sua
revisão antes do refactor.
