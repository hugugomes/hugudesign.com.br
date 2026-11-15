import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("abre com título, nome e idioma", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hugu Gomes/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hugu Gomes");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });

  test("aplica o tema antes da primeira pintura", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", /^(light|dark)$/);
  });

  test("tem URL canônica absoluta", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hugudesign.com.br/",
    );
  });

  test("sem violações de acessibilidade (axe)", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });

  test("não tem links quebrados internos", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page
      .locator('a[href^="/"], link[rel="icon"][href^="/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    for (const href of new Set(hrefs)) {
      const res = await request.get(href);
      expect(res.status(), href).toBeLessThan(400);
    }
  });

  test("seletor de idioma leva para a home em EN e ES", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.getByRole("link", { name: "ES", exact: true }).click();
    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  test("hreflang aponta para os três idiomas", async ({ page }) => {
    await page.goto("/en/");
    const hrefs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((els) => els.map((e) => e.getAttribute("hreflang")));
    expect(hrefs).toEqual(expect.arrayContaining(["pt-BR", "en", "es", "x-default"]));
  });

  test("botão de tema alterna e lembra a escolha", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const before = await html.getAttribute("data-theme");
    const after = before === "dark" ? "light" : "dark";
    await page.locator("[data-theme-toggle]").click();
    await expect(html).toHaveAttribute("data-theme", after);
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", after);
  });
});

for (const path of ["/en/", "/es/"]) {
  test(`sem violações de acessibilidade em ${path} (axe)`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}

