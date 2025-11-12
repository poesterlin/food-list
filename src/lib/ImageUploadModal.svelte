<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';

	export let open = false;

	const dispatch = createEventDispatcher();

	let isDragOver = false;
	let uploadEl: HTMLInputElement;
	let formEl: HTMLFormElement;

	function close() {
		dispatch('close');
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragOver = false;
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			uploadEl.files = files;
			formEl.submit();
		}
	}
</script>

{#if open}
	<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" on:click={close}>
		<div class="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full" on:click|stopPropagation>
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold text-pink-600">Bild hochladen</h2>
				<button on:click={close} class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div
				class="border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200"
				class:border-pink-400={isDragOver}
				class:bg-pink-50={isDragOver}
				on:dragenter={() => isDragOver = true}
				on:dragover|preventDefault
				on:dragleave={() => isDragOver = false}
				on:drop={handleDrop}
			>
				<p class="text-gray-500 mb-4">Drag & Drop dein Bild hier</p>
				<p class="text-gray-400 text-sm mb-4">oder</p>
				<form
					bind:this={formEl}
					action="?/uploadImage"
					method="post"
					use:enhance
					enctype="multipart/form-data"
				>
					<input bind:this={uploadEl} type="file" name="image" accept="image/*" required class="hidden" on:change={() => formEl.submit()} />
					<button type="button" on:click={() => uploadEl.click()} class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md">
						Bild auswählen
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
