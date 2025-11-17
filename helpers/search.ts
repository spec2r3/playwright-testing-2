import { Page, Locator, expect } from '@playwright/test';

export async function searchForTerm(page: Page, term: string) {
  const searchInput = page.locator('[data-test="search-query"]');
  await searchInput.fill(term);
  await page.locator('[data-test="search-submit"]').click();
}

export async function verifySearchResults(page: Page, term: string) {
  const results: Locator = page.locator('.card, .product-card, [data-test="product"]');
  const count = await results.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const productName = await results.nth(i).locator('[data-test="product-name"]').innerText();
    expect(productName.toLowerCase()).toContain(term.toLowerCase());
  }
}

export async function resetSearch(page: Page) {
  await page.locator('[data-test="search-reset"]').click();
}