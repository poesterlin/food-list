<script>
	import '../app.css';
	import { page } from '$app/stores';
	
	$: currentPath = $page.route.id;
	
	export let data;
</script>

<header>
	<nav>
		<a href="/" class:current={currentPath === '/'}>Eintragen</a>
		<a href="/recipes" class:current={currentPath === '/recipes'}>Gerichte</a>
		<a href="/ingredients" class:current={currentPath === '/ingredients'}>Zutaten</a>
		<a href="/analysis" class:current={currentPath === '/analysis'}>Auswertung</a>
		<a href="insights" class:current={currentPath === '/insights'}>Erkenntnisse</a>
	</nav>

	<b>Tag {data.daysSince}!</b>
</header>

<slot />

<style>
	:global(body) {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	:global(h1) {
		font-size: 1.5rem;
		margin-top: 0.6rem;
	}

	:global(*) {
		box-sizing: border-box;
	}

	header {
		background-color: #96c8f9;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	nav {
		display: flex;
		gap: 2%;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a.current {
		font-weight: bold;
	}
</style>
