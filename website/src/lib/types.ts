export class User {
	constructor(name: string = '', arguflowAuth: string = '') {
		this.name = name;
		this.arguflowAuth = arguflowAuth;
	}
	name: string;
	arguflowAuth: string;
}
