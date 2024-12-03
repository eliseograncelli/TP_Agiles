import { expect, test } from '@playwright/test';

// Scenario: Iniciar partida
test('Iniciar partida', async ({ page }) => {
	// Given: ingreso la palabra "agil"
	await page.goto('/create-game');
	const input = await page.locator('input');
	await input.fill('agil');

	const button = await page.locator('button');

	await Promise.allSettled([button.click(), page.waitForResponse((response) => response.ok())]);

	//Then: debería ver el link a la partida
	const anchor = await page.locator('a');
	expect(anchor).toBeVisible();
});
