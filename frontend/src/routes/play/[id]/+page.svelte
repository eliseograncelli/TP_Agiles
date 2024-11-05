<script lang="ts">
	import DisplaySecret from '$lib/display-secret.svelte';
	import Hangman from '$lib/hangman.svelte';
	import { MockApi } from '$lib/mock-api';
	import { createGameState } from '$lib/state';
	import { page } from '$app/stores';

	const gameId = $page.params.id;

	const api = new MockApi('chupame esta wachin');
	const { stores, actions } = createGameState(api);

	let game: any;
	api.getGame(gameId).then((x) => (game = x));

	const { loading, lives, guesses, word } = stores;
	const { guessesLetter, guessesWord } = actions;

	let letterGuess: string;
	function onLetterGuess() {
		guessesLetter(letterGuess);
		letterGuess = '';
	}

	let wordGuess: string;
	function onWordGuess() {
		guessesWord(wordGuess);
		wordGuess = '';
	}
</script>

<h1>TP AGILES</h1>
<div class="container">
	<section class="side-left">
		<Hangman lives={$lives} />
	</section>
	<section class="side-right">
		<DisplaySecret encoded={$word} />
		<div class="form">
			<label>
				<input type="text" maxlength="1" bind:value={letterGuess} />
				<button disabled={$loading || !letterGuess} on:click={onLetterGuess}>Guess Letter</button>
			</label>

			<label>
				<input type="text" bind:value={wordGuess} />
				<button disabled={$loading || !wordGuess} on:click={onWordGuess}>Guess Word</button>
			</label>

			<span>
				<strong>Guesses: </strong>{$guesses.join(', ')}
			</span>
		</div>
	</section>
</div>
<pre>{JSON.stringify(game)}</pre>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		justify-content: center;
		margin-top: 40px;
		margin-left: 20px;
	}
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 85vh;
	}
	.side-left {
		width: 20%;
		height: 100%;
		padding-top: 30px;
		align-items: center;
		justify-content: center;
	}
	.side-right {
		padding-top: 40px;
		width: 80%;
		height: 100%;
	}
</style>
