<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { createGroup } from '$lib/groups';
	import { addToGroup } from '$lib/members';
	import type { PageData } from './$types';
	import { modalStore, type ModalSettings } from '@brainandbones/skeleton';
	import { invalidate } from '$app/navigation';

	let profile = { name: '' };

	export let data: PageData;

	const loadProfile = async () => {
		const { data, error } = await supabaseClient
			.from('profiles')
			.select('*')
			.eq('id', $page.data.session?.user.id);
		console.log(data);
		console.log(error);
		profile = (data ?? [{ name: '' }])[0];
	};

	function triggerPrompt(): void {
		const prompt: ModalSettings = {
			type: 'prompt',
			title: 'Create Kitchen',
			body: 'Please enter the name of your new kitchen',
			value: '',
			response: async (r: string) => {
				// TODO: block empty names
				const gcres = await createGroup(r);
				if (gcres) {
					const gares = await addToGroup($page.data.session?.user.id ?? 'NULL', gcres.id ?? 'NULL');
					invalidate('rice:members');
				}
			}
		};
		modalStore.trigger(prompt);
	}

	$: if ($page.data.session) {
		loadProfile();
	}
</script>

<div class="flex flex-col p-4">
	<h1 class="font-semibold text-7xl pb-4">Rice</h1>
	{#each data.members ?? [] as member}
		<div class="card w-1/2 mb-4 p-4">{member.group_id?.name}</div>
	{/each}
	<button class="card hover:bg-primary-900 p-4 w-1/2 mb-4" on:click={triggerPrompt}
		>Create a new kitchen</button
	>
	<form method="POST" action="?/signout">
		<button class="btn btn-filled-primary w-min">Sign out</button>
	</form>
</div>
