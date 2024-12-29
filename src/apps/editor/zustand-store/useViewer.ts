import { create } from "zustand";

interface ActiveNodeState {
    isViewerVisible: boolean;
    setIsViewerVisible: (isVisible: boolean, payload: any) => void;
    payload: any
}

export const useViewerState = create<ActiveNodeState>((set) => ({
    isViewerVisible: false,
    setIsViewerVisible: (isVisible: boolean, payload: any) =>
        set(() => ({ isViewerVisible: isVisible, payload })),
    payload: null
}));
