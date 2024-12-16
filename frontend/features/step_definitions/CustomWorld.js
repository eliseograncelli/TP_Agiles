import { World } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

export default class extends World {
	/** @type {import('@playwright/test').Page} */
	page = null;

	constructor(options) {
		super(options);
	}

	async init() {
		const browser = await chromium.launch({ headless: true });
		const context = await browser.newContext();
		this.page = await context.newPage();
	}
}
