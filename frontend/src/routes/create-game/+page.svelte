<script lang="ts">
	let secret: string;

	function onCreateGame() {
		fetch("http://localhost:8000/create-game", {
    		method: "POST",
    		headers: { "Content-Type": "application/json" },
    		body: JSON.stringify({ word: "hola" })
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error("Error:", error));
	}
</script>

<input type="text" bind:value={secret} />
<button on:click={onCreateGame}>Create Game</button>
