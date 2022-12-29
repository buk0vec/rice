import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import moment from 'moment';

export const actions: Actions = {
	start: async (event) => {
		const fd = await event.request.formData();
		const kid = fd.get('kitchen');
		const minutes = fd.get('minutes');
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(302, '/');
		}
		// TODO: Properly validate kid and minutes. This is lame for now.
		if (!kid || !minutes) {
			return fail(400, { gid: kid, nulls: true });
		}
		const { data, error } = await supabaseClient
			.from('events')
			.insert({
				created_at: new Date().toISOString(),
				expires_at: moment(new Date()).add(parseInt(minutes.toString()), 'm').toISOString(),
				owner: session.user.id,
        group_id: kid.toString()
			});
		throw redirect(303, '/app/g/' + kid?.toString());
	}
};
