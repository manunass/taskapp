import React from 'react';
import { MoreHorizontal, Calendar, User } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import styles from '../fStyles/Task.styles';

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  dueDate?: string;
  tags?: string[];
}

interface TaskProps {
  task: TaskData;
  onEdit?: (task: TaskData) => void;
  onDelete?: (taskId: string) => void;
  onMove?: (taskId: string, fromColumnId: string, toColumnId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete, onMove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.taskCard} ${isDragging ? styles.dragging : ''}`}
    >
      <Card className="h-full">
        <CardHeader className={styles.taskHeader}>
          <div className={styles.taskHeaderContent}>
            <div className={styles.priorityIndicator}>
              <div
                className={`${styles.priorityDot} ${getPriorityColor(task.priority)}`}
              />
              <Badge variant="outline" className={styles.priorityBadge}>
                {getPriorityText(task.priority)}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={styles.moreButton}>
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(task)}>
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete?.(task.id)}>
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className={styles.taskContent}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          {task.description && (
            <p className={styles.taskDescription}>{task.description}</p>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className={styles.taskTags}>
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className={styles.tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className={styles.taskFooter}>
            {task.assignee && (
              <div className={styles.assignee}>
                <Avatar className={styles.avatar}>
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <span className={styles.assigneeName}>
                  {task.assignee.name}
                </span>
              </div>
            )}

            {task.dueDate && (
              <div className={styles.dueDate}>
                <Calendar size={14} />
                <span>{task.dueDate}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Task;
