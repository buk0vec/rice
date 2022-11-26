import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event);
  // Make sure that awaiting parent is the last async request possible
  const { members } = await event.parent()
  if (!members) {
    // Worst case fallback, shouldn't happen
    const { data, error } = await supabaseClient.from('groups').select('name').eq('id', event.params.slug)
    if (error) {
      return { name: undefined, id: undefined}
    }
    // TODO: Remove this fallback by just performing a refetch
    return { name: data[0].name, id: undefined }
  }
  
  const membership = members.find(m => 
    (Array.isArray(m.group_id) ? m.group_id[0].id.toString() : m.group_id?.id.toString()) === event.params.slug
  )

  const group = membership?.group_id

  if (!membership || !group) {
    return {name: undefined, id: undefined }
  }

  const { name } = Array.isArray(group) ? group[0] : group;

  return { name, id: membership.id }
}