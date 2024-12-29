import { create } from "zustand";
import { chaptersRDB } from "@/apps/editor/rdb-store/modules/chapterModule";
import { ChapterType } from "@/types";

interface ChaptersState {
    chapters: any[];
    initialized: boolean;
    setChapters: (chapters: any[]) => void;
    currentChapter: ChapterType | null;
    setCurrentChapter: (v: ChapterType) => void;
    setInitialized: (v: boolean) => void;
    changeChapter: (chapterId: string, chapter: any) => void;
}


// Is used to store and manipulate all chapters in novell. Otherwise, custom store is used to work with current chapter.
export const useChapters = create<ChaptersState>((set) => ({
    chapters: [],
    initialized: false,
    currentChapter: null,
    setCurrentChapter: (v: ChapterType) => {
        chaptersRDB.persist(v.state);
        return set(() => ({ currentChapter: v }))
    },
    setInitialized: (v: boolean) => set(() => ({ initialized: v })),
    setChapters: (chapters: any[]) => set(() => ({ chapters })),
    changeChapter: (chapterId: string, chapter: any) => set((state) => ({
        chapters: state.chapters.map(item => {
            if (item.id === chapterId) return chapter;
            return item
        })
    })),
}));