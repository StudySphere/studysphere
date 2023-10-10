const API = 'https://studysphere-parser.arguflow.ai';

export function uploadData() {}

export function uploadGDrive() {}

export function revoke() {}

export function clear() {}

export function arguflowLogin() {}

export function arguflowLogout() {}

export function authorize() {
	const res = fetch(`${API}/authorize`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		redirect: 'follow'
	})
		.then((res) => res.text())
		.then((res) => {
			window.location.href = res;
		});
	return res;
}

export function arguflowRegister(email: string, password: string) {
	const res = fetch(`${API}/arguflow_register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
		.then((res) => res.text())
		.then((res) => {
			window.location.href = res;
		});
	console.log(res);
	return res;
}

export function getText(prompt: string) {
	console.log(prompt);
}
