import React from 'react';
import { FormProvider } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useProjectForm, ProjectFormData } from '@/hooks/useProjectForm';
import ProjectForm from './ProjectForm';
import styles from '../fStyles/ProjectForm.styles';

interface ProjectFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting?: boolean;
  title?: string;
  description?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  title = 'Create New Project',
  description = 'Add a new project to organize your tasks and collaborate with your team.',
  submitLabel = 'Create Project',
  cancelLabel = 'Cancel',
}) => {
  const { form, formState } = useProjectForm();

  const handleSubmit = (data: ProjectFormData) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader className={styles.dialogHeader}>
          <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
          <DialogDescription className={styles.dialogDescription}>
            {description}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
