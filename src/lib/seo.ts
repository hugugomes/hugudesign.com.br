export const SITE_NAME = "Hugu Gomes";

/**
 * Monta a URL canônica de uma página: sempre absoluta, sem query/hash
 * e com barra no fim (o build gera `pasta/index.html`).
 */
export function canonicalUrl(pathname: string, site: URL | string): string {
  const clean = pathname.split(/[?#]/)[0] || "/";
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return new URL(withSlash, site).href;
}

/** Título da aba: "Página — Hugu Gomes", ou só o nome na home. */
export function pageTitle(title?: string): string {
  const t = title?.trim();
  if (!t || t === SITE_NAME) return SITE_NAME;
  return `${t} — ${SITE_NAME}`;
}
