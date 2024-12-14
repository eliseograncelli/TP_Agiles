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

When('hace click en el link de la partida', async function () {
	const anchor = page.locator('a');
	await Promise.allSettled([anchor.click(), page.waitForResponse((response) => response.ok())]);
});

Then('ve la palabra oculta con {string} letras', async function (count) {
	await page.waitForSelector('.dash', { state: 'visible' });
	const dashes = await page.locator('.dash').all();
	expect(dashes.length).toBe(Number(count));
});

Given('Partida iniciada con la palabra {string}', async function (word) {
	await page.goto(BASE_URL + '/create-game');
	page.locator('input').fill(word);
	await Promise.allSettled([
		page.locator('button').click(),
		page.waitForResponse((response) => response.ok())
	]);
	await Promise.allSettled([
		page.locator('a').click(),
		page.waitForResponse((response) => response.ok())
	]);
});

When('intento la letra {string}', async function (string) {
	page.locator('#letter-input').fill(string);
	await Promise.allSettled([
		page.locator('#letter-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);
});

Then('debería ver la letra {string} en la letras arriesgadas', async function (word) {
	expect(await page.locator('#guesses').innerText()).toContain(word);
});

Then('debería ver la letra revelada como {string}', async function (string) {
	string.split(' ').forEach(async (word) => {
		const dash = page.locator(`[data-testid="letter-${word}"]`);
		expect(await dash.innerText()).toBe(word);
	});
});

Then('la cabeza es {string}', function (string) {
	if (string === 'visible') {
		expect(page.locator('.head')).toBeVisible();
	} else {
		expect(page.locator('.head')).not.toBeVisible();
	}
});

Then('la cuerpo es {string}', function (string) {
	if (string === 'visible') {
		expect(page.locator('.body')).toBeVisible();
	} else {
		expect(page.locator('.body')).not.toBeVisible();
	}
});
