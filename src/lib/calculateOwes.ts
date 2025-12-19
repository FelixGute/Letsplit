import type { Person, OweMessage } from "$lib/types";

// function totalAmount(persons: Person[]) {
// 	return persons.reduce((acc, person) => {
// 		return acc + person.payed;
// 	}, 0);
// }

// function amountPerPerson(persons: Person[]) {
// 	return Math.round(totalAmount(persons) / persons.length);
// }

//Actions
export function updateBalances(persons: Person[], amountPerPerson: number) {
	persons.map((person: Person) => {
		let owed: number = 0;
		let owes: number = 0;

		if (amountPerPerson > person.payed) {
			owes = amountPerPerson - person.payed;
		} else if (amountPerPerson < person.payed) {
			owed = person.payed - amountPerPerson;
		}

		person.owes = owes;
		person.owed = owed;

		return person;
	});
}

// Update a persons Payed, needs to trigger other updates
// updatePayed: action((state, payload) => {
//     console.log(payload);
//     state.persons.map(person => {
//         if (person.id === payload.id) {
//             person.payed = payload.value;
//         }
//         return person;
//     })
// }),

// Sort function for Owes
function owesCompare(personA: Person, personB: Person) {
	const owesA = personA.owes;
	const owesB = personB.owes;

	let comparison = 0;
	if (owesA > owesB) {
		comparison = 1;
	} else if (owesA < owesB) {
		comparison = -1;
	}
	return comparison * -1;
}

// Sort function for Owed
function owedCompare(personA: Person, personB: Person) {
	const owedA = personA.owed;
	const owedB = personB.owed;

	let comparison = 0;
	if (owedA > owedB) {
		comparison = 1;
	} else if (owedA < owedB) {
		comparison = -1;
	}
	return comparison * -1;
}

export function createOweMessages(persons: Person[]): OweMessage[] {
	const recievers = JSON.parse(
		JSON.stringify(persons.filter((person) => person.owes === 0))
	) as Person[];
	const owers = JSON.parse(
		JSON.stringify(persons.filter((person) => person.owed === 0))
	) as Person[];

	recievers.sort(owedCompare);
	owers.sort(owesCompare);

	let oweMessages: OweMessage[] = [];

	const addMessage = (reciever: Person, ower: Person, amount: number) => {
		const newMessage: OweMessage = {
			reciever: reciever.name,
			sender: ower.name,
			amount: amount,
		};
		oweMessages.push(newMessage);
	};

	/*
    
      Felix is owed 137,5
      Alex owes 112,5
  
      Looping through the recievers and then owers yields:
      Check if the ower owes more than what the reciever is owed. If so, subtract the amount from the ower and set reciever to 0, then break.
      If not, check if reciever is owed more than the ower. If so, subtract the amount from the reciever and set ower to 0.
  
    */

	recievers.map((reciever) => {
		console.log(reciever.name);
		owers.map((ower) => {
			if (reciever.owed > 0 && ower.owes > 0) {
				// Default is owing nothing
				let amount = ower.owes;

				if (ower.owes < reciever.owed) {
					// The ower owes less than what the reciever is owed.
					amount = ower.owes;
					reciever.owed -= amount;
					ower.owes = 0;
				} else if (ower.owes > reciever.owed) {
					// The ower owes more than what the reciever is owed.
					amount = reciever.owed;
					ower.owes -= amount;
					reciever.owed = 0;
				} else {
					reciever.owed = 0;
					ower.owes = 0;
				}
				addMessage(reciever, ower, amount);
			}
		});
	});
	return oweMessages;
}
