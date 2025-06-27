import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Project } from '@/lib/supabase';

const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name must be less than 100 characters'),
  description: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export interface ProjectFormState {
  isOpen: boolean;
  isEditing: boolean;
  projectId?: string;
}

export const useProjectForm = () => {
  const [formState, setFormState] = useState<ProjectFormState>({
    isOpen: false,
    isEditing: false,
  });

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Open form for creating a new project
  const openCreateForm = useCallback(() => {
    setFormState({
      isOpen: true,
      isEditing: false,
    });
    form.reset({
      name: '',
      description: '',
    });
  }, [form]);

  // Open form for editing an existing project
  const openEditForm = useCallback(
    (project: Project) => {
      setFormState({
        isOpen: true,
        isEditing: true,
        projectId: project.id,
      });
      form.reset({
        name: project.name,
        description: project.description || '',
      });
    },
    [form]
  );

  // Close the form
  const closeForm = useCallback(() => {
    setFormState({
      isOpen: false,
      isEditing: false,
    });
    form.reset();
  }, [form]);

  // Get form data as Project data (without id and timestamps)
  const getFormData = useCallback((): Omit<
    Project,
    'id' | 'created_at' | 'admin_id'
  > => {
    const values = form.getValues();
    return {
      name: values.name,
      description: values.description || null,
    };
  }, [form]);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return form.formState.isValid;
  }, [form.formState.isValid]);

  // Get form errors
  const getFormErrors = useCallback(() => {
    return form.formState.errors;
  }, [form.formState.errors]);

  return {
    // Form state
    formState,
    form,

    // Form actions
    openCreateForm,
    openEditForm,
    closeForm,
    getFormData,
    isFormValid,
    getFormErrors,

    // Form validation
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
