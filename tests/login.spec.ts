import { test, expect } from '@playwright/test';
import { USERS } from '../config/users';
import { login } from '../helpers/login';

const sel = {
  greeting: '[data-test="nav-menu-account"]',
  error: '[data-test="login-error"]'
};

test.describe('Login', () => {

  test('Test valid login', async ({ page }) => {
    const user = USERS.customer;
    await login(page, user.email, user.password);
    await expect(page).toHaveURL(/\/account$/);
    await page.locator('[data-test="nav-profile"]').click();
    await expect(page).toHaveURL(/\/account\/profile$/);
    await expect(page.locator('[data-test="first-name"]')).toHaveValue(user.firstName);
    await expect(page.locator('[data-test="last-name"]')).toHaveValue(user.lastName);
    await expect(page.locator('[data-test="email"]')).toHaveValue(user.email);
  });

  test('Test invalid login', async ({ page }) => {
    const invalidCustomer = USERS.invalidCustomer;
    await login(page, invalidCustomer.email, invalidCustomer.password);
    const errorMsg = page.locator('[data-test="login-error"]');
    await expect(errorMsg).toBeVisible();
  });
});