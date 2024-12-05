import { readonly, writable } from 'svelte/store';
import type { Api } from './api';

export function createGameState(api: Api) {
	const word = writable('');
	api.getGame().then((game) => {
		word.set(game.encode);
	});

	const loading = writable(false);
	const lives = writable(7);
	const playing = writable(true);
	const guesses = writable([] as string[]);

	async function guessesLetter(letter: string) {
		guesses.update((g) => [...g, letter]);
		loading.set(true);

		const res = await api.guessesLetter(letter);

		switch (res.type) {
			case 'repeated-letter':
				alert('Letra repetida');
				break;
			case 'correct':
				word.set(res.encoded);
				break;
			case 'wrong':
				lives.set(res.lives);
				break;
			case 'won':
				word.set(res.encoded);
				playing.set(false);
				setTimeout(() => alert('Ganaste'), 20);
				break;
			case 'loss':
				playing.set(false);
				lives.set(0);
				setTimeout(() => alert('Perdiste'), 20);
				break;
		}

		loading.set(false);
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
			word: readonly(word),
			playing: readonly(playing)
		},
		actions: { guessesLetter, guessesWord }
	};
}
