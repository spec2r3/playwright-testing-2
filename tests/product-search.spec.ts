import { test, expect } from '@playwright/test';
import { INVALID_SEARCH_TERMS, SEARCH_TERMS } from '../config/products';
import { searchForTerm, verifySearchResults, resetSearch } from '../helpers/search';
import {getProductCount} from '../helpers/products';

test.describe('Search Products', () => {

  test('Test search', async ({ page }) => {
    await page.goto('');
    const apiResponse = page.waitForResponse(resp => resp.url().includes('/products/search') && resp.status() === 200);
    const randomTerm = SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)];
    await searchForTerm(page, randomTerm);
    await apiResponse;
    await verifySearchResults(page, randomTerm);
  });

  test('Test clear search', async ({ page }) => {
    await page.goto('');
    const totalProducts = await getProductCount(page);
    const randomTerm = SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)];
    const apiResponse = page.waitForResponse(resp =>
      resp.url().includes('/products/search') && resp.status() === 200
    );
    await searchForTerm(page, randomTerm);
    await apiResponse;
    const searchCount = await getProductCount(page);
    expect(searchCount).toBeLessThan(totalProducts);
    const apiResponseReset = page.waitForResponse(resp =>
      resp.url().includes('/products?page=0') && resp.status() === 200
    );
    await resetSearch(page);
    await apiResponseReset;
    const clearedCount = await getProductCount(page);
    expect(clearedCount).toBe(totalProducts);
  });
  test('Test invalid search', async ({ page }) => {
    await page.goto('');
    const invalidTerm = INVALID_SEARCH_TERMS[0];
    const apiResponse = page.waitForResponse(resp => resp.url().includes('/products/search') && resp.status() === 200);
    await searchForTerm(page, invalidTerm);
    await apiResponse;
    await expect(page.locator('[data-test="no-results"]')).toBeVisible();
   });

});