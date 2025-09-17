import { test, expect } from '@playwright/test';
import { RegisterPage } from './pomRegisterUser';

test.describe('Register user', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test('Register new user | positive | Registration complete', async () => {
    await registerPage.fillName('myuser');
    await registerPage.fillLastName('testlastname');
    await registerPage.fillEmail(
      `qaq+${Math.floor(Math.random() * 100)}@gmail.com`,
    );
    await registerPage.fillPassword('Qwerty12345');
    await registerPage.fillReenterPassword('Qwerty12345');
    await registerPage.submit();

    await expect(await registerPage.getRegistrationMessage()).toHaveText(
      'Registration complete',
    );
  });

  test('Register new user | negative | Empty user name', async () => {
    await registerPage.fillName('');
    await registerPage.closeRegistrationPopup();
    await expect(registerPage.page.getByText('Name required')).toBeVisible();
  });

  test('Register new user | negative | Invalid last name', async () => {
    await registerPage.fillLastName('m');
    await registerPage.closeRegistrationPopup();
    await expect(
      registerPage.page.getByText(
        'Last name has to be from 2 to 20 characters long',
      ),
    ).toBeVisible();
  });

  test('Register new user | negative | Invalid email', async () => {
    await registerPage.fillEmail(
      `qaq+${Math.floor(Math.random() * 100)}gmail.com`,
    );
    await registerPage.closeRegistrationPopup();
    await expect(
      registerPage.page.getByText('Email is incorrect'),
    ).toBeVisible();
  });

  test('Register new user | negative | Invalid password', async () => {
    await registerPage.fillPassword('12345');
    await registerPage.closeRegistrationPopup();
    await expect(
      registerPage.page.getByText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      ),
    ).toBeVisible();
  });

  test('Register new user | negative | Re-entered password mismatch', async () => {
    await registerPage.fillPassword('Qwerty12345');
    await registerPage.fillReenterPassword('Qwerty123456');
    await registerPage.closeRegistrationPopup();
    await expect(
      registerPage.page.getByText('Passwords do not match'),
    ).toBeVisible();
  });
});
