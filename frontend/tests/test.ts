import { expect, test } from '@playwright/test';

// Scenario: Iniciar partida
test('Iniciar partida', async ({ page }) => {
	// Given: ingreso la palabra "agil"
	await page.goto('/create-game');
	const input = page.locator('input');
	await input.fill('agil');

	const button = page.locator('button');

	await Promise.allSettled([button.click(), page.waitForResponse((response) => response.ok())]);

	//Then: debería ver el link a la partida
	const anchor = page.locator('a');
	expect(anchor).toBeVisible();

	//Then: al hacer click debería ver la letra revelada en la palabra
	await Promise.allSettled([anchor.click(), page.waitForResponse((response) => response.ok())]);

	const dashes = await page.locator('.dash').all();
	expect(dashes.length).toBe(4);
});

// Scenario: Ingresar letra válida
test('Ingresar letra válida', async ({ page }) => {
	// Given: ingreso la palabra "agil"

	await page.goto('/create-game');
	const input = page.locator('input');
	await input.fill('agil');

	const button = page.locator('button');

	await Promise.allSettled([button.click(), page.waitForResponse((response) => response.ok())]);

	//Then: debería ver el link a la partida
	const anchor = page.locator('a');
	await Promise.allSettled([page.waitForResponse((response) => response.ok())]);

	expect(anchor).toBeVisible();

	// When: intento la letra "g"
	// Then: debería ver la letra revelada en la palabra
	// Then: la cantidad de vidas debería ser "7"
});
