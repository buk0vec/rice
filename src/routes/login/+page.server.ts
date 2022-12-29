import type { Actions } from './$types';
import { fail, error as skerror, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	signin: async (event) => {
		const fd = await event.request.formData();
    // console.log("login request")
		const email = fd.get('email') as string;
		const password = fd.get('password') as string;
    const { session, supabaseClient } = await getSupabase(event)
		// TODO: Validate user information
		if (!email) {
			return fail(400, { email, emailMissing: true });
		}
		// TODO: Validate password requirements
		if (!password) {
			return fail(400, { email, passwordMissing: true });
		}

		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email,
			password
		});
		console.log(data)
		console.log(error)
		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					email, invalidCredentials: true
				});
			}
      else {
        throw skerror(500, 'Authentication API error. Try again later.');
      }
		} else {
			throw redirect(303, '/app');
		}
	}
};
