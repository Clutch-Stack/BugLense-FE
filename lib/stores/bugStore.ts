import { create } from 'zustand';
import apiClient from '../api';
import { Bug, BugState, BugStatus } from '../types';

/**
 * Bug Store with Zustand
 * Handles bug state and operations
 */
export const useBugStore = create<
  BugState & {
    fetchBugs: () => Promise<void>;
    fetchBugsByProject: (projectId: string) => Promise<void>;
    fetchBug: (id: string) => Promise<void>;
    createBug: (data: Partial<Bug>) => Promise<Bug>;
    updateBug: (id: string, data: Partial<Bug>) => Promise<void>;
    updateBugStatus: (id: string, status: BugStatus) => Promise<void>;
    assignBug: (id: string, userId: string | null) => Promise<void>;
    deleteBug: (id: string) => Promise<void>;
    setSelectedBug: (bug: Bug | null) => void;
    setFilter: (filterName: string, value: string | null) => void;
    setSearchTerm: (term: string) => void;
    applyFilters: () => void;
    resetFilters: () => void;
    resetState: () => void;
  }
>((set, get) => ({
  bugs: [],
  filteredBugs: [],
  selectedBug: null,
  isLoading: false,
  filters: {
    status: null,
    priority: null,
    assignee: null,
    searchTerm: '',
  },
  error: null,

  /**
   * Fetch all bugs
   */
  fetchBugs: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Bug[] }>('/bugs');
      
      set({
        bugs: response.data,
        filteredBugs: response.data,
        isLoading: false,
      });
      
      // Apply any existing filters
      get().applyFilters();
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch bugs',
      });
    }
  },

  /**
   * Fetch bugs for a specific project
   */
  fetchBugsByProject: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Bug[] }>(`/projects/${projectId}/bugs`);
      
      set({
        bugs: response.data,
        filteredBugs: response.data,
        isLoading: false,
      });
      
      // Apply any existing filters
      get().applyFilters();
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to fetch bugs for project ${projectId}`,
      });
    }
  },

  /**
   * Fetch a single bug by ID
   */
  fetchBug: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Bug }>(`/bugs/${id}`);
      
      set({
        selectedBug: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to fetch bug ${id}`,
      });
    }
  },

  /**
   * Create a new bug
   */
  createBug: async (data: Partial<Bug>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.post<{ data: Bug }>('/bugs', data);
      const newBug = response.data;
      
      set((state) => ({
        bugs: [...state.bugs, newBug],
        filteredBugs: [...state.filteredBugs, newBug],
        selectedBug: newBug,
        isLoading: false,
      }));
      
      // Apply any existing filters
      get().applyFilters();
      
      return newBug;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create bug',
      });
      throw error;
    }
  },

  /**
   * Update a bug
   */
  updateBug: async (id: string, data: Partial<Bug>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.put<{ data: Bug }>(`/bugs/${id}`, data);
      const updatedBug = response.data;
      
      set((state) => ({
        bugs: state.bugs.map((bug) => bug.id === id ? updatedBug : bug),
        filteredBugs: state.filteredBugs.map((bug) => bug.id === id ? updatedBug : bug),
        selectedBug: state.selectedBug?.id === id ? updatedBug : state.selectedBug,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to update bug ${id}`,
      });
      throw error;
    }
  },

  /**
   * Update bug status
   */
  updateBugStatus: async (id: string, status: BugStatus) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.patch<{ data: Bug }>(`/bugs/${id}/status`, { status });
      const updatedBug = response.data;
      
      set((state) => ({
        bugs: state.bugs.map((bug) => bug.id === id ? updatedBug : bug),
        filteredBugs: state.filteredBugs.map((bug) => bug.id === id ? updatedBug : bug),
        selectedBug: state.selectedBug?.id === id ? updatedBug : state.selectedBug,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to update bug status ${id}`,
      });
      throw error;
    }
  },

  /**
   * Assign bug to user
   */
  assignBug: async (id: string, userId: string | null) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.post<{ data: Bug }>(`/bugs/${id}/assign`, { userId });
      const updatedBug = response.data;
      
      set((state) => ({
        bugs: state.bugs.map((bug) => bug.id === id ? updatedBug : bug),
        filteredBugs: state.filteredBugs.map((bug) => bug.id === id ? updatedBug : bug),
        selectedBug: state.selectedBug?.id === id ? updatedBug : state.selectedBug,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to assign bug ${id}`,
      });
      throw error;
    }
  },

  /**
   * Delete a bug
   */
  deleteBug: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await apiClient.delete(`/bugs/${id}`);
      
      set((state) => ({
        bugs: state.bugs.filter((bug) => bug.id !== id),
        filteredBugs: state.filteredBugs.filter((bug) => bug.id !== id),
        selectedBug: state.selectedBug?.id === id ? null : state.selectedBug,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to delete bug ${id}`,
      });
      throw error;
    }
  },

  /**
   * Set selected bug
   */
  setSelectedBug: (bug: Bug | null) => {
    set({ selectedBug: bug });
  },

  /**
   * Set filter value
   */
  setFilter: (filterName: string, value: string | null) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      }
    }));
    
    get().applyFilters();
  },

  /**
   * Set search term
   */
  setSearchTerm: (term: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        searchTerm: term,
      }
    }));
    
    get().applyFilters();
  },

  /**
   * Apply all current filters to bugs list
   */
  applyFilters: () => {
    const { bugs, filters } = get();
    
    let result = [...bugs];
    
    // Filter by status if set
    if (filters.status) {
      result = result.filter(bug => bug.status === filters.status);
    }
    
    // Filter by priority if set
    if (filters.priority) {
      result = result.filter(bug => bug.priority === filters.priority);
    }
    
    // Filter by assignee if set
    if (filters.assignee) {
      result = result.filter(bug => bug.assigneeId === filters.assignee);
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(bug => 
        bug.title.toLowerCase().includes(searchLower) || 
        bug.description.toLowerCase().includes(searchLower)
      );
    }
    
    set({ filteredBugs: result });
  },

  /**
   * Reset all filters
   */
  resetFilters: () => {
    set((state) => ({
      filters: {
        status: null,
        priority: null,
        assignee: null,
        searchTerm: '',
      },
      filteredBugs: state.bugs,
    }));
  },

  /**
   * Reset bug state
   */
  resetState: () => {
    set({
      bugs: [],
      filteredBugs: [],
      selectedBug: null,
      isLoading: false,
      filters: {
        status: null,
        priority: null,
        assignee: null,
        searchTerm: '',
      },
      error: null,
    });
  },
}));

export default useBugStore; 