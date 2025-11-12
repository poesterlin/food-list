<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	function getTodayDateValue() {
		return new Date().toISOString().split('T')[0];
	}

	$: year = parseInt($page.params.year!);
	$: month = parseInt($page.params.month!);
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

<div class="min-h-screen bg-purple-50 p-4 font-sans text-slate-700">
	<div class="mx-auto max-w-4xl">
		<!-- Symptom Entry Form -->
		<details class="mb-10 rounded-3xl bg-white p-6 shadow-sm">
			<summary
				class="summary-marker-pink list-none cursor-pointer text-lg font-medium"
			>
				Symptom eintragen
			</summary>
			<form action="?/create" method="post" class="mt-6 space-y-8">
				<fieldset class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
					{#each data.icons as { list }}
						{#each list as icon}
							<label
								class="symptom-label flex cursor-pointer flex-col items-center space-y-2 rounded-xl p-2 transition-colors duration-200 hover:bg-slate-50"
							>
								<input type="checkbox" name="icon_{icon.id}" hidden class="symptom-checkbox" />
								<div
									class="symptom-img-wrapper grid h-16 w-16 place-items-center rounded-full transition-colors duration-200"
								>
									<img
										class="symptom-img h-12 w-12 object-contain"
										src="/image/icons/{icon.id}"
										alt="icon"
									/>
								</div>
								<span
									class="symptom-name text-center text-sm font-medium text-slate-500 transition-colors duration-200"
									>{icon.name}</span
								>
							</label>
						{/each}
					{/each}
				</fieldset>

				<div>
					<label for="date" class="mb-2 block text-sm font-medium text-slate-600">Datum</label>
					<input
						type="date"
						id="date"
						name="date"
						value={getTodayDateValue()}
						required
						class="w-full max-w-xs rounded-lg border-slate-200 p-3 text-slate-700 transition duration-200 ring-1 ring-pink-200 focus:ring-pink-400 focus:outline-none"
					/>
				</div>
				<button
					type="submit"
					class="w-full rounded-xl bg-pink-500 px-4 py-3 text-lg font-semibold text-white shadow-sm
					transition-all duration-200 hover:bg-pink-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
				>
					Eintragen
				</button>
			</form>
		</details>

		<!-- Calendar -->
		<div class="mb-4 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-slate-800">Kalender</h1>
			<div class="flex items-baseline space-x-2 text-2xl font-medium text-slate-400">
				<span class="text-pink-500">{fixedMonth}</span>
				<span>{year}</span>
			</div>
		</div>

		<div id="nav" class="mb-6 flex justify-between">
			<a
				rel="prefetch"
				href={prev}
				class="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-400 shadow-sm transition-colors duration-200 hover:bg-slate-50"
			>
				&lt;
			</a>
			<a
				rel="prefetch"
				href={next}
				class="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-400 shadow-sm transition-colors duration-200 hover:bg-slate-50"
			>
				&gt;
			</a>
		</div>

		<div id="calender">
			{#each daysOfWeek as day}
				<div class="day-name">{day}</div>
			{/each}
			{#each new Array(data.offset).fill(1) as _}
				<div />
			{/each}
			{#each data.days as day}
				<div class="day-cell" class:today={day.today} class:mobile-hide={day.symptoms === undefined}>
					<b>{day.date}</b>
					<div class="symptoms">
						{#if day.symptoms}
							{#each day.symptoms as e}
								<img class="grid-img" src="/image/icons/{e}" alt="icon" />
							{/each}
						{/if}
					</div>
					<!-- The delete form is hidden to match the design, but kept for functionality -->
					{#if day.symptoms !== undefined}
						<form class="clear-form" action="?/del" method="post" title="Eintrag löschen">
							<input type="hidden" name="id" value={day.id} />
							<button class="clear-btn" type="submit">&times;</button>
						</form>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* --- Form --- */
	/* Style the summary marker to be pink */
	.summary-marker-pink {
		padding-left: 20px;
		position: relative;
	}
	.summary-marker-pink::before {
		content: '▼';
		position: absolute;
		left: 0;
		color: #ec4899; /* pink-500 */
		font-size: 0.8em;
		transition: transform 0.2s ease-in-out;
		transform: rotate(-90deg);
		translate: 0 0.25em;
	}
	details[open] .summary-marker-pink::before {
		transform: rotate(0deg);
	}

	/* Style for unselected symptom icons */
	.symptom-img-wrapper {
		background-color: #f1f5f9; /* slate-100 */
	}
	/* Since the icon image is white, we use a filter to make it visible on the light background */
	.symptom-img {
		filter: brightness(0.7) invert(0.2);
		transition: filter 0.2s;
	}

	/* Style for selected symptom icons */
	.symptom-checkbox:checked + .symptom-img-wrapper {
		background-color: #ec4899; /* pink-500 */
	}
	.symptom-checkbox:checked + .symptom-img-wrapper > .symptom-img {
		filter: none; /* Remove the filter to show the pure white icon */
	}
	.symptom-checkbox:checked ~ .symptom-name {
		color: #ec4899; /* pink-500 */
	}

	/* --- Calendar Grid --- */
	#calender {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.75rem; /* gap-3 */
		width: 100%;
	}
	.day-name {
		text-align: center;
		font-weight: 500;
		font-size: 0.875rem; /* text-sm */
		color: #94a3b8; /* slate-400 */
		margin-bottom: 4px;
	}
	.day-cell {
		position: relative;
		background: white;
		border-radius: 1rem; /* rounded-2xl */
		min-height: 110px;
		padding: 8px;
	}
	.day-cell > b {
		font-weight: 500;
		font-size: 0.875rem;
		color: #64748b; /* slate-500 */
	}

	/* Style for today's date */
	.day-cell.today {
		background-color: #fff1f2; /* pink-50 */
	}
	.day-cell.today > b {
		color: #ec4899; /* pink-500 */
		font-weight: 700;
	}

	.symptoms {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding-top: 4px;
	}
	
	.grid-img {
		width: 40px;
		height: 40px;
		object-fit: contain;
		/* Apply filter to make white icon visible on light background */
		filter: brightness(0.7) invert(0.2);
	}

	/* Hide delete button by default for a cleaner look */
	.clear-form {
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}
	.day-cell:hover .clear-form {
		opacity: 1;
	}
	.clear-btn {
		position: absolute;
		top: 6px;
		right: 6px;
		background: #e2e8f0; /* slate-200 */
		color: #64748b; /* slate-500 */
		border: none;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
		display: grid;
		place-items: center;
	}
	.clear-btn:hover {
		background: #cbd5e1; /* slate-300 */
	}

	/* --- Responsive --- */
	@media (max-width: 600px) {
		#calender {
			gap: 12px;
		}
		.mobile-hide {
			display: none !important;
		}
		#calender {
			grid-template-columns: 1fr;
		}
		.day-name {
			display: none;
		}
	}
</style>