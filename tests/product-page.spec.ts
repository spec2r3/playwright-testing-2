import { test, expect } from '@playwright/test';
import { verifyProductsVisibility, goToPage, getRandomPageNumber } from '../helpers/products';

test.describe('View Product List', () => {
  test('Check products visibility', async ({ page }) => {
    await page.goto('');
    await verifyProductsVisibility(page);
  });
  test('Check product links and pagination', async ({ page }) => {
    await page.goto('');
    const randomPage = await getRandomPageNumber(page);
    await goToPage(page, randomPage);
    await verifyProductsVisibility(page,true);
  });
  test('Check scroll', async ({ page }) => {
    await page.goto('');
    const products = page.locator('.card, .product-card, [data-test="product"]');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
        const product = products.nth(i);
        await product.scrollIntoViewIfNeeded();
        await expect(product).toBeVisible();
    }
   });
});