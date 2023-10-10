const API = 'https://studysphere-parser.arguflow.ai';

export function postGAuth() {
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

export function postArguReg(email: string, password: string) {
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
