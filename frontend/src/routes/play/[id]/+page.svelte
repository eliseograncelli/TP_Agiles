<script lang="ts">
	import DisplaySecret from '$lib/display-secret.svelte';
	import Hangman from '$lib/hangman.svelte';
	import { Api } from '$lib/api';
	import { createGameState } from '$lib/state';
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	Api.BACK_URL = PUBLIC_BACKEND_URL;

	const gameId = $page.params.id;

	const api = new Api(gameId);

	const { stores, actions } = createGameState(api);

	const { loading, lives, guesses, word, playing } = stores;
	const { guessesLetter, guessesWord } = actions;

	let letterGuess: string;
	async function onLetterGuess() {
		const aaa = await guessesLetter(letterGuess);
		console.log(aaa);
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
		{#if $playing}
			<div class="form">
				<label>
					<input type="text" maxlength="1" bind:value={letterGuess} id="letter-input" />
					<button disabled={$loading || !letterGuess} on:click={onLetterGuess} id="letter-btn">
						Guess Letter
					</button>
				</label>

				<label>
					<input type="text" bind:value={wordGuess} id="word-input" />
					<button disabled={$loading || !wordGuess} on:click={onWordGuess} id="word-btn">
						Guess Word
					</button>
				</label>

				<span>
					<strong>Guesses: </strong>
					<span id="guesses">
						{$guesses.join(', ')}
					</span>
				</span>
			</div>
		{/if}
	</section>
</div>

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
