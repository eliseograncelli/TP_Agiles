<script lang="ts">
	import { backIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let loading;
</script>

{#if loading}
	<progress transition:fly={{ x: -100, easing: backIn }} />
{/if}

<style>
	progress {
		position: fixed;
		bottom: 0;
	}
</style>
