import { useState } from "react";
import { chaptersRDB } from "../rdb-store/modules/chapterModule";
import { useChapters } from "../../../shared/hooks/useChapters";
import { useNavigate } from "react-router-dom";
import { useNovellState } from "../../../shared/hooks/useNovellState";
import { ChapterType } from "../../../types";

export const useChapterController = () => {
    const navigate = useNavigate();
    const { currentNovell } = useNovellState()
    const { chapters, setChapters, initialized, currentChapter, setCurrentChapter } = useChapters();

    const createNewChapter = () => {
        const newChapter = {
            id: String(Math.floor(Math.random() * 100000)),
            state: {
                node: {},
                port: {},
                connections: {}
            },
        } as ChapterType;
        setChapters([...chapters, newChapter]);

        navigate("/editor/" + currentNovell?.id + "/" + newChapter.id);
    };

    return {
        setCurrentChapter,
        createNewChapter,
        chapters,
        chapterId: currentChapter?.id,
        initialized,
    }
}