import { readonly, writable } from 'svelte/store';
import type { Api } from './mock-api';



export function createGameState(api: Api, gameId: string) {
	const word = writable('');
	api.getGame(gameId).then((game) => {
		word.set(game.encode);
	});

	const loading = writable(false);
	const lives = writable(7);
	const guesses = writable([] as string[]);

	async function guessesLetter(letter: string) {
		guesses.update((g) => [...g, letter]);
		loading.set(true);

		const res= await api.guessesLetter(letter)
		
		switch(res.type){
			case 'repeated-letter':
				alert("Letra repetida")
				break
			case 'correct':
				word.set(res.encoded)
				break
			case 'wrong':
				lives.set(res.lives)
				break
			case 'won':
				alert("Ganaste")
				break
			case 'loss':
				alert("Peridate")
				break
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
			word: readonly(word)
		},
		actions: { guessesLetter, guessesWord }
	};
}
