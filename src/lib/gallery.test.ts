import { describe, expect, it } from "vitest";
import { buildPages, withoutPrices, wrapIndex } from "./gallery";

describe("buildPages", () => {
  it("numera as páginas com dois dígitos a partir de 01", () => {
    const pages = buildPages("cotas", 10);
    expect(pages).toHaveLength(10);
    expect(pages[0]).toEqual({ id: "cotas-01", group: "cotas", num: 1, label: "01", price: false });
    expect(pages[9]?.id).toBe("cotas-10");
  });

  it("marca só as páginas com preço", () => {
    const pages = buildPages("cotas", 10, [5, 6]);
    expect(pages.filter((p) => p.price).map((p) => p.label)).toEqual(["05", "06"]);
  });

  it("não gera nada com quantidade zero ou negativa", () => {
    expect(buildPages("x", 0)).toEqual([]);
    expect(buildPages("x", -3)).toEqual([]);
  });
});

describe("withoutPrices", () => {
  it("remove as páginas com preço e mantém a ordem", () => {
    const pages = buildPages("cotas", 10, [5, 6, 7, 8, 9]);
    expect(withoutPrices(pages).map((p) => p.label)).toEqual(["01", "02", "03", "04", "10"]);
  });
});

describe("wrapIndex", () => {
  it("mantém índices dentro do intervalo", () => {
    expect(wrapIndex(3, 14)).toBe(3);
  });

  it("volta para o início depois do último", () => {
    expect(wrapIndex(14, 14)).toBe(0);
  });

  it("vai para o último antes do primeiro", () => {
    expect(wrapIndex(-1, 14)).toBe(13);
  });

  it("devolve 0 numa lista vazia", () => {
    expect(wrapIndex(5, 0)).toBe(0);
  });
});
