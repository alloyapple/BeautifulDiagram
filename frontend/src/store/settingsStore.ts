import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Fallback UUID generator for non-HTTPS environments
const generateUUID = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export interface ModelConfig {
    id: string;
    name: string;
    modelId: string;
    apiKey: string;
    baseUrl: string;
}

interface SettingsState {
    models: ModelConfig[];
    activeModelId: string | null;
    hasShownRecommendation: boolean;
    addModel: (model: Omit<ModelConfig, 'id'>) => void;
    removeModel: (id: string) => void;
    updateModel: (id: string, model: Partial<ModelConfig>) => void;
    setActiveModelId: (id: string | null) => void;
    setHasShownRecommendation: (shown: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            models: [],
            activeModelId: null,
            hasShownRecommendation: false,
            addModel: (model) => set((state) => {
                const id = generateUUID();
                return {
                    models: [...state.models, { ...model, id }],
                    activeModelId: state.activeModelId || id
                };
            }),
            removeModel: (id) => set((state) => ({
                models: state.models.filter(m => m.id !== id),
                activeModelId: state.activeModelId === id ? (state.models.length > 1 ? state.models.find(m => m.id !== id)?.id || null : null) : state.activeModelId
            })),
            updateModel: (id, model) => set((state) => ({
                models: state.models.map(m => m.id === id ? { ...m, ...model } : m)
            })),
            setActiveModelId: (id) => set({ activeModelId: id }),
            setHasShownRecommendation: (shown) => set({ hasShownRecommendation: shown }),
        }),
        {
            name: 'beautifuldiagram-settings-v2', // Version bump for schema change
        }
    )
);
