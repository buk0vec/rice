<script lang="ts">
	import type { PageData } from './$types';
	import { modalStore, type ModalComponent, type ModalSettings } from '@brainandbones/skeleton';
	import NewGroupModal from './NewGroupModal.svelte';
	export let data: PageData;

	function triggerPrompt(): void {
		const c: ModalComponent = {
			ref: NewGroupModal
		};
		const d: ModalSettings = {
			type: 'component',
			component: c
		};
		modalStore.trigger(d);
	}
</script>

<div class="flex flex-col p-4">
	<h1 class="font-semibold text-7xl pb-4">Rice</h1>
	{#each data.members ?? [] as member}
		<a
			class="card w-1/2 mb-4 p-4"
			href={`/app/g/${
				Array.isArray(member.group_id) ? member.group_id[0].name : member.group_id?.id ?? ''
			}`}
			>{Array.isArray(member.group_id) ? member.group_id[0].name : member.group_id?.name ?? ''}</a
		>
	{/each}
	<button class="card hover:bg-primary-900 p-4 w-1/2 mb-4" on:click={triggerPrompt}
		>Create a new kitchen</button
	>
	<form method="POST" action="?/signout">
		<button class="btn btn-filled-primary w-min">Sign out</button>
	</form>
</div>
