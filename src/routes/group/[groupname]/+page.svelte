<script lang="ts">
  import type {OweMessage, Person, PersonActions} from '$lib/types';
  
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  import AddPerson from '../../components/AddPerson.svelte';
  import PersonTable from '../../components/PersonTable.svelte';
  import OweMessageBox from '../../components/OweMessageBox.svelte';
  
  import { updateBalances, createOweMessages } from '$lib/calculateOwes';
  import { formatPersons, deformatPersons  } from '$lib/formatPersons';
  import { encodeUrlState, decodeUrlState  } from '$lib/urlState';
  
  console.log(page.params.groupname);
  // Anna:300|Felix:200|Alex:200
  const group = deformatPersons(decodeUrlState(page.params.groupname as string));
  console.log(group);

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

	goto(`${basePath}/${encoded}`, {
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
	},
  addAmount(id, amount) {
    // find persons with id
    // add amount to persons payed
    let person:Person|undefined = persons.find(i => (i.id == id));
    if(person != undefined && amount > 0) {
      person.payed += amount;
    }
    updateUI();
  }
};

</script>

<AddPerson persons={persons} updateUI={updateUI}/>
{#if persons.length > 0}
<h2>Total amount: <span>{totalAmount}</span></h2>
<h2>Per person: <span>{amountPerPerson}</span></h2>
<PersonTable persons={persons} updateUI={updateUI} removeAction={actions.remove}/>
<OweMessageBox oweMessages={oweMessages}/>
{/if}