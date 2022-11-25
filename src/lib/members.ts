import { supabaseClient } from "./db";

export const addToGroup = async (id: string, gid: string) => {
  // TODO: Check if already member of group
  const { data, error } = await supabaseClient.from("members").insert({user_id: id, group_id: gid})
  if (error) {
    return false;
  }
  else {
    return true
  }
}