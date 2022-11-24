<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center">
	<h1 class="font-semibold text-7xl text-center p-4">Main Application</h1>
	{#if !$page.data.session}
		<h1>I am not logged in</h1>
	{:else}
		<h1>Welcome {$page.data.session.user.email}</h1>
		<p>I am logged in!</p>
	{/if}
	<a class="btn btn-filled-primary w-min" href="/">Sign out</a>
</div>
