<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;
	import { user } from '../../stores';
	import { postArguAuth } from '$lib/intermediary';

	import { redirect } from '@sveltejs/kit';

	function load() {
		// ...
		throw redirect(302, '/');
	}
</script>

<h1 class="h1">Log In</h1>
<p>{$user}</p>
<button on:click={postArguAuth} type="button" class="btn variant-filled">Register</button>

<!-- <button on:click={login} type="button" class="btn variant-filled">Log in</button>
<button on:click={register} type="button" class="btn variant-filled">Register</button>
<button on:click={logout} type="button" class="btn variant-filled">Log out</button> -->
