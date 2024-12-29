import { chaptersRDB } from "../apps/editor/rdb-store/modules/chapterModule";
import { ChapterType } from "../types";

export const persistChapterFromRDB = (chapterId: string): ChapterType => {
    const chaptersStateSnap = chaptersRDB.getSnapshot();

    return {
        id: chapterId,
        state: chaptersStateSnap,
    };
};