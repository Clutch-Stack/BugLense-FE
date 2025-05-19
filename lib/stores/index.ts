/**
 * Store index file
 * Re-exports all stores for easier imports
 */

export { default as useAuthStore } from './authStore';
export { default as useProjectStore } from './projectStore';
export { default as useBugStore } from './bugStore';
export { default as useUIStore } from './uiStore';
export { default as useTeamStore } from './teamStore';

// Also export all types from the types file for convenience
export * from '../types'; 