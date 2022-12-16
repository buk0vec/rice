<script lang="ts">
	import type { PageData } from './$types';
	import { modalStore, type ModalComponent, type ModalSettings } from '@brainandbones/skeleton';
	import RemoveGroupModal from './RemoveGroupModal.svelte';
	import type { Readable } from 'svelte/store';

	let store: Readable<any>;

	export let data: PageData;

	function triggerPrompt(): void {
		const c: ModalComponent = {
			ref: RemoveGroupModal
		};
		const d: ModalSettings = {
			type: 'component',
			component: c
		};
		modalStore.trigger(d);
	}

	$: if (data.store) {
		store = data.store;
	}
</script>

<div class="flex flex-col p-4 gap-4">
	<h1 class="font-semibold text-7xl">{data.name}</h1>
	<h3>{$store.events.toString()}</h3>
	<a class="btn btn-filled-primary w-24" href="/app">Back</a>
	<button class="btn btn-filled-warning w-24" on:click={triggerPrompt}>Leave</button>
</div>
