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
	content: string;
}

export interface Topic {
	id: number;
	resolution: string;
}
