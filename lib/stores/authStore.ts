import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import apiClient from '../api';
import { AuthState, LoginCredentials, RegisterData, User } from '../types';

/**
 * Auth Store with Zustand
 * Handles user authentication state, login, logout, etc.
 */
export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    refreshUser: () => Promise<void>;
    resetState: () => void;
  }
>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /**
       * Login user
       */
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
          
          // Set token in API client
          apiClient.setToken(response.token);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
          throw error;
        }
      },

      /**
       * Register new user
       */
      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await apiClient.post<{ user: User; token: string }>('/auth/register', data);
          
          // Set token in API client
          apiClient.setToken(response.token);
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
          throw error;
        }
      },

      /**
       * Logout user
       */
      logout: async () => {
        try {
          set({ isLoading: true });
          
          if (get().token) {
            await apiClient.post('/auth/logout');
          }
          
          // Clear token in API client
          apiClient.setToken(null);
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
          
          // Still clear the state even if API call fails
          apiClient.setToken(null);
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      /**
       * Update user profile
       */
      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await apiClient.put<{ user: User }>('/auth/profile', data);
          
          set({
            user: response.user,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Profile update failed',
          });
          throw error;
        }
      },

      /**
       * Refresh user data
       */
      refreshUser: async () => {
        try {
          if (!get().token) return;
          
          set({ isLoading: true, error: null });
          
          const response = await apiClient.get<{ user: User }>('/auth/me');
          
          set({
            user: response.user,
            isLoading: false,
          });
        } catch (error) {
          // If unauthorized, logout
          if (error instanceof Error && error.message.includes('401')) {
            get().logout();
          } else {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to refresh user data',
            });
          }
        }
      },

      /**
       * Reset auth state
       */
      resetState: () => {
        apiClient.setToken(null);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'buglense-auth', // Local storage key
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // When storage changes
      onRehydrateStorage: () => (state) => {
        // Set token in API client after rehydration
        if (state?.token) {
          apiClient.setToken(state.token);
        }
      },
    }
  )
);

export default useAuthStore; 