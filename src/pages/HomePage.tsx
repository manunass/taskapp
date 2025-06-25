import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Plus,
  Home,
  Settings,
  User,
  LogOut,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import styles from '../fStyles/HomePage.styles';

const HomePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projects] = useState([
    { id: 1, name: 'Personal Tasks', color: 'bg-blue-500' },
    { id: 2, name: 'Work Projects', color: 'bg-green-500' },
    { id: 3, name: 'Shopping List', color: 'bg-purple-500' },
    { id: 4, name: 'Home Maintenance', color: 'bg-orange-500' },
  ]);

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
          <Button variant="ghost" className={styles.navItem}>
            <User size={20} />
            {!sidebarCollapsed && <span>Profile</span>}
          </Button>
          <Button variant="ghost" className={styles.navItem}>
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
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
              <Avatar>
                <AvatarImage src="/avatars/user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
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
                <p className={styles.statValue}>24</p>
                <p className={styles.statChange}>+3 from yesterday</p>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>18</p>
                <p className={styles.statChange}>75% completion rate</p>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>4</p>
                <p className={styles.statChange}>2 due today</p>
              </CardContent>
            </Card>
            <Card className={styles.statCard}>
              <CardHeader className="pb-2">
                <CardTitle className={styles.statTitle}>Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.statValue}>2</p>
                <p className={styles.statChange}>Needs attention</p>
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
                <div className={styles.taskItem}>
                  <div className={styles.taskCheckbox} />
                  <div className={styles.taskContent}>
                    <h4 className={styles.taskTitle}>
                      Complete project proposal
                    </h4>
                    <Badge variant="secondary" className={styles.taskProject}>
                      Work Projects
                    </Badge>
                  </div>
                  <span className={styles.taskDate}>Today</span>
                </div>
                <div className={styles.taskItem}>
                  <div className={styles.taskCheckbox} />
                  <div className={styles.taskContent}>
                    <h4 className={styles.taskTitle}>Buy groceries</h4>
                    <Badge variant="secondary" className={styles.taskProject}>
                      Shopping List
                    </Badge>
                  </div>
                  <span className={styles.taskDate}>Tomorrow</span>
                </div>
                <div className={styles.taskItem}>
                  <div className={styles.taskCheckbox} />
                  <div className={styles.taskContent}>
                    <h4 className={styles.taskTitle}>Fix kitchen sink</h4>
                    <Badge variant="secondary" className={styles.taskProject}>
                      Home Maintenance
                    </Badge>
                  </div>
                  <span className={styles.taskDate}>This week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
