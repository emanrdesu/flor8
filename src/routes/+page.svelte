<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import flower from '$lib/image/flor3.png';
	let judge = false;
	let answer = false;

	function respuesta() {
		judge = true;
		answer = Math.random() < 0.5;

		setTimeout(() => (judge = false), 5000);
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-lg flex flex-col gap-6">
			<div class="flex items-center">
				<img class="img w-64" alt="flower" src={flower} />
				<div class="flex flex-col gap-8 items-center">
					<h1 class="text-5xl font-bold">La flor de maldád</h1>
					<span class="flex gap-4 items-center">
						<button on:click={respuesta} class="btn btn-sm w-min btn-info">Dice...</button>

						{#if judge}
							<div
								transition:fade={{ delay: 150 }}
								class="badge badge-lg font-bold"
								class:badge-success={answer}
								class:badge-error={!answer}
							>
								{#if answer}
									Si
								{:else}
									No
								{/if}
							</div>
						{/if}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
