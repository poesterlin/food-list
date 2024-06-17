<script lang="ts">
	export let data;

	const format = Intl.DateTimeFormat('de', {
		weekday: 'long',
		month: 'numeric',
		day: 'numeric'
	}).format;

	function getTodayDateValue() {
		return new Date().toISOString().split('T')[0];
	}
</script>

<main>
	<form action="?/create" method="post">
		<label for="date">Datum</label>
		<input type="date" id="date" name="date" value={getTodayDateValue()} required />

		<fieldset>
			<legend>Symptome</legend>
			{#each data.icons as { category, list }}
				<details open>
					<summary>{category}</summary>
					{#each list as icon}
						<label>
							<input type="checkbox" name="icon_{icon.id}" />
							<span>{icon.name}</span>
							<img src="/image/icons/{icon.id}" alt="icon" width="62" height="62" />
						</label>
					{/each}
				</details>
			{/each}
		</fieldset>

		<button type="submit">Eintragen</button>
	</form>

	{#each data.entries as insight}
		<div>
			<h2>{format(new Date(insight.date))}</h2>
			<form action="?/del" method="post">
				<input type="hidden" name="id" value={insight.id} />
				<button type="submit">Löschen</button>
			</form>
			<ul>
				{#each insight.symptoms as icon}
					<li>
						{#if icon}
							<img src="/image/icons/{icon}" alt="icon" />
						{/if}
					</li>
				{:else}
					<li>Keine Symptome 🥳</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p>Keine Einträge vorhanden.</p>
	{/each}
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
		padding: 1rem;
	}

	input[type='date'] {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}

	input[type='checkbox'] {
		margin-right: 0.5rem;
	}

	fieldset {
		border: 0;
		border-top: 1px solid #000000;
		margin-top: 1rem;
	}

	details {
		display: flex;
		flex-direction: column;
	}

	button {
		width: 100%;
		color: white;
		background-color: #007bff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
