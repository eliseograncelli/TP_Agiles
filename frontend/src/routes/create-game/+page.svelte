<script lang="ts">
	import { FRONT_URL } from '$env/static/public';

	let word: string;
	let url: string;
	let base_url: string = PUBLIC_FRONT_URL + '/play/';

	function onCreateGame() {
		fetch('http://localhost:8000/create-game', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word })
		})
			.then((response) => response.json())
			.then((data) => {
				url = base_url + data.id;
			})
			.catch((error) => console.error('Error:', error));
	}
</script>

{#if url}
	<p>url: <a href={url}>{url}</a></p>
{:else}
	<input type="text" bind:value={word} />
	<button on:click={onCreateGame}>Create Game</button>
{/if}
