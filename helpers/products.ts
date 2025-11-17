import { Page, Locator, expect } from '@playwright/test';

export async function verifyProductsVisibility(page: Page, checkNavigation = false) {
  const products: Locator = page.locator('.card, .product-card, [data-test="product"]');
  await expect(products.first()).toBeVisible();
  const count = await products.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const product = products.nth(i);
    await expect(product.locator('[data-test="product-name"]')).toBeVisible();
    await expect(product.locator('img')).toBeVisible();
    await expect(product.locator('[data-test="product-price"], .price')).toBeVisible();

    if (checkNavigation) {
    await product.click();
    await expect(page).toHaveURL(/\/product\/[A-Z0-9]+/);
    await page.goBack();
    await expect(products.nth(i)).toBeVisible();
    }
  }
}

export async function goToPage(page: Page, pageNumber: number) {
  await page.getByRole('button', { name: `Page-${pageNumber}` }).click();
}

export async function getRandomPageNumber(page: Page): Promise<number> {
  const pageLinks = page.locator('app-pagination ul li a');
  await expect(pageLinks.first()).toBeVisible();

  const pages: string[] = [];
  const count = await pageLinks.count();

  for (let i = 0; i < count; i++) {
    const text = (await pageLinks.nth(i).innerText()).trim();
    if (text !== '«' && text !== '»') {
      pages.push(text);
    }
  }

  if (pages.length === 0) throw new Error('No pagination pages found');

  const randomIndex = Math.floor(Math.random() * pages.length);
  return Number(pages[randomIndex]);
}

export async function verifyProductDetails(page: Page, product: Locator) {
  await product.click();
  await expect(page).toHaveURL(/\/product\/[A-Z0-9]+/);

  await expect(page.locator('[data-test="product-name"]')).toBeVisible();
  await expect(page.locator('[data-test="unit-price"]')).toBeVisible();
  await expect(page.locator('[data-test="product-description"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeEnabled();

  await page.goBack();
  await expect(product).toBeVisible();
}

export async function getRandomProduct(page: Page): Promise<Locator> {
  const products: Locator = page.locator('.card, .product-card, [data-test="product"]');
  const count = await products.count();
  expect(count).toBeGreaterThan(0);

  const randomIndex = Math.floor(Math.random() * count);
  return products.nth(randomIndex);
}

export async function getProductCount(page: Page): Promise<number> {
  const products: Locator = page.locator('.card, .product-card, [data-test="product"]');
  return await products.count();
}