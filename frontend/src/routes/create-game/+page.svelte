<script lang="ts">
	import { Api } from '$lib/api';

	let word: string;
	let url: string;

	async function onCreateGame() {
		url = await Api.createGame(word);
	}
</script>

{#if url}
	<p>url: <a href={url}>{url}</a></p>
{:else}
	<input type="text" bind:value={word} />
	<button on:click={onCreateGame}>Create Game</button>
{/if}
