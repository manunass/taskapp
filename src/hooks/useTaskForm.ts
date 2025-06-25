import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TaskData } from '@/components/Task';

const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  assignee: z
    .object({
      name: z.string().min(1, 'Assignee name is required'),
      initials: z
        .string()
        .min(1, 'Initials are required')
        .max(3, 'Initials must be 3 characters or less'),
      avatar: z.string().optional(),
    })
    .optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export interface TaskFormState {
  isOpen: boolean;
  isEditing: boolean;
  taskId?: string;
  columnId?: string;
}

export const useTaskForm = () => {
  const [formState, setFormState] = useState<TaskFormState>({
    isOpen: false,
    isEditing: false,
  });

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      assignee: undefined,
      dueDate: '',
      tags: [],
    },
  });

  // Open form for creating a new task
  const openCreateForm = useCallback(
    (columnId: string) => {
      setFormState({
        isOpen: true,
        isEditing: false,
        columnId,
      });
      form.reset({
        title: '',
        description: '',
        priority: 'medium',
        assignee: undefined,
        dueDate: '',
        tags: [],
      });
    },
    [form]
  );

  // Open form for editing an existing task
  const openEditForm = useCallback(
    (task: TaskData, columnId: string) => {
      setFormState({
        isOpen: true,
        isEditing: true,
        taskId: task.id,
        columnId,
      });
      form.reset({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        assignee: task.assignee,
        dueDate: task.dueDate || '',
        tags: task.tags || [],
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

  // Get form data as TaskData (without id)
  const getFormData = useCallback((): Omit<TaskData, 'id'> => {
    const values = form.getValues();
    return {
      title: values.title,
      description: values.description,
      priority: values.priority,
      assignee: values.assignee,
      dueDate: values.dueDate,
      tags: values.tags,
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
