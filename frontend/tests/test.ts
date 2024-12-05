import { expect, test } from '@playwright/test';
import { a } from 'vitest/dist/chunks/suite.CcK46U-P.js';

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

// Scenario: Ingresar letra válida

test('Ingresar letra válida', async ({ page }) => {
	// Given: ingreso la palabra "agil"

	await page.goto('/create-game');
	const input = await page.locator('input');
	await input.fill('agil');

	const button = await page.locator('button');

	await Promise.allSettled([button.click(), page.waitForResponse((response) => response.ok())]);

	//Then: debería ver el link a la partida
	const anchor = await page.locator('a');
	await Promise.allSettled([page.waitForResponse((response) => response.ok())]);

	// When: intento la letra "g"
	// Then: debería ver la letra revelada en la palabra
	// Then: la cantidad de vidas debería ser "7"
});
