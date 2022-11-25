<script lang="ts">
	import { createGroup } from '$lib/groups';
	import { addToGroup } from '$lib/members';
	import { page } from '$app/stores';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@brainandbones/skeleton';
	import { invalidate } from '$app/navigation';

	// Form Data
	const formData = {
		name: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {
		//TODO: check name constraints
		const gcres = await createGroup(formData.name);
		if (gcres) {
			const gares = await addToGroup($page.data.session?.user.id ?? 'NULL', gcres.id ?? 'NULL');
			invalidate('rice:members');
		}
		modalStore.close();
	}

	// Base Classes
	const cBase: string = 'space-y-4';
	const cForm: string = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

<div class={cBase}>
	<form class="modal-form {cForm}">
		<label>
			<span>Name</span>
			<input type="text" bind:value={formData.name} placeholder="Kitchen name..." />
		</label>
	</form>
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Create kitchen</button>
    </footer>
</div>
