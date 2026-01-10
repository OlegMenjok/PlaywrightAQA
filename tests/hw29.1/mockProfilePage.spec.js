import { test, expect } from '../fixtures/myfixture.js';

const MOCK_NAME = 'AQA';
const MOCK_LAST_NAME = 'TEST';

test.describe
  .only('Change credential in the response /api/users/profile', () => {
    test('test', async ({ userGaragePage }) => {
      const { page } = userGaragePage;
      await page.route('**/api/users/profile', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json; charset=utf-8',
          body: JSON.stringify({
            status: 'ok',
            data: {
              userId: 262627,
              photoFilename: 'default-user.png',
              name: MOCK_NAME,
              lastName: MOCK_LAST_NAME,
            },
          }),
        });
      });

      await page.goto(`${process.env.BASE_URL}/panel/profile`);

      const profileCreds = page.locator('p.profile_name');

      await expect(profileCreds).toHaveText(`${MOCK_NAME} ${MOCK_LAST_NAME}`, {
        timeout: 5000,
      });
    });
  });
