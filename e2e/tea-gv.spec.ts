import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/** Espera as animações finitas terminarem antes de medir cores. */
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

const CASE = "/projetos/tea-gv/";

test.describe("case /projetos/tea-gv", () => {
  test("é publicado e pode aparecer nos buscadores", async ({ page }) => {
    await page.goto(CASE);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Materiais comerciais");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("mostra as 48 páginas nas quatro seções e o design system", async ({ page }) => {
    await page.goto(CASE);
    await expect(page.locator("[data-gallery] [data-full]")).toHaveCount(48);
    await expect(page.locator("[data-gallery]")).toHaveCount(4);
    await expect(page.locator(".ds li")).toHaveCount(4);
  });

  test("amplia uma página e navega pelas setas", async ({ page }) => {
    await page.goto(CASE);
    await page.getByRole("button", { name: /Apresentação do evento, 03 · Trajetória/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("[data-lb-count]")).toHaveText("3 de 14");
    await page.keyboard.press("ArrowRight");
    await expect(dialog.locator("[data-lb-cap]")).toContainText("04 · Quem realiza");
    await dialog.getByRole("button", { name: "Página anterior" }).click();
    await dialog.getByRole("button", { name: "Página anterior" }).click();
    await expect(dialog.locator("[data-lb-count]")).toHaveText("2 de 14");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("a primeira e a última página dão a volta", async ({ page }) => {
    await page.goto(CASE);
    await page.getByRole("button", { name: /Cotas de patrocínio, 01 · Capa/ }).click();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("dialog").locator("[data-lb-count]")).toHaveText("10 de 10");
  });

  test("volta para os trabalhos e tem o botão de contato", async ({ page }) => {
    await page.goto(CASE);
    await expect(page.getByRole("link", { name: "Todos os trabalhos" })).toHaveAttribute(
      "href",
      "/#trabalhos",
    );
    const cta = page.getByRole("link", { name: /Conversar pelo WhatsApp/ });
    await expect(cta).toHaveAttribute("href", /^https:\/\/wa\.me\/5511980737232\?text=/);
  });

  test("sem violações de acessibilidade (axe)", async ({ page }) => {
    await page.goto(CASE);
    await settle(page);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
});
