<script lang="ts" generics="T">
	export let items: T[];
</script>

<div class="w-full h-full">
	<div style="overflow-anchor: none">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
			{#each items as item}
				<slot name="item" {item} />
			{:else}
				<slot name="empty" />
			{/each}
		</div>

		<slot name="footer" />
	</div>
</div>
