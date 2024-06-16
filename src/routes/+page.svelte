<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let value: Record<string, boolean> = {};

	if (form?.uniqueIngredients) {
		form.uniqueIngredients.forEach((id) => {
			value[id] = true;
		});
	}

	function getTodayDateValue() {
		return new Date().toISOString().split('T')[0];
	}
</script>

<main>
	<form method="post" use:enhance>
		<label for="name"><h1>Gericht</h1></label>
		<input type="text" placeholder="Name" name="name" id="name" value={form?.name ?? ''} />
		<input type="date" name="date" id="date" value={form?.date ?? getTodayDateValue()} />

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

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

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		width: 100%;
	}

	input[type='text'],
	input[type='date'] {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}

	input[type='checkbox'] {
		margin-right: 0.5rem;
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

	li {
		display: flex;
		align-items: center;
		margin-bottom: 0.1rem;
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

	.error {
		color: red;
	}
</style>
