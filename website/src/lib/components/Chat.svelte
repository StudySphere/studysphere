<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { onMount } from 'svelte';
	import { getText } from '$lib/intermediary';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	const lorem = faker.lorem.paragraph();
	let currentMessage = '';

	interface MessageFeed {
		id: number;
		host: boolean;
		message: string;
	}
	let messageFeed: MessageFeed[] = [
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
	];

	let elemChat: HTMLElement;
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	function addMessage(): void {
		getText(currentMessage);
		const newMessage = {
			id: messageFeed.length,
			host: true,
			message: currentMessage
		};
		// Update the message feed
		messageFeed = [...messageFeed, newMessage];
		// Clear prompt
		currentMessage = '';
		// Smooth scroll to bottom
		// Timeout prevents race condition
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}

	function onPromptKeydown(event: KeyboardEvent): void {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
			addMessage();
		}
	}

	// When DOM mounted, scroll to bottom
	onMount(() => {
		scrollChatBottom();
	});

	interface Subject {
		id: number;
		name: string;
	}
	// Navigation List
	const subjects: Subject[] = [
		{ id: 0, name: 'Michael' },
		{ id: 1, name: 'Janet' },
		{ id: 2, name: 'Susan' },
		{ id: 3, name: 'Joey' },
		{ id: 4, name: 'Lara' },
		{ id: 5, name: 'Melissa' }
	];
	let currentSubject: Subject = subjects[0];
	let valueSingle = '';
</script>

<section class="card">
	<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]">
		<!-- Navigation -->
		<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
			<!-- List -->
			<div class="p-4 space-y-4 overflow-y-auto">
				<small class="opacity-50">Subjects</small>
				<ListBox active="variant-filled-primary">
					{#each subjects as subject}
						<ListBoxItem bind:group={currentSubject} name="subjects" value={subject}>
							{subject.name}
						</ListBoxItem>
					{/each}
				</ListBox>
			</div>
		</div>
		<!-- Chat -->
		<div class="grid grid-row-[1fr_auto]">
			<!-- Conversation -->
			<section bind:this={elemChat} class="max-h-[500px] p-4 overflow-y-auto space-y-4">
				{#each messageFeed as bubble}
					{#if bubble.host === true}
						<div class="grid grid-cols-[auto_1fr] gap-2">
							<div class="card p-4 variant-soft rounded-tl-none space-y-2">
								<header class="flex justify-between items-center">
									<p class="font-bold">Me</p>
								</header>
								<p>{bubble.message}</p>
							</div>
						</div>
					{:else}
						<div class="grid grid-cols-[1fr_auto] gap-2">
							<div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
								<header class="flex justify-between items-center">
									<p class="font-bold">Sia</p>
								</header>
								<p>{bubble.message}</p>
							</div>
						</div>
					{/if}
				{/each}
			</section>
			<!-- Prompt -->
			<section class="border-t border-surface-500/30 p-4">
				<div
					class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
				>
					<button class="input-group-shim">+</button>
					<textarea
						bind:value={currentMessage}
						class="bg-transparent border-0 ring-0"
						name="prompt"
						id="prompt"
						placeholder="Write a message..."
						rows="1"
						on:keydown={onPromptKeydown}
					/>
					<button
						class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'}
						on:click={addMessage}
					>
						<i class="fa-solid fa-paper-plane" />
					</button>
				</div>
			</section>
		</div>
	</div>
</section>
