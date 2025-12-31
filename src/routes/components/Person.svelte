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

<tr>
    <td>{person.name}</td>
    <!-- <td><input type="number" bind:value={payedAmount} onchange={onPayedUpdate}></td> -->
    <td>{person.payed}</td>
    <td>{person.owed}</td>
    <td>{person.owes}</td>
    <td><button class="edit-button" onclick={() => {editPerson()}}>Edit</button></td>
    <td><button class="remove-button" onclick={() => {removePerson()}}>Remove</button></td>
</tr>

<style>
    tr:nth-child(even) {background: oklch(97.3% 0.071 103.193)}
    tr:nth-child(odd) {background: oklch(98.7% 0.026 102.212)}

    tr:hover {
        background: oklch(90.5% 0.182 98.111);
        color: oklch(28.6% 0.066 53.813);
    }

    td {
        padding: 1rem;
    }

    .remove-button {
        background: var(--color--remove--dark);
        color: var(--color--remove--light);
    }
</style>