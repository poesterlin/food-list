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

<div class="container mx-auto p-4 max-w-5xl">
	<details class="bg-white p-6 rounded-xl shadow-lg mb-8">
		<summary class="text-2xl font-semibold text-pink-600 cursor-pointer hover:text-pink-700 transition duration-200">
			Symptom eintragen
		</summary>
		<form action="?/create" method="post" class="mt-6 space-y-4">
			<fieldset class="border-none p-0 max-h-64 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{#each data.icons as { list }}
					{#each list as icon}
						<label class="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 symptom-label">
							<input type="checkbox" name="icon_{icon.id}" hidden class="symptom-checkbox" />
							<div class="relative w-12 h-12 flex-shrink-0">
								<img
									class="w-full h-full object-contain rounded-full bg-blue-100 p-1 transition-all duration-200 symptom-img"
									src="/image/icons/{icon.id}"
									alt="icon"
								/>
							</div>
							<span class="text-gray-700 font-medium symptom-name">{icon.name}</span>
						</label>
					{/each}
				{/each}
			</fieldset>

			<div>
				<label for="date" class="block text-gray-700 text-sm font-medium mb-1">Datum</label>
				<input type="date" id="date" name="date" value={getTodayDateValue()} required
					class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200"
				/>
			</div>
			<button type="submit" class="w-full bg-pink-500 text-white py-3 px-4 rounded-lg font-semibold text-lg 
				hover:bg-pink-600 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
			>
				Eintragen
			</button>
		</form>
	</details>

	<h1 class="flex justify-between items-center text-3xl font-bold text-blue-600 mb-6">
		Kalender
		<div class="flex items-baseline space-x-2">
			<span class="text-pink-500">{fixedMonth}</span>
			<span>{year}</span>
		</div>
	</h1>
	<div id="nav" class="flex justify-between mb-8">
		<a rel="prefetch" href={prev} class="bg-blue-200 text-blue-700 p-2 rounded-full hover:bg-blue-300 transition-colors duration-200">
			<button class="font-bold text-xl">&lt;</button>
		</a>
		<a rel="prefetch" href={next} class="bg-blue-200 text-blue-700 p-2 rounded-full hover:bg-blue-300 transition-colors duration-200">
			<button class="font-bold text-xl">&gt;</button>
		</a>
	</div>
	<div id="calender" class="grid grid-cols-1 sm:grid-cols-7 gap-2">
		{#each daysOfWeek as day}
			<div class="text-center font-semibold text-gray-600 py-2 sm:block hidden">{day}</div>
		{/each}
		{#each new Array(data.offset).fill(1) as _}
			<div class="bg-gray-100 rounded-lg p-2 sm:block hidden" />
		{/each}
		{#each data.days as day}
			<div id="day" class="relative bg-white rounded-lg shadow-sm p-3 min-h-[120px] flex flex-col 
				{day.today ? 'border-2 border-pink-500 shadow-md' : 'border border-gray-200'}
				{day.symptoms === undefined ? 'sm:hidden hidden' : ''}"
			>
				<b class="text-lg font-bold text-gray-800 text-center mb-2">{day.date}</b>
				<div class="flex-grow grid grid-cols-3 gap-1 justify-items-center items-center">
					{#if day.symptoms}
						{#each day.symptoms as e}
							<img class="w-8 h-8 object-contain" src="/image/icons/{e}" alt="icon" />
						{:else}
							<p class="text-gray-500 text-sm col-span-3 text-center">Keine Symptome 🥳</p>
						{/each}
					{/if}
				</div>
				{#if day.symptoms !== undefined}
					<form action="?/del" method="post" class="absolute top-1 right-1">
						<input type="hidden" name="id" value={day.id} hidden />
						<button class="bg-red-400 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm hover:bg-red-500 transition-colors duration-200">
							&times;
						</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.symptom-checkbox:checked + .symptom-img {
		background-color: #fbcfe8; /* pink-200 */
		filter: none;
	}
	.symptom-checkbox:checked + .symptom-img + .symptom-name {
		font-weight: bold;
		color: #db2777; /* pink-700 */
	}
</style>
