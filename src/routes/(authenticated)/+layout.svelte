<script>
	import { page } from '$app/stores';
	
	$: currentPath = $page.route.id;
	
	export let data;
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 font-sans text-gray-800">
	<header class="bg-white p-4 shadow-md flex items-center justify-between rounded-b-xl overflow-y-auto">
		<nav class="flex space-x-4">
			<a href="/" class="px-4 py-2 rounded-lg transition-colors duration-200 
				{currentPath === '/(authenticated)' ? 'bg-pink-300 text-pink-800 font-semibold shadow-sm' : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'}">Eintragen</a>
			<a href="/recipes" class="px-4 py-2 rounded-lg transition-colors duration-200 
				{currentPath === '/(authenticated)/recipes' ? 'bg-pink-300 text-pink-800 font-semibold shadow-sm' : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'}">Gerichte</a>
			<a href="/ingredients" class="px-4 py-2 rounded-lg transition-colors duration-200 
				{currentPath === '/(authenticated)/ingredients' ? 'bg-pink-300 text-pink-800 font-semibold shadow-sm' : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'}">Zutaten</a>
			<a href="/analysis" class="px-4 py-2 rounded-lg transition-colors duration-200 
				{currentPath === '/(authenticated)/analysis' ? 'bg-pink-300 text-pink-800 font-semibold shadow-sm' : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'}">Auswertung</a>
			<a href="/insights" class="px-4 py-2 rounded-lg transition-colors duration-200 
				{currentPath === '/(authenticated)/insights' ? 'bg-pink-300 text-pink-800 font-semibold shadow-sm' : 'text-gray-600 hover:bg-pink-100 hover:text-pink-700'}">Erkenntnisse</a>
		</nav>

		<!-- <b class="text-lg font-bold text-pink-600">Tag {data.daysSince}!</b> -->
	</header>

	<main class="container mx-auto p-6">
		<slot />
	</main>
</div>

