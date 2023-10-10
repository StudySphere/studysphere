import { redirect } from '@sveltejs/kit';

const API = 'https://studysphere-parser.arguflow.ai';

export function postArguAuth() {
	// const res = makeRequest(`${API}/authorize`, 'GET', {});
	const res = fetch(`${API}/authorize`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		redirect: 'follow'
	})
		.then((res) => res.text())
		.then((res) => {
			window.location.href = res;
		});
	console.log(res);
	return res;
}
