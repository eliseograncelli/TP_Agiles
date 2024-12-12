import { expect, test } from '@playwright/test';
import { Api } from '../src/lib/api';

const api = new Api('http://localhost:8000');

test.beforeAll(async () => {
	for (let i = 0; i < 10; i++) {
		const { ok } = await api.healthCheck();
		if (ok) {
			break;
		}
	}
});

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
	expect(await page.locator('#guesses').innerText()).toContain('G');

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
	expect(await page.locator('#guesses').innerText()).toContain('Y');

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
test('Arriesgo la palabra correcta', async ({ page }) => {
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

	//    When arriesgo la palabra "agil"
	page.locator('#word-input').fill('agil');
	await Promise.allSettled([
		page.locator('#word-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);

	//    Then debería aparecerme un cartel que diga "Ganaste"

	const dialog = await page.waitForEvent('dialog');
	expect(dialog.message()).toBe('Ganaste');
});

//  Scenario: Arriesgo una palabra incorrecta
test('Arriesgo la palabra incorrecta', async ({ page }) => {
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

	//    When arriesgo la palabra "hola"
	page.locator('#word-input').fill('hola');
	await Promise.allSettled([
		page.locator('#word-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);

	// Then: debería aparecerme un cartel que diga "Perdiste"
	const dialog = await page.waitForEvent('dialog');
	expect(dialog.message()).toBe('Perdiste');
});

//  Scenario: Arriesgo la misma palabra incorrecta dos veces
test('Arriesgo la misma palabra incorrecta dos veces', async ({ page }) => {
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

	// When: intento la letra "y" dos veces
	for (const _ of Array(2)) {
		page.locator('#letter-input').fill('y');
		await Promise.allSettled([
			page.locator('#letter-btn').click(),
			page.waitForResponse((response) => response.ok())
		]);
	}

	// Then: debería ver la letra 'Y' en la letras arriesgadas UNA SOLA VEZ
	expect(await page.locator('#guesses').innerText()).toEqual('Y');
});

//  Scenario: Arriesgo la misma palabra correcta dos veces
test('Arriesgo la misma palabra correcta dos veces', async ({ page }) => {
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

	// When: intento la letra "y" dos veces
	for (const _ of Array(2)) {
		page.locator('#letter-input').fill('g');
		await Promise.allSettled([
			page.locator('#letter-btn').click(),
			page.waitForResponse((response) => response.ok())
		]);
	}

	// Then: debería ver la letra 'Y' en la letras arriesgadas UNA SOLA VEZ
	expect(await page.locator('#guesses').innerText()).toEqual('G');
});

//  Scenario: Cuando recargo la pagina, se debe mantener el estado de la partida
test('Cuando recargo la pagina, se debe mantener el estado de la partida', async ({ page }) => {
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

	// When: intento la letra "g" y "x"
	page.locator('#letter-input').fill('g');
	await Promise.allSettled([
		page.locator('#letter-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);
	page.locator('#letter-input').fill('x');
	await Promise.allSettled([
		page.locator('#letter-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);

	// When: recargo la pagina
	await page.reload();

	// Then: debería ver la letra 'g' y 'x' en la letras arriesgadas
	expect(await page.locator('#guesses').innerText()).toContain('G');
	expect(await page.locator('#guesses').innerText()).toContain('X');

	// Then: debería ver la letra revelada en la palabra
	expect(await page.locator('[data-testid="letter-0"]').innerText()).toBe('_');
	expect(await page.locator('[data-testid="letter-1"]').innerText()).toBe('G');
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
