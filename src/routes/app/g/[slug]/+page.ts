import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { readable } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);
  // Get the events for the group
  const [events, eventsError] = await (async () => {
		const { data, error } = await supabaseClient
			.from('events')
			.select('*')
			.eq('group_id', event.params.slug);
		return [data, error];
	})();

  if (eventsError || events === null) {
		return {};
	}

  // TODO: type the store
  // Create a subscription for changes to events
  const eventStore = readable<any>(null, (set) => {
    const channel = supabaseClient
    .channel(`public:events:group_id=eq.${event.params.slug}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'events',
        filter: `group_id=eq.${event.params.slug}`
      },
      (payload) => {
        console.log('new event get!');
        console.log(payload);
        set(payload)
      }
    )
    .subscribe();
    return async () => {
      return async () => {await supabaseClient.removeChannel(channel)};
    }
  })

	// Make sure that awaiting parent is the last async request possible
	const { members } = await event.parent();
	if (!members) {
		// Worst case fallback, shouldn't happen
		const { data, error } = await supabaseClient
			.from('groups')
			.select('*')
			.eq('id', event.params.slug);
		if (error) {
			return { name: undefined, id: undefined };
		}
		// TODO: Remove this fallback by just performing a refetch
		return { name: data[0].name, id: undefined };
	}

  // Pull group information from parent request
	const membership = members.find(
		(m) =>
			(Array.isArray(m.group_id) ? m.group_id[0].id.toString() : m.group_id?.id.toString()) ===
			event.params.slug
	);

	const group = membership?.group_id;
	if (!membership || !group) {
		return { name: undefined, id: undefined };
	}
	const { name, id } = Array.isArray(group) ? group[0] : group;

	return { name, group_id: id, events, slug: event.params.slug, eventStore };
};
