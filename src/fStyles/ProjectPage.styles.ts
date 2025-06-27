const styles = {
  // Container styles
  container: 'min-h-screen bg-gray-50',

  // Loading styles
  loadingContainer: 'flex items-center justify-center min-h-screen',
  loadingSpinner: 'text-lg text-gray-600',

  // Error styles
  errorContainer: 'flex items-center justify-center min-h-screen',
  errorContent: 'text-center space-y-4',
  errorTitle: 'text-2xl font-bold text-gray-900',
  errorMessage: 'text-gray-600',
  backButton: 'mt-4',

  // Header styles
  header: 'bg-white border-b border-gray-200',
  headerContent: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6',
  headerInfo: 'flex-1',
  projectTitle: 'text-3xl font-bold text-gray-900',
  projectDescription: 'text-gray-600 mt-2',
  headerActions: 'flex items-center space-x-3',
  actionButton: 'text-gray-700 hover:text-gray-900',
  boardButton: 'bg-blue-600 text-white hover:bg-blue-700',

  // Stats section styles
  statsSection: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  statCard: 'bg-white p-6 rounded-lg shadow-sm border border-gray-200',
  statTitle: 'text-sm font-medium text-gray-600',
  statValue: 'text-2xl font-bold text-gray-900 mt-2',
  statChange: 'text-sm text-gray-500 mt-1',

  // Tasks section styles
  tasksSection: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8',
  tasksCard: 'bg-white rounded-lg shadow-sm border border-gray-200',
  tasksHeader: 'flex items-center justify-between',
  sectionTitle: 'text-lg font-semibold text-gray-900',

  // Task list styles
  taskList: 'space-y-4',
  taskItem:
    'flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors',
  taskInfo: 'flex-1',
  taskTitle: 'text-sm font-medium text-gray-900',
  taskDescription: 'text-sm text-gray-600 mt-1',
  taskMeta: 'flex items-center space-x-2',

  // Empty state styles
  emptyState: 'text-center py-12',
  emptyIcon: 'mx-auto text-gray-400 mb-4',
  emptyTitle: 'text-lg font-medium text-gray-900 mb-2',
  emptyDescription: 'text-gray-600 mb-6',
  createTaskButton: 'bg-blue-600 text-white hover:bg-blue-700',
};

export default styles;
