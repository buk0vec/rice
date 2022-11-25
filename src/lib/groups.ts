import { supabaseClient } from '$lib/db';

const generateId = (length: number) => {
	let result = '';
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

export const createGroup = async (name: string) => {
  const { data, error } = await supabaseClient.from('groups').insert({short: generateId(7), name}).select();
  if (error) {
    return undefined
  }
  else {
    return data[0]
  }
}
