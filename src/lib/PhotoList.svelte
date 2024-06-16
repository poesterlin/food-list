<script lang="ts">
	import { page } from '$app/stores';
	import Scroller from '$lib/Scroller.svelte';
	import { formatDate } from '$lib/date-helper.js';
	import { createEventDispatcher } from 'svelte';
	import type { Recipe } from './db';

	type RecipeWithIngredients = Recipe & {
		ingredients: {
			id: number;
			name: string;
			allowed: boolean;
		}[];
	};

	export let recipes: RecipeWithIngredients[];
	export let next: string | null;
	export let endpoint: string;

	export function capture() {
		return scroller.capture();
	}

	export function restore(values: any) {
		scroller.restore(values);
	}

	const dispatch = createEventDispatcher();

	let scroller: Scroller<RecipeWithIngredients>;
	let loading = false;
</script>

<Scroller
	bind:this={scroller}
	items={recipes}
	on:more={async () => {
		if (loading || !next) return;
		loading = true;

		const response = await fetch(`${endpoint}?offset=${next}`);
		const result = await response.json();

		dispatch('loaded', result);

		loading = false;
	}}
>
	<div slot="item" let:item let:i>
		<a href="/recipes/{item.id}" class:risky={item.ingredients.some((ing) => !ing.allowed)}>
			<div>
				<h2>{item.name}</h2>
				<p>{formatDate(item.date)}</p>
			</div>
			{#if item.imgId}
				<img src="/image/{item.id}" alt={item.name} loading={i > 10 ? 'lazy' : 'eager'} />
			{:else}
				<img src="/placeholder.svg" alt="Kein Bild vorhanden" />
			{/if}
		</a>
	</div>

	<div slot="empty">
		<slot name="empty">
			<p>No recipes found</p>
		</slot>
	</div>

	<div slot="footer">
		{#if next}
			<a id="next" href="{$page.url.pathname}?offset={next}">Weiter zur nächsten Seite</a>
		{/if}
	</div>
</Scroller>

<style>
	a:not(#next) {
		display: grid;
		grid-template-rows: 1fr auto;
		text-decoration: none;
		color: black;
		height: 380px;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		position: relative;
		width: min(100%, 400px);
		margin: auto;
	}

	#next {
		display: block;
		text-align: center;
		margin: 1rem;
		text-decoration-line: underline overline;
		text-decoration-thickness: from-font;
		font-size: 2rem;
		color: #2277f7;
		text-underline-offset: 8px;
	}

	div {
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(5px);
		grid-row: 2 / 3;
		padding: 1rem;
	}

	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		object-fit: cover;
	}

	h2 {
		margin: 0;
		text-align: center;
	}

	p {
		margin: 0.5rem 0;
		text-align: center;
	}

	a:not(#next).risky {
		background-color: rgba(255, 217, 48, 0.085);
		border: 2px solid;
		border-image: conic-gradient(red, yellow, red, yellow, red, yellow, red) 1;
	}
</style>
