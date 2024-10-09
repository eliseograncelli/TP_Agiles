import { readonly, writable } from 'svelte/store';

export type GuessesLetterResponse = { status: 'match'; encodedWord: string } | { status: 'miss' };

export interface Api {
	guessesLetter(letter: string): Promise<GuessesLetterResponse>;
	getEncodedWord(): Promise<string>;
}

export function createGameState(api: Api) {
	const loading = writable(false);
	const lives = writable(7);
	const guesses = writable([] as string[]);
	const word = writable('#####');

	return {
		stores: {
			loading: readonly(loading),
			lives: readonly(lives),
			guesses: readonly(guesses),
			word: readonly(word)
		},
		actions: {
			guessesLetter: (letter: string) => {
				guesses.update((g) => [...g, letter]);
				loading.set(true);

				api.guessesLetter(letter).then((res) => {
					if (res.status === 'miss') {
						lives.update((l) => l - 1);
					} else {
						word.set(res.encodedWord);
					}
					loading.set(false);
				});
			}
		}
	};
}
