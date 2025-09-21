//import { test, expect } from '@playwright/test';
import { RegisterPage } from '../hw24.1/pomRegisterUser.js';
import { GaragePage } from '../pageObject/garagePage.js';
import {test, expect} from '../fixtures/myfixture.js'


test.describe.only('Garage fixture', () =>{
    test.only('test', async ({ userGaragePage }) => {
        // Arrange
        await userGaragePage.addCarButton.click()
        await userGaragePage.addMillage.fill('1234');

        // Act
        await userGaragePage.createNewCar.click();

        //Assert
        await expect(userGaragePage.createdEntity).toBeVisible();

    });
})
