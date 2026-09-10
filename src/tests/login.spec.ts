import { test, expect } from '@playwright/test';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Login } from '../tasks/Login';
import { CartBadge } from '../questions/CartBadge';

test('un usuario estándar puede iniciar sesión', async ({ page }) => {
  const alexis = Actor.named('Alexis').whoCan(BrowseTheWeb.using(page));

  await page.goto('/');
  await alexis.attemptsTo(Login.withCredentials('standard_user', 'secret_sauce'));

  await expect(page).toHaveURL(/inventory.html/);
});