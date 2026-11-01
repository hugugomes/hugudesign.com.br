import { describe, expect, it } from "vitest";
import { canonicalUrl, pageTitle, SITE_NAME } from "./seo";

const SITE = "https://hugudesign.com.br";

describe("canonicalUrl", () => {
  it("mantém a raiz", () => {
    expect(canonicalUrl("/", SITE)).toBe("https://hugudesign.com.br/");
  });

  it("acrescenta a barra final", () => {
    expect(canonicalUrl("/links", SITE)).toBe("https://hugudesign.com.br/links/");
  });

  it("não duplica a barra final", () => {
    expect(canonicalUrl("/en/cv/", SITE)).toBe("https://hugudesign.com.br/en/cv/");
  });

  it("remove query e hash", () => {
    expect(canonicalUrl("/links?utm=ig#topo", SITE)).toBe("https://hugudesign.com.br/links/");
  });

  it("trata caminho vazio como a raiz", () => {
    expect(canonicalUrl("", SITE)).toBe("https://hugudesign.com.br/");
  });

  it("aceita site como URL", () => {
    expect(canonicalUrl("/es", new URL(SITE))).toBe("https://hugudesign.com.br/es/");
  });
});

describe("pageTitle", () => {
  it("usa só o nome quando não há título", () => {
    expect(pageTitle()).toBe(SITE_NAME);
    expect(pageTitle("   ")).toBe(SITE_NAME);
  });

  it("não repete o nome", () => {
    expect(pageTitle("Hugu Gomes")).toBe(SITE_NAME);
  });

  it("junta título e nome", () => {
    expect(pageTitle(" Links ")).toBe("Links — Hugu Gomes");
  });
});
