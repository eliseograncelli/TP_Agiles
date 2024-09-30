<script lang="ts">
	import Hangman from './hangman.svelte';

	let lives = 7;
</script>

<h1>TP AGILES</h1>

<input type="number" bind:value={lives} />

<Hangman {lives} />
