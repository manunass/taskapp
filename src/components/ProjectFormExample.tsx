import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectFormDialog from './ProjectFormDialog';
import { useProjectCreation } from '@/hooks/useProjectCreation';
import { ProjectFormData } from '@/hooks/useProjectForm';

/**
 * Example component demonstrating how to use the ProjectFormDialog
 * This can be used anywhere in your app where you need project creation
 */
const ProjectFormExample: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isSubmitting, error, handleCreateProject, clearError } =
    useProjectCreation();

  const handleOpenForm = () => {
    setIsFormOpen(true);
    clearError();
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    clearError();
  };

  const handleSubmit = async (data: ProjectFormData) => {
    const success = await handleCreateProject(data);
    if (success) {
      handleCloseForm();
      // You can add additional logic here, such as:
      // - Showing a success toast
      // - Refreshing a project list
      // - Navigating to the new project
      console.log('Project created successfully:', data);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Project Creation Example</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to open the project creation form.
        </p>

        <Button onClick={handleOpenForm} className="flex items-center gap-2">
          <Plus size={16} />
          Create New Project
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <ProjectFormDialog
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          title="Create New Project"
          description="Add a new project to organize your tasks and collaborate with your team."
          submitLabel="Create Project"
          cancelLabel="Cancel"
        />
      </div>
    </div>
  );
};

export default ProjectFormExample;
