/**
 * BugLense Common Types
 */

// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

// Bug Types
export enum BugStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed'
}

export enum BugPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  status: BugStatus;
  priority: BugPriority;
  projectId: string;
  reporterId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BugState {
  bugs: Bug[];
  filteredBugs: Bug[];
  selectedBug: Bug | null;
  isLoading: boolean;
  filters: {
    status: string | null;
    priority: string | null;
    assignee: string | null;
    searchTerm: string;
  };
  error: string | null;
}

// Team Types
export interface TeamMember {
  id: string;
  userId: string;
  user: User;
  teamId: string;
  role: string;
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;
  isLoading: boolean;
  error: string | null;
}

// UI State Types
export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toasts: Toast[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
} 