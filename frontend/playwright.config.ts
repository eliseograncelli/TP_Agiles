import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		headless: false
	},
	webServer: {
		command: 'pnpm build && pnpm preview && cd ../backend && go build && ./utn'
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
