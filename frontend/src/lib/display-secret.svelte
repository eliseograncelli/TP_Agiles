<script lang="ts">
	export let encoded: string;
</script>

<div data-testid="container">
	{#each encoded.toUpperCase() as letter, i}
		{@const test_id = `letter-${i}`}
		{#if letter === '#'}
			<span data-testid={test_id} class="dash">_</span>
		{:else}
			<span data-testid={test_id}>{letter}</span>
		{/if}
	{/each}
</div>

<style>
	span {
		text-transform: uppercase;
		font-size: 4rem;
		margin-right: 0.5rem;
	}
</style>
