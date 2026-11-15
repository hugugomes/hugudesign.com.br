import { describe, expect, it } from "vitest";
import { isLocalHost, scrubEvent, stripQuery } from "./privacy";

describe("stripQuery", () => {
  it("tira query e hash", () => {
    expect(stripQuery("https://hugudesign.com.br/links/?email=a@b.com#x")).toBe(
      "https://hugudesign.com.br/links/",
    );
    expect(stripQuery("/en/#trabalhos")).toBe("/en/");
  });

  it("mantém URL sem query", () => {
    expect(stripQuery("https://hugudesign.com.br/")).toBe("https://hugudesign.com.br/");
  });
});

describe("isLocalHost", () => {
  it("reconhece hosts locais", () => {
    for (const h of ["localhost", "127.0.0.1", "[::1]", "site.localhost"]) {
      expect(isLocalHost(h)).toBe(true);
    }
  });

  it("não confunde o site publicado", () => {
    for (const h of ["hugudesign.com.br", "hugudesign.pages.dev", "localhost.com"]) {
      expect(isLocalHost(h)).toBe(false);
    }
  });
});

describe("scrubEvent", () => {
  it("remove usuário, cookies, cabeçalhos, corpo e query", () => {
    const event = scrubEvent({
      user: { email: "alguem@exemplo.com" },
      request: {
        url: "https://hugudesign.com.br/?nome=Ana",
        cookies: { a: "1" },
        headers: { "User-Agent": "x" },
        query_string: "nome=Ana",
        data: { mensagem: "oi" },
      },
    });
    expect(event).toEqual({ request: { url: "https://hugudesign.com.br/" } });
  });

  it("limpa URLs dos breadcrumbs e ignora os sem dados", () => {
    const event = scrubEvent({
      breadcrumbs: [
        { data: { url: "/links/?utm=ig", from: "/?a=1", to: "/en/?b=2", status: 200 } },
        {},
      ],
    });
    expect(event.breadcrumbs).toEqual([
      { data: { url: "/links/", from: "/", to: "/en/", status: 200 } },
      {},
    ]);
  });

  it("aceita evento sem request nem breadcrumbs", () => {
    expect(scrubEvent({})).toEqual({});
  });
});
