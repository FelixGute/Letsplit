<script lang="ts">
	import Person from "./Person.svelte";
    let {persons, updateUI} = $props();
</script>

<table>
<thead>
<tr>
    <th>Name</th>
    <th>Payed</th>
    <th>Owed</th>
    <th>Owes</th>
    <th>Delete</th>
</tr>
</thead>
<tbody>
    {#each persons as person}
    <Person person={person} updateUI={updateUI} />
    {/each}
</tbody>
</table>