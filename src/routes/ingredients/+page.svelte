<script lang="ts">
	export let data;
</script>

<main>
	<h1>Zutat hinzufügen</h1>
	<form action="?/add" method="post">
		<label for="name">Zutat</label>
		<input type="text" placeholder="Name" name="name" id="name" />
		<label for="category">Kategorie</label>
		<select name="category" id="category">
			{#each data.categories as { category }}
				<option value={category}>
					{category}
				</option>
			{/each}
		</select>
		<button type="submit">Hinzufügen</button>
	</form>
</main>

<style>
	main {
		padding: 1.7rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		width: 100%;
		max-width: 300px;
		display: flex;
		flex-direction: column;

	}

	label {
		display: block;
		margin-bottom: 0.5rem;
	}

	input,
	select {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
	}

	button {
		color: white;
		background-color: #007bff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		margin-top: 1rem;
	}
</style>
