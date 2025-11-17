import { Page } from '@playwright/test';


export async function login(page: Page, email: string, password: string) {
  await page.goto('/auth/login');
  await page.getByPlaceholder('Your email').fill(email);
  await page.getByPlaceholder('Your password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}