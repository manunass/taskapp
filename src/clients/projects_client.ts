import { supabase } from '../lib/supabase';

// ----- PROJECTS -----
export const createProject = async (
  name: string,
  description: string,
  admin_id: string
) => {
  const { data, error } = await supabase.rpc('create_project', {
    p_name: name,
    p_description: description,
    p_admin_id: admin_id
  });
  if (error) throw error;
  return data;
};

export const getProject = async (id: string) => {
  const { data, error } = await supabase.rpc('get_project', { p_id: id });
  if (error) throw error;
  return data;
};

export const listUserProjects = async (userId: string) => {
  const { data, error } = await supabase.rpc('list_user_projects', { p_user_id: userId });
  if (error) throw error;
  return data;
};

export const deleteProject = async (id: string) => {
  const { data, error } = await supabase.rpc('delete_project', { p_id: id });
  if (error) throw error;
  return data;
};