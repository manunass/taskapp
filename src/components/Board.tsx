import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import Column, { ColumnData } from './Column';
import Task, { TaskData } from './Task';
import { useBoard } from '@/hooks/useBoard';
import { useTaskForm } from '@/hooks/useTaskForm';
import { useBoardFilters } from '@/hooks/useBoardFilters';
import styles from '../fStyles/Board.styles';

const Board: React.FC = () => {
  const {
    columns,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTask,
    getAllTasks,
    searchTasks,
    filterTasksByPriority,
    filterTasksByAssignee,
    addColumn,
    updateColumn,
    deleteColumn,
    isLoading,
    error,
  } = useBoard();

  const {
    formState,
    form,
    openCreateForm,
    openEditForm,
    closeForm,
    getFormData,
    isFormValid,
    getFormErrors,
    isValid,
    errors,
    isSubmitting,
  } = useTaskForm();

  const {
    filters,
    viewOptions,
    updateFilter,
    updateFilters,
    resetFilters,
    updateViewOption,
    updateViewOptions,
    resetViewOptions,
    filterTasks,
    sortTasks,
    getAvailableAssignees,
    getAvailableTags,
    getFilterSummary,
    hasActiveFilters,
  } = useBoardFilters();

  const [activeTask, setActiveTask] = useState<TaskData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = getTask(taskId);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    // Find the current column of the task
    const currentColumn = columns.find((column) =>
      column.tasks.some((task) => task.id === taskId)
    );

    if (currentColumn && currentColumn.id !== newColumnId) {
      moveTask(taskId, currentColumn.id, newColumnId);
    }

    setActiveTask(null);
  };

  const handleAddTask = (columnId: string) => {
    openCreateForm(columnId);
  };

  const handleEditTask = (task: TaskData) => {
    const currentColumn = columns.find((column) =>
      column.tasks.some((t) => t.id === task.id)
    );
    if (currentColumn) {
      openEditForm(task, currentColumn.id);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleSubmitTask = async () => {
    if (!isFormValid()) return;

    try {
      const taskData = getFormData();

      if (formState.isEditing && formState.taskId) {
        // Update existing task
        updateTask(formState.taskId, taskData);
      } else if (formState.columnId) {
        // Create new task
        addTask(formState.columnId, taskData);
      }

      closeForm();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleAddColumn = () => {
    const newColumn = addColumn({
      title: 'New Column',
      color: 'bg-gray-500',
    });
    console.log('Added new column:', newColumn);
  };

  // Get filtered and sorted tasks for each column
  const getFilteredColumns = () => {
    return columns.map((column) => {
      const filteredTasks = filterTasks(column.tasks);
      const sortedTasks = sortTasks(filteredTasks);

      return {
        ...column,
        tasks: sortedTasks,
      };
    });
  };

  const filteredColumns = getFilteredColumns();
  const allTasks = getAllTasks();
  const availableAssignees = getAvailableAssignees(allTasks);
  const availableTags = getAvailableTags(allTasks);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.boardContainer}>
        <div className={styles.boardHeader}>
          <div className={styles.boardTitleSection}>
            <h1 className={styles.boardTitle}>Project Board</h1>
            <p className={styles.boardSubtitle}>
              Manage your tasks across different stages
            </p>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {getFilterSummary.map((filter, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {filter}
                  </span>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
            <Button
              className={styles.addColumnButton}
              onClick={handleAddColumn}
            >
              <Plus size={16} className="mr-2" />
              Add Column
            </Button>
          </div>
        </div>

        <div className={styles.boardContent}>
          <div className={styles.columnsContainer}>
            {filteredColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={moveTask}
              />
            ))}
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="w-80">
            <Task
              task={activeTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onMove={moveTask}
            />
          </div>
        ) : null}
      </DragOverlay>

      {/* TODO: Add TaskForm modal component here */}
      {/* The modal would use the formState, form, and handleSubmitTask */}
    </DndContext>
  );
};

export default Board;
