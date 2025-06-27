import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Users, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProject } from '@/clients/projects_client';
import { listTasks } from '@/clients/tasks_client';
import { Project, Task } from '@/lib/supabase';
import styles from '../fStyles/ProjectPage.styles';

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) {
        setError('Project ID is required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch project details
        const projectData = await getProject(projectId);
        setProject(projectData);

        // Fetch project tasks
        const projectTasks = await listTasks(projectId);
        setTasks(projectTasks || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load project';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleOpenBoard = () => {
    navigate(`/board?project=${projectId}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorTitle}>Error Loading Project</h2>
          <p className={styles.errorMessage}>{error || 'Project not found'}</p>
          <Button onClick={handleBackToHome} className={styles.backButton}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length;
  const totalTasks = tasks.length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className={styles.backButton}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>

          <div className={styles.headerInfo}>
            <h1 className={styles.projectTitle}>{project.name}</h1>
            {project.description && (
              <p className={styles.projectDescription}>{project.description}</p>
            )}
          </div>

          <div className={styles.headerActions}>
            <Button variant="outline" className={styles.actionButton}>
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
            <Button onClick={handleOpenBoard} className={styles.boardButton}>
              Open Board
            </Button>
          </div>
        </div>
      </header>

      {/* Project Stats */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardHeader className="pb-2">
              <CardTitle className={styles.statTitle}>Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.statValue}>{totalTasks}</p>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardHeader className="pb-2">
              <CardTitle className={styles.statTitle}>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.statValue}>{completedTasks}</p>
              <p className={styles.statChange}>
                {progressPercentage.toFixed(0)}% complete
              </p>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardHeader className="pb-2">
              <CardTitle className={styles.statTitle}>In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.statValue}>
                {tasks.filter((task) => task.status === 'in_progress').length}
              </p>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardHeader className="pb-2">
              <CardTitle className={styles.statTitle}>Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.statValue}>
                {new Date(project.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className={styles.tasksSection}>
        <Card className={styles.tasksCard}>
          <CardHeader>
            <div className={styles.tasksHeader}>
              <CardTitle className={styles.sectionTitle}>
                Recent Tasks
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <div className={styles.taskList}>
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className={styles.taskItem}>
                    <div className={styles.taskInfo}>
                      <h4 className={styles.taskTitle}>{task.title}</h4>
                      {task.description && (
                        <p className={styles.taskDescription}>
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className={styles.taskMeta}>
                      <Badge
                        variant={
                          task.status === 'completed' ? 'default' : 'secondary'
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <FileText size={48} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No tasks yet</h3>
                <p className={styles.emptyDescription}>
                  Create your first task to get started with this project.
                </p>
                <Button
                  onClick={handleOpenBoard}
                  className={styles.createTaskButton}
                >
                  Create Task
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectPage;
