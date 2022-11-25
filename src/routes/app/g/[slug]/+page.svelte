<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-col p-4">
	<h1 class="font-semibold text-7xl pb-4">{data.name}</h1>
	<a class="btn btn-filled-primary w-24" href="/app">Back</a>
</div>
