<script lang="ts">
	import DisplaySecret from '$lib/display-secret.svelte';
	import Hangman from '$lib/hangman.svelte';
	import { createGameState } from '$lib/state';
	import { page } from '$app/stores';
	import { api } from '$lib';
	import Progress from '$lib/Progress.svelte';

	const gameId = $page.params.id;

	const { stores, actions } = createGameState(api, gameId);

	const { loading, lives, guesses, word, playing } = stores;
	const { guessesLetter, guessesWord } = actions;

	let letterGuess: string;
	async function onLetterGuess() {
		await guessesLetter(letterGuess);
		letterGuess = '';
	}

	let wordGuess: string;
	async function onWordGuess() {
		await guessesWord(wordGuess);
		wordGuess = '';
	}
</script>

<Progress loading={$loading} />

<main class="container">
	<section class="side-left">
		<Hangman lives={$lives} />
	</section>
	<section class="side-right">
		<div class="letters">
			<DisplaySecret encoded={$word} />
		</div>
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
</main>

<style>
	.letters {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	input {
		max-width: 250px;
	}

	.form {
		display: flex;
		padding-left: 0;
		margin-left: 0;
		flex-direction: column;
		gap: 20px;
		justify-content: center;
		margin-top: 40px;
		margin-left: 20px;
	}

	main {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 85vh;
	}

	.side-left {
		padding-top: 20px;
		width: 200px;
		margin-top: 20px;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-radius: 20px;
	}

	.side-right {
		padding-left: 80px;
		padding-top: 40px;
		width: 80%;
		height: 100%;
	}
</style>
