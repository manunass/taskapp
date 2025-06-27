import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { ProjectFormData } from '@/hooks/useProjectForm';
import styles from '../fStyles/ProjectForm.styles';

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Create Project',
  cancelLabel = 'Cancel',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  const handleFormSubmit = (data: ProjectFormData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.formContainer}
    >
      <div className={styles.formField}>
        <Label htmlFor="name" className={styles.label}>
          Project Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter project name"
          className={styles.input}
          {...register('name')}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formField}>
        <Label htmlFor="description" className={styles.label}>
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter project description (optional)"
          className={styles.textarea}
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      <div className={styles.formActions}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className={styles.cancelButton}
        >
          {cancelLabel}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting && (
            <Loader2 className={`${styles.loadingSpinner} mr-2`} />
          )}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
