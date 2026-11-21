/**
 * Textos do case do Simpósio TEA-GV em /projetos/tea-gv/ (issues #37 e #39).
 * Só em português por enquanto, como os próprios materiais.
 */

const apresentacao = [
  "Capa",
  "Manifesto",
  "Trajetória",
  "Quem realiza",
  "Galeria",
  "Galeria",
  "Público",
  "Números",
  "Alcance nas redes",
  "Palestrantes",
  "Experiência",
  "Na imprensa",
  "Por que apoiar",
  "Próxima edição",
];

const cotas = [
  "Capa",
  "Resumo",
  "Público e alcance",
  "Visibilidade",
  "Visão geral das cotas",
  "Cota Diamante",
  "Cota Ouro",
  "Cota Prata",
  "Cota Bronze",
  "Contato",
];

export const teaGvText = {
  pageNames: {
    apresentacao,
    cotas,
    "apresentacao-h": apresentacao,
    "cotas-h": cotas,
  },
  logoAlt: "Logo do Simpósio TEA-GV",
  kicker: "O Simpósio",
  gallery: {
    open: "Ampliar",
    close: "Fechar",
    prev: "Página anterior",
    next: "Próxima página",
    of: "de",
    dialogLabel: "Página ampliada",
    hint: "Toque em uma página para ampliar. Use as setas para passar.",
  },
  page: {
    title: "Simpósio TEA-GV · Materiais comerciais 2027",
    description:
      "Apresentação comercial, cotas de patrocínio e design system do Simpósio TEA-GV 2027, o maior simpósio sobre autismo e TDAH de Minas Gerais. Design de Hugu Gomes.",
    navLabel: "Voltar ao portfólio",
    back: "Todos os trabalhos",
    badge: "Projeto · Novembro de 2026",
    titleA: "Materiais comerciais",
    titleB: "2027",
    intro:
      "Apresentação comercial e cotas de patrocínio do Simpósio TEA-GV, o maior simpósio sobre autismo e TDAH de Minas Gerais. Materiais pensados pra circular no WhatsApp, com versões horizontais pra teste A/B e um Design System construído a partir da identidade do evento no Instagram.",
    statusLabel: "O projeto",
    statusNum: "48",
    statusText: "páginas desenhadas: 24 verticais e 24 horizontais, mais o Design System.",
    sections: {
      apresentacao: {
        badge: "PDF 1 · 14 páginas",
        titleA: "Apresentação do",
        titleB: "evento",
        text: "O material que apresenta o TEA-GV para possíveis apoiadores: a história, o público, os números e o convite para fazer parte.",
      },
      cotas: {
        badge: "PDF 2 · 10 páginas",
        titleA: "Cotas de",
        titleB: "patrocínio",
        text: "O material complementar com as formas de apoio, onde a marca aparece e as contrapartidas de cada cota.",
      },
      "apresentacao-h": {
        badge: "Teste A/B · PDF 1 horizontal",
        titleA: "Apresentação · versão",
        titleB: "horizontal",
        text: "A mesma apresentação em formato 16:9, para apresentar em tela, reuniões ou enviar por e-mail.",
      },
      "cotas-h": {
        badge: "Teste A/B · PDF 2 horizontal",
        titleA: "Cotas · versão",
        titleB: "horizontal",
        text: "As cotas de patrocínio no mesmo formato 16:9 da apresentação.",
      },
    },
    ds: {
      badge: "Entregável · Identidade organizada",
      titleA: "Design System do",
      titleB: "TEA-GV",
      text: "A identidade do evento organizada em um só lugar, para manter todos os próximos materiais consistentes com o Instagram.",
      cards: {
        cores:
          "Cores: azuis do evento, branco e as quatro cores da faixa (vermelho, laranja, verde e azul).",
        tipografia:
          "Tipografia: Barlow Condensed nos títulos, script em destaques e Barlow para textos corridos.",
        logos:
          "Logos e selos: logo do Simpósio e os selos das cotas Bronze, Prata, Ouro e Diamante.",
        elementos:
          "Elementos: fundos com textura de quebra-cabeça, 7 variações de luz, cards, títulos e selos de cota.",
      },
    },
    ctaTitle: "Tem um evento pra divulgar?",
    ctaText:
      "Apresentações, cotas de patrocínio e identidade para eventos que precisam convencer apoiadores.",
    ctaButton: "Conversar pelo WhatsApp",
    ctaMessage: "Oi, Hugu! Vi o case do TEA-GV e quero conversar sobre um projeto.",
    credit: "Design: Hugu Gomes · Novembro de 2026 · Valores e contatos desfocados por privacidade",
  },
};
