<script lang="ts">
    import type {OweMessage, Person} from '$lib/types';
    interface Props {
		oweMessages: OweMessage[]
	}

	let { oweMessages }:Props = $props();
</script>
<div>
    {#each oweMessages as message}
        <p>{message.sender} owes {message.reciever} {message.amount}</p>
    {/each}
</div>