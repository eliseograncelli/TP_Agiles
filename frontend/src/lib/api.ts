function delay<const T>(res: T, miliseconds: number) {
	return new Promise<T>((resolve) => {
		setTimeout(() => {
			resolve(res);
		}, miliseconds);
	});
}

type GameResponse =
	| { type: 'repeated-letter' }
	| { type: 'correct'; encoded: string }
	| { type: 'wrong'; lives: number }
	| { type: 'won'; encoded: string }
	| { type: 'loss' };

export class Api {
	constructor(private gameId: string) {}

	async getGame(id: string): Promise<{ encode: string }> {
		const res = await fetch(`http://localhost:8000/get-game/${id}`);
		return await res.json();
	}

	async guessesLetter(letter: string) {
		const res = (await fetch('http://localhost:8000/guess-letter', {
			method: 'POST',
			body: JSON.stringify({ gameId: this.gameId, letter: letter.charCodeAt(0) })
		}).then((x) => x.json())) as GameResponse;

		return res;
	}

	// async getEncodedWord() {
	// 	const { length } = this.secret;
	// 	const encoded = String('#').repeat(length);
	// 	return delay(encoded, 100);
	// }
}
