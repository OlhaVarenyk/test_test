import { test, expect } from "@playwright/test";

test("test1", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  expect(await page.locator('[data-test="inventory-item"]').count()).toBeGreaterThan(1);
});

test("test2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  const productName = await page.textContent('[data-test="inventory-item-name"]');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText("1");
  await page.locator('[data-test="shopping-cart-link"]').click();
  expect(await page.textContent('[data-test="item-4-title-link"]')).toBe(productName);
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="inventory-item"]').isHidden();
});
