<script lang="ts">
	import PhotoList from '$lib/PhotoList.svelte';

	export let data;
</script>

<div class="py-4">
	<PhotoList
		recipes={data.recipes}
	></PhotoList>
</div>
