import { PUBLIC_BACKEND_URL } from '$env/static/public';

type GameResponse =
	| { type: 'repeated-letter' }
	| { type: 'correct'; encoded: string }
	| { type: 'wrong'; lives: number }
	| { type: 'won'; encoded: string }
	| { type: 'loss' };

const baseUrl = `${location.protocol}//${location.host}/`;

export class Api {
	static async createGame(word: string, opts: { baseUrl?: string } = { baseUrl }) {
		return fetch('http://localhost:8000/create-game', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word })
		})
			.then((response) => response.json())
			.then((data) => `${opts.baseUrl}play/${data.id}`)
			.catch((error) => {
				const msj = 'Something went wrong';
				alert(msj);
				console.log('Error:', error);
				return msj;
			});
	}

	constructor(private gameId: string) {}

	async getGame(): Promise<{ encode: string }> {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/get-game${this.gameId}`);
		return await res.json();
	}

	async guessesLetter(letter: string) {
		const payload = { gameId: this.gameId, letter: letter.charCodeAt(0) };
		const res = (await fetch(`${PUBLIC_BACKEND_URL}/guess-letter`, {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then((x) => x.json())) as GameResponse;

		return res;
	}

	// async getEncodedWord() {
	// 	const { length } = this.secret;
	// 	const encoded = String('#').repeat(length);
	// 	return delay(encoded, 100);
	// }
}
