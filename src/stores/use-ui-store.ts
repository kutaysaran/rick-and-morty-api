import { create } from "zustand";

interface UiStoreState {
  isSidebarOpen: boolean;
  actions: {
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
  };
}

export const useUiStore = create<UiStoreState>((set, get) => ({
  isSidebarOpen: false,
  actions: {
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),
  },
}));
