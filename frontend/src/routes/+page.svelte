<script lang="ts">
	import Hangman from './hangman.svelte';
	import { MockApi } from './mock-api';
	import { createGameState } from './state';

	const api = new MockApi('secret');
	const { stores, actions } = createGameState(api);

	const { loading, lives, guesses, word } = stores;
	const { guessesLetter } = actions;

	let letterGuess: string;
</script>

<h1>TP AGILES</h1>

{#if $loading}
	<p>Loading...</p>
{:else}
	<p>Guesses: {$guesses.length}</p>
	<p>Lives: {$lives}</p>
	<p>Word: {$word}</p>
{/if}

<input type="text" bind:value={letterGuess} maxlength="1" />
<button
	on:click={() => {
		guessesLetter(letterGuess);
		letterGuess = '';
	}}>Guess Letter</button
>

<Hangman lives={$lives} />

<div>
	<span>{$guesses.join(', ')}</span>
</div>
