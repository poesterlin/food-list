<script lang="ts">
	export let data;
</script>

<main>
	<table>
		<thead>
			<tr>
				<th>Zutat</th>
				<th>Verwendet</th>
			</tr>
		</thead>
		<tbody>
			{#each data.favorites as { name, count }}
				<tr>
					<td>{name}</td>
					<td>{count}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	main {
        max-width: min(90vw, 500px);
        margin: 2rem auto;
	}

	table {
        margin: auto;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid black;
		padding: 0.5rem;
	}

	th {
		background-color: #f0f0f0;
	}

    tr:nth-child(even) {
        background-color: #f0f0f0;
    }

    td:nth-child(2) {
        text-align: right;
    }
</style>
