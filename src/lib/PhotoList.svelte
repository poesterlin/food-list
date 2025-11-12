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

<Scroller
	items={recipes}
>
	<div slot="item" let:item>
		<a href="/recipes/{item.id}" class="block bg-white rounded-xl shadow-md overflow-hidden 
			hover:shadow-lg transition-shadow duration-200 relative 
			{item.ingredients.some((ing) => !ing.allowed) ? 'border-2 border-orange-400 ring-2 ring-orange-200' : ''}"
		>
			{#if item.imgId}
				<img src="/image/{item.id}" alt={item.name} class="w-full h-48 object-cover" loading="lazy" />
			{:else}
				<img src="/placeholder.svg" alt="Kein Bild vorhanden" class="w-full h-48 object-cover" />
			{/if}
			<div class="p-4 absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm">
				<h2 class="text-xl font-semibold text-pink-600 text-center">{item.name}</h2>
				<p class="text-gray-500 text-sm text-center">{formatDate(item.date)}</p>
			</div>
		</a>
	</div>

	<div slot="empty">
		<p class="text-center text-gray-500 text-lg py-8">No recipes found</p>
	</div>
</Scroller>
