/**
 * Liga o Sentry depois que a página terminou de carregar, para não pesar no
 * carregamento. Erros, desempenho e Web Vitals; sem Session Replay e sem dados
 * pessoais. Desligado em localhost (desenvolvimento e E2E da CI).
 */
import { SENTRY } from "../config/observability";
import { isLocalHost, scrubEvent } from "../lib/privacy";

async function start() {
  if (!SENTRY.dsn || isLocalHost(location.hostname)) return;
  const Sentry = await import("@sentry/browser");
  Sentry.init({
    dsn: SENTRY.dsn,
    environment: location.hostname.endsWith(".pages.dev") ? "preview" : "production",
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: SENTRY.tracesSampleRate,
    sendDefaultPii: false,
    beforeSend: (event) => scrubEvent(event),
    beforeSendTransaction: (event) => scrubEvent(event),
  });
}

const idle = (fn: () => void) =>
  "requestIdleCallback" in window ? requestIdleCallback(fn) : setTimeout(fn, 1);

if (document.readyState === "complete") idle(start);
else addEventListener("load", () => idle(start), { once: true });
