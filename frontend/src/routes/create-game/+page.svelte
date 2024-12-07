<script lang="ts">
	import { api } from '$lib';

	let word: string;
	let url: string;

	async function onCreateGame() {
		const baseUrl = `${location.protocol}//${location.host}/`;

		url = await api
			.createGame(word)
			.then((data) => `${baseUrl}play/${data.id}`)
			.catch((error) => {
				const msj = 'Something went wrong';
				alert(msj);
				console.log('Error:', error);
				return msj;
			});
	}
</script>

{#if url}
	<p>url: <a href={url}>{url}</a></p>
{:else}
	<input type="text" bind:value={word} />
	<button on:click={onCreateGame}>Create Game</button>
{/if}
