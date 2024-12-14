import { Given, Then, When } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

Given('navego a {string}', async function (path) {
	await page.goto(BASE_URL + path);
});

When('clicko en el botón Jugar', async function () {
	await Promise.allSettled([
		page.locator('button').click(),
		page.waitForResponse((response) => response.ok())
	]);
});

Given('ingreso la palabra {string}', function (word) {
	page.locator('input').fill(word);
});

Then('debería ver el link a la partida', function () {
	const anchor = page.locator('a');
	expect(anchor).toBeVisible();
});

// Then('al hacer click debería ver la pantalla de juego con la palabra oculta', function () {
// });

When('hace click en el link de la partida', async function () {
	const anchor = page.locator('a');
	await Promise.allSettled([anchor.click(), page.waitForResponse((response) => response.ok())]);
});

Then('ve la palabra oculta con {string} letras', async function (count) {
	await page.waitForSelector('.dash', { state: 'visible' });
	const dashes = await page.locator('.dash').all();
	expect(dashes.length).toBe(Number(count));
});
