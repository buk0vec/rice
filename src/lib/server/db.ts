// ONLY USE FOR USER MANAGEMENT ON SERVER SIDE
import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env as publicEnv } from '$env/dynamic/public'
import { env } from '$env/dynamic/private'
// or use the static env
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabaseClient = createClient(publicEnv.PUBLIC_SUPABASE_URL, env.SECRET_SUPABASE_SERVICE_ROLE_KEY)