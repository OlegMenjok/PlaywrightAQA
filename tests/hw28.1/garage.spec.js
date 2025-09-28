import { test, expect } from '../fixtures/myfixture.js';

test.describe('Garage fixture', () => {
  test('test', async ({ userGaragePage }) => {
    // Arrange
    await userGaragePage.addCarButton.click();
    await userGaragePage.addMillage.fill('1234');

    // Act
    await userGaragePage.createNewCar.click();

    //Assert
    await expect(userGaragePage.createdEntity).toBeVisible();
  });
});
