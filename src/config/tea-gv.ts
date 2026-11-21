/**
 * Materiais comerciais 2027 do Simpósio TEA-GV (issue #37).
 * As imagens ficam em src/assets/tea-gv/<grupo>-<nn>.webp: versão de portfólio,
 * com valores das cotas e contatos desfocados.
 */

export const TEA_GROUPS = [
  { key: "apresentacao", orient: "portrait", count: 14 },
  { key: "cotas", orient: "portrait", count: 10 },
  { key: "apresentacao-h", orient: "landscape", count: 14 },
  { key: "cotas-h", orient: "landscape", count: 10 },
] as const;

export const TEA_DS_CARDS = ["cores", "tipografia", "logos", "elementos"] as const;
