import { writable } from 'svelte/store';

// const storedUser = window.localStorage.user;
// export const user = writable(storedUser || 'No user!');
// storedUser.subscribe((value: string) => (localStorage.user = value));
export const user = writable('');
