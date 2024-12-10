type GameResponse =
	| { type: 'repeated-letter' }
	| { type: 'correct'; encoded: string }
	| { type: 'wrong'; lives: number }
	| { type: 'won'; encoded: string }
	| { type: 'loss' };

type GameState = {
	id: string;
	encode: string;
	lives: number;
	guesses: string[];
};

export class Api {
	constructor(private readonly BACK_URL: string) {}

	async healthCheck() {
		return fetch(`${this.BACK_URL}/health-check`)
			.then((x) => x.json() as Promise<{ ok: true }>)
			.catch(() => ({ ok: false }));
	}

	async createGame(word: string) {
		return fetch(`${this.BACK_URL}/create-game`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word })
		}).then((response) => response.json()) as Promise<{ id: string }>;
	}

	async getGame(gameId: string) {
		const res = await fetch(`${this.BACK_URL}/get-game/${gameId}`).then((x) => x.json());
		return res as GameState;
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
