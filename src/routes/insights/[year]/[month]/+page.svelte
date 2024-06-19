<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	function getTodayDateValue() {
		return new Date().toISOString().split('T')[0];
	}

	$: year = parseInt($page.params.year);
	$: month = parseInt($page.params.month);
	$: next = `/insights/${month === 12 ? year + 1 : year}/${(month % 12) + 1}/`;
	$: prev = `/insights/${month === 1 ? year - 1 : year}/${month === 1 ? 12 : month - 1}`;
	$: fixedMonth = month.toString().padStart(2, '0');

	const daysOfWeek = [
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag',
		'Sonntag'
	];
</script>

<main>
	<details>
		<summary>Eintragen</summary>
		<form action="?/create" method="post">
			<fieldset>
				{#each data.icons as { list }}
					{#each list as icon}
						<label class="symptom">
							<input type="checkbox" name="icon_{icon.id}" hidden />
							<img
								class="background"
								src="/image/icons/{icon.id}"
								alt="icon"
								width="62"
								height="62"
							/>
							<span>{icon.name}</span>
						</label>
					{/each}
				{/each}
			</fieldset>

			<label for="date">Datum</label>
			<input type="date" id="date" name="date" value={getTodayDateValue()} required />
			<button type="submit">Eintragen</button>
		</form>
	</details>

	<h1 class="space-between">
		Kalender
		<div>
			<span>{fixedMonth}</span>
			{year}
		</div>
	</h1>
	<div id="nav" class="space-between">
		<a rel="prefetch" href={prev}>
			<button>&lt;</button>
		</a>
		<a rel="prefetch" href={next}>
			<button>&gt;</button>
		</a>
	</div>
	<div id="calender">
		{#each daysOfWeek as day}
			<div class="names mobile-hide">{day}</div>
		{/each}
		{#each new Array(data.offset).fill(1) as _}
			<div class="grey mobile-hide" />
		{/each}
		{#each data.days as day}
			<div id="day" class:today={day.today} class:mobile-hide={day.symptoms.length === 0}>
				<b>{day.date}</b>
				<div class="symptoms">
					{#each day.symptoms as e}
						<img class="grid-img" src="/image/icons/{e}" alt="icon"/>
					{/each}
				</div>
				{#if day.symptoms.length > 0}
					<form action="?/del" method="post">
						<input type="hidden" name="id" value={day.id} hidden />
						<button class="clear-btn" type="submit"> &times; </button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		/* display: flex;
		flex-direction: column;
		align-items: center; */
		padding: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	details {
		margin-bottom: 1rem;
		width: min(100%, 400px);
		margin: auto;
	}

	input[type='date'] {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0 2rem;
	}

	input[type='checkbox'] {
		margin-right: 0.5rem;
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

	img.background {
		background: #264f2f;
	}

	.symptom {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0.5rem 0;
	}

	.symptom > input:checked + img {
		background: #077cdb;
		filter: invert(1);
	}

	.symptom > input:checked + img + span {
		font-weight: bold;
	}

	fieldset {
		border: none;
		padding: 0.5rem 2rem;
		margin-bottom: 1rem;
		max-height: 30vh;
		overflow-y: auto;
	}

	.space-between {
		display: flex;
		justify-content: space-between;
	}

	#nav {
		margin: 10px 0px 50px;
	}

	#calender > div {
		margin: 3px;
	}

	#calender {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		width: 100%;
	}

	@media (max-width: 600px) {
		.mobile-hide {
			display: none !important;
		}

		#calender {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	#day {
		position: relative;
		display: block;
		border: 1px solid #949494;
		margin: 3px;
		background: rgb(73, 73, 73);
		min-height: 100px;
	}

	b {
		display: inline-block;
		width: 100%;
		text-align: center;
		color: white;
		padding-top: 2px;
	}

	.grey {
		border: 1px solid #c0c0c0 !important;
		background: #e6e6e6;
	}

	.names {
		height: 30px;
		text-align: center;
		font-weight: bold;
		color: #363636;
	}

	a {
		text-decoration: none;
	}

	span {
		color: #ff5e2a;
	}

	#day.today {
		border: 2px solid #ff5e2a;
		box-shadow: 1px 2px #797979;
	}

	.clear-btn {
		position: absolute;
		top: -10px;
		right: -10px;
		z-index: 1;
		background: #ff5e2a;
		color: white;
		border: none;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		cursor: pointer;
		text-align: center;
		padding: 0px;
		padding-left: 2px;
		font-size: 1.5rem;
	}

	.symptoms {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
		gap: 5px;
		padding: 5px;
		justify-items: center;
	}

	.grid-img {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}
</style>
