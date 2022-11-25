<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';

	let profile = { name: '' };

	const loadProfile = async () => {
		const { data, error } = await supabaseClient
			.from('profiles')
			.select('*')
			.eq('id', $page.data.session?.user.id);
		console.log(data);
		console.log(error);
		profile = (data ?? [{ name: '' }])[0];
	};

	$: if ($page.data.session) {
		loadProfile();
	}
</script>

<nav class="list-nav">
	<ul>
		<li>
			<span class="w-auto px-4 py-3 inline text-2xl">
				Hi, {#if !profile || profile.name == null}<div
						class="placeholder w-16 animate-pulse"
					/>{:else}
					<span class="font-semibold">{profile.name}</span>
				{/if}
			</span>
		</li>
		<li><a href="/app">Home</a></li>
	</ul>
</nav>
