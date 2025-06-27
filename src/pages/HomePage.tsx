import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Plus,
  Home,
  Settings,
  Menu,
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
import styles from '../fStyles/HomePage.styles';

interface Project {
  id: number;
  name: string;
  color: string;
}

const HomePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projects] = useState<Project[]>([]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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
              >
                <Plus size={16} />
              </Button>
            </div>
          )}

          <div className={styles.projectsList}>
            {projects.map((project) => (
              <Button
                key={project.id}
                variant="ghost"
                className={styles.projectItem}
                title={sidebarCollapsed ? project.name : undefined}
              >
                <div className={`${styles.projectColor} ${project.color}`} />
                {!sidebarCollapsed && (
                  <span className={styles.projectName}>{project.name}</span>
                )}
              </Button>
            ))}
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
                <CardTitle className={styles.statTitle}>Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>0</p>
                <p className={styles.statChange}>No tasks yet</p>
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
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>0</p>
                <p className={styles.statChange}>No overdue tasks</p>
              </CardContent>
            </Card>
          </div>

          <Card className={styles.recentTasks}>
            <CardHeader>
              <CardTitle className={styles.sectionTitle}>
                Recent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.taskList}>
                <p className="text-gray-500 text-center py-8">No tasks yet. Create your first task to get started!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
