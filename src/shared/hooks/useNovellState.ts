import { novellStore } from '@/apps/editor/rdb-store/modules/novellModule';
import { novellApi } from '../../api/modules/novellApi';
import { NovellMetaType, NovellType } from './../../types';
import { create } from "zustand";

interface NovellStateType {
    novells: NovellMetaType[],
    currentNovell: NovellType | null;
    setNovells: (v: NovellMetaType[]) => void;
    init: () => void;
    currentNovellInitialized: boolean;
    initCurrentNovell: (id: string) => Promise<any>;
    setCurrentNovell: (v: NovellType) => void;
    saveNovell: (novell: NovellType) => Promise<any>;
    createNovell: (id: string) => Promise<any>;
}

export const useNovellState = create<NovellStateType>((set) => ({
    novells: [],
    currentNovell: null,
    setNovells: (v: NovellMetaType[]) => set(() => {
        return { novells: v }
    }),
    setCurrentNovell: (v: NovellType) => set(() => {
        return { currentNovell: v }
    }),
    init: async () => {
        const novells = await novellApi.getNovellsMeta();
        return set(() => ({ novells }))
    },
    currentNovellInitialized: false,
    initCurrentNovell: async (id: string) => {
        set(() => ({ currentNovellInitialized: false }));
        const novell = await novellApi.getNovell(id);

        if (novell) {
            console.log(novell.assets, "???")
            novellStore.persist({
                assets: novell.assets,
                chapters: novell.chapters
            })
            return set(() => ({ currentNovell: novell }))
        }
        set(() => ({ currentNovellInitialized: true }));
    },
    saveNovell: async (novell: NovellType) => {
        await novellApi.saveNovell(novell.id, novell);

        set((state) => ({
            novells: state.novells.map(n => {
                if (n.id == novell.id) return novell
                return n
            })
        }))
    },
    createNovell: async (id: string) => {
        const novell = await novellApi.createNovell(id);
        set((state) => ({ novells: [...state.novells, novell] }))
    }
}))
