import { expect, test } from '@playwright/test';

// Scenario: Iniciar partida
test('Iniciar partida', async ({ page }) => {
	// Given: ingreso la palabra "agil"
	await page.goto('/create-game');
	page.locator('input').fill('agil');
	await Promise.allSettled([
		page.locator('button').click(),
		page.waitForResponse((response) => response.ok())
	]);

	//Then: debería ver el link a la partida
	const anchor = page.locator('a');
	expect(anchor).toBeVisible();

	//Then: al hacer click debería ver la pantalla de juego con la palabra oculta
	await Promise.allSettled([anchor.click(), page.waitForResponse((response) => response.ok())]);
	await page.waitForSelector('.dash', { state: 'visible' });
	const dashes = await page.locator('.dash').all();
	expect(dashes.length).toBe(4);
});

// Scenario: Ingresar letra válida
test('Ingresar letra válida', async ({ page }) => {
	// Given: Partida iniciada con la palabra "agil"
	await page.goto('/create-game');
	page.locator('input').fill('agil');
	await Promise.allSettled([
		page.locator('button').click(),
		page.waitForResponse((response) => response.ok())
	]);
	await Promise.allSettled([
		page.locator('a').click(),
		page.waitForResponse((response) => response.ok())
	]);

	// When: intento la letra "g"
	page.locator('#letter-input').fill('g');
	await Promise.allSettled([
		page.locator('#letter-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);

	// Then: debería ver la letra g en la letras arriesgadas
	expect(await page.locator('#guesses').innerText()).toContain('g');

	// Then: debería ver la letra revelada en la palabra
	expect(await page.locator('[data-testid="letter-0"]').innerText()).toBe('_');
	expect(await page.locator('[data-testid="letter-1"]').innerText()).toBe('G');
	expect(await page.locator('[data-testid="letter-2"]').innerText()).toBe('_');
	expect(await page.locator('[data-testid="letter-3"]').innerText()).toBe('_');

	// Then: la cantidad de vidas debería ser "7"
	expect(page.locator('#head')).not.toBeVisible();
	expect(page.locator('#body')).not.toBeVisible();
	expect(page.locator('#left-arm')).not.toBeVisible();
	expect(page.locator('#right-arm')).not.toBeVisible();
	expect(page.locator('#left-leg')).not.toBeVisible();
	expect(page.locator('#right-leg')).not.toBeVisible();
	expect(page.locator('#cut')).not.toBeVisible();
	expect(page.locator('#eyes')).not.toBeVisible();
});

// Scenario: Ingresar letra inválida
test('Ingresar letra inválida', async ({ page }) => {
	// Given: Partida iniciada con la palabra "agil"
	await page.goto('/create-game');
	page.locator('input').fill('agil');
	await Promise.allSettled([
		page.locator('button').click(),
		page.waitForResponse((response) => response.ok())
	]);
	await Promise.allSettled([
		page.locator('a').click(),
		page.waitForResponse((response) => response.ok())
	]);

	// When: intento la letra "y"
	page.locator('#letter-input').fill('y');
	await Promise.allSettled([
		page.locator('#letter-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);

	// Then: debería ver la letra y en la letras arriesgadas
	expect(await page.locator('#guesses').innerText()).toContain('y');

	// Then: la palabra revelada deberia seguir igual
	expect(await page.locator('[data-testid="letter-0"]').innerText()).toBe('_');
	expect(await page.locator('[data-testid="letter-1"]').innerText()).toBe('_');
	expect(await page.locator('[data-testid="letter-2"]').innerText()).toBe('_');
	expect(await page.locator('[data-testid="letter-3"]').innerText()).toBe('_');

	// Then: la cantidad de vidas debería ser "6"
	expect(page.locator('.head')).toBeVisible();
	expect(page.locator('.body')).not.toBeVisible();
	expect(page.locator('.left-arm')).not.toBeVisible();
	expect(page.locator('.right-arm')).not.toBeVisible();
	expect(page.locator('.left-leg')).not.toBeVisible();
	expect(page.locator('.right-leg')).not.toBeVisible();
	expect(page.locator('.cut')).not.toBeVisible();
	expect(page.locator('.eyes')).not.toBeVisible();
});

//  Scenario: Arriesgo la palabra correcta
//    Given ingreso la palabra "elefante"
//    When arriesgo la palabra "elefante"
//    Then debería aparecerme un cartel que diga "Ganaste!"

//  Scenario: Arriesgo una palabra incorrecta
//    Given ingreso la palabra "elefante"
//    When arriesgo la palabra "dinosaurio"
//    Then debería aparecerme un cartel que diga "Perdiste!"
