<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open = false;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" on:click={close}>
		<div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg" on:click|stopPropagation>
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-2xl font-bold text-pink-600">
					<slot name="title">Modal Title</slot>
				</h2>
				<button
					on:click={close}
					class="text-gray-500 transition-colors duration-200 hover:text-gray-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div>
				<slot name="content" />
			</div>
		</div>
	</div>
{/if}
