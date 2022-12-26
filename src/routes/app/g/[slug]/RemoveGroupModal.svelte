<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// TODO: enhance form to check for errors when leaving and display them

	// Base Classes
	const cBase: string = 'space-y-4';
	const cForm: string = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

<div class={cBase}>
	<h2>Are you sure you want to leave this group?</h2>
	<!-- prettier-ignore -->
	<div class="flex-row flex gap-4">
	<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
	<form method="POST" action="?/leave">
		<button class="btn btn-filled-warning">Leave</button>
	</form>
</div>
</div>
