<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "../styles/global.css";

	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h2>LetSplit</h2>
<main>
	{@render children()}
</main>
