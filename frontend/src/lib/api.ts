type GameResponse =
	| { type: 'repeated-letter' }
	| { type: 'correct'; encoded: string }
	| { type: 'wrong'; lives: number }
	| { type: 'won'; encoded: string }
	| { type: 'loss' };

export class Api {
	constructor(private readonly BACK_URL: string) {}

	async createGame(word: string) {
		return fetch(`${this.BACK_URL}/create-game`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word })
		}).then((response) => response.json()) as Promise<{ id: string }>;
	}

	async getGame(gameId: string): Promise<{ encode: string }> {
		const res = await fetch(`${this.BACK_URL}/get-game/${gameId}`);
		return await res.json();
	}

	async guessesLetter(gameId: string, letter: string) {
		const payload = { gameId, letter: letter.charCodeAt(0) };
		const res = await fetch(`${this.BACK_URL}/guess-letter`, {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then((x) => x.json());

		return res as GameResponse;
	}

	async guessWord(gameId: string, word: string) {
		const payload = { gameId, word };
		const res = await fetch(`${this.BACK_URL}/guess-word`, {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then((x) => x.json());

		return res as GameResponse;
	}
}
