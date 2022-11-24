<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex flex-col items-center">
	<h1 class="font-semibold text-7xl text-center p-4">Create Account</h1>
	<form method="POST" action="?/createUser">
		<label for="email" class="mb-4"
			>Email
			{#if form?.emailMissing}<p class="text-red-500">The email field is required</p>{/if}
			<input
				type="email"
				class={`${form?.emailMissing && 'input-invalid'}`}
				name="email"
				value={form?.email ?? ''}
				placeholder="grain@rice.com"
			/>
		</label>
		<label for="password" class="mb-4"
			>Password
			{#if form?.passwordMissing}<p class="text-red-500">The password field is required</p>{/if}
			<input
				type="password"
				name="password"
				class={`${form?.passwordMissing && 'input-invalid'}`}
				placeholder="Password..."
			/>
		</label>
		<label for="name" class="mb-4"
			>Display name
			{#if form?.nameMissing}<p class="text-red-500">Please enter a display name</p>{/if}
			<input
				type="text"
				name="name"
				class={`${form?.passwordMissing && 'input-invalid'}`}
				value={form?.name ?? ''}
				placeholder="Rice enthousiast"
			/>
		</label>
		<div class="flex flex-row gap-4 justify-center">
			<a class="btn btn-filled-surface w-min" href="/">Back</a>
			<button class="btn btn-filled-primary w-min">Create</button>
		</div>
	</form>
</div>
