<script lang="ts">
	import { formatDate } from '$lib/date-helper.js';

	export let data;
</script>

<main>
	<h1>{data.recipe.name}</h1>
	<p>{formatDate(data.recipe.date)}</p>
	<nav>
		<form method="post" action="?/duplicate">
			<button type="submit">Nochmal gemacht</button>
		</form>
		<form action="?/delete" method="post">
			<button>Löschen</button>
		</form>
	</nav>
	<h2>Zutaten:</h2>
	<ul>
		{#each data.ingredients as ingredient}
			<li>
				{ingredient.name}
			</li>
		{/each}
	</ul>

	<div>
		<h2>Zutat hinzufügen:</h2>
		<form action="?/add" method="post">
			<select name="food_id" id="food_id" required value="">
				<option value="" selected disabled> Zutat auswählen </option>
				{#each data.allIngredients as ingredient}
					<option value={ingredient.id}>{ingredient.name}</option>
				{/each}
			</select>
			<button type="submit">Hinzufügen</button>
		</form>
	</div>
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

	form {
		display: flex;
		gap: 1rem;
	}
</style>
