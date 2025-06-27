import { supabase } from '@/lib/supabase';

// ----- USERS -----
export const createUser = async (
  email: string,
  first_name: string,
  last_name: string
) => {
  console.log(supabase.auth.getSession())
  const { data, error } = await supabase.rpc('create_user', {
    p_email: email,
    p_first_name: first_name,
    p_last_name: last_name
  });
  if (error) throw error;
  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.rpc('get_current_user');
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (first_name: string, last_name: string) => {
  const { data, error } = await supabase.rpc('update_user_profile', {
    p_first_name: first_name,
    p_last_name: last_name
  });
  if (error) throw error;
  return data;
};