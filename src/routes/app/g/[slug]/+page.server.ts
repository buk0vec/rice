import type { Actions } from './$types';
import { invalid, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
  leave: async (event) => {
    const { session, supabaseClient } = await getSupabase(event)
    if (!session) {
      return invalid(403, {noSession: true})
    }
    const { error } = await supabaseClient.from("members").delete().eq('user_id', session.user.id).eq('group_id', event.params.slug)
    if (error) {
      // TODO: Handle error possibilities
      return invalid(503, {isa: true})
    }
    // supabaseClient.removeChannel(`public:groups:id=eq.${event.params.slug}`)
    throw redirect(303, '/app')
  },
};
