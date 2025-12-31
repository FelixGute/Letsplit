<script lang="ts">
	import Person from "./Person.svelte";
    let {persons, updateUI, actions} = $props();
</script>
<div>
            {#each persons as person}
            <Person person={person} updateUI={updateUI} actions={actions} />
            {/each} 
</div>
<style>

#person-table {
    overflow-x: scroll;
    width: 100%;
}

    table {
        table-layout: fixed;
        margin: 10px auto;
        border-collapse: collapse;
        border-radius: 5px;
        width: 100%;
}

th {
	padding: 0.6em;
    background: oklch(28.6% 0.066 53.813);
    color: oklch(98.7% 0.026 102.212);
}
</style>