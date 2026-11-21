/**
 * Textos do Simpósio TEA-GV (issue #37): a prévia para a cliente em /tea-gv/
 * e o case em /projetos/tea-gv/. Só em português por enquanto: a prévia é
 * para uma cliente brasileira e o case ainda depende de autorização.
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
  preview: {
    title: "Prévia 2 · Materiais comerciais TEA-GV",
    description: "Prévia dos materiais comerciais 2027 do Simpósio TEA-GV, para validação.",
    badge: "Prévia 2 · 21 de novembro de 2026",
    titleA: "Materiais comerciais",
    titleB: "2027",
    intro:
      "Dra., esta é a segunda prévia, já com todas as informações que você enviou. Os dois materiais estão completos na versão vertical (para WhatsApp) e na horizontal (para o teste A/B), além do guia da identidade visual do TEA-GV.",
    statusLabel: "Status da prévia",
    statusNum: "48",
    statusText:
      "páginas prontas para a sua avaliação: 24 verticais e 24 horizontais, mais o Design System.",
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
    feedbackTitle: "Tem algum ajuste?",
    feedbackText:
      "Me diga o número da página e o que mudar (por exemplo, “Cotas 06: trocar a foto”). Respondo pelo WhatsApp.",
    feedbackCta: "Enviar ajustes pelo WhatsApp",
    feedbackMessage: "Oi, Hugu! Sobre a Prévia 2 do TEA-GV:",
    credit: "Design: Hugu Gomes · Prévia 2 para validação · Novembro de 2026",
  },
  case: {
    title: "Simpósio TEA-GV",
    description:
      "Apresentação comercial, cotas de patrocínio e design system do Simpósio TEA-GV 2027, por Hugu Gomes.",
    back: "Todos os trabalhos",
    eyebrow: "Projeto · Materiais comerciais",
    h1: "Simpósio TEA-GV",
    lead: "Uma apresentação que mostra para apoiadores que o TEA-GV é mais do que um evento: é um movimento.",
    meta: [
      ["Cliente", "Simpósio TEA-GV · Lotus Medicina e Saúde"],
      ["Edição", "2027"],
      ["Escopo", "Apresentação comercial · cotas de patrocínio"],
      ["Entregas", "48 páginas · vertical e horizontal · design system"],
    ],
    heroAlt: "Capa da apresentação comercial do Simpósio TEA-GV, versão horizontal",
    challengeTitle: "O projeto",
    challengeText:
      "Quatro edições de história, números, imprensa e palestrantes organizadas num material que convence apoiadores. A versão vertical vai pelo WhatsApp; a horizontal serve para apresentar em tela e reuniões.",
    apresentacaoTitle: "Apresentação do evento",
    cotasTitle: "Cotas de patrocínio",
    cotasNote: "Os valores das cotas ficam só com a organização do evento.",
    horizontalTitle: "Versão horizontal",
    dsTitle: "Design system",
    dsText:
      "A identidade organizada em um só lugar para os próximos materiais seguirem a mesma linguagem do Instagram do evento.",
    nextLabel: "Ver outros trabalhos",
  },
};
