import type { Actions } from './$types';
import { supabaseClient as adminClient } from '$lib/server/db';
import { fail, error as skerror, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	createUser: async ({ request }) => {
		const fd = await request.formData();
		const email = fd.get('email') as string;
		const password = fd.get('password') as string;
		const name = fd.get('name') as string;
		// TODO: Validate user information
		if (!email) {
			return fail(400, { email, name, emailMissing: true });
		}
		// TODO: Validate password requirements
		if (!password) {
			return fail(400, { email, name, passwordMissing: true });
		}
		if (!name) {
			return fail(400, { email, name, nameMissing: true });
		}
		// TODO: Flip email verification back on
		const { data, error } = await adminClient.auth.admin.createUser({
			email,
			password,
			email_confirm: true
		});
		// console.log(data)
		// console.log(error)
		if (error) {
			throw skerror(500, 'Authentication API error. Try again later.');
		} else {
			await adminClient.from('profiles').insert({ id: data.user.id, name });
			throw redirect(303, '/login');
		}
	}
};
