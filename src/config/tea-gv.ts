/**
 * Materiais comerciais 2027 do Simpósio TEA-GV (issue #37).
 * As imagens ficam em src/assets/tea-gv/<grupo>-<nn>.webp.
 */

export const TEA_GROUPS = [
  { key: "apresentacao", orient: "portrait", count: 14 },
  { key: "cotas", orient: "portrait", count: 10 },
  { key: "apresentacao-h", orient: "landscape", count: 14 },
  { key: "cotas-h", orient: "landscape", count: 10 },
] as const;

export type TeaGroup = (typeof TEA_GROUPS)[number]["key"];

/**
 * Páginas das cotas que mostram os valores (R$). Aparecem só na prévia
 * para a cliente; o case público nunca mostra essas páginas.
 */
export const TEA_PRICE_PAGES: Partial<Record<TeaGroup, number[]>> = {
  cotas: [5, 6, 7, 8, 9],
  "cotas-h": [5, 6, 7, 8, 9],
};

export const TEA_DS_CARDS = ["cores", "tipografia", "logos", "elementos"] as const;
