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

<main>
	<header>
		{#if data.recipe.imgId}
			<img src="/image/{data.recipe.id}" alt={data.recipe.name} />
			<form id="delete-img" action="?/deleteImage" method="post">
				<button>x</button>
			</form>
		{:else}
			<img src="/placeholder.svg" alt="Kein Bild vorhanden" />
		{/if}
		<h1>{data.recipe.name}</h1>
		<p>{formatDate(data.recipe.date)}</p>
		<nav>
			<form method="post" action="?/duplicate">
				<button type="submit">Nochmal gemacht</button>
			</form>
			<form action="?/delete" method="post">
				<button>Löschen</button>
			</form>
			<!-- {#if !data.recipe.imgId} -->
			<form
				action="?/uploadImage"
				method="post"
				use:enhance
				enctype="multipart/form-data"
				class="hide"
			>
				<input bind:this={uploadEl} type="file" name="image" accept="image/*" required hidden />
				<button type="submit" hidden>Hochladen</button>
			</form>
			<button on:click={openFile}>Bild hochladen</button>
			<!-- {/if} -->
		</nav>
	</header>

	<h2>Zutaten:</h2>
	<ul>
		{#each data.ingredients as ingredient}
			<li>
				{ingredient.name}
			</li>
		{/each}
	</ul>

	<div>
		<h2>Zutat hinzufügen:</h2>
		<form action="?/add" method="post">
			<select name="food_id" id="food_id" required value="">
				<option value="" selected disabled> Zutat auswählen </option>
				{#each data.allIngredients as ingredient}
					<option value={ingredient.id}>{ingredient.name}</option>
				{/each}
			</select>
			<button type="submit">Hinzufügen</button>
		</form>
	</div>
</main>

<style>
	main {
		margin: auto;
		max-width: min(50rem, 92vw);
	}

	header {
		position: relative;
		display: grid;
		grid-template-areas: '.' 'title' 'date' 'button';
		grid-template-columns: auto;
		grid-template-rows: 20rem 5rem 3rem auto;
		margin-bottom: 1rem;
	}

	header p {
		grid-area: date;
	}

	header h1 {
		grid-area: title;
	}

	header h1,
	header p {
		margin: 0;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(5px);
		padding: 0 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	header img {
		position: absolute;
		grid-row: 1 / 4;
		grid-column: 1;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	header form#delete-img {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	header form#delete-img button {
		color: white;
		border: 1px solid red;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
	}

	#delete-img button:hover {
		background-color: red;
	}

	li {
		margin-bottom: 0.5rem;
	}

	nav {
		grid-area: button;
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	button {
		color: white;
		background-color: #007bff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
	}

	form {
		display: flex;
		gap: 1rem;
	}

	form.hide {
		display: none;
	}
</style>
