import { redirect } from "@sveltejs/kit";

const API = 'https://studysphere-parser.arguflow.ai';

export function makeRequest(
	url: string,
	method: 'POST' | 'GET' | 'DELETE',
	body: any,
	expectedStatus = 200,
	parseResponse = true
): Promise<any> {
	return new Promise((resolve, reject) => {
		const fetchInit: RequestInit = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			redirect: 'follow'
		};
		if (method !== 'GET') {
			fetchInit.body = JSON.stringify(body);
		}
		fetch(url, fetchInit)
			.then((res) => {
				if (res?.ok && res?.status === expectedStatus) {
					if (parseResponse) {
						res
							.json()
							.then((json) => {
								resolve(json);
							})
							.catch((err) => {
								reject('Parsing failure');
							});
					} else {
						resolve(null);
					}
				} else {
					reject(res?.status);
				}
			})
			.catch((err) => {
				reject('Fetching failure');
			});
	});
}

export function postArguAuth() {
	// const res = makeRequest(`${API}/authorize`, 'GET', {});
  const res = fetch(`${API}/authorize`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			});
	console.log(res);
	return res;
}
