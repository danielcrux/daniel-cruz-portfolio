# Design Audit — danielcruz.work portfolio

Escopo: `assets/style.css` (733 linhas), `index.html`, `case-*.html` (5 páginas de case study), `assets/main.js`.
Nenhum arquivo foi alterado nesta auditoria — apenas diagnóstico.

---

## 1. Inventário de cores

### 1.1 Tokens já existentes (`:root` / `html[data-theme="dark"]`)

O site já usa CSS custom properties para a maior parte das cores — isso é o ponto mais forte do sistema atual. 17 variáveis, com par light/dark:

| Variável | Light | Dark | Uso |
|---|---|---|---|
| `--bg` | `#ffffff` | `#111113` | fundo da página |
| `--ink` | `#0f0f0f` | `#f5f4f2` | texto principal |
| `--body` | `#4a4a48` | `#c7c6c2` | texto secundário/corpo |
| `--soft` | `#8a8a86` | `#8f8f8c` | texto terciário/legendas |
| `--line` | `#e8e7e2` | `#2b2b2c` | bordas |
| `--card` | `#f3f2ee` | `#1b1b1d` | fundo de cards/chips |
| `--card-2` | `#eceae3` | `#232325` | **definida mas nunca usada** (ver 1.3) |
| `--accent` | `#ff4d1f` | `#ff6a3d` | laranja de marca |
| `--accent-ink` | `#fff4ef` | `#2b160f` | **definida mas nunca usada** (ver 1.3) |
| `--ink-solid` | `#0f0f0f` | `#f5f4f2` | fundo de botões sólidos (idêntica a `--ink` em ambos os temas) |
| `--on-solid` | `#ffffff` | `#111113` | texto sobre botão sólido (idêntica a `--bg` em ambos os temas) |
| `--header-bg` | `rgba(255,255,255,.7)` | `rgba(17,17,19,.7)` | header com blur |
| `--shadow-color` | `rgba(15,15,15,.10)` | `rgba(0,0,0,.35)` | única sombra do site |

**Observação:** `--ink-solid`/`--on-solid` duplicam `--ink`/`--bg` valor-por-valor nos dois temas (linhas 8/16, 17/7 no light; 30/38, 29/39 no dark). Hoje são só um alias — a distinção só se justifica se algum dia o botão precisar de uma cor sólida que *não* acompanhe o texto/fundo. Candidato a consolidação.

### 1.2 Cores hardcoded fora do sistema de tokens

Estas aparecem soltas no CSS ou em `style=""` inline, sem passar por variável:

| Valor | Onde | Contexto |
|---|---|---|
| `#33b25a` + `rgba(51,178,90,.18)` / `rgba(51,178,90,.1)` | `.dot` (nav), `@keyframes dot-pulse` | verde de "disponível" — repetido 3x, nunca virou variável |
| `#fff` / `#ffffff` | `.cursor-dot.hover`, `.btn .btn-icon` color, `.work-thumb .blob.b1` bg, `.compare-card` (via thumb), `.float-cta .btn-icon` color | branco literal, quando `--on-solid`/`--bg` já existem |
| `#000` | `.work-thumb .blob.b2` background | preto literal |
| `#0f0f0f` | `.work-thumb .thumb-tag` color | igual a `--ink` no light, mas hardcoded (não muda no dark) |
| `#e4e1d8` / `#c9c4b3` | `--thumb-a`/`--thumb-b` fallback (`.work-thumb`, `.case-cover`, `.case-image`) | gradiente de placeholder dos cases |
| `#e3ded1` / `#c7c0ac` | `case-template.html` inline `style="--thumb-a:...;--thumb-b:..."` | quase idêntico ao par acima (ver 1.4) |
| `#dfe3e0` / `#b9c2bb` | `case-template.html` inline (3º card) | 3º par de gradiente placeholder |
| `rgba(255,255,255,.5)` | `.case-cover` radial gradient | glow do cover |
| `rgba(15,15,15,.4)` / `rgba(15,15,15,.2)` | `.case-cover .cover-note` (light) | texto/borda do placeholder "cover note" |
| `rgba(255,255,255,.45)` / `rgba(255,255,255,.25)` | `.case-cover .cover-note` (dark override) | mesmo elemento, versão dark |
| `rgba(255,77,31,.08)` / `rgba(255,77,31,0)` | `.hero-glow` radial gradient | é o `--accent` (`#ff4d1f`) reescrito em rgba, não referenciado como variável |
| `#f5c443` / `#3d3000` | `.compare-tag.current` | amarelo "estado atual" — só existe no Pro2col |
| `#43bd68` / `#04310f` | `.compare-tag.solution` | verde "solução" — muito próximo do `#33b25a` do status dot (ver 1.4) |

### 1.3 Tokens definidos e não usados

- `--card-2` (`#eceae3` / `#232325`) — nunca referenciado em nenhuma regra.
- `--accent-ink` (`#fff4ef` / `#2b160f`) — nunca referenciado em nenhuma regra.

Ambos foram provavelmente planejados para estados hover/secundários e ficaram órfãos.

### 1.4 Grupos de cores quase idênticas (candidatas a fundir)

1. **Verde "disponível/sucesso"** — três valores para o mesmo conceito:
   - `#33b25a` (status dot)
   - `#43bd68` (`.compare-tag.solution`)
   - Diferença de apenas 16/8/8 em RGB — visualmente quase indistinguíveis. Deveriam ser o mesmo `--success` token.

2. **Gradientes de placeholder (thumb-a/thumb-b)** — 3 pares beges/verdes quase iguais, usados só como fallback visual quando não há screenshot real:
   - `#e4e1d8` / `#c9c4b3` (CSS, default)
   - `#e3ded1` / `#c7c0ac` (template, cards 1–2)
   - `#dfe3e0` / `#b9c2bb` (template, card 3, com `--thumb-c:#fff` extra)
   - Os dois primeiros pares são a mesma paleta bege com ±3 de variação em cada canal — ruído, não intenção.

3. **Preto/cinza-escuro quase-preto** usados como "texto sobre fundo claro" fora do token `--ink`:
   - `#0f0f0f` (`--ink` e `.thumb-tag` hardcoded) — mesmo valor, uma via variável, outra não.
   - `rgba(15,15,15,.10)` / `.4` / `.2` — mesmo preto-base em 3 opacidades diferentes espalhadas (shadow, cover-note border/color). Poderiam ser um único `--ink-rgb` combinado com opacidades utilitárias.

4. **Branco em opacidade** — `rgba(255,255,255,.7)` (header), `.85` (thumb-tag bg), `.5` (cover glow), `.45`/`.25` (cover-note dark) — 5 opacidades diferentes do mesmo branco, sem padrão de escala (não são múltiplos de .1 ou .05 consistentes).

### 1.5 Meta tags de cor de sistema

Não há `<meta name="theme-color">` no `<head>` de nenhuma página — a cor da barra de status/navegador no mobile não acompanha `--bg`/`--ink` do tema. Vale considerar ao implementar tokens, já que o dark mode já existe.

---

## 2. Escala tipográfica

### 2.1 Font-family

Duas famílias declaradas, ambas coerentes (sem inconsistência):
- Corpo: `'General Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif` (via Fontshare CDN)
- Mono (só no `.scroll-hint`): `'SF Mono','Menlo','Consolas',monospace`

Nenhum outro `font-family` é declarado — todos os outros elementos herdam do `body`. Isso está bem controlado.

### 2.2 Font-size — 23 valores distintos em uso

Tamanhos fixos (não-clamp), do menor ao maior:
`11px, 11.5px, 12px, 12.5px, 13px, 14px, 15px, 16px, 17px, 18px, 19px, 20px, 34px`

Tamanhos fluidos (`clamp`), 8 no total, todos com fórmulas diferentes:
```
clamp(52px, 9vw, 132px)     — hero title
clamp(38px, 7vw, 100px)     — CTA title
clamp(34px, 5.6vw, 64px)    — case title
clamp(32px, 4.4vw, 52px)    — section head h2
clamp(26px, 3.2vw, 38px)    — case-feature-head h3
clamp(26px, 3.2vw, 36px)    — about-lead
clamp(24px, 3vw, 36px)      — service-name
clamp(24px, 3.6vw, 42px)    — testimonial-quote
clamp(22px, 3.2vw, 38px)    — case-quote blockquote
clamp(22px, 3.2vw, 36px)    — cta-email
```

**Inconsistências:**
- `11px` e `11.5px` coexistem (`.tag` usa nada definido/herda 12px de outro lugar, `.head-tag` usa `11.5px`) — meio pixel de diferença sem motivo aparente, provavelmente deveria ser um único "micro label" de 12px.
- `12px` e `12.5px` também coexistem (`.tag`/`.meta-item span` vs `.identity-text .identity-email`).
- 8 fórmulas de `clamp` diferentes para títulos que cumprem papéis parecidos (títulos de seção/hero/quote) — não há uma escala de "display sizes" compartilhada; cada título tem seu próprio mín/vw/máx calculado à mão.
- `13px` e `14px` são, de longe, os tamanhos mais usados (15 e 14 ocorrências) — bom sinal de que já existe uma escala de fato, só não está nomeada.

### 2.3 Font-weight — 4 valores, uso consistente

`400` (raramente, 2x — body base e cursor piscante), `500` (14x), `600` (24x, o mais comum — títulos e labels), `700` (2x — logo-mark e antigo uso do Fontshare 700 que hoje só é carregado, não usado no CSS). Sem inconsistência real aqui; é uma escala pequena e limpa.

### 2.4 Line-height — 9 valores

`1, 1.05, 1.08, 1.1, 1.3, 1.35, 1.5, 1.55, 1.6, 1.65` (10 contando o `1` puro do cta-title).
Não há uma correlação clara de "títulos = X, corpo = Y" — `line-height:1.3` e `1.35` convivem para papéis parecidos (testimonial-quote vs about-lead/case-quote), e `1.6`/`1.65` também convivem para parágrafos de corpo (persona-card p vs case-copy p vs case-feature-head p). Diferença de 0.05 sem razão de design aparente.

### 2.5 Letter-spacing — 8 valores

`-.04em, -.03em, -.02em, -.01em, 0, .04em, .06em, .08em`
Bem escalonado na verdade — segue aproximadamente múltiplos de `.01`/`.02`. O único ruído é `.04em` (scroll-hint) que quebra o padrão `.06`/`.08` usado em todos os outros "uppercase labels".

---

## 3. Espaçamentos (margin / padding / gap)

**Não existe uma escala de espaçamento formal.** Os valores são majoritariamente múltiplos de 2px, mas sem um grid consistente (não é uma escala geométrica nem uma escala de 4/8pt limpa).

### 3.1 Gap — 17 valores distintos
`5, 8, 10, 12, 14, 16, 20, 24, 26, 28, 32(+24), 36, 38, 40, 48, 56, 64, 80` px

### 3.2 Margin-top — ~20 valores distintos
`.02em, .06em, .08em, 4, 6, 8, 12, 14, 18, 22, 28, 30, 32, 34, 36, 38, 40, 44, 52, 56, 70, 80, 100` px (mais os inline `24, 28, 40, 56` px espalhados pelos `case-*.html`)

### 3.3 Padding — ~35 combinações distintas (incluindo padding shorthand com múltiplos valores)

### 3.4 O que se repete o suficiente para já ser uma escala de fato

Contando ocorrências, os valores mais comuns sugerem uma escala implícita de aproximadamente:
`4 · 8 · 10 · 14 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · ~100-150 (seções)`

mas ao lado dessa escala aparecem "intrusos" de uso único: `5px, 6px, 12.5px, 18px, 22px, 26px, 30px, 34px, 38px, 44px, 60px, 64px, 70px, 80px, 84px, 96px, 100px, 110px, 120px, 130px, 140px, 150px` — muitos desses só aparecem 1x, o que indica valores escolhidos "no olho" durante o desenvolvimento em vez de puxados de uma escala.

### 3.5 Padding inline fora do CSS (nos `case-*.html`)

```
style="padding-top:90px;"        — repetido em 4 dos 5 case pages (mesmo valor, deveria ser classe)
style="margin-top:56px;"         — 2 ocorrências
style="margin-top:40px;margin-bottom:0;"
style="margin-top:28px;"
style="margin-top:24px;"         — 4 ocorrências no checkout-and-pickup
```
`padding-top:90px` inline é essencially uma variação do `.case-hero{padding-top:150px}` que só existe porque essas seções internas reaproveitam espaçamento de hero sem ser hero — merece virar uma classe utilitária/modificadora em vez de repetir inline em 4 arquivos.

### 3.6 Breakpoints (não é espaçamento, mas é escala numérica correlata)

`600px, 700px, 760px, 820px, 860px, 960px` — 6 breakpoints diferentes, sem nomes/variáveis (`--bp-sm` etc.), cada media query escrita com o pixel literal. Alguns parecem ad hoc para um componente específico (`700px` só para `.work-card.featured` e `.feature-grid-4`; `760px` só para `.head-tag`; `820px` para dois componentes diferentes).

---

## 4. Border-radius, shadows e transições

### 4.1 Border-radius

3 tokens definidos e bem adotados:
- `--radius-lg: 28px` (7 usos) — cards grandes, covers, imagens de destaque
- `--radius-md: 18px` (4 usos) — cards médios (compare-card, persona-card, feature-grid-4 img)
- `--radius-sm: 999px` (7 usos) — pills/chips/botões

Fora dos tokens: `50%` (círculos — avatar, ícones, arrows: uso correto, não precisa de token), `9px` (`.logo-mark`, valor único, não bate com nenhum dos 3 tokens), `12px` (`.persona-card img`, também único e não bate com nenhum tokens), `999px` hardcoded em vez de `var(--radius-sm)` em `.testimonial-dot` e `.compare-tag` (2 lugares reescrevem o mesmo valor do token em vez de referenciá-lo).

**Achado:** o sistema de radius é o mais maduro do CSS, mas tem 2 furos: `9px`/`12px` órfãos, e 2 lugares que hardcodam `999px` ao invés de usar `--radius-sm`.

### 4.2 Box-shadow

Praticamente inexistente como sistema — só 2 sombras reais no site inteiro:
- `0 18px 40px var(--shadow-color)` — único uso "de verdade" (`.float-cta`)
- `0 0 0 3px rgba(51,178,90,.18)` / `0 0 0 6px rgba(51,178,90,.1)` — na verdade é o efeito de "pulso" do status dot, não uma sombra de elevação

Não há uma escala de elevação (sm/md/lg) — só a sombra do float-cta. Isso é normal para um site tão flat/editorial, mas vale registrar que não há necessidade de inventar múltiplos níveis se o estilo visual não pede.

### 4.3 Transições

1 único token de easing: `--ease: cubic-bezier(.16,1,.3,1)` (17 usos) — bom, é o "easing de marca" do site.
Mas a duração não é tokenizada: durações usadas: `.2s, .25s, .3s, .35s, .4s, .5s, .6s` (7 valores), e a maioria das regras declara `ease` (o keyword CSS genérico) em vez de `var(--ease)` quando a duração é curta (`.2s`/`.25s` em hovers de cor/texto), reservando `var(--ease)` só para transformações maiores. Isso pode ser intencional (easing "orgânico" só para movimento, `ease` padrão para cor) — mas não está documentado como regra, então parece inconsistência à primeira leitura.

---

## 5. Inventário de componentes (padrões repetidos no HTML)

| Componente | Classe raiz | Ocorrências (arquivos) | Observação |
|---|---|---|---|
| Botão primário sólido | `.btn` + `.btn-icon` | index (2), + `about-cv` | com ícone circular de "seta" |
| Botão ghost (texto sublinhado) | `.btn-ghost` | 1x por página (6 arquivos) | idêntico ao `.cta-email`/`.identity-name` no padrão "underline on hover" mas são 3 classes distintas com CSS quase igual |
| Botão flutuante CTA (case pages) | `.float-cta` + `.btn-icon` | 1x por case page (4) | mesmo padrão do `.btn`, reimplementado |
| Cards de trabalho (home) | `.work-card` → `.work-thumb` → `.work-info` | 4x em index.html | |
| Chip / pill de tag | `span.chip` dentro de `.chip-row` | 5x por case page × 5 páginas = ~25 | usa `--radius-sm` e `--card`, consistente |
| Hero eyebrow (pill com dot) | `.hero-eyebrow` | só na home | mesmo formato visual do `.chip` mas classe própria |
| Cabeçalho de seção | `.section-head` (+ `.tag` + `h2` + `p`) | repetido em toda seção da home e em `.more-work` | |
| Grid de metadados do case | `.meta-grid` / `.meta-item` | 5x (uma por case page) | |
| Bloco de feature com imagem | `.case-feature` (+ `-head`, `-label`, `-quote`) | 4 páginas (11–19 ocorrências cada) — o componente mais repetido do site | |
| Grid 2×2 de screenshots | `.feature-grid-4` | só em `case-genesis.html` (2x) | não reaproveitado nos outros cases, apesar de o padrão visual (grade de prints) aparecer em todos eles com outras classes |
| Cards de comparação (antes/depois) | `.compare-card` + `.compare-tag.current/.solution` | só em `case-pro2col.html` (3x) | cores hardcoded únicas (ver 1.2/1.4) |
| Cards de persona | `.persona-card` | só em `case-pro2col.html` (2x) | |
| Callout de insight | `.insight-callout` | 2 páginas (genesis, pro2col) | |
| Linha de estatísticas | `.stat-row` / `.stat` | só em `case-genesis.html` | visualmente idêntica ao `.hero-stat` da home, mas reimplementada com nomes de classe diferentes |
| Tag flutuante de atribuição | `.head-tag` | 3 páginas (distributor-hub, checkout, pro2col) — ausente em genesis | inconsistência de aplicação, não só de CSS |
| Mídia de capa do case | `.cover-media` (+ `.portrait`) | usado nas páginas com GIF/imagem de capa alternativa | |
| Testemunhos (carrossel) | `.testimonial-slide` / `.testimonial-dot` | só na home | |
| Identidade (avatar+nome) | `.identity` | em todas as páginas, mas com **markup diferente**: na home é `<div class="logo identity">` com link separado no avatar e no nome; nos cases é `<a class="logo identity">` (o bloco inteiro é um link) | ver observação abaixo |

**Observações de inconsistência estrutural (além de CSS):**
- O bloco de identidade no header (avatar + nome) tem **dois HTMLs diferentes** entre `index.html` e os `case-*.html`: a home separa o link do avatar do link do nome (para permitir dois `<a>` distintos + email), enquanto os cases usam um único `<a>` envolvendo tudo e removem o e-mail. É intencional (a home tem e-mail, os cases não), mas o CSS (`.identity`, `.identity-avatar`, `a.identity`) carrega regras condicionais para os dois casos, o que é uma fonte comum de bugs futuros.
- `.head-tag` está ausente em `case-genesis.html` mas presente nas outras 3 — ou o padrão devia estar em todas, ou genesis tem um motivo (verificar com o conteúdo, não é só CSS).
- `.feature-grid-4` só existe em genesis; os outros cases usam `.case-feature img` solto ou `.feature-with-gif` para o mesmo tipo de conteúdo (grade de screenshots) — 3 formas distintas de resolver o mesmo problema visual.

---

## 6. Resumo — valores únicos hoje vs. tokens necessários

| Categoria | Valores únicos hoje | Tokens recomendados (estimativa) |
|---|---|---|
| Cores (hex/rgb, incluindo light+dark) | ~38 valores distintos (26 no CSS raiz + ~12 soltos/inline) | ~14–16 (12 já cobertos por variáveis existentes + 1 `--success` + 1 `--warning` para consolidar verde/amarelo dos compare-tags) |
| Font-size | 23 (13 fixos + 10 clamp) | ~8–10 (uma escala fixa de corpo/label + 4–5 tamanhos de display fluid compartilhados) |
| Font-weight | 4 | 4 (já é uma escala enxuta, manter) |
| Line-height | 9–10 | ~4 (tight/display, snug/heading, normal/body, relaxed/copy longo) |
| Letter-spacing | 8 | 6 (unificar o `.04em` isolado em `.06em`) |
| Gap | 17 | ~8 (escala 4/8pt: 8,12,16,20,24,32,40,56) |
| Margin/Padding (todas as direções) | ~55 combinações distintas | ~10–12 valores base compondo shorthands, mais 2–3 tokens de "padding de seção" (100/120/150px) |
| Border-radius | 5 (2 órfãos: 9px, 12px) | 3 (manter os já existentes: sm/md/lg) |
| Box-shadow | 2 (1 real + 1 pulso) | 1–2 (manter simples, é proposital) |
| Transition duration | 7 | 3–4 (fast .2s, base .3s, slow .5s, extra .6s se justificado) |
| Easing | 1 (+ `ease` genérico usado em paralelo) | 2 (manter `--ease` de marca + `ease` padrão nomeado explicitamente, ex. `--ease-linear`) |
| Breakpoints | 6 | 4 (600/760/860/960 já cobrem os casos reais; 700 e 820 parecem redundantes) |

**Total aproximado hoje: ~155–165 valores únicos "soltos" no sistema.**
**Total de tokens necessários para cobrir os mesmos papéis visuais: ~55–65.**

Ou seja, dá para reduzir a superfície de valores em ~60% sem perder nenhuma variação visual intencional — a maior parte da redução vem de espaçamento (margin/padding/gap) e font-size, que hoje não têm nenhuma escala nomeada.

---

## 7. Meta tags — og:url / og:image / canonical

**Não encontrado o problema descrito.** `index.html` (linhas 18, 23, 26, 30) já aponta corretamente para `danielcruz.work`:
```html
<link rel="canonical" href="https://danielcruz.work/">
<meta property="og:image" content="https://danielcruz.work/images/social-preview.jpg">
<meta property="og:url" content="https://danielcruz.work/">
<meta name="twitter:image" content="https://danielcruz.work/images/social-preview.jpg">
```
Confirmado pelo histórico do git: o commit `395f3e3` ("Copy tweaks, meta domain update...") já trocou o subdomínio Netlify (`adorable-snickerdoodle-66e937.netlify.app`) por `danielcruz.work` nesse arquivo. Esse ponto específico já está corrigido — não é preciso mexer em `index.html`.

**Achado real, adjacente:** as 5 páginas de case study (`case-pro2col.html`, `case-genesis.html`, `case-distributor-hub.html`, `case-checkout-and-pickup.html`, `case-template.html`) **não têm nenhuma tag Open Graph, Twitter Card ou `<link rel="canonical">`** — nunca tiveram, não é regressão do Netlify. Quando alguém compartilha o link de um case study específico (ex. `case-pro2col.html`) no LinkedIn/Slack/WhatsApp, não há preview de imagem/título/descrição nenhum, e não há canonical apontando para `danielcruz.work/case-pro2col.html`.

**Onde corrigir (quando for a hora de agir, não agora):**
- Adicionar em cada `case-*.html`, dentro do `<head>`, um bloco equivalente ao de `index.html` (linhas 18–30), trocando apenas `og:title`/`og:description`/`og:url` pelo conteúdo específico de cada case (já existem `<title>` e `<meta name="description">` próprios em cada página, então é reaproveitar esse texto).
- Cada case também precisaria de uma imagem de preview própria (hoje só existe `images/social-preview.jpg`, genérica) — ou aceitar deliberadamente reusar a imagem genérica para todos os cases.
- `case-template.html` deveria receber o mesmo bloco (como comentário/placeholder), já que é o template usado para criar novos cases — do jeito que está, todo novo case nascerá sem essas tags.

---

## Próximos passos sugeridos (não executados)

1. Confirmar com você os agrupamentos de cor da seção 1.4 antes de fundir (especialmente os 2 tons de verde e os 3 pares de gradiente placeholder).
2. Definir a escala de espaçamento (seção 3.4) como base para os tokens antes de tocar em qualquer CSS.
3. Decidir se `.head-tag` deveria existir em `case-genesis.html` (gap de conteúdo, não só de token).
4. Priorizar as meta tags dos case pages (seção 7) — é a correção de menor risco e maior impacto imediato (compartilhamento social).
