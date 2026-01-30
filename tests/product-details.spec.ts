import { test, expect } from '@playwright/test';
import { verifyProductDetails,getRandomProduct, goToPage, getRandomPageNumber } from '../helpers/products';

test.describe('View Product Details', () => {
  
  test('Test product details page', async ({ page }) => {
    await page.goto('');
    const randomPage = await getRandomPageNumber(page);
    await goToPage(page,randomPage);
    await page.waitForSelector('.card, .product-card, [data-test="product"]');

    const randomProduct = await getRandomProduct(page);
    await verifyProductDetails(page, randomProduct);
  });

});