import { test, expect } from '@playwright/test';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Login } from '../tasks/Login';
import { VerifyLoginMessage } from '../tasks/VerifyLoginMessage';
import { readCSV } from '../utils/csvReader';

const usersData = readCSV('src/utils/test-data/users-data.csv');

usersData.forEach((data:any) => {

  test(`${data.testCaseId} - User ${data.username} try to log in`, async ({ page }) => {
    const alexis = Actor.named('Alexis').whoCan(BrowseTheWeb.using(page));

    await page.goto('/');
    await alexis.attemptsTo(Login.withCredentials(data.username, 'secret_sauce'));
    
    if (data.expectedResult === 'success') {
      await expect(page).toHaveURL(/inventory.html/);
    } else {
      VerifyLoginMessage.displays('Epic sadface: Sorry, this user has been locked out.');
    }
  });
});