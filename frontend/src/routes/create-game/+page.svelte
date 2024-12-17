<script lang="ts">
	import { api } from '$lib';
	import Progress from '$lib/Progress.svelte';

	let word: string;
	let url: string;
	let loading = false;

	async function onCreateGame() {
		loading = true;
		const baseUrl = `${location.protocol}//${location.host}/`;

		url = await api
			.createGame(word)
			.then((data) => `${baseUrl}play/${data.id}`)
			.catch((error) => {
				alert('Something went wrong');
				console.log('Error:', error);
				return ':(';
			});
		loading = false;
	}

	function copyToClipboard({ target }: { target: unknown }) {
		navigator.clipboard.writeText(url);
		if (target instanceof HTMLElement) {
			const prev = target.innerText;
			target.innerText = 'Copied!';
			setTimeout(() => (target.innerText = prev), 1500);
		}
	}
</script>

<Progress {loading} />

<main class="container">
	<h1>Hangman UTN</h1>
	{#if url}
		<p>
			<span> Game url: </span>
			<a
				href={url}
				on:click={() => {
					loading = true;
				}}
			>
				{url}
			</a>
		</p>
		<button on:click={copyToClipboard}>Copy to clipboard</button>
	{:else}
		<input type="text" bind:value={word} placeholder="Enter a word" id="new-game-input" />
		<button on:click={onCreateGame}>Create Game</button>
	{/if}
</main>

<style>
	main {
		margin-top: 30px;
	}

	input {
		max-width: 600px;
	}
</style>
