<script lang="ts">
  import type {OweMessage, Person, PersonActions} from '$lib/types';
  
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  import AddPerson from './components/AddPerson.svelte';
  import PersonTable from './components/PersonTable.svelte';
  import OweMessageBox from './components/OweMessageBox.svelte';
  
  import { updateBalances, createOweMessages } from '$lib/calculateOwes';
  import { formatPersons  } from '$lib/formatPersons';
  import { encodeUrlState  } from '$lib/urlState';
  // Anna:300|Felix:200|Alex:200
  const group = null;

  let persons: Person[] = $state(group != null ? group : []);
  let totalAmount: number = $derived(persons.reduce((acc, person) => {
		return acc + person.payed;
	}, 0));
  let amountPerPerson: number = $derived(Math.round(totalAmount / persons.length));
  let oweMessages: OweMessage[] = $state([]);

  // svelte-ignore state_referenced_locally
  updateBalances(persons, amountPerPerson);
  // svelte-ignore state_referenced_locally
  oweMessages = createOweMessages(persons);
  
 function updateUI(): void {
	updateBalances(persons, amountPerPerson);
	oweMessages = createOweMessages(persons);
	syncURL();
}


function syncURL(): void {
	const formatted = formatPersons(persons);
	const encoded: string = encodeUrlState(formatted);

	// Remove last path segment
	const basePath: string =
		page.url.pathname.split('/').slice(0, -1).join('/');

	goto(`/group${basePath}/${encoded}`, {
		replaceState: true,
		keepFocus: true
	});
}

const actions: PersonActions = {
	remove(id) {
		persons = persons.filter(p => p.id !== id);
    updateUI();
	},
	edit(id) {
		console.log('edit', id);
    updateUI();
	}
};

</script>

<h2>LetSplit</h2>
<p>Add a person to start a group.</p>
<AddPerson persons={persons} updateUI={updateUI}/>