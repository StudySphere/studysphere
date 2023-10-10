import { get } from 'svelte/store';
import { messages, topics } from '../stores';
const PARSER_API = 'https://studysphere-parser.arguflow.ai/api';
const BACKEND_API = 'https://studysphere-backend.arguflow.ai/api';
export function uploadData() {}

export function uploadGDrive() {}

export function revoke() {}

export function clear() {}

export function arguflowLogin() {}

export function arguflowLogout() {}

export async function chat(topic_id: number, message: string) {
	let res = await fetch(`${BACKEND_API}/message`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: 'af-B2Sr9GZBwmq8lSLQtK5dvEnmXn2KnG1J'
		},
		credentials: 'include',
		body: JSON.stringify({
			topic_id: topic_id,
			new_message_content: message
		})
	});

	const reader = res.body?.getReader();
	let done = false;
	while (!done) {
		let doneReading,
			value = await reader!.read();

		if (doneReading) {
			done = doneReading;
		}
		if (value) {
			const decoder = new TextDecoder();
			const chunk = decoder.decode(value.value);
			const messagesVal = get(messages);
			const firstMessage = messagesVal[0];
			const newMessage = {
				id: messagesVal.length,
				host: false,
				content: firstMessage.content + chunk
			};
			messages.update((messages) => [newMessage, ...messages]);
		}
	}
}

export async function topicGenerate(prompt: string, normal_chat: boolean) {
	const res = await fetch(`${BACKEND_API}/topic`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: 'af-B2Sr9GZBwmq8lSLQtK5dvEnmXn2KnG1J'
		},
		credentials: 'include',
		body: JSON.stringify({
			resolution: prompt,
			normal_chat: normal_chat
		})
	});

	const newTopic = await res.json();

	const topic = {
		id: newTopic.id,
		resolution: newTopic.resolution,
		side: newTopic.side,
		normal_chat: newTopic.normal_chat,
		set_inline: true
	};
	topics.update((topics) => [...topics, topic]);
}

export function authorize() {
	const res = fetch(`${PARSER_API}/authorize`, {
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
	const res = fetch(`${PARSER_API}/arguflow_register`, {
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
