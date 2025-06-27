import { useState, useEffect, useCallback } from 'react';
import { listUserProjects } from '@/clients/projects_client';
import { useAuth } from '@/contexts/AuthContext';
import { Project } from '@/lib/supabase';

export const useUserProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch user projects
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userProjects = await listUserProjects(user.id);
      setProjects(userProjects || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add a new project to the state
  const addProject = useCallback((newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  }, []);

  // Update a project in the state
  const updateProject = useCallback((updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }, []);

  // Remove a project from the state
  const removeProject = useCallback((projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  }, []);

  // Refresh projects
  const refreshProjects = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Initial fetch on mount and when user changes
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    removeProject,
    refreshProjects,
  };
};
