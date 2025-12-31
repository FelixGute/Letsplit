<script lang="ts">
	import type { Person, PersonActions } from '$lib/types';

	interface Props {
		person: Person,
        actions: PersonActions
	}

    let {person, updateUI, actions} = $props();

    // svelte-ignore state_referenced_locally
    let payedAmount = $state(person.payed);

    function onPayedUpdate() {
        person.payed = payedAmount;
        updateUI();
    }

    function removePerson() {
        actions.removeAction(person.id);
        updateUI();
    }
    
    function editPerson() {
        actions.edit(person.id);
        updateUI();
    }
    function addAmount() {
        actions.addAmount(person.id);
        updateUI();
    }

</script>

<div class="person-container">
    <h2 class="name">{person.name}</h2>
    <!-- <td><input type="number" bind:value={payedAmount} onchange={onPayedUpdate}></td> -->
    <span><span>Payed:</span> {person.payed}</span>
    <span><span>Owed:</span> {person.owed}</span>
    <span><span>Owes:</span> {person.owes}</span>
    <div class="actions">
        <span><button class="edit-button" onclick={() => {editPerson()}}>Edit</button></span>
        <span><button class="remove-button" onclick={() => {removePerson()}}>Remove</button></span>
    </div>
</div>

<style>
    
    div.person-container:nth-child(even) {background: oklch(97.3% 0.071 103.193)}
    div.person-container:nth-child(odd) {background: oklch(98.7% 0.026 102.212)}

    div.person-container:hover {
        background: oklch(90.5% 0.182 98.111);
        color: oklch(28.6% 0.066 53.813);
    }

    div.person-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 1rem;
        gap: 10px;
    }

.name {
    grid-column: span 2;
}

.actions {
    grid-column: span 3;
}

span > span {
    font-weight: bold;
}

    .remove-button {
        background: var(--color--remove--dark);
        color: var(--color--remove--light);
    }
</style>