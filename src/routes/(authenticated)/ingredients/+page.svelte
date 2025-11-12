<script lang="ts">
	export let data;

	let category = data.categories[0].category;
	$: isOther = category === 'other';
	$: selectName = isOther ? undefined : 'category';
	$: inputName = isOther ? 'category' : undefined;

</script>

<div class="flex flex-col items-center py-8">
	<h1 class="text-3xl font-bold text-pink-600 mb-6">Zutat hinzufügen</h1>
	<form action="?/add" method="post" class="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4">
		<div>
			<label for="name" class="block text-gray-700 text-sm font-medium mb-1">Zutat</label>
			<input type="text" placeholder="Name" name="name" id="name" required
				class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
			/>
		</div>
		
		<div>
			<label for="category" class="block text-gray-700 text-sm font-medium mb-1">Kategorie</label>
			<select name={selectName} id="category" required bind:value={category}
				class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
			>
				{#each data.categories as { category }}
					<option value={category}>
						{category}
					</option>
				{/each}
				<option value="other">Andere</option>
			</select>
		</div>

		{#if isOther}
			<div>
				<label for="category" class="block text-gray-700 text-sm font-medium mb-1">Neue Kategorie</label>
				<input type="text" placeholder="Neue Kategorie" name={inputName} id="category" required
					class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
				/>
			</div>
		{/if}

		<div class="flex items-center justify-between py-2">
			<label for="allowed" class="text-gray-700 text-sm font-medium">Potentiell Riskant</label>
			<input type="checkbox" name="allowed" id="allowed" 
				class="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400"
			/>
		</div>
		<button type="submit" class="w-full bg-pink-500 text-white py-3 px-4 rounded-lg font-semibold text-lg 
			hover:bg-pink-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
		>
			Hinzufügen
		</button>
	</form>
</div>
