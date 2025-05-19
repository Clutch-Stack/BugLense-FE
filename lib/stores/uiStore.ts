import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Toast, UIState } from '../types';

/**
 * UI Store with Zustand
 * Manages global UI state like theme, sidebar, toasts
 */
export const useUIStore = create<
  UIState & {
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
  }
>(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      theme: 'system',
      toasts: [],

      /**
       * Toggle sidebar open/closed
       */
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      /**
       * Set sidebar state directly
       */
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      /**
       * Set theme
       */
      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
      },

      /**
       * Add a toast notification
       */
      addToast: (toast: Omit<Toast, 'id'>) => {
        const id = Date.now().toString();
        const newToast: Toast = {
          id,
          ...toast,
          duration: toast.duration || 5000, // Default 5 seconds
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto-remove toast after duration
        setTimeout(() => {
          get().removeToast(id);
        }, newToast.duration);
      },

      /**
       * Remove a toast by ID
       */
      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      /**
       * Clear all toasts
       */
      clearToasts: () => {
        set({ toasts: [] });
      },
    }),
    {
      name: 'buglense-ui', // Local storage key
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
      }),
    }
  )
);

export default useUIStore; 