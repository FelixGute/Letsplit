<script lang="ts">
    import type {OweMessage, Person} from '$lib/types';
    interface Props {
		oweMessages: OweMessage[]
	}

	let { oweMessages }:Props = $props();

    // Note: Add ability to "resolve debt".
    // Not sure how that would work
</script>
<div>
    <h2>Resolving debt</h2>
    {#each oweMessages as message}
        <p>{message.sender} owes {message.reciever} {message.amount}</p>
    {/each}
</div>