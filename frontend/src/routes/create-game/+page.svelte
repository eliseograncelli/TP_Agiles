<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Api } from '$lib/api';

	Api.BACK_URL = PUBLIC_BACKEND_URL;

	let word: string;
	let url: string;

	async function onCreateGame() {
		const baseUrl = `${location.protocol}//${location.host}/`;

		url = await Api.createGame(word)
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
