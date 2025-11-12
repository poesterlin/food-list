<script lang="ts">
	import Scroller from '$lib/Scroller.svelte';
	import { formatDate } from '$lib/date-helper.js';
	import type { Recipe } from './db';

	type RecipeWithIngredients = Recipe & {
		ingredients: {
			id: number;
			name: string;
			allowed: boolean;
		}[];
	};

	export let recipes: RecipeWithIngredients[];
</script>

<Scroller items={recipes}>
	<a
		href="/recipes/{item.id}"
		class="relative block overflow-hidden rounded-xl
			shadow-md transition-shadow duration-200 hover:shadow-lg
			{item.ingredients.some((ing) => !ing.allowed)
			? 'border-2 border-orange-400 ring-2 ring-orange-200'
			: ''}"
		slot="item"
		let:item
	>
		{#if item.imgId}
			<img src="/image/{item.id}" alt={item.name} class="h-48 w-full object-cover" loading="lazy" />
			<div
				class="absolute right-0 bottom-0 left-0 bg-gradient-to-br from-white to-neutral-100 p-4 backdrop-blur-sm"
			>
				<h2 class="text-center text-xl font-semibold text-pink-600">{item.name}</h2>
				<p class="text-center text-sm text-gray-500">{formatDate(item.date)}</p>
			</div>
		{:else}
			<div
				class="flex h-48 w-full flex-col items-center justify-center bg-gradient-to-br from-white to-neutral-100 p-4"
			>
				<img src="/placeholder.svg" alt="Placeholder" class="mb-2 h-10 w-10 text-gray-400" />
				<h2 class="text-center text-xl font-semibold text-pink-600">{item.name}</h2>
				<p class="mt-1 text-center text-sm text-gray-500">{formatDate(item.date)}</p>
			</div>
		{/if}
	</a>

	<div slot="empty">
		<p class="py-8 text-center text-lg text-gray-500">No recipes found</p>
	</div>
</Scroller>
