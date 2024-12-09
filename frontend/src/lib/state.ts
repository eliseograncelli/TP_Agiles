import { derived, readonly, writable } from 'svelte/store';
import type { Api } from './api';

export function createGameState(api: Api, gameId: string) {
	const word = writable('');
	api.getGame(gameId).then((game) => {
		word.set(game.encode);
	});

	const loading = writable(false);
	const lives = writable(7);
	const playing = writable(true);
	const guesses = writable(new Set());

	async function guessesLetter(letter: string) {
		guesses.update((g) => g.add(letter));
		loading.set(true);

		const res = await api.guessesLetter(gameId, letter);

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

	async function guessesWord(guessedWord: string) {
		loading.set(true);

		const res = await api.guessWord(gameId, guessedWord);

		switch (res.type) {
			case 'won':
				word.set(guessedWord);
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

	return {
		stores: {
			loading: readonly(loading),
			lives: readonly(lives),
			guesses: derived(guesses, (g) => Array.from(g)),
			word: readonly(word),
			playing: readonly(playing)
		},
		actions: { guessesLetter, guessesWord }
	};
}
