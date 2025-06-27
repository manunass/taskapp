import { supabase } from '../lib/supabase';

// ----- PROJECT MEMBERS -----
export const addProjectMember = async (project_id: string, user_id: string) => {
  const { data, error } = await supabase.rpc('add_project_member', {
    p_project_id: project_id,
    p_user_id: user_id
  });
  if (error) throw error;
  return data;
};

export const removeProjectMember = async (project_id: string, user_id: string) => {
  const { data, error } = await supabase.rpc('remove_project_member', {
    p_project_id: project_id,
    p_user_id: user_id
  });
  if (error) throw error;
  return data;
};

export const listProjectMembers = async (projectId: string) => {
  const { data, error } = await supabase.rpc('list_project_members', { p_project_id: projectId });
  if (error) throw error;
  return data;
};