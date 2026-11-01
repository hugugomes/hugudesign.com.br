import { LANGS, type Lang } from "../i18n/ui";

/** Caminho de uma página num idioma: pt fica na raiz, en/es ganham prefixo. */
export function localizedPath(lang: Lang, path: string): string {
  const clean = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const base = clean === "/" ? "/" : `${clean}/`;
  return lang === "pt" ? base : `/${lang}${base}`;
}

/** Mesma página em todos os idiomas (para o seletor e o hreflang). */
export function alternates(path: string): { lang: Lang; href: string }[] {
  return LANGS.map((lang) => ({ lang, href: localizedPath(lang, path) }));
}

/** Monta a URL de e-mail ou devolve o link como está. */
export function hrefFor(kind: string, value: string): string {
  if (!value) return "";
  if (kind === "email" && !value.startsWith("mailto:")) return `mailto:${value}`;
  return value;
}

/** Só os itens que já têm link. */
export function withLinks<T extends { href: string }>(items: T[]): T[] {
  return items.filter((item) => item.href.trim() !== "");
}
