# AGENTS.md — hugudesign.com.br

Regras do projeto para **qualquer agente de IA, de qualquer modelo** (Claude, GPT, Gemini, Copilot, Cursor…) e para humanos.
Se uma instrução de chat entrar em conflito com este arquivo, pergunte ao Hugu antes de seguir.

## 1. O projeto
- Portfólio de **Hugu Gomes** (designer, branding e social media). Público: clientes no Brasil e no exterior.
- **Astro** (site estático) + TypeScript + CSS puro. Idiomas: `/` (PT-BR), `/en/`, `/es/`. Páginas: home, cases, `/links/` e `/cv/`.
- Hospedagem: **Hostinger** (domínio hugudesign.com.br). O deploy é feito pelo GitHub Actions quando um PR entra na `main`.
- Referência visual e de textos: a pasta `docs/prototipo/` (protótipo aprovado) e `docs/conteudo/`.

## 2. Fluxo de trabalho: Issue → Branch → PR → Deploy (obrigatório)
1. **Toda tarefa começa com uma Issue no GitHub.** Use um dos tipos, com a label correspondente:
   - `correção` (bug), `melhoria` (algo que já existe) ou `nova-função`.
   - A issue tem: contexto, o que fazer, critérios de aceite (checklist) e, se for visual, print ou link do protótipo.
2. **Nada é commitado direto na `main`.** Crie a branch a partir da `main` com o nome `tipo/numero-descricao-curta`, por exemplo `fix/12-menu-mobile`, `feat/7-pagina-links` ou `chore/3-ci`.
3. **Commits no padrão Conventional Commits** (validados pelo commitlint): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`, `style:`.
4. **Abra um PR para cada issue.** A descrição do PR **precisa mencionar a issue** com `Closes #N`, para fechá-la no merge. Siga o template `.github/pull_request_template.md`.
5. **O PR só entra quando a CI está verde:** lint, tipos, arquitetura, código morto, testes unitários, integração e E2E, além da cobertura no Codecov.
6. **O merge na `main` publica o site.** Só faça merge com aprovação explícita do Hugu, porque o site está no ar. Use squash merge.
7. Um PR deve ser pequeno e focado em uma issue. Se descobrir outra tarefa no caminho, abra uma issue nova em vez de aumentar o PR.
8. Há uma única exceção a essas regras: os commits iniciais de configuração do repositório (31/10/2026). Daqui em diante, tudo passa por PR.

## 3. Motion e estados de carregamento
Use a skill **design-motion-principles** (de Kyle Zantos, licença MIT), que está vendorizada em `.agents/skills/design-motion-principles/`. Leia o `SKILL.md` e o `workflows/create.md` antes de criar ou mexer em qualquer animação.

- **Peso por contexto** (portfólio criativo): a principal é **Jakub** (polimento sutil), a secundária é **Jhey** (expressão no hero, CTA e mascote) e **Emil** vale para interações frequentes (menu, filtros, troca de idioma e tema).
- **Todo elemento que carrega conteúdo precisa ter:**
  - **Skeleton** no lugar de imagens, carrosséis e cards enquanto carregam. O skeleton usa a mesma proporção (`aspect-ratio`) do conteúdo final, para não pular o layout (CLS ≈ 0).
  - **Lazy loading:** `loading="lazy"` e `decoding="async"` em toda imagem abaixo da dobra, e `fetchpriority="high"` só na imagem principal do hero. Use `srcset` com WebP/AVIF pelo `<Image>` do Astro.
  - **Animação de entrada:** opacidade 0→1, `translateY` de 8px→0 e `blur` de 4px→0, com easing próprio (nunca `ease` puro), entre 200 e 500ms e em sequência (stagger) nas listas.
  - **Animação de saída:** mais sutil que a de entrada (translateY de no máximo 12px e mais curta).
  - **Carregamento e progresso:** barra de progresso na troca de página (View Transitions do Astro), progresso nos carrosséis e indicador de imagem carregando.
- **Regras fixas da skill:**
  - Anime só `transform`, `opacity`, `filter` e `clip-path`. Nunca anime `width`, `height`, `top`, `left` ou `margin`.
  - **`prefers-reduced-motion` é obrigatório** em toda animação, no mesmo código.
  - Animações em loop (marquee, mascote) precisam ter como pausar. Nada de pulsar para chamar atenção.
  - Ações de teclado e cliques muito frequentes são instantâneos.
  - Nunca comece uma animação de `scale(0)`. O mínimo é `scale(0.9)`.
- Tokens de motion ficam em `src/styles/motion.css` (durações, curvas e distâncias). Não use números soltos espalhados pelo código.

## 4. Qualidade de código
| Ferramenta | Para quê | Comando |
|---|---|---|
| **Biome** | lint e formatação (JS, TS, JSON, CSS) | `npm run lint` / `npm run format` |
| **astro check** + TypeScript `strict` | checagem de tipos | `npm run typecheck` |
| **dependency-cruiser** (contrato de arquitetura) | regras de quem pode importar quem (ver `.dependency-cruiser.cjs`) | `npm run arch` |
| **Knip** | código, exports e dependências não usados | `npm run knip` |
| **commitlint** + husky | padrão das mensagens de commit | roda no `commit-msg` |
| **Stryker** | teste de mutação (qualidade dos testes) | `npm run mutation` (semanal na CI e manual) |

Contrato de arquitetura:
- `src/lib/` não importa de `src/components/` nem de `src/pages/`.
- `src/components/` não importa de `src/pages/`.
- Textos traduzidos vêm só de `src/i18n/`. Nada de texto fixo no componente.

## 5. Testes
- **Unitários e de integração:** Vitest (`npm test`), cobrindo `src/lib/` e `src/i18n/`, como troca de idioma, tema e filtros. Meta de cobertura: 80% em `src/lib`.
- **E2E:** Playwright (`npm run e2e`), testando Chromium, WebKit e um celular. Os testes cobrem:
  - navegação nos 3 idiomas;
  - modo escuro;
  - links quebrados;
  - acessibilidade (axe);
  - modo reduced-motion;
  - prints de regressão visual.
- **Cobertura:** relatório enviado ao **Codecov** em todo PR (precisa do secret `CODECOV_TOKEN`).
- Bug corrigido = teste novo que reproduz o bug.

## 6. Observabilidade
- **Sentry** (`@sentry/astro`, que usa OpenTelemetry por baixo) registra erros de JavaScript, desempenho e Web Vitals. A amostragem fica baixa (`tracesSampleRate: 0.1`) e o Session Replay fica desligado. O DSN vai em `PUBLIC_SENTRY_DSN`.
- **Datadog e New Relic não são usados:** são pagos e repetiriam o que o Sentry já faz num site estático. Só reavalie se surgir um back-end.
- Nunca envie dados pessoais para ferramentas de monitoramento.

## 7. Conteúdo e restrições
- **Catholicum** e **Grupo Empresarial Castro** ficam atrás das flags `SHOW_CATHOLICUM` e `SHOW_CASTRO` em `src/config/flags.ts`, desligadas por padrão. Os contratos exigem autorização por escrito antes de publicar, e o Catholicum exige o crédito "Catholicum Studio".
- **Repositório público:** imagens de Catholicum e Castro **não entram no repositório** antes da autorização por escrito, porque num repo público até um arquivo escondido fica visível.
- O **Pitch CMAC** nunca entra no site.
- Imagens: WebP ou AVIF, no máximo 2400px, e menos de 3 MB por página.
- Nada de segredo no repositório: tokens só em GitHub Secrets ou `.env` (que está no `.gitignore`).

## 8. Comandos
```bash
npm ci            # instalar
npm run dev       # desenvolvimento (localhost:4321)
npm run check     # lint + typecheck + arch + knip + testes (o mesmo que a CI)
npm run e2e       # Playwright
npm run build     # gera dist/
```
