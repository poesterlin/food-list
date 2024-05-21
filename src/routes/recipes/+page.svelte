<script lang="ts">
	import { formatDate } from '$lib/date-helper.js';

	export let data;
</script>

<main>
	<ul>
		{#each data.recipes as recipe}
			<li>
				<a href="/recipes/{recipe.id}">
					<article>
						<h2>{recipe.name}</h2>
						<p>{formatDate(recipe.date)}</p>
						<div>
							{#each recipe.ingredients.filter((i) => i.name).slice(0, 3) as ingredient}
								<span>{ingredient.name}</span>
							{/each}
							{#if recipe.ingredients.length > 3}
								<span>...</span>
							{/if}
						</div>
					</article>
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
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	li {
		margin-bottom: 1rem;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a:hover article {
		background-color: #f8f9fa;
	}

	article {
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		padding: 1rem;
	}

	h2 {
		margin: 0;
		text-align: center;
	}

	p {
		margin: 0.5rem 0;
	}

	div {
		display: flex;
		justify-content: space-between;
	}
</style>
