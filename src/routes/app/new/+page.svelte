<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	const from = $page.url.searchParams.get('gid');

	export let data: PageData;
</script>

<div class="flex flex-col p-4 gap-4">
	<h1 class="font-semibold text-7xl">Make Rice</h1>
	<form method="POST" action="?/start">
		<label
			><span class="text-lg">Kitchen</span>
			<select name="kitchen">
				{#if data.members}
					{#each data.members as member}
						<option
							value={(Array.isArray(member.group_id)
								? member.group_id[0].id
								: member.group_id?.id ?? ''
							).toString()}
							selected={(Array.isArray(member.group_id)
								? member.group_id[0].id
								: member.group_id?.id ?? ''
							).toString() === from
								? true
								: undefined}
							>{Array.isArray(member.group_id)
								? member.group_id[0].name
								: member.group_id?.name ?? ''}</option
						>
					{/each}
				{/if}
			</select>
		</label>
		<div class="flex flex-row gap-4 items-center pt-2">
			<label>
				<span class="text-lg">Minutes from now</span>
				<input type="number" name="minutes" value="10" min="1" />
			</label>
		</div>
		<button type="submit" class="btn btn-filled-primary w-24 mt-4">Start Timer</button>
	</form>
	<a class="btn btn-filled-warning w-24" href={from ? '/app/g/' + from : '/app'}>Back</a>
</div>
