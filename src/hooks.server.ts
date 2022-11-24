import '$lib/db';
import '$lib/server/db';

import type { Handle } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // protect requests to all routes that start with /protected-routes
  if (event.url.pathname.startsWith('/app')) {
    const { session } = await getSupabase(event)
    if (!session) {
      throw redirect(303, '/login')
    }
  }
  if (event.url.pathname.startsWith('/login') && event.request.method === "GET") {
    const { session } = await getSupabase(event)
    if (session) {
      throw redirect(303, '/app')
    }
  }

  return resolve(event)
}