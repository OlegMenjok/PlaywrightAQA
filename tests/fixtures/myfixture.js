import { test as base, expect as baseExpect } from '@playwright/test';
import { RegisterPage } from '../hw24.1/pomRegisterUser.js';
import { GaragePage } from '../pageObject/garagePage.js';

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './state/user-state.json',
    });

    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    await page.goto('/panel/garage');

    await use(garagePage);
  },

  // userGaragePage: async({page}, use) => {
  //     const signInPage = new RegisterPage(page);
  //     await signInPage.login()
  //     await signInPage.fillSignInEmail('testaqa@gmail.com');
  //     await signInPage.fillPassword('Qwerty12345');
  //     await signInPage.loginSubmitButton();

  //     await baseExpect(page).toHaveURL(/garage/)
  //     const garagePage = new GaragePage(page)

  //     await use(garagePage)
  // }
});

export const expect = baseExpect;
