<script lang="ts">
	import { user } from '../../stores';
	import { authorize, arguflowRegister } from '$lib/intermediary';
	import GooglePicker from '$lib/components/GooglePicker.svelte';
	let username = '';
	let password = '';
</script>

<h1 class="h1">Log In</h1>

<p>{$user}</p>

<input value={username} class="input" type="text" placeholder="Username" />
<input value={password} class="input" type="text" placeholder="Password" />
<button
	on:click={() => arguflowRegister(username, password)}
	type="button"
	class="btn variant-filled"
>
	Log in with ArguFlow
</button>

<button on:click={authorize} type="button" class="btn variant-filled">Connect to Google</button>
