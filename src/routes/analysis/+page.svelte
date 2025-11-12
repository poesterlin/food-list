<script lang="ts">
	export let data;
</script>

<div class="container mx-auto p-6 max-w-md">
	<h1 class="text-3xl font-bold text-pink-600 text-center mb-6">Zutaten Analyse</h1>
	<div class="bg-white rounded-xl shadow-lg overflow-hidden">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-blue-100">
				<tr>
					<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
						Zutat
					</th>
					<th scope="col" class="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
						Verwendet
					</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each data.favorites as { name, count }}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							{name}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
							{count}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
