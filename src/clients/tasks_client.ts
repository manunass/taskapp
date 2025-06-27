import { supabase } from '../lib/supabase';

// ----- TASKS -----
export const createTask = async (
  name: string,
  description: string,
  status: string,
  project: string,
  assignee: string
) => {
  const { data, error } = await supabase.rpc('create_task', {
    p_name: name,
    p_description: description,
    p_status: status,
    p_project: project,
    p_assignee: assignee
  });
  if (error) throw error;
  return data;
};

export const updateTask = async (
  id: string,
  name: string,
  description: string,
  status: string,
  assignee: string
) => {
  const { data, error } = await supabase.rpc('update_task', {
    p_id: id,
    p_name: name,
    p_description: description,
    p_status: status,
    p_assignee: assignee
  });
  if (error) throw error;
  return data;
};

export const deleteTask = async (id: string) => {
  const { data, error } = await supabase.rpc('delete_task', { p_id: id });
  if (error) throw error;
  return data;
};

export const assignTask = async (task_id: string, user_id: string) => {
  const { data, error } = await supabase.rpc('assign_task', {
    p_task_id: task_id,
    p_user_id: user_id
  });
  if (error) throw error;
  return data;
};

export const listTasks = async (projectId: string) => {
  const { data, error } = await supabase.rpc('list_tasks', { p_project_id: projectId });
  if (error) throw error;
  return data;
};

export const searchTasks = async (
  query: string,
  assignee: string,
  start: string,
  end: string
) => {
  const { data, error } = await supabase.rpc('search_tasks', {
    p_query: query,
    p_assignee: assignee,
    p_start: start,
    p_end: end
  });
  if (error) throw error;
  return data;
};