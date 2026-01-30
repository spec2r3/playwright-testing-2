import { test, expect} from '@playwright/test';
import { getProductCount } from '../helpers/products';
import { verifySearchResults } from '../helpers/search';
import { FILTERS } from '../config/products';

test.describe('Product Category Filters', () => {
 test('Test filter', async ({ page }) => {
    await page.goto('');
    const topCategories = Object.keys(FILTERS.categories);
    const randomCategory = topCategories[Math.floor(Math.random() * topCategories.length)];
    const apiResponse = page.waitForResponse(resp =>
      resp.url().includes('/products?') && resp.status() === 200
    );
    await page.locator('#filters').getByText(randomCategory).click();
    await apiResponse;
    const count = await getProductCount(page);
    expect(count).toBeGreaterThan(0);
  });
  test('Test sub-category filter', async ({ page }) => {
    await page.goto('');

    const topCategories = Object.keys(FILTERS.categories);
    const randomTopCategory = topCategories[Math.floor(Math.random() * topCategories.length)];
    const subCategories = FILTERS.categories[randomTopCategory];
    const randomSubCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
    const apiResponse = page.waitForResponse(resp =>
      resp.url().includes('/products?') && resp.status() === 200
    );

    await page.getByText(randomSubCategory).click();
    await apiResponse;
    const count = await getProductCount(page);
    expect(count).toBeGreaterThan(0);
  });
  test('Test brand', async ({ page }) => {
   await page.goto('');

  const randomBrand = FILTERS.brands[Math.floor(Math.random() * FILTERS.brands.length)];
  await page.locator('#filters').getByText(randomBrand).click();
  await page.waitForResponse(resp =>
    resp.url().includes('/products') && resp.status() === 200
  );

  const count = await getProductCount(page);
  expect(count).toBeGreaterThan(0);
  
  });

});