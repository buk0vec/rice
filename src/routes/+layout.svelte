<script lang="ts">
	import '../theme.postcss';
	import '@brainandbones/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@brainandbones/skeleton';
</script>

<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header"><h1>Rice</h1></svelte:fragment>
	<!-- Page Content Slot -->
	<slot />
</AppShell>
