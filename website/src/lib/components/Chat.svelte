<script lang="ts">
	import { onMount } from 'svelte';
	import { getText } from '$lib/intermediary';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';
	import { subjects, messageFeed } from '../../stores';
	import type { Subject } from '$lib/types';

	let currentMessage = '';

	let elemChat: HTMLElement;
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function addMessage(): void {
		getText(currentMessage);
		const newMessage = {
			id: get(messageFeed).length,
			host: true,
			message: currentMessage
		};
		// Update the message feed
		messageFeed.update((messages) => [...messages, newMessage]);
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

	// Navigation List
	let currentSubject: Subject = get(subjects)[0];
</script>

<section class="card">
	<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]">
		<!-- Navigation -->
		<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
			<!-- List -->
			<div class="p-4 space-y-4 overflow-y-auto">
				<small class="opacity-50">Subjects</small>
				<ListBox active="variant-filled-primary">
					{#each $subjects as subject}
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
				{#each $messageFeed as bubble}
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
							<div class="card p-4 rounded-tr-none space-y-2 variant-filled-primary">
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
