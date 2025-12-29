<script lang="ts">
	import type { Person } from '$lib/types';

	interface Props {
		person: Person
	}

    let {person, updateUI, removeAction} = $props();

    // svelte-ignore state_referenced_locally
    let payedAmount = $state(person.payed);

    function onPayedUpdate() {
        person.payed = payedAmount;
        updateUI();
    }

    function removePerson() {
        removeAction(person.id);
        updateUI();
    }

</script>

<tr>
    <td>{person.name}</td>
    <td><input type="number" bind:value={payedAmount} onchange={onPayedUpdate}></td>
    <td>{person.owed}</td>
    <td>{person.owes}</td>
    <td><button onclick={() => {removePerson()}}>Remove</button></td>
</tr>