<script lang="ts">
	import type { PageData } from './$types';
	import { modalStore, type ModalComponent, type ModalSettings } from '@brainandbones/skeleton';
	import RemoveGroupModal from './RemoveGroupModal.svelte';
	import EventCard from './EventCard.svelte';
	import type { Readable } from 'svelte/store';

	let store: Readable<any>;

	let eventStore: Readable<any[]>;

	let events: any[];

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

	const sortEvents = (a: any, b: any) => {
		const aea = new Date(a.expires_at);
		const bea = new Date(b.expires_at);
		const now = new Date();
		if (aea < now && bea < now) {
			return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
		} else if (aea < now) {
			return 1;
		} else if (bea < now) {
			return -1;
		}
		return new Date(a.expires_at) > new Date(b.expires_at) ? 1 : -1;
	};

	$: if (data.eventStore) {
		eventStore = data.eventStore;
		events = $eventStore.sort((a, b) => sortEvents(a, b));
	}
</script>

<div class="flex flex-col p-4 gap-4">
	<h1 class="font-semibold text-7xl">{data.name}</h1>
	<h3>{$store.events.toString()}</h3>
	<a class="btn btn-filled-primary w-24" href={'/app/new?gid=' + $store.id}>Make rice</a>
	<a class="btn btn-filled-primary w-24" href="/app">Back</a>
	{#each events as event}
		<EventCard {event} />
	{/each}
	<button class="btn btn-filled-warning w-24" on:click={triggerPrompt}>Leave</button>
</div>
