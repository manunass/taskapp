const styles = {
  taskCard:
    'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
  dragging: 'opacity-50 rotate-2 scale-105 shadow-lg',
  taskHeader: 'pb-2',
  taskHeaderContent: 'flex items-center justify-between',
  priorityIndicator: 'flex items-center space-x-2',
  priorityDot: 'w-2 h-2 rounded-full',
  priorityBadge: 'text-xs',
  moreButton: 'h-6 w-6 p-0',
  taskContent: 'pt-0 space-y-3',
  taskTitle: 'font-medium text-gray-900 text-sm leading-tight',
  taskDescription: 'text-gray-600 text-sm line-clamp-2',
  taskTags: 'flex flex-wrap gap-1',
  tag: 'text-xs',
  taskFooter: 'flex items-center justify-between pt-2 border-t border-gray-100',
  assignee: 'flex items-center space-x-2',
  avatar: 'w-6 h-6',
  assigneeName: 'text-xs text-gray-600',
  dueDate: 'flex items-center space-x-1 text-xs text-gray-500',
};

export default styles;
