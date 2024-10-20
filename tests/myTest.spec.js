import { test, expect } from "@playwright/test";
test.describe("Testing", () => {
  test("Perform Login", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    expect(await page.locator('[data-test="inventory-item"]').count()).toBeGreaterThan(1);
  });

  test("Add product to the cart", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    const products = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];
    const card = page.locator('[data-test="inventory-item"]', { hasText: product });
    const productName = await card.locator('[data-test="inventory-item-name"]').textContent();
    await card.getByRole("button").click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText("1");
    await page.locator('[data-test="shopping-cart-link"]').click();
    expect(await card.locator('[data-test="inventory-item-name"]').textContent()).toBe(productName);
    await card.getByRole("button").click();
    await expect(card).not.toBeVisible();
  });
});
