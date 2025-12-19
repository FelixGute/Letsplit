<script lang="ts">
    import type {Person} from '$lib/types';
    let {persons, updateUI} = $props();

    // Add person to list
    let newPerson: Person = $state({id: 0, name:"", payed:0, owes:0, owed:0});

    function addPerson() {
        newPerson.id = persons.length;
        persons.push(newPerson);
        newPerson = {id: 0, name:"", payed:0, owes:0, owed:0};
        updateUI();
    }
</script>

<div>
    <h2>Add person</h2>
    <label>
        <span>Name:</span>
        <input bind:value={newPerson.name}/>
    </label>
    <label>
        <span>Payed:</span>
        <input type="number" bind:value={newPerson.payed}/>
    </label>
    <button onclick={addPerson}>Add</button>
</div>