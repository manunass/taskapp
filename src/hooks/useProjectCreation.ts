import { useState, useCallback } from 'react';
import { createProject } from '@/clients/projects_client';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectFormData } from './useProjectForm';
import { Project } from '@/lib/supabase';

export const useProjectCreation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleCreateProject = useCallback(
    async (data: ProjectFormData): Promise<Project | null> => {
      if (!user) {
        setError('You must be logged in to create a project');
        return null;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const createdProject = await createProject(
          data.name,
          data.description || '',
          user.id
        );
        return createdProject; // Return the created project data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create project';
        setError(errorMessage);
        return null; // Return null on failure
      } finally {
        setIsSubmitting(false);
      }
    },
    [user]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSubmitting,
    error,
    handleCreateProject,
    clearError,
  };
};
