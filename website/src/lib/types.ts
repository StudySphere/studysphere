export class User {
	constructor(name: string = '', arguflowAuth: string = '') {
		this.name = name;
		this.arguflowAuth = arguflowAuth;
	}
	name: string;
	arguflowAuth: string;
}

export interface Message {
	id: number;
	host: boolean;
	message: string;
}

export interface Subject {
	id: number;
	name: string;
}
