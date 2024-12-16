import { Given, Then, When, Before, setWorldConstructor } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import CustomWorld from './CustomWorld.js';
setWorldConstructor(CustomWorld);

const BASE_URL = 'http://localhost:5173';

Before(async function () {
	await this.init();
});

/** @typedef {import('@playwright/test').Page} Page */

Given('navego a {string}', async function (path) {
	/** @type {Page} */ const page = this.page;
	await page.goto(BASE_URL + path);
});

When('clicko en el botón Jugar', async function () {
	/** @type {Page} */ const page = this.page;
	await Promise.allSettled([
		page.locator('button').click(),
		page.waitForResponse((response) => response.ok())
	]);
});

Given('ingreso la palabra {string}', function (word) {
	/** @type {Page} */ const page = this.page;
	page.locator('input').fill(word);
});

Then('debería ver el link a la partida', function () {
	/** @type {Page} */ const page = this.page;
	const anchor = page.locator('a');
	expect(anchor).toBeVisible();
});

When('hace click en el link de la partida', async function () {
	/** @type {Page} */ const page = this.page;
	const anchor = page.locator('a');
	await Promise.allSettled([anchor.click(), page.waitForResponse((response) => response.ok())]);
});

Then('ve la palabra oculta con {string} letras', async function (count) {
	/** @type {Page} */ const page = this.page;
	await page.waitForSelector('.dash', { state: 'visible' });
	const dashes = await page.locator('.dash').all();
	expect(dashes.length).toBe(Number(count));
});

Given('Partida iniciada con la palabra {string}', async function (word) {
	/** @type {Page} */ const page = this.page;
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
	/** @type {Page} */ const page = this.page;
	page.locator('#letter-input').fill(string);
	await Promise.allSettled([
		page.locator('#letter-btn').click(),
		page.waitForResponse((response) => response.ok())
	]);
});

Then('debería ver la letra {string} en la letras arriesgadas', async function (word) {
	/** @type {Page} */ const page = this.page;
	expect(await page.locator('#guesses').innerText()).toContain(word);
});

Then('debería ver la letra revelada como {string}', async function (string) {
	/** @type {Page} */ const page = this.page;
	const letters = string.split(' ');
	for (let i = 0; i < letters.length; i++) {
		const dash = page.locator(`[data-testid="letter-${i}"]`);
		expect(await dash.innerText()).toBe(letters[i]);
	}
});

Then('la cabeza es {string}', function (string) {
	/** @type {Page} */ const page = this.page;
	if (string === 'visible') {
		expect(page.locator('.head')).toBeVisible();
	} else {
		expect(page.locator('.head')).not.toBeVisible();
	}
});

Then('la cuerpo es {string}', function (string) {
	/** @type {Page} */ const page = this.page;
	if (string === 'visible') {
		expect(page.locator('.body')).toBeVisible();
	} else {
		expect(page.locator('.body')).not.toBeVisible();
	}
});
