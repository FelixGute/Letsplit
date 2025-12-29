<script lang="ts">
	import Person from "./Person.svelte";
    let {persons, updateUI, removeAction} = $props();
</script>
<table>
<thead>
<tr>
    <th>Name</th>
    <th>Payed</th>
    <th>Owed</th>
    <th>Owes</th>
    <th>Remove</th>
</tr>
</thead>
<tbody>
    {#each persons as person}
    <Person person={person} updateUI={updateUI} removeAction={removeAction} />
    {/each}
</tbody>
</table>
