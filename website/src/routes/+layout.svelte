<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import image from '$lib/assets/logo.png';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><img class="object-contain h-16" src={image} alt="" /></a>
				<h2 class="h2">
					<span
						class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
					>
						<a href="/">Study Sphere</a>
					</span>
				</h2>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button type="button" class="btn variant-filled">
					<a href="/auth">Log in</a>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="m-10">
		<slot />
	</div>
</AppShell>
