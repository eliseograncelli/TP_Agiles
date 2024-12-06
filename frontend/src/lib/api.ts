type GameResponse =
	| { type: 'repeated-letter' }
	| { type: 'correct'; encoded: string }
	| { type: 'wrong'; lives: number }
	| { type: 'won'; encoded: string }
	| { type: 'loss' };

export class Api {
	static BACK_URL = 'Assign me';

	static async createGame(word: string) {
		return fetch(`${Api.BACK_URL}/create-game`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word })
		}).then((response) => response.json()) as Promise<{ id: string }>;
	}

	constructor(private gameId: string) {}

	async getGame(): Promise<{ encode: string }> {
		const res = await fetch(`${Api.BACK_URL}/get-game/${this.gameId}`);
		return await res.json();
	}

	async guessesLetter(letter: string) {
		const payload = { gameId: this.gameId, letter: letter.charCodeAt(0) };
		const res = await fetch(`${Api.BACK_URL}/guess-letter`, {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then((x) => x.json());

		return res as GameResponse;
	}

	async guessWord(word: string) {
		const payload = { gameId: this.gameId, word };
		const res = await fetch(`${Api.BACK_URL}/guess-word`, {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then((x) => x.json());

		return res as GameResponse;
	}
}
