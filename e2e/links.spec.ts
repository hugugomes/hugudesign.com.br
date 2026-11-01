import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/** Espera as animações de entrada (finitas) terminarem antes de medir cores. */
async function settle(page: Page) {
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Number.POSITIVE_INFINITY)
        .map((a) => a.finished),
    ),
  );
}

const PAGES = [
  { path: "/links/", lang: "pt-BR", cta: "Solicitar orçamento" },
  { path: "/en/links/", lang: "en", cta: "Request a quote" },
  { path: "/es/links/", lang: "es", cta: "Solicitar presupuesto" },
];

for (const p of PAGES) {
  test.describe(`links ${p.path}`, () => {
    test("abre no idioma certo com o botão de orçamento", async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator("html")).toHaveAttribute("lang", p.lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hugu Gomes");
      const cta = page.getByRole("link", { name: new RegExp(p.cta) });
      await expect(cta).toHaveAttribute("href", /wa\.me\/5511980737232/);
    });

    test("sem violações de acessibilidade (axe)", async ({ page }) => {
      await page.goto(p.path);
      await settle(page);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(results.violations).toEqual([]);
    });
  });
}

test("seletor de idioma leva para a mesma página", async ({ page }) => {
  await page.goto("/links/");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/links\/$/);
  await expect(page.getByRole("link", { name: "PT", exact: true })).toBeVisible();
});

test("hreflang aponta para os três idiomas", async ({ page }) => {
  await page.goto("/links/");
  const hrefs = await page
    .locator('link[rel="alternate"][hreflang]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
  expect(hrefs).toEqual(expect.arrayContaining(["pt-BR", "en", "es", "x-default"]));
});

test("a foto sai do skeleton depois de carregar", async ({ page }) => {
  await page.goto("/links/");
  await expect(page.locator("[data-skeleton]")).toHaveClass(/is-loaded/);
});

test("links internos e imagens respondem sem erro", async ({ page, request }) => {
  await page.goto("/links/");
  const urls = await page
    .locator('a[href^="/"], img[src^="/"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? el.getAttribute("src") ?? ""));
  for (const u of new Set(urls)) {
    const res = await request.get(u);
    expect(res.status(), u).toBeLessThan(400);
  }
});
