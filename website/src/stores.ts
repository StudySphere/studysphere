import { writable } from 'svelte/store';
import type { Message, Topic } from '$lib/types';

export const user = writable('');
export const messages = writable<Message[]>([]);
export const topics = writable<Topic[]>([
	{
		id: 0,
		resolution: 'Generate new topic'
	}
]);
