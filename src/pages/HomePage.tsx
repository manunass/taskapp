import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Plus,
  Home,
  Settings,
  Menu,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserProfile from '@/components/UserProfile';
import ProjectFormDialog from '@/components/ProjectFormDialog';
import { useProjectCreation } from '@/hooks/useProjectCreation';
import { useUserProjects } from '@/hooks/useUserProjects';
import { ProjectFormData } from '@/hooks/useProjectForm';
import { Project } from '@/lib/supabase';
import styles from '../fStyles/HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    addProject,
  } = useUserProjects();
  const { isSubmitting, error, handleCreateProject, clearError } =
    useProjectCreation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleOpenProjectForm = () => {
    setIsProjectFormOpen(true);
    clearError();
  };

  const handleCloseProjectForm = () => {
    setIsProjectFormOpen(false);
    clearError();
  };

  const handleProjectSubmit = async (data: ProjectFormData) => {
    const createdProject = await handleCreateProject(data);
    if (createdProject) {
      handleCloseProjectForm();
      // Add the new project to the state
      addProject(createdProject);
    }
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  // Generate a color for each project based on its ID
  const getProjectColor = (projectId: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
    ];
    const index = projectId.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Calculate dashboard stats
  const totalProjects = projects.length;
  const totalTasks = projects.reduce((acc, project) => {
    // This would need to be updated when we have task counts per project
    return acc + 0; // Placeholder for now
  }, 0);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          {!sidebarCollapsed && (
            <h2 className={styles.sidebarTitle}>TaskApp</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={styles.collapseButton}
            aria-label={
              sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
            }
          >
            {sidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </div>

        <nav className={styles.navigation}>
          <Button variant="ghost" className={styles.navItem}>
            <Home size={20} />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </Button>
        </nav>

        <div className={styles.projectsSection}>
          {!sidebarCollapsed && (
            <div className={styles.projectsHeader}>
              <h3 className={styles.projectsTitle}>Projects</h3>
              <Button
                variant="ghost"
                size="sm"
                className={styles.addProjectButton}
                onClick={handleOpenProjectForm}
                title="Create new project"
              >
                <Plus size={16} />
              </Button>
            </div>
          )}

          <div className={styles.projectsList}>
            {projectsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 size={16} className="animate-spin text-gray-500" />
              </div>
            ) : projectsError ? (
              <div className="text-red-500 text-sm px-3 py-2">
                Error loading projects
              </div>
            ) : projects.length === 0 ? (
              <div className="text-gray-500 text-sm px-3 py-2">
                {!sidebarCollapsed ? 'No projects yet' : ''}
              </div>
            ) : (
              projects.map((project) => (
                <Button
                  key={project.id}
                  variant="ghost"
                  className={styles.projectItem}
                  title={sidebarCollapsed ? project.name : undefined}
                  onClick={() => handleProjectClick(project)}
                >
                  <div
                    className={`${styles.projectColor} ${getProjectColor(project.id)}`}
                  />
                  {!sidebarCollapsed && (
                    <span className={styles.projectName}>{project.name}</span>
                  )}
                </Button>
              ))
            )}
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <Button variant="ghost" className={styles.navItem}>
            <Settings size={20} />
            {!sidebarCollapsed && <span>Settings</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              <p className={styles.pageSubtitle}>
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <UserProfile />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  {/* Mobile navigation content */}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.statsGrid}>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>{totalProjects}</p>
                <p className={styles.statChange}>
                  {totalProjects === 0
                    ? 'No projects yet'
                    : `${totalProjects} active project${totalProjects !== 1 ? 's' : ''}`}
                </p>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>{totalTasks}</p>
                <p className={styles.statChange}>
                  {totalTasks === 0
                    ? 'No tasks yet'
                    : `${totalTasks} total task${totalTasks !== 1 ? 's' : ''}`}
                </p>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>0</p>
                <p className={styles.statChange}>No completed tasks</p>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>0</p>
                <p className={styles.statChange}>No tasks in progress</p>
              </CardContent>
            </Card>
          </div>

          <Card className={styles.recentTasks}>
            <CardHeader>
              <CardTitle className={styles.sectionTitle}>
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={24} className="animate-spin text-gray-500" />
                </div>
              ) : projects.length === 0 ? (
                <div className={styles.taskList}>
                  <p className="text-gray-500 text-center py-8">
                    No projects yet. Create your first project to get started!
                  </p>
                  <div className="text-center">
                    <Button
                      onClick={handleOpenProjectForm}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Plus size={16} className="mr-2" />
                      Create Project
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.taskList}>
                  {projects.slice(0, 5).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${getProjectColor(project.id)}`}
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {project.name}
                          </h4>
                          {project.description && (
                            <p className="text-sm text-gray-600">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">0 tasks</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Creation Dialog */}
      <ProjectFormDialog
        isOpen={isProjectFormOpen}
        onClose={handleCloseProjectForm}
        onSubmit={handleProjectSubmit}
        isSubmitting={isSubmitting}
        title="Create New Project"
        description="Add a new project to organize your tasks and collaborate with your team."
        submitLabel="Create Project"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default HomePage;
