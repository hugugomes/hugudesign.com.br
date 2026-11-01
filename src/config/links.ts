/**
 * Links da página /links. Deixe "" para esconder um item até ele existir.
 * Mudar um link aqui é tudo o que precisa: a página se ajusta sozinha.
 */
export const LINKS = {
  whatsapp: "https://wa.me/5511980737232",
  email: "",
  instagram: "",
  behance: "",
  linkedin: "",
  github: "https://github.com/hugugomes",
  youtube: "",
  spotify: "",
  planner: "",
  portfolio: "https://hugudesign.com.br/",
} as const;

export type LinkKey = keyof typeof LINKS;
