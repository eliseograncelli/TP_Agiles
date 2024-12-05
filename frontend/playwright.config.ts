import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		headless: true
	},
	webServer: {
		command: 'pnpm build && pnpm preview && cd ../backend && go build && ./utn',
		port: 4173
	},

	testDir: 'e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
