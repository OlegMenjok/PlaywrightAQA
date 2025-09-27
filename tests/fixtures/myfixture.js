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

    await use({ garagePage, page });
  },
});

export const expect = baseExpect;
