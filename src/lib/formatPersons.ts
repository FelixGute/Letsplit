import type { Person } from "$lib/types";

// Converts array of persons to encoded string
// name:amount|name:amount
export function formatPersons(persons: Person[]): string {
	const raw = persons
		.map(({ name, payed }) => `${escapeName(name)}:${payed}`)
		.join("|");

	return raw;
}

// Converts encoded string to array of persons
export function deformatPersons(raw: string): Person[] | null {
	const result: Person[] = [];

	raw.split("|").forEach((person: string, index: number) => {
		const [name, amount] = person.split(":");
		const newPerson: Person = {
			id: index,
			name: name,
			payed: Number(amount),
			owes: 0,
			owed: 0,
		};
		result.push(newPerson);
	});
	if (result.length <= 0) {
		return null;
	}
	return result;
}

function escapeName(value: string): string {
	return value
		.replace(/\\/g, "\\\\")
		.replace(/:/g, "\\:")
		.replace(/\|/g, "\\|");
}
