import type { Api } from './state';

function delay<const T>(res: T, miliseconds: number) {
	return new Promise<T>((resolve) => {
		setTimeout(() => {
			resolve(res);
		}, miliseconds);
	});
}

export class MockApi implements Api {
	constructor(private secret: string) {}

	async guessesLetter(letter: string) {
		if (this.secret.includes(letter)) {
			const encodedWord = await this.getEncodedWord();
			return delay({ status: 'match', encodedWord }, 100);
		}
		return delay({ status: 'miss' }, 100);
	}

	async getEncodedWord() {
		const { length } = this.secret;
		const encoded = String('#').repeat(length);
		return delay(encoded, 100);
	}
}
