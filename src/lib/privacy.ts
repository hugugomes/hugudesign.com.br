/**
 * Limpeza de dados pessoais antes de enviar qualquer coisa ao Sentry (AGENTS.md §6).
 * Lógica pura, sem depender do SDK, para poder testar.
 */

/** Tira query string e hash de uma URL (podem carregar e-mail, nome, tokens). */
export function stripQuery(url: string): string {
  const cut = url.search(/[?#]/);
  return cut === -1 ? url : url.slice(0, cut);
}

/** Hosts onde o monitoramento fica desligado (desenvolvimento e testes da CI). */
export function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost")
  );
}

interface Scrubbable {
  user?: unknown;
  request?: {
    url?: string;
    cookies?: unknown;
    headers?: unknown;
    query_string?: unknown;
    data?: unknown;
  };
  breadcrumbs?: { data?: { [key: string]: unknown } }[];
}

/** Remove usuário, cookies, cabeçalhos, corpo e query strings de um evento. */
export function scrubEvent<T extends Scrubbable>(event: T): T {
  event.user = undefined;
  if (event.request) {
    event.request.cookies = undefined;
    event.request.headers = undefined;
    event.request.query_string = undefined;
    event.request.data = undefined;
    if (event.request.url) event.request.url = stripQuery(event.request.url);
  }
  for (const crumb of event.breadcrumbs ?? []) {
    const data = crumb.data;
    if (!data) continue;
    for (const key of ["url", "from", "to"]) {
      const value = data[key];
      if (typeof value === "string") data[key] = stripQuery(value);
    }
  }
  return event;
}
