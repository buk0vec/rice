import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);
  const { data, error } = await supabaseClient.from("members").select(`
  user_id,
  id,
  group_id (
    name
  )
  `)
  event.depends("rice:members")
  const members = error ? null : data;
	return { members };
};
