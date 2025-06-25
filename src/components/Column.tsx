import React from 'react';
import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Task, { TaskData } from './Task';
import styles from '../fStyles/Column.styles';

export interface ColumnData {
  id: string;
  title: string;
  color: string;
  tasks: TaskData[];
}

interface ColumnProps {
  column: ColumnData;
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: TaskData) => void;
  onDeleteTask?: (taskId: string) => void;
  onMoveTask?: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className={styles.column}>
      <Card
        className={`${styles.columnCard} ${isOver ? styles.droppable : ''}`}
      >
        <CardHeader className={styles.columnHeader}>
          <div className={styles.columnHeaderContent}>
            <div className={styles.columnTitleSection}>
              <div className={`${styles.columnColor} ${column.color}`} />
              <CardTitle className={styles.columnTitle}>
                {column.title}
              </CardTitle>
            </div>
            <Badge variant="secondary" className={styles.taskCount}>
              {column.tasks.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddTask?.(column.id)}
            className={styles.addTaskButton}
          >
            <Plus size={16} />
          </Button>
        </CardHeader>

        <CardContent className={styles.columnContent}>
          <div ref={setNodeRef} className={styles.taskList}>
            <SortableContext
              items={column.tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {column.tasks.map((task) => (
                <div key={task.id} className={styles.taskWrapper}>
                  <Task
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onMove={onMoveTask}
                  />
                </div>
              ))}
            </SortableContext>

            {column.tasks.length === 0 && (
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>No tasks yet</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddTask?.(column.id)}
                  className={styles.emptyAddButton}
                >
                  <Plus size={14} />
                  Add Task
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Column;
