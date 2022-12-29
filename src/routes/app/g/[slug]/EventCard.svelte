<script lang="ts">
	import moment from 'moment';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	export let event: any;
	export let responses: any[];

	let expires = Math.floor(
		moment
			.duration(moment(event.expires_at ?? '').diff(Date.now()))
			.asSeconds()
			.valueOf()
	);

	let timer: NodeJS.Timer | null = null;
	let displayTime: string = '**:**';

	let bg: string = '';

	onMount(() => {
		if (expires > 0) {
			timer = setInterval(() => {
				expires = Math.floor(
					moment
						.duration(moment(event.expires_at ?? '').diff(Date.now()))
						.asSeconds()
						.valueOf()
				);
			}, 1000);
		}
	});

	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	});

	$: if (expires <= 0 && timer) {
		clearInterval(timer);
	}

	$: if (expires > 0) {
		displayTime = `${Math.floor(expires / 60)}:${expires % 60 < 10 ? '0' : ''}${expires % 60}`;
		if (expires >= 180) {
			bg = '!bg-green-500';
		} else if (expires <= 60) {
			bg = '!bg-warning-500';
		} else {
			bg = '!bg-yellow-800';
		}
	} else {
		displayTime = '00:00';
		bg = '';
	}

	let toggled = false;
</script>

<div class={`card p-4 ${bg}`}>
	<div class="flex flex-row justify-between items-center">
		<p>Cooking in {displayTime}</p>
		<p>{responses.length} response{responses.length === 1 ? '' : 's'}</p>
		<p>{responses.reduce((p, c) => p + c.amount, 0)} cups</p>
		{#if responses.find((r) => r.owner === $page.data.session?.user.id)}
			<button class="btn btn-filled-primary">Edit response</button>
		{:else}
			<button class="btn btn-filled-primary">Create response</button>
		{/if}
		<button on:click={() => (toggled = !toggled)}>{toggled ? '▼' : '▲'}</button>
	</div>
	{#if toggled}
		<p>Cooked by {event.owner}</p>
		<p>Created at: {moment(event.created_at).toLocaleString()}</p>
	{/if}
</div>
