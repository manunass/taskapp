import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth types for better TypeScript support
export type AuthUser = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};
export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  last_updated: string;
  project_id: string;
  assignee: string | null;
  created_by: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  admin_id: string;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: AuthUser;
}; 