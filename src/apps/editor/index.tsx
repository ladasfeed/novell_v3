import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EntityStoreDevTools } from "../../packages/rdb/_core/devTools";
import { novellStore } from "./rdb-store/modules/novellModule";
import { chaptersRDB } from "./rdb-store/modules/chapterModule";
import { useNovellState } from "../../shared/hooks/useNovellState";
import { CanvasEntry } from "./services/canvas/main";
import { GUI } from "./services/GUI";
import { NovellType } from "../../types";
import { useChapters } from "../../shared/hooks/useChapters";
import s from "./styles.module.scss";
import { initSideEffects } from "./rdb-store/side-effects/sideEffects";
import { ViewerWrapper } from "../viewer/ViewerWrapper";

const useInitEditor = () => {
  const navigate = useNavigate();
  const { novellId } = useParams();
  const { currentNovell, initCurrentNovell } = useNovellState();
  const { setCurrentChapter } = useChapters();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initSideEffects();
    initCurrentNovell(novellId as string);
  }, []);

  useEffect(() => {
    if (!currentNovell) return;

    if (currentNovell.chapters.length) {
      setCurrentChapter(currentNovell.chapters[0]);
      navigate("/editor/" + novellId + "/" + currentNovell.chapters[0].id);
    }

    setIsReady(true);
  }, [currentNovell]);

  return {
    isReady,
    novell: currentNovell,
  };
};

const useInitChapter = (novell: NovellType | null | undefined) => {
  const { chapterId } = useParams();
  const { setChapters, currentChapter, setCurrentChapter, chapters } =
    useChapters();

  useEffect(() => {
    if (!novell) return;

    if (chapterId && chapters.length) {
      const chapter = chapters.find((ch) => ch.id === chapterId);

      if (chapter) {
        setCurrentChapter(chapter);
      }
    }
  }, [novell, chapters, chapterId]);

  useEffect(() => {
    if (!novell) return;
    setChapters(novell.chapters);
  }, [novell]);

  return {
    currentChapter,
  };
};

export const Editor = () => {
  const { isReady, novell } = useInitEditor();
  const { currentChapter } = useInitChapter(novell);

  if (!isReady) return;

  return (
    <div className={s.container}>
      <GUI />
      {currentChapter && <CanvasEntry key={currentChapter.id} />}
      <ViewerWrapper />
      {/* <EntityStoreDevTools stores={[chaptersRDB.store, novellStore.store]} /> */}
    </div>
  );
};
