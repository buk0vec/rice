import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
  signout: async (event) => {
    const { supabaseClient } = await getSupabase(event)
    await supabaseClient.auth.signOut()
    throw redirect(303, '/')
  },
};
