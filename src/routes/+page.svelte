<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import flower from '$lib/image/flor3.png';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import { dynamify, allAnswers } from '$lib/dynamify';

	let messages = [] as string[];
	let answers = [] as string[];

	let question = '';

	let inputBox = null as any as HTMLInputElement;
	let submitButton = null as any as HTMLButtonElement;

	function respuesta(): string {
		const index = Math.floor(Math.random() * 100) % allAnswers.length;
		return dynamify(index);
	}

	async function submitQuestion() {
		if (question.trim().length != 0) {
			messages = [...messages, question.trim()];
			question = '';

			answers = [...answers, respuesta()];
			await tick();

			inputBox.focus();

			const chatbox = document.getElementById('chatbox') as HTMLElement;
			chatbox.scrollTop = chatbox.scrollHeight;
		}
	}

	function randomMS() {
		const mslow = Math.random() < 0.2 ? 300 : 0;
		return Math.floor(Math.random() * 300) + Math.floor(Math.random() * 200) + mslow;
	}

	if (browser) {
		loadChat();
		setInterval(saveChat, 10000);
	}

	function loadChat() {
		const chat = localStorage.getItem('chat');
		if (chat) {
			const savedChat = JSON.parse(chat);
			messages = savedChat.messages || [];
			answers = savedChat.answers || [];
		}
	}

	function saveChat() {
		localStorage.setItem('chat', JSON.stringify({ messages, answers }));
	}
</script>

<div class="min-h-screen hero">
	<div class="max-w-full text-center hero-content">
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-4 items-center md:flex-row">
				<div class="flex gap-4 items-center md:flex-col">
					<img class="w-48 img" alt="flower" src={flower} />
					<div>
						<h1 class="text-3xl font-bold text-amber-50">Flor</h1>
						<h1 class="text-3xl font-bold text-amber-50">Mala</h1>
						{#if messages.length > 0}
							<button
								on:click={() => {
									messages = [];
									answers = [];
								}}
								transition:fade
								class="mt-4 btn btn-sm btn-neutral"
							>
								Borrar
							</button>
						{/if}
					</div>
				</div>
				<div
					class="flex flex-col w-full min-[445px]:w-[420px] h-[400px] outline-purple-900 outline outline-2 rounded-lg bg-slate-800"
				>
					<div id="chatbox" class="overflow-scroll">
						{#if messages.length == 0}
							<div out:fade class="chat chat-start">
								<div class="chat-bubble">Chat vacío: pregúntale algo la flor.</div>
							</div>
						{/if}

						{#each messages as message, i}
							<div transition:fade class="chat chat-end">
								<div class="py-2 text-sm chat-bubble chat-bubble-primary">
									{message}
								</div>
							</div>

							<div transition:fade={{ delay: randomMS() }} class="chat chat-start">
								<div class="py-2 text-sm chat-bubble chat-bubble-secondary">
									{answers[i]}
								</div>
							</div>
						{/each}

						<div class="w-1 h-28 bg-transparent" />
					</div>
					<div class="flex gap-1 items-center p-1 mt-auto mb-1">
						<input
							bind:this={inputBox}
							bind:value={question}
							autofocus
							on:keydown={(e) => {
								if (e.key == 'Enter') {
									submitButton.click();
								}
							}}
							on:submit={() => alert('ass')}
							class="w-full input input-sm input-primary"
						/>
						<button
							bind:this={submitButton}
							on:click={submitQuestion}
							type="submit"
							class="w-min h-full btn btn-xs btn-secondary"
						>
							<Icon icon="quill:send" width={22} height={22} />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
