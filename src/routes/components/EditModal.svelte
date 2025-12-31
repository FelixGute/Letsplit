<!--
Edit modal:
- Change name
- Change amount
- Add/subtract amount
-->

<script lang="ts">
	import Person from "./Person.svelte";

    interface Props {
		person: Person,
        onclose: () => void,
        save: () => void,
	}

	let { person = $bindable(), onclose, save } = $props();


	let dialog: HTMLDialogElement;

    let editName = $state(false);
    let addedAmount:number = $state(0);

    function addAmount() {
        person.payed += Number(addedAmount);
        addedAmount = 0;
    }

	$effect(() => {
		dialog.showModal();
		return () => dialog.close();
	});
</script>

<dialog bind:this={dialog}>
	<form method="dialog" onsubmit={(e) => {e.preventDefault(); save(person);}}>
        <h2>Edit person</h2>
        <label>
            Name:
            {#if editName}
			<input bind:value={person.name} onfocusout={() => {editName = false}}/>
            {:else}
            <button class="name-button" type="button" onclick={() => {editName = true}}>{person.name}</button>
            {/if}
		</label>
		<label>
			Payed amount:
			<input type="number" autofocus bind:value={person.payed} />
		</label>

        <div>
            <h3>Add amount</h3>
            <label>
                <input type="number" bind:value={addedAmount}>
            </label>
            <button type="button" onclick={() => {addAmount()}}>Add</button>
        </div>

		<div class="actions">
			<button class="cancel-button" type="button" onclick={onclose}>Cancel</button>
			<button class="confirm-button" type="submit">Save</button>
		</div>

        
	</form>
</dialog>

<style>
    dialog {
		max-width: 32em;
		border-radius: 1em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 1em;
    }

    h2 {
        margin: 0;
    }

    .name-button {
        background: none;
        color: inherit;
        font-size: inherit;
        cursor: text;
    }

    .name-button:hover, .name-button:active {
        transform: none;
    }

    .cancel-button {
        background: var(--color--remove--dark);
        color: var(--color--remove--light);
    }
    .confirm-button {
        background: var(--color--confirm--dark);
        color: var(--color--confirm--light);
    }
</style>