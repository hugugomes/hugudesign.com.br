import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("abre com título, nome e idioma", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Hugu Gomes/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hugu Gomes");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
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
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });

  test("não tem links quebrados internos", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page
      .locator('a[href^="/"], link[rel="icon"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    for (const href of new Set(hrefs)) {
      const res = await request.get(href);
      expect(res.status(), href).toBeLessThan(400);
    }
  });
});
