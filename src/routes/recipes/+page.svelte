<script lang="ts">
	import { navigating } from '$app/stores';
	import PhotoList from '$lib/PhotoList.svelte';

	export let data;

	let list: PhotoList;
	let canRestore = false;

	$: if ($navigating) {
		canRestore = $navigating.type === 'popstate';
	}

	export const snapshot = {
		capture: () => ({
			data,
			scroller: list?.capture()
		}),
		restore: (values) => {
			if (!canRestore) return;

			data.photos = values.data.photos;
			data.next = values.data.next;

			if (values.scroller) {
				list.restore(values.scroller);
			}
		}
	};
</script>

<main>
	<PhotoList
		bind:this={list}
		endpoint="/api/recipes"
		recipes={data.recipes}
		next={data.next}
		on:loaded={(e) => {
			data.recipes = [...data.recipes, ...e.detail.recipes];
			data.next = e.detail.next;
		}}
	></PhotoList>
</main>

<style>
	main {
		position: fixed;
		width: 100vw;
		height: calc(100dvh - 50px);
		left: 0;
		top: 50px;
	}
</style>
