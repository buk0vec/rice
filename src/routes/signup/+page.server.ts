import type { Actions } from './$types'
import { supabaseClient as adminClient } from '$lib/server/db'
import { invalid, error as skerror, redirect } from '@sveltejs/kit'

export const actions: Actions = {
  createUser: async ({ request }) => {
    const fd = await request.formData();
    const email = fd.get('email') as string;
    const password = fd.get('password') as string;
    const name = fd.get('name') as string;
    // TODO: Validate user information
    if (!email) {
			return invalid(400, { email, name, emailMissing: true });
		}
    // TODO: Validate password requirements
    if (!password) {
			return invalid(400, { email, name, passwordMissing: true });
		}
    if (!name) {
			return invalid(400, { email, name, nameMissing: true });
		}
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name
      },
      email_confirm: true
    })
    // console.log(data)
    // console.log(error)
    if (error) {
      throw skerror(500, "Authentication API error. Try again later.")
    }
    else {
      throw redirect(303, "/login")
    }
  }
}