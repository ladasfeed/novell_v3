import { ChapterGUI } from "./components/chapterGUI";
import { useChapters } from "../../../../../../shared/hooks/useChapters";
import s from "./styles.module.scss";

export const RightSidebar = () => {
  const { currentChapter } = useChapters();

  return <div className={s.container}>{currentChapter && <ChapterGUI />}</div>;
};
