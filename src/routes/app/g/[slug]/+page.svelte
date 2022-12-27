<script lang="ts">
	import type { PageData } from './$types';
	import { modalStore, type ModalComponent, type ModalSettings } from '@brainandbones/skeleton';
	import RemoveGroupModal from './RemoveGroupModal.svelte';
	import EventCard from './EventCard.svelte';

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

	let events: any[] = [];

	$: if (data.events) {
		console.log('Overwriting');
		events = [...data.events].sort((a, b) => sortEvents(a, b));
	}

	data.eventStore?.subscribe((value) => {
		if (value && value.eventType === 'INSERT') {
			events = [value.new, ...events];
			events.sort((a, b) => sortEvents(a, b));
		}
	});

	console.log(data);

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
</script>

<div class="flex flex-col p-4 gap-4">
	<h1 class="font-semibold text-7xl">{data.name}</h1>
	<a class="btn btn-filled-primary w-24" href={'/app/new?gid=' + data.group_id}>Make rice</a>
	<a class="btn btn-filled-primary w-24" href="/app">Back</a>
	{#each events as event (event.id)}
		<EventCard {event} />
	{/each}
	<button class="btn btn-filled-warning w-24" on:click={triggerPrompt}>Leave</button>
</div>
