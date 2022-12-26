import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { readable } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);
	const [initial, initialError] = await (async () => {
		const { data, error } = await supabaseClient
			.from('groups')
			.select('*')
			.eq('id', event.params.slug);
		return [data, error];
	})();
	// TODO: handle this error. probably with a server-side check to make sure this exists.
	if (initialError || !initial) {
		return {};
	}
	const store = readable<any>(initial[0], (set) => {
		const channel = supabaseClient
			.channel(`public:groups:id=eq.${event.params.slug}`)
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'groups',
					filter: `id=eq.${event.params.slug}`
				},
				(payload) => {
					set(payload.new);
				}
			)
			.subscribe();
		return async () => {await supabaseClient.removeChannel(channel)};
	});

  const [ievents, ieventserror] = await (async () => {
		const { data, error } = await supabaseClient
			.from('events')
			.select('*')
			.eq('group_id', event.params.slug);
		return [data, error];
	})();

  if (ieventserror || !ievents) {
		return {};
	}

	const eventStore = readable<any>(ievents, (set) => {
		const channel = supabaseClient
			.channel(`public:events:group_id=eq.${event.params.slug}`)
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'events',
					filter: `group_id=eq.${event.params.slug}`
				},
				(payload) => {
					set(payload.new);
				}
			)
			.subscribe();
		return async () => {await supabaseClient.removeChannel(channel)};
	});

	// Make sure that awaiting parent is the last async request possible
	const { members } = await event.parent();
	if (!members) {
		// Worst case fallback, shouldn't happen
		const { data, error } = await supabaseClient
			.from('groups')
			.select('name')
			.eq('id', event.params.slug);
		if (error) {
			return { name: undefined, id: undefined };
		}
		// TODO: Remove this fallback by just performing a refetch
		return { name: data[0].name, id: undefined };
	}
	const membership = members.find(
		(m) =>
			(Array.isArray(m.group_id) ? m.group_id[0].id.toString() : m.group_id?.id.toString()) ===
			event.params.slug
	);
	const group = membership?.group_id;
	if (!membership || !group) {
		return { name: undefined, id: undefined };
	}
	const { name } = Array.isArray(group) ? group[0] : group;

	return { name, id: membership.id, store, eventStore, slug: event.params.slug };
};
