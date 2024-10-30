import { create } from 'zustand';
import { Route } from '../types';

interface AppState {
  isSidebarOpen: boolean;
  selectedRoute: Route | null;
  selectedDate: string | null;
  toggleSidebar: () => void;
  setSelectedRoute: (route: Route | null) => void;
  setSelectedDate: (date: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  selectedRoute: null,
  selectedDate: null,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));