import { create } from 'zustand';
import apiClient from '../api';
import { Project, ProjectState } from '../types';

/**
 * Project Store with Zustand
 * Handles project state and operations
 */
export const useProjectStore = create<
  ProjectState & {
    fetchProjects: () => Promise<void>;
    fetchProject: (id: string) => Promise<void>;
    fetchProjectByKey: (key: string) => Promise<void>;
    createProject: (data: Partial<Project>) => Promise<Project>;
    updateProject: (id: string, data: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    setSelectedProject: (project: Project | null) => void;
    resetState: () => void;
  }
>((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,

  /**
   * Fetch all projects
   */
  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Project[] }>('/projects');
      
      set({
        projects: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
      });
    }
  },

  /**
   * Fetch a single project by ID
   */
  fetchProject: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Project }>(`/projects/${id}`);
      
      set({
        selectedProject: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to fetch project ${id}`,
      });
    }
  },

  /**
   * Fetch a project by its key
   */
  fetchProjectByKey: async (key: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Project }>(`/projects/key/${key}`);
      
      set({
        selectedProject: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to fetch project with key ${key}`,
      });
    }
  },

  /**
   * Create a new project
   */
  createProject: async (data: Partial<Project>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.post<{ data: Project }>('/projects', data);
      const newProject = response.data;
      
      set((state) => ({
        projects: [...state.projects, newProject],
        selectedProject: newProject,
        isLoading: false,
      }));
      
      return newProject;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create project',
      });
      throw error;
    }
  },

  /**
   * Update a project
   */
  updateProject: async (id: string, data: Partial<Project>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.put<{ data: Project }>(`/projects/${id}`, data);
      const updatedProject = response.data;
      
      set((state) => ({
        projects: state.projects.map((project) => 
          project.id === id ? updatedProject : project
        ),
        selectedProject: state.selectedProject?.id === id 
          ? updatedProject 
          : state.selectedProject,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to update project ${id}`,
      });
      throw error;
    }
  },

  /**
   * Delete a project
   */
  deleteProject: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await apiClient.delete(`/projects/${id}`);
      
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
        selectedProject: state.selectedProject?.id === id 
          ? null 
          : state.selectedProject,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to delete project ${id}`,
      });
      throw error;
    }
  },

  /**
   * Set selected project
   */
  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  /**
   * Reset project state
   */
  resetState: () => {
    set({
      projects: [],
      selectedProject: null,
      isLoading: false,
      error: null,
    });
  },
}));

export default useProjectStore; 