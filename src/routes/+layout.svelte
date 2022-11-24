<script lang="ts">
	import '../theme.postcss';
	import '@brainandbones/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@brainandbones/skeleton';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header"
		><AppBar>
			<svelte:fragment slot="lead">
				<img width="64px" height="64px" src="android-chrome-192x192.png" alt="Rice logo" />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm"
					href="https://github.com/buk0vec/rice"
					target="_blank"
					rel="noreferrer">GitHub</a
				>
			</svelte:fragment>
		</AppBar></svelte:fragment
	>
	<!-- Page Content Slot -->
	<slot />
</AppShell>
