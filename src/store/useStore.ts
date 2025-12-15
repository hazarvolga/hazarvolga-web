import { create } from 'zustand';

interface BackgroundState {
    intensity: 'low' | 'medium' | 'high';
    setIntensity: (intensity: 'low' | 'medium' | 'high') => void;
}

export const useStore = create<BackgroundState>((set) => ({
    intensity: 'medium',
    setIntensity: (intensity) => set({ intensity }),
}));
