<script lang="ts">
    import type {Person} from '$lib/types';
    import Modal from './Modal.svelte';
    let {persons, updateUI} = $props();
    let showModal:boolean = $state(false);

    // Add person to list
    let newPerson: Person = $state({id: 0, name:"", payed:0, owes:0, owed:0});

    function addPerson(close:() => void) {
        newPerson.id = persons.length;
        persons.push(newPerson);
        newPerson = {id: 0, name:"", payed:0, owes:0, owed:0};
        updateUI();
        showModal = false;
        close();
    }
    function handleKeydown(close: () => void) {
		addPerson(close);
	}
</script>

<button onclick={() => (showModal = true)}> Add person </button>
<Modal bind:showModal>
    {#snippet children({ close})}
        <div onkeydown={(e) => {if(e.key == "Enter") {e.preventDefault(); handleKeydown(close)}}} class="container">
            <h2>Add person</h2>
        <label>
            <span>Name:</span>
            <input autofocus bind:value={newPerson.name}/>
        </label>
        <label>
            <span>Payed:</span>
            <input type="number" bind:value={newPerson.payed}/>
        </label>
        <button onclick={() => {addPerson(close)}}>Add</button>
    </div>
    {/snippet}
</Modal>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>