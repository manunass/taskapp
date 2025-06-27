# Project Management System

This document describes the project management functionality that has been implemented in the TaskApp.

## Overview

The project management system allows users to:
- Create new projects
- View all their projects on the dashboard
- Navigate to individual project pages
- See project statistics and recent tasks
- Manage project state in real-time

## Components

### 1. `useUserProjects` Hook
- **Location**: `src/hooks/useUserProjects.ts`
- **Purpose**: Manages user projects state and API calls
- **Features**:
  - Fetches user projects from Supabase
  - Provides loading and error states
  - Allows adding, updating, and removing projects from state
  - Auto-refreshes when user changes

### 2. `ProjectPage` Component
- **Location**: `src/pages/ProjectPage.tsx`
- **Purpose**: Displays individual project details
- **Features**:
  - Project information display
  - Task statistics and progress
  - Recent tasks list
  - Navigation to project board
  - Error handling and loading states

### 3. Updated `HomePage` Component
- **Location**: `src/pages/HomePage.tsx`
- **Purpose**: Dashboard with project management
- **Features**:
  - Real-time project list in sidebar
  - Project creation integration
  - Project navigation
  - Dashboard statistics
  - Recent projects display

## Data Flow

### Project Creation Flow
1. User clicks "+" button in sidebar
2. Project creation form opens
3. User fills form and submits
4. `useProjectCreation` hook calls API
5. On success, new project is added to state via `addProject`
6. Form closes and project appears in sidebar immediately

### Project Navigation Flow
1. User clicks on project in sidebar or recent projects
2. Navigate to `/project/:projectId`
3. `ProjectPage` component loads
4. Fetches project details and tasks
5. Displays project information and statistics

### State Management
- Projects are stored in `useUserProjects` hook state
- New projects are added immediately to state (optimistic updates)
- State is refreshed when user changes
- Error handling for failed API calls

## API Integration

### Backend Functions Used
- `listUserProjects(userId)` - Fetch user's projects
- `createProject(name, description, adminId)` - Create new project
- `getProject(projectId)` - Get project details
- `listTasks(projectId)` - Get project tasks

### Authentication
- All project operations require user authentication
- User ID is obtained from `AuthContext`
- Projects are filtered by user membership

## UI Features

### Dashboard Statistics
- Total projects count
- Total tasks count (placeholder for now)
- Completed tasks count
- In-progress tasks count

### Project Display
- Color-coded project indicators
- Project names and descriptions
- Creation dates
- Task counts (placeholder)

### Navigation
- Sidebar project list with click navigation
- Recent projects section on dashboard
- Back navigation from project pages
- Direct navigation to project board

## Styling

### Project Colors
Projects are automatically assigned colors based on their ID:
```typescript
const colors = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-yellow-500'
];
```

### Responsive Design
- Sidebar collapses on smaller screens
- Project cards adapt to different screen sizes
- Mobile-friendly navigation

## Error Handling

### Loading States
- Spinner indicators during data fetching
- Skeleton loading for project lists
- Disabled buttons during operations

### Error States
- Error messages for failed API calls
- Graceful fallbacks for missing data
- User-friendly error descriptions

### Empty States
- Helpful messages when no projects exist
- Call-to-action buttons for first-time users
- Clear guidance on next steps

## Future Enhancements

### Planned Features
1. **Task Counts**: Real-time task counts per project
2. **Project Search**: Search and filter projects
3. **Project Categories**: Organize projects by type
4. **Project Sharing**: Share projects with team members
5. **Project Templates**: Pre-configured project templates
6. **Project Analytics**: Detailed project performance metrics

### Technical Improvements
1. **Caching**: Implement project data caching
2. **Real-time Updates**: WebSocket integration for live updates
3. **Offline Support**: Offline project management
4. **Bulk Operations**: Multi-project selection and actions

## Usage Examples

### Creating a Project
```typescript
const { addProject } = useUserProjects();
const { handleCreateProject } = useProjectCreation();

const handleSubmit = async (data: ProjectFormData) => {
  const createdProject = await handleCreateProject(data);
  if (createdProject) {
    addProject(createdProject); // Add to state immediately
  }
};
```

### Navigating to Project
```typescript
const navigate = useNavigate();

const handleProjectClick = (project: Project) => {
  navigate(`/project/${project.id}`);
};
```

### Fetching Project Data
```typescript
const { projects, loading, error } = useUserProjects();

useEffect(() => {
  // Projects are automatically fetched when component mounts
}, []);
```

## File Structure

```
src/
├── hooks/
│   ├── useUserProjects.ts           # Project state management
│   └── useProjectCreation.ts        # Project creation logic
├── pages/
│   ├── HomePage.tsx                 # Updated dashboard
│   └── ProjectPage.tsx              # Individual project view
├── fStyles/
│   └── ProjectPage.styles.ts        # Project page styling
└── App.tsx                          # Updated routing
```

This system provides a complete project management experience with real-time state updates, smooth navigation, and a user-friendly interface. 