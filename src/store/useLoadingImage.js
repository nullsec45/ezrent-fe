import { create } from 'zustand';

export const useLoadingImageStore = create((set) => ({
  loadingImage: true,
  removeLoadingImage: () => set({ loadingImage: false }),
}));
