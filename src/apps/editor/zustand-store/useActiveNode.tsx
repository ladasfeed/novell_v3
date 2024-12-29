import { create } from "zustand";

interface ActiveNodeState {
  activeNodeId: string | null;
  setActiveNodeId: (activeNodeId: string | null) => void;
}

export const useActiveNode = create<ActiveNodeState>((set) => ({
  activeNodeId: null,
  setActiveNodeId: (activeNodeId: string | null) =>
    set(() => ({ activeNodeId })),
}));
