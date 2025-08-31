import { test, expect } from '@playwright/test';

test.describe('Register user', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test('Register new user | positive | Registration complete', async ({ page }) => {
    // Arrange
    await page.fill('#signupName', 'myuser');
    await page.fill('#signupLastName', 'testlastname');
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(`qaq+${Math.floor(Math.random()*100)}@gmail.com`);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(`Qwerty12345`);
    await page.getByRole('textbox', { name: 'Re-enter password' }).fill(`Qwerty12345`);

    // Act
    await page.getByRole('button', { name: 'Register' }).click()

    // Assert
    await expect(page.locator('div').filter({ hasText: 'Registration complete' }).nth(3)).toHaveText('Registration complete');
  });

    test('Register new user | negative | Empty user name', async ({ page }) => {
    // Arrange
    await page.fill('#signupName', '');

    // Act
    await page.getByText('Registration×').click()

    // Assert
    await expect(page.getByText('Name required')).toBeVisible();
  });
      test('Register new user | negative | Invalid last name', async ({ page }) => {
    // Arrange
    await page.fill('#signupLastName', 'm');

    // Act
    await page.getByText('Registration×').click()

    // Assert
    await expect(
     page.getByText('Last name has to be from 2 to 20 characters long')
    ).toBeVisible();
  });
      test('Register new user | negative | Invalid email', async ({ page }) => {
    // Arrange
    await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(`qaq+${Math.floor(Math.random()*100)}gmail.com`);

    // Act
    await page.getByText('Registration×').click()

    // Assert
    await expect(page.getByText('Email is incorrect')).toBeVisible();
  });


    test('Register new user | negative | Invalid password', async ({ page }) => {
    // Arrange
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(`12345`)

    // Act
    await page.getByText('Registration×').click()

    // Assert
    await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  });

    test('Register new user | negative | Re-entered password mismatch', async ({ page }) => {
    // Arrange
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(`Qwerty12345`);
    await page.getByRole('textbox', { name: 'Re-enter password' }).fill(`Qwerty123456`);

    // Act
    await page.getByText('Registration×').click()

    // Assert
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });
});
