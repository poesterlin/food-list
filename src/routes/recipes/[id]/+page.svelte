<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/date-helper.js';
	import Modal from '$lib/Modal.svelte';
	import ImageUploadModal from '$lib/ImageUploadModal.svelte';
	import ConfirmationModal from '$lib/ConfirmationModal.svelte';

	export let data;

	let isAddIngredientModalOpen = false;
	let isImageUploadModalOpen = false;
	let isDeleteRecipeModalOpen = false;
	let isDeleteImageModalOpen = false;

	let deleteRecipeForm: HTMLFormElement;
	let deleteImageForm: HTMLFormElement;
</script>

<div class="container mx-auto max-w-6xl p-6">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
		<!-- Left Column: Image and Actions -->
		<div class="sticky top-8 h-fit md:col-span-1">
			<div class="mb-6 overflow-hidden rounded-xl bg-white shadow-lg">
				<div class="relative h-64">
					{#if data.recipe.imgId}
						<img
							src="/image/{data.recipe.id}"
							alt={data.recipe.name}
							class="h-full w-full object-cover"
						/>
						<form
							bind:this={deleteImageForm}
							id="delete-img"
							action="?/deleteImage"
							method="post"
							class="absolute top-4 right-4 z-10"
						>
							<button
								type="button"
								on:click={() => (isDeleteImageModalOpen = true)}
								class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white transition-colors duration-200 hover:bg-red-600"
							>
								&times;
							</button>
						</form>
					{:else}
						<img
							src="/placeholder.svg"
							alt="Kein Bild vorhanden"
							class="h-full w-full object-cover p-4"
						/>
					{/if}
				</div>
				<div class="border-t border-gray-100 bg-white p-4">
					<h1 class="mb-2 text-3xl font-bold text-pink-600">{data.recipe.name}</h1>
					<p class="text-sm text-gray-500">{formatDate(data.recipe.date)}</p>
				</div>
			</div>

			<div class="flex child-flex flex-wrap justify-center gap-4 rounded-xl bg-white p-4 shadow-lg">
				<form method="post" action="?/duplicate" use:enhance>
					<button
						type="submit"
						class="flex items-center space-x-2 rounded-lg border border-blue-500 bg-transparent px-4 py-2 text-blue-600 transition-colors duration-200 hover:bg-blue-500 hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 000 2h2a1 1 0 100-2H9z"
							/>
						</svg>
						<span>Nochmal gemacht</span>
					</button>
				</form>
				<form bind:this={deleteRecipeForm} action="?/delete" method="post">
					<button
						type="button"
						on:click={() => (isDeleteRecipeModalOpen = true)}
						class="flex items-center space-x-2 rounded-lg border border-red-500 bg-transparent px-4 py-2 text-red-600 transition-colors duration-200 hover:bg-red-500 hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 2a1 1 0 100 2h1a1 1 0 100-2h-1zm-6 0a1 1 0 100 2h1a1 1 0 100-2H7z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>Löschen</span>
					</button>
				</form>
				<button
					on:click={() => (isImageUploadModalOpen = true)}
					class="flex items-center space-x-2 rounded-lg border border-green-500 bg-transparent px-4 py-2 text-green-600 transition-colors duration-200 hover:bg-green-500 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 3 3 5-5V15zM9 6a2 2 0 11-4 0 2 2 0 014 0z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Bild hochladen</span>
				</button>
			</div>
		</div>

		<!-- Right Column: Ingredients and Add Ingredient Form -->
		<div class="md:col-span-2">
			<section class="mb-8 rounded-xl bg-white p-6 shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-semibold text-pink-600">Zutaten:</h2>
					<button
						on:click={() => (isAddIngredientModalOpen = true)}
						class="rounded-lg bg-purple-500 px-4 py-2 text-white shadow-md transition-colors duration-200 hover:bg-purple-600"
					>
						Hinzufügen
					</button>
				</div>
				<ul class="space-y-3 text-gray-700">
					{#each data.ingredients as ingredient}
						<li class="flex items-center justify-between rounded-lg bg-gray-50 p-3 shadow-sm">
							<span>{ingredient.name}</span>
							<form action="?/removeIngredient" method="post">
								<input type="hidden" name="ingredient_id" value={ingredient.id} />
								<button
									type="submit"
									class="text-red-500 transition-colors duration-200 hover:text-red-700"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm2 12a1 1 0 10-2 0v1a1 1 0 102 0v-1zm4-6a1 1 0 10-2 0v5a1 1 0 102 0V8zm-8 0a1 1 0 10-2 0v5a1 1 0 102 0V8z"
											clip-rule="evenodd"
										/>
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

<Modal bind:open={isAddIngredientModalOpen} on:close={() => (isAddIngredientModalOpen = false)}>
	<div slot="title">Zutat hinzufügen</div>
	<div slot="content">
		<form action="?/add" method="post" class="flex flex-col gap-4 sm:flex-row">
			<select
				name="food_id"
				id="food_id"
				required
				value=""
				class="flex-grow rounded-lg border border-gray-300 p-3 transition duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
			>
				<option value="" selected disabled> Zutat auswählen </option>
				{#each data.allIngredients as ingredient}
					<option value={ingredient.id}>{ingredient.name}</option>
				{/each}
			</select>
			<button
				type="submit"
				class="rounded-lg bg-purple-500 px-6 py-3 text-white shadow-md transition-colors duration-200 hover:bg-purple-600"
			>
				Hinzufügen
			</button>
		</form>
	</div>
</Modal>

<ImageUploadModal
	bind:open={isImageUploadModalOpen}
	on:close={() => (isImageUploadModalOpen = false)}
/>

<ConfirmationModal
	bind:open={isDeleteRecipeModalOpen}
	title="Rezept löschen"
	message="Bist du sicher, dass du dieses Rezept löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden."
	on:confirm={() => deleteRecipeForm.submit()}
	on:cancel={() => (isDeleteRecipeModalOpen = false)}
/>

<ConfirmationModal
	bind:open={isDeleteImageModalOpen}
	title="Bild löschen"
	message="Bist du sicher, dass du dieses Bild löschen möchtest?"
	on:confirm={() => deleteImageForm.submit()}
	on:cancel={() => (isDeleteImageModalOpen = false)}
/>


<style>
	.child-flex > *, .child-flex > form button {
		flex: 1 1 100%;
		width: 100%;
	}
</style>