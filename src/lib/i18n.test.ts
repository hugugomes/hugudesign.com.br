import { describe, expect, it } from "vitest";
import { alternates, hrefFor, localizedPath, withLinks } from "./i18n";

describe("localizedPath", () => {
  it("português fica na raiz", () => {
    expect(localizedPath("pt", "links")).toBe("/links/");
    expect(localizedPath("pt", "/")).toBe("/");
  });

  it("inglês e espanhol ganham prefixo", () => {
    expect(localizedPath("en", "/links/")).toBe("/en/links/");
    expect(localizedPath("es", "")).toBe("/es/");
  });
});

describe("alternates", () => {
  it("lista os três idiomas", () => {
    expect(alternates("links")).toEqual([
      { lang: "pt", href: "/links/" },
      { lang: "en", href: "/en/links/" },
      { lang: "es", href: "/es/links/" },
    ]);
  });
});

describe("hrefFor", () => {
  it("vazio continua vazio", () => {
    expect(hrefFor("instagram", "")).toBe("");
  });

  it("e-mail vira mailto", () => {
    expect(hrefFor("email", "contato@hugudesign.com.br")).toBe("mailto:contato@hugudesign.com.br");
    expect(hrefFor("email", "mailto:a@b.c")).toBe("mailto:a@b.c");
  });

  it("outros links passam direto", () => {
    expect(hrefFor("github", "https://github.com/hugugomes")).toBe("https://github.com/hugugomes");
  });
});

describe("withLinks", () => {
  it("esconde itens sem link", () => {
    const items = [{ href: "https://a" }, { href: "" }, { href: "  " }];
    expect(withLinks(items)).toEqual([{ href: "https://a" }]);
  });
});
