export type Person = {
	id: number;
	name: string;
	payed: number;
	owes: number;
	owed: number;
};

export type OweMessage = {
	sender: string;
	reciever: string;
	amount: number;
};

export type PersonActions = {
	remove: (id: number) => void;
	edit?: (id: number) => void;
	add?: (person: Person) => void;
	addAmount?: (id: number, amount: number) => void;
};
