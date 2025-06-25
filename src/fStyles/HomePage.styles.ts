const styles = {
  container: 'flex h-screen bg-gray-50',

  // Sidebar styles
  sidebar:
    'flex flex-col w-64 bg-white shadow-lg transition-all duration-300 ease-in-out',
  sidebarCollapsed: 'w-16',
  sidebarHeader:
    'flex items-center justify-between p-4 border-b border-gray-200',
  sidebarTitle: 'text-xl font-bold text-gray-900',
  collapseButton: 'p-1 rounded-md hover:bg-gray-100 transition-colors',

  // Navigation styles
  navigation: 'p-4 space-y-2',
  navItem:
    'flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors',

  // Projects section styles
  projectsSection: 'flex-1 p-4 space-y-4',
  projectsHeader: 'flex items-center justify-between',
  projectsTitle: 'text-sm font-semibold text-gray-700 uppercase tracking-wide',
  addProjectButton:
    'p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700',
  projectsList: 'space-y-1',
  projectItem:
    'flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors',
  projectColor: 'w-3 h-3 rounded-full flex-shrink-0',
  projectName: 'text-sm truncate',

  // Sidebar footer styles
  sidebarFooter: 'p-4 border-t border-gray-200 space-y-2',

  // Main content styles
  mainContent: 'flex-1 overflow-auto',
  header: 'p-6 border-b border-gray-200 bg-white',
  pageTitle: 'text-2xl font-bold text-gray-900',
  pageSubtitle: 'text-gray-600 mt-1',

  // Content area styles
  content: 'p-6 space-y-6',

  // Stats grid styles
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  statCard: 'bg-white p-6 rounded-lg shadow-sm border border-gray-200',
  statTitle: 'text-sm font-medium text-gray-600',
  statValue: 'text-2xl font-bold text-gray-900 mt-2',
  statChange: 'text-sm text-gray-500 mt-1',

  // Recent tasks styles
  recentTasks: 'bg-white rounded-lg shadow-sm border border-gray-200',
  sectionTitle:
    'text-lg font-semibold text-gray-900 p-6 border-b border-gray-200',
  taskList: 'divide-y divide-gray-200',
  taskItem:
    'flex items-center space-x-4 p-6 hover:bg-gray-50 transition-colors',
  taskCheckbox: 'w-5 h-5 border-2 border-gray-300 rounded-md flex-shrink-0',
  taskContent: 'flex-1 min-w-0',
  taskTitle: 'text-sm font-medium text-gray-900',
  taskProject: 'text-sm text-gray-500 mt-1',
  taskDate: 'text-sm text-gray-500 flex-shrink-0',
};

export default styles;
