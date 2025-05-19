import { create } from 'zustand';
import apiClient from '../api';
import { Team, TeamState } from '../types';

/**
 * Team Store with Zustand
 * Handles team state and operations
 */
export const useTeamStore = create<
  TeamState & {
    fetchTeams: () => Promise<void>;
    fetchTeam: (id: string) => Promise<void>;
    createTeam: (data: Partial<Team>) => Promise<Team>;
    updateTeam: (id: string, data: Partial<Team>) => Promise<void>;
    deleteTeam: (id: string) => Promise<void>;
    setSelectedTeam: (team: Team | null) => void;
    resetState: () => void;
  }
>((set, get) => ({
  teams: [],
  selectedTeam: null,
  isLoading: false,
  error: null,

  /**
   * Fetch all teams
   */
  fetchTeams: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Team[] }>('/teams');
      
      set({
        teams: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch teams',
      });
    }
  },

  /**
   * Fetch a single team by ID
   */
  fetchTeam: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.get<{ data: Team }>(`/teams/${id}`);
      
      set({
        selectedTeam: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to fetch team ${id}`,
      });
    }
  },

  /**
   * Create a new team
   */
  createTeam: async (data: Partial<Team>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.post<{ data: Team }>('/teams', data);
      const newTeam = response.data;
      
      set((state) => ({
        teams: [...state.teams, newTeam],
        selectedTeam: newTeam,
        isLoading: false,
      }));
      
      return newTeam;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create team',
      });
      throw error;
    }
  },

  /**
   * Update a team
   */
  updateTeam: async (id: string, data: Partial<Team>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiClient.put<{ data: Team }>(`/teams/${id}`, data);
      const updatedTeam = response.data;
      
      set((state) => ({
        teams: state.teams.map((team) => 
          team.id === id ? updatedTeam : team
        ),
        selectedTeam: state.selectedTeam?.id === id 
          ? updatedTeam 
          : state.selectedTeam,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to update team ${id}`,
      });
      throw error;
    }
  },

  /**
   * Delete a team
   */
  deleteTeam: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await apiClient.delete(`/teams/${id}`);
      
      set((state) => ({
        teams: state.teams.filter((team) => team.id !== id),
        selectedTeam: state.selectedTeam?.id === id 
          ? null 
          : state.selectedTeam,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : `Failed to delete team ${id}`,
      });
      throw error;
    }
  },

  /**
   * Set selected team
   */
  setSelectedTeam: (team: Team | null) => {
    set({ selectedTeam: team });
  },

  /**
   * Reset team state
   */
  resetState: () => {
    set({
      teams: [],
      selectedTeam: null,
      isLoading: false,
      error: null,
    });
  },
}));

export default useTeamStore; 