<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/date-helper.js';
	import Modal from '$lib/Modal.svelte';

	export let data;

	let uploadEl: HTMLInputElement;
	let isAddIngredientModalOpen = false;

	function openFile() {
		uploadEl.click();
		uploadEl.addEventListener('change', () => uploadEl.form!.submit());
	}
</script>

<div class="container mx-auto p-6 max-w-6xl">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<!-- Left Column: Image and Actions -->
		<div class="md:col-span-1 sticky top-8 h-fit">
			<div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
				<div class="relative h-64">
					{#if data.recipe.imgId}
						<img src="/image/{data.recipe.id}" alt={data.recipe.name} class="w-full h-full object-cover" />
						<form id="delete-img" action="?/deleteImage" method="post" class="absolute top-4 right-4 z-10">
							<button class="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold hover:bg-red-600 transition-colors duration-200">
								&times;
							</button>
						</form>
					{:else}
						<img src="/placeholder.svg" alt="Kein Bild vorhanden" class="w-full h-full object-cover" />
					{/if}
				</div>
				<div class="p-4 bg-white border-t border-gray-100">
					<h1 class="text-3xl font-bold text-pink-600 mb-2">{data.recipe.name}</h1>
					<p class="text-gray-500 text-sm">{formatDate(data.recipe.date)}</p>
				</div>
			</div>

			<div class="flex flex-wrap justify-center gap-4 p-4 bg-white rounded-xl shadow-lg">
				<form method="post" action="?/duplicate">
					<button type="submit" class="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 000 2h2a1 1 0 100-2H9z"/>
						</svg>
						<span>Nochmal gemacht</span>
					</button>
				</form>
				<form action="?/delete" method="post">
					<button class="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 2a1 1 0 100 2h1a1 1 0 100-2h-1zm-6 0a1 1 0 100 2h1a1 1 0 100-2H7z" clip-rule="evenodd"/>
						</svg>
						<span>Löschen</span>
					</button>
				</form>
				<form
					action="?/uploadImage"
					method="post"
					use:enhance
					enctype="multipart/form-data"
					class="hidden"
				>
					<input bind:this={uploadEl} type="file" name="image" accept="image/*" required hidden />
					<button type="submit" hidden>Hochladen</button>
				</form>
				<button on:click={openFile} class="flex items-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 3 3 5-5V15zM9 6a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"/>
					</svg>
					<span>Bild hochladen</span>
				</button>
			</div>
		</div>

		<!-- Right Column: Ingredients and Add Ingredient Form -->
		<div class="md:col-span-2">
			<section class="bg-white p-6 rounded-xl shadow-lg mb-8">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-semibold text-pink-600">Zutaten:</h2>
					<button on:click={() => isAddIngredientModalOpen = true} class="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors duration-200 shadow-md">
						Hinzufügen
					</button>
				</div>
				<ul class="space-y-3 text-gray-700">
					{#each data.ingredients as ingredient}
						<li class="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
							<span>{ingredient.name}</span>
							<form action="?/removeIngredient" method="post">
								<input type="hidden" name="ingredient_id" value={ingredient.id} />
								<button type="submit" class="text-red-500 hover:text-red-700 transition-colors duration-200">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm2 12a1 1 0 10-2 0v1a1 1 0 102 0v-1zm4-6a1 1 0 10-2 0v5a1 1 0 102 0V8zm-8 0a1 1 0 10-2 0v5a1 1 0 102 0V8z" clip-rule="evenodd"/>
									</svg>
								</button>
							</form>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</div>

<Modal bind:open={isAddIngredientModalOpen} on:close={() => isAddIngredientModalOpen = false}>
	<div slot="title">Zutat hinzufügen</div>
	<div slot="content">
		<form action="?/add" method="post" class="flex flex-col sm:flex-row gap-4">
			<select name="food_id" id="food_id" required value="" 
				class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
			>
				<option value="" selected disabled> Zutat auswählen </option>
				{#each data.allIngredients as ingredient}
					<option value={ingredient.id}>{ingredient.name}</option>
				{/each}
			</select>
			<button type="submit" class="bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-200 shadow-md">
				Hinzufügen
			</button>
		</form>
	</div>
</Modal>
