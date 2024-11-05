import { readonly, writable } from 'svelte/store';

export type GuessesLetterResponse = { status: 'match'; encodedWord: string } | { status: 'miss' };

export interface Api {
	getGame(id: string): Promise<{ encode: string }>;
	guessesLetter(letter: string): Promise<GuessesLetterResponse>;
}

export function createGameState(api: Api, gameId: string) {
	const word = writable('');
	api.getGame(gameId).then((game) => {
		word.set(game.encode);
	});

	const loading = writable(false);
	const lives = writable(7);
	const guesses = writable([] as string[]);

	function guessesLetter(letter: string) {
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

	function guessesWord(word: string) {
		//TODO:implement
		console.log(word);
	}

	return {
		stores: {
			loading: readonly(loading),
			lives: readonly(lives),
			guesses: readonly(guesses),
			word: readonly(word)
		},
		actions: { guessesLetter, guessesWord }
	};
}
