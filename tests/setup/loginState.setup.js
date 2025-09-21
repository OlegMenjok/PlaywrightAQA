import { test, expect } from '@playwright/test';
import { RegisterPage } from '../hw24.1/pomRegisterUser.js';
import { GaragePage } from '../pageObject/garagePage.js';

test.describe('Setup', () => {
  test('Login and save', async ({ page }) => {
    const signInPage = new RegisterPage(page);
    await signInPage.login();

    await signInPage.fillSignInEmail('testaqa@gmail.com');
    await signInPage.fillPassword('Qwerty12345');
    await signInPage.loginSubmitButton();

    await expect(page).toHaveURL(/garage/);

    await page.context().storageState({
      path: './state/user-state.json',
    });
  });
});
