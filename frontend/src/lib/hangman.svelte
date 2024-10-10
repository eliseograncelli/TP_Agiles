<script lang="ts">
	export let lives: number;
</script>

<section>
	{#if lives < 7}
		<div class="head"></div>
	{/if}

	{#if lives < 6}
		<div class="body"></div>
	{/if}

	{#if lives < 5}
		<div class="left-arm"></div>
	{/if}

	{#if lives < 4}
		<div class="right-arm"></div>
	{/if}

	{#if lives < 3}
		<div class="left-leg"></div>
	{/if}

	{#if lives < 2}
		<div class="right-leg"></div>
	{/if}

	{#if lives < 1}
		<div class="cut"></div>
		<p class="eyes">X &ensp; X</p>
	{/if}
</section>

<style>
	.eyes {
		position: absolute;
		color: red;
		top: 10px;
		right: 83px;
	}
	section {
		position: relative;
		height: 400px;
		width: 200px;
	}
	section div {
		position: absolute;
		background-color: black;
	}
	.head {
		left: 50px;
		height: 100px;
		width: 100px;
		border-radius: 50%;
		outline: solid black 2px;
		background-color: wheat;
	}
	.body {
		top: 100px;
		left: 98px;
		height: 200px;
		width: 2px;
	}

	.left-arm {
		height: 100px;
		width: 2px;
		top: 110px;
		left: 72px;
		transform: rotate(30deg);
	}

	.right-arm {
		height: 100px;
		width: 2px;
		top: 110px;
		right: 74px;
		transform: rotate(-30deg);
	}

	.left-leg {
		height: 100px;
		width: 2px;
		top: 291px;
		left: 72px;
		transform: rotate(30deg);
	}

	.right-leg {
		height: 100px;
		width: 2px;
		top: 291px;
		right: 75px;
		transform: rotate(-30deg);
	}

	.cut {
		height: 120px;
		width: 2px;
		top: 50px;
		right: 100px;
		background-color: red;
		transform: rotate(100deg);
	}
</style>
