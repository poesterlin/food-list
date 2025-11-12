<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/date-helper.js';

	export let data;

	let uploadEl: HTMLInputElement;

	function openFile() {
		uploadEl.click();
		uploadEl.addEventListener('change', () => uploadEl.form!.submit());
	}
</script>

<div class="container mx-auto p-6 max-w-3xl">
	<header class="relative bg-white rounded-xl shadow-lg overflow-hidden mb-8">
		<div class="relative h-64 sm:h-80 md:h-96">
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
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
				<h1 class="text-4xl font-bold text-white text-shadow-lg">{data.recipe.name}</h1>
				<p class="text-lg text-white/90">{formatDate(data.recipe.date)}</p>
			</div>
		</div>

		<nav class="flex flex-wrap justify-center gap-4 p-4 bg-white border-t border-gray-100">
			<form method="post" action="?/duplicate">
				<button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md">
					Nochmal gemacht
				</button>
			</form>
			<form action="?/delete" method="post">
				<button class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md">
					Löschen
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
			<button on:click={openFile} class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md">
				Bild hochladen
			</button>
		</nav>
	</header>

	<section class="bg-white p-6 rounded-xl shadow-lg mb-8">
		<h2 class="text-2xl font-semibold text-pink-600 mb-4">Zutaten:</h2>
		<ul class="list-disc list-inside space-y-2 text-gray-700">
			{#each data.ingredients as ingredient}
				<li>
					{ingredient.name}
				</li>
			{/each}
		</ul>
	</section>

	<section class="bg-white p-6 rounded-xl shadow-lg">
		<h2 class="text-2xl font-semibold text-blue-600 mb-4">Zutat hinzufügen:</h2>
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
	</section>
</div>
