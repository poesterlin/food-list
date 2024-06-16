<script lang="ts">
	export let data;

	let category = data.categories[0].category;
	$: isOther = category === 'other';
	$: selectName = isOther ? undefined : 'category';
	$: inputName = isOther ? 'category' : undefined;

</script>

<main>
	<h1>Zutat hinzufügen</h1>
	<form action="?/add" method="post">
		<label for="name">Zutat</label>
		<input type="text" placeholder="Name" name="name" id="name" required/>
		<label for="category">Kategorie</label>
		<select name={selectName} id="category" required bind:value={category}>
			{#each data.categories as { category }}
				<option value={category}>
					{category}
				</option>
			{/each}
			<option value="other">Andere</option>
		</select>

		{#if isOther}
			<label for="category">Kategorie</label>
			<input type="text" placeholder="Neue Kategorie" name={inputName} id="category" required/>
		{/if}


		<div class="center">
			<label for="allowed">Potentiell Riskant</label>
			<input type="checkbox" name="allowed" id="allowed" />
		</div>
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

	.center {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		padding-right: 0.1rem;
	}
</style>
