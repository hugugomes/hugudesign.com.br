/**
 * Sentry (AGENTS.md §6). O DSN é público por natureza (vai no JavaScript do
 * site) e pode ser trocado pela variável PUBLIC_SENTRY_DSN no build.
 */
export const SENTRY = {
  dsn:
    import.meta.env.PUBLIC_SENTRY_DSN ||
    "https://7293cbb3034f72f13021fd409db4c34f@o4512348687958016.ingest.us.sentry.io/4512348723609600",
  /** Amostragem baixa de desempenho: 10% das visitas. */
  tracesSampleRate: 0.1,
} as const;
