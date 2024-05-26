<script lang="ts">
	export let data;

	let value: Record<string, boolean> = {};
</script>

<main>
	<form method="post">
		<label for="name"><h1>Gericht</h1></label>
		<input type="text" placeholder="Name" name="name" id="name" />

		<h2>Zutaten:</h2>
		<details>
			<summary>Favouriten</summary>
			<ul>
				{#each data.favorites as food}
					<li>
						<label>
							<input type="checkbox" name="food_{food.id}" bind:checked={value[food.id]} />
							{food.name}
						</label>
					</li>
				{/each}
			</ul>
		</details>
		{#each data.categories as category}
			<details>
				<summary>{category.name}</summary>
				<ul>
					{#each category.list as food}
						<li>
							<label>
								<input type="checkbox" name="food_{food.id}" bind:checked={value[food.id]} />
								{food.name}
							</label>
						</li>
					{/each}
				</ul>
			</details>
		{/each}

		<button type="submit">Eintragen</button>
	</form>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	details {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	summary {
		font-size: 1.25rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	button {
		margin-top: 3rem;
		width: 100%;
		color: white;
		background-color: #007bff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
