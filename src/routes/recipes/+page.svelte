<script lang="ts">
	import { formatDate } from '$lib/date-helper.js';

	export let data;
</script>

<main>
	<ul>
		{#each data.recipes as recipe}
			<li>
				<a href="/recipes/{recipe.id}">
					<div>
						<h2>{recipe.name}</h2>
						<p>{formatDate(recipe.date)}</p>
					</div>
					{#if recipe.imgId}
						<img src="/image/{recipe.id}" alt={recipe.name} />
					{:else}
						<img src="/placeholder.svg" alt="Kein Bild vorhanden" />
					{/if}
				</a>
			</li>
		{:else}
			<p>Keine Rezepte vorhanden</p>
		{/each}
	</ul>
</main>

<style>
	main {
		padding: 1.7rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1rem;
	}

	li,
	a {
		height: 320px;
	}

	a {
		display: grid;
		grid-template-rows: 1fr auto;
		text-decoration: none;
		color: black;
		height: 100%;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		position: relative;
		margin-bottom: 1rem;
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
</style>
