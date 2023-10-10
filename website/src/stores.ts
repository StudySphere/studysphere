import { writable } from 'svelte/store';
import type { Message, Topic } from '$lib/types';
import { faker } from '@faker-js/faker';

const lorem = faker.lorem.paragraph();

// const storedUser = window.localStorage.user;
// export const user = writable(storedUser || 'No user!');
// storedUser.subscribe((value: string) => (localStorage.user = value));
export const user = writable('');
export const messages = writable([]);
export const topics = writable<Topic[]>([]);
export const messageFeed = writable<Message[]>([
	{
		id: 0,
		host: true,
		message: lorem
	},
	{
		id: 1,
		host: false,
		message: lorem
	},
	{
		id: 2,
		host: true,
		message: lorem
	},
	{
		id: 3,
		host: false,
		message: lorem
	}
]);

// export const subjects = writable<Subject[]>([
// 	{ id: 0, name: 'Math' },
// 	{ id: 1, name: 'Science' },
// 	{ id: 2, name: 'Gender studies' }
// ]);
