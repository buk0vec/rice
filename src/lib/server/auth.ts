import { supabaseClient } from "$lib/db"
export const signIn = async (email: string, password: string) => {
  return await supabaseClient.auth.signInWithPassword({
    email,
    password
  })
}