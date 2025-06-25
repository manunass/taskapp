import { useState, useCallback, useMemo } from 'react';
import { TaskData } from '@/components/Task';

export interface BoardFilters {
  search: string;
  priority: TaskData['priority'] | 'all';
  assignee: string | 'all';
  tags: string[];
  dueDate: 'all' | 'today' | 'week' | 'overdue';
  status: string | 'all';
}

export interface BoardViewOptions {
  showCompleted: boolean;
  showOverdue: boolean;
  groupBy: 'none' | 'priority' | 'assignee' | 'dueDate';
  sortBy: 'title' | 'priority' | 'dueDate' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

const defaultFilters: BoardFilters = {
  search: '',
  priority: 'all',
  assignee: 'all',
  tags: [],
  dueDate: 'all',
  status: 'all',
};

const defaultViewOptions: BoardViewOptions = {
  showCompleted: true,
  showOverdue: true,
  groupBy: 'none',
  sortBy: 'dueDate',
  sortOrder: 'asc',
};

export const useBoardFilters = () => {
  const [filters, setFilters] = useState<BoardFilters>(defaultFilters);
  const [viewOptions, setViewOptions] =
    useState<BoardViewOptions>(defaultViewOptions);

  // Update a single filter
  const updateFilter = useCallback((key: keyof BoardFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Update multiple filters at once
  const updateFilters = useCallback((newFilters: Partial<BoardFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Update a single view option
  const updateViewOption = useCallback(
    (key: keyof BoardViewOptions, value: any) => {
      setViewOptions((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  // Update multiple view options at once
  const updateViewOptions = useCallback(
    (newOptions: Partial<BoardViewOptions>) => {
      setViewOptions((prev) => ({
        ...prev,
        ...newOptions,
      }));
    },
    []
  );

  // Reset all view options
  const resetViewOptions = useCallback(() => {
    setViewOptions(defaultViewOptions);
  }, []);

  // Filter tasks based on current filters
  const filterTasks = useCallback(
    (tasks: TaskData[]): TaskData[] => {
      return tasks.filter((task) => {
        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const matchesSearch =
            task.title.toLowerCase().includes(searchLower) ||
            task.description?.toLowerCase().includes(searchLower) ||
            task.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
            task.assignee?.name.toLowerCase().includes(searchLower);

          if (!matchesSearch) return false;
        }

        // Priority filter
        if (filters.priority !== 'all' && task.priority !== filters.priority) {
          return false;
        }

        // Assignee filter
        if (
          filters.assignee !== 'all' &&
          task.assignee?.name !== filters.assignee
        ) {
          return false;
        }

        // Tags filter
        if (filters.tags.length > 0) {
          const hasMatchingTag = filters.tags.some((tag) =>
            task.tags?.includes(tag)
          );
          if (!hasMatchingTag) return false;
        }

        // Due date filter
        if (filters.dueDate !== 'all' && task.dueDate) {
          const taskDate = new Date(task.dueDate);
          const today = new Date();
          const weekFromNow = new Date(
            today.getTime() + 7 * 24 * 60 * 60 * 1000
          );

          switch (filters.dueDate) {
            case 'today':
              if (taskDate.toDateString() !== today.toDateString())
                return false;
              break;
            case 'week':
              if (taskDate > weekFromNow) return false;
              break;
            case 'overdue':
              if (taskDate >= today) return false;
              break;
          }
        }

        // Status filter (completed tasks are in 'done' column)
        if (filters.status !== 'all') {
          // This would need to be implemented based on your column structure
          // For now, we'll assume 'done' column means completed
        }

        return true;
      });
    },
    [filters]
  );

  // Sort tasks based on view options
  const sortTasks = useCallback(
    (tasks: TaskData[]): TaskData[] => {
      const sortedTasks = [...tasks];

      sortedTasks.sort((a, b) => {
        let comparison = 0;

        switch (viewOptions.sortBy) {
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'priority': {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            break;
          }
          case 'dueDate':
            if (a.dueDate && b.dueDate) {
              comparison =
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            } else if (a.dueDate) {
              comparison = -1;
            } else if (b.dueDate) {
              comparison = 1;
            }
            break;
          case 'createdAt':
            // This would need to be implemented if you have createdAt field
            comparison = 0;
            break;
        }

        return viewOptions.sortOrder === 'desc' ? -comparison : comparison;
      });

      return sortedTasks;
    },
    [viewOptions.sortBy, viewOptions.sortOrder]
  );

  // Get available assignees from tasks
  const getAvailableAssignees = useCallback((tasks: TaskData[]): string[] => {
    const assignees = new Set<string>();
    tasks.forEach((task) => {
      if (task.assignee?.name) {
        assignees.add(task.assignee.name);
      }
    });
    return Array.from(assignees).sort();
  }, []);

  // Get available tags from tasks
  const getAvailableTags = useCallback((tasks: TaskData[]): string[] => {
    const tags = new Set<string>();
    tasks.forEach((task) => {
      task.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Get filter summary
  const getFilterSummary = useMemo(() => {
    const activeFilters = [];

    if (filters.search) activeFilters.push(`Search: "${filters.search}"`);
    if (filters.priority !== 'all')
      activeFilters.push(`Priority: ${filters.priority}`);
    if (filters.assignee !== 'all')
      activeFilters.push(`Assignee: ${filters.assignee}`);
    if (filters.tags.length > 0)
      activeFilters.push(`Tags: ${filters.tags.join(', ')}`);
    if (filters.dueDate !== 'all')
      activeFilters.push(`Due: ${filters.dueDate}`);
    if (filters.status !== 'all')
      activeFilters.push(`Status: ${filters.status}`);

    return activeFilters;
  }, [filters]);

  return {
    // State
    filters,
    viewOptions,

    // Filter actions
    updateFilter,
    updateFilters,
    resetFilters,

    // View option actions
    updateViewOption,
    updateViewOptions,
    resetViewOptions,

    // Utility functions
    filterTasks,
    sortTasks,
    getAvailableAssignees,
    getAvailableTags,
    getFilterSummary,

    // Computed values
    hasActiveFilters: getFilterSummary.length > 0,
  };
};
