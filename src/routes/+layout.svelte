<script>
	import { page } from '$app/stores';

	$: currentPath = $page.route.id;
</script>

<header>
	<a href="/" class:current={currentPath === '/'}>Eintragen</a>
	<a href="/recipes" class:current={currentPath === '/recipes'}>Gerichte</a>
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

	header {
		background-color: #96c8f9;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a.current {
		font-weight: bold;
	}
</style>
