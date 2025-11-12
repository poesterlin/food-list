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

<div class="flex flex-col items-center py-8">
	<form method="post" use:enhance class="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-6">
		<h1 class="text-3xl font-bold text-pink-600 text-center mb-6">Gericht eintragen</h1>
		
		<div>
			<label for="name" class="block text-gray-700 text-sm font-medium mb-1">Name des Gerichts</label>
			<input 
				type="text" 
				placeholder="Name" 
				name="name" 
				id="name" 
				value={form?.name ?? ''} 
				class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
			/>
		</div>

		<div>
			<label for="date" class="block text-gray-700 text-sm font-medium mb-1">Datum</label>
			<input 
				type="date" 
				name="date" 
				id="date" 
				value={form?.date ?? getTodayDateValue()} 
				class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
			/>
		</div>

		{#if form?.error}
			<p class="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">{form.error}</p>
		{/if}

		<h2 class="text-2xl font-semibold text-blue-600 mt-8 mb-4">Zutaten auswählen:</h2>
		
		<details class="bg-blue-50 p-4 rounded-lg shadow-sm cursor-pointer">
			<summary class="text-lg font-semibold text-blue-700 hover:text-blue-900 transition duration-200">Favouriten</summary>
			<ul class="mt-3 space-y-2">
				{#each data.favorites as food}
					<li>
						<label class="flex items-center text-gray-700 cursor-pointer">
							<input type="checkbox" name="food_{food.id}" bind:checked={value[food.id]} class="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400" />
							<span class="ml-2">{food.name}</span>
						</label>
					</li>
				{/each}
			</ul>
		</details>

		{#each data.categories as category}
			<details class="bg-purple-50 p-4 rounded-lg shadow-sm cursor-pointer">
				<summary class="text-lg font-semibold text-purple-700 hover:text-purple-900 transition duration-200">{category.name}</summary>
				<ul class="mt-3 space-y-2">
					{#each category.list as food}
						<li>
							<label class="flex items-center text-gray-700 cursor-pointer {food.allowed ? '' : 'text-orange-500 font-medium'}">
								<input type="checkbox" name="food_{food.id}" bind:checked={value[food.id]} class="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-400" />
								<span class="ml-2">{food.name}</span>
							</label>
						</li>
					{/each}
				</ul>
			</details>
		{/each}

		<button 
			type="submit" 
			class="w-full bg-pink-500 text-white py-3 px-4 rounded-lg font-semibold text-lg 
				hover:bg-pink-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
		>
			Eintragen
		</button>
	</form>
</div>
