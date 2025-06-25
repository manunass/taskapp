import { useState, useCallback } from 'react';
import { ColumnData } from '@/components/Column';
import { TaskData } from '@/components/Task';

export interface BoardData {
  id: string;
  name: string;
  description?: string;
  columns: ColumnData[];
  createdAt: Date;
  updatedAt: Date;
}

const initialColumns: ColumnData[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-500',
    tasks: [
      {
        id: '1',
        title: 'Design new landing page',
        description:
          'Create wireframes and mockups for the new landing page design',
        priority: 'high' as const,
        assignee: {
          name: 'John Doe',
          initials: 'JD',
        },
        dueDate: '2024-01-15',
        tags: ['Design', 'Frontend'],
      },
      {
        id: '2',
        title: 'Set up database schema',
        description:
          'Design and implement the database structure for the new features',
        priority: 'medium' as const,
        assignee: {
          name: 'Jane Smith',
          initials: 'JS',
        },
        dueDate: '2024-01-20',
        tags: ['Backend', 'Database'],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-500',
    tasks: [
      {
        id: '3',
        title: 'Implement user authentication',
        description: 'Add login and registration functionality with JWT tokens',
        priority: 'high' as const,
        assignee: {
          name: 'Mike Johnson',
          initials: 'MJ',
        },
        dueDate: '2024-01-18',
        tags: ['Auth', 'Security'],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-500',
    tasks: [
      {
        id: '4',
        title: 'Code review for API endpoints',
        description:
          'Review the REST API implementation and suggest improvements',
        priority: 'medium' as const,
        assignee: {
          name: 'Sarah Wilson',
          initials: 'SW',
        },
        dueDate: '2024-01-22',
        tags: ['Code Review', 'API'],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-500',
    tasks: [
      {
        id: '5',
        title: 'Setup project structure',
        description:
          'Initialize the project with proper folder structure and dependencies',
        priority: 'low' as const,
        assignee: {
          name: 'Alex Brown',
          initials: 'AB',
        },
        dueDate: '2024-01-10',
        tags: ['Setup', 'DevOps'],
      },
    ],
  },
];

export const useBoard = () => {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add a new task to a column
  const addTask = useCallback(
    (columnId: string, task: Omit<TaskData, 'id'>) => {
      const newTask: TaskData = {
        ...task,
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === columnId
            ? { ...column, tasks: [...column.tasks, newTask] }
            : column
        )
      );

      return newTask;
    },
    []
  );

  // Update an existing task
  const updateTask = useCallback(
    (taskId: string, updates: Partial<TaskData>) => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        }))
      );
    },
    []
  );

  // Delete a task
  const deleteTask = useCallback((taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    );
  }, []);

  // Move a task between columns
  const moveTask = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string) => {
      setColumns((prevColumns) => {
        const fromColumn = prevColumns.find((col) => col.id === fromColumnId);
        const toColumn = prevColumns.find((col) => col.id === toColumnId);

        if (!fromColumn || !toColumn) return prevColumns;

        const taskToMove = fromColumn.tasks.find((task) => task.id === taskId);
        if (!taskToMove) return prevColumns;

        return prevColumns.map((column) => {
          if (column.id === fromColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            };
          }
          if (column.id === toColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, taskToMove],
            };
          }
          return column;
        });
      });
    },
    []
  );

  // Add a new column
  const addColumn = useCallback((column: Omit<ColumnData, 'id' | 'tasks'>) => {
    const newColumn: ColumnData = {
      ...column,
      id: `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tasks: [],
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
    return newColumn;
  }, []);

  // Update a column
  const updateColumn = useCallback(
    (columnId: string, updates: Partial<ColumnData>) => {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === columnId ? { ...column, ...updates } : column
        )
      );
    },
    []
  );

  // Delete a column
  const deleteColumn = useCallback((columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== columnId)
    );
  }, []);

  // Get a task by ID
  const getTask = useCallback(
    (taskId: string): TaskData | undefined => {
      return columns
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId);
    },
    [columns]
  );

  // Get a column by ID
  const getColumn = useCallback(
    (columnId: string): ColumnData | undefined => {
      return columns.find((column) => column.id === columnId);
    },
    [columns]
  );

  // Get all tasks
  const getAllTasks = useCallback(() => {
    return columns.flatMap((column) => column.tasks);
  }, [columns]);

  // Search tasks
  const searchTasks = useCallback(
    (query: string): TaskData[] => {
      const allTasks = getAllTasks();
      const lowercaseQuery = query.toLowerCase();

      return allTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(lowercaseQuery) ||
          task.description?.toLowerCase().includes(lowercaseQuery) ||
          task.tags?.some((tag) =>
            tag.toLowerCase().includes(lowercaseQuery)
          ) ||
          task.assignee?.name.toLowerCase().includes(lowercaseQuery)
      );
    },
    [getAllTasks]
  );

  // Filter tasks by priority
  const filterTasksByPriority = useCallback(
    (priority: TaskData['priority']): TaskData[] => {
      return getAllTasks().filter((task) => task.priority === priority);
    },
    [getAllTasks]
  );

  // Filter tasks by assignee
  const filterTasksByAssignee = useCallback(
    (assigneeName: string): TaskData[] => {
      return getAllTasks().filter(
        (task) =>
          task.assignee?.name.toLowerCase() === assigneeName.toLowerCase()
      );
    },
    [getAllTasks]
  );

  return {
    // State
    columns,
    isLoading,
    error,

    // Task operations
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTask,
    getAllTasks,
    searchTasks,
    filterTasksByPriority,
    filterTasksByAssignee,

    // Column operations
    addColumn,
    updateColumn,
    deleteColumn,
    getColumn,

    // Utility functions
    setColumns,
    setIsLoading,
    setError,
  };
};
