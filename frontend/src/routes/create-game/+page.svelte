<script lang="ts">
	let secret: string;
	let url: string;
	let base_url: string = 'localhost:5173/play/';

	function onCreateGame() {
		fetch('http://localhost:8000/create-game', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ word: 'hola' })
		})
			.then((response) => response.json())
			.then((data) => {
				url = base_url + data.id;
			})
			.catch((error) => console.error('Error:', error));
	}
</script>

{#if url}
	<p>url: {url}</p>
{:else}
	<input type="text" bind:value={secret} />
	<button on:click={onCreateGame}>Create Game</button>
{/if}
