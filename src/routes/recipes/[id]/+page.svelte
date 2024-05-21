<script lang="ts">
	import { formatDate } from '$lib/date-helper.js';

	export let data;
</script>

<main>
	<h1>{data.recipe.name}</h1>
	<nav>
		<form method="post" action="?/duplicate">
			<button type="submit">Nochmal gemacht</button>
		</form>
		<form action="?/delete" method="post">
			<button>Löschen</button>
		</form>
	</nav>
	<p>{formatDate(data.recipe.date)}</p>
	<h2>Zutaten:</h2>
	<ul>
		{#each data.ingredients as ingredient}
			<li>
				{ingredient.name}
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		padding: 1.7rem;
	}

	li {
		margin-bottom: 0.5rem;
	}

	nav {
		display: flex;
		gap: 1rem;
	}

	button {
		color: white;
		background-color: #007bff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
	}
</style>
