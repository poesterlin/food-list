<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from '$lib/Modal.svelte';

	export let open = false;
	export let title = 'Bestätigen';
	export let message = 'Bist du dir sicher?';

	const dispatch = createEventDispatcher();

	function confirm() {
		dispatch('confirm');
	}

	function cancel() {
		dispatch('cancel');
	}
</script>

<Modal {open} on:close={cancel}>
	<div slot="title">{title}</div>
	<div slot="content">
		<p class="text-gray-600 mb-6">{message}</p>
		<div class="flex justify-end gap-4">
			<button on:click={cancel} class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200">
				Abbrechen
			</button>
			<button on:click={confirm} class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200">
				Bestätigen
			</button>
		</div>
	</div>
</Modal>
