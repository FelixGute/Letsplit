<script lang="ts">
	import Person from "./Person.svelte";
    let {persons, updateUI, actions} = $props();
</script>
<table>
<thead>
<tr>
    <th>Name</th>
    <th>Payed</th>
    <th>Owed</th>
    <th>Owes</th>
    <th>Edit</th>
    <th>Remove</th>
</tr>
</thead>
<tbody>
    {#each persons as person}
    <Person person={person} updateUI={updateUI} actions={actions} />
    {/each}
</tbody>
</table>

<style>
    
table {
	table-layout: fixed;
	margin: 10px auto;
	border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
}

th {
	padding: 0.6em;
    background: oklch(28.6% 0.066 53.813);
    color: oklch(98.7% 0.026 102.212);
}
</style>